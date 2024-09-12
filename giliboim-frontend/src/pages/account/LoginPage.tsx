import styles from '../../styles/common/LoginPage.module.css';
import logo from '../../assets/images/giliboim-logo.png';
import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../../config/customAxiosInterceptor';
import axios from 'axios';

const LoginPage = () => {

  const REST_API_KEY = "6efcab284f1380296c17170fa1adb00c";
  const REDIRECT_URI_Base = "http://localhost:8085/api/Social/Login/kakao";

  useEffect(() => {
    const loader = document.querySelector(`.${styles.loader}`);
    if (loader) {
      setTimeout(()=>{
        loader.classList.add(styles['fade-out']);
        setTimeout(()=>{
          loader.classList.add(styles['fade-out2']);
        },500)
      },1000)//로딩 개빨리되서 1초뒤에 끄게 만듬
    }
  }, []);

  const navi = useNavigate();

  interface User {
    id : string,
    password : string
  }

  const changeInput = (e:ChangeEvent)=> {
    let {name, value} = e.target as HTMLInputElement
    setUser({
      ...user,
      [name] : value
    })
  }
  
  const [user,setUser] = useState<User>({
    id : '',
    password : ''
  });
  
  const handleSubmit = (event:FormEvent)=>{
    event.preventDefault();
    api.get("http://localhost:8085/api/Account/login",{params: user})
      .then((result)=>{
        console.log("로그인 후 엑세스토큰 값 = "+result.data);
          localStorage.setItem('accessToken', result.data);
          alert("환영합니다.");
          window.location.reload();
      })
      .catch((error)=>{
        console.log(error);
        alert("아이디나 비밀번호가 맞지않습니다.");
        setUser({
          id : '',
          password : ''
        })
      })
  }

  const kakaoLogin = ()=>{
    const REDIRECT_URI = REDIRECT_URI_Base;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`;
    window.location.href = KAKAO_AUTH_URL;
    
  }

  return (
    <div className={styles["container"]}>

      {//이거 로딩창임
        <div className={styles["loader"]}> 
          <img src={logo} alt="로딩중 로고" />
        </div>
      }
      <div className={styles["login-container"]}>
        <img 
          src={logo} 
          alt="길이보임 로고" 
          className={styles["logo"]}
        />
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <input 
            type="id"
            name='id' 
            value={user.id}
            placeholder="아이디 입력" 
            className={styles["input"]}
            onChange={changeInput}
            required 
          />
          <input 
            type="password" 
            name='password'
            value={user.password}
            placeholder="비밀번호 입력" 
            className={styles["input" ]}
            onChange={changeInput}
            required 
          />
          <button type="submit" className={styles["login-button"]}>
            로그인
          </button>
        </form>
        <button name='kakao' onClick={kakaoLogin} className={styles["kakao-button"]}>
          카카오계정으로 로그인
        </button>
        <div className={styles["links"]}>
          <a onClick={()=>{navi("/search/Id")}}>아이디 찾기 / </a>
          <a onClick={()=>{navi("/search/Pwd")}}>비밀번호 찾기 / </a>
          <a onClick={()=>{navi("/join")}}>회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;