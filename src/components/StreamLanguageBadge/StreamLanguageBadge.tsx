import classNames from "classnames";
import { StreamLanguage } from "../../hooks/useStreams";

type StreamLanguageProps = {
  language?: StreamLanguage;
  className?: string;
};

const getLanguageLabel = (language: string) => {
  if (language === StreamLanguage.DEEN) return "(DE/EN)";
  else return `(${language.toUpperCase()})`;
};

export const StreamLanguageBadge = ({
  language,
  className,
}: StreamLanguageProps) => {
  if (!language) return null;

  return (
    <span className={classNames("text-sm", className)}>
      {getLanguageLabel(language)}
    </span>
  );
};
