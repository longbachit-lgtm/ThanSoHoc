import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import UserNumerologyHeader from "../component/DailyAdvice/UserNumerologyHeader";
import PageNavigationMenu from "../component/DailyAdvice/PageNavigationMenu";
import PeriodNavigationTabs from "../component/DailyAdvice/PeriodNavigationTabs";
import EnergySummary from "../component/DailyAdvice/EnergySummary";
import AdviceCard from "../component/DailyAdvice/AdviceCard";
import SuggestedActionsCard from "../component/DailyAdvice/SuggestedActionsCard";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Handler để chuyển sang trang TodoList sau khi lưu thành công
  const handleSaveToTodoSuccess = () => {
    // Delay một chút để đảm bảo dữ liệu đã được lưu
    setTimeout(() => {
      navigate('/todo-list');
    }, 500);
  };

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
        const data = response.data || response;
        if (data) {
          // Populate Redux store
          dispatch(numberKarmaActions.setKamarNumeroMain(data.number || 0));
          dispatch(numberKarmaActions.setKamarNumeroAtitute(data.atitute || 0));
          dispatch(numberKarmaActions.setKamarNumeroDayBirth(data.day_birth || 0));
          dispatch(numberKarmaActions.setBirthDayNumber(data.birthDayString || ""));
          dispatch(numberKarmaActions.setBirthDayList(data.birthDayList || ""));
          dispatch(numberKarmaActions.setArrow(data.arrow || []));
          dispatch(numberKarmaActions.setLackArrow(data.lack_arrow || []));
          dispatch(numberKarmaActions.setTop4Peak(data.top4 || {}));
          dispatch(numberKarmaActions.setStrongListNumb(data.strong_list || []));
          dispatch(numberKarmaActions.setWeakListNumb(data.weak_list || []));

          dispatch(numberNameActions.setNumberDestiny(data.destiny || 0));
          dispatch(numberNameActions.setNumberName(data.name || 0));
          dispatch(numberNameActions.setNumberSoul(data.soul || 0));
          dispatch(numberNameActions.setNumberInner(data.inner || "0"));
          dispatch(numberNameActions.setNumberExpress(data.express || 0));
          dispatch(numberNameActions.setNumberMature(data.mature || 0));
          dispatch(numberNameActions.setFullNameNumber(data.full_name_number || ""));
          dispatch(numberNameActions.setFullNameList(data.full_name_list || ""));

          // Also save to localStorage for fallback
          if (data.full_name_list) {
            localStorage.setItem('userFullName', data.full_name_list);
          }
          if (data.birthDayList) {
            const parts = data.birthDayList.split("/");
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

  // --- SAVING LOGIC ---
  const [isSavingMistakes, setIsSavingMistakes] = useState(false);
  const [isSavingActions, setIsSavingActions] = useState(false);

  const handleSaveMistakesToTodo = async () => {
    if (!isAuthenticated) return alert("Vui lòng đăng nhập!");

    // Check content
    const content = adviceData.mistakes?.content;
    if (!content) return alert("Không có dữ liệu để lưu!");

    try {
      setIsSavingMistakes(true);
      // 1. Get or Create Todo List
      let todoList = await getOrCreateTodoList();

      // 2. Add Section
      const items = Array.isArray(content)
        ? content.map((text, i) => ({ text, completed: false, order: i }))
        : [{ text: content, completed: false, order: 0 }];

      await addSectionToTodoList(todoList, "Hướng dẫn tránh sai lầm", items);

      alert("Đã lưu vào TODO List thành công!");
      handleSaveToTodoSuccess();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu: " + (err.message || "Unknown error"));
    } finally {
      setIsSavingMistakes(false);
    }
  };

  const handleSaveActionsToTodo = async () => {
    if (!isAuthenticated) return alert("Vui lòng đăng nhập!");

    const actions = adviceData.suggestedActions?.actions;
    if (!actions || actions.length === 0) return alert("Không có hành động để lưu!");

    try {
      setIsSavingActions(true);
      // 1. Get or Create Todo List
      let todoList = await getOrCreateTodoList();

      // 2. Add Section
      const items = actions.map((action, i) => ({
        text: `${action.time}: ${action.text}`,
        completed: false,
        order: i
      }));

      await addSectionToTodoList(todoList, adviceData.suggestedActions.title || "Hành động gợi ý", items);

      alert("Đã lưu hành động thành công!");
      handleSaveToTodoSuccess();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu: " + (err.message || "Unknown error"));
    } finally {
      setIsSavingActions(false);
    }
  };

  // Helper: Get or Create Todo List
  const getOrCreateTodoList = async () => {
    let todoList;
    try {
      // Try fetching existing
      if (selectedPeriod && selectedPeriod !== 'custom') {
        const res = await api.todo.getByPeriod(selectedPeriod, targetDate);
        todoList = res.data;
      } else {
        const res = await api.todo.getActive();
        todoList = res.data;
      }
    } catch (e) { /* ignore 404 */ }

    // Create if not exists
    if (!todoList || !todoList._id) {
      const newTodo = {
        title: "Danh sách việc cần làm",
        sections: [],
        period: selectedPeriod || 'custom',
        targetDate: targetDate ? (targetDate instanceof Date ? targetDate.toISOString() : targetDate) : null
      };
      const res = await api.todo.create(newTodo);
      todoList = res.data;
    }
    return todoList;
  };

  // Helper: Add Section
  const addSectionToTodoList = async (todoList, sectionTitle, items) => {
    // Check existence
    const existIdx = todoList.sections.findIndex(s => s.title === sectionTitle);

    if (existIdx !== -1) {
      // Merge items
      const existingSection = todoList.sections[existIdx];
      const existingTexts = new Set(existingSection.items.map(i => i.text));
      items.forEach(newItem => {
        if (!existingTexts.has(newItem.text)) {
          existingSection.items.push({ ...newItem, order: existingSection.items.length });
        }
      });
      todoList.sections[existIdx] = existingSection;
    } else {
      // Create new section
      todoList.sections.push({
        title: sectionTitle,
        items,
        isExpanded: true,
        order: todoList.sections.length
      });
    }

    // Update API
    const updateData = {
      title: todoList.title,
      sections: todoList.sections,
      period: todoList.period,
      targetDate: todoList.targetDate ? (todoList.targetDate instanceof Date ? todoList.targetDate.toISOString() : todoList.targetDate) : null,
      isActive: true
    };
    await api.todo.update(todoList._id, updateData);
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
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-3"
        style={{
          background: "transparent",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border mb-3"
            role="status"
            style={{
              width: '3rem',
              height: '3rem',
              color: '#A07A4A',
              borderWidth: '4px'
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#332211', fontSize: '16px', fontWeight: '500' }}>
            Đang tải dữ liệu...
          </p>
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

  // ... (previous logic stays, just update return)

  return (
    <div className="daily-advice-page">
      <div className="daily-advice-container">
        {/* HEADER & NAV */}
        <UserNumerologyHeader />
        <PageNavigationMenu />

        <PeriodNavigationTabs
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          weekNumber={getWeekNumber(targetDate)}
          monthNumber={targetDate.getMonth() + 1}
          yearNumber={targetDate.getFullYear()}
        />

        {/* ENERGY CARD */}
        <div className="da-energy-card">
          <div className="da-energy-date">
            <i className="fa-regular fa-calendar" />
            {selectedPeriod === 'today' && `Hôm nay, ${formatDate(targetDate)}`}
            {/* {selectedPeriod === 'tomorrow' && `Ngày mai, ${formatDate(targetDate)}`} */}
            {selectedPeriod === 'week' && `Tuần ${getWeekNumber(targetDate)}, ${targetDate.getFullYear()}`}
            {selectedPeriod === 'month' && `Tháng ${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`}
            {selectedPeriod === 'year' && `Năm ${targetDate.getFullYear()}`}
          </div>

          <div className="da-energy-circle">
            {energyNumber}
          </div>

          <div className="da-energy-title">CON SỐ NĂNG LƯỢNG</div>
          <p className="da-energy-desc">
            {getEnergyDescription(energyNumber)}
          </p>
        </div>

        {/* ADVICE CARDS */}
        <div>
          {/* 1. Preparation */}
          {adviceData.preparation && (
            <div className="da-content-card">
              <div className="da-card-header">
                <span className="da-card-icon">🧘</span>
                {adviceData.preparation.title || "Chuẩn bị cho ngày mới"}
              </div>
              <div className="da-card-text">
                {adviceData.preparation.content}
              </div>
              {adviceData.preparation.quickTip && (
                <div className="da-quote-box">
                  <span className="da-quote-label">MỤC TIÊU NHANH</span>
                  <div className="da-quote-content">"{adviceData.preparation.quickTip}"</div>
                </div>
              )}
            </div>
          )}

          {/* 2. Challenge & Opportunity */}
          {adviceData.challenge && (
            <div className="da-content-card">
              <div className="da-card-header">
                <span className="da-card-icon">⚖️</span>
                {adviceData.challenge.title || "Thách thức & Cơ hội"}
              </div>

              <div className="mb-3">
                <strong style={{ color: '#A07A4A', fontSize: '13px' }}>Thách thức:</strong>
                <p style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
                  {adviceData.challenge.challenge}
                </p>
              </div>

              <div>
                <strong style={{ color: '#A07A4A', fontSize: '13px' }}>Cơ hội:</strong>
                <p style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
                  {adviceData.challenge.opportunity}
                </p>
              </div>
            </div>
          )}

          {/* 3. Mistakes / "Huong Dan Tranh Sai Lam" */}
          {adviceData.mistakes && adviceData.mistakes.content && (
            <div className="da-content-card">
              <div className="da-card-header">
                <span className="da-card-icon">⚠️</span>
                {adviceData.mistakes.title || "Hướng dẫn tránh sai lầm"}
              </div>
              <ul className="da-list">
                {Array.isArray(adviceData.mistakes.content)
                  ? adviceData.mistakes.content.map((item, i) => <li key={i}>{item}</li>)
                  : <li>{adviceData.mistakes.content}</li>
                }
              </ul>

              {/* <div className="da-breath-pill">
                Hít thở 4-4-4
              </div> */}

              {/* <button
                className="da-todo-btn"
                onClick={handleSaveMistakesToTodo}
                disabled={isSavingMistakes}
              >
                {isSavingMistakes ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-list-check"></i>
                    Lưu vào TODO List
                  </>
                )}
              </button> */}
            </div>
          )}

          {/* 4. Motivation */}
          {adviceData.motivation && (
            <div className="da-content-card">
              <div className="da-card-header">
                <span className="da-card-icon">❝</span>
                Lời nhắn gửi bạn
                <span className="da-card-icon">❞</span>
              </div>

              <div className="da-quote-content" style={{ textAlign: 'center', fontSize: '14px' }}>
                {adviceData.motivation.content}
              </div>
            </div>
          )}

          {/* 5. Actions */}
          {adviceData.suggestedActions && adviceData.suggestedActions.actions && !['week', 'month', 'year'].includes(selectedPeriod) && (
            <div className="da-content-card">
              <div className="da-card-header">
                <span className="da-card-icon">✅</span>
                Hành động gợi ý
              </div>

              {adviceData.suggestedActions.actions.map((action, idx) => (
                <div key={idx} className="da-action-item">
                  <div className="da-action-num">{idx + 1}</div>
                  <div className="da-action-text">
                    <span className="da-action-label">{action.time}:</span>
                    {action.text}
                  </div>
                </div>
              ))}

              <button
                className="da-todo-btn"
                onClick={handleSaveActionsToTodo}
                disabled={isSavingActions}
              >
                {isSavingActions ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-floppy-disk"></i>
                    Lưu hành động
                  </>
                )}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

