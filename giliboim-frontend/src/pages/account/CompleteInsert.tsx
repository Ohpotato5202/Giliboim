import React from 'react';
import '../../styles/common/CompleteInsert.css'; // CSS 파일을 별도로 만들어서 스타일을 적용합니다.
import logo from '../../assets/images/giliboim-logo.png';

const CompleteInsert = () => {
    return (
        <div className="container">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo-image" />
          </div>
          <div className='main-container'>
            <div className="message">
              회원가입이 완료되었습니다.<br />
              환영합니다!
            </div>
          </div>
          <button className="login-button">로그인창으로</button>
        </div>
      );
};

export default CompleteInsert;
