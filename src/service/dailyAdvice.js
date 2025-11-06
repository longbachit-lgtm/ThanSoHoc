import { mergeNumberString } from "./numerlogy";

/**
 * Tính Personal Year (Năm cá nhân)
 * @param {number} birthDay - Ngày sinh
 * @param {number} birthMonth - Tháng sinh
 * @param {number} currentYear - Năm hiện tại
 * @returns {number} Personal Year number
 */
export const calculatePersonalYear = (birthDay, birthMonth, currentYear) => {
  const personalYear = mergeNumberString(
    birthDay + "" + birthMonth + currentYear,
    true
  );
  return parseInt(personalYear);
};

/**
 * Tính Personal Month (Tháng cá nhân)
 * @param {number} personalYear - Năm cá nhân
 * @param {number} currentMonth - Tháng hiện tại (1-12)
 * @returns {number} Personal Month number
 */
export const calculatePersonalMonth = (personalYear, currentMonth) => {
  const personalMonth = mergeNumberString(
    personalYear + "" + currentMonth,
    true
  );
  return parseInt(personalMonth);
};

/**
 * Tính Personal Day (Ngày cá nhân)
 * @param {number} personalMonth - Tháng cá nhân
 * @param {number} currentDay - Ngày hiện tại
 * @returns {number} Personal Day number
 */
export const calculatePersonalDay = (personalMonth, currentDay) => {
  const personalDay = mergeNumberString(
    personalMonth + "" + currentDay,
    true
  );
  return parseInt(personalDay);
};

/**
 * Tính Personal Week (Tuần cá nhân) - dựa trên số tuần trong năm
 * @param {number} personalYear - Năm cá nhân
 * @param {number} weekNumber - Số tuần trong năm (1-52)
 * @returns {number} Personal Week number
 */
export const calculatePersonalWeek = (personalYear, weekNumber) => {
  const personalWeek = mergeNumberString(
    personalYear + "" + weekNumber,
    true
  );
  return parseInt(personalWeek);
};

/**
 * Lấy số tuần trong năm từ ngày
 * @param {Date} date - Ngày cần tính
 * @returns {number} Số tuần trong năm (1-52)
 */
export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Tính tất cả các con số năng lượng cho một ngày cụ thể
 * @param {number} birthDay - Ngày sinh
 * @param {number} birthMonth - Tháng sinh
 * @param {number} birthYear - Năm sinh
 * @param {Date} targetDate - Ngày cần tính (mặc định là hôm nay)
 * @returns {object} Object chứa personalYear, personalMonth, personalDay, personalWeek
 */
export const calculateAllPersonalNumbers = (
  birthDay,
  birthMonth,
  birthYear,
  targetDate = new Date()
) => {
  const currentYear = targetDate.getFullYear();
  const currentMonth = targetDate.getMonth() + 1; // 1-12
  const currentDay = targetDate.getDate();
  const weekNumber = getWeekNumber(targetDate);

  const personalYear = calculatePersonalYear(birthDay, birthMonth, currentYear);
  const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
  const personalDay = calculatePersonalDay(personalMonth, currentDay);
  const personalWeek = calculatePersonalWeek(personalYear, weekNumber);

  return {
    personalYear,
    personalMonth,
    personalDay,
    personalWeek,
    currentDate: targetDate,
  };
};


