

// 게시글 작성시 필요한 지도 

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Position, initPosition } from "../../../type/route";
import { setPost } from "../../../features/postSlice";
import api from "../../../config/customAxiosInterceptor";
import { useState } from "react";

const SearchMap = () => {


    const position = useSelector((state: RootState) => state.position);
    const post = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();

    // 검색하기 위해 마커로 움직여서 변경될 위치 정보
    const [findPosition, setFindPosition] = useState<Position>(initPosition);

    // 좌표로 주소를 가져오는 함수
    const findLocation = (position: Position) => {
        const { lng, lat } = position;

        // 국토 교통부 Geocoder API :좌표를 주소로 변환
        api.get("http://localhost:8085/api/route/searchByPoint",
            { params: { lng, lat } }
        )
            .then((res) => {
                const roadAddr = res.data.response.result[0].text;
                dispatch(setPost({ ...post, roadAddress: roadAddr }))
            })
            .catch((err) => {
                dispatch(setPost({ ...post, roadAddress: "잘못된 주소입니다." }));
            })
    }

    return (
        <>
            <Map
                center={position}
                style={{ width: "100%", height: "100%" }}
            >
                <MapMarker // 마커를 생성합니다
                    position={position}
                    draggable={true}
                    onDragEnd={(map) => {
                        const location = map.getPosition();
                        setFindPosition({ lat: location.getLat(), lng: location.getLng() });
                        findLocation(findPosition);
                    }}
                />
            </Map>
        </>
    )
}

export default SearchMap;