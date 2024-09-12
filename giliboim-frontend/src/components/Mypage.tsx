
import React, { useEffect, useState } from 'react';
import '../styles/common/Mypage.css'; // 스타일 파일 경로에 맞게 수정
import { Link, Outlet, useNavigate } from 'react-router-dom';
import api from '../config/customAxiosInterceptor';
import Header from './Header';
import Footer from './Footer';
import { initMember, Member } from '../type/user';
import logo from "../assets/images/giliboim-logo.png"
const MyPage: React.FC = () => {


  const [member, setMember] = useState<Member>(initMember); 
  const navi = useNavigate();
    
    
  useEffect(()=>{
    api.get("http://localhost:8085/api/Account/memberName")
      .then((result)=>{
        setMember(result.data);
      })
  },[]);
    
   const logOut = () => {
   api.delete("http://localhost:8085/api/Account/logOut")
      .then(()=>{
        localStorage.removeItem("accessToken");
        navi("/");
        window.location.reload();
      })
      .catch(()=>{
        console.log("로그아웃 에러");
      })
  }

    return (
      <>
      <Header/>
        <div className="container">
            <div className="profile-section">
                <img src={ member.profile ? ("http://localhost:8085/api/static/images/profile/"+member.profile) : logo } alt="프로필 이미지" className="profile-image" />
                <div className="user-name">{member.nickname}</div>
            </div>
            <div className="menu-section">
                <Link to="Friend" className='menu-link'>
                  <div className="menu-item">
                    친구 관리
                    <span className="arrow">{">"}</span>
                  </div> 
                </Link>
                <Link to="check" className='menu-link'>
                <div className="menu-item">
                    회원정보 수정
                    <span className="arrow">{'>'}</span>
                </div>
                </Link>
                <Link to="Withdraw" className='menu-link'>
                <div className="menu-item">
                    회원탈퇴
                    <span className="arrow">{'>'}</span>
                </div>
                </Link>
                <div className="menu-item logout" onClick={logOut}>
                    로그아웃
                </div>
            </div>
        </div>
      <Footer/>
      </>
    );
};

export default MyPage;
