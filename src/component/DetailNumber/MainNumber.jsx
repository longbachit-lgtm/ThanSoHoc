import sochudao from "../../assets/img/1.png";
import {
  NUMEROLOGY_KARMA,
  NUMERLOGY_COMMON,
} from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import "./MainNumber.css";

const buildListFromText = (text) =>
  text
    ?.split("\n")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

function MainNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);

  const karmaData = useMemo(() => {
    if (!numberKarma) {
      return undefined;
    }
    return NUMEROLOGY_KARMA[numberKarma];
  }, [numberKarma]);

  const humanNumerology = useMemo(() => {
    if (!numberKarma) {
      return undefined;
    }
    return NUMERLOGY_COMMON?.DUONG_DOI?.[numberKarma];
  }, [numberKarma]);

  if (!numberKarma || !karmaData || !humanNumerology) {
    return (
      <div id="main_number" className="main-number">
        <div className="main-number__container">
          <div className="main-number__empty">
            <div className="main-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu số chủ đạo</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số chủ
              đạo của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { BAI_HOC = "", MOI_TRUONG = "" } = karmaData;

  const lessonItems = buildListFromText(BAI_HOC);
  const environmentItems = buildListFromText(MOI_TRUONG);

  const sections = [
    {
      id: "common_traits",
      title: "✨ Tính chất chung",
      content: humanNumerology.CHUNG,
    },
    {
      id: "life_purpose",
      title: "🎯 Mục đích sống",
      content: humanNumerology.MUC_DICH,
    },
    {
      id: "characteristics",
      title: "🌟 Đặc điểm nổi bật",
      content: humanNumerology.DAC_DIEM,
    },
    {
      id: "growth_conditions",
      title: "🌱 Điều kiện phát triển",
      content: humanNumerology.DKPT,
    },
    {
      id: "growth_direction",
      title: "🚀 Hướng phát triển",
      content: humanNumerology.KHAC_PHUC,
    },
    {
      id: "improvement",
      title: "🛠 Khuynh hướng cần khắc phục",
      content: humanNumerology.HUONG_PT,
    },
    {
      id: "career",
      title: "💼 Nghề nghiệp phù hợp",
      content: humanNumerology.NGHE_NGHIEP,
    },
  ];

  const heroSubtitle =
    humanNumerology.CHUNG?.split(".")?.[0]?.trim() ||
    "Khám phá hành trình cuộc đời qua con số chủ đạo của bạn.";

  return (
    <div id="main_number" className="main-number">
      <div className="main-number__container">
        <section
          className="main-number__hero"
          style={{ backgroundImage: `url(${sochudao})` }}
        >
          <div className="main-number__hero-overlay" />
          <div className="main-number__hero-content">
            <div className="main-number__badge">Con số chủ đạo</div>
            <div className="main-number__value-wrapper">
              <span className="main-number__value">{numberKarma}</span>
              <span className="main-number__value-shadow">{numberKarma}</span>
            </div>
            <p className="main-number__subtitle">{heroSubtitle}</p>
            <div className="main-number__stats">
              <div className="main-number__stat">
                <span className="main-number__stat-label">Mũi tên mạnh</span>
                <span className="main-number__stat-value">
                  {arrow?.length ? arrow.length : 0}
                </span>
              </div>
              <div className="main-number__stat">
                <span className="main-number__stat-label">Mũi tên thiếu</span>
                <span className="main-number__stat-value">
                  {lack_arrow?.length ? lack_arrow.length : 0}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="main-number__cards">
          <div className="main-number__card">
            <h4>Bài học quan trọng</h4>
            <ul className="main-number__list">
              {lessonItems.length > 0 ? (
                lessonItems.map((item, index) => (
                  <li key={`lesson-${index}`}>
                    <ArrowRightOutlined />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="main-number__list-empty">
                  Chưa có dữ liệu bài học.
                </li>
              )}
            </ul>
          </div>
          <div className="main-number__card">
            <h4>Môi trường phù hợp</h4>
            <ul className="main-number__list">
              {environmentItems.length > 0 ? (
                environmentItems.map((item, index) => (
                  <li key={`environment-${index}`}>
                    <ArrowRightOutlined />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="main-number__list-empty">
                  Chưa có dữ liệu môi trường.
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className="main-number__details">
          {sections.map((section) => (
            <div className="main-number__detail-card" key={section.id}>
              <h5>{section.title}</h5>
              <div className="main-number__detail-content">
                {section.content ? parse(section.content) : "Đang cập nhật..."}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default MainNumber;
