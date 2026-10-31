export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  age?: number;
  gender?: 'Male' | 'Female' | 'Transgender' | 'Other' | 'Prefer not to say';
  state?: string;
  district?: string;
  occupation?: string;
  education?: string;
  annualIncome?: number;
  incomeRange?: string;
  socialCategory?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';
  isStudent?: boolean;
  isFarmer?: boolean;
  isDifferentlyAbled?: boolean;
  isBPL?: boolean; // Below Poverty Line
  hasDisability?: boolean;
  maritalStatus?: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  createdAt?: string;
  updatedAt?: string;
}

export interface SchemeEligibility {
  minimumAge?: number | null;
  maximumAge?: number | null;
  incomeMaximum?: number | null;
  incomeMinimum?: number | null;
  allowedStates: string[]; // e.g. ["All States"] or ["Tamil Nadu", "Maharashtra"]
  allowedOccupations: string[]; // e.g. ["Any"] or ["Farmer", "Student"]
  allowedEducationLevels: string[]; // e.g. ["Any"] or ["10th Pass", "Graduate"]
  allowedGenders: string[]; // e.g. ["All"] or ["Female"]
  beneficiaryTypes: string[]; // e.g. ["Farmers", "Students", "Women", "Senior Citizens", "Entrepreneurs", "BPL Families"]
  otherRequirements?: string[];
}

export type VerificationStatus = 'Draft' | 'Needs Review' | 'Verified' | 'Inactive';

export interface Scheme {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  objective: string;
  categoryId: string;
  categoryName: string;
  department: string;
  ministry?: string;
  benefits: string[];
  keyBenefit: string;
  eligibility: SchemeEligibility;
  requiredDocuments: string[];
  applicationProcess: string[];
  applicationMethod: 'Official Ministry Portal' | 'State Portal' | 'Offline / Common Service Centre (CSC)' | 'Online' | 'Offline' | 'Online & Offline' | 'Common Service Centre (CSC)';
  officialUrl: string;
  sourceName: string;
  sourceUrl: string;
  applicationUrl?: string;
  status: 'active' | 'inactive';
  featured: boolean;
  verificationStatus: VerificationStatus;
  createdAt?: string;
  updatedAt?: string;
  lastVerifiedAt?: string;
  verifiedBy?: string;
  updatedBy?: string;
}

export interface SchemeCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  schemesCount?: number;
}

export interface SavedScheme {
  id: string;
  userId: string;
  schemeId: string;
  schemeName: string;
  categoryName: string;
  department: string;
  keyBenefit: string;
  officialUrl: string;
  savedAt: string;
}

export type EligibilityStatus = 
  | 'Likely Eligible'
  | 'Not Eligible'
  | 'Insufficient Information';

export interface CriterionResult {
  id: string;
  title: string;
  status: 'satisfied' | 'failed' | 'missing' | 'not_applicable';
  message: string;
  userValue?: string | number | boolean;
  requiredValue?: string | number | boolean;
}

export interface SchemeEligibilityEvaluation {
  schemeId: string;
  schemeName: string;
  status: EligibilityStatus;
  summary: string;
  criteria: CriterionResult[];
  missingFieldNames: string[];
  passedCount: number;
  failedCount: number;
  missingCount: number;
  isEligible: boolean;
  explanation: string;
}
