export const roundToNearestTen = (num) => {
  return Math.ceil(num / 10) * 10;
};

export const formatCurrency = (value) => {
  return `₦${ parseFloat(value).toLocaleString() }`
}

export const getPlan = ({ credit, upfront, duration }) => {
  if (!duration) return null;
  const interest = 8;
  const percent = interest * duration;
  const total = roundToNearestTen(((percent / 100) * credit) + credit);
  const monthly = roundToNearestTen(total / duration);
  return {
    duration,
    gross_net: 0,
    id: 1,
    interest,
    items: [],
    markup: 0,
    monthly,
    monthly_net: 0,
    percent,
    percent_net: 0,
    total,
    upfront,
  };
};

export const nPercentOf = (percent, total) => {
  return +((percent / 100) * total).toFixed(2);
}

export const jsonToBase64 = (obj) => {
  const str = JSON.stringify(obj);
  return btoa(str);
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const shuffleArray = array => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const evalJson = (data) => {
  try {
    return eval(data)
  } catch (error) {
    return null;
  }
}

export const stringifyAndParseString = (str) => {
  try {
    return JSON.parse(JSON.stringify(str));
  } catch (e) {
    return null;
  }
};
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
