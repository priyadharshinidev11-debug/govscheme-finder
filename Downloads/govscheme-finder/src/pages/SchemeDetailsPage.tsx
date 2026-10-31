import React, { useMemo } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  CheckSquare, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Users, 
  IndianRupee, 
  Sparkles,
  Share2
} from 'lucide-react';
import { Scheme } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';
import { 
  getCriterionLabel, 
  getLocalizedCriterionExplanation, 
  getLocalizedEvaluationSummary 
} from '../utils/eligibilityI18n';

interface SchemeDetailsPageProps {
  scheme: Scheme;
  isSaved: boolean;
  onToggleSave: (scheme: Scheme) => void;
  onBack: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SchemeDetailsPage: React.FC<SchemeDetailsPageProps> = ({
  scheme,
  isSaved,
  onToggleSave,
  onBack,
  onNavigate
}) => {
  const { user, profile } = useAuth();
  const { 
    t, 
    getLocalizedScheme, 
    getLocalizedState, 
    getLocalizedOccupation, 
    getLocalizedEducation, 
    language 
  } = useLanguage();

  if (!scheme) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-lg font-bold text-slate-900">Scheme Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The requested government scheme record could not be found or may have been removed.
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
        >
          Back to Schemes
        </button>
      </div>
    );
  }

  const localizedScheme = getLocalizedScheme(scheme);

  // Evaluate user's eligibility in real time for this scheme
  const evaluation = useMemo(() => {
    return evaluateSchemeEligibility(profile, scheme);
  }, [profile, scheme]);

  const evalExplanation = useMemo(() => {
    let statusKey: 'eligible' | 'likely_eligible' | 'missing_info' | 'ineligible' = 'likely_eligible';
    if (evaluation.status === 'Likely Eligible') statusKey = 'likely_eligible';
    else if (evaluation.status === 'Not Eligible') statusKey = 'ineligible';
    else if (evaluation.status === 'Insufficient Information') statusKey = 'missing_info';
    return getLocalizedEvaluationSummary(statusKey, language) || evaluation.explanation;
  }, [evaluation.status, evaluation.explanation, language]);

  const el = scheme.eligibility;

  const displayBenefits = localizedScheme.benefits && localizedScheme.benefits.length > 0
    ? localizedScheme.benefits
    : scheme.benefits;

  const displayDocuments = localizedScheme.requiredDocuments && localizedScheme.requiredDocuments.length > 0
    ? localizedScheme.requiredDocuments
    : scheme.requiredDocuments;

  const displayProcess = localizedScheme.applicationProcess && localizedScheme.applicationProcess.length > 0
    ? localizedScheme.applicationProcess
    : scheme.applicationProcess;

  const sourceUrl = scheme.sourceUrl || scheme.officialUrl;
  const applicationUrl = scheme.applicationUrl;

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            id="scheme-details-back-btn"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToSchemes}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="scheme-details-save-btn"
              onClick={() => onToggleSave(scheme)}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                  <span>{t.bookmarked}</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>{t.saveScheme}</span>
                </>
              )}
            </button>

            {sourceUrl && (
              <a
                id="scheme-details-source-btn"
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-slate-400 text-slate-700 shadow-2xs transition-colors"
                title="View Source Page"
              >
                <span>View Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {applicationUrl && (
              <a
                id="scheme-details-apply-btn"
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-700 hover:bg-indigo-800 text-white shadow-xs transition-colors"
              >
                <span>Apply / Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Header Information Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {localizedScheme.categoryName}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              scheme.status === 'active' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              ● {scheme.status === 'active' ? t.activeScheme : t.inactiveScheme}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>{scheme.verificationStatus}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {localizedScheme.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{localizedScheme.department}</span>
            </div>
            {localizedScheme.ministry && (
              <div className="flex items-center space-x-1.5 text-slate-500">
                <span>•</span>
                <span>{localizedScheme.ministry}</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{t.lastVerified}: {scheme.lastVerifiedAt || 'Verification date not available'}</span>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {localizedScheme.description}
          </p>

          {/* Scheme Objective Callout */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              {t.keyObjective}
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {localizedScheme.objective || scheme.objective}
            </p>
          </div>

        </div>

        {/* Real-time Eligibility Assessment Card for this specific scheme */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t.yourEligibilityAssessment}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t.evaluatedRealtime}
              </p>
            </div>

            {/* Status Badge */}
            <div className="shrink-0">
              <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
                evaluation.status === 'Likely Eligible'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : evaluation.status === 'Not Eligible'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                <span>
                  {evaluation.status === 'Likely Eligible' 
                    ? t.likelyEligible 
                    : evaluation.status === 'Not Eligible' 
                    ? t.notEligible 
                    : t.infoNeeded}
                </span>
              </span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <p className="text-sm font-medium text-slate-800">
              {evalExplanation}
            </p>

            {/* Detailed Criteria Checklist */}
            <div className="space-y-2.5 pt-2">
              {evaluation.criteria.map((crit) => (
                <div 
                  key={crit.id}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 ${
                    crit.status === 'satisfied'
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : crit.status === 'failed'
                      ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                      : 'bg-amber-50/60 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {crit.status === 'satisfied' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    {crit.status === 'failed' && (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                    {crit.status === 'missing' && (
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {getCriterionLabel(crit.id, language) || crit.title}
                      </span>
                      {crit.status === 'satisfied' && (
                        <span className="text-[11px] font-semibold text-emerald-700">✓ {t.satisfied}</span>
                      )}
                      {crit.status === 'failed' && (
                        <span className="text-[11px] font-semibold text-rose-700">✗ {t.notMet}</span>
                      )}
                      {crit.status === 'missing' && (
                        <span className="text-[11px] font-semibold text-amber-700">⚠ {t.infoMissing}</span>
                      )}
                    </div>
                    <p className="mt-1 leading-relaxed text-xs opacity-90">
                      {getLocalizedCriterionExplanation(crit.id, crit.status === 'satisfied' ? 'satisfied' : crit.status === 'failed' ? 'failed' : 'missing_info', language) || crit.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Update Profile prompt if info missing */}
            {evaluation.missingCount > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-amber-900">
                  <strong>{t.completeYourProfile}:</strong> Updating your {evaluation.missingFieldNames.join(', ')} will provide an accurate eligibility confirmation.
                </div>
                <button
                  onClick={() => onNavigate(user ? 'profile' : 'login')}
                  className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  {user ? t.updateProfile : t.signInToAssess}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.benefitsAndEntitlements}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.primaryBenefit}:
            </span>
            <p className="text-base font-bold text-emerald-950 mt-1">
              {localizedScheme.keyBenefit}
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.completeListOfBenefits}:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {displayBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Structured Eligibility Criteria Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Eligibility Criteria
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.ageRequirement}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.minimumAge !== null && el.maximumAge !== null
                  ? `${el.minimumAge} - ${el.maximumAge}`
                  : el.minimumAge !== null
                  ? `≥ ${el.minimumAge}`
                  : el.maximumAge !== null
                  ? `≤ ${el.maximumAge}`
                  : '-'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.incomeLimit}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.incomeMaximum !== null && el.incomeMaximum !== undefined
                  ? `≤ ₹${el.incomeMaximum.toLocaleString('en-IN')}`
                  : el.incomeMinimum !== null && el.incomeMinimum !== undefined
                  ? `≥ ₹${el.incomeMinimum.toLocaleString('en-IN')}`
                  : t.noIncomeCeiling}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.geographicScope}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.allowedStates.includes('All States') ? t.allStatesTerritories : el.allowedStates.map(s => getLocalizedState(s)).join(', ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.targetOccupations}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.allowedOccupations.map(o => getLocalizedOccupation(o)).join(', ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.educationalQualification}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.allowedEducationLevels.map(e => getLocalizedEducation(e)).join(', ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">{t.targetGender}</span>
              <span className="font-bold text-slate-900 text-sm mt-1 block">
                {el.allowedGenders.map(g => g === 'Male' ? (t.male || 'Male') : g === 'Female' ? (t.female || 'Female') : g === 'Transgender' ? (t.transgender || 'Transgender') : (t.allBeneficiaries || g)).join(', ')}
              </span>
            </div>

          </div>

          {el.otherRequirements && el.otherRequirements.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                {t.additionalConditions}:
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {el.otherRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-400">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Required Documents Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.requiredDocumentsTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            {t.requiredDocumentsSub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayDocuments.map((doc, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start space-x-2 text-xs sm:text-sm text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.howToApply}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              {t.applicationMethod}: {scheme.applicationMethod}
            </span>
          </div>

          <ol className="space-y-4 relative border-l-2 border-indigo-200 ml-4 pl-6 my-6 text-xs sm:text-sm">
            {displayProcess.map((step, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">{t.officialSource}:</span>
              <span className="text-xs font-bold text-slate-800">{scheme.sourceName}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs shadow-2xs transition-colors inline-flex items-center justify-center space-x-1.5"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {applicationUrl ? (
                <a
                  href={applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-xs transition-colors inline-flex items-center justify-center space-x-1.5"
                >
                  <span>Apply / Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Application link not available (refer to source/offline method)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Guidance Disclaimer */}
        <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <p>
            <strong>{t.statutoryNotice}:</strong> Eligibility information provided by this platform is intended for guidance. Final eligibility is determined by the relevant government authority. {scheme.verificationStatus === 'Verified' ? `Reviewed against source documentation from ${scheme.sourceName}.` : `Source authority: ${scheme.sourceName}.`}
          </p>
        </div>

      </div>
    </div>
  );
};
