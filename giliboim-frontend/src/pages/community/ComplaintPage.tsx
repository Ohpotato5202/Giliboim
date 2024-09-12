import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/community/ComplaintPage.css';
import { Report } from '../../type/report'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';

// 신고 데이터 타입 정의
type ReportData = Omit<Report, 'reportNo' | 'createDate' | 'nickname' | 'category'>;

const categories = [
  { rcNo: 1, reason: '중복 / 도배성 게시글이에요.' },
  { rcNo: 2, reason: '홍보성 글이에요' },
  { rcNo: 3, reason: '부적절한 글이에요' },
  { rcNo: 4, reason: '음란성 / 선정적인 게시글이에요' },
  { rcNo: 5, reason: '종교 포교를 시도하는 글이에요' },
  { rcNo: 6, reason: '기타 (직접 작성)' },
];

const ComplaintPage: React.FC = () => {
  
  const location = useLocation(); 
  const { postNo, commentNo } = location.state || {}; // 게시글 번호와 댓글 번호를 가져옵니다
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectedRcNo, setSelectedRcNo] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleReasonClick = (reason: string, rcNo: number) => {
    if (reason === '기타 (직접 작성)') {
      navigate('/community/complain/custom', { state: { postNo, commentNo } }); // '기타 (직접 작성)' 선택 시 해당 경로로 이동
    } else {
      setSelectedReason(reason);
      setSelectedRcNo(rcNo);
      setIsPopupOpen(true);
    }
  };

  const handleReport = () => {
    if (selectedRcNo === null) return;

    const reportData = {
      rcNo: selectedRcNo,
      postNo: postNo,   
      commentNo: commentNo, // 댓글 번호도 포함
      reason: selectedReason,
    };
    
    api.post('http://localhost:8085/api/community/complain', reportData)
      .then(response => {
        alert(response.data.msg);
      })
      .catch(error => {
        console.error('신고 중 오류가 발생했습니다.', error);
        alert('신고 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setIsPopupOpen(false);
      });
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Header/>
      <div className="complaint-page">
        <div className="complaint-reasons">
          <p>신고하는 이유를 선택해주세요.</p>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleReasonClick(category.reason, category.rcNo)}>
                {category.reason}
              </li>
            ))}
          </ul>
        </div>

        {isPopupOpen && (
          <div className="complaint-popup">
            <div className="popup-content">
              <p>{selectedReason}</p>
              <button className="confirm-button1" onClick={handleReport}>신고</button>
              <button className="cancel-button1" onClick={handleCancel}>취소</button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default ComplaintPage;
