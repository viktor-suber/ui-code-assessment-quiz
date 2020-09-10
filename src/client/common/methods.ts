export const fixUnicode = (string: any) => {
  if (!string) {
    return null;
  }
  return string.replace(/&quot;/g, '"')
  .replace(/no-scope&quot;/g, '"')
  .replace(/&#039;/g, "'")
  .replace(/&amp;/g, '&');
};
