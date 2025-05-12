function getResult(target) {
  const result = [];
  let i = 0;
  let start = 1;
  while (start <= target) {
    let res = [];
    for (let j = 0; j < 5; j++) {
      if (result.length === 0) {
        res[j] = start++;
      } else {
        if (j === 0) {
          res[0] = "--";
        } else {
          res[j] = start++;
        }
      }
    }
    const isReverse = result.length % 2 !== 0;
    if (isReverse) res.reverse();
    result[i++] = res.reduce((acc, d, idx) => {
      acc[String.fromCharCode(idx + 97)] = d;
      return acc;
    }, {});
  }

  return result;
}

export { getResult };
