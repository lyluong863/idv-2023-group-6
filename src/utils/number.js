export function convertNumber(value) {
  return typeof value === "string"
    ? parseFloat(value.replace(/,/g, ""))
    : value;
}

export function roundToNearestMultipleOf5(number) {
  // Round the number to the nearest multiple of 5
  const roundedNumber = Math.round(number / 5) * 5;

  // Check if the rounded number is within the desired range
  if (roundedNumber >= 0 && roundedNumber <= 100) {
    return roundedNumber;
  }

  // If the rounded number is less than 0, return 0
  if (roundedNumber < 0) {
    return 0;
  }

  // If the rounded number is greater than 100, return 100
  if (roundedNumber > 100) {
    return 100;
  }
}
