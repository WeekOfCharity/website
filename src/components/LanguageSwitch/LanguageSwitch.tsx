import cn from "classnames";
import { useTranslation } from "react-i18next";

type LanguageSwitchProps = {
  className?: string;
};

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "de" ? "en" : "de";
    i18n.changeLanguage(newLang);
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
              "-translate-x-0.5": i18n.language === "de",
              "translate-x-9": i18n.language === "en",
            }
          )}
        />
        <span
          className={cn("font-semibold z-10 transition-colors", {
            "text-uiAccent": i18n.language === "de",
            "text-neutral-600": i18n.language !== "de",
          })}
        >
          DE
        </span>
        <span
          className={cn("font-semibold z-10 transition-colors", {
            "text-uiAccent": i18n.language === "en",
            "text-neutral-600": i18n.language !== "en",
          })}
        >
          EN
        </span>
      </button>
    </div>
  );
};
