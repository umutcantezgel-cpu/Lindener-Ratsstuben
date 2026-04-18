export const EASING = {
  fluid: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number], // Premium standard easing
};

export const SPRING = {
  fluid: { type: "spring", stiffness: 300, damping: 30, mass: 1 }, // Standard premium spring
  bouncy: { type: "spring", stiffness: 400, damping: 25, mass: 1 },
};
