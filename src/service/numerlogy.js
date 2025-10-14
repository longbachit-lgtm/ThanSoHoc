import { sumArray } from "./common";

export function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  // str = str.replace(/\s+/g, " ");
  // str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // eslint-disable-next-line
  str = str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

/**
 * merge number to one|double
 * @param {*} numberStr
 * @param {*} toOne merge full or keep king number
 * @returns number
 */
export const mergeNumberString = (numberStr, toOne = false) => {
  const arr = numberStr.split("").map((i) => parseInt(i));
  const total = sumArray(arr);

  if (!toOne) {
    if (
      (+numberStr % 11 === 0 && +numberStr <= 33) ||
      (+numberStr % 10 === 0 && +numberStr <= 30)
    ) {
      return numberStr;
    }
    return (total % 11 === 0 && total <= 33) ||
      (total % 10 === 0 && total <= 30) ||
      total.toString().length === 1
      ? total + ""
      : mergeNumberString(total + "", toOne);
  }

  return total.toString().length === 1
    ? total + ""
    : mergeNumberString(total + "", toOne);
};

/**
 * Convert string to number
 * @param {*} s string for convert to number
 * @returns number
 */
export const stringToNumber = (s) => {
  const char = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return s
    .split("")
    .map((i) => char.indexOf(i) % 9)
    .join("");
};

/**
 * get Vowel character or nonVowel
 * @param {*} str
 * @param {*} isGetVowel vowel or nonvowel
 * @returns string of vowel or nonvowel
 */
export const pickCharacter = (str, isGetVowel = true) => {
  const keyVowel = str.match(/y$|y[^aeuio]+/gi) ? /[aeuioy]+/gi : /[aeuio]+/gi;

  if (isGetVowel && str) {
    return str.match(keyVowel).join("");
  }

  return str.replace(keyVowel, "");
};

/**
 * calculate inner and express number
 * @param {*} nameArr array word of fullname
 * @returns object number of inner and express
 */
export const soulAndExpress = (nameArr) => {
  let vowel = "";
  let unVowel = "";
  nameArr.forEach((item) => {
    vowel += pickCharacter(item);
    unVowel += pickCharacter(item, false);
  });
  return {
    soul: mergeNumberString(stringToNumber(vowel), true),
    express: mergeNumberString(stringToNumber(unVowel), true),
  };
};

//

export const numberAtLeastThreeTimes = (arr) => {
  const countMap = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const result = [...new Set(arr.filter((num) => countMap[num] >= 3))];
  return result.length > 1 ? result.join(" ") : "" + result;
};

/**
 * get four top of life
 * @param {*} dd
 * @param {*} mm
 * @param {*} year
 */
export const fourTop = (dd, mm, year) => {
  const birthString = dd + "" + mm + year;
  let main = mergeNumberString(birthString);
  main =
    ["10", "11", "22"].indexOf(main) !== -1
      ? main
      : mergeNumberString(main, true);
  const top01Age = 36 - main;
  const top01Year = top01Age + year;

  const top01 = mergeNumberString(dd + "" + mm);
  const top02 = mergeNumberString(dd + "" + year);
  const top03 = mergeNumberString(top01 + top02);
  const top04 = mergeNumberString(mm + "" + year);

  const base1 = mergeNumberString(mm + "", true);
  const base2 = mergeNumberString(dd + "", true);
  const base3 = mergeNumberString(year + "", true);

  const challenge_01 = Math.abs(base1 - base2);
  const challenge_02 = Math.abs(base2 - base3);
  const challenge_03 = Math.abs(challenge_02 - challenge_01);
  const challenge_04 = Math.abs(base1 - base3);

  return {
    top4_peak: {
      numberbase: {
        num1: base1,
        num2: base2,
        num3: base3,
      },
      top01: {
        num: top01,
        year: top01Year,
        age: top01Age,
      },
      top02: {
        num: top02,
        year: top01Year + 9,
        age: top01Age + 9,
      },
      top03: {
        num: top03,
        year: top01Year + 18,
        age: top01Age + 18,
      },
      top04: {
        num: top04,
        year: top01Year + 27,
        age: top01Age + 27,
      },
    },

    top4_challenge: {
      numberbase: {
        num1: base1,
        num2: base2,
        num3: base3,
      },
      top01: {
        num: challenge_01,
        year: top01Year,
        age: top01Age,
      },
      top02: {
        num: challenge_02,
        year: top01Year + 9,
        age: top01Age + 9,
      },
      top03: {
        num: challenge_03,
        year: top01Year + 18,
        age: top01Age + 18,
      },
      top04: {
        num: challenge_04,
        year: top01Year + 27,
        age: top01Age + 27,
      },
    },
  };
};

/**
 * get list arrow
 * @param {*} strNumber
 * @returns list arrow in birthday
 */
export const checkArrow = (strNumber) => {
  const arrow = [];
  const regexs = {
    123: /^(?=.*1)(?=.*2)(?=.*3)/g,
    159: /^(?=.*1)(?=.*5)(?=.*9)/g,
    147: /^(?=.*1)(?=.*4)(?=.*7)/g,
    258: /^(?=.*2)(?=.*5)(?=.*8)/g,
    369: /^(?=.*3)(?=.*6)(?=.*9)/g,
    456: /^(?=.*4)(?=.*5)(?=.*6)/g,
    789: /^(?=.*7)(?=.*8)(?=.*9)/g,
    357: /^(?=.*3)(?=.*5)(?=.*7)/g,
  };

  for (let rg in regexs) {
    if (strNumber.match(regexs[rg])) arrow.push(rg);
  }

  return arrow;
};

/**
 *
 * @param {*} strNumber
 * @returns the lack numbers in strNumber
 */
export const emptyNumber = (strNumber) => {
  let emptyStr = "";

  for (let i = 1; i < 10; i++) {
    if (!strNumber.includes("" + i)) {
      emptyStr += i;
    }
  }

  return emptyStr;
};

/**
 *
 * @param {*} strNumber
 * @returns list arrow of lack number
 */
export const lackArrow = (strNumber) => {
  const lackNumber = emptyNumber(strNumber);

  return checkArrow(lackNumber);
};

export const filterRealNumber = (string, realnumb) => {
  const amountNumber = {};
  for (let chr of string.replaceAll("0", "")) {
    if (amountNumber[chr]) {
      amountNumber[chr] += 1;
    } else {
      amountNumber[chr] = 1;
    }
  }

  for (let numb in amountNumber) {
    if (amountNumber[numb] >= realnumb) {
      {
        amountNumber[numb] = Math.floor(amountNumber[numb] / 2);
      }
    } else {
      delete amountNumber[numb];
    }
  }

  const result = Object.entries(amountNumber).reduce(
    (acc, [key, value]) => acc + key.repeat(value),
    ""
  );


  return result;
};

export const multiNumbStr = (numb, multi) => {
  return String(numb).repeat(multi);
};
