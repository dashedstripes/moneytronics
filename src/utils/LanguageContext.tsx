import React, { createContext, useState, useEffect, useContext } from 'react';

const languages = ['en-us', 'en-gb', 'es-es'];

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
    async function getGeo() {
      const response = await fetch('/get-geo');
      const languageCode = await response.text();
      return languageCode;
    }

    // TODO: store this in a blob
    const storedLanguage = localStorage.getItem('language');

    if(storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      getGeo()
      .then((languageCode) => {
        updateLanguage(languageCode);
      });
    }
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