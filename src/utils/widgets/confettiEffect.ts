import confetti from "canvas-confetti";

export const customConfetti = () => {
  void confetti({
    particleCount: 150,
    startVelocity: 20,
    spread: 360,
    origin: {
      x: Math.random() * 0.1 + 0.3,
      y: Math.random() * 0.2 + 0.3,
    },
    decay: 0.96,
  });
  setTimeout(
    () =>
      void confetti({
        particleCount: 150,
        startVelocity: 20,
        spread: 360,
        origin: {
          x: Math.random() * 0.1 + 0.6,
          y: Math.random() * 0.2 + 0.3,
        },
        decay: 0.96,
      }),
    100
  );
};
