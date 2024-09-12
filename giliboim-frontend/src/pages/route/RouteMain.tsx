import React, { useEffect, useState } from "react";
import KakaoMap from "../../components/KakaoMap";
import "../../styles/common/Main.css";
import "../../styles/route/route-main.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainMap from "./map/MainMap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { offGuided } from "../../features/isGuidedSlice";

const RouteMain: React.FC = () => {

  // 경로를 안내받고 있을때의 상태값 - 전역으로 관리하고 있음 
  const isGuided = useSelector((state: RootState) => state.isGuided);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const dispatch = useDispatch(); 

  const handleClosePopup = () => {
    setIsPopupVisible(false); // 팝업 닫기
  };

  const stopGuide = () => {
    alert("경로 안내를 종료합니다.")
    setIsPopupVisible(false); // 팝업 닫기
    dispatch(offGuided());
  }


  return (
    <>
      <Header />
      <div className="main">
        {/* 지도 API를 배경으로 설정 */}
        <div className="map-container">
          <MainMap />
        </div>

        {/* 안심경로 검색 버튼 */}
        <div className="safe-path-container">
          {isGuided? (
            <button
              className="safe-path-button"
              onClick={() => setIsPopupVisible(!isPopupVisible)}
            >
              안심경로 안내취소
            </button>
          ) : (
            <Link to="/route/search" className="safe-path-button">
              안심경로 검색버튼
            </Link>
          )}
        </div>
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="route-popup">
              <p>안내를 종료하겠습니까?</p>
              <button className="route-popup-button" onClick={stopGuide}>
                확인
              </button>
              <button className="route-cancel-button " onClick={handleClosePopup}>
                취소
              </button>
            </div>
          </div>
        )}

        {/* 긴급 신고 버튼 */}
        <button className="emergency-button">긴급 신고 버튼</button>

      {/* 채팅하기 버튼 */}
      <Link className="chat-button" to="/Chat/ChatList">채팅하기</Link>
    </div>
    <Footer/>
    </>
  );
};

export default RouteMain;
