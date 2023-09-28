// 5 or more letters reversed

// take in a string
// declare empty string
// turn the string into an array, split it at the spaces
// loop over the array, .reverse()
// add reversed word to the empty string + ' '
// return the declared string, .trim()

const reversed = (string) => {
  let newString = "";
  const arr = string.split(" ");
  arr.forEach((word) => {
    if (word.length >= 5) {
      newString += word.split("").reverse().join("");
      newString += " ";
    } else newString += word + " ";
  });
  return newString.trim();
};
