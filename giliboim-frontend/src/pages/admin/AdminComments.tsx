import React, { useEffect, useState } from 'react';
import '../../styles/admin/AdminComments.css';
import declaration from '../../assets/images/declaration.png';
import normal from '../../assets/images/User.png';
import CommunityHeader from '../../components/CommunityHeader';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { initPageInfo, PageInfo } from '../../type/PageInfo';
import { Member } from '../../type/user';
import { PostComment, CommentCount } from '../../type/post'; // 새로 추가된 타입 임포트
import api from '../../config/customAxiosInterceptor';
import Pagination from '../../components/Pagination';

const AdminComments: React.FC = () => {
  const [comments, setComments] = useState<PostComment[]>([]); // PostComment 배열 타입 정의
  const [members, setMembers] = useState<Member[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo); // 페이지 정보 상태 추가
  const navigate = useNavigate();
  const locate = useLocation();
  const queryString = locate.search;

  useEffect(() => {
    // 댓글 목록 조회
    api.get(`http://localhost:8085/api/admin/comments${queryString}`)
      .then((res) => {
        console.log('Comments fetched:', res.data.commentList);
        setComments(res.data.commentList); // API 응답의 commentList 배열 설정
        setPageInfo(res.data.pi); // 페이지 정보 설정
      })
      .catch((err) => {
        console.error('Failed to fetch comments:', err);
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

  const handleDelete = async (commentNo: number) => {
    try {
      // 서버에 삭제 요청
      await api.delete(`http://localhost:8085/api/admin/comments/${commentNo}`);

      // 성공적으로 삭제된 경우, UI에서도 항목을 삭제
      setComments(prevComments => prevComments.filter(comment => comment.pcNo !== commentNo));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleItemClick = (commentNo: number) => {
    if (commentNo !== -1) {
      navigate(`/admin/AdminCommentDetail/${commentNo}`);
    }
  };

  return (
    <>
      <div>    
        <CommunityHeader title="댓글 관리" />
        <div className="admin-comment-container"> 
          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment.pcNo} className="comment-item" onClick={() => handleItemClick(comment.pcNo)}>
                <div className="comment-icon">
                  {/* 신고/일반 아이콘 이미지 경로 */}
                  {comment.reportNo ? (
                    <>
                      <img src={declaration} alt="신고" className='declaration' />
                      <div className="icon-label">신고</div>
                    </>
                  ) : (
                    <>
                      <img src={normal} alt="일반" className='normal'/>
                      <div className="icon-label">일반</div>
                    </>
                  )}
                </div>
                <div className="comment-content">
                  <div>{getNameByMemberNo(comment.memberNo)}님의 댓글</div>
                  <div>{comment.content}</div>
                </div>
                <button className="comment-delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(comment.pcNo); }}>✖</button>
              </div>
            ))}
            <Pagination pageInfo={pageInfo}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AdminComments;
