export const formatDay = (value: string) => {
  const date = new Date(value + '+02:00');

  return `${date.toLocaleDateString(undefined, { weekday: 'long' })}, ${date.toLocaleDateString(undefined, { day: '2-digit', month: 'numeric' })}`;
};

export const formatTime = (value: string) => {
  return new Date(value + '+02:00').toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

export const getWeekday = (value: string) => {
  return new Date(value + '+02:00').toLocaleDateString(undefined, { weekday: 'long' });
};

export const getState = (start: string, end: string) => {
  const hasStarted = new Date(start + '+02:00').valueOf() < Date.now();
  const hasEnded = new Date(end + '+02:00').valueOf() < Date.now();

  if (!hasStarted) return 'upcoming';
  if (hasStarted && !hasEnded) return 'running';
  if (hasEnded) return 'ended';
};