import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown, 
  Building, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { Scheme, SchemeCategory } from '../types';
import { SchemeCard } from '../components/SchemeCard';
import { INDIAN_STATES, OCCUPATIONS } from '../data/seedSchemes';
import { useLanguage } from '../context/LanguageContext';

interface SchemesPageProps {
  schemes: Scheme[];
  categories: SchemeCategory[];
  savedSchemeIds: Set<string>;
  initialFilter?: string;
  onToggleSave: (scheme: Scheme) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SchemesPage: React.FC<SchemesPageProps> = ({
  schemes,
  categories,
  savedSchemeIds,
  initialFilter,
  onToggleSave,
  onNavigate
}) => {
  const { t, getLocalizedState, getLocalizedOccupation, getLocalizedCategory } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedOccupation, setSelectedOccupation] = useState('all');
  const [selectedIncomeLimit, setSelectedIncomeLimit] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'recent'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Parse initialFilter on mount if provided
  useEffect(() => {
    if (initialFilter) {
      if (initialFilter.startsWith('category:')) {
        const catId = initialFilter.replace('category:', '');
        setSelectedCategory(catId);
      } else {
        setSearchTerm(initialFilter);
      }
    }
  }, [initialFilter]);

  // Filter and sort schemes
  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      if (scheme.status !== 'active') return false;

      // Search match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = scheme.name.toLowerCase().includes(query);
        const descMatch = scheme.description.toLowerCase().includes(query) || scheme.shortDescription.toLowerCase().includes(query);
        const deptMatch = scheme.department?.toLowerCase().includes(query) || scheme.ministry?.toLowerCase().includes(query);
        const catMatch = scheme.categoryName?.toLowerCase().includes(query);
        const benefitMatch = scheme.keyBenefit?.toLowerCase().includes(query);
        
