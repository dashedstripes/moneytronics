import { useRouter } from "next/router";

const currencySymbols: { [key: string]: string } = {
  "en-US": "$",
  "en-GB": "£",
  "es-ES": "€",
};

export default function Currency() {
  const router = useRouter();
  return <span>{currencySymbols[router.locale || "en-US"]}</span>;
}