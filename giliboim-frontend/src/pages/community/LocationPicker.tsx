import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import KakaoMap from '../../components/KakaoMap'; // KakaoMap 컴포넌트를 사용
import '../../styles/community/LocationPicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setPost } from '../../features/postSlice';
import SearchMap from './map/SearchMap';

const LocationPicker: React.FC = () => {
  
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (post.roadAddress == '잘못된 주소입니다.' || post.roadAddress == '') {
      alert('잘못된 주소입니다. 다시 선택해주세요');
      return;
    }
    navigate('/community/report');
  };

  return (
    <>
    <Header/>
    <div className="location-picker-container">
      <div className="address-search-bar">
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={post.roadAddress}
          readOnly
          onChange={(e) => {
            dispatch(setPost({...post, roadAddress:e.target.value}))
          }}
          />
        {/* <button onClick={() => handleSearch()}>🔍</button> */}
        <button className="search-confirm-button" onClick={handleConfirm}>확인</button>
      </div>

      <div className="map-container">   
        <SearchMap/>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LocationPicker;
