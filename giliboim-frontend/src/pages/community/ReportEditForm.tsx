import React, { useEffect, useState } from "react";
import "../../styles/community/ReportEditForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resetPost, setPost } from "../../features/postSlice";
import {
  addImages,
  removeImage,
  resetPostItem,
  setPostItem,
} from "../../features/postItemSlice";
import api from "../../config/customAxiosInterceptor";
import { PostItems } from "../../type/post";

const ReportForm: React.FC = () => {
  const navi = useNavigate();

  const dispatch = useDispatch();

  const post = useSelector((state: RootState) => state.post);

  // 전역으로 관리되는 이미지 첨부파일 상태 - 게시글 작성, 취소, 다른 페이지로 넘어갈때 초기화필요 (게시글도 마찬가지)
  const { images, previews } = useSelector(
    (state: RootState) => state.postItem
  );

  // useParam으로 가져온 원본 게시글 번호
  const { postNo } = useParams();

  // useEffect로 원본 게시글의 내용 조회
  useEffect(() => {
    api
      .get(`http://localhost:8085/api/community/detail/${postNo}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postNo, dispatch]); // postNo와 dispatch를 의존성 배열에 추가

  // 백엔드 서버에 저장되어 있는 url을 활용해서 이미지 파일 반환
  async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await api.get(url, { responseType: "blob" });
    const blob = response.data;
    return new File([blob], filename, { type: blob.type });
  }

  // 반환되는 이미지 파일들을 파일 배열, 백엔드 서버의 이미지 url 배열을 반환
  async function processPostImages() {
    const images: File[] = [];
    const previews: string[] = [];

    for (const imgInfo of post.postImgs) {
      const url = `http://localhost:8085/api/static/images/posts/${imgInfo.changeName}`; // 변경된 이름으로 파일 가져오기
      const filename = imgInfo.originalName;

      const image = await urlToFile(url, filename); // 비동기 함수를 통해 가져온 이미지 파일, await 필수

      images.push(image); // 실제 이미지 파일들
      previews.push(url); // 서버에서 찾을수 있는 이미지 미리보기 경로
    }
    return { images, previews };
  }

  // 서버에 저장된 기존의 이미지 정보를 반환받도록 하기
  useEffect(() => {
    (async () => {
      const postItems = await processPostImages(); // await은 비동기 함수에서 사용되어야 한다 - 동기적으로 처리
      dispatch(setPostItem(postItems));
    })();
  }, [post.postImgs, dispatch]); // post.postImgs와 dispatch를 의존성 배열에 추가


  // 인풋값 변경 핸들러(useInput의 함수를 수정)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setPost({ ...post, [name]: value }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 10 - images.length);
      const newPreviews = newImages.map((image) => URL.createObjectURL(image));

      dispatch(addImages({ images: newImages, previews: newPreviews }));
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    dispatch(removeImage(index));
  };


  // 게시글 수정 취소 함수
  const cancelSubmit = () => {
    if (window.confirm("게시글 수정을 취소하시겠습니까?")) {
      dispatch(resetPost());
      dispatch(resetPostItem());
      navi("/community");
    }
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
    api.put(`http://localhost:8085/api/community/update/${postNo}`, formData)
    .then((res) => {
      alert(res.data.msg);
      navi('/community'); // 성공 시 리디렉션
      dispatch(resetPost()); // 게시글 작성시 전역으로 상태되는 게시글, 게시글의 이미지 초기화
      dispatch(resetPostItem());
    })
    .catch((err) => {
      alert(err);
      dispatch(resetPost());
      dispatch(resetPostItem());
    });
  };

  return (
    <>
      <Header />
      <div className="report-form-container">
        
          <div className="photo-upload-section">
            <label className="photo-upload">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="photo-thumbnail">
                <span>📷</span>
                <span>{images.length}/10</span>
              </div>
            </label>
            {previews.map((preview, index) => (
              <div key={index} className="photo-preview">
                <img src={preview} alt={`preview-${index}`} />
                <button
                  className="remove-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="location-section">
            <label>
              <span>📍</span>
              <input
                className="typeText"
                type="text"
                placeholder="제보 위치 선택"
                id="roadAddress"
                name="roadAddress"
                value={post.roadAddress}
                onChange={handleInputChange}
                readOnly
                onClick={() => navi("/community/report/map")}
              />
            </label>
          </div>

          <div className="title-section">
            <label>
              기존 작성한 제목
              <input
                className="typeText"
                type="text"
                placeholder="제목"
                name="title"
                value={post.title}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="content-section">
            <label>
              기존에 작성한 내용 그대로 출력
              <textarea
                className="typeText"
                placeholder="내용을 입력하세요."
                name="content"
                value={post.content}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="buttons-section">
          <button type="submit" className="submit-button"
          onClick={handleSubmit}>
              수정
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={cancelSubmit}
            >
              취소
            </button>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportForm;
