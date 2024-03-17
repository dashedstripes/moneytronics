import { useLanguage } from '@/utils/LanguageContext';
import React from 'react';

export default function LanguageSelector(){
  const { language, languages, setLanguage } = useLanguage();

  return (
    <div>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages?.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};