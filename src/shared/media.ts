export const getMediaURL = (filename: string): string => {
  return `${process.env.NEXT_PUBLIC_MEDIA_URL}/${filename}`;
};
