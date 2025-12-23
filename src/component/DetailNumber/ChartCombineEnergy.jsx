import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const top4Data = useSelector((state) => state.numberKarmaMain.top4);
  const top4Peaks = top4Data?.top4_peak ?? {};
  const strongBirthNumb = filterRealNumber(birthString || "", 2) || "";
  const strongNameNumb = filterRealNumber(full_name_number || "", 3) || "";

  const { amountNumber, strongList, weakList } = useMemo(() => {
    const amount = {};

    const listNumbCombine =
      "" +
      strongBirthNumb +
      strongNameNumb +
      (atitute || "") +
      (day_birth || "") +
      (nameNumber || "") +
      (soul || "") +
      (express || "");

    for (let chr of listNumbCombine.replaceAll("0", "")) {
      if (amount[chr]) {
        amount[chr] += 1;
      } else {
        amount[chr] = 1;
      }
    }

    Object.values(top4Peaks || {}).forEach((peak) => {
      if (!peak?.num) {
        return;
      }
      amount[peak.num] = amount[peak.num] ? amount[peak.num] + 2 : 2;
    });

    const pushOrInit = (key, value) => {
      if (!key && key !== 0) return;
      amount[key] = amount[key] ? amount[key] + value : value;
    };

    pushOrInit(main, 4);
    pushOrInit(destiny, 3);
    pushOrInit(mature, 3);

    const strongCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 22, 30, 33];
    const strongNumbers = strongCandidates
      .filter((num) => amount[num] >= 4)
      .sort((a, b) => amount[b] - amount[a]);

    const weakCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const presentNumbers = Object.keys(amount).map(Number);

    const filteredWeak = weakCandidates.reduce((acc, numb) => {
      const strongNumCheck = {
        1: [11, 10],
        2: [22, 11],
        4: [22],
        3: [33, 30],
        6: [33],
      };

      const hasStrongNum = strongNumCheck[numb]?.some((num) =>
        presentNumbers.includes(num)
      );

      if (!hasStrongNum && !amount.hasOwnProperty(numb)) {
        acc.push(numb);
      }

      return acc;
    }, []);

    return {
      amountNumber: amount,
      strongList: strongNumbers,
      weakList: filteredWeak,
    };
  }, [
    strongBirthNumb,
    strongNameNumb,
    atitute,
    day_birth,
    nameNumber,
    soul,
    express,
    top4Peaks,
    main,
    destiny,
    mature,
  ]);

  useEffect(() => {
    dispatch(numberKarmaActions.setStrongListNumb(strongList));
  }, [dispatch, strongList]);

  useEffect(() => {
    dispatch(numberKarmaActions.setWeakListNumb(weakList));
  }, [dispatch, weakList]);

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
        {wRightPanel && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DrawCell
              wRightPanel={wRightPanel}
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
