export const parseIntSearchParam = (searchParam: string | null) => {
  const intOrNan = searchParam ? parseInt(searchParam) : NaN;
  return isNaN(intOrNan) ? undefined : intOrNan;
};
