/**
 * Helper function to initialize numerology data from localStorage into Redux
 */
import {
  mergeNumberString,
  removeVietnameseTones,
  stringToNumber,
  soulAndExpress,
  numberAtLeastThreeTimes,
  checkArrow,
  lackArrow,
  fourTop,
} from "./numerlogy";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export const initializeNumerologyData = (dispatch) => {
  try {
    // Get data from localStorage
    const userFullName = localStorage.getItem('userFullName');
    const userBirthDate = localStorage.getItem('userBirthDate');

    if (!userFullName || !userBirthDate) {
      return false;
    }

    const birthData = JSON.parse(userBirthDate);
    const { day, month, year } = birthData;

    if (!day || !month || !year) {
      return false;
    }

    const spaceRegex = /\s+/g;

    // Calculate birth string
    const birthString = day + "" + month + year;

    // Main number (Số Chủ Đạo)
    const main = mergeNumberString(birthString);
    dispatch(numberKarmaActions.setKamarNumeroMain(main));

    // Birth day number for chart
    dispatch(numberKarmaActions.setBirthDayNumber(birthString));
    const birthStringList = day + "/" + month + "/" + year;
    dispatch(numberKarmaActions.setBirthDayList(birthStringList));

    // Four top peaks and challenges
    const top4 = fourTop(day, month, year);
    dispatch(numberKarmaActions.setTop4Peak(top4));

    // Arrows
    dispatch(numberKarmaActions.setArrow(checkArrow(birthString)));
    dispatch(numberKarmaActions.setLackArrow(lackArrow(birthString)));

    // Attitude number (Số Thái Độ)
    const atitute = mergeNumberString((day - 0) + (month - 0) + "", true);
    dispatch(numberKarmaActions.setKamarNumeroAtitute(atitute));

    // Day birth number (Số Ngày Sinh)
    const day_birth = mergeNumberString(day + "");
    dispatch(numberKarmaActions.setKamarNumeroDayBirth(day_birth));

    // Process name
    const full_name_list = userFullName.trim();
    const full_name = removeVietnameseTones(userFullName.trim()).toUpperCase();
    const full_name_number = stringToNumber(full_name);

    // Destiny number (Số Định Mệnh)
    const destinyNumber = mergeNumberString(full_name_number);
    dispatch(numberNameActions.setNumberDestiny(destinyNumber));
    dispatch(numberNameActions.setFullNameNumber(full_name_number));
    dispatch(numberNameActions.setFullNameList(full_name_list));

    // Name number (Số Tên Riêng)
    const full_name_split = full_name.split(" ");
    const name = full_name_split[full_name_split.length - 1];
    const nameNumber = mergeNumberString(stringToNumber(name), true);
    dispatch(numberNameActions.setNumberName(nameNumber));

    // Soul and Express numbers
    const prename = full_name_split.slice(0, -1).join("");
    const { soul, express } = soulAndExpress([
      ...prename.split(spaceRegex),
      ...name.split(spaceRegex),
    ]);
    dispatch(numberNameActions.setNumberSoul(soul));
    dispatch(numberNameActions.setNumberExpress(express));

    // Inner number (Số Nội Cảm)
    const list_number_name = stringToNumber(full_name)
      .split("")
      .filter((num) => num !== "0");
    const inner_number = numberAtLeastThreeTimes(list_number_name);
    dispatch(numberNameActions.setNumberInner(inner_number ? inner_number : ""));

    // Mature number (Số Trưởng Thành)
    const mature = mergeNumberString((main - 0) + (destinyNumber - 0) + "", true);
    dispatch(numberNameActions.setNumberMature(mature));

    return true;
  } catch (error) {
    console.error("Error initializing numerology data:", error);
    return false;
  }
};

