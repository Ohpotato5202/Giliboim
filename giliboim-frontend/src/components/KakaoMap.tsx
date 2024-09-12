import React, { useEffect, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { initPosition, Position } from "../type/route";
import { getCurrentPosition } from "../features/KakaoMap";
import { useLocation } from "react-router-dom";
import '../styles/common/KakaoMap.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setPost } from "../features/postSlice";
import api from "../config/customAxiosInterceptor";
import { setPosition } from "../features/positionSlice";
// 데이터 파일 경로 확인

import cctvAdress from "../data/CCTVAdress";


interface item {
  point_wkt: string;
}

interface cctvInfo {
  lat: number;
  lng: number;
}


const KakaoMap: React.FC = () => {
  
  const location = useLocation();
  const post = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  // 전역으로 관리될 사용자의 위치 
  const position = useSelector((state: RootState) => state.position);

  const [findPosition, setFindPosition] = useState<Position>(initPosition);

  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(3);
  const [cctv, setCctv] = useState<cctvInfo[] | null>(null);
  const [positions, setPositions] = useState<item[]>([]); // 상태로 관리
  const [loging,setLoging] = useState(false);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const currentPosition = await getCurrentPosition();
        setPosition(currentPosition);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPosition();

    const fetchedPositions: item[] = JSON.parse(cctvAdress());
    setPositions(fetchedPositions);
  }, []);

  useEffect(() => {
    console.log(cctv);
    if (zoomLevel <= 3) {
      if(cctv != null) return;
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
    if(loging == false){
      setLoging(true);
    }
  }, [zoomLevel,positions]);

  return (
    <>
      <Map
        center={position}
        style={{ width: "100%", height: "100%" }}
        onZoomChanged={(map) => {
          setZoomLevel(map.getLevel());
        }}
      >
        {cctv != null &&
          cctv.map((cctvPosition, index) => (
            <MapMarker
              key={index} // 고유한 key 추가
              position={cctvPosition} // 마커를 표시할 위치
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: {
                  width: 90/zoomLevel,
                  height: 90/zoomLevel
                },
              }}
            />
          ))}
        <ZoomControl />
      </Map>
    </>
  );
};

export default KakaoMap;
