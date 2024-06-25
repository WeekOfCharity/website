import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { deTranslation } from "./de";
import { enTranslation } from "./en";

const haveSameStructure = (obj1: object, obj2: object) => {
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!haveSameStructure(obj1[key], obj2[key])) {
        return false;
      }
    } else if (typeof obj1[key] !== typeof obj2[key]) {
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

export const initi18n = () => {
  if (!haveSameStructure(deTranslation, enTranslation))
    console.error("Translation files don't have the same structure!");

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
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
