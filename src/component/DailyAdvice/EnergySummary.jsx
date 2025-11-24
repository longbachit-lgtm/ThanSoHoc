export default function EnergySummary({ energyNumber, energyDescription, period, targetDate, personalNumbers }) {
  // Get period label
  const getPeriodLabel = () => {
    switch (period) {
      case 'today':
        return 'Hôm nay';
      case 'tomorrow':
        return 'Ngày mai';
      case 'week':
        if (targetDate) {
          const weekNumber = getWeekNumber(targetDate);
          return `Tuần ${weekNumber}`;
        }
        return 'Tuần này';
      case 'month':
        if (targetDate) {
          const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                             'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
          return monthNames[targetDate.getMonth()];
        }
        return 'Tháng này';
      case 'year':
        if (targetDate) {
          return `Năm ${targetDate.getFullYear()}`;
        }
        return 'Năm này';
      default:
        return 'Hôm nay';
    }
  };

  // Get calculation method based on period
  const getCalculationMethod = () => {
    if (!personalNumbers) return '';
    
    switch (period) {
      case 'today':
      case 'tomorrow':
        return `Năm cá nhân ${personalNumbers.personalYear} → Tháng cá nhân ${personalNumbers.personalMonth} → Ngày cá nhân ${personalNumbers.personalDay}`;
      case 'week':
        return `Năm cá nhân ${personalNumbers.personalYear} → Tuần cá nhân ${personalNumbers.personalWeek}`;
      case 'month':
        return `Năm cá nhân ${personalNumbers.personalYear} → Tháng cá nhân ${personalNumbers.personalMonth}`;
      case 'year':
        return `Năm cá nhân ${personalNumbers.personalYear}`;
      default:
        return `Năm cá nhân ${personalNumbers.personalYear} → Tháng cá nhân ${personalNumbers.personalMonth} → Ngày cá nhân ${personalNumbers.personalDay}`;
    }
  };

  // Helper function to calculate week number
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  return (
    <div 
      className="card border-0 shadow-sm mb-4"
      style={{
        backgroundColor: '#FCF8F0',
        borderRadius: '15px',
        border: '1px solid #E8C78C'
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span 
            className="fw-bold"
            style={{
              color: '#332211',
              fontSize: '16px'
            }}
          >
            {getPeriodLabel()}:
          </span>
          <span 
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#E8C78C',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            {energyNumber}
          </span>
        </div>
        
        <p 
          className="text-center mb-2 fw-bold"
          style={{
            color: '#A07A4A',
            fontSize: '16px'
          }}
        >
          {energyDescription}
        </p>
        
        <p 
          className="text-center mb-0"
          style={{
            color: '#6e645b',
            fontSize: '12px',
            fontStyle: 'italic',
            lineHeight: '1.5'
          }}
        >
          {getCalculationMethod()}
        </p>
      </div>
    </div>
  );
}


