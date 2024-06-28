const units = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "Ten",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];
const thousands = ["", "Thousand", "Lakh", "Crore"];

function convertInWords(num) {
  if (num === 0) return "Zero Rupees Only";

  let words = "";

  // Function to convert a three-digit number to words
  const threeDigitToWords = (n) => {
    let str = "";

    if (n > 99) {
      str += units[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n > 10 && n < 20) {
      str += teens[n - 10] + " ";
    } else {
      str += tens[Math.floor(n / 10)] + " ";
      n %= 10;
      str += units[n] + " ";
    }

    return str.trim();
  };

  // Split the number into groups of thousands
  const splitIntoThousands = (n) => {
    let parts = [];

    while (n > 0) {
      parts.push(n % 1000);
      n = Math.floor(n / 1000);
    }

    return parts.reverse();
  };

  const parts = splitIntoThousands(num);

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== 0) {
      words +=
        threeDigitToWords(parts[i]) +
        " " +
        thousands[parts.length - i - 1] +
        " ";
    }
  }

  return words.trim() + " Rupees Only";
}

export default convertInWords;