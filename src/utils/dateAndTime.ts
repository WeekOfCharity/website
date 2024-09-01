import { Language } from "../i18n/i18n";

export const formatDay = (value: string, language: Language) => {
  const date = new Date(value + "+02:00");

  return `${date.toLocaleDateString(language, {
    weekday: "long",
  })}, ${date.toLocaleDateString(language, {
    day: "2-digit",
    month: "2-digit",
  })}`;
};

export const formatTime = (value: string, language: Language) => {
  return new Date(value + "+02:00").toLocaleTimeString(language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getState = (start: string, end: string) => {
  const hasStarted = new Date(start + "+02:00").valueOf() < Date.now();
  const hasEnded = new Date(end + "+02:00").valueOf() < Date.now();

  if (!hasStarted) return "upcoming";
  if (hasStarted && !hasEnded) return "running";
  if (hasEnded) return "ended";
};

export const toTimeString = (seconds: number, alwaysShowHours?: boolean) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = padString(date.getUTCSeconds());
  if (hh || alwaysShowHours) {
    return `${padString(hh)}:${padString(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const padString = (string: number) => {
  return ("0" + string).slice(-2);
};
