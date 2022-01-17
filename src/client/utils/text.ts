export const ellipsis = (limit: number, text: string) => {
  if (text.length > limit) {
    return `${text.slice(0, limit)}...`;
  }
  return text;
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toLocaleUpperCase() + value.slice(1);
};
