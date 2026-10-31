import { UserProfile, Scheme, SchemeEligibilityEvaluation, CriterionResult, EligibilityStatus } from '../types';

// Canonical education levels hierarchy for rule-based evaluation
const EDUCATION_HIERARCHY: Record<string, number> = {
  'no formal education': 0,
  'uneducated': 0,
  'primary': 1,
  '5th': 1,
  '5th pass': 1,
  'middle': 2,
  '8th': 2,
  '8th pass': 2,
  '10th': 3,
  '10th pass': 3,
  'matric': 3,
  'matriculation': 3,
  'secondary': 3,
  'secondary (10th)': 3,
  '12th': 4,
  '12th pass': 4,
  'higher secondary': 4,
  'higher secondary (12th)': 4,
  'intermediate': 4,
  'diploma / iti': 5,
  'diploma': 5,
  'iti': 5,
  'undergraduate': 6,
  'graduate': 6,
  'bachelor': 6,
  'bachelors': 6,
  'degree': 6,
  'postgraduate': 7,
  'post graduate': 7,
  'master': 7,
  'masters': 7,
  'doctorate': 8,
  'phd': 8
};

function getEducationLevelRank(eduStr: string): number | null {
  const normalized = eduStr.toLowerCase().trim();
  if (normalized in EDUCATION_HIERARCHY) {
    return EDUCATION_HIERARCHY[normalized];
  }
  for (const [key, rank] of Object.entries(EDUCATION_HIERARCHY)) {
    if (normalized === key || normalized.startsWith(key) || key.startsWith(normalized)) {
      return rank;
    }
  }
  return null;
}

// Canonical occupation mapping to prevent accidental substring collisions
const CANONICAL_OCCUPATIONS: Record<string, string> = {
  'farmer': 'farmer',
  'agriculture': 'farmer',
  'small / marginal farmer': 'farmer',
  'peasant': 'farmer',
  'cultivator': 'farmer',
  
  'student': 'student',
  'scholar': 'student',
  'college student': 'student',
  'school student': 'student',
  
  'street vendor': 'street_vendor',
  'hawker': 'street_vendor',
  'vendor': 'street_vendor',
  
  'self-employed / business': 'self_employed',
  'self-employed': 'self_employed',
  'business': 'self_employed',
  'micro entrepreneur': 'self_employed',
  'entrepreneur': 'self_employed',
  'small business owner': 'self_employed',
  
  'daily wage worker / laborer': 'daily_wage',
  'daily wage worker': 'daily_wage',
  'laborer': 'daily_wage',
  'construction worker': 'daily_wage',
  'unorganized worker': 'daily_wage',
  
  'salaried / private sector': 'salaried_private',
  'salaried': 'salaried_private',
  'private employee': 'salaried_private',
  
  'government employee': 'government_employee',
  'public servant': 'government_employee',
  
  'artisan / handloom worker': 'artisan',
  'artisan': 'artisan',
  'weaver': 'artisan',
  'handloom worker': 'artisan',
  
  'unemployed / job seeker': 'unemployed',
  'unemployed': 'unemployed',
  'job seeker': 'unemployed',
  
  'homemaker': 'homemaker',
  'housewife': 'homemaker',
  
  'retired / senior citizen': 'retired',
  'retired': 'retired'
};

function normalizeOccupation(occStr: string): string {
  const norm = occStr.toLowerCase().trim();
  if (CANONICAL_OCCUPATIONS[norm]) {
    return CANONICAL_OCCUPATIONS[norm];
  }
  return norm;
}

function normalizeText(text?: string | null): string {
  return (text || '').toLowerCase().trim();
}

/**
 * Deterministic, rule-based scheme eligibility engine.
 * Evaluates demographics, income ranges, occupation, education, and identifies missing or additional requirements.
 */
