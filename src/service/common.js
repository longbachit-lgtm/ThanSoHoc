
export const sumArray = (arr) => arr.reduce((a, b) => a + b);

/**
 * Thay thế 1 ký tự trong chuỗi và trả về chuối mới
 * @param {string} str chuỗi gốc
 * @param {number} index vị trí muốn thay đổi (theo hệ số 0)
 * @param {string} value giá trị thay thế vào vị trí index
 */
export const replaceAt = (str, index, value) => {
  str = str.split("");
  str[index] = value;

  return str.join("");
};