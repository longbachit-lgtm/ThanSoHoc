import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";
import UserNumerologyHeader from "../component/DailyAdvice/UserNumerologyHeader";
import PeriodNavigationTabs from "../component/DailyAdvice/PeriodNavigationTabs";
import EnergySummary from "../component/DailyAdvice/EnergySummary";
import AdviceCard from "../component/DailyAdvice/AdviceCard";
import SuggestedActionsCard from "../component/DailyAdvice/SuggestedActionsCard";
import TodoListComponent from "../component/DailyAdvice/TodoListComponent";
import { calculateAllPersonalNumbers } from "../service/dailyAdvice";
import { getAdviceByNumber } from "../Data/dailyAdviceData";
import api from "../service/api";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export default function DailyAdvicePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [targetDate, setTargetDate] = useState(new Date());
  const [personalNumbers, setPersonalNumbers] = useState(null);
  const [adviceData, setAdviceData] = useState(null);
  const todoListRef = useRef(null);
  const dispatch = useDispatch();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Get birth date from Redux or localStorage
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);
  const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);
  const fullName = useSelector((state) => state.numberName.full_name_list);
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);

  // Load numerology data from backend if authenticated but Redux is empty
  useEffect(() => {
    const loadNumerologyData = async () => {
      if (!isAuthenticated) return;
      
      // Check if we have data in Redux by checking fullName or birthDayList
      // (since 0 is a valid numerology number, we can't use it to check)
      if (fullName || birthDayList) {
        return; // Already have data
      }

      try {
        const response = await api.numerology.getMyData();
        if (response.data) {
          // Populate Redux store
          dispatch(numberKarmaActions.setKamarNumeroMain(response.data.number || 0));
          dispatch(numberKarmaActions.setKamarNumeroAtitute(response.data.atitute || 0));
          dispatch(numberKarmaActions.setKamarNumeroDayBirth(response.data.day_birth || 0));
          dispatch(numberKarmaActions.setBirthDayNumber(response.data.birthDayString || ""));
          dispatch(numberKarmaActions.setBirthDayList(response.data.birthDayList || ""));
          dispatch(numberKarmaActions.setArrow(response.data.arrow || []));
          dispatch(numberKarmaActions.setLackArrow(response.data.lack_arrow || []));
          dispatch(numberKarmaActions.setTop4Peak(response.data.top4 || {}));
          dispatch(numberKarmaActions.setStrongListNumb(response.data.strong_list || []));
          dispatch(numberKarmaActions.setWeakListNumb(response.data.weak_list || []));

          dispatch(numberNameActions.setNumberDestiny(response.data.destiny || 0));
          dispatch(numberNameActions.setNumberName(response.data.name || 0));
          dispatch(numberNameActions.setNumberSoul(response.data.soul || 0));
          dispatch(numberNameActions.setNumberInner(response.data.inner || "0"));
          dispatch(numberNameActions.setNumberExpress(response.data.express || 0));
          dispatch(numberNameActions.setNumberMature(response.data.mature || 0));
          dispatch(numberNameActions.setFullNameNumber(response.data.full_name_number || ""));
          dispatch(numberNameActions.setFullNameList(response.data.full_name_list || ""));

          // Also save to localStorage for fallback
          if (response.data.full_name_list) {
            localStorage.setItem('userFullName', response.data.full_name_list);
          }
          if (response.data.birthDayList) {
            const parts = response.data.birthDayList.split("/");
            if (parts.length === 3) {
              const [day, month, year] = parts.map((part) => parseInt(part, 10));
              if (!Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)) {
                localStorage.setItem('userBirthDate', JSON.stringify({ day, month, year }));
              }
            }
          }
        }
      } catch (err) {
        console.error("Error loading numerology data:", err);
        // Silently fail - user might not have data yet
      }
    };

    loadNumerologyData();
  }, [isAuthenticated, fullName, birthDayList, dispatch]);

  useEffect(() => {
    // Get birth date
    let day, month, year;
    
    if (birthDay) {
      // Parse from birthDay string (format: "29081999")
      const birthStr = birthDay.toString();
      if (birthStr.length === 8) {
        day = parseInt(birthStr.substring(0, 2));
        month = parseInt(birthStr.substring(2, 4));
        year = parseInt(birthStr.substring(4, 8));
      }
    }
    
    // Try to get from localStorage if not found in Redux
    if (!day || !month || !year) {
      const userBirthDate = localStorage.getItem('userBirthDate');
      if (userBirthDate) {
        try {
          const birthData = JSON.parse(userBirthDate);
          day = birthData.day;
          month = birthData.month;
          year = birthData.year;
        } catch (e) {
          console.error('Error parsing birth date:', e);
        }
      }
    }

    if (day && month && year) {
      // Calculate date based on selected period
      let dateToCalculate = new Date();
      
      if (selectedPeriod === 'tomorrow') {
        dateToCalculate = new Date(dateToCalculate.getTime() + 24 * 60 * 60 * 1000);
      }
      // For week, month, year - use current date for now
      // TODO: Add logic to calculate specific week/month/year
      
      setTargetDate(dateToCalculate);
      
      // Calculate personal numbers
      const numbers = calculateAllPersonalNumbers(day, month, year, dateToCalculate);
      setPersonalNumbers(numbers);
      
      // Get energy number based on period
      let energyNumber;
      switch (selectedPeriod) {
        case 'today':
        case 'tomorrow':
          energyNumber = numbers.personalDay;
          break;
        case 'week':
          energyNumber = numbers.personalWeek;
          break;
        case 'month':
          energyNumber = numbers.personalMonth;
          break;
        case 'year':
          energyNumber = numbers.personalYear;
          break;
        default:
          energyNumber = numbers.personalDay;
      }
      
      // Get advice data
      const advice = getAdviceByNumber(energyNumber, 'day');
      setAdviceData(advice);
    }
  }, [selectedPeriod, birthDay]);

  // Get energy description based on number
  const getEnergyDescription = (number) => {
    const descriptions = {
      1: "Khởi đầu - Chủ động - Dám bước trước",
      2: "Hợp tác - Nhạy cảm - Kiên nhẫn",
      3: "Sáng tạo - Vui vẻ - Giao tiếp",
      4: "Ổn định - Thực tế - Xây dựng",
      5: "Tự do - Phiêu lưu - Thay đổi",
      6: "Yêu thương - Chăm sóc - Trách nhiệm",
      7: "Tìm hiểu - Nội tâm - Trí tuệ",
      8: "Thành công - Quyền lực - Vật chất",
      9: "Nhân đạo - Hoàn thiện - Cho đi"
    };
    return descriptions[number] || "Năng lượng đặc biệt";
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Scroll to TODO list after a short delay when period changes
    setTimeout(() => {
      const todoListElement = document.getElementById('todo-list-component');
      if (todoListElement) {
        todoListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  // Calculate week number for display
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  if (!personalNumbers || !adviceData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div className="text-center">
          <p style={{ color: '#332211' }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const energyNumber = selectedPeriod === 'today' || selectedPeriod === 'tomorrow' 
    ? personalNumbers.personalDay 
    : selectedPeriod === 'week'
    ? personalNumbers.personalWeek
    : selectedPeriod === 'month'
    ? personalNumbers.personalMonth
    : personalNumbers.personalYear;

  return (
    <div 
      className="min-vh-100 p-3"
      style={{
        background: "#FDFBF6",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(232, 199, 140, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(232, 199, 140, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none', top: 0, left: 0 }}>
        {/* Stars and constellations */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: '#E8C78C',
              borderRadius: '50%',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            {/* Header */}
            <UserNumerologyHeader />

            {/* Period Navigation */}
            <PeriodNavigationTabs 
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              weekNumber={getWeekNumber(targetDate)}
              monthNumber={targetDate.getMonth() + 1}
              yearNumber={targetDate.getFullYear()}
              onTodoListClick={(period) => {
                // Scroll to TODO list after a short delay
                setTimeout(() => {
                  const todoListElement = document.getElementById('todo-list-component');
                  if (todoListElement) {
                    todoListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            />

            {/* Energy Summary */}
            <EnergySummary
              energyNumber={energyNumber}
              energyDescription={getEnergyDescription(energyNumber)}
              calculationMethod="Tự tính theo Pythagoras: Năm cá nhân → Tháng cá nhân → Ngày cá nhân"
            />

            {/* Main Energy Number Card */}
            <div 
              className="card border-0 shadow-sm mb-4"
              style={{
                backgroundColor: '#FCF8F0',
                borderRadius: '15px',
                border: '1px solid #E8C78C'
              }}
            >
              <div className="card-body p-4">
                <h3 
                  className="fw-bold text-center mb-0"
                  style={{
                    color: '#332211',
                    fontSize: '18px'
                  }}
                >
                  CON SỐ NĂNG LƯỢNG: {energyNumber} ({getEnergyDescription(energyNumber)})
                </h3>
              </div>
            </div>

            {/* Advice Cards */}
            {adviceData.preparation && (
              <AdviceCard
                type="preparation"
                title={adviceData.preparation.title}
                content={adviceData.preparation.content}
                quickTip={adviceData.preparation.quickTip}
                actions={adviceData.preparation.actions}
              />
            )}

            {adviceData.challenge && (
              <AdviceCard
                type="challenge"
                title={adviceData.challenge.title}
                challenge={adviceData.challenge.challenge}
                opportunity={adviceData.challenge.opportunity}
                reminders={adviceData.challenge.reminders}
              />
            )}

            {adviceData.mistakes && (
              <AdviceCard
                type="mistakes"
                title={adviceData.mistakes.title}
                content={adviceData.mistakes.content}
                actions={adviceData.mistakes.actions}
              />
            )}

            {adviceData.motivation && (
              <AdviceCard
                type="motivation"
                title={adviceData.motivation.title}
                content={adviceData.motivation.content}
              />
            )}

            {/* Suggested Actions Card */}
            {adviceData.suggestedActions && (
              <SuggestedActionsCard
                title={adviceData.suggestedActions.title}
                actions={adviceData.suggestedActions.actions}
                period={selectedPeriod}
                targetDate={targetDate}
                onSaveSuccess={() => {
                  if (todoListRef.current && todoListRef.current.refresh) {
                    todoListRef.current.refresh();
                  }
                }}
              />
            )}

            {/* TODO List Component */}
            <div id="todo-list-component">
              <TodoListComponent 
                ref={todoListRef}
                period={selectedPeriod}
                targetDate={targetDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