export function evaluateSchemeEligibility(
  profile: UserProfile | null | undefined,
  scheme: Scheme
): SchemeEligibilityEvaluation {
  const criteria: CriterionResult[] = [];
  const missingFieldNames: string[] = [];
  const el = scheme.eligibility;

  // Anonymous / unauthenticated profile
  if (!profile) {
    return {
      schemeId: scheme.id,
      schemeName: scheme.name,
      status: 'Insufficient Information',
      summary: 'Please sign in and complete your citizen profile to assess eligibility.',
      criteria: [
        {
          id: 'auth_required',
          title: 'Citizen Profile',
          status: 'missing',
          message: 'Sign in to assess preliminary eligibility against this scheme.'
        }
      ],
      missingFieldNames: ['Profile'],
      passedCount: 0,
      failedCount: 0,
      missingCount: 1,
      isEligible: false,
      explanation: 'Sign in with your citizen account to evaluate whether you qualify.'
    };
  }

  // 1. Age Verification
  const hasMinAge = el.minimumAge !== null && el.minimumAge !== undefined;
  const hasMaxAge = el.maximumAge !== null && el.maximumAge !== undefined;

  if (hasMinAge || hasMaxAge) {
    const min = hasMinAge ? el.minimumAge! : 0;
    const max = hasMaxAge ? el.maximumAge! : 120;
    const ageLabel = hasMinAge && hasMaxAge
      ? `Between ${min} and ${max} years`
      : hasMinAge
      ? `Minimum ${min} years`
      : `Up to ${max} years`;

    if (profile.age === undefined || profile.age === null || isNaN(profile.age)) {
      missingFieldNames.push('Age');
      criteria.push({
        id: 'age',
        title: 'Age Requirement',
        status: 'missing',
        message: `Scheme requires: ${ageLabel}. Age is missing in your profile.`,
        requiredValue: ageLabel
      });
    } else {
      const satisfiesMin = hasMinAge ? profile.age >= el.minimumAge! : true;
      const satisfiesMax = hasMaxAge ? profile.age <= el.maximumAge! : true;

      if (satisfiesMin && satisfiesMax) {
        criteria.push({
          id: 'age',
          title: 'Age Requirement',
          status: 'satisfied',
          message: `Your age (${profile.age} years) satisfies the age criterion (${ageLabel}).`,
          userValue: `${profile.age} years`,
          requiredValue: ageLabel
        });
      } else {
        criteria.push({
          id: 'age',
          title: 'Age Requirement',
          status: 'failed',
          message: `Your age (${profile.age} years) does not meet the requirement (${ageLabel}).`,
          userValue: `${profile.age} years`,
          requiredValue: ageLabel
        });
      }
    }
  }

  // 2. Gender Verification
  const targetGenders = (el.allowedGenders || []).map(g => normalizeText(g));
  const isGenderRestricted = targetGenders.length > 0 && !targetGenders.includes('all') && !targetGenders.includes('any');

  if (isGenderRestricted) {
    if (!profile.gender) {
      missingFieldNames.push('Gender');
      criteria.push({
        id: 'gender',
        title: 'Gender Requirement',
        status: 'missing',
        message: `Scheme is restricted to: ${el.allowedGenders.join(', ')}. Gender is not specified in your profile.`,
        requiredValue: el.allowedGenders.join(', ')
      });
    } else {
      const userGender = normalizeText(profile.gender);
      const genderMatches = targetGenders.includes(userGender);

      if (genderMatches) {
        criteria.push({
          id: 'gender',
          title: 'Gender Requirement',
          status: 'satisfied',
          message: `Your gender (${profile.gender}) matches the target group.`,
          userValue: profile.gender,
          requiredValue: el.allowedGenders.join(', ')
        });
      } else {
        criteria.push({
          id: 'gender',
          title: 'Gender Requirement',
          status: 'failed',
          message: `Scheme is intended for: ${el.allowedGenders.join(', ')}. Registered gender: ${profile.gender}.`,
          userValue: profile.gender,
          requiredValue: el.allowedGenders.join(', ')
        });
      }
    }
  }

  // 3. State / Jurisdiction Verification
  const targetStates = (el.allowedStates || []).map(s => normalizeText(s));
  const isPanIndia = targetStates.length === 0 || 
    targetStates.includes('all states') || 
    targetStates.includes('all india') || 
    targetStates.includes('all');

  if (!isPanIndia) {
    if (!profile.state) {
      missingFieldNames.push('State of Residence');
      criteria.push({
        id: 'state',
        title: 'State / Residence Requirement',
        status: 'missing',
        message: `Applicable state(s): ${el.allowedStates.join(', ')}. State is missing in your profile.`,
        requiredValue: el.allowedStates.join(', ')
      });
    } else {
      const userState = normalizeText(profile.state);
      const stateMatches = targetStates.some(ts => ts === userState);

      if (stateMatches) {
        criteria.push({
          id: 'state',
          title: 'State / Residence Requirement',
          status: 'satisfied',
          message: `Your state of residence (${profile.state}) matches the scheme jurisdiction.`,
          userValue: profile.state,
          requiredValue: el.allowedStates.join(', ')
        });
      } else {
        criteria.push({
          id: 'state',
          title: 'State / Residence Requirement',
          status: 'failed',
          message: `Scheme applies only in ${el.allowedStates.join(', ')}. Your registered state is ${profile.state}.`,
          userValue: profile.state,
          requiredValue: el.allowedStates.join(', ')
        });
      }
    }
  } else {
    // Pan-India neutral wording according to instructions
    criteria.push({
      id: 'state_all',
      title: 'Jurisdiction & Location',
      status: 'satisfied',
      message: 'No state restriction is specified in the eligibility data currently stored in the system.',
      userValue: profile.state || 'India',
      requiredValue: 'All States / Pan-India'
    });
  }

  // 4. Annual Income Verification (supporting BOTH incomeMinimum and incomeMaximum)
  const hasMinIncome = el.incomeMinimum !== null && el.incomeMinimum !== undefined;
  const hasMaxIncome = el.incomeMaximum !== null && el.incomeMaximum !== undefined;

  if (hasMinIncome || hasMaxIncome) {
    const formattedMin = hasMinIncome ? `₹${el.incomeMinimum!.toLocaleString('en-IN')}` : null;
    const formattedMax = hasMaxIncome ? `₹${el.incomeMaximum!.toLocaleString('en-IN')}` : null;
    const incomeLabel = hasMinIncome && hasMaxIncome
      ? `Between ${formattedMin} and ${formattedMax}`
      : hasMinIncome
      ? `Minimum ${formattedMin}`
      : `Up to ${formattedMax}`;

    if (profile.annualIncome === undefined || profile.annualIncome === null || isNaN(profile.annualIncome)) {
      missingFieldNames.push('Annual Income');
      criteria.push({
        id: 'income',
        title: 'Annual Income Range',
        status: 'missing',
        message: `Scheme requires income: ${incomeLabel}. Annual income is missing in your profile.`,
        requiredValue: incomeLabel
      });
    } else {
      const meetsMin = hasMinIncome ? profile.annualIncome >= el.incomeMinimum! : true;
      const meetsMax = hasMaxIncome ? profile.annualIncome <= el.incomeMaximum! : true;

      if (meetsMin && meetsMax) {
        criteria.push({
          id: 'income',
          title: 'Annual Income Range',
          status: 'satisfied',
          message: `Your annual income (₹${profile.annualIncome.toLocaleString('en-IN')}) satisfies the specified threshold (${incomeLabel}).`,
          userValue: `₹${profile.annualIncome.toLocaleString('en-IN')}`,
          requiredValue: incomeLabel
        });
      } else {
        criteria.push({
          id: 'income',
          title: 'Annual Income Range',
          status: 'failed',
          message: `Your annual income (₹${profile.annualIncome.toLocaleString('en-IN')}) falls outside the criteria (${incomeLabel}).`,
          userValue: `₹${profile.annualIncome.toLocaleString('en-IN')}`,
          requiredValue: incomeLabel
        });
      }
    }
  }

  // 5. Occupation Verification (Normalized matching, no arbitrary substring matching)
  const targetOccs = (el.allowedOccupations || []).map(o => normalizeText(o));
  const isOccRestricted = targetOccs.length > 0 && !targetOccs.includes('any') && !targetOccs.includes('all');

  if (isOccRestricted) {
    if (!profile.occupation) {
      missingFieldNames.push('Occupation');
      criteria.push({
        id: 'occupation',
        title: 'Occupation Requirement',
        status: 'missing',
        message: `Target occupations: ${el.allowedOccupations.join(', ')}. Occupation is missing in your profile.`,
        requiredValue: el.allowedOccupations.join(', ')
      });
    } else {
      const canonicalUserOcc = normalizeOccupation(profile.occupation);
      const userOccNorm = normalizeText(profile.occupation);

      const occMatch = targetOccs.some(allowed => {
        const allowedNorm = normalizeText(allowed);
        const canonicalAllowed = normalizeOccupation(allowed);
        return canonicalAllowed === canonicalUserOcc || allowedNorm === userOccNorm;
      });

      if (occMatch) {
        criteria.push({
          id: 'occupation',
          title: 'Occupation Requirement',
          status: 'satisfied',
          message: `Your occupation (${profile.occupation}) matches the intended beneficiary group.`,
          userValue: profile.occupation,
          requiredValue: el.allowedOccupations.join(', ')
        });
      } else {
        criteria.push({
          id: 'occupation',
          title: 'Occupation Requirement',
          status: 'failed',
          message: `Scheme target groups are: ${el.allowedOccupations.join(', ')}. Registered occupation: ${profile.occupation}.`,
          userValue: profile.occupation,
          requiredValue: el.allowedOccupations.join(', ')
        });
      }
    }
  }

  // 6. Education Verification (Hierarchy-based, no arbitrary substring matching)
  const targetEdus = (el.allowedEducationLevels || []).map(e => normalizeText(e));
  const isEduRestricted = targetEdus.length > 0 && !targetEdus.includes('any') && !targetEdus.includes('all');

  if (isEduRestricted) {
    if (!profile.education) {
      missingFieldNames.push('Education Level');
      criteria.push({
        id: 'education',
        title: 'Educational Qualification',
        status: 'missing',
        message: `Required education: ${el.allowedEducationLevels.join(', ')}. Education is missing in your profile.`,
        requiredValue: el.allowedEducationLevels.join(', ')
      });
    } else {
      const userRank = getEducationLevelRank(profile.education);

      // Evaluate whether user's rank satisfies the minimum required rank among targets
      let eduMatch = false;
      const targetRanks = targetEdus
        .map(t => getEducationLevelRank(t))
        .filter((r): r is number => r !== null);

      if (userRank !== null && targetRanks.length > 0) {
        const minTargetRank = Math.min(...targetRanks);
        eduMatch = userRank >= minTargetRank;
      } else {
        // Fallback to exact normalized string match
        const userNorm = normalizeText(profile.education);
        eduMatch = targetEdus.some(t => t === userNorm);
      }

      if (eduMatch) {
        criteria.push({
          id: 'education',
          title: 'Educational Qualification',
          status: 'satisfied',
          message: `Your qualification (${profile.education}) satisfies the requirement (${el.allowedEducationLevels.join(', ')}).`,
          userValue: profile.education,
          requiredValue: el.allowedEducationLevels.join(', ')
        });
      } else {
        criteria.push({
          id: 'education',
          title: 'Educational Qualification',
          status: 'failed',
          message: `Scheme specifies: ${el.allowedEducationLevels.join(', ')}. Registered level: ${profile.education}.`,
          userValue: profile.education,
          requiredValue: el.allowedEducationLevels.join(', ')
        });
      }
    }
  }

  // Count criteria results
  const passedCount = criteria.filter(c => c.status === 'satisfied').length;
  const failedCount = criteria.filter(c => c.status === 'failed').length;
  const missingCount = criteria.filter(c => c.status === 'missing').length;

  // Strict 3-status model: 'Likely Eligible' | 'Not Eligible' | 'Insufficient Information'
  let status: EligibilityStatus = 'Likely Eligible';
  let summary = '';
  let explanation = '';

  if (failedCount > 0) {
    status = 'Not Eligible';
    summary = `Your profile does not satisfy ${failedCount} requirement(s).`;
    explanation = `Based on your profile, you do not qualify for this scheme due to specific criteria (such as ${criteria.find(c => c.status === 'failed')?.title.toLowerCase() || 'criteria'}).`;
  } else if (missingCount > 0) {
    status = 'Insufficient Information';
    summary = `Please complete ${missingFieldNames.join(', ')} in your profile to assess eligibility.`;
    explanation = `We could not evaluate all conditions because your profile is missing key details (${missingFieldNames.join(', ')}).`;
  } else {
    // Check if additional un-evaluatable conditions exist
    const hasAdditionalRequirements = el.otherRequirements && el.otherRequirements.length > 0;
    status = 'Likely Eligible';

    if (hasAdditionalRequirements) {
      summary = 'Your profile matches the primary criteria. Additional verification may be required.';
      explanation = 'Your profile matches the demographic and economic rules stored in the database. Additional verification may be required by the scheme authority for specific criteria (such as landholding, documents, or household status).';
    } else {
      summary = 'Your available profile information matches the stored eligibility criteria.';
      explanation = 'Your profile satisfies the primary demographic, geographic, and economic criteria stored for this scheme.';
    }
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    status,
    summary,
    criteria,
    missingFieldNames,
    passedCount,
    failedCount,
    missingCount,
    isEligible: status === 'Likely Eligible',
    explanation
  };
}

/**
 * Calculates a match score (0 to 100) and transparent recommendation reason.
 * Kept separate from legal eligibility determination.
 */
export function getSchemeRecommendation(
  profile: UserProfile | null | undefined, 
  scheme: Scheme
): {
  score: number;
  isRecommended: boolean;
  reason: string;
} {
  // If no user profile exists, return featured/catalog status without fabricating popularity
  if (!profile) {
    return {
      score: scheme.featured ? 60 : 40,
      isRecommended: scheme.featured,
      reason: scheme.featured 
        ? 'Featured scheme in the current database.' 
        : 'Scheme listed in the general catalog.'
    };
  }

  const evaluation = evaluateSchemeEligibility(profile, scheme);
  if (evaluation.status === 'Not Eligible') {
    return {
      score: 10,
      isRecommended: false,
      reason: 'Not currently eligible based on profile parameters.'
    };
  }

  let score = 50;
  const reasons: string[] = [];

  // Occupation match via canonical categories
  if (profile.occupation) {
    const userOccNorm = normalizeOccupation(profile.occupation);
    const hasOccMatch = (scheme.eligibility.allowedOccupations || []).some(o => 
      normalizeOccupation(o) === userOccNorm || normalizeText(o) === normalizeText(profile.occupation)
    );
    if (hasOccMatch) {
      score += 25;
      reasons.push(`matches your occupation as ${profile.occupation}`);
    }
  }

  // Student specific category
  if (profile.occupation === 'Student' && scheme.categoryId === 'education') {
    score += 20;
    reasons.push('tailored for students pursuing education');
  }

  // Farmer specific category
  if (profile.occupation && normalizeOccupation(profile.occupation) === 'farmer' && scheme.categoryId === 'agriculture') {
    score += 20;
    reasons.push('designed specifically for farmers and agrarian households');
  }

  // Age match
  if (profile.age) {
    if (profile.age >= 60 && (scheme.categoryId === 'senior-citizens' || scheme.categoryName.toLowerCase().includes('senior'))) {
      score += 20;
      reasons.push('provides dedicated social security for senior citizens');
    } else if (profile.age <= 25 && (scheme.categoryId === 'education' || scheme.categoryId === 'employment')) {
      score += 15;
      reasons.push('aimed at youth development and skill building');
    }
  }

  // Gender match
  if (profile.gender === 'Female' && (scheme.categoryId === 'women-child' || (scheme.eligibility.allowedGenders || []).includes('Female'))) {
    score += 20;
    reasons.push('dedicated welfare program for women');
  }

  // Income alignment based on scheme's actual threshold (NOT arbitrary universal 300,000)
  if (profile.annualIncome && scheme.eligibility.incomeMaximum && profile.annualIncome <= scheme.eligibility.incomeMaximum) {
    score += 15;
    reasons.push(`qualifies under the scheme income ceiling (₹${scheme.eligibility.incomeMaximum.toLocaleString('en-IN')})`);
  }

  if (evaluation.status === 'Likely Eligible') {
    score += 15;
  }

  const finalScore = Math.min(Math.max(score, 20), 100);
  const isRecommended = finalScore >= 65;

  const reason = reasons.length > 0 
    ? `Recommended because your profile ${reasons.slice(0, 2).join(' and ')}.`
    : 'Recommended based on your demographic profile and location.';

  return {
    score: finalScore,
    isRecommended,
    reason
  };
}
