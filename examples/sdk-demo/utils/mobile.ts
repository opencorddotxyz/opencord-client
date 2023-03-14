export const vw = (px: number): string => {
  return `${((px / 750) * 100).toFixed(3)}vw`;
};
