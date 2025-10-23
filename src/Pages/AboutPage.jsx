import { useNavigate } from "react-router-dom";
import { FaHeart, FaCaretDown } from "react-icons/fa";

export default function AboutPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/detail-number");
  };

  return (
    <div 
      className="min-vh-100 p-4"
   
    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none' }}>
        {/* Constellation patterns */}
        <div 
          className="position-absolute"
          style={{
            top: '5%',
            left: '10%',
            width: '80px',
            height: '50px',
            background: 'linear-gradient(45deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.2
          }}
        />
        <div 
          className="position-absolute"
          style={{
            top: '15%',
            right: '15%',
            width: '60px',
            height: '40px',
            background: 'radial-gradient(circle, #E8C78C 2px, transparent 2px)',
            backgroundSize: '15px 15px',
            opacity: 0.15
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '20%',
            left: '5%',
            width: '120px',
            height: '80px',
            background: 'linear-gradient(135deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.2
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '10%',
            right: '10%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.25
          }}
        />
        {/* Individual stars */}
        <div 
          className="position-absolute"
          style={{
            top: '25%',
            left: '20%',
            width: '3px',
            height: '3px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.3
          }}
        />
        <div 
          className="position-absolute"
          style={{
            top: '35%',
            right: '25%',
            width: '2px',
            height: '2px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.4
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '35%',
            left: '25%',
            width: '4px',
            height: '4px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.3
          }}
        />
        {/* Crystal ball */}
        <div 
          className="position-absolute"
          style={{
            top: '8%',
            right: '8%',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.2
          }}
        />
        <div 
          className="position-absolute"
          style={{
            top: '12%',
            right: '12%',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #E8C78C 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            opacity: 0.15
          }}
        />
      </div>

      {/* Main container */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 
                className="display-3 fw-bold mb-0"
                style={{
                  fontFamily: "'Charm', cursive",
                  color: '#332211',
                  fontSize: '3.5rem',
                  position: 'relative'
                }}
              >
                Chạm.
                <FaHeart 
                  className="position-absolute"
                  style={{
                    top: '-10px',
                    right: '-20px',
                    fontSize: '24px',
                    color: '#332211'
                  }}
                />
              </h1>
            </div>

            {/* Content Sections */}
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-9">
                {/* Introductory Quote */}
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
                    backgroundColor: '#FCF8F0',
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <p 
                      className="mb-0 text-center"
                      style={{
                        color: '#332211',
                        fontSize: '16px',
                        lineHeight: '1.6'
                      }}
                    >
                      "CHẠM được sinh ra từ mong muốn giúp con người kết nối lại với chính mình – thông qua những con số, cảm xúc và khoảnh khắc nhỏ bé mỗi ngày. Với CHẠM, Thần số học không còn là những con số khô khan, mà là hành trình dịu dàng để hiểu – cảm – sống sâu hơn."
                    </p>
                  </div>
                </div>

                {/* CHẠM - Vì sao được tạo ra */}
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
                   
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 
                      className="fw-bold mb-3"
                      style={{
                        color: '#332211',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaCaretDown style={{ color: '#A07A4A', fontSize: '16px' }} />
                      CHẠM - Vì sao được tạo ra
                    </h3>
                    <p 
                      className="mb-0"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      Mọi người đều đang tìm cách hiểu mình, nhưng ít ai có không gian để lắng nghe thật sự. CHẠM ra đời để trở thành nơi mỗi người có thể dừng lại, hít thở, và nhận ra: mình đủ, và mình đang đi đúng hướng.
                    </p>
                  </div>
                </div>

                {/* CHẠM - Ý nghĩa của cái tên */}
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
             
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 
                      className="fw-bold mb-3"
                      style={{
                        color: '#332211',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaCaretDown style={{ color: '#A07A4A', fontSize: '16px' }} />
                      CHẠM - Ý nghĩa của cái tên
                    </h3>
                    <p 
                      className="mb-0"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      "CHẠM" là hành động nhỏ nhưng chứa cả thế giới. Một cái chạm có thể mở ra nụ cười, một ký ức, hay một sự thức tỉnh. Mỗi lần bạn chạm vào con số, chính là lúc bạn đang chạm vào phần sâu nhất của linh hồn mình.
                    </p>
                  </div>
                </div>

                {/* CHẠM - Triết lý thương hiệu */}
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
           
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 
                      className="fw-bold mb-3"
                      style={{
                        color: '#332211',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaCaretDown style={{ color: '#A07A4A', fontSize: '16px' }} />
                      CHẠM - Triết lý thương hiệu
                    </h3>
                    <p 
                      className="fw-bold mb-2"
                      style={{
                        color: '#A07A4A',
                        fontSize: '16px'
                      }}
                    >
                      Hiểu - Cảm - Sống.
                    </p>
                    <ul 
                      className="mb-0 ps-3"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      <li>Hiểu chính mình qua những con số.</li>
                      <li>Cảm được thông điệp và năng lượng của ngày, tháng, năm.</li>
                      <li>Sống thật, theo nhịp tự nhiên của bản thân.</li>
                    </ul>
                  </div>
                </div>

                {/* CHẠM - Cách CHẠM hoạt động */}
                <div 
                  className="card border-0 shadow-sm mb-4"
                  style={{
         
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 
                      className="fw-bold mb-3"
                      style={{
                        color: '#332211',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaCaretDown style={{ color: '#A07A4A', fontSize: '16px' }} />
                      CHẠM - Cách CHẠM hoạt động
                    </h3>
                    <p 
                      className="mb-2"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      CHẠM dùng Thần số học như chiếc la bàn tinh thần:
                    </p>
                    <ul 
                      className="mb-0 ps-3"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      <li>Mỗi ngày, bạn nhận được năng lượng riêng (theo ngày, tháng, năm cá nhân).</li>
                      <li>Những câu gợi ý nhẹ nhàng giúp bạn điều chỉnh cảm xúc và hành động.</li>
                      <li>Các con số được tính toán tự động, nhưng diễn giải bằng ngôn ngữ của trái tim.</li>
                    </ul>
                  </div>
                </div>

                {/* CHẠM – Sứ mệnh và tầm nhìn */}
                <div 
                  className="card border-0 shadow-sm mb-5"
                  style={{
            
                    borderRadius: '15px',
                    border: '1px solid #E8C78C'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 
                      className="fw-bold mb-3"
                      style={{
                        color: '#332211',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaCaretDown style={{ color: '#A07A4A', fontSize: '16px' }} />
                      CHẠM – Sứ mệnh và tầm nhìn
                    </h3>
                    <p 
                      className="mb-0"
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                    >
                      CHẠM không chỉ là ứng dụng hay website xem Thần số học, mà là một hành trình chữa lành tập thể. Chúng tôi tin rằng khi mỗi người hiểu mình hơn, thế giới sẽ nhẹ nhàng hơn. Sứ mệnh: lan tỏa thói quen "chạm vào bản thân mỗi ngày" – qua con số, qua cảm xúc, qua sự tĩnh lặng. Tầm nhìn: trở thành thương hiệu tinh thần Việt giúp con người sống sâu, sống tỉnh thức và đầy yêu thương.
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="text-center">
                  <button
                    onClick={handleContinue}
                    className="btn border-0 rounded-pill px-5 py-3"
                    style={{
                      backgroundColor: '#A07A4A',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(160, 122, 74, 0.3)'
                    }}
                  >
                    Tiếp tục hành trình
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
