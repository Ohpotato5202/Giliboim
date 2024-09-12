import React, { useEffect, useState } from 'react';
import '../../styles/community/Community.css';
import '../../styles/common/Pagenation.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../../type/post';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { url } from 'inspector';
import Images from '../../components/Thumbnail';
import Thumbnail from '../../components/Thumbnail';
import { initPageInfo, PageInfo } from '../../type/PageInfo';
import Pagination from '../../components/Pagination';
import api from './../../config/customAxiosInterceptor';


const Community: React.FC = () => {
  const [location, setLocation] = useState<string>('위치를 불러오는 중...');
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);

  // 쿼리스트링 값을 이용하기 위한 코드
  const locate = useLocation();
  const queryString = locate.search;

  const navi = useNavigate();

  useEffect(() => {
    // 사용자의 현재 위치를 가져오는 함수
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          api.get('http://localhost:8085/api/route/searchByPoint',
            { params: { lng: longitude, lat: latitude, queryString } }
          )
            .then((res) => {
              const roadAddr = res.data.response.result[0].text;
              setLocation("📍 현재 위치 : " + roadAddr);
            })
            .catch((err) => {
              setLocation(`📍 위도 ${latitude}, 경도 ${longitude}`);
            })
        }
      );
    } else {
      setLocation('브라우저가 위치 정보를 지원하지 않습니다.');
    }

    // 게시글 목록 조회 (처음 조회할때)
    api.get(`http://localhost:8085/api/community/list${queryString}`)
      .then((res) => {
        console.log(res.data); // 맵으로 가져오는 데이터
        setPosts(res.data.communityList);  // 데이터를 posts 상태에 저장
        setPageInfo(res.data.pi);
        console.log(pageInfo);

      })
      .catch((err) => {
        console.log(err);
      })

  }, [queryString]);

  return (
    <>
      <Header />
      <div className="community">
        <div className="location">{location}</div>
        <div className="post-list">
          {posts.map((post) => (
            <div className="post">
              <div className="post-info" onClick={() => navi(`/community/detail/${post.postNo}`)}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                {/* <div className="post-image" style={{background : `url("http://localhost:8085/api/static/images/posts/${post.thumbnail}")`}}></div> */}
                <Thumbnail changeName={post.thumbnail} />
                <div className="post-meta">
                  <span>좋아요: {post.likeCount}</span> / <span>댓글: {post.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="report-button" onClick={() => navi('/community/report')}>+ 제보글쓰기</button>
        <Pagination pageInfo={pageInfo} />
      </div>
      <Footer />
    </>
  );
};

export default Community;
