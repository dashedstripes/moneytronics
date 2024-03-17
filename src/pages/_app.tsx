import "@/styles/globals.css";
import { AuthProvider } from "@/utils/AuthContext";
import { LanguageProvider } from "@/utils/LanguageContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </AuthProvider>
  );
}
