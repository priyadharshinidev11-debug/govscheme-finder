import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  LanguageInfo, 
  TRANSLATIONS, 
  TranslationDict 
} from '../data/translations';
import { Scheme, SchemeCategory } from '../types';
import { 
  getLocalizedCategory as localizeCategory, 
  getLocalizedScheme as localizeScheme, 
  getLocalizedState as localizeState, 
  getLocalizedOccupation as localizeOccupation,
  getLocalizedEducation as localizeEducation,
  getLocalizedFooter,
  FOOTER_TRANSLATIONS,
  FooterTranslations,
  UI_TRANSLATIONS
} from '../utils/localizedData';

export type ExtendedTranslationDict = TranslationDict & Record<string, string>;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languageInfo: LanguageInfo;
  availableLanguages: LanguageInfo[];
  t: ExtendedTranslationDict;
  getSpeechCode: (lang?: SupportedLanguage) => string;
  getLocalizedCategory: (cat: SchemeCategory) => SchemeCategory;
  getLocalizedScheme: (scheme: Scheme) => Scheme;
  getLocalizedState: (stateName: string) => string;
  getLocalizedOccupation: (occupation: string) => string;
  getLocalizedEducation: (education: string) => string;
  getLocalizedFooter: () => FooterTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gov_scheme_selected_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'ta'; // Default to Tamil as previously requested, easily switchable to any language
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  };

  const languageInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const uiBase = UI_TRANSLATIONS.en || {};
  const uiSpecific = UI_TRANSLATIONS[language] || {};
  const staticBase = TRANSLATIONS[language] || TRANSLATIONS.en;
  const footerBase = (FOOTER_TRANSLATIONS.en || {}) as unknown as Record<string, string>;
  const footerTrans = (FOOTER_TRANSLATIONS[language] || FOOTER_TRANSLATIONS.en) as unknown as Record<string, string>;

  const t: ExtendedTranslationDict = {
    ...uiBase,
    ...staticBase,
    ...footerBase,
    ...uiSpecific,
    ...footerTrans,
  };

  const getSpeechCode = (lang?: SupportedLanguage) => {
    const targetLang = lang || language;
    const found = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);
    return found ? found.speechCode : 'ta-IN';
  };

  const getLocalizedCategory = (cat: SchemeCategory) => {
    return localizeCategory(cat, language);
  };

  const getLocalizedScheme = (scheme: Scheme) => {
    return localizeScheme(scheme, language);
  };

  const getLocalizedState = (stateName: string) => {
    return localizeState(stateName, language);
  };

  const getLocalizedOccupation = (occupation: string) => {
    return localizeOccupation(occupation, language);
  };

  const getLocalizedEducation = (education: string) => {
    return localizeEducation(education, language);
  };

  // Sync html lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languageInfo,
        availableLanguages: SUPPORTED_LANGUAGES,
        t,
        getSpeechCode,
        getLocalizedCategory,
        getLocalizedScheme,
        getLocalizedState,
        getLocalizedOccupation,
        getLocalizedEducation,
        getLocalizedFooter: () => getLocalizedFooter(language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

