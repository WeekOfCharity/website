export const getShortTwitchUrl = (longTwitchUrl: string) => {
  if (!longTwitchUrl.includes("twitch.tv")) return longTwitchUrl;
  return `twitch.tv${longTwitchUrl.split("twitch.tv")[1]}`;
};
