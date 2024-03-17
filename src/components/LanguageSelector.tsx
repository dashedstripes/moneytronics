import { useLanguage } from '@/utils/LanguageContext';
import React from 'react';

export default function LanguageSelector(){
  const { language, languages, setLanguage } = useLanguage();

  const getFlagEmoji = (language: string) => {
    const flagEmojis: {[key: string]: string} = {
      "en-us": "🇺🇸",
      "en-gb": "🇬🇧",
      "es-es": "🇪🇸",
    };

    return flagEmojis[language] || '';
  };

  return (
    <div>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages?.map((language) => (
          <option key={language} value={language}>
            {getFlagEmoji(language)}
          </option>
        ))}
      </select>
    </div>
  );
};
