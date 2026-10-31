import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  User, 
  ArrowRight, 
  ExternalLink, 
  RefreshCw, 
  Sparkles,
  Sliders,
  Building2,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { Scheme, UserProfile, SchemeEligibilityEvaluation } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';
import { INDIAN_STATES, OCCUPATIONS, EDUCATION_LEVELS } from '../data/seedSchemes';
import { 
  getCriterionLabel, 
  getLocalizedCriterionExplanation, 
  getLocalizedEvaluationSummary, 
  formatLocalizedYears 
} from '../utils/eligibilityI18n';

interface EligibilityPageProps {
  schemes: Scheme[];
  initialSchemeId?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({
  schemes,
  initialSchemeId,
  onNavigate
}) => {
  const { user, profile, updateProfileData } = useAuth();
  const { 
    t, 
    getLocalizedScheme, 
    getLocalizedState, 
    getLocalizedOccupation, 
    getLocalizedEducation,
    language 
  } = useLanguage();
  
  // Custom simulator state initialized from logged-in user profile, or defaults for guest
  const [age, setAge] = useState<number | string>(profile?.age ?? 24);
  const [stateVal, setStateVal] = useState<string>(profile?.state ?? 'Tamil Nadu');
  const [occupation, setOccupation] = useState<string>(profile?.occupation ?? 'Student');
  const [education, setEducation] = useState<string>(profile?.education ?? 'Undergraduate / Bachelor Degree');
  const [annualIncome, setAnnualIncome] = useState<number | string>(profile?.annualIncome ?? 200000);
  const [gender, setGender] = useState<string>(profile?.gender ?? 'Male');

  // Selected scheme for deep dive (defaults to initialSchemeId or first scheme)
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId || schemes[0]?.id || '');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(initialSchemeId || null);

  // Sync simulator if profile loads later
  React.useEffect(() => {
    if (profile) {
      if (profile.age) setAge(profile.age);
      if (profile.state) setStateVal(profile.state);
      if (profile.occupation) setOccupation(profile.occupation);
      if (profile.education) setEducation(profile.education);
      if (profile.annualIncome) setAnnualIncome(profile.annualIncome);
      if (profile.gender) setGender(profile.gender);
    }
  }, [profile]);

  // Construct simulated profile
  const simulatedProfile: UserProfile = useMemo(() => {
    return {
      uid: user?.uid || 'simulated-guest',
      email: user?.email || 'guest@example.com',
      displayName: profile?.displayName || 'Citizen Candidate',
      role: 'user',
      age: age !== '' ? Number(age) : undefined,
      state: stateVal || undefined,
      occupation: occupation || undefined,
      education: education || undefined,
      annualIncome: annualIncome !== '' ? Number(annualIncome) : undefined,
      gender: gender as any
    };
  }, [user, profile, age, stateVal, occupation, education, annualIncome, gender]);

  // Evaluate across ALL active schemes
  const allEvaluations = useMemo(() => {
    return schemes
      .filter(s => s.status === 'active')
      .map(scheme => ({
        scheme,
        evaluation: evaluateSchemeEligibility(simulatedProfile, scheme)
      }));
  }, [schemes, simulatedProfile]);

  const likelyEligible = allEvaluations.filter(e => e.evaluation.status === 'Likely Eligible');
  const insufficientInfo = allEvaluations.filter(e => e.evaluation.status === 'Insufficient Information');
  const notEligible = allEvaluations.filter(e => e.evaluation.status === 'Not Eligible');

  // Specific selected deep-dive evaluation
  const activeScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  const activeEvaluation = useMemo(() => {
    if (!activeScheme) return null;
    return evaluateSchemeEligibility(simulatedProfile, activeScheme);
  }, [simulatedProfile, activeScheme]);

  // Localized active scheme
  const locActiveScheme = useMemo(() => {
    if (!activeScheme) return activeScheme;
    return getLocalizedScheme(activeScheme);
  }, [activeScheme, getLocalizedScheme]);

  // Helper to localize eligibility status badge
  const getLocalizedStatus = (status: string) => {
    if (status === 'Likely Eligible') return t.likelyEligible || 'Likely Eligible';
    if (status === 'Insufficient Information') return t.insufficientInfo || 'Missing Info';
    if (status === 'Not Eligible') return t.notEligible || 'Not Eligible';
    return status;
  };

  // Helper to localize criterion titles
  const getLocalizedCriterionTitle = (id: string, defaultTitle: string) => {
    const customLabel = getCriterionLabel(id, language);
    if (customLabel && customLabel !== id) return customLabel;
    if (id === 'age') return t.ageRequirement || defaultTitle;
    if (id === 'gender') return t.genderLabel || defaultTitle;
    if (id === 'state') return t.stateOfResidence || defaultTitle;
    if (id === 'occupation') return t.occupation || defaultTitle;
    if (id === 'education') return t.educationLevel || defaultTitle;
    if (id === 'income') return t.annualIncome || defaultTitle;
    return defaultTitle;
  };

  // Helper to localize criterion explanation & message
  const getLocalizedCriterionMessage = (crit: any) => {
    const statusKey = crit.status === 'satisfied' ? 'satisfied' : crit.status === 'failed' ? 'failed' : 'missing_info';
    const explanation = getLocalizedCriterionExplanation(crit.id, statusKey, language);
    if (explanation) return explanation;
    return crit.message;
  };

  const getLocalizedExplanation = (status: string, explanation: string) => {
    let statusKey: 'eligible' | 'likely_eligible' | 'missing_info' | 'ineligible' = 'likely_eligible';
    if (status === 'Likely Eligible') statusKey = 'likely_eligible';
    else if (status === 'Eligible') statusKey = 'eligible';
    else if (status === 'Not Eligible') statusKey = 'ineligible';
    else if (status === 'Insufficient Information') statusKey = 'missing_info';
    
    const localized = getLocalizedEvaluationSummary(statusKey, language);
    return localized || explanation;
  };

  const getLocalizedSummary = (status: string, defaultSummary: string) => {
    let statusKey: 'eligible' | 'likely_eligible' | 'missing_info' | 'ineligible' = 'likely_eligible';
    if (status === 'Likely Eligible') statusKey = 'likely_eligible';
    else if (status === 'Eligible') statusKey = 'eligible';
    else if (status === 'Not Eligible') statusKey = 'ineligible';
    else if (status === 'Insufficient Information') statusKey = 'missing_info';
    
    const localized = getLocalizedEvaluationSummary(statusKey, language);
    return localized || defaultSummary;
  };

  // Helper to localize user value
  const formatLocalizedUserValue = (critId: string, val: any) => {
    if (val === undefined || val === null) return '';
    const strVal = String(val);
    if (critId === 'state') return getLocalizedState(strVal);
    if (critId === 'occupation') return getLocalizedOccupation(strVal);
    if (critId === 'education') return getLocalizedEducation(strVal);
    if (critId === 'gender') {
      if (strVal === 'Male') return t.male || 'Male';
      if (strVal === 'Female') return t.female || 'Female';
      if (strVal === 'Transgender') return t.transgender || 'Transgender';
      return t.otherGender || strVal;
    }
    if (critId === 'age') {
      return formatLocalizedYears(simulatedProfile.age, language);
    }
    return strVal;
  };

  // Save simulated parameters to user profile
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveToProfile = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setSaveLoading(true);
    try {
      await updateProfileData({
        age: age !== '' ? Number(age) : undefined,
        state: stateVal,
        occupation,
        education,
        annualIncome: annualIncome !== '' ? Number(annualIncome) : undefined,
        gender: gender as any
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.algorithmicMatchingEngine || 'Algorithmic Matching Engine'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.citizenSchemeEligibility || 'Citizen Scheme Eligibility Assessment'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            {t.eligibilityPageDesc || 'Compare citizen demographic, geographic, and economic parameters against structured government scheme criteria.'}
          </p>
        </div>

        {/* Top Control Bar: Candidate Profile Parameters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                <span>{t.assessmentParams || 'Eligibility Assessment Parameters'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.assessmentParamsDesc || 'Adjust values to test eligibility against age boundaries, income limits, and occupation conditions.'}
              </p>
            </div>

            {user && (
              <button
                id="btn-save-eligibility-params"
                disabled={saveLoading}
                onClick={handleSaveToProfile}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shrink-0"
              >
                {saveLoading ? (t.saving || 'Saving...') : saveSuccess ? (t.savedToProfile || '✓ Saved to Profile!') : (t.saveToProfile || 'Save to My Profile')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-5">
            
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.ageYears || 'Age (Years)'}
              </label>
              <input
                id="eligibility-input-age"
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 24"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.genderLabel || 'Gender'}
              </label>
              <select
                id="eligibility-select-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Male">{t.male || 'Male'}</option>
                <option value="Female">{t.female || 'Female'}</option>
                <option value="Transgender">{t.transgender || 'Transgender'}</option>
                <option value="Other">{t.otherGender || 'Other'}</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.stateOfResidence || 'State of Residence'}
              </label>
              <select
                id="eligibility-select-state"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {INDIAN_STATES.filter(s => s !== 'All States').map(st => (
                  <option key={st} value={st}>{getLocalizedState(st)}</option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.occupation || 'Occupation'}
              </label>
              <select
                id="eligibility-select-occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {OCCUPATIONS.filter(o => o !== 'Any').map(occ => (
                  <option key={occ} value={occ}>{getLocalizedOccupation(occ)}</option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.educationLevel || 'Education Level'}
              </label>
              <select
                id="eligibility-select-education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {EDUCATION_LEVELS.filter(ed => ed !== 'Any').map(ed => (
                  <option key={ed} value={ed}>{getLocalizedEducation(ed)}</option>
                ))}
              </select>
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.annualIncomeInr || 'Annual Income (₹)'}
              </label>
              <input
                id="eligibility-input-income"
                type="number"
                step="10000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {t.boundaryNotice || 'Evaluation matches boundary values: Exact age limit and income limits are inclusive.'}
            </span>
            <button
              onClick={() => {
                setAge(24);
                setStateVal('Tamil Nadu');
                setOccupation('Student');
                setEducation('Undergraduate / Bachelor Degree');
                setAnnualIncome(200000);
                setGender('Male');
              }}
              className="text-indigo-700 hover:text-indigo-900 font-medium"
            >
              {t.resetDefaults || 'Reset to Defaults'}
            </button>
          </div>
        </div>

        {/* Overall Assessment Summary Cards (3-status model) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {t.likelyEligible || 'Likely Eligible'}
            </span>
            <p className="text-2xl font-extrabold text-emerald-950 mt-1">
              {likelyEligible.length} {t.schemesCountSuffix || 'Schemes'}
            </p>
            <p className="text-[11px] text-emerald-800 mt-1">
              {t.allCriteriaSatisfied || 'All listed primary criteria satisfied'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {t.insufficientInfo || 'Missing Info'}
            </span>
            <p className="text-2xl font-extrabold text-amber-950 mt-1">
              {insufficientInfo.length} {t.schemesCountSuffix || 'Schemes'}
            </p>
            <p className="text-[11px] text-amber-800 mt-1">
              {t.needsProfileDetails || 'Requires missing profile details'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.notEligible || 'Not Eligible'}
            </span>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">
              {notEligible.length} {t.schemesCountSuffix || 'Schemes'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {t.didNotMeetCriteria || 'Did not meet criteria'}
            </p>
          </div>

        </div>

        {/* Two-Column Layout: Deep Dive Evaluation vs Scheme List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Deep Dive Criterion Breakdown for Selected Scheme */}
          <div className="lg:col-span-7 space-y-6">
            
            {activeScheme && activeEvaluation && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                      {t.inDepthEvaluation || 'In-Depth Scheme Evaluation'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {locActiveScheme.name}
                    </h3>
                  </div>

                  <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                    activeEvaluation.status === 'Likely Eligible'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : activeEvaluation.status === 'Not Eligible'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {getLocalizedStatus(activeEvaluation.status)}
                  </span>
                </div>

                {/* Explanation Callout */}
                <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800">
                  <p className="font-semibold text-slate-900 mb-1">
                    {t.evaluationResult || 'Evaluation Result:'}
                  </p>
                  <p>{getLocalizedExplanation(activeEvaluation.status, activeEvaluation.explanation)}</p>
                </div>

                {/* Criteria Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t.criteriaBreakdown || 'Detailed Criteria Breakdown:'}
                  </h4>

                  {activeEvaluation.criteria.map((crit) => (
                    <div 
                      key={crit.id}
                      className={`p-4 rounded-xl border text-xs sm:text-sm ${
                        crit.status === 'satisfied'
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : crit.status === 'failed'
                          ? 'bg-rose-50/50 border-rose-200'
                          : 'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          {crit.status === 'satisfied' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {crit.status === 'failed' && (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                          {crit.status === 'missing' && (
                            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <span className="font-bold text-slate-900">
                            {getLocalizedCriterionTitle(crit.id, crit.title)}
                          </span>
                        </div>

                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          crit.status === 'satisfied'
                            ? 'text-emerald-700'
                            : crit.status === 'failed'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}>
                          {crit.status === 'satisfied' ? `✓ ${t.satisfied || 'Satisfied'}` : crit.status === 'failed' ? `✗ ${t.notMet || 'Not Met'}` : `⚠ ${t.infoMissing || 'Missing'}`}
                        </span>
                      </div>

                      <p className="mt-2 text-slate-700 text-xs leading-relaxed">
                        {getLocalizedCriterionMessage(crit)}
                      </p>

                      {(crit.userValue !== undefined || crit.requiredValue !== undefined) && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                          {crit.userValue !== undefined && (
                            <span>{t.candidateValue || 'Candidate Value:'} <strong className="text-slate-800">{formatLocalizedUserValue(crit.id, crit.userValue)}</strong></span>
                          )}
                          {crit.requiredValue !== undefined && (
                            <span>{t.requiredCondition || 'Required Condition:'} <strong className="text-slate-800">{String(crit.requiredValue)}</strong></span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons for Scheme */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('scheme-details', activeScheme.id)}
                    className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{t.viewFullDetailsDocs || 'View Full Details & Documents'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-2">
                    {(activeScheme.sourceUrl || activeScheme.officialUrl) && (
                      <a
                        href={activeScheme.sourceUrl || activeScheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors inline-flex items-center space-x-1.5"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {activeScheme.applicationUrl && (
                      <a
                        href={activeScheme.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors inline-flex items-center space-x-1.5"
                      >
                        <span>Apply on Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Statutory Disclaimer */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong className="block font-bold mb-0.5">
                {t.statutoryNoticeAssessment || 'Statutory Assessment Notice:'}
              </strong>
              {t.statutoryNoticeAssessmentText || 'This automated assessment is provided strictly for guidance and awareness. The determining criteria, age relaxation, category concessions, and final sanction rest exclusively with the designated Ministry or State Department authority.'}
            </div>

          </div>

          {/* Right Column: All Schemes Assessment List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                {t.schemeResultsDirectory || 'Scheme Results Directory'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t.clickSchemeToView || 'Click any scheme below to view its full criterion-by-criterion assessment.'}
              </p>

              <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
                {allEvaluations.map(({ scheme, evaluation }) => {
                  const isSelected = scheme.id === selectedSchemeId;
                  const locScheme = getLocalizedScheme(scheme);
                  return (
                    <div
                      key={scheme.id}
                      id={`eligibility-item-${scheme.id}`}
                      onClick={() => setSelectedSchemeId(scheme.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-400'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {locScheme.categoryName}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                            {locScheme.name}
                          </h4>
                        </div>

                        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          evaluation.status === 'Likely Eligible'
                            ? 'bg-emerald-100 text-emerald-800'
                            : evaluation.status === 'Not Eligible'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {getLocalizedStatus(evaluation.status)}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2">
                        {getLocalizedSummary(evaluation.status, evaluation.summary)}
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>
                          {evaluation.passedCount} {t.satisfiedCountText || 'satisfied'} • {evaluation.failedCount} {t.failedCountText || 'failed'}
                        </span>
                        <span className="text-indigo-700 font-semibold hover:underline">
                          {t.selectAndInspect || 'Select & Inspect →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

