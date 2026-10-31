import React from 'react';
import { 
  Building, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Scheme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SchemeCardProps {
  scheme: Scheme;
  isSaved?: boolean;
  onToggleSave?: (scheme: Scheme) => void;
  onViewDetails: (schemeId: string) => void;
  onCheckEligibility?: (schemeId: string) => void;
  recommendationReason?: string;
  matchScore?: number;
  eligibilityStatus?: 'eligible' | 'ineligible' | 'info_needed';
  ineligibilityReason?: string;
}

// Category pill colors adhering to the High Density design theme
function getCategoryPillClasses(categoryName: string): string {
  const cat = categoryName.toLowerCase();
  if (cat.includes('agri') || cat.includes('farm')) {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (cat.includes('health') || cat.includes('medical')) {
    return 'bg-rose-100 text-rose-700';
  }
  if (cat.includes('edu') || cat.includes('student') || cat.includes('scholar')) {
    return 'bg-amber-100 text-amber-700';
  }
  if (cat.includes('finance') || cat.includes('bank') || cat.includes('business') || cat.includes('msme') || cat.includes('loan')) {
    return 'bg-blue-100 text-blue-700';
  }
  if (cat.includes('housing') || cat.includes('urban') || cat.includes('rural')) {
    return 'bg-teal-100 text-teal-700';
  }
  return 'bg-indigo-100 text-indigo-700';
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  isSaved = false,
  onToggleSave,
  onViewDetails,
  onCheckEligibility,
  recommendationReason,
  matchScore,
  eligibilityStatus,
  ineligibilityReason
}) => {
  const { t, getLocalizedState, getLocalizedScheme } = useLanguage();
  const localized = getLocalizedScheme(scheme);
  const isPanIndia = scheme.eligibility.allowedStates?.includes('All States') || 
                     scheme.eligibility.allowedStates?.includes('All India');
  const targetState = isPanIndia 
    ? (t.allStatesTerritories || 'Pan India') 
    : getLocalizedState(scheme.eligibility.allowedStates?.[0] || 'State Specific');
  const targetBeneficiary = scheme.eligibility.beneficiaryTypes?.[0] || t.targetGroup || 'Eligible Citizens';

  return (
    <div 
      id={`scheme-card-${scheme.id}`}
      className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-400 transition-all flex flex-col gap-4 shadow-2xs group"
    >
      {/* Top row: Category Badge & Status / Save */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getCategoryPillClasses(localized.categoryName)}`}>
            {localized.categoryName}
          </span>

          {scheme.featured && (
            <span className="px-1.5 py-1 bg-amber-50 text-amber-800 rounded text-[10px] font-bold uppercase border border-amber-200">
              ★ {t.flagship}
            </span>
          )}

          {matchScore !== undefined && matchScore >= 70 && (
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{matchScore}% {t.match}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Eligibility status badge if evaluated */}
          {eligibilityStatus === 'eligible' && (
            <div className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
              {t.eligible}
            </div>
          )}
          {eligibilityStatus === 'ineligible' && (
            <div className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider">
              {t.ineligible}
            </div>
          )}
          {eligibilityStatus === 'info_needed' && (
            <div className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase tracking-wider">
              {t.infoNeeded}
            </div>
          )}

          {/* Quick Bookmark Toggle */}
          {onToggleSave && (
            <button
              id={`btn-save-scheme-${scheme.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(scheme);
              }}
              title={isSaved ? t.saved : t.saveScheme}
              className={`p-1 rounded transition-colors ${
                isSaved 
                  ? 'text-indigo-600 hover:text-indigo-700' 
                  : 'text-slate-400 hover:text-indigo-600'
              }`}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 fill-indigo-600 text-indigo-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Title and Department */}
      <div>
        <h4 
          onClick={() => onViewDetails(scheme.id)}
          className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer text-sm sm:text-base mb-1 line-clamp-2 leading-snug"
        >
          {localized.name}
        </h4>
        <p className="text-[11px] text-slate-700 truncate font-medium flex items-center gap-1">
          <Building className="w-3 h-3 text-slate-700 shrink-0" />
          <span className="truncate">{localized.department || localized.ministry}</span>
        </p>
        <p className="text-xs text-slate-700 mt-2 line-clamp-2 leading-relaxed">
          {localized.shortDescription}
        </p>
      </div>

      {/* High Density Metric Stat Grid */}
      <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-xs">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
            {t.benefit}
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
            {localized.keyBenefit}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
            {t.targetGroup}
          </p>
          <p className="text-xs sm:text-sm font-medium text-slate-800 line-clamp-1">
            {targetState}
          </p>
        </div>
      </div>

      {/* Reason or note if available */}
      {ineligibilityReason && (
        <div className="text-[10px] text-rose-600 font-medium italic">
          {t.reason || 'Reason'}: {ineligibilityReason}
        </div>
      )}

      {recommendationReason && !ineligibilityReason && (
        <div className="text-[10px] text-indigo-700 font-medium bg-indigo-50/70 px-2 py-1 rounded">
          💡 {recommendationReason}
        </div>
      )}

      {/* Card Action Row */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <button 
          id={`btn-view-details-${scheme.id}`}
          onClick={() => onViewDetails(scheme.id)}
          className="text-indigo-600 text-xs font-bold hover:underline inline-flex items-center gap-1 transition-all"
        >
          <span>{t.detailsAndCriteria}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {onCheckEligibility && (
            <button
              id={`btn-check-eligibility-${scheme.id}`}
              onClick={() => onCheckEligibility(scheme.id)}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 px-2 py-1 rounded hover:bg-emerald-50 transition-colors inline-flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{t.checkEligibility}</span>
            </button>
          )}

          {onToggleSave && (
            <button 
              id={`btn-toggle-save-${scheme.id}`}
              onClick={() => onToggleSave(scheme)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors ${
                isSaved
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isSaved ? t.saved : t.saveScheme}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
