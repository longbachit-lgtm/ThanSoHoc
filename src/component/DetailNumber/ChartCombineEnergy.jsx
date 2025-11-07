import React, { useEffect, useRef, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
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
      setWLeftPanel(width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const wMatrix = wRightPanel * 0.5;
  const hMatrix = (wMatrix / 3) * 3;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get gradient based on button color
  const getGradient = () => {
    return 'linear-gradient(135deg, #76C7C0 0%, #3cbc9b 100%)';
  };

  return (
    <div className="w-100" ref={canvasEl}>
      {/* Chart container with enhanced styling - Gold/Orange theme */}
      <div 
        className="d-flex justify-content-center mb-3 p-3 rounded-3 position-relative"
        style={{
          background: 'linear-gradient(135deg, rgba(232, 199, 140, 0.12) 0%, rgba(255, 245, 232, 0.6) 100%)',
          border: '2px solid rgba(232, 199, 140, 0.3)',
          minHeight: '240px',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isHovered 
            ? '0 8px 24px rgba(184, 134, 11, 0.18)' 
            : '0 4px 16px rgba(184, 134, 11, 0.12)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative glow effect */}
        <div 
          className="position-absolute rounded-circle"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(232, 199, 140, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        
        {/* Chart Canvas */}
        {wMatrix && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DrawCell
              wMatrix={wMatrix}
              hMatrix={hMatrix}
              amountNumber={amountNumber}
              color="#B8860B"
            />
          </div>
        )}
      </div>

      {/* Enhanced Action Button with Gold Gradient */}
      {id_link && buttonText && (
        <div className="d-flex justify-content-center mt-2">
          <button
            className="btn border-0 rounded-pill px-5 py-2 d-flex align-items-center gap-2 position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #B8860B 0%, #E8C78C 50%, #B8860B 100%)',
              color: "white",
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.8px',
              boxShadow: '0 4px 16px rgba(184, 134, 11, 0.35)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => scrollToSection(id_link)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(184, 134, 11, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(184, 134, 11, 0.35)';
            }}
          >
            <span style={{ fontSize: '18px' }}>🌟</span>
            <span>{buttonText}</span>
            <span style={{ fontSize: '18px' }}>🌟</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartCombineEnergy;
