import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import api from '../../config/customAxiosInterceptor'; // API 요청을 위한 Axios 인스턴스
import '../../styles/admin/AdminPost.css'; // 기존에 작성된 CSS 사용
import declaration from '../../assets/images/declaration.png';
import normal from '../../assets/images/User.png';
import Footer from '../../components/Footer';
import { Member } from '../../type/user';  // Member 타입 임포트
import Pagination from '../../components/Pagination';
import { initPageInfo, PageInfo } from '../../type/PageInfo'; // PageInfo 타입과 초기화 값 임포트
import CommunityHeader from '../../components/CommunityHeader';

// Post 인터페이스 정의
interface Post {
  postNo: number;
  memberNo: number;
  roadAddress: string;
  title: string;
  content: string;
  status: string;
  createDate: string;
  reportNo: number;
  nickName: string;
}

const AdminPost: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo); // 페이지 정보 상태 추가
  const navigate = useNavigate();
  const locate = useLocation();
  const queryString = locate.search;
  console.log(queryString);

  useEffect(() => {
    setPosts([]);
    setMembers([]);
    // 게시물 목록 조회
    console.log("일반 or 신고 게시물")
    api.get(`http://localhost:8085/api/admin/posts${queryString}`)
      .then((res) => {
        console.log('Posts fetched:', res.data.postList);
        setPosts(res.data.postList); // API 응답의 postList 배열 설정
        setPageInfo(res.data.pi); // 페이지 정보 설정
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
      }); 

    // 회원 목록 조회
    api.get('http://localhost:8085/api/admin/allAccount')
      .then((res) => {
        console.log('Members fetched:', res.data.AccountList);
        setMembers(res.data.AccountList); // Members 데이터 설정
      })
      .catch((err) => {
        console.error('Failed to fetch members:', err);
      });
  }, [queryString]); // queryString이 변경될 때마다 재실행

  // memberNo를 이용해 nickname을 찾는 함수
  const getNameByMemberNo = (memberNo: number): string => {
    const member = members.find((m) => m.memberNo === memberNo);
    return member ? member.name : '';
  };

  const handleDelete = async (postNo: number) => {
    try {
      // 서버에 삭제 요청
      await api.delete(`http://localhost:8085/api/admin/posts/${postNo}`);

      // 성공적으로 삭제된 경우, UI에서도 항목을 삭제
      setPosts(prevPosts => prevPosts.filter(post => post.postNo !== postNo));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleItemClick = (postNo: number) => {
    if (postNo !== -1) {
      navigate(`/admin/AdminPostDetail/${postNo}`);
    }
  };

  return (
    <>
      <CommunityHeader title="게시글 관리" />
      <div className="admin-post-container">
        <ul className="post-items">
          {posts.map(post => (
            <li key={post.postNo} className="post-item" onClick={() => handleItemClick(post.postNo)}>
              <div className="post-icon">
                {post.reportNo > 0 ? (
                  <>
                    <img src={declaration} alt="신고" className="declaration" />
                    <div className="icon-label">신고</div>
                  </>
                ) : (
                  <>
                    <img src={normal} alt="일반" className="normal" />
                    <div className="icon-label">일반</div>
                  </>
                )}
              </div>
              <div className="post-content">
                <div className="post-author">{getNameByMemberNo(post.memberNo)}님의 게시글</div>
                <div className="post-text">{post.content}</div>
              </div>
              <button className="post-delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(post.postNo); }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        <Pagination pageInfo={pageInfo}/>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AdminPost;
