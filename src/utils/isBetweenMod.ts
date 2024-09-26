export const isBetweenMod = (value: number, start: number, end: number) => {
  if (start <= end) {
    return value >= start && value <= end;
  } else {
    return value >= start || value <= end;
  }
};
