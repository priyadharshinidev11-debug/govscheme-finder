import React from 'react';
import { Building2, ShieldAlert, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, languageInfo } = useLanguage();

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs">
      
      {/* Statutory Disclaimer Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-start gap-2.5 text-slate-600 text-[11px] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800 font-bold">{t.statutoryNoticeTitle || t.statutoryNotice || 'Disclaimer:'} </strong>
            GovScheme Finder is an independent project and is not a government website or government agency. Scheme information and eligibility results are provided for informational guidance. Final eligibility, document verification and approval are determined by the relevant government authority.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-xs">
                G
              </div>
              <span className="text-base font-bold tracking-tight text-indigo-950">
                GovScheme<span className="text-indigo-600">Finder</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t.heroSubtitle || t.footerAboutText}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
              <Globe className="w-3 h-3 text-indigo-600" />
              <span>{languageInfo.nativeName} ({languageInfo.name})</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.citizenNavigation || 'Citizen Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button 
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {t.navSchemes}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('categories')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {t.navCategories}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('eligibility')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {t.navEligibility}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('recommendations')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {t.navRecommendations}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.verifiedPortals || 'Verified Portals'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a 
                  href="https://data.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  <span>{t.openDataPortal || 'data.gov.in (Open Data)'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://india.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  <span>{t.nationalPortal || 'india.gov.in (National Portal)'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://scholarships.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  <span>{t.scholarshipsPortal || 'scholarships.gov.in (NSP)'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Helpdesk */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.citizenHelpdesk || 'Citizen Helpdesk'}
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>helpdesk@govschemefinder.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t.tollFreeHelpline || 'Toll Free: 1800-11-0033'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t.headquartersLocation || 'New Delhi, India'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* High Density Sub-Footer Bar */}
      <div className="bg-slate-50 border-t border-slate-200 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-medium gap-2">
        <div>
          &copy; {new Date().getFullYear()} {t.copyrightPlatform || 'GovScheme National Discovery Platform. All rights reserved.'}
        </div>
        <div className="flex gap-4 uppercase tracking-widest text-[10px]">
          <button onClick={() => onNavigate('about')} className="hover:text-slate-700 transition-colors">
            {t.disclaimerBtn || 'Disclaimer'}
          </button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-slate-700 transition-colors">
            {t.navPrivacy}
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-slate-700 transition-colors">
            {t.navAbout}
          </button>
        </div>
      </div>

    </footer>
  );
};
