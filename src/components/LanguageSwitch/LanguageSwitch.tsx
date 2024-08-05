import cn from "classnames";
import { useTranslation } from "react-i18next";
import { defaultLanguage, getValidLanguage, Language } from "../../i18n/i18n";
import { useEffect, useState } from "react";

type LanguageSwitchProps = {
  className?: string;
};

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    setSelectedLanguage(getValidLanguage(i18n.language));
  }, [i18n.language]);

  useEffect(() => {
    if (!selectedLanguage) return;
    void i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  const toggleLanguage = () => {
    setSelectedLanguage((prev) =>
      prev === Language.DE ? Language.EN : Language.DE
    );
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "h-7 my-auto items-center shadow-md text-neutral-800 text-sm tracking-tight relative flex gap-3.5 rounded-full bg-neutral-300 py-1 px-2.5 overflow-hidden",
        className
      )}
      aria-label={t(`toggleLanguage.${selectedLanguage}`)}
    >
      <div
        role="presentation"
        className={cn(
          "bg-white shadow-md absolute w-[53%] inset-0 rounded-full transition-transform duration-200",
          {
            "translate-x-8": selectedLanguage === Language.EN,
          }
        )}
      />
      <span
        className={cn("font-bold z-10 transition-colors", {
          "text-neutral-600": selectedLanguage !== Language.DE,
        })}
      >
        {Language.DE.toUpperCase()}
      </span>
      <span
        className={cn("font-bold z-10 transition-colors", {
          "text-neutral-600": selectedLanguage !== Language.EN,
        })}
      >
        {Language.EN.toUpperCase()}
      </span>
    </button>
  );
};