        if (!nameMatch && !descMatch && !deptMatch && !catMatch && !benefitMatch) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && scheme.categoryId !== selectedCategory) {
        return false;
      }

      // State filter
      if (selectedState !== 'all') {
        const isAllIndia = scheme.eligibility.allowedStates?.includes('All States') || 
                           scheme.eligibility.allowedStates?.includes('All India');
        const stateMatch = scheme.eligibility.allowedStates?.includes(selectedState);
        if (!isAllIndia && !stateMatch) {
          return false;
        }
      }

      // Occupation filter
      if (selectedOccupation !== 'all') {
        const isAny = scheme.eligibility.allowedOccupations?.includes('Any') || 
                      scheme.eligibility.allowedOccupations?.length === 0;
        const occMatch = scheme.eligibility.allowedOccupations?.includes(selectedOccupation);
        if (!isAny && !occMatch) {
          return false;
        }
      }

      // Income limit filter
      if (selectedIncomeLimit !== 'all') {
        const maxInc = scheme.eligibility.incomeMaximum;
        if (selectedIncomeLimit === 'under250k' && maxInc !== null && maxInc !== undefined && maxInc > 250000) {
          return false;
        }
        if (selectedIncomeLimit === 'under500k' && maxInc !== null && maxInc !== undefined && maxInc > 500000) {
          return false;
        }
        if (selectedIncomeLimit === 'no-limit' && (maxInc !== null && maxInc !== undefined)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'recent') {
        return (b.lastVerifiedAt || '').localeCompare(a.lastVerifiedAt || '');
      }
      return 0;
    });
  }, [schemes, searchTerm, selectedCategory, selectedState, selectedOccupation, selectedIncomeLimit, sortBy]);

  const hasActiveFilters = searchTerm !== '' || 
    selectedCategory !== 'all' || 
    selectedState !== 'all' || 
    selectedOccupation !== 'all' || 
    selectedIncomeLimit !== 'all';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedState('all');
    setSelectedOccupation('all');
    setSelectedIncomeLimit('all');
  };

  const getCategoryDotColor = (index: number) => {
    const colors = [
      'bg-indigo-500',
      'bg-emerald-500',
      'bg-rose-500',
      'bg-amber-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero Panel (High Density Theme) */}
        <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
                {t.exploreSchemes}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {t.schemesFound}: <strong className="text-slate-800 font-semibold">{filteredSchemes.length}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-evaluate-eligibility"
                onClick={() => onNavigate('eligibility')}
                className="px-3.5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.checkEligibility}</span>
              </button>

              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-3 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-md shadow-xs flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.filterCategory} {hasActiveFilters && '•'}</span>
              </button>
            </div>
          </div>

          {/* High Density Search bar */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-slate-100">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg max-w-md w-full border border-slate-200">
              <input
                id="schemes-search-input"
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shrink-0">
                {t.searchButton}
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> {t.sortBy}
              </span>
              <select
                id="schemes-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="name-asc">{t.sortNameAsc}</option>
                <option value="name-desc">{t.sortNameDesc}</option>
                <option value="recent">{t.sortRecent}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Scheme Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar (High Density Aesthetic) */}
          <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6 sticky top-24">
              
              {/* Profile Filters Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    {t.profileFilters}
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900"
                    >
                      {t.clear}
                    </button>
                  )}
                </div>

                <div className="space-y-3.5">
                  {/* State Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.residentState}
                    </label>
                    <select
                      id="filter-state-select"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                      <option value="all">{t.allStatesTerritories}</option>
                      {INDIAN_STATES.filter(s => s !== 'All States').map(st => (
                        <option key={st} value={st}>{getLocalizedState(st)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Occupation Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.occupationLabel}
                    </label>
                    <select
                      id="filter-occupation-select"
                      value={selectedOccupation}
                      onChange={(e) => setSelectedOccupation(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                      <option value="all">{t.allOccupations}</option>
                      {OCCUPATIONS.filter(o => o !== 'Any').map(occ => (
                        <option key={occ} value={occ}>{getLocalizedOccupation(occ)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Income Limit Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.annualIncomeLabel}
                    </label>
                    <select
                      id="filter-income-select"
                      value={selectedIncomeLimit}
                      onChange={(e) => setSelectedIncomeLimit(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                      <option value="all">{t.anyIncomeBracket}</option>
                      <option value="under250k">{t.incomeUnder250k}</option>
                      <option value="under500k">{t.incomeUnder500k}</option>
                      <option value="no-limit">{t.incomeNoLimit}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Categories Sidebar Section */}
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  {t.categories}
                </h3>
                <div className="space-y-1">
                  <div
                    onClick={() => setSelectedCategory('all')}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded cursor-pointer text-xs font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                    <span>{t.allSchemes}</span>
                    <span className="ml-auto text-[10px] text-slate-400">{schemes.length}</span>
                  </div>

                  {categories.map((rawCat, idx) => {
                    const cat = getLocalizedCategory(rawCat);
                    return (
                      <div
                        key={rawCat.id}
                        onClick={() => setSelectedCategory(rawCat.id)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded cursor-pointer text-xs font-medium transition-colors ${
                          selectedCategory === rawCat.id
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${getCategoryDotColor(idx)} shrink-0`}></div>
                        <span className="truncate">{cat.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Filter Badges */}
              {hasActiveFilters && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                    {t.activeFilters}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        "{searchTerm}"
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {getLocalizedCategory(categories.find(c => c.id === selectedCategory) || { id: '', name: '' } as any).name}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                      </span>
                    )}
                    {selectedState !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {getLocalizedState(selectedState)}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedState('all')} />
                      </span>
                    )}
                    {selectedOccupation !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {getLocalizedOccupation(selectedOccupation)}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedOccupation('all')} />
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Verification Score Card */}
              <div className="p-4 bg-slate-900 rounded-xl mt-4">
                <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                  {t.verificationScore}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">98%</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">+2%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="w-[98%] h-full bg-indigo-500 rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  {t.officialGazette}
                </p>
              </div>

            </div>
          </aside>

          {/* Main Scheme Results Area */}
          <main className="lg:col-span-3">
            
            {/* Results Count Bar */}
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <p>
                {t.displayingMatchingSchemes?.replace('{count}', filteredSchemes.length.toString()) || `Displaying ${filteredSchemes.length} matching schemes`}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-indigo-700 hover:text-indigo-900 font-bold"
                >
                  {t.resetFilters}
                </button>
              )}
            </div>

            {/* High Density Scheme Cards Grid */}
            {filteredSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSchemes.map((scheme) => (
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
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t.noSchemesFound}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  {t.noSchemesFoundDesc}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-3.5 py-1.5 text-xs font-semibold bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition-colors shadow-xs"
                >
                  {t.clearAllFilters}
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
