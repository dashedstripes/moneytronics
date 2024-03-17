import React, { createContext, useState, useEffect, useContext } from 'react';

const languages = ['en', 'es'];

type LanguageContextType = {
  language: string;
  languages?: string[];
  setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: '',
  languages,
  setLanguage: () => {},
});

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // TODO: store this in a blob
    const storedLanguage = localStorage.getItem('language');
    // TODO: get users location using an edge function and set default based on that
    setLanguage(storedLanguage || 'en');
  }, []);

  const updateLanguage = (newLanguage: string) => {
    // TODO: store this in a blob
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, languages, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};