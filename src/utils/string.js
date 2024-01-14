export function splitString(str, maxLength, textDirection) {
  const words = [""];
  const splitted = str.split(" ");
  if (splitted.length > 1) {
    splitted.forEach((word) => {
      if (words[words.length - 1].length + word.length > maxLength)
        words.push("");
      words[words.length - 1] += word + " ";
    });
    return textDirection === "up" ? words.reverse() : words;
  } else return splitted;
}
