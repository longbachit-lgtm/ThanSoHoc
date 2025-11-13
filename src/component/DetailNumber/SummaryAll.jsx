import { useMemo } from "react";
import { useSelector } from "react-redux";
import tomtat from "../../assets/img/tomtat.png";
import {
  STRONG_NUMB,
  WEAK_NUMB,
  ARROW,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_SOUL_NUMBER,
  NUMERLOGY_COMMON,
  NUMERLOGY_JOB,
  SOLUTION_NUMB,
} from "../../Data/numerology";
import parse from "html-react-parser";
import "./SummaryAll.css";

function SummaryAll() {
  const strongNumb = useSelector((state) => state.numberKarmaMain.strong_list);
  const weakNumb = useSelector((state) => state.numberKarmaMain.weak_list);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);

  const newStrongNumb = useMemo(() => {
    return strongNumb
      .map((numb) => (STRONG_NUMB[numb] ? STRONG_NUMB[numb] : null))
      .reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});
  }, [strongNumb]);

  const groups = useMemo(() => {
    const keys = Object.keys(newStrongNumb);
    const totalItems = keys.length;
    const groupCount = 3;
    const baseSize = Math.floor(totalItems / groupCount);
    const remainder = totalItems % groupCount;

    const result = [];
    let start = 0;

    for (let i = 0; i < groupCount; i++) {
      const size = baseSize + (i < remainder ? 1 : 0);
      result.push(keys.slice(start, start + size));
      start += size;
    }
    return result;
  }, [newStrongNumb]);

  if (!strongNumb || strongNumb.length === 0) {
    return (
      <div id="summary_all" className="summary-all">
        <div className="summary-all__container">
          <div className="summary-all__empty">
            <div className="summary-all__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu tóm tắt</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống tạo bản tóm tắt về bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="summary_all" className="summary-all">
      <div className="summary-all__container">
        <div className="summary-all__header">
          <h1 className="summary-all__title">
            <span className="summary-all__title-career">
              Xu hướng nghề nghiệp
            </span>{" "}
            và <span className="summary-all__title-summary">Tóm tắt</span> về
            bạn
          </h1>
          <div className="summary-all__image-wrapper">
            <img
              className="summary-all__image"
              src={tomtat}
              alt="Tóm tắt về bạn"
            />
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title">💪 ĐIỂM MẠNH CỦA BẠN</h4>
          <p className="summary-all__section-subtitle">
            Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn
          </p>
          <div className="summary-all__content">
            {groups.map((group, index) => (
              <div key={index}>
                {group.map((key, subIndex) => (
                  <div key={subIndex}>{parse(newStrongNumb[key])}</div>
                ))}
                {index < groups.length - 1 && (
                  <div className="summary-all__groups-divider" />
                )}
              </div>
            ))}
            {arrow.length > 0 &&
              arrow.map((arr, iAr) => (
                <div key={`arrow${iAr}`}>
                  {ARROW[arr]?.[1]?.KET_LUAN &&
                    parse(ARROW[arr][1].KET_LUAN)}
                </div>
              ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title">⚠️ ĐIỂM YẾU CỦA BẠN</h4>
          <p className="summary-all__section-subtitle summary-all__section-subtitle-primary">
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div key={index} className="summary-all__solution-item">
                {WEAK_NUMB[numb]?.noidung && parse(WEAK_NUMB[numb].noidung)}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title">🎯 ĐỘNG LỰC THỎA MÃN</h4>
          <p className="summary-all__section-subtitle">
            Là khao khát nội tâm, mong muốn, sứ mệnh
          </p>
          <div className="summary-all__content">
            {NUMEROLOGY_LIFE_PATH[numberDestiny]?.tomtat && (
              <div>{parse(NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat)}</div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberSoul]?.tomtat && (
              <div>{parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat)}</div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberKarma]?.tomtat && (
              <div>{parse(NUMEROLOGY_SOUL_NUMBER[numberKarma].tomtat)}</div>
            )}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title">💼 XU HƯỚNG NGHỀ NGHIỆP</h4>
          <p className="summary-all__section-subtitle">
            Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong
            bộ số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn
            cần xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và
            lợi thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính,
            nơi ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất.
          </p>
          <div className="summary-all__career-grid">
            {strongNumb.map((numb, index) =>
              NUMERLOGY_JOB[numb]?.noidung ? (
                <div key={index} className="summary-all__career-item">
                  {parse(NUMERLOGY_JOB[numb].noidung)}
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title">
            🛠️ LỜI KHUYÊN VÀ CÁCH PHÁT TRIỂN
          </h4>
          <p className="summary-all__section-subtitle">
            Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn
          </p>
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div key={index} className="summary-all__solution-item">
                {SOLUTION_NUMB[numb]?.noidung &&
                  parse(SOLUTION_NUMB[numb].noidung)}
              </div>
            ))}
          </div>

          <div className="summary-all__note-box">
            <strong>🚫 LƯU Ý: </strong> Những nghề nêu trên không phải bạn
            không làm được mà bạn cần phải nỗ lực nhiều hơn để bù đắp
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;
