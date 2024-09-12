import React, { useEffect, useState } from 'react';
import styles from '../../styles/admin/AdminCommentDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/customAxiosInterceptor';
import Footer from '../../components/Footer';
import CommunityHeader from '../../components/CommunityHeader';
import { Member } from '../../type/user';  // Member 타입 임포트

const AdminCommentDetail: React.FC = () => {
  const [comment, setCommentDetail] = useState<any>(null); // Comment 상태를 any로 설정하여 초기화
  const [reports, setReports] = useState<any[]>([]); // 신고 정보 상태 초기화
  const [members, setMembers] = useState<Member[]>([]); // 모든 회원 정보 상태 초기화
  const navigate = useNavigate();
  const { commentNo } = useParams<{ commentNo: string }>(); // URL에서 commentNo 가져옴

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

    // 댓글 상세 정보를 가져오는 함수
    const fetchCommentDetail = () => {
      api.get(`http://localhost:8085/api/admin/comments/${commentNo}`)
        .then((res) => {
          setCommentDetail(res.data || {}); // 응답이 없을 경우 빈 객체를 할당하여 초기화
        })
        .catch((err) => {
          console.error('Failed to fetch comment details:', err);
        });
    };

    // 모든 신고 정보를 가져오는 함수
    const fetchAllReports = () => {
      api.get(`http://localhost:8085/api/admin/comment/${commentNo}`)
        .then((res) => {
          setReports(res.data.reportList || []); // 응답이 없을 경우 빈 배열을 할당하여 초기화
        })
        .catch((err) => {
          console.error('Failed to fetch reports:', err);
        });
    };

    if (commentNo) {
      fetchAllMembers(); // 모든 회원 정보를 먼저 가져옴
      fetchCommentDetail(); // 댓글 상세 정보 가져옴
      fetchAllReports(); // 모든 신고 정보를 가져옴
    }
  }, [commentNo]);

  // memberNo를 이용해 nickname을 찾는 함수
  const getNicknameByMemberNo = (memberNo: number): string => {
    const member = members.find((m) => m.memberNo === memberNo);
    return member ? member.nickname : 'Unknown'; // 닉네임이 없을 경우 'Unknown'을 기본값으로 사용
  };

  const handleDelete = async (reportNo: number) => {
    try {
      await api.delete(`http://localhost:8085/api/admin/comment/${reportNo}`);
      alert('댓글이 삭제되었습니다.');
      navigate("/admin/AdminComments?category=all");
      setReports(prevReports => prevReports.filter(report => report.reportNo !== reportNo));
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  };

  const handleCancel = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <>
      <div>
        <CommunityHeader title="댓글 관리" />
        <div className={styles["reported-comment-container"]}>
          {comment && ( // comment가 있을 때만 렌더링
            <>
              <div className={styles["comment-section"]}>
                <div className={styles["comment-row-horizontal"]}>
                  <div className={styles["comment-row-item"]}>
                    <label>작성자</label>
                    <input type="text" value={getNicknameByMemberNo(comment.memberNo || 0)} readOnly /> {/* 작성자 닉네임 사용 */}
                  </div>
                  <div className={styles["comment-row-item"]}>
                    <label>작성일</label>
                    <input type="text" value={comment.createDate || 'N/A'} readOnly /> {/* createDate 사용 */}
                  </div>
                </div>

                <div className={styles["comment-row-vertical"]}>
                  <br />
                  <label>내용</label>
                  <input value={comment.content || 'N/A'} readOnly />
                </div>
              </div>

              {reports.length > 0 && (
                <div className={styles["report-section"]}>
                  {reports.map((report, index) => (
                    <div key={index}>
                      <div className={styles["report-row-horizontal"]}>
                        <div className={styles["report-row-item"]}>
                          <label>신고자</label>
                          <input type="text" value={getNicknameByMemberNo(report.memberNo || 0)} readOnly />
                        </div>

                        <div className={styles["report-row-item"]}>
                          <label>신고일</label>
                          <input type="text" value={report.createDate ? report.createDate.toString() : 'N/A'} readOnly />
                        </div>

                        <div className={styles["report-row-item"]}>
                          <label>신고 분류</label>
                          <input type="text" value={report.category} readOnly /> {/* category 사용 */}
                        </div>
                      </div>

                      <div className={styles["report-row-vertical"]}>
                        <label>신고 내용</label>
                        <input value={report.reason || 'N/A'} readOnly />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles["comment-buttons"]}>
                <div className={`${styles.btn} ${styles.blue}`} onClick={() => navigate("/admin/AdminComments?category=all")}>
                  <div className={styles["btn-content"]}>
                    <div className={styles["mystyles"]}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={styles["admin-post"]}>목록</span>
                    </div>
                  </div>
                </div>

              <div className={`${styles.btn} ${styles.red}`} onClick={() => handleDelete}>삭제</div>
                <div className={`${styles.btn} ${styles.gray}`} onClick={handleCancel}>취소</div>
              </div>
            </>
          )}
        </div>
        <Footer />  
      </div>
    </>
  );
};

export default AdminCommentDetail;
