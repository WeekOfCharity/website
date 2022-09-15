export const formatDay = (value: string) => {
  const date = new Date(value);

  return `${date.toLocaleDateString(undefined, { weekday: 'long' })}, ${date.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' })}`;
};

export const formatTime = (value: string) => {
  return new Date(value).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

export const getWeekday = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, { weekday: 'long' });
};