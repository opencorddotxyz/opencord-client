export const formatString = (
  string: string,
  prefixLength: number,
  suffixLength: number
) => {
  if (string.length === 0) {
    return '';
  }

  return `${string.slice(0, prefixLength)}...${string.slice(
    string.length - suffixLength
  )}`;
};
