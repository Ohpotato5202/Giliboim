import React, { useState } from 'react';
import '../styles/community/AskPage.css';
import { initInquire, Inquire } from '../type/inquire';
import useInput from '../hook/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../config/customAxiosInterceptor';
import Header from './Header';
import Footer from './Footer';


const AskPage: React.FC = () => {

  const [inquire, setInquire, handleInputChange] = useInput<Inquire>(initInquire);
  const [message, setMessage] = useState('');
  const navi = useNavigate();

  // 문의 작성 요청을 서버로 전송하는 함수 
  const submitInquiy = () => {
    if(!(inquire.title && inquire.inquireContent) ){
      alert("삐빅 잘못된 입력!");
      return;
    }
    api.post("http://localhost:8085/api/inquiries/AskPage", inquire)
      .then((res) => {
        const {msg, inquireNo} = res.data;
        console.log(msg,inquireNo);
        alert(msg);
        navi("/InquiryDetails/"+inquireNo); 
      })
      .catch((err)=>{
        console.log(err);
      })
    

  };

  return (
    <>
    <Header/>
    <div className="ask-page">
      <h2>문의하기</h2>
      
        <div className="title-box">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="제목"
              className="form-control"
              name='title'
              value={inquire.title}
              onChange={handleInputChange}
              />
          </div>
        </div>
        <div className="content-box">
          <div className="form-group">
            <label htmlFor="content">문의 내용</label>
            <textarea
              id="content"
              placeholder="내용을 입력하세요."
              className="form-control"
              name='inquireContent'
              value={inquire.inquireContent}
              onChange={handleInputChange}
              />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button" onClick={() => {
            submitInquiy();
            setInquire(initInquire);
          }}>등록</button>
          <button type="button" className="cancel-button" onClick={() => {setInquire(initInquire)}}>취소</button>
        </div>
      {message && <p>{message}</p>}
    </div>
    <Footer/>
    </>
  );
};

export default AskPage;
