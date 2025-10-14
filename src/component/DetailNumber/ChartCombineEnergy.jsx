import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { filterRealNumber } from "../../service/numerlogy";
import { numberKarmaActions } from "../../store/numberKarma";
import DrawCell from "./SubComponent/DrawCell";
const ChartCombineEnergy = function ({
  color = "red",
  buttonText,
  buttonColor,
  id_link,
}) {
  const [wRightPanel, setWLeftPanel] = useState();
  const dispatch = useDispatch();
  // combineChart
  const birthString = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_number = useSelector(
    (state) => state.numberName.full_name_number
  );
  const main = useSelector((state) => state.numberKarmaMain.number);
  const soul = useSelector((state) => state.numberName.soul);
  const destiny = useSelector((state) => state.numberName.destiny);
  const mature = useSelector((state) => state.numberName.mature);
  const express = useSelector((state) => state.numberName.express);
  const nameNumber = useSelector((state) => state.numberName.name);
  const atitute = useSelector((state) => state.numberKarmaMain.atitute);
  const day_birth = useSelector((state) => state.numberKarmaMain.day_birth);
  const top4 = useSelector((state) => state.numberKarmaMain.top4.top4_peak);
  const strongBirthNumb = filterRealNumber(birthString, 2);
  const strongNameNumb = filterRealNumber(full_name_number, 3);

  let listNumbCombine =
    "" +
    strongBirthNumb +
    strongNameNumb +
    atitute +
    day_birth +
    nameNumber +
    soul +
    express;

  const amountNumber = {};
  for (let chr of listNumbCombine.replaceAll("0", "")) {
    if (amountNumber[chr]) {
      amountNumber[chr] += 1;
    } else {
      amountNumber[chr] = 1;
    }
  }

  for (let top in top4) {
    if (!top4[top].num) {
      continue;
    }
    if (amountNumber[top4[top].num]) {
      amountNumber[top4[top].num] += 2;
    } else {
      amountNumber[top4[top].num] = 2;
    }
  }

  amountNumber[main] = amountNumber[main] ? amountNumber[main] + 4 : 4;

  amountNumber[destiny] = amountNumber[destiny] ? amountNumber[destiny] + 3 : 3;
  amountNumber[mature] = amountNumber[mature] ? amountNumber[mature] + 3 : 3;

  // start Kiem tra so manh va yeu

  const stong_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 22, 30, 33];
  const strongNumber = stong_arr.filter((num) => amountNumber[num] >= 4);

  const strong_arr_sort = strongNumber.sort(
    (a, b) => amountNumber[b] - amountNumber[a]
  );

  dispatch(numberKarmaActions.setStrongListNumb(strong_arr_sort));

  const weak_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const weakNumbers = weak_arr.filter(
    (num) => !amountNumber.hasOwnProperty(num)
  );
  const arr_check_weak = Object.keys(amountNumber).map(Number);

  const filteredWeakContents = weakNumbers.reduce((acc, numb) => {
    const strongNumCheck = {
      1: [11, 10],
      2: [22, 11],
      4: [22],
      3: [33, 30],
      6: [33],
    };

    const hasStrongNum = strongNumCheck[numb]?.some((num) =>
      arr_check_weak.includes(num)
    );

    if (!hasStrongNum) {
      acc.push(numb);
    }

    return acc;
  }, []);

  dispatch(numberKarmaActions.setWeakListNumb(filteredWeakContents));

  // end
  const canvasEl = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = canvasEl?.current?.offsetWidth;
      const widthWindow = window.innerWidth;
      widthWindow < 768 ? setWLeftPanel(width * 2.2) : setWLeftPanel(width);
    };

    handleResize(); // Gọi lần đầu khi mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const wMatrix = wRightPanel * 0.45;
  const hMatrix = (wMatrix / 3) * 3;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    console.log({ element });
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="col-6 my-3" ref={canvasEl}>
      <div className=" d-flex justify-content-center ">
        {/* Vẽ biểu đồ bằng React Konva */}
        {wMatrix && (
          <DrawCell
            wMatrix={wMatrix}
            hMatrix={hMatrix}
            amountNumber={amountNumber}
            color={color}
          />
        )}
      </div>
      {/* Nút bấm */}

      <div class="d-flex justify-content-center">
        <button
          className={` btn mybtn`}
          style={{
            backgroundColor: buttonColor,
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={() => scrollToSection(id_link)}
        >
          👉 {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ChartCombineEnergy;
