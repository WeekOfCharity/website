import cn from "classnames";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

type LanguageSwitchProps = {
  className?: string;
};

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const { i18n } = useTranslation();

  return (
    <>
      {Object.keys(lngs).map((lng) => {
        return (
          <button
            key={lng}
            type="submit"
            className={cn(className, {
              "text-green23-400": i18n.language === lng,
            })}
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        );
      })}
    </>
  );
};
