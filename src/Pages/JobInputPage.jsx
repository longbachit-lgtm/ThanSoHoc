import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";
import {
  mergeNumberString,
  removeVietnameseTones,
  stringToNumber,
  soulAndExpress,
  numberAtLeastThreeTimes,
  checkArrow,
  lackArrow,
  fourTop,
} from "../service/numerlogy";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export default function JobInputPage() {
  const [mainField, setMainField] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNext = async () => {
    if (!mainField.trim()) {
      alert("Vui lòng nhập lĩnh vực chính!");
      return;
    }

    setLoading(true);

    try {
      // Lấy dữ liệu từ localStorage


      const fullName = localStorage.getItem('userFullName');
      const birthDateStr = localStorage.getItem('userBirthDate');

      if (!fullName || !birthDateStr) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        navigate("/name-input");
        return;
      }

      const birthDate = JSON.parse(birthDateStr);
      const { day, month, year } = birthDate;

      // Tính toán tất cả các số (giống FormInfor)
      const spaceRegex = /\s+/g;
      const birthString = day + "" + month + year;
      const main = mergeNumberString(birthString);
      const atitute = mergeNumberString(day + month + "", true);
      const day_birth = mergeNumberString(day + "");
      const top4 = fourTop(day, month, year);
      const arrow = checkArrow(birthString);
      const lack_arrow = lackArrow(birthString);

      // Tính toán từ họ tên
      const full_name_list = fullName.trim();
      const full_name = removeVietnameseTones(fullName.trim()).toUpperCase();
      const full_name_number = stringToNumber(full_name);
      const detinyNumber = mergeNumberString(full_name_number);
      const full_name_split = full_name.split(" ");
      const name = full_name_split[full_name_split.length - 1];
      const nameNumber = mergeNumberString(stringToNumber(name), true);
      const prename = full_name_split.slice(0, -1).join("");
      const { soul, express } = soulAndExpress([
        ...prename.split(spaceRegex),
        ...name.split(spaceRegex),
      ]);
      const list_number_name = stringToNumber(full_name)
        .split("")
        .filter((num) => num !== "0");
      const inner_number = numberAtLeastThreeTimes(list_number_name);
      const mature = mergeNumberString(main - 0 + (detinyNumber - 0) + "", true);
      const birthStringList = day + "/" + month + "/" + year;

      // Dispatch vào Redux
      dispatch(numberKarmaActions.setKamarNumeroMain(main));
      dispatch(numberKarmaActions.setKamarNumeroAtitute(atitute));
      dispatch(numberKarmaActions.setKamarNumeroDayBirth(day_birth));
      dispatch(numberKarmaActions.setBirthDayNumber(birthString));
      dispatch(numberKarmaActions.setBirthDayList(birthStringList));
      dispatch(numberKarmaActions.setTop4Peak(top4));
      dispatch(numberKarmaActions.setArrow(arrow));
      dispatch(numberKarmaActions.setLackArrow(lack_arrow));
      dispatch(numberKarmaActions.setStrongListNumb([]));
      dispatch(numberKarmaActions.setWeakListNumb([]));

      dispatch(numberNameActions.setNumberDestiny(detinyNumber));
      dispatch(numberNameActions.setNumberName(nameNumber));
      dispatch(numberNameActions.setNumberSoul(soul));
      dispatch(numberNameActions.setNumberInner(inner_number ? inner_number : ""));
      dispatch(numberNameActions.setNumberExpress(express));
      dispatch(numberNameActions.setNumberMature(mature));
      dispatch(numberNameActions.setFullNameNumber(full_name_number));
      dispatch(numberNameActions.setFullNameList(full_name_list));

      // Chuẩn bị data để lưu vào DB
      const numerologyDataToSave = {
        fullName: full_name_list,
        birthDate: new Date(year, month - 1, day).toISOString(),
        birthDayString: birthString,
        birthDayList: birthStringList,
        number: main,
        atitute: atitute,
        day_birth: day_birth,
        arrow: arrow,
        lack_arrow: lack_arrow,
        top4: top4,
        strong_list: [],
        weak_list: [],
        destiny: detinyNumber,
        name: nameNumber,
        inner: inner_number ? inner_number : "",
        express: express,
        soul: soul,
        mature: mature,
        full_name_number: full_name_number,
        full_name_list: full_name_list,
      };



      // Lưu vào DB nếu đã đăng nhập
      if (isAuthenticated()) {
        try {
          await api.numerology.save(numerologyDataToSave);
          console.log("✅ Đã lưu dữ liệu vào database thành công!");
        } catch (err) {
          console.error("❌ Lỗi khi lưu dữ liệu:", err);
        }
      }



      // Save job to localStorage (có thể lưu vào DB sau nếu cần)
      localStorage.setItem('userJob', JSON.stringify({
        mainField: mainField.trim(),
        role: role.trim()
      }));
      return
      // Navigate to /about
      // navigate("/about");



    } catch (error) {
      console.error("Error processing data:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext()
    }
  };

  const handleBack = () => {
    navigate("/gender-selection");
  };



  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"

    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none' }}>
        {/* Constellation patterns */}
        <div
          className="position-absolute"
          style={{
            top: '10%',
            left: '15%',
            width: '60px',
            height: '40px',
            background: 'linear-gradient(45deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.3
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: '20%',
            right: '20%',
            width: '80px',
            height: '50px',
            background: 'radial-gradient(circle, #E8C78C 2px, transparent 2px)',
            backgroundSize: '20px 20px',
            opacity: 0.2
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '25%',
            left: '10%',
            width: '100px',
            height: '60px',
            background: 'linear-gradient(135deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.25
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '15%',
            right: '15%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.3
          }}
        />
        {/* Individual stars */}
        <div
          className="position-absolute"
          style={{
            top: '30%',
            left: '25%',
            width: '4px',
            height: '4px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.4
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: '40%',
            right: '30%',
            width: '3px',
            height: '3px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.5
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '40%',
            left: '30%',
            width: '5px',
            height: '5px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.3
          }}
        />
        {/* Additional celestial objects */}
        <div
          className="position-absolute"
          style={{
            top: '15%',
            right: '10%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.2
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: '25%',
            left: '5%',
            width: '30px',
            height: '30px',
            background: 'linear-gradient(45deg, #E8C78C 0%, transparent 50%)',
            borderRadius: '50%',
            opacity: 0.3
          }}
        />
      </div>

      {/* Main container */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            {/* Progress Dots */}
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#B8860B'
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle border"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderColor: '#B8860B',
                    borderWidth: '2px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Job Input Card */}
            <div
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: '#FCF8F0',
                borderRadius: '20px',
                border: '1px solid #E8C78C'
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2
                  className="text-center fw-bold mb-4"
                  style={{
                    color: '#A07A4A',
                    fontSize: '1.8rem',
                    letterSpacing: '1px'
                  }}
                >
                  Công việc
                </h2>

                {/* Quote */}
                <div className="text-center mb-4">
                  <p
                    className="fst-italic mb-0"
                    style={{
                      color: '#332211',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}
                  >
                    Công việc không chỉ là bạn làm gì – mà là bạn gửi năng lượng gì ra thế giới này.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="mb-4">
                  <label
                    className="form-label fw-bold mb-2"
                    style={{
                      color: '#A07A4A',
                      fontSize: '16px'
                    }}
                  >
                    Lĩnh vực chính
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nhập lĩnh vực công việc của bạn"
                    value={mainField}
                    onChange={(e) => setMainField(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #E8C78C',
                      backgroundColor: '#fff',
                      padding: '12px 16px',
                      fontSize: '15px',
                      color: '#332211'
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-label fw-bold mb-2"
                    style={{
                      color: '#A07A4A',
                      fontSize: '16px'
                    }}
                  >
                    Vai trò (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nhập vai trò/chức vụ của bạn"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #E8C78C',
                      backgroundColor: '#fff',
                      padding: '12px 16px',
                      fontSize: '15px',
                      color: '#332211'
                    }}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn border-0 rounded-pill"
                    style={{
                      backgroundColor: '#d6c0a1',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderLeft: '3px solid white',
                        borderBottom: '3px solid white',
                        transform: 'rotate(45deg)'
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn border-0 rounded-pill"
                    disabled={loading}
                    style={{
                      backgroundColor: loading ? '#d6c0a1' : '#A07A4A',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRight: '3px solid white',
                          borderBottom: '3px solid white',
                          transform: 'rotate(-45deg)'
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="text-center mt-4">
              <h1
                className="display-4 fw-bold mb-0"
                style={{
                  fontFamily: "'Charm', cursive",
                  color: '#332211',
                  fontSize: '2.5rem',
                  position: 'relative'
                }}
              >
                Cham.
                <span
                  className="position-absolute"
                  style={{
                    top: '-5px',
                    right: '-15px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#E8C78C',
                    borderRadius: '50%'
                  }}
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
