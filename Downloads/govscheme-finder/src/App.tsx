import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Scheme, SchemeCategory, SavedScheme } from './types';
import { 
  fetchSchemes, 
  fetchCategories, 
  getUserSavedSchemes, 
  saveScheme, 
  unsaveScheme 
} from './services/schemeService';

// Pages
import { HomePage } from './pages/HomePage';
import { SchemesPage } from './pages/SchemesPage';
import { SchemeDetailsPage } from './pages/SchemeDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SavedSchemesPage } from './pages/SavedSchemesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TamilVoiceAssistant } from './components/TamilVoiceAssistant';

import { Loader2, CheckCircle2, AlertCircle, Mic, FileQuestion } from 'lucide-react';

function AppContent() {
  const { user, profile } = useAuth();
  const { language, t, languageInfo } = useLanguage();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);

  // Multilingual Voice Assistant Modal State
  const [isTamilAssistantOpen, setIsTamilAssistantOpen] = useState(false);

  // Data State
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [categories, setCategories] = useState<SchemeCategory[]>([]);
  const [savedSchemes, setSavedSchemes] = useState<SavedScheme[]>([]);
  const [savedSchemeIds, setSavedSchemeIds] = useState<Set<string>>(new Set());
  const [loadingData, setLoadingData] = useState(true);

  // Global Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load Schemes and Categories from Firestore
  const loadInitialData = useCallback(async () => {
    try {
      setLoadingData(true);
      const [fetchedSchemes, fetchedCats] = await Promise.all([
        fetchSchemes(),
        fetchCategories()
      ]);
      setSchemes(fetchedSchemes);
      setCategories(fetchedCats);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load Saved Schemes when User changes
  const loadSavedSchemes = useCallback(async () => {
    if (!user) {
      setSavedSchemes([]);
      setSavedSchemeIds(new Set());
      return;
    }
    try {
      const saved = await getUserSavedSchemes(user.uid);
      setSavedSchemes(saved);
      setSavedSchemeIds(new Set(saved.map(s => s.schemeId)));
    } catch (err) {
      console.error('Failed to load saved schemes:', err);
    }
  }, [user]);

  useEffect(() => {
    loadSavedSchemes();
  }, [loadSavedSchemes]);

  // Sync with window.location.hash for browser back/forward and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentView('home');
        setViewParam(undefined);
        return;
      }
      const [view, param] = hash.split(':');
      setCurrentView(view || 'home');
      setViewParam(param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Safe programmatic navigation
  const navigateTo = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    if (param) {
      window.location.hash = `${view}:${param}`;
    } else {
      window.location.hash = view === 'home' ? '' : view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save Scheme
  const handleToggleSaveScheme = async (scheme: Scheme) => {
    if (!user) {
      showToast('Please sign in to save government schemes to your profile.', 'info');
      navigateTo('login');
      return;
    }

    const isAlreadySaved = savedSchemeIds.has(scheme.id);
    try {
      if (isAlreadySaved) {
        await unsaveScheme(user.uid, scheme.id);
        setSavedSchemeIds(prev => {
          const next = new Set(prev);
          next.delete(scheme.id);
          return next;
        });
        setSavedSchemes(prev => prev.filter(s => s.schemeId !== scheme.id));
        showToast(`Removed "${scheme.name}" from saved schemes.`);
      } else {
        await saveScheme(user.uid, scheme);
        setSavedSchemeIds(prev => new Set(prev).add(scheme.id));
        setSavedSchemes(prev => [
          {
            id: `${user.uid}_${scheme.id}`,
            userId: user.uid,
            schemeId: scheme.id,
            schemeName: scheme.name,
            categoryName: scheme.categoryName,
            department: scheme.department,
            keyBenefit: scheme.keyBenefit,
            savedAt: new Date().toISOString()
          },
          ...prev
        ]);
        showToast(`Saved "${scheme.name}" to your citizen bookmarks.`);
      }
    } catch (err: any) {
      console.error('Failed to toggle saved scheme:', err);
      showToast('Could not update saved scheme. Please try again.', 'info');
    }
  };

  const handleRemoveSave = async (schemeId: string) => {
    if (!user) return;
    try {
      await unsaveScheme(user.uid, schemeId);
      setSavedSchemeIds(prev => {
        const next = new Set(prev);
        next.delete(schemeId);
        return next;
      });
      setSavedSchemes(prev => prev.filter(s => s.schemeId !== schemeId));
      showToast('Scheme removed from saved list.');
    } catch (err) {
      console.error('Failed to remove save:', err);
    }
  };

  // Render View Page
  const renderCurrentPage = () => {
    if (loadingData && schemes.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-800">
            Initializing Government Schemes & Criteria...
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Loading government scheme information...
          </p>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <HomePage
            schemes={schemes}
            categories={categories}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            onNavigate={navigateTo}
            onOpenTamilAssistant={() => setIsTamilAssistantOpen(true)}
          />
        );

      case 'schemes':
        return (
          <SchemesPage
            schemes={schemes}
            categories={categories}
            savedSchemeIds={savedSchemeIds}
            initialFilter={viewParam}
            onToggleSave={handleToggleSaveScheme}
            onNavigate={navigateTo}
          />
        );

      case 'scheme-details': {
        const selectedScheme = viewParam ? schemes.find(s => s.id === viewParam) : undefined;
        if (!selectedScheme) {
          return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <FileQuestion className="w-6 h-6 text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Scheme Not Found</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                The requested government scheme record could not be found or may have been removed.
              </p>
              <button
                id="btn-back-to-schemes-not-found"
                onClick={() => navigateTo('schemes')}
                className="mt-4 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                Back to Schemes
              </button>
            </div>
          );
        }
        return (
          <SchemeDetailsPage
            scheme={selectedScheme}
            isSaved={savedSchemeIds.has(selectedScheme.id)}
            onToggleSave={handleToggleSaveScheme}
            onBack={() => navigateTo('schemes')}
            onNavigate={navigateTo}
          />
        );
      }

      case 'categories':
        return (
          <CategoriesPage
            categories={categories}
            schemes={schemes}
            onNavigate={navigateTo}
          />
        );

      case 'eligibility':
        return (
          <EligibilityPage
            schemes={schemes}
            initialSchemeId={viewParam}
            onNavigate={navigateTo}
          />
        );

      case 'recommendations':
        return (
          <RecommendationsPage
            schemes={schemes}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            onNavigate={navigateTo}
          />
        );

      case 'saved':
        return (
          <SavedSchemesPage
            savedSchemes={savedSchemes}
            schemes={schemes}
            onRemoveSave={handleRemoveSave}
            onNavigate={navigateTo}
          />
        );

      case 'profile':
        return <ProfilePage onNavigate={navigateTo} />;

      case 'admin':
        return (
          <AdminDashboardPage
            schemes={schemes}
            categories={categories}
            onRefreshData={loadInitialData}
            onNavigate={navigateTo}
          />
        );

      case 'login':
        return <LoginPage onNavigate={navigateTo} />;

      case 'register':
        return <RegisterPage onNavigate={navigateTo} />;

      case 'about':
        return <AboutPage onNavigate={navigateTo} />;

      case 'privacy':
        return <PrivacyPage onNavigate={navigateTo} />;

      default:
        return (
          <HomePage
            schemes={schemes}
            categories={categories}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            onNavigate={navigateTo}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        savedCount={savedSchemes.length}
        onSearchSubmit={(keyword) => navigateTo('schemes', keyword)}
        onOpenTamilAssistant={() => setIsTamilAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer with Statutory Disclaimers */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Multilingual Voice Assistant Quick Access Button */}
      <button
        id="btn-floating-tamil-voice"
        type="button"
        onClick={() => setIsTamilAssistantOpen(true)}
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 hover:from-emerald-700 hover:to-indigo-900 text-white rounded-full shadow-2xl border-2 border-white/80 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
        title={`${t.navVoiceGuide} (${languageInfo.nativeName})`}
        aria-label="Open Multilingual Voice Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
        </span>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Mic className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex flex-col text-left leading-tight pr-1">
          <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            {language === 'ta' ? 'தமிழ் குரல் உதவி' : 
             language === 'hi' ? 'आवाज सहायक' : 
             language === 'te' ? 'వాయిస్ సహాయకుడు' : 
             language === 'kn' ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ' : 
             language === 'ml' ? 'ശബ്ദ സഹായി' :
             language === 'bn' ? 'ভয়েস সহকারী' :
             language === 'mr' ? 'आवाज सहाय्यक' :
             `${languageInfo.nativeName} ${t.navVoiceGuide}`}
          </span>
          <span className="text-[10px] text-emerald-100 font-medium hidden sm:inline">
            {language === 'ta' ? 'பேசி தெரிந்து கொள்ளுங்கள்' : 
             language === 'hi' ? 'बोलकर जानकारी पाएं' : 
             language === 'te' ? 'మాట్లాడి తెలుసుకోండి' : 
             t.speakInVoice}
          </span>
        </div>
      </button>

      {/* Multilingual Voice-Enabled Welfare Assistant Modal */}
      <TamilVoiceAssistant
        isOpen={isTamilAssistantOpen}
        onClose={() => setIsTamilAssistantOpen(false)}
        onNavigateScheme={(keyword) => navigateTo('schemes', keyword)}
        schemes={schemes}
        userProfile={profile}
      />

      {/* Global Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 flex items-center space-x-2.5 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
