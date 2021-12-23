export const ellipsis = (limit: number, text: string) => {
  if (text.length > limit) {
    return `${text.slice(0, limit)}...`;
  }
  return text;
};
