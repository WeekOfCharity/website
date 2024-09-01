import { WOC_YEAR_LONG } from "./constants";

export const getDocumentTitle = (pageName?: string) => {
  if (!pageName) return `Week of Charity ${WOC_YEAR_LONG}`;

  return `${pageName} – Week of Charity ${WOC_YEAR_LONG}`;
};
