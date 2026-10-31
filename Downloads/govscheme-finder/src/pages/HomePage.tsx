import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Shield, 
  FileText, 
  UserCheck, 
  Layers,
  ChevronRight,
  Zap,
  Lock,
  Mic,
  Globe
} from 'lucide-react';
import { Scheme, SchemeCategory } from '../types';
import { SchemeCard } from '../components/SchemeCard';
import { getCategoryIcon } from '../utils/categoryIcons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  schemes: Scheme[];
  categories: SchemeCategory[];
  savedSchemeIds: Set<string>;
  onToggleSave: (scheme: Scheme) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenTamilAssistant?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  schemes,
  categories,
  savedSchemeIds,
  onToggleSave,
  onNavigate,
  onOpenTamilAssistant
}) => {
  const { user, profile } = useAuth();
  const { language, t, languageInfo, getLocalizedCategory } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredSchemes = schemes.filter(s => s.featured && s.status === 'active').slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('schemes', searchTerm.trim());
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Civic Grid Texture */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.directCitizenPortal}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Prominent Search Box */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto pt-2"
          >
            <div className="relative flex items-center shadow-2xl rounded-2xl bg-white p-2 border border-slate-300">
              <div className="pl-3 text-slate-400">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <input
                id="home-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-4 py-3 text-slate-900 placeholder-slate-500 text-sm sm:text-base focus:outline-hidden"
              />
              <button
                id="home-search-submit"
                type="submit"
                className="shrink-0 px-5 sm:px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors shadow-md flex items-center space-x-1.5"
              >
                <span>{t.searchButton}</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="hero-btn-explore"
              onClick={() => onNavigate('schemes')}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 shadow-md transition-all flex items-center space-x-2"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>{t.exploreSchemes} ({schemes.length})</span>
            </button>

            <button
              id="hero-btn-eligibility"
              onClick={() => onNavigate('eligibility')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center space-x-2 border border-emerald-500"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
              <span>{t.checkEligibility}</span>
            </button>
          </div>

          {/* Multilingual Voice Assistance Banner for Illiterate and Rural Citizens */}
          {onOpenTamilAssistant && (
            <div className="pt-2 max-w-2xl mx-auto">
              <div 
                id="hero-tamil-voice-banner"
                onClick={onOpenTamilAssistant}
                className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-indigo-950/80 hover:from-emerald-900/90 hover:to-indigo-900/90 border border-emerald-500/40 backdrop-blur-md cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between gap-3 text-left group shadow-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform ring-4 ring-emerald-500/20">
                    <Mic className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                        {language === 'ta' ? 'தமிழ் குரல் உதவி (Tamil Voice Guide)' : 
                         language === 'hi' ? 'आवाज सहायक (Voice Guide)' : 
                         language === 'te' ? 'వాయిస్ సహాయకుడు (Voice Guide)' : 
                         language === 'kn' ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ (Voice Guide)' :
                         language === 'ml' ? 'ശബ്ദ സഹായി (Voice Guide)' :
                         language === 'bn' ? 'ভয়েস সহকারী (Voice Guide)' :
                         language === 'mr' ? 'आवाज सहाय्यक (Voice Guide)' :
                         `${languageInfo.nativeName} ${t.navVoiceGuide}`}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
                        {t.havingTroubleReading}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/90 mt-0.5 truncate">
                      {t.voiceGuidePrompt}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 hidden sm:flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:text-amber-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span>{t.speakInVoice}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          )}

          {/* National Trust Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-800/80 max-w-3xl mx-auto text-xs text-slate-400">
            <div>
              <p className="font-bold text-white text-base sm:text-lg">100%</p>
              <p>{t.officialSources}</p>
            </div>
            <div>
              <p className="font-bold text-white text-base sm:text-lg">{t.algorithmicCriteria || 'Algorithmic'}</p>
              <p>{t.criteriaMatching}</p>
            </div>
            <div>
              <p className="font-bold text-white text-base sm:text-lg">{t.zeroFee}</p>
              <p>{t.publicService}</p>
            </div>
            <div>
              <p className="font-bold text-white text-base sm:text-lg">{t.panIndia}</p>
              <p>{t.stateUnionCoverage}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>{t.sectorsAndDomains}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t.browseByCategory}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.sectorsAndDomainsDesc}
            </p>
          </div>

          <button
            onClick={() => onNavigate('categories')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((rawCat) => {
            const cat = getLocalizedCategory(rawCat);
            const schemeCount = schemes.filter(s => s.categoryId === rawCat.id && s.status === 'active').length;
            return (
              <div
                key={rawCat.id}
                id={`home-category-${rawCat.id}`}
                onClick={() => onNavigate('schemes', `category:${rawCat.id}`)}
                className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white transition-colors shrink-0">
                  {getCategoryIcon(rawCat.iconName, 'w-6 h-6')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {schemeCount} {t.schemesCountSuffix || 'schemes'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center space-x-2 text-amber-600 font-semibold text-xs tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>{t.flagshipNationalWelfare}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {t.featuredSchemes}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {t.flagshipNationalWelfareDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigate('schemes')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
            >
              <span>{t.exploreSchemes}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isSaved={savedSchemeIds.has(scheme.id)}
                onToggleSave={onToggleSave}
                onViewDetails={(id) => onNavigate('scheme-details', id)}
                onCheckEligibility={(id) => onNavigate('eligibility', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {t.transparentProcess}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">
            {t.howItWorks}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-indigo-200 shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-indigo-200 shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-indigo-200 shadow-xs">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step4Desc}
            </p>
          </div>

        </div>
      </section>

      {/* Why Use GovScheme Finder Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              {t.citizenAdvantage}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              {t.whyTitle}
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              {t.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-300 w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.centralizedDiscoveryTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.centralizedDiscoveryDesc}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 w-fit">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.structuredEngineTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.structuredEngineDesc}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 w-fit">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.personalizedMatchingTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.personalizedMatchingDesc}
              </p>
            </div>

          </div>

          {/* CTA Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-indigo-800 to-indigo-950 border border-indigo-700 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">{t.ctaReadyTitle}</h3>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">
                {t.ctaReadySubtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate(user ? 'eligibility' : 'register')}
              className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              {user ? t.ctaAssessBtn : t.ctaRegisterBtn}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
