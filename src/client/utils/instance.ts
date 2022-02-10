export const getInstanceUrl = () => {
  const port = location.port !== "" ? `:${location.port}` : "";
  return `${location.protocol}//${location.hostname}${port}`;
};
