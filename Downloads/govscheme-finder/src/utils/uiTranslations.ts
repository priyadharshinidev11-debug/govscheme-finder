import { SupportedLanguage } from '../data/translations';
import { UI_TRANSLATIONS_BASE } from './uiTranslationsBase';
import { UI_TRANSLATIONS_REGIONAL_1 } from './uiTranslationsRegional1';
import { UI_TRANSLATIONS_REGIONAL_2 } from './uiTranslationsRegional2';

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: UI_TRANSLATIONS_BASE.en,
  ta: UI_TRANSLATIONS_BASE.ta,
  hi: UI_TRANSLATIONS_BASE.hi,
  te: UI_TRANSLATIONS_BASE.te,
  kn: UI_TRANSLATIONS_REGIONAL_1.kn,
  ml: UI_TRANSLATIONS_REGIONAL_1.ml,
  bn: UI_TRANSLATIONS_REGIONAL_1.bn,
  mr: UI_TRANSLATIONS_REGIONAL_2.mr,
  gu: UI_TRANSLATIONS_REGIONAL_2.gu,
  pa: UI_TRANSLATIONS_REGIONAL_2.pa,
  or: UI_TRANSLATIONS_REGIONAL_2.or,
};
