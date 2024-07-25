export const glitchEffect = () => {
  document.body.classList.add("animate-glitch");

  setTimeout(() => {
    document.body.classList.remove("animate-glitch");
    if (document.body.classList.length === 0)
      document.body.removeAttribute("class");
  }, 1000);
};
