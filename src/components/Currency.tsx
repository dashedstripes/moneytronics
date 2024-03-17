import { useLanguage } from "@/utils/LanguageContext";

const currencySymbols: { [key: string]: string } = {
  "en-us": "$",
  "en-gb": "£",
  "es-es": "€",
};

export default function Currency() {
  const { language } = useLanguage();
  return <span>{currencySymbols[language]}</span>;
}