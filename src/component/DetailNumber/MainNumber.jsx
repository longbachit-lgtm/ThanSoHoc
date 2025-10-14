import { Fragment } from "react";
import { Divider, List } from "antd";
import sochudao from "../../assets/img/1.png";
import {
  NUMEROLOGY_KARMA,
  NUMERLOGY_COMMON,
  ARROW,
} from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowRightOutlined } from "@ant-design/icons";
function MainNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);
  const HumanNumerology = NUMERLOGY_COMMON.DUONG_DOI[numberKarma];
  const { BAI_HOC, MOI_TRUONG } = NUMEROLOGY_KARMA[numberKarma];
  return (
    <div id="main_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          1{") "} Con số chủ đạo của bạn là:
          <span className="text-danger"> {numberKarma}</span>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={sochudao} />
        </div>
        <div className="container  fs-6" style={{ textAlign: "justify" }}>
          <div className="row">
            <div className="col-md-6 mt-4 col-sm-12">
              <List
                className="h-100"
                header={<div className="fw-bold text-success">BÀI HỌC</div>}
                bordered
                dataSource={BAI_HOC.split("\n")}
                renderItem={(item) => (
                  <List.Item>
                    <ArrowRightOutlined className="text-primary px-2 me-3" />
                    <span
                      className="me-auto fw-bold"
                      style={{ fontSize: "15px" }}
                    >
                      {item}
                    </span>
                  </List.Item>
                )}
              />
            </div>
            <div className="col-md-6 mt-4 col-sm-12">
              <List
                className="h-100"
                header={<div className="fw-bold text-danger">MÔI TRƯỜNG</div>}
                bordered
                dataSource={MOI_TRUONG.split("\n")}
                renderItem={(item) => (
                  <List.Item>
                    <ArrowRightOutlined className="text-primary px-2 me-3" />
                    <span
                      className="me-auto fw-bold"
                      style={{ fontSize: "15px" }}
                    >
                      {item}
                    </span>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>

        <Divider />

        <div className="container fs-6" style={{ textAlign: "justify" }}>
          <div className="row head-main">
            <h3 className="fw-bold mb-3 ">✨ Tính chất chung:</h3>
            <div>{HumanNumerology.CHUNG}</div>
          </div>
          <div className="row mt-3 head-main">
            <h3 className="fw-bold mb-3 ">🎯 Mục đích sống:</h3>
            <div>{HumanNumerology.MUC_DICH}</div>
          </div>
          <div className="row head-main">
            <h3 className=" fw-bold mb-3 ">🌟 Đặc điểm:</h3>
            <div>{HumanNumerology.DAC_DIEM}</div>
          </div>
          <div className="row head-main">
            <h3 className=" fw-bold mb-3 ">🌱 Điều kiện phát triển:</h3>
            <div>{HumanNumerology.DKPT}</div>
          </div>
          <div className="row head-main">
            <h3 className=" fw-bold mb-3 ">🚀 Hướng phát triển:</h3>
            <div>{HumanNumerology.KHAC_PHUC}</div>
          </div>
          <div className="row head-main">
            <h3 className=" fw-bold mb-3 ">🛠 Khuynh hướng cần khắc phục:</h3>
            <div>{HumanNumerology.HUONG_PT}</div>
          </div>
          <div
            className="row head-main"
            style={{ marginBottom: "0px !important" }}
          >
            <h3 className=" fw-bold mb-3 ">💼 Nghề nghiệp:</h3>
            <div>{HumanNumerology.NGHE_NGHIEP}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNumber;
