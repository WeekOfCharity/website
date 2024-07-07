import cn from "classnames";
import { useTranslation } from "react-i18next";
import { getValidLanguage, Language } from "../../i18n/i18n";
import { useEffect, useState } from "react";

type LanguageSwitchProps = {
  className?: string;
};

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    setSelectedLanguage(getValidLanguage(i18n.language));
  }, []);

  useEffect(() => {
    if (!selectedLanguage) return;
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const toggleLanguage = () => {
    setSelectedLanguage((prev) =>
      prev === Language.DE ? Language.EN : Language.DE
    );
  };

  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        onClick={toggleLanguage}
        className={cn(
          "shadow-md relative flex gap-4 rounded-full bg-neutral-300 py-1 px-3 overflow-hidden"
        )}
      >
        <div
          role="presentation"
          className={cn(
            "bg-white shadow-md absolute w-[55%] inset-0 rounded-full transition-transform duration-200",
            {
              "-translate-x-0.5": selectedLanguage === Language.DE,
              "translate-x-9": selectedLanguage === Language.EN,
            }
          )}
        />
        <span
          className={cn("font-semibold z-10 transition-colors", {
            "text-uiAccent": selectedLanguage === Language.DE,
            "text-neutral-600": selectedLanguage !== Language.DE,
          })}
        >
          {Language.DE.toUpperCase()}
        </span>
        <span
          className={cn("font-semibold z-10 transition-colors", {
            "text-uiAccent": selectedLanguage === Language.EN,
            "text-neutral-600": selectedLanguage !== Language.EN,
          })}
        >
          {Language.EN.toUpperCase()}
        </span>
      </button>
    </div>
  );
};
