import "../../Pages/DailyAdvicePage.css";

export default function PeriodNavigationTabs({ selectedPeriod, onPeriodChange, weekNumber, monthNumber, yearNumber }) {
  const periods = [
    { id: 'today', label: 'Hôm nay' },
    { id: 'tomorrow', label: 'Ngày mai' },
    { id: 'week', label: weekNumber ? `Tuần ${weekNumber}` : 'Tuần' },
    { id: 'month', label: monthNumber ? `Tháng ${monthNumber}` : 'Tháng' },
    { id: 'year', label: yearNumber ? `Năm ${yearNumber}` : 'Năm' }
  ];

  return (
    <div className="da-period-tabs">
      {periods.map((period) => (
        <button
          key={period.id}
          onClick={() => onPeriodChange(period.id)}
          className={`da-period-tab ${selectedPeriod === period.id ? 'active' : ''}`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}


