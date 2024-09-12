import React, { useState } from 'react';
import '../../styles/community/CustomComplaintPage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';
import { useLocation } from 'react-router-dom';

const CustomComplaintPage: React.FC = () => {

  const location = useLocation(); 
  const { postNo, commentNo } = location.state || {}; // 게시글 번호와 댓글 번호를 가져옵니다

  const [complaintText, setComplaintText] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleReportClick = () => {
    if (complaintText.trim() === '') {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    setIsPopupOpen(true);
  };

  const handleConfirmReport = () => {
    const reportData = {
      rcNo: 6, 
      postNo,
      commentNo,
      reason: complaintText, 
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
    <div className="custom-complaint-page">
      <h2>기타 (직접작성)</h2>
      <p>앞의 신고 항목에서 적당한 사유를 <br/>찾지 못하셨나요?</p>
      <p>신고 내용을 적어주시면 면밀히 확인 후<br/>적절한 조치를 취하도록 하겠습니다.</p>
      <textarea
        placeholder="신고 내용을 입력해주세요."
        className="complaint-textarea"
        value={complaintText}
        onChange={(e) => setComplaintText(e.target.value)}
      />
      <button className="report-buttons" onClick={handleReportClick}>
        신고하기
      </button>

      {isPopupOpen && (
        <div className="complaint-popup">
          <div className="popup-content">
            <p>신고하시겠습니까?</p>
            <button className="confirm-button2" onClick={handleConfirmReport}>
              신고
            </button>
            <button className="cancel-button2" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default CustomComplaintPage;
