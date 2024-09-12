import "../../styles/route/route-search.css";
import "../../styles/common/Main.css";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import useInput from "../../hook/useInput";
import {
  Cource,
  CourceSearch,
  initCource,
  initCourSearchResult,
} from "../../type/route";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../config/customAxiosInterceptor";
import Pagination from "../../components/Pagination";
import { PageInfo, initPageInfo } from "../../type/PageInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resetGuidePoint } from "../../features/guidePointSlice";


let searchType = '';

const RouteSearch: React.FC = () => {

  // 현위치로 주소를 검색하기 위한 전역상태 
  const position = useSelector((state: RootState) => state.position);

  // 출발지, 목적지 정보를 담게될 변수(1차적으로 값을 확인)
  const [cource, setCource, handleInputChange] = useInput<Cource>(initCource);

  // 검색 내용을 담아줄 변수
  const [courceSearch, setCourceSearch] = useState<CourceSearch[] | null>(null);

  //페이지 네이션을 위한 상태값
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);

  // 쿼리스트링 값을 이용하기 위한 코드
  const locate = useLocation();
  const queryString = locate.search;

  // 검색어 keyword를 저장하는 상태값 
  const [keyword, setKeyword] = useState<string>();

  // 사용자가 춟발지, 목적지 둘다 선택했을때를 체크하는 상태 변수
  const [check, setCheck] = useState<number>(0);

  // 출발지와 목적지 선택후 추천 경로 사이트로 이동하기 위한 navi 함수 
  const navi = useNavigate();

  // 전역으로 관리되는 상태값을 설정하기 위한 dispatch
  const dispatch = useDispatch();
  const guidePoint = useSelector((state: RootState) => state.guidePoint);

  // 엔터키 이벤트를 위한 함수
  const activeEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement; // 타입추론을 위한 구문

      searchType = target.name;   // 검색결과 선택을 위한 전역 변수 값을 변경해준다. 
      searchCource(target.value); // 인풋값으로 값을 변경
    }
  };


  // 검색 요청을 보내는 함수
  const searchCource = (keyword: string) => {
    api
      .get(`http://localhost:8085/api/route/searchByName?pageNo=1`,
        { params: { name: keyword } }
      )
      .then((res) => {
        setCourceSearch(res.data.results.juso);
        setPageInfo(res.data.pi);
        setKeyword(keyword); // 출발지, 목적지든 검색어를 저장해놓는다 - 목록에서 쓸때 사용
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // 페이징 처리를 통해 쿼리스트링 값이 바뀔때마다 데이터 가져오기
  useEffect(() => {

    api
      .get(`http://localhost:8085/api/route/searchByName${queryString}`,
        { params: { name: keyword } }
      )
      .then((res) => {
        setCourceSearch(res.data.results.juso);
        setPageInfo(res.data.pi);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [queryString]);

  // 현위치 버튼을 누를시 출발지가 현재위치로 찍힘
  const handleCurrentPosition = () => {
    const { lat, lng } = position;
    api.get('http://localhost:8085/api/route/searchByPoint',
      { params: { lng: lng, lat: lat, queryString } }
    )
      .then((res) => {
        const roadAddr = res.data.response.result[0].text;
        setCource({ ...cource, departure: roadAddr });
        if (check >= 2) {
          return;
        }
        setCheck(prevCheck => prevCheck + 1);
      })
      .catch((err) => {
        alert("현재 위치를 가져올 수 없습니다.");
      })
  }



  const selectCource = (address: string, type: string) => {
    setCource({
      ...cource,
      [type]: address
    })
    if (check >= 2) {
      return;
    }
    setCheck(prevCheck => prevCheck + 1);
  }


  // 사용자가 검색을 취소했을때 
  const cancleSearch = () => {
    window.location.reload(); // 새로고침을 해서 모든 상태값을 날려버리기
  }

  // 사용자가 출발지와 목적지 선택후 추천경로를 보여주는 페이지로 이동 
  const decideCource = () => {
    console.log(guidePoint);
    dispatch(resetGuidePoint());
    
    navi("/route/select", {state : cource});
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="route-container">
          <div className="search-container">
            <div id="search-box">
              <label htmlFor="departure">출발지</label>
              <input
                type="text"
                id="departure"
                placeholder="출발지를 입력하세요"
                name="departure"
                value={cource.departure}
                onChange={handleInputChange}
                onKeyDown={activeEnter}
              />
            </div>
            <div id="search-box">
              <label htmlFor="destination">목적지</label>
              <input
                type="text"
                id="destination"
                placeholder="목적지를 입력하세요"
                name="destination"
                value={cource.destination}
                onChange={handleInputChange}
                onKeyDown={activeEnter}
              />
            </div>
          </div>
          <div className="location-content">
            {/* 최대 5개의 내용이 나오게 해보자 */}

            {
              courceSearch !== null && courceSearch.length > 0 ?
                (
                  courceSearch.map((cource) => {
                    return (
                      <div className="location-search">
                        <p>
                          {cource.jibunAddr}
                          <br />
                          <span className="location-doro">
                            {cource.roadAddr}
                          </span>
                        </p>
                        <button className="select-button" onClick={() => {
                          selectCource(cource.roadAddr, searchType);
                        }}>선택</button>
                      </div>
                    );
                  })) :
                (
                  <>

                  </>
                )
            }

          </div>

          <Pagination pageInfo={pageInfo} />
          <div className="choose-container">
            <button className="current-location" onClick={handleCurrentPosition}>현위치</button>
            {
              check == 2 ?
                (<>
                 <button className="guide-button" onClick={decideCource} >경로 탐색</button>
                 <button className="guide-button" onClick={cancleSearch}>검색 취소</button>
                 </>
                ) :
                (<></>)
            }
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default RouteSearch;
