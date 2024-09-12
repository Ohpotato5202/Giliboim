import React, { useState } from 'react';
import axios from 'axios';
import '../styles/common/Withdraw.css';
import Header from './Header';
import Footer from './Footer';
import api from '../config/customAxiosInterceptor';
import { useNavigate } from 'react-router-dom';

const Withdraw: React.FC = () => {
    const [password, setPassword] = useState('');
    const navi = useNavigate();

    // 탈퇴 처리 함수 
    const handleWithdraw = () => {
        api.delete('http://localhost:8085/api/mypage/withdraw', {
            params: { pwd: password },
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            localStorage.removeItem('accessToken');
            alert("삭제성공");
            navi('/');
            window.location.reload();
        })
        .catch(error => {
            alert('탈퇴 중 오류가 발생했습니다.');
        });
    };

    return (
        <>
            <Header />
            <div className="Withdraw-container">
                <div className="Withdraw-header">회원탈퇴</div>
                <div className="Withdraw-profile">
                    <div className="Instructions">회원탈퇴 안내</div>
                    <div className="Instructions-1">
                        고객님께서 회원 탈퇴를 원하신다니 <br />
                        불편하셨던 점이나 불만사항을 알려주시면 적극 반영해서 <br />
                        고객님의 불편함을 <br />
                        해결해드리도록 노력하겠습니다.<br />
                        그동안 저희 길이보임을 사랑해주셔서 감사합니다.
                    </div>
                </div>
                <div className="Withdraw-menu">
                    <label htmlFor="password-input">현재비밀번호 입력</label>
                    <input
                        type="password"
                        id="password-input"
                        className="input-box"
                        placeholder="현재 비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="delete-button" onClick={handleWithdraw}>
                    탈퇴하기
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Withdraw;
