import React, { useMemo } from 'react';
import { Sparkles, User } from 'lucide-react';
import { Scheme } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SchemeCard } from '../components/SchemeCard';
import { getSchemeRecommendation } from '../utils/eligibilityEngine';

interface RecommendationsPageProps {
  schemes: Scheme[];
  savedSchemeIds: Set<string>;
  onToggleSave: (scheme: Scheme) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  schemes,
  savedSchemeIds,
  onToggleSave,
  onNavigate
}) => {
  const { user, profile } = useAuth();
  const { t, getLocalizedState, getLocalizedOccupation } = useLanguage();

  // Compute recommendations
  const recommendations = useMemo(() => {
    return schemes
      .filter(s => s.status === 'active')
      .map(scheme => {
        const rec = getSchemeRecommendation(profile, scheme);
        return {
          scheme,
          ...rec
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [schemes, profile]);

  const recommendedSchemes = recommendations.filter(r => r.isRecommended);
  const otherSchemes = recommendations.filter(r => !r.isRecommended);

  // Completeness metric
  const profileFields = ['age', 'gender', 'state', 'occupation', 'education', 'annualIncome'];
  const filledFields = profileFields.filter(f => profile && (profile as any)[f] !== undefined && (profile as any)[f] !== '');
  const completeness = Math.round((filledFields.length / profileFields.length) * 100);

  const locState = profile?.state ? getLocalizedState(profile.state) : '';
  const locOcc = profile?.occupation ? getLocalizedOccupation(profile.occupation) : '';

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.navRecommendations}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.navRecommendations}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {t.exploreByCategorySub}
            </p>
          </div>

          <button
            onClick={() => onNavigate(user ? 'profile' : 'login')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-700 shadow-xs transition-colors shrink-0"
          >
            <User className="w-4 h-4 text-indigo-600" />
            <span>{user ? t.updateProfile : t.signIn}</span>
          </button>
        </div>

        {/* Profile Completeness Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.navProfile}: {completeness}%
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile 
                  ? `${profile.displayName || t.allBeneficiaries} • ${locOcc || profile.occupation || ''} • ${locState || profile.state || ''}`
                  : t.enterDetailsToEvaluate}
              </p>
            </div>

            <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${completeness}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Recommended Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{t.featuredSchemesTitle}</span>
            </h2>
            <span className="text-xs text-slate-500">
              {recommendedSchemes.length} {t.navSchemes}
            </span>
          </div>

          {recommendedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedSchemes.map(({ scheme, score, reason }) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={savedSchemeIds.has(scheme.id)}
                  onToggleSave={onToggleSave}
                  onViewDetails={(id) => onNavigate('scheme-details', id)}
                  onCheckEligibility={(id) => onNavigate('eligibility', id)}
                  matchScore={score}
                  recommendationReason={reason}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-sm font-bold text-slate-800">
                {t.completeYourProfile}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                {t.enterDetailsToEvaluate}
              </p>
              <button
                onClick={() => onNavigate(user ? 'profile' : 'login')}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
              >
                {user ? t.updateProfile : t.signIn}
              </button>
            </div>
          )}
        </div>

        {/* Other Verified Initiatives */}
        {otherSchemes.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-4">
              {t.allStatesTerritories} - {t.navSchemes}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherSchemes.slice(0, 4).map(({ scheme, score, reason }) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={savedSchemeIds.has(scheme.id)}
                  onToggleSave={onToggleSave}
                  onViewDetails={(id) => onNavigate('scheme-details', id)}
                  onCheckEligibility={(id) => onNavigate('eligibility', id)}
                  matchScore={score}
                  recommendationReason={reason}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
