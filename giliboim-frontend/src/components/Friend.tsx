import React, { useEffect, useState } from 'react';
import styles from '../styles/common/Friend.module.css';
import Header from './Header';
import Footer from './Footer';
import api from '../config/customAxiosInterceptor';
import { initMembers, Member, Members } from '../type/user';
import logo from "../assets/images/giliboim-logo.png";

const Friend: React.FC = () => {

    const [friends, setFriends] = useState<Members>(initMembers);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddFriendPopupOpen, setIsAddFriendPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<Member | null>(null);
    const [searchNickname, setSearchNickname] = useState('');
    const [searchResults, setSearchResults] = useState<Member[]>([]);

    // 친구 목록 불러오기
    useEffect(() => {
        api.get<Members>('http://localhost:8085/api/mypage/friendList')
            .then((response) => {
                console.log(response.data);
                setFriends(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error("친구 목록을 불러오는데 실패했습니다.", error);
            });
    }, []);

    // 친구 추가 팝업 열기
    const handleAddFriendClick = () => {
        setIsAddFriendPopupOpen(true);
    };

    // 친구 추가 팝업 닫기
    const handleAddFriendCancel = () => {
        setIsAddFriendPopupOpen(false);
        setSearchNickname('');
        setSearchResults([]);
    };

    // 닉네임으로 사용자 검색
    const handleSearch = () => {
        api.get<Member[]>(`http://localhost:8085/api/mypage/search?nickname=${searchNickname}`)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error('사용자 검색에 실패했습니다.', error);
            });
    };

    // 특정 사용자를 친구로 추가
    const handleAddFriend = (memberNo:number) => {
        api.post('http://localhost:8085/api/mypage/addFriend', { memberNo })
            .then((response) => {
                setSearchNickname('');
                alert(response.data);
                handleAddFriendCancel(); // 팝업 닫기
            })
            .catch((error) => {
                console.error('친구 추가에 실패했습니다.', error);
            });
    };

    // 친구 삭제 팝업 열기
    const handleDeleteClick = (friend: Member) => {
        setSelectedFriend(friend);
        setIsDeletePopupOpen(true);
    };

    // 친구 삭제 팝업 닫기
    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
        setSelectedFriend(null);
    };

    // 친구 삭제 확인
    const handleConfirmDelete = () => {
        if (selectedFriend) {
            api.delete(`http://localhost:8085/api/mypage/deleteFriend/${selectedFriend.memberNo}`)
                .then(() => {
                    setFriends(friends.filter(friend => friend.memberNo !== selectedFriend.memberNo));
                    alert(`${selectedFriend.nickname} 님이 삭제되었습니다.`);
                })
                .catch((error) => {
                    console.error('친구 삭제에 실패했습니다.', error);
                })
                .finally(() => {
                    handleCancelDelete();
                });
        }
    };
    return (
        <>
            <Header/>  
            <div className={styles['div']}>
                <div className={styles["friend-header-container"]}>
                    <span className={styles["friend-header-title"]}>친구</span>
                    <button className={styles["add-friend-button"]} onClick={handleAddFriendClick}>+ 친구 추가</button>
                </div>
                <div className={styles["friend-list-container"]}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : friends.length > 0 ? (
                        <ul className={styles["friend-list"]}>
                            {friends.map((friend) => (
                                <li key={friend.memberNo} className={styles["friend-item"]}>
                                    <img
                                        src={friend.profile || logo}
                                        className={styles["friend-profile-image"]}
                                    />
                                    <span className={styles["friend-nickname"]}>{friend.nickname}</span>
                                    <button className={styles["delete-button"]} onClick={() => handleDeleteClick(friend)}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>친구가 없습니다.</p>
                    )}
                </div>

                {/* 친구 추가 팝업 */}
                {isAddFriendPopupOpen && (
                    <div className={`${styles['friend-popup']} ${styles['add-friend-popup']}`}>
                        <div className={`${styles['friend-popup-content']} ${styles['add-friend-popup-content']}`}>
                            <div className={styles["popup-header"]}>친구 추가</div>
                            <input
                                type="text"
                                placeholder="닉네임으로 검색"
                                value={searchNickname}
                                onChange={(e) => setSearchNickname(e.target.value)}
                                className={`${styles['popup-input']} ${styles['add-friend-input']}`}
                            />
                            <button onClick={handleSearch} className={styles["friend-search-button"]}>검색</button>

                            {searchResults.length > 0 && (
                                <ul className={styles["search-results"]}>
                                    {searchResults.map((user) => (
                                        <li key={user.memberNo} className={styles["search-result-item"]}>
                                            <img 
                                                src={user.profile || logo} 
                                                alt={user.nickname} 
                                                className={styles["search-result-image"]}
                                            />
                                            <span>{user.nickname}</span>
                                            <button onClick={() => handleAddFriend(user.memberNo)} className={styles["add-friend-button"]}>추가</button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {searchResults.length === 0 && searchNickname && (
                                <></>
                            )}

                            <button className={`${styles['cancel-button']} ${styles['add-friend-cancel-button']}`} onClick={handleAddFriendCancel}>취소</button>
                        </div>
                    </div>
                )}

                {/* 친구 삭제 팝업 */}
                {isDeletePopupOpen && selectedFriend && (
                    <div className={`${styles['friend-popup']} ${styles['delete-popup-content']}`}>
                        <div className={`${styles['friend-popup-content']} ${styles['delete-popup-content']}`}>
                            <p>정말 {selectedFriend.nickname} 님을 삭제하시겠습니까?</p>
                            <button className={styles["confirm-button"]} onClick={handleConfirmDelete}>확인</button>
                            <button className={styles["cancel-button"]} onClick={handleCancelDelete}>취소</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default Friend;
