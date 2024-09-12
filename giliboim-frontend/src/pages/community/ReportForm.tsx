import React, { useEffect, useState } from 'react';
import '../../styles/community/ReportForm.css';
import { useNavigate } from 'react-router-dom';
import { initPost, Post } from '../../type/post';
import useInput from '../../hook/userInput';
import Footer from '../../components/Footer';
import Header from './../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetPost, setPost } from '../../features/postSlice';
import api from '../../config/customAxiosInterceptor';
import { addImages, removeImage, resetPostItem, setPostItem } from '../../features/postItemSlice';


const ReportForm: React.FC = () => {

  const dispatch = useDispatch();

  // Redux에서 post 상태를 가져오기 
  const post = useSelector((state: RootState) => state.post);

  // 인풋값 변경 핸들러(useInput의 함수를 수정)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setPost({ ...post, [name]: value }));
  }

  // 전역으로 관리되는 이미지 첨부파일 상태 - 게시글 작성, 취소, 다른 페이지로 넘어갈때 초기화필요 (게시글도 마찬가지)
  const { images, previews} =  useSelector((state: RootState) => state.postItem);

  const navi = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 10 - images.length);
      const newPreviews = newImages.map(image => URL.createObjectURL(image));

      dispatch(addImages({ images: newImages, previews: newPreviews }))
    }
  };

  const handleRemoveImage = (index: number) => {

    URL.revokeObjectURL(previews[index]);
    dispatch(removeImage(index));
  };

  const handleSubmit = () => {

    // 작성된 데이터가 없을때
    if (!(post.title && post.content && post.roadAddress)) {
      alert("필수 입력사항입니다.");
      return;
    }

    // 폼데이터 생성
    const formData = new FormData();
    
    formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }));
    if(images.length > 0) {
        // files는 사용자가 업로드한 파일 배열
        for (let i = 0; i < images.length; i++) {
          formData.append('files', images[i]);
      }
    }

    // Axios를 통해 데이터 전송
    api.post('http://localhost:8085/api/community/submit', formData)
    .then((res) => {
      alert(res.data.msg);
      navi('/community'); // 성공 시 리디렉션
      dispatch(resetPost); // 게시글 작성시 전역으로 상태되는 게시글, 게시글의 이미지 초기화
      dispatch(resetPostItem);
    })
    .catch((err) => {
      alert(err);
      dispatch(resetPost);
      dispatch(resetPostItem);
    });
  };

  // 게시글 작성 취소 함수 
  const cancelSubmit = () => {
    if (window.confirm('게시글 작성을 취소하시겠습니까?')) {
      dispatch(resetPost());
      dispatch(resetPostItem());
      navi('/community');
    }
  }

  return (
    <>
    <Header/>
    <div className="report-form-container">
        <div className="photo-upload-section">
          <label className="photo-upload">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <div className="photo-thumbnail">
              <span>📷</span>
              <span>{images.length}/10</span>
            </div>
          </label>
          {previews.map((preview, index) => (
            <div key={index} className="photo-preview">
              <img src={preview} alt={`preview-${index}`} />
              <button className="remove-button" onClick={() => handleRemoveImage(index)}>✖</button>
            </div>
          ))}
        </div>

        <div className="location-section">
          <label>
            <span>📍</span>
            <input 
              type="text" 
              placeholder="제보 위치 선택" 
              id='roadAddress'
              name='roadAddress'
              value={post.roadAddress}
              onChange={handleInputChange}
              readOnly
              onClick={()=> navi('/community/report/map')}
            />
          </label>
        </div>

        <div className="title-section">
          <label>
            제목
            <input 
              type="text" 
              placeholder="제목"
              id='title'
              name='title' 
              value={post.title}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="content-section">
          <label>
            글작성
            <textarea 
              placeholder="내용을 입력하세요." 
              name='content' 
              id='content'
              value={post.content}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="buttons-section">
          <button type="submit" className="submit-button" onClick={handleSubmit}>등록</button>
          <button type="button" className="cancel-button" onClick={cancelSubmit}>취소</button>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default ReportForm;
