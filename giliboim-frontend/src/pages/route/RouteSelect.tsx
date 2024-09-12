import KakaoMap from "./../../components/KakaoMap";
import "../../styles/common/Main.css";
import "../../styles/route/route-main.css";
import "../../styles/route/route-select.css";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/customAxiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resetCource, setDeparture, setDestination } from "../../features/courcePointSlice";
import SelectMap from "./map/SelectMap";
import { onGuided } from "../../features/isGuidedSlice";

const RouteSelect: React.FC = () => {

  const location = useLocation();
  const { departure, destination } = location.state;

  const navi = useNavigate();

  // 출발지와 목적지의 좌표는 전역으로 관리되도록 한다.
  const dispatch = useDispatch();

  // 출발지와 목적지의 소요 시간, 거리 
  const guideInfo = useSelector((state: RootState) => state.guideInfo);

  useEffect(() => {

    dispatch(resetCource());
    // 출발지 
    api.get("http://localhost:8085/api/route/searchPointByAddress", 
      {params: { address: departure }}
    ).then((res) => {
      const { x, y } = res.data.response.result.point;
      console.log("출발지 : ", x, y);
      dispatch(setDeparture({ lat: y, lng: x })); 

    }).catch((err) => {
      console.log(err);
    })

    // 목적지
    api.get("http://localhost:8085/api/route/searchPointByAddress", 
      {params: { address: destination }}
    ).then((res) => {
      const { x, y } = res.data.response.result.point;
      console.log("목적지 : ", x, y);
      dispatch(setDestination({ lat: y, lng: x }));   
    }).catch((err) => {
      console.log(err);
    })

  }, [departure, destination]);

  const routeSelect = () => {
    alert("경로를 안내하겠습니다.");
    dispatch(onGuided());
    navi("/main");
  }

  return (
    <>
    <Header/>
    <div className="main">
      <div className="map-container">
        <SelectMap/>
        <div className="route-bar">
          <div className="route-box-container">
            <div className="route-box">
              <div className="route-info">
                <div className="route-name">추천 경로</div>
                <div className="route-details">
                    <span className="route-time">{guideInfo.time}분</span>
                    <span className="route-distance">{guideInfo.distance}km</span>
                </div>
              </div>
              <button className="start-button" onClick={routeSelect}>안내시작</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    <Footer/>  
    </>
  );
};

export default RouteSelect;
