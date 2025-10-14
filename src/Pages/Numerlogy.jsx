import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
import { FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
const Numerlogy = () => {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numberKarma]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      {!numberKarma ? (
        <div className="error_page flex flex-col items-center justify-center h-screen ">
          <div className=" text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-lg text-gray-700 mb-6">
              Vui lòng quay lại nhập <strong>Họ Tên</strong> &{" "}
              <strong>Ngày Tháng Năm Sinh</strong> để tiếp tục.
            </p>
            <NavLink
              to="/"
              className="px-6 py-3 btn btn-danger rounded-lg shadow hover:bg-blue-600 transition"
            >
              Quay lại trang chính
            </NavLink>
          </div>
        </div>
      ) : (
        <Fragment>
          <OverviewNumber />
          <DetailNumber />

          <button
            onClick={scrollToTop}
            className="scrollToTop"
            style={{
              display: showButton ? "block" : "none",
            }}
          >
            <FaChevronUp  />
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Numerlogy;
