export const parseNumber = (num: string): string => {
  const numInput = Number(num.replace(/,/g, ""));

  return numInput.toFixed(2);
};

export const moneyParse = (num: number): string => {
  if (num) {
    const options = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    };

    const smlOptions = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 6,
    };

    if (num < 0.1) {
      return num.toLocaleString("en-US", smlOptions);
    } else if (num > 1000000000000) {
      return (num / 1000000000000).toLocaleString("en-US", options) + "T";
    } else if (num > 1000000000) {
      return (num / 1000000000).toLocaleString("en-US", options) + "B";
    } else if (num > 1000000) {
      return (num / 1000000).toLocaleString("en-US", options) + "M";
    }
    return num.toLocaleString("en-US", options);
  } else {
    return `$0.00`;
  }
};
