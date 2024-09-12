import React, { useEffect, useState } from 'react';
import '../../styles/admin/AdminPostDetail.css';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/customAxiosInterceptor';
import { Post } from '../../type/post';  // Post 타입 임포트
import { Report } from '../../type/report';  // Report 타입 임포트
import { Member } from '../../type/user';  // Member 타입 임포트
import CommunityHeader from '../../components/CommunityHeader';

const AdminPostDetail: React.FC = () => {
  const [post, setPostDetail] = useState<Post | null>(null);  // Post 상태
  const [reports, setReports] = useState<Report[]>([]);  // 신고 정보 상태
  const [members, setMembers] = useState<Member[]>([]);  // 모든 회원 정보 상태
  const navigate = useNavigate();
  const { postNo } = useParams<{ postNo: string }>(); // URL에서 postNo를 가져옴

  useEffect(() => {
    // 모든 회원 정보를 가져오는 함수
    const fetchAllMembers = () => {
      api.get('http://localhost:8085/api/admin/allAccount')
        .then((res) => {
          setMembers(res.data.AccountList);
        })
        .catch((err) => {
          console.error('Failed to fetch members:', err);
        });
    };

    // 게시물 상세 정보를 가져오는 함수
    const fetchPostDetail = () => {
      api.get<Post>(`http://localhost:8085/api/admin/post/${postNo}`)
        .then((res) => {
          setPostDetail(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch post details:', err);
        });
    };

    // 모든 신고 정보를 가져오는 함수
    const fetchAllReports = () => {
      api.get(`http://localhost:8085/api/admin/reports/${postNo}`)
        .then((res) => {
          const filteredReports = res.data.reportList;
          console.log("asdfjiasdfjlasd"+filteredReports);
          setReports(filteredReports);
        })
        .catch((err) => {
          console.error('Failed to fetch reports:', err);
        });
    };

    if (postNo) {
      fetchAllMembers(); // 모든 회원 정보를 먼저 가져옴
      fetchPostDetail(); // 게시물 상세 정보 가져옴
      fetchAllReports(); // 모든 신고 정보를 가져옴
    }
  }, [postNo]);

  // memberNo를 이용해 nickname을 찾는 함수
  const getNicknameByMemberNo = (memberNo: number): string => {
    const member = members.find((m) => m.memberNo === memberNo);
    return member ? member.nickname : '';
  };

  const handleDelete = async () => {
    try {
      await api.delete(`http://localhost:8085/api/admin/post/${postNo}`);
      alert('게시글이 삭제되었습니다.');
      navigate("/admin/AdminPost?category=all");
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleCancel = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <>
      <div>
      <CommunityHeader title="게시글 관리" />
        <div className="reported-post-container">
          {post && ( // post가 있을 때만 렌더링
            <>
              <div className="post-section">
                <div className="post-row-horizontal">
                  <div className="post-row-item">
                    <label>작성자</label>
                    <input type="text" value={getNicknameByMemberNo(post.memberNo)} readOnly /> {/* 작성자 닉네임 사용 */}
                  </div>
                  <div className="post-row-item">
                    <label>작성일</label>
                    <input type="text" value={post.createDate} readOnly /> {/* createDate 사용 */}
                  </div>
                </div>

                <div className="title">
                  <br /><br />
                  <label>제목</label>
                  <input type="text" value={post.title} readOnly />
                </div>

                <div className="post-row-vertical">
                  <br />
                  <label>내용</label>
                  <input value={post.content} readOnly />
                </div>
              </div>

              {reports.length > 0 && (
                <div className="report-section">
                  {reports.map((report: Report, index: number) => (
                    <div key={index}>
                      <div className="report-row-horizontal">
                        <div className="report-row-item">
                          <label>신고자</label>
                          <input type="text" value={getNicknameByMemberNo(report.memberNo)} readOnly />
                        </div>

                        <div className="report-row-item">
                          <label>신고일</label>
                          <input type="text" value={report.createDate.toString()} readOnly />
                        </div>

                        <div className="report-row-item">
                          <label>신고분류</label>
                          <input type="text" value={report.category} readOnly /> {/* category 사용 */}
                        </div>
                      </div>

                      <div className="report-row-vertical">
                        <label>신고 사유</label>
                        <input value={report.reason} readOnly />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="buttons">
                <div className="btn blue" onClick={() => navigate("/admin/AdminPost?category=all")}>
                  <div className="btn-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12H21M3 6H21M3 18H21" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="admin-post">목록</span>
                  </div>
                </div>

                <div className="btn green" onClick={() => navigate('/community/detail/'+postNo)}>
                  <div className="btn-contents">
                    <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_83_1902)">
                        <path d="M18.7551 15.0727L21.1656 12.2001C21.6932 11.5713 22.3394 11.0527 23.0674 10.6737C23.7955 10.2947 24.591 10.0628 25.4086 9.99128C26.2263 9.91974 27.05 10.01 27.8328 10.2568C28.6155 10.5036 29.342 10.9021 29.9708 11.4297C30.5995 11.9573 31.1182 12.6035 31.4972 13.3316C31.8762 14.0596 32.108 14.8551 32.1796 15.6728C32.2511 16.4904 32.1609 17.3141 31.9141 18.0969C31.6673 18.8797 31.2687 19.6062 30.7411 20.2349L28.3307 23.1076M23.5098 28.8529L21.0993 31.7256C20.5718 32.3543 19.9255 32.873 19.1975 33.252C18.4695 33.631 17.6739 33.8628 16.8563 33.9344C15.205 34.0788 13.5639 33.5614 12.2941 32.4959C11.0243 31.4305 10.2298 29.9042 10.0853 28.2529C9.94086 26.6016 10.4583 24.9605 11.5238 23.6907L13.9342 20.8181M17.9185 25.793L24.3464 18.1326" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_83_1902">
                          <rect width="30" height="30" fill="white" transform="translate(0 23.8115) rotate(-50)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="post-lists">게시글</span>
                  </div>
                </div>

                <div className="btn red" onClick={handleDelete}>삭제</div>
                <div className="btn gray" onClick={handleCancel}>취소</div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminPostDetail;
