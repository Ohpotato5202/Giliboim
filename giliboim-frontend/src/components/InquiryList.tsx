import React, { useEffect, useState } from 'react';
import '../styles/common/InquiryList.css';
import { Inquires } from '../type/inquire';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../config/customAxiosInterceptor';
import Footer from './Footer';
import Header from './Header';

const InquiryList: React.FC = () => {
  
  // const inquiries = [
  //   { id: 1, title: "임대차건 보상소", content: "게시물 작성이 잘 안됩니다 확인 부탁드립니다.", status: "답변 대기중", type: "normal" },
  //   { id: 2, title: "cctv 위치 확인바랍니다.", content: "cctv3번 건 정도 표시해주시기 바랍니다.", status: "답변 완료", type: "normal" },
  //   { id: 3, title: "관리자에 의해 삭제된 문의입니다", content: "", status: "", type: "deleted" },
  //   { id: 4, title: "cctv 위치 확인바랍니다.", content: "cctv3번 건 정도 표시해주시기 바랍니다.", status: "답변 완료", type: "normal" },
  //   { id: 5, title: "cctv 위치 확인바랍니다.", content: "cctv3번 건 정도 표시해주시기 바랍니다.", status: "답변 완료", type: "normal" },
  // ];

  const [inquiries, setInquiries] = useState<Inquires>([]);

  useEffect(() => {
    api.get("http://localhost:8085/api/inquiries/list")
      .then((res)=> {
        setInquiries(res.data);
      }) 
      .catch((err)=> {
        console.log(err);
      })
  },[])


  return (
    <>
    <Header/>
    <div className="inquiry-list">
      <ul className="inquiry-items">
        {inquiries.map(inquiry => (
          <li key={inquiry.inquireNo} className={`inquiry-item ${inquiry}`}>
            <Link to={`/InquiryDetails/${inquiry.inquireNo}`}>
            <div className="inquiry-header">
              {inquiry.status == 'N' ? 
              (
                <span className={`inquiry-status pending`}>
                  답변 대기중 
                </span>
              ) :
              (
                <span className={`inquiry-status completed`}>
                  답변 완료
                </span>
              )
            }
            <p>제목 : {inquiry.title}</p>
            </div>
            <p>내용 : {inquiry.inquireContent}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="new-inquiry-button">
        <Link to="AskPage">
        <button>+ 문의하기</button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default InquiryList;
