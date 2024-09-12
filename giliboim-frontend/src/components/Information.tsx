import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCamera, FaTimes } from 'react-icons/fa'; 
import '../styles/common/Information.css'; 
import Header from './Header';
import Footer from './Footer';
import api from '../config/customAxiosInterceptor';

function Information() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const password = location.state?.password || ''; // Check 페이지에서 전달된 비밀번호를 받아옵니다.

  useEffect(() => {
    if (!password) {
      alert('비정상적인 접근입니다.');
      navigate('/mypage'); // 비밀번호가 없으면 mypage로 리다이렉트합니다.
    }
  }, [password, navigate]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [phone, setPhone] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('nickName', nickName);
    formData.append('pwd', pwd);
    formData.append('phone', phone);

    if (selectedImage) {
      formData.append('profile', selectedImage);
    }

    try {
      const response = await api.put('http://localhost:8085/api/mypage/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.msg);
      if (response.data.msg === "회원 정보를 수정했습니다.") {
        navigate('/mypage');
      }
    } catch (error) {
      console.error('회원정보 수정 오류:', error);
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="Information-info-container">
        <div className="Information-info-header">회원 정보 수정</div>
        <form onSubmit={handleSubmit}>
          <div className="section-title">
            <div className="profile-photo-section">
              <span className="profile-photo-label">프로필 사진 변경</span>
              <FaCamera
                size={20}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
                onClick={handleCameraClick}
              />
            </div>
          </div>

          <input
            type="file"
            id="profile-photo"
            className="profile-photo-input"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          {selectedImage && (
            <div className="profile-photo-preview">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="프로필 미리보기"
                className="profile-photo-image"
              />
              <FaTimes
                className="remove-photo-icon"
                size={20}
                onClick={handleImageRemove}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text1"
              id="nickname"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="pwd">새 비밀번호</label>
            <input
              type="password"
              id="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPwd">새 비밀번호 확인</label>
            <input
              type="password"
              id="confirmPwd"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">휴대전화</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">수정</button>
            <button type="button" className="cancel-button" onClick={() => navigate('/mypage')}>취소</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Information;
