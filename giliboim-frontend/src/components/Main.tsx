import React from "react";
import KakaoMap from "./KakaoMap";
import "../styles/common/Main.css";

const Main: React.FC = () => {
  return (
    <div className="main">
      {/* 지도 API를 배경으로 설정 */}
      <div className="map-container">
        <KakaoMap />
      </div>

      {/* 안심경로 검색 버튼 */}
      <div className="safe-path-container">
        <button className="safe-path-button">안심경로 검색버튼</button>
      </div>

      {/* 긴급 신고 버튼 */}
      <button className="emergency-button">긴급 신고 버튼</button>

      {/* 채팅하기 버튼 */}
      <button className="chat-button">채팅하기</button>
    </div>
  );
};

export default Main;
