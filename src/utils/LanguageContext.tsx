import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

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
  const { user, getJWT } = useAuth();
  const [language, setLanguage] = useState('en-us');

  useEffect(() => {
    async function getGeo() {
      const response = await fetch('/get-geo');
      const languageCode = await response.text();
      return languageCode;
    }

    if(user) {
      (async () => {
        try {
          const jwt = await getJWT();
          const response = await fetch('/.netlify/functions/get-language', {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ email: user.email }),
          });
          const language = await response.text();
          setLanguage(language);
        } catch(err) {
          console.error('Error fetching language');
        }
      })();
    } else {
      const storedLanguage = localStorage.getItem('language');
  
      if(storedLanguage) {
        setLanguage(storedLanguage);
      } else {
        getGeo()
        .then((languageCode) => {
          updateLanguage(languageCode);
        });
      }
    }
  }, [user]);

  const updateLanguage = async (newLanguage: string) => {
    if(user) {
      try {
        const jwt = await getJWT();
  
        await fetch('/.netlify/functions/update-language', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            language: newLanguage,
          }),
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
      } catch {
        console.error('Error updating language');
      }
    }

    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, languages, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};