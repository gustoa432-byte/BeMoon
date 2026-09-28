import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { sound, triggerHaptic } from '../utils/sound';

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof TRANSLATIONS['ru'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bemoon_language') as Language;
      if (saved === 'en' || saved === 'ru') return saved;
    }
    return 'ru'; // Default to Russian as requested
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    sound.tap();
    triggerHaptic(10);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bemoon_language', newLang);
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = {
    lang,
    language: lang,
    setLang,
    toggleLang,
    t: TRANSLATIONS[lang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
