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
      
      switch (selectedPeriod) {
        case 'today':
          // Use current date
          dateToCalculate = new Date();
          break;
        case 'tomorrow':
          // Tomorrow
          dateToCalculate = new Date();
          dateToCalculate.setDate(dateToCalculate.getDate() + 1);
          break;
        case 'week':
          // Use current date (week calculation is based on week number)
          dateToCalculate = new Date();
          break;
        case 'month':
          // Use current date (month calculation is based on current month)
          dateToCalculate = new Date();
          break;
        case 'year':
          // Use current date (year calculation is based on current year)
          dateToCalculate = new Date();
          break;
        default:
          dateToCalculate = new Date();
      }
      
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
      
      // Get advice data based on period type
      const adviceType = selectedPeriod === 'week' ? 'week' 
        : selectedPeriod === 'month' ? 'month'
        : selectedPeriod === 'year' ? 'year'
        : 'day';
      let advice = getAdviceByNumber(energyNumber, adviceType);
      
      // Adjust content based on period (including today to fix "Ngày mai" → "Hôm nay")
      advice = adjustAdviceForPeriod(advice, selectedPeriod);
      
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

  // Adjust advice content for different periods
  const adjustAdviceForPeriod = (advice, period) => {
    const adjusted = JSON.parse(JSON.stringify(advice)); // Deep clone
    
    const periodMap = {
      'today': {
        content: { 
          'Ngày mai': 'Hôm nay',
          'ngày mai': 'hôm nay'
        }
      },
      'tomorrow': {
        title: { 'ngày mới': 'ngày mai' },
        content: { 
          'Hôm nay': 'Ngày mai',
          'hôm nay': 'ngày mai',
          'Ngày hôm nay': 'Ngày mai',
          'ngày hôm nay': 'ngày mai'
        }
      },
      'week': {
        title: { 'ngày mới': 'tuần mới', 'ngày': 'tuần' },
        content: { 
          'Hôm nay': 'Tuần này', 
          'hôm nay': 'tuần này',
          'Ngày mai': 'Tuần này',
          'ngày mai': 'tuần này',
          'Ngày hôm nay': 'Tuần này',
          'ngày hôm nay': 'tuần này',
          'ngày': 'tuần',
          'Buổi sáng': 'Đầu tuần',
          'buổi sáng': 'đầu tuần'
        }
      },
      'month': {
        title: { 'ngày mới': 'tháng mới', 'ngày': 'tháng' },
        content: { 
          'Hôm nay': 'Tháng này', 
          'hôm nay': 'tháng này',
          'Ngày mai': 'Tháng này',
          'ngày mai': 'tháng này',
          'Ngày hôm nay': 'Tháng này',
          'ngày hôm nay': 'tháng này',
          'ngày': 'tháng',
          'Buổi sáng': 'Đầu tháng',
          'buổi sáng': 'đầu tháng'
        }
      },
      'year': {
        title: { 'ngày mới': 'năm mới', 'ngày': 'năm' },
        content: { 
          'Hôm nay': 'Năm này', 
          'hôm nay': 'năm này',
          'Ngày mai': 'Năm này',
          'ngày mai': 'năm này',
          'Ngày hôm nay': 'Năm này',
          'ngày hôm nay': 'năm này',
          'ngày': 'năm',
          'Buổi sáng': 'Đầu năm',
          'buổi sáng': 'đầu năm'
        }
      }
    };

    const replacements = periodMap[period];
    if (!replacements) return adjusted;

    // Adjust preparation title (only if title replacements exist)
    if (adjusted.preparation && adjusted.preparation.title && replacements.title) {
      Object.keys(replacements.title).forEach(key => {
        adjusted.preparation.title = adjusted.preparation.title.replace(
          new RegExp(key, 'gi'), 
          replacements.title[key]
        );
      });
    }

    // Adjust preparation content
    if (adjusted.preparation && adjusted.preparation.content) {
      let content = adjusted.preparation.content;
      Object.keys(replacements.content).forEach(key => {
        content = content.replace(
          new RegExp(key, 'g'), 
          replacements.content[key]
        );
      });
      adjusted.preparation.content = content;
    }

    // Adjust quickTip
    if (adjusted.preparation && adjusted.preparation.quickTip) {
      let quickTip = adjusted.preparation.quickTip;
      Object.keys(replacements.content).forEach(key => {
        quickTip = quickTip.replace(
          new RegExp(key, 'g'), 
          replacements.content[key]
        );
      });
      adjusted.preparation.quickTip = quickTip;
    }

    // Adjust challenge content
    if (adjusted.challenge) {
      if (adjusted.challenge.challenge) {
        let challenge = adjusted.challenge.challenge;
        Object.keys(replacements.content).forEach(key => {
          challenge = challenge.replace(
            new RegExp(key, 'g'), 
            replacements.content[key]
          );
        });
        adjusted.challenge.challenge = challenge;
      }
      if (adjusted.challenge.opportunity) {
        let opportunity = adjusted.challenge.opportunity;
        Object.keys(replacements.content).forEach(key => {
          opportunity = opportunity.replace(
            new RegExp(key, 'g'), 
            replacements.content[key]
          );
        });
        adjusted.challenge.opportunity = opportunity;
      }
    }

    // Adjust mistakes content
    if (adjusted.mistakes && adjusted.mistakes.content) {
      if (Array.isArray(adjusted.mistakes.content)) {
        adjusted.mistakes.content = adjusted.mistakes.content.map(item => {
          let content = item;
          Object.keys(replacements.content).forEach(key => {
            content = content.replace(
              new RegExp(key, 'g'), 
              replacements.content[key]
            );
          });
          return content;
        });
      } else {
        let content = adjusted.mistakes.content;
        Object.keys(replacements.content).forEach(key => {
          content = content.replace(
            new RegExp(key, 'g'), 
            replacements.content[key]
          );
        });
        adjusted.mistakes.content = content;
      }
    }

    // Adjust motivation content
    if (adjusted.motivation && adjusted.motivation.content) {
      let content = adjusted.motivation.content;
      Object.keys(replacements.content).forEach(key => {
        content = content.replace(
          new RegExp(key, 'g'), 
          replacements.content[key]
        );
      });
      adjusted.motivation.content = content;
    }

    // Adjust suggestedActions
    if (adjusted.suggestedActions && adjusted.suggestedActions.actions) {
      const timeMap = {
        'tomorrow': {}, // Keep original time labels for tomorrow
        'week': { 'Sáng': 'Đầu tuần', 'Trưa': 'Giữa tuần', 'Chiều': 'Cuối tuần', 'Tối': 'Cuối tuần' },
        'month': { 'Sáng': 'Đầu tháng', 'Trưa': 'Giữa tháng', 'Chiều': 'Cuối tháng', 'Tối': 'Cuối tháng' },
        'year': { 'Sáng': 'Đầu năm', 'Trưa': 'Giữa năm', 'Chiều': 'Cuối năm', 'Tối': 'Cuối năm' }
      };
      
      adjusted.suggestedActions.actions = adjusted.suggestedActions.actions.map(action => {
        let text = action.text;
        let time = action.time;
        
        // Adjust time label (only for week/month/year)
        if (timeMap[period] && timeMap[period][time]) {
          time = timeMap[period][time];
        }
        
        // Adjust text content
        Object.keys(replacements.content).forEach(key => {
          text = text.replace(
            new RegExp(key, 'g'), 
            replacements.content[key]
          );
        });
        
        return { ...action, text, time };
      });
    }

    return adjusted;
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
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
            />

            {/* Energy Summary */}
            <EnergySummary
              energyNumber={energyNumber}
              energyDescription={getEnergyDescription(energyNumber)}
              period={selectedPeriod}
              targetDate={targetDate}
              personalNumbers={personalNumbers}
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
                <div className="text-center mb-2">
                  <span 
                    style={{
                      color: '#6e645b',
                      fontSize: '13px',
                      fontStyle: 'italic'
                    }}
                  >
                    {selectedPeriod === 'today' && `Hôm nay, ${formatDate(targetDate)}`}
                    {selectedPeriod === 'tomorrow' && `Ngày mai, ${formatDate(targetDate)}`}
                    {selectedPeriod === 'week' && `Tuần ${getWeekNumber(targetDate)}, ${targetDate.getFullYear()}`}
                    {selectedPeriod === 'month' && `Tháng ${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`}
                    {selectedPeriod === 'year' && `Năm ${targetDate.getFullYear()}`}
                  </span>
                </div>
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
                period={selectedPeriod}
                targetDate={targetDate}
                onSaveSuccess={() => {
                  if (todoListRef.current && todoListRef.current.refresh) {
                    todoListRef.current.refresh();
                  }
                }}
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

