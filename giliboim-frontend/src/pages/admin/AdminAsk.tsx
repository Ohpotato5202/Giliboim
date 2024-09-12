import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from'../../styles/admin/AdminAsk.module.css';
import axios from 'axios';
import { Member } from '../../type/user';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';

interface Inquiry {
  id: number;
  title: string;
  date: string;
  content: string;
  memberNo: number;
  name?: string;
  answerContent : string;
}

const AdminAsk: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('유효하지 않은 ID입니다.');
      return;
    }

    const fetchInquiry = async () => {
      try {
        const response = await api.get(`http://localhost:8085/api/admin/inquiry/${id}`);
        const inquiryData: Inquiry = {
          id: response.data.inquireNo,
          title: response.data.title,
          date: response.data.createDate,
          content: response.data.inquireContent,
          memberNo: response.data.memberNo,
          answerContent : response.data.answerContent
        };

        const memberResponse = await api.get<Member>(`http://localhost:8085/api/admin/account/${inquiryData.memberNo}`);
        inquiryData.name = memberResponse.data.name;

        setInquiry(inquiryData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (reply.trim() && inquiry) {
      try {
        await api.post(`http://localhost:8085/api/admin/inquiry/${inquiry.id}/reply`, { reply });
        setIsPopupVisible(true);

        setTimeout(() => {
          navigate('/admin/AdminAskList');
        }, 1000);
      } catch (error) {
        console.error("Failed to submit reply", error);
        setIsPopupVisible(true);
      }
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setError(null);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
    <div>   
      <AdminHeader title="문의 상세 정보" />
      <div className={styles["admin-ask-container"]}>
        <h2 className={styles["h2"]}>{inquiry?.name} 님이 문의하신 내용입니다.</h2>
        <div className={styles["inquiry-details"]}>
        </div>
        <div className={styles["inquiry-title"]}>제목 : {inquiry?.title}</div>
        <div className={styles["inquiry-date"]}>작성일 : {inquiry?.date}</div>
        <div>
        </div>
          <textarea className={styles["inquiry-content"]} readOnly value={inquiry?.content} />
        <textarea
          className={styles["reply-input"]}
          placeholder="답변 내용을 입력해주세요."
          defaultValue={inquiry?.answerContent}
          onChange={handleReplyChange}
        />
        <button className={styles["reply-button"]} onClick={handleReplySubmit}>답변하기</button>

        {isPopupVisible && (
          <div className={styles["popup-overlay"]}>
            <div className={styles["popup"]}>
              {error ? <p>{error}</p> : <p>답변이 완료되었습니다.</p>}
              <button className={styles["popup-button"]} onClick={handleClosePopup}>확인</button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminAsk;
