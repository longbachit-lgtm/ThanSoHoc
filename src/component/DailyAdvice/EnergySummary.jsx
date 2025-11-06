export default function EnergySummary({ energyNumber, energyDescription, calculationMethod }) {
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
            Hôm nay:
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
            fontStyle: 'italic'
          }}
        >
          {calculationMethod}
        </p>
      </div>
    </div>
  );
}


