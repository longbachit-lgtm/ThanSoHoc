import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
import { FaChevronUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

const Numerlogy = () => {
  const dispatch = useDispatch();
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Load dữ liệu từ DB khi component mount và user đã đăng nhập
  useEffect(() => {
    const loadDataFromDB = async () => {
      // Chỉ load nếu user đã đăng nhập và chưa có dữ liệu trong Redux
      if (isAuthenticated() && !numberKarma) {
        setLoading(true);
        try {
          const response = await api.numerology.getMyData();
          
          if (response.data) {
            const data = response.data;
            
            // Dispatch dữ liệu vào Redux store
            // Number Karma
            dispatch(numberKarmaActions.setKamarNumeroMain(data.number || 0));
            dispatch(numberKarmaActions.setKamarNumeroAtitute(data.atitute || 0));
            dispatch(numberKarmaActions.setKamarNumeroDayBirth(data.day_birth || 0));
            dispatch(numberKarmaActions.setBirthDayNumber(data.birthDayString || ""));
            dispatch(numberKarmaActions.setBirthDayList(data.birthDayList || ""));
            dispatch(numberKarmaActions.setArrow(data.arrow || []));
            dispatch(numberKarmaActions.setLackArrow(data.lack_arrow || []));
            dispatch(numberKarmaActions.setTop4Peak(data.top4 || {}));
            dispatch(numberKarmaActions.setStrongListNumb(data.strong_list || []));
            dispatch(numberKarmaActions.setWeakListNumb(data.weak_list || []));
            
            // Number Name
            dispatch(numberNameActions.setNumberDestiny(data.destiny || 0));
            dispatch(numberNameActions.setNumberName(data.name || 0));
            dispatch(numberNameActions.setNumberSoul(data.soul || 0));
            dispatch(numberNameActions.setNumberInner(data.inner || "0"));
            dispatch(numberNameActions.setNumberExpress(data.express || 0));
            dispatch(numberNameActions.setNumberMature(data.mature || 0));
            dispatch(numberNameActions.setFullNameNumber(data.full_name_number || ""));
            dispatch(numberNameActions.setFullNameList(data.full_name_list || ""));
          }
        } catch (err) {
          console.error("Lỗi khi load dữ liệu từ DB:", err);
          // Không hiển thị lỗi, để user có thể nhập mới
        } finally {
          setLoading(false);
        }
      }
    };

    loadDataFromDB();
  }, [isAuthenticated, numberKarma, dispatch]);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner-border text-primary mb-4" role="status" style={{
            width: '3rem',
            height: '3rem',
            borderWidth: '0.3em'
          }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-lg text-gray-700">Đang tải dữ liệu từ server...</p>
        </div>
      </div>
    );
  }

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
