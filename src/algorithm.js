const perColumns = 5;

const getResult = (target) => {
  // 计算总的空格数 % 5 ，是应还要加的行
  const map = new Map();

  // 固定每行 5 个
  const totalRow = Math.ceil(target / perColumns); // 200

  // 占位的空格数
  let blockCount = totalRow - 1; // 199

  // 计算该值所在的实际行
  let realRow = Math.ceil((target + blockCount) / perColumns);
  // 实际行的 占位空格数量也要更新
  blockCount = realRow - 1;
  realRow = Math.ceil((target + blockCount) / perColumns);

  // 计算行，列是已知的
  const result = [];
  let start = 1;

  for (let i = 0; i < realRow; i++) {
    let columsData = [];
    for (let j = 0; j < perColumns; j++) {
      if (i !== 0 && j == 0) {
        columsData[0] = "--";
      } else {
        columsData[j] = start++;
      }
    }
    const isReverse = i % 2 !== 0;
    if (isReverse) columsData.reverse();
    result[i] = columsData;

    map.set(i, result[i]);
  }

  map.forEach((list, k) => {
    const sub = list.findIndex((d) => d === target);
    if (sub > -1) {
      console.log([k + 1, sub + 1]);
    }
  });

  return result;
};

function getResultv2(target) {
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

    console.log(result);
  }

  return result;
}

export { getResult, getResultv2 };
