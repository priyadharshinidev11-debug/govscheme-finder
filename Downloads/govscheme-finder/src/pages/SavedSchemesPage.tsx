import React from 'react';
import { Bookmark, Trash2, ArrowRight, Building, CheckCircle2, Layers } from 'lucide-react';
import { SavedScheme, Scheme } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface SavedSchemesPageProps {
  savedSchemes: SavedScheme[];
  schemes: Scheme[];
  onRemoveSave: (schemeId: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SavedSchemesPage: React.FC<SavedSchemesPageProps> = ({
  savedSchemes,
  schemes,
  onRemoveSave,
  onNavigate
}) => {
  const { user } = useAuth();
  const { t, getLocalizedScheme } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md w-full shadow-xs">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">{t.navSignIn}</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            {t.enterDetailsToEvaluate}
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            {t.navSignIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>{t.navSaved}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.navSaved}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {t.exploreByCategorySub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('schemes')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-700 shadow-xs transition-colors shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>{t.heroBrowseSchemes}</span>
          </button>
        </div>

        {/* Saved List or Empty State */}
        {savedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedSchemes.map((item) => {
              const fullScheme = schemes.find(s => s.id === item.schemeId);
              const localizedScheme = fullScheme ? getLocalizedScheme(fullScheme) : null;
              const displayName = localizedScheme?.name || item.schemeName;
              const displayBenefit = localizedScheme?.keyBenefit || item.keyBenefit;

              return (
                <div
                  key={item.id}
                  id={`saved-item-${item.schemeId}`}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {item.categoryName}
                      </span>

                      <button
                        id={`btn-unsave-${item.schemeId}`}
                        onClick={() => onRemoveSave(item.schemeId)}
                        title="Remove bookmark"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => onNavigate('scheme-details', item.schemeId)}
                      className="text-base font-bold text-slate-900 hover:text-indigo-700 cursor-pointer transition-colors line-clamp-2"
                    >
                      {displayName}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.department}</span>
                    </p>

                    <div className="mt-4 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium line-clamp-2">
                      <strong>{t.keyBenefitLabel}:</strong> {displayBenefit}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-3">
                      {new Date(item.savedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate('eligibility', item.schemeId)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 py-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.navEligibility}</span>
                    </button>

                    <button
                      onClick={() => onNavigate('scheme-details', item.schemeId)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-700 hover:bg-indigo-800 text-white transition-colors"
                    >
                      <span>{t.viewDetailsBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.navSaved}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              {t.exploreByCategorySub}
            </p>
            <button
              id="btn-empty-saved-explore"
              onClick={() => onNavigate('schemes')}
              className="mt-6 px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              {t.heroBrowseSchemes}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
