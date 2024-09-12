import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common/Check.css';
import Header from './Header';
import Footer from './Footer';
import api from '../config/customAxiosInterceptor';

const Check: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.put('http://localhost:8085/api/mypage/check-password', null, {
        params: {
          pwd: password,
        },
      });

      if (response.data.isValid) {
        navigate('/Mypage/Information', { state: { password } }); // Information 페이지로 이동 시 비밀번호 전달
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
      alert('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="check-container">
        <h2 className="check-title">본인확인</h2>
        <p className="check-description">
          고객님의 소중한 개인정보보호를 위해서 <br/>본인확인을 진행합니다.
        </p>
        <form onSubmit={handleSubmit} className="check-form">
          <div className="check-input-group">
            <label htmlFor="password" className="check-label">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="check-input"
            />
            <button type="submit" className="check-button">확인</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Check;
