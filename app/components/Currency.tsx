"use client"

const currencySymbols: { [key: string]: string } = {
  "en-US": "$",
  "en-GB": "£",
  "es-ES": "€",
};

export default function Currency({ locale = "en-US" }: { locale?: string }) {
  return <span>{currencySymbols[locale || "en-US"]}</span>;
}