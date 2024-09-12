import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Member } from '../../type/user'; // Member 타입을 가져옵니다
import '../../styles/admin/AdminAskList.css';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';
import { initPageInfo, PageInfo } from '../../type/PageInfo';
import Pagination from '../../components/Pagination';

interface InquiryItem {
  inquireNo: number;
  memberNo: number;
  title: string;
  inquireContent: string;
  createDate: string;
  status: string;
  answerContent: string | null;
  checked: boolean;
  nickname: string;
}

const AdminAskList: React.FC = () => {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);
  const itemsPerPage = 13; // 페이지당 항목 수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


  // 쿼리스트링 값을 이용하기 위한 코드
  const locate = useLocation();
  const queryString = locate.search;


  useEffect(()=> {
    // 문의 목록 조회
    api.get(`http://localhost:8085/api/admin/inquiries${queryString}`)
      .then((res)=> {
        console.log(res.data);
        setItems(res.data.inquireList);
        setPageInfo(res.data.pi);
      })
      .catch((err)=> {
        console.log(err);
      })

  }, [queryString])

  const toggleCheck = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.inquireNo === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = async (id: number) => {
  try {
    // 서버에 삭제 요청
    await api.delete(`http://localhost:8085/api/admin/inquiry/${id}`);
    
    // 성공적으로 삭제된 경우, UI에서도 항목을 삭제
    setItems(prevItems => 
      prevItems.filter(item => item.inquireNo !== id)
    );
  } catch (error) {
    console.error('Failed to delete inquiry:', error);
  }
};


  const handleItemClick = (id: number) => {
    if (id !== -1) {
      console.log("Clicked ID:", id);
      navigate(`/admin/AdminAsk/${id}`);
    }
  };

  return (
    <>
    <div className="admin-ask-list-container">
      <AdminHeader title="문의 관리" />
      <ul className="ask-items">
        {currentItems.map((item, index) => (
            <li key={index} className="ask-item" onClick={() => handleItemClick(item.inquireNo)}>
                <div onClick={(e) => { e.stopPropagation(); toggleCheck(item.inquireNo); }} className="checkbox">
                    {item.checked ? (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 13.75L15 17.5L27.5 5M26.25 15V23.75C26.25 24.413 25.9866 25.0489 25.5178 25.5178C25.0489 25.9866 24.413 26.25 23.75 26.25H6.25C5.58696 26.25 4.95107 25.9866 4.48223 25.5178C4.01339 25.0489 3.75 24.413 3.75 23.75V6.25C3.75 5.58696 4.01339 4.95107 4.48223 4.48223C4.95107 4.01339 5.58696 3.75 6.25 3.75H20" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.25 26.25C5.5625 26.25 4.97396 26.0052 4.48438 25.5156C3.99479 25.026 3.75 24.4375 3.75 23.75V6.25C3.75 5.5625 3.99479 4.97396 4.48438 4.48438C4.97396 3.99479 5.5625 3.75 6.25 3.75H23.75C24.4375 3.75 25.026 3.99479 25.5156 4.48438C26.0052 4.97396 26.25 5.5625 26.25 6.25V23.75C26.25 24.4375 26.0052 25.026 25.5156 25.5156C25.026 26.0052 24.4375 26.25 23.75 26.25H6.25ZM6.25 23.75H23.75V6.25H6.25V23.75Z" fill="#1D1B20"/>
                        </svg>
                    )}
                </div>
                {item.title ? (
                    <>
                        <span>{item.nickname} 님이 문의하신 내용입니다.</span>
                        <button className="delete-button" onClick={(e) => { e.stopPropagation(); deleteItem(item.inquireNo); }}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </>
                ) : (
                  <span>&nbsp;</span>
                )}
              </li>
        ))}
  
        <Pagination pageInfo={pageInfo}/>
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default AdminAskList;
