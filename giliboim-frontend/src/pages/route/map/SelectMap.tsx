import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPosition } from "../../../features/KakaoMap";
import { setPosition } from "../../../features/positionSlice";
import { RootState } from "../../../store/store";
import { Feature, GuideInfo, GuidePoint, Position } from "../../../type/route";
import api from "../../../config/customAxiosInterceptor";
import {
  setGuidePoint,
} from "../../../features/guidePointSlice";
import { setGuideInfo } from "../../../features/guideInfoSlice";
import departureMarker from "../../../assets/images/departure-marker.png"
import destinationMarker from "../../../assets/images/destination-merker.png"


const ResettingMapBounds = (props: { points: Position[] }) => {
  // LatLngBounds를 사용해 좌표들이 모두 보이게 중심좌표와 레벨 재설정
  const map = useMap();
  // 전달된 출발지, 목적지 좌표정보를 통해 bounds 설정
  const { points } = props;
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);

  return <>{map.setBounds(bounds)}</>;
};

const SelectMap = () => {
  const position = useSelector((state: RootState) => state.position);

  // 전역으로 관리하고 있는 출발지와 목적지
  const cource = useSelector((state: RootState) => state.cource);
  const dispatch = useDispatch();

  // 보행자 기준 안내 경로 정보들의 - Feature[] 배열로 관리되어 "Point" 타입에 해당되는 데이터만 출력
  const [features, setFeatures] = useState<Feature[]>([]);

  // 전역으로 관리되게될 전역 경로 상태- features에서 type이 "Point"에 해당되는 데이터로 추출하게된 위도, 경도를 출력
  const guidePoint = useSelector((state: RootState) => state.guidePoint);

  // 출발지와 목적지의 좌표를 points 배열에 담아 레벨을 조정하도록 하자.
  const points = [cource.departure, cource.destination];

  useEffect(() => {
    console.log(cource);
    api
      .post("http://localhost:8085/api/route/tmapSearchCource", cource, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.features);
        setFeatures(res.data.features);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cource]);

  useEffect(() => {
    if (!features || features.length < 0) {
      return;
    }

    // 추출된 경로 정보를 바탕으로 "Point 정보" 추출
    const pointFeature = features.filter((feat) => {
      if (feat.geometry.type == "Point") {
        return feat;
      }
    });

    const points: Position[] = [];

    pointFeature.map((feat) => {
      // 경로를 통한 총 거리, 시간 계산하여 전역 상태값으로 관리
      if (feat.properties.index === 0) {
        console.log("총 거리" + feat.properties.totalDistance);
        console.log("총 시간" + feat.properties.totalTime);

        const guideInfo: GuideInfo = {
          distance: (feat.properties.totalDistance / 1000).toFixed(1),
          time: (feat.properties.totalTime / 60).toFixed(0),
        };
        dispatch(setGuideInfo(guideInfo));
      }

      let point: Position = {
        lat: feat.geometry.coordinates[1],
        lng: feat.geometry.coordinates[0],
      };
      points.push(point);
    });

    dispatch(setGuidePoint(points));
  }, [features]);

  return (
    <>
      <Map center={position} style={{ width: "100%", height: "100%" }}>
        {/* 출발지 마커 */}
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

        <Polyline
          path={guidePoint}
          strokeWeight={5} // 선의 두께 입니다
          strokeColor={"#FFAE00"} // 선의 색깔입니다
          strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />

        {/* 목적지 마커 */}
        <MapMarker position={cource.destination}
                   image={{
                    // 마커 이미지 변경
                    src: destinationMarker,
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
        />
        <ResettingMapBounds points={points} />
      </Map>
    </>
  );
};

export default SelectMap;
