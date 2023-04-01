export const sliceText = (text: string, charsCount: number) => {
  return text.length <= charsCount ? text : `${text.slice(0, charsCount)}...`;
};