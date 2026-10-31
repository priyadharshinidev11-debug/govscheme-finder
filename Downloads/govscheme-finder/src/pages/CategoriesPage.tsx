import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { SchemeCategory, Scheme } from '../types';
import { getCategoryIcon } from '../utils/categoryIcons';
import { useLanguage } from '../context/LanguageContext';

interface CategoriesPageProps {
  categories: SchemeCategory[];
  schemes: Scheme[];
  onNavigate: (view: string, param?: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  schemes,
  onNavigate
}) => {
  const { t, getLocalizedCategory } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-200">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.navCategories}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.exploreByCategoryTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {t.exploreByCategorySub}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const locCat = getLocalizedCategory(cat);
            const activeSchemes = schemes.filter(s => s.categoryId === cat.id && s.status === 'active');
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onNavigate('schemes', `category:${cat.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                      {getCategoryIcon(cat.iconName, 'w-7 h-7')}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {activeSchemes.length} {t.navSchemes}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {locCat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {locCat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
                  <span>{t.browseSchemesBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
