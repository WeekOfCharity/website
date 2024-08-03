import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { deTranslation } from "./de";
import { enTranslation } from "./en";

export interface Translation {
  [key: string]: string | Translation;
}

const haveSameStructure = (
  translation1: Translation,
  translation2: Translation
) => {
  if (
    typeof translation1 !== "object" ||
    typeof translation2 !== "object" ||
    translation1 === null ||
    translation2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(translation1);
  const keys2 = Object.keys(translation2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (
      typeof translation1[key] === "object" &&
      typeof translation2[key] === "object"
    ) {
      if (!haveSameStructure(translation1[key], translation2[key])) {
        return false;
      }
    } else if (typeof translation1[key] !== typeof translation2[key]) {
      return false;
    }
  }

  return true;
};

export enum Language {
  EN = "en",
  DE = "de",
}

export const defaultLanguage = Language.DE;

export const getValidLanguage = (lang?: string) => {
  if (!lang) return defaultLanguage;
  return (
    Object.values(Language).find((validLang) => lang.startsWith(validLang)) ||
    defaultLanguage
  );
};

export const initi18n = async () => {
  if (!haveSameStructure(deTranslation, enTranslation))
    console.error("Translation files don't have the same structure!");

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: defaultLanguage,
      resources: {
        en: {
          translation: enTranslation,
        },
        de: {
          translation: deTranslation,
        },
      },
    });
};
