export default function PeriodNavigationTabs({ selectedPeriod, onPeriodChange, weekNumber, monthNumber, yearNumber }) {
  const periods = [
    { id: 'today', label: 'Hôm nay' },
    { id: 'tomorrow', label: 'Ngày mai' },
    { id: 'week', label: weekNumber ? `Tuần ${weekNumber}` : 'Tuần' },
    { id: 'month', label: monthNumber ? `Tháng ${monthNumber}` : 'Tháng' },
    { id: 'year', label: yearNumber ? `Năm ${yearNumber}` : 'Năm' }
  ];

  return (
    <div className="mb-4">
      {/* Decorative dots */}
      <div className="text-center mb-2">
        <div className="d-flex justify-content-center gap-1">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="rounded-circle"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#E8C78C',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Period Tabs */}
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => onPeriodChange(period.id)}
            className="btn border-0 rounded-pill px-3 py-2"
            style={{
              backgroundColor: selectedPeriod === period.id ? '#A07A4A' : '#FCF8F0',
              color: selectedPeriod === period.id ? '#fff' : '#332211',
              fontSize: '14px',
              fontWeight: selectedPeriod === period.id ? 'bold' : 'normal',
              border: selectedPeriod === period.id ? 'none' : '1px solid #E8C78C',
              transition: 'all 0.3s ease'
            }}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Decorative dots */}
      <div className="text-center mt-2">
        <div className="d-flex justify-content-center gap-1">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="rounded-circle"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#E8C78C',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


