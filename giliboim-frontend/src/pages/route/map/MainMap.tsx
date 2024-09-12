import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { setPosition } from "../../../features/positionSlice";
import {
  getCurrentPosition,
  useWatchPosition,
} from "../../../features/KakaoMap";
import { Map, MapMarker, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import runningMarker from "../../../assets/images/running-marker.png";
import departureMarker from "../../../assets/images/departure-marker.png";
import destinationMarker from "../../../assets/images/destination-merker.png";
import getCctvAdress from "../../../data/CCTVAdress";
import cctvIcon from "../../../assets/images/cctv-icon.png"

interface item {
  point_wkt: string;
}

interface cctvInfo {
  lat: number;
  lng: number;
}

// 메인 화면에 표시될 지도
const MainMap = () => {
  // 전역으로 관리하는 경로 상태
  const guidePoint = useSelector((state: RootState) => state.guidePoint);
  const isGuided = useSelector((state: RootState) => state.isGuided);
  const cource = useSelector((state: RootState) => state.cource);

  // 전역으로 관리될 사용자의 위치
  const position = useSelector((state: RootState) => state.position);
  const dispatch = useDispatch();

  const [zoomLevel, setZoomLevel] = useState(3);
  const [cctv, setCctv] = useState<cctvInfo[] | null>(null);
  const [positions, setPositions] = useState<item[]>([]); // 상태로 관리
  const [loging, setLoging] = useState(false);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const currentPosition = await getCurrentPosition();
        console.log(currentPosition);
        dispatch(setPosition(currentPosition));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosition();

    const fetchedPositions: item[] = JSON.parse(getCctvAdress());
    setPositions(fetchedPositions);
  }, [position]);

  // CCTV 데이터 준비하기
  useEffect(() => {
    console.log(cctv);
    if (zoomLevel <= 4) {
      if (cctv != null) return;
      console.log("cctv데이터 추가");
      if (positions.length > 0) {
        const cctvPositions = positions.map((position) => {
          const cctvWhere = position.point_wkt.split(" ");
          return {
            lat: parseFloat(cctvWhere[1]),
            lng: parseFloat(cctvWhere[0]),
          };
        });
        setCctv(cctvPositions);
      } else {
        setCctv(null);
      }
    } else {
      console.log("cctv데이터 삭제");
      setCctv(null);
    }
    if (loging == false) {
      setLoging(true);
    }
  }, [zoomLevel, positions]);

  // 커스텀 훅으로 위치 추적 관리
  const { error } = useWatchPosition(isGuided);

  return (
    <>
      <Map center={position} style={{ width: "100%", height: "100%" }} onZoomChanged={(map) => {
          setZoomLevel(map.getLevel());
        }}>
        {isGuided ? (
          <>
            <Polyline
              path={guidePoint}
              strokeWeight={5} // 선의 두께 입니다
              strokeColor={"#FFAE00"} // 선의 색깔입니다
              strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
            />
            {/* 사용자 위치 마커  */}
            <MapMarker
              position={position}
              image={{
                // 마커 이미지 변경
                src: runningMarker,
                size: {
                  width: 30,
                  height: 30,
                },
              }}
            />
            {/* 출발지 마커  */}
            <MapMarker
              position={cource.departure}
              image={{
                // 마커 이미지 변경
                src: departureMarker,
                size: {
                  width: 30,
                  height: 30,
                },
              }}
            />
            {/* 목적지 마커  */}
            <MapMarker
              position={cource.destination}
              image={{
                // 마커 이미지 변경
                src: destinationMarker,
                size: {
                  width: 30,
                  height: 30,
                },
              }}
            />
            {cctv != null &&
              cctv.map((cctvPosition, index) => (
                <MapMarker
                  key={index} // 고유한 key 추가
                  position={cctvPosition} // 마커를 표시할 위치
                  image={{
                    src: cctvIcon,
                    size: {
                      width: 90 / zoomLevel,
                      height: 90 / zoomLevel,
                    },
                  }}
                />
              ))}
            <ZoomControl />
          </>
        ) : (
          <>
            <MapMarker position={position}></MapMarker>
          </>
        )}
      </Map>
    </>
  );
};

export default MainMap;
