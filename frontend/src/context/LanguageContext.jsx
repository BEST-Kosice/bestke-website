import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const LANGUAGES = ["EN", "SK", "UA"];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const idx = LANGUAGES.indexOf(prev);
      return LANGUAGES[(idx + 1) % LANGUAGES.length];
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
