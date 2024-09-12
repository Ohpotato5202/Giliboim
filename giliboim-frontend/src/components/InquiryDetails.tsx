import React, { useEffect, useState } from 'react';
import '../styles/common/InquiryDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useInput from '../hook/useInput';
import { initInquire, Inquire } from '../type/inquire';
import api from '../config/customAxiosInterceptor';
import Header from './Header';
import Footer from './Footer';


const InquiryDetails: React.FC = () => {
    
    const [inquire, setInquire ] = useInput<Inquire>(initInquire);
    const { inquireNo } = useParams();
    console.log(inquireNo);
    
    useEffect(() => {
        api.get('http://localhost:8085/api/inquiries/'+ inquireNo)
            .then((res) => {
                console.log(res.data);
                setInquire(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
        <Header/>
        <div className="container">
            <div className="inquiry-title">
                <label className="title-label">제목</label>
                <div className="text-box">{inquire.title}</div>
            </div>
            <div className="inquiry-content">
                <label className="title-label">문의 내용</label>
                <div className="text-box">{inquire.inquireContent}</div>
            </div>
            <div className="admin-response">
                <label className="title-label">관리자 답변</label>
                <div className="text-box">{inquire.answerContent || "아직 답변이 없습니다."}</div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default InquiryDetails;
