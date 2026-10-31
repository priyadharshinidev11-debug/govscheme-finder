import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  User as UserIcon, 
  Bookmark, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Layers, 
  CheckCircle2,
  Info,
  Mic,
  Globe,
  ChevronDown,
  Languages
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  savedCount?: number;
  onSearchSubmit?: (keyword: string) => void;
  onOpenTamilAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenTamilAssistant }) => {
  const { user, profile, isAdmin, logout } = useAuth();
  const { language, setLanguage, t, availableLanguages, languageInfo } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Official Portal Ribbon */}
      <div className="bg-slate-900 text-white text-[11px] px-4 sm:px-8 py-1 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-400/30"></span>
          <span className="font-semibold text-slate-200">National Citizen Welfare & Scheme Discovery Platform</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
          <span>Official Public Service</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-amber-400">Digital India</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Emblem (High Density Design Theme) */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-indigo-800 transition-colors">
              G
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-indigo-900">
                GovScheme
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                National Discovery Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t.navHome}
            </button>

            <button
              id="nav-link-schemes"
              onClick={() => handleNav('schemes')}
              className={`text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'schemes' 
                  ? 'text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t.navSchemes}
            </button>

            <button
              id="nav-link-categories"
              onClick={() => handleNav('categories')}
              className={`text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'categories' 
                  ? 'text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t.navCategories}
            </button>

            <button
              id="nav-link-eligibility"
              onClick={() => handleNav('eligibility')}
              className={`text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'eligibility' 
                  ? 'text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navEligibility}</span>
            </button>

            {/* Authenticated User Links */}
            {user && (
              <>
                <button
                  id="nav-link-recommendations"
                  onClick={() => handleNav('recommendations')}
                  className={`text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentView === 'recommendations' 
                      ? 'text-indigo-700 font-bold' 
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.navRecommendations}</span>
                </button>

                <button
                  id="nav-link-saved"
                  onClick={() => handleNav('saved')}
                  className={`text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentView === 'saved' 
                      ? 'text-indigo-700 font-bold' 
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.navSaved}</span>
                </button>
              </>
            )}

            {/* Admin link */}
            {isAdmin && (
              <button
                id="nav-link-admin"
                onClick={() => handleNav('admin')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  currentView === 'admin' 
                    ? 'text-amber-900 bg-amber-100' 
                    : 'text-amber-800 hover:bg-amber-50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.navAdmin}</span>
              </button>
            )}

            {/* Interactive Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="nav-btn-language-selector"
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all hover:border-indigo-300"
                title={`${t.changeLanguage} (${languageInfo.name})`}
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-extrabold text-indigo-950">{languageInfo.nativeName}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      {t.changeLanguage} (11 Indian Languages)
                    </span>
                    <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-50">
                    {availableLanguages.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-indigo-50/70 transition-colors ${
                          language === item.code ? 'bg-indigo-50 text-indigo-900 font-extrabold' : 'text-slate-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-sm leading-tight text-slate-900">
                            {item.nativeName}
                          </span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            {item.name} • {item.region}
                          </span>
                        </div>
                        {language === item.code ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200"></span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Voice Assistant Trigger Button */}
            {onOpenTamilAssistant && (
              <button
                id="nav-btn-tamil-voice"
                onClick={onOpenTamilAssistant}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
                title={`${t.navVoiceGuide} (${languageInfo.nativeName})`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <Mic className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {language === 'ta' ? 'தமிழ் குரல் உதவி' : 
                   language === 'hi' ? 'आवाज सहायक' : 
                   language === 'te' ? 'వాయిస్ సహాయకుడు' : 
                   language === 'kn' ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ' :
                   language === 'ml' ? 'ശബ്ദ സഹായി' :
                   language === 'bn' ? 'ভয়েস সহকারী' :
                   language === 'mr' ? 'आवाज सहाय्यक' :
                   `${languageInfo.nativeName} Voice`}
                </span>
              </button>
            )}

            {/* Vertical Divider */}
            <div className="h-4 w-[1px] bg-slate-300"></div>

            {/* Right Action / Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  id="nav-button-profile"
                  onClick={() => handleNav('profile')}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs border transition-colors ${
                    currentView === 'profile'
                      ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                    {profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="font-semibold text-slate-800 truncate max-w-[100px]">
                    {profile?.displayName || 'Citizen'}
                  </span>
                </button>

                <button
                  id="nav-button-logout"
                  onClick={handleLogout}
                  title="Log out"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-button-login"
                  onClick={() => handleNav('login')}
                  className="text-xs sm:text-sm font-semibold text-white bg-indigo-600 px-3.5 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {t.navSignIn}
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Quick Language Toggle on Mobile Bar */}
            <button
              id="nav-mobile-lang-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2 py-1 rounded-md bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-xs flex items-center gap-1 shadow-2xs"
              title={t.changeLanguage}
            >
              <Globe className="w-3 h-3 text-indigo-700" />
              <span>{languageInfo.nativeName}</span>
            </button>

            {onOpenTamilAssistant && (
              <button
                id="nav-mobile-btn-tamil"
                onClick={onOpenTamilAssistant}
                className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1 shadow-2xs"
                title={`${t.navVoiceGuide} (${languageInfo.nativeName})`}
              >
                <Mic className="w-3.5 h-3.5 text-emerald-700" />
                <span>Voice</span>
              </button>
            )}
            {user && (
              <button
                onClick={() => handleNav('profile')}
                className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200"
              >
                {profile?.displayName?.charAt(0) || 'U'}
              </button>
            )}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Language Switcher Section */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span>{t.changeLanguage} / மொழி மாற்றவும்</span>
              </div>
              <span className="text-[10px] text-indigo-700 bg-white px-2 py-0.5 rounded-full font-semibold border border-indigo-200">
                11 Languages
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {availableLanguages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === item.code 
                      ? 'bg-indigo-700 text-white shadow-xs' 
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {item.nativeName}
                </button>
              ))}
            </div>
          </div>

          {onOpenTamilAssistant && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTamilAssistant();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-indigo-800 text-white flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>
                  {language === 'ta' ? 'தமிழ் குரல் உதவி' : 
                   language === 'hi' ? 'आवाज सहायक' : 
                   language === 'te' ? 'వాయిస్ సహాయకుడు' : 
                   `${languageInfo.nativeName} ${t.navVoiceGuide}`}
                </span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-extrabold">
                {t.speakInVoice}
              </span>
            </button>
          )}

          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNav('schemes')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'schemes' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
            }`}
          >
            {t.navSchemes}
          </button>
          <button
            onClick={() => handleNav('categories')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'categories' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
            }`}
          >
            {t.navCategories}
          </button>
          <button
            onClick={() => handleNav('eligibility')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
              currentView === 'eligibility' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.navEligibility}</span>
          </button>

          {user ? (
            <>
              <button
                onClick={() => handleNav('recommendations')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  currentView === 'recommendations' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.navRecommendations}</span>
              </button>
              <button
                onClick={() => handleNav('saved')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  currentView === 'saved' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4 text-indigo-600" />
                <span>{t.navSaved}</span>
              </button>
              <button
                onClick={() => handleNav('profile')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  currentView === 'profile' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                }`}
              >
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span>{t.navProfile} ({profile?.displayName || 'Citizen'})</span>
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-800 flex items-center space-x-2 border border-amber-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <span>{t.navAdmin}</span>
                </button>
              )}
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2 text-center text-sm font-medium text-slate-700 border border-slate-300 rounded-lg"
              >
                {t.navSignIn}
              </button>
              <button
                onClick={() => handleNav('register')}
                className="w-full py-2 text-center text-sm font-semibold text-white bg-indigo-700 rounded-lg"
              >
                {t.navRegister}
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center space-x-4 text-xs text-slate-700">
            <button onClick={() => handleNav('about')}>{t.navAbout}</button>
            <button onClick={() => handleNav('privacy')}>{t.navPrivacy}</button>
          </div>
        </div>
      )}
    </header>
  );
};
