const sum = (array) => {
  return array.reduce((sum, item) => sum + item, 0);
};

const countEvenInts = (array) => {
  return array.filter((item) => Number.isInteger(item) && item % 2 === 0)
    .length;
};

const getBiggestEven = (...list) => {
  if (list.length < 1) return undefined;
  let max = undefined;
  for (let val of list) {
    if (val % 2 !== 0) continue;
    if (max === undefined) max = val;
    else if (max < val) max = val;
  }
  return max;
};

function binarySearch(elem, list) {
  let left = 0;
  let right = list.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (list[middle] === elem) return middle;
    else if (list[middle] < elem) left = middle + 1;
    else right = middle - 1;
  }
  return Math.max(left, right);
}

export { sum, countEvenInts, getBiggestEven, binarySearch };
