export function getDocumentTitle(pageName?: string) {
  if (!pageName) return 'Week of Charity 2022';

  return `${pageName} – Week of Charity 2022`;
}
