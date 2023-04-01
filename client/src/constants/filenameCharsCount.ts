const bodyWidth = document.body.getBoundingClientRect().width;
const getCharsChount = () => {
  if (bodyWidth > 768) {
    return 50;
  }

  if (bodyWidth <= 768 && bodyWidth > 480) {
    return 30;
  }

  return 15;
};

export const filenameCharsCount = getCharsChount();
