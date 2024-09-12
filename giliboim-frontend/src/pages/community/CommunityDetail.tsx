import React, { useEffect, useState } from 'react';
import '../../styles/community/CommunityDetail.css'; // CSS 파일을 분리하여 스타일을 적용합니다.
import KakaoMap from '../../components/KakaoMap';
import { initComment, initPost, Post, PostComment, PostComments } from '../../type/post';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/images/giliboim-logo.png';
import { initMember, Member } from '../../type/user';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AdminAsk from './../admin/AdminAsk';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { initPosition, Position } from '../../type/route';
import api from '../../config/customAxiosInterceptor';
import getMemberNo from '../../config/getMemberNo';
import reportMarker from '../../assets/images/report-marker.png';

const CommunityDetail: React.FC = () => {
  const { postNo } = useParams<{ postNo: string }>(); // URL에서 postNo를 가져옵니다
  const [post, setPost] = useState<Post>(initPost);
  const [comments, setPostComments] = useState<PostComments>([]);
  const [comment, setComment] = useState<PostComment>(initComment);
  const [position, setPosition] = useState<Position>(initPosition); 

  const navi = useNavigate();
  const memberNo = getMemberNo();

  useEffect(() => {
    console.log(postNo);
    // 게시글 상세 조회
    api.get(`http://localhost:8085/api/community/detail/${postNo}`)
      .then((res) => {
        setPost(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postNo]);
  
  useEffect(() => {
    if (post.postNo) {
      // 게시글을 제보한 위치 가져오기 
      api.get(`http://localhost:8085/api/route/searchPointByAddress`,
        { params: { address: post.roadAddress } }
      )
        .then((res) => {
          const { x, y } = res.data.response.result.point;
          setPosition({ lat: y, lng: x });
        })
        .catch((err) => {
          console.log(err);
        })
      
      // 특정 게시글에 대한 댓글 목록 가져오기
      api.get(`http://localhost:8085/api/community/detail/${postNo}/comments`)
      .then((res) => {
        setPostComments(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [post.postNo]);

  if (!post) return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 메시지를 표시

  // 좋아요 누르기 로직 
  const handleLikeClick = () => {
    api.post(`http://localhost:8085/api/community/like/${postNo}`) 
      .then((res) => {
        alert(res.data.msg); 
        setPost({ ...post, likeCount: res.data.likeCount }); // 조회한 기존 게시글의 상태를 유지 + 좋아요수만 변경
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 작성 로직 
  const submitComment = () => {
    if (!comment.content) {
      alert("내용을 작성해주세요");
      return; 
    }
    api.post(`http://localhost:8085/api/community/detail/${postNo}/comment`, comment)
      .then((res) => {
        alert(res.data.msg);
        setPostComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 게시글 삭제 로직
  const handlePostDeleteButton = () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      return;
    }

    api.delete(`http://localhost:8085/api/community/delete/${postNo}`)
      .then((res) => {
        alert(res.data.msg);
        navi("/community");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 삭제 로직
  const handleCommentDeleteButton = (pcNo: number) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    api.delete(`http://localhost:8085/api/community/delete/comment/${pcNo}/${postNo}`)
      .then((res) => {
        alert(res.data.msg);
        setPostComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 게시글 신고 페이지로 이동
  const reportPage = () => {
    navi("/community/complain", { state: { postNo, commentNo: null } }); // 게시글 신고 시 commentNo는 null로 설정
  };

  // 댓글 신고 페이지로 이동
  const reportCommentPage = (index: number) => {
    // 댓글의 순서(index + 1)를 기반으로 신고 페이지로 이동하고 순서를 전달합니다.
    navi("/community/complain", { state: { postNo, commentNo: index + 1 } });
  }

  const [editingCommentPcNo, setEditingCommentPcNo] = useState(0);
  const [editedComment, setEditedComment] = useState('');

  const handleEditClick = (pcNo: number, content: string) => {
    setEditingCommentPcNo(pcNo);
    setEditedComment(content);
  };

  const handleConfirmClick = (pcNo: number) => {
    api.put(`http://localhost:8085/api/community/update/comment/${pcNo}/${postNo}`, 
      { editedComment: editedComment }
    )
      .then((res) => {
        setPostComments(res.data.comments);
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditingCommentPcNo(0);
  };

  const handleCancelClick = () => {
    setEditingCommentPcNo(0);
    setEditedComment('');
  };

  return (
    <>
      <Header />
      <div className="community-detail-container">
        <div className="location-header">
          <span className="location-icon">📍</span>
          <span className="location-text">{post.roadAddress}</span> 
        </div>

        <div className="map-container">
          <div className="map">
            <Map
              center={position}
              style={{width:"100%", height:"100%"}}
            >
              <MapMarker
                position={position}
                image={{
                  src: reportMarker,
                  size: {
                    width: 30,
                    height: 30
                  }
                }}
              />
            </Map>
          </div>
        </div>

        <div className="profile-header">
          <img src={logo} alt={`${post.memberNo} 프로필`} className="comment-post-profile-image" />
          <div className="profile-name">{post.nickname}</div>
        </div>

        <div className="post-detail-content">
          <div className="post-title">{post.title}</div>
          <div className="post-meta">
            <div className='like-container'>
              <button className="like-button" onClick={handleLikeClick} />
              <span className="like-count">{post.likeCount}</span>
            </div>

            {
              memberNo !== post.memberNo ?  // 게시글을 작성하지 않은 사람이라면 신고 버튼이, 작성한 사람이면 수정, 삭제 버튼이 나옴
                (<button className="notify-button" onClick={reportPage} />) : (
                  <>
                    <button className='edit-button' onClick={() => navi("/community/edit/" + postNo)}>수정</button> 
                    <button className='delete-item-button' onClick={handlePostDeleteButton}>삭제</button>
                  </>
                ) 
            }
          </div>
          <div className="post-body">
            <div className='post-texts'>{post.content}</div>
            {post.postImgs.length !== 0 ?
              (
                <div className='post-imgs'>
                {
                  post.postImgs.map((value) => {
                    return (
                      <img className='post-image' src={`http://localhost:8085/api/static/images/posts/${value.changeName}`} />
                    )
                  })
                }
                </div>
              )
              : ''}
          </div>
          <div className="post-date">작성날짜: {post.createDate}</div>
        </div>

        <div className="comments-section">
          {
            comments.map((comment, index) => { // index는 게시글 내에서의 댓글 순서를 나타냄
              return(
              <div className="comment-header" key={comment.pcNo}>
                <div className="comment-post-profile-image" style={{ backgroundImage: `url("http://localhost:8085/api/static/images/profile/${comment.profile}")`}}/>
                <div className="profile-name">{comment.nickname}</div>
                {
                  editingCommentPcNo === comment.pcNo ? (
                    <div className="comment-edit-input">
                      <input 
                        type="text" 
                        value={editedComment} 
                        onChange={(e) => setEditedComment(e.target.value)} 
                      />
                      <button className='edit-button' onClick={() => handleConfirmClick(comment.pcNo)}>확인</button>
                      <button className='delete-item-button' onClick={handleCancelClick}>취소</button>
                    </div>
                  ) : (
                    <div className="comment-content">{comment.content}</div>
                  )
                }
                
                {
                  memberNo !== comment.memberNo ?  
                    (<button className="notify-button" onClick={() => reportCommentPage(index)} />)  // 댓글 신고 버튼
                    :
                    (<>
                        {editingCommentPcNo !== comment.pcNo && (
                          <>
                            <button className='edit-button' onClick={() => handleEditClick(comment.pcNo, comment.content)}>수정</button>
                            <button className='delete-item-button' onClick={() => { handleCommentDeleteButton(comment.pcNo)}}>삭제</button>
                          </>
                        )}
                      </>
                    )
                }
              </div>
              )
            })
          }
        </div>

        <div className="comment-input">
          <input type="text" placeholder="댓글 입력 창" onChange={(e) => {
            setComment({...comment, content : e.target.value})
          }} />
          <button id="send-button" onClick={submitComment}>작성</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityDetail;
