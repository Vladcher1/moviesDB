export const cutInfo = (text: string) => {
  let counter = 0;
  let res = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letter of text) {
    counter++;
    res += letter;
    if (counter >= 100 && letter === " ") {
      break;
    }
  }
  res += "...";
  return res;
};
