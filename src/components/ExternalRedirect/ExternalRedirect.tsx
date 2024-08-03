export type ExternalRedirectProps = {
  to: string;
};

export const ExternalRedirect = ({ to }: ExternalRedirectProps) => {
  window.location.replace(to);
  return null;
};
