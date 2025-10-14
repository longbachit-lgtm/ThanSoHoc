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
import { Fragment } from "react";

function SummaryAll() {
  const strongNumb = useSelector((state) => state.numberKarmaMain.strong_list);

  const newStrongNumb = strongNumb
    .map((numb, index) => (STRONG_NUMB[numb] ? STRONG_NUMB[numb] : null))
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});

  const weakNumb = useSelector((state) => state.numberKarmaMain.weak_list);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);

  // DEM DE NHOM DONG

  const keys = Object.keys(newStrongNumb);
  const totalItems = keys.length;

  // ✅ Chia làm 3 nhóm gần bằng nhau
  const groupCount = 3;
  const baseSize = Math.floor(totalItems / groupCount);
  const remainder = totalItems % groupCount;

  const groups = [];
  let start = 0;

  for (let i = 0; i < groupCount; i++) {
    const size = baseSize + (i < remainder ? 1 : 0); // thêm 1 cho các nhóm đầu nếu dư
    groups.push(keys.slice(start, start + size));
    start += size;
  }

  return (
    <div id="summary_all">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          <b className="text-info"> &nbsp; &nbsp;Xu hướng nghề nghiệp </b> và{" "}
          <b className="text-danger"> Tóm tắt </b>về bạn{" "}
        </h1>
        <img className=" my-1 w-100" style={{ scale: 1 }} src={tomtat} />

        <div className="m-3  px-3 py-4    border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐIỂM MẠNH CỦA BẠN</h4>
          <p class="text-danger mb-5">
            Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn
          </p>
          {groups.map((group, index) => (
            <div key={index}>
              {group.map((key, subIndex) => (
                <Fragment key={subIndex}>{parse(newStrongNumb[key])}</Fragment>
              ))}
              {index < groups.length - 1 && <div className="mt-5" />}{" "}
              {/* cách dòng giữa các nhóm */}
            </div>
          ))}
          {arrow.length > 0 &&
            arrow.map((arr, iAr) => {
              return (
                <Fragment key={`emp${iAr}`}>
                  {parse(ARROW[arr][1].KET_LUAN)}
                </Fragment>
              );
            })}
        </div>

        <div className="m-3  px-3 py-4   border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐIỂM YẾU CỦA BẠN</h4>
          <p class="text-primary">
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div>
            {weakNumb.map((numb, index) => {
              return (
                <div className="mt-5" key={index}>
                  {WEAK_NUMB[numb] && WEAK_NUMB[numb].noidung
                    ? parse(WEAK_NUMB[numb].noidung)
                    : null}
                </div>
              );
            })}
          </div>
          {/* <div className="">
            {lack_arrow.length > 0 &&
              lack_arrow.map((arr, iAr) => {
                return (
                  <Fragment key={`emp${iAr}`}>
                    {parse(ARROW[arr][0].KET_LUAN)}
                  </Fragment>
                );
              })}
          </div> */}
        </div>

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐỘNG LỰC THỎA MÃN</h4>
          <p class="text-danger">Là khao khát nội tâm, mong muốn, sứ mệnh</p>
          <p>
            {NUMEROLOGY_LIFE_PATH[numberDestiny] &&
            NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat
              ? parse(NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat)
              : ""}
          </p>
          <p>
            {NUMEROLOGY_SOUL_NUMBER[numberSoul] &&
            NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat
              ? parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat)
              : ""}
          </p>
          <p>
            {NUMEROLOGY_SOUL_NUMBER[numberKarma] &&
            NUMEROLOGY_SOUL_NUMBER[numberKarma]
              ? parse(NUMEROLOGY_SOUL_NUMBER[numberKarma].tomtat)
              : ""}
          </p>
        </div>
        <div className="m-3  p-3 career-container border border-dark-subtle rounded  ">
          <h4 className="  mt-3 px-2 ">XU HƯỚNG NGHỀ NGHIỆP</h4>
          <p class="text-danger">
            Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong bộ
            số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn cần
            xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và lợi
            thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính, nơi
            ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất.
          </p>

          <div class="career-grid">
            {strongNumb.map((numb, index) =>
              NUMERLOGY_JOB[numb] && NUMERLOGY_JOB[numb].noidung ? (
                <div className="mt-4" key={index}>
                  {parse(NUMERLOGY_JOB[numb].noidung)}
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="m-3  p-3  conclude  border border-dark-subtle rounded  ">
          <h4 className="  mt-3 px-2 title"> LỜI KHUYÊN VÀ CÁCH PHÁT TRIỂN</h4>
          <p class="text-danger">
            Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn
          </p>
          <div>
            {weakNumb.map((numb, index) => {
              return (
                <div
                  className={`mt-5 section ${index % 2 === 0 ? "even" : "odd"}`}
                  key={index}
                >
                  {SOLUTION_NUMB[numb] && SOLUTION_NUMB[numb].noidung
                    ? parse(SOLUTION_NUMB[numb].noidung)
                    : null}
                </div>
              );
            })}
          </div>

          <div class="note-box row">
          
            <div className=" ">
              <strong>🚫 LƯU Ý: </strong> Những nghề nêu trên không phải bạn
              không làm được mà bạn cần phải nỗ lực nhiều hơn để bù đắp{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;
