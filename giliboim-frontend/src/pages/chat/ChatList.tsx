import { useEffect, useState } from "react";
import { ChatRoom } from "./type";
import { useNavigate } from "react-router-dom";
import api from "../../config/customAxiosInterceptor";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../styles/common/ChatList.css';
import logo from '../../assets/images/giliboim-logo.png';
import search from '../../assets/images/search-icon.png';

export default function ChattingRoomList() {
    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
    const [keyword, setKeyword] = useState('');
    const navi = useNavigate();

    const chatRoom = () => {
        api.get("http://localhost:8085/api/chat/chatRoomListSearch/" + keyword)
            .then((response) => {
                setChatRoomList(response.data);
            })
            .catch(error => {
                console.error("검색 실패했습니다.", error);
            });
    }

    useEffect(() => {
        // 채팅방 목록 API 호출
        api.get("http://localhost:8085/api/chat/chatRoomList")
            .then((response) => {
                console.log("채팅방 데이터:", response.data); // 데이터 확인
                setChatRoomList(response.data);
            })
            .catch(error => {
                console.error("채팅방 목록을 불러오는데 실패했습니다.", error);
            });
    }, []);

    return (
        <>
            <Header />
            <section className="chat-room-list">
                <div className="search-bar">
                    <input
                        type="text"
                        value={keyword}
                        placeholder="이름(초성), 전화번호 검색"
                        className="search-input"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button onClick={chatRoom} className="search-button">
                        <img src={search} alt="search" />
                    </button>
                </div>
                <div className="list-wrapper">
                    <ul className="list-ul">
                        {chatRoomList.length === 0 ? (
                            <li className="empty-list">채팅방이 없습니다.</li>
                        ) : (
                            chatRoomList.map((chatRoom) => {
                                return (
                                    <li
                                        key={chatRoom.chatRoomNo}
                                        className="list-item"
                                        onClick={() => navi("/Chat/ChatRoom/" + chatRoom.chatRoomNo)}
                                    >
                                        <div className="profile-section">
                                            <img
                                                src={chatRoom.profile ?  (`http://localhost:8085/api/static/images/profile/${chatRoom.profile}`) : (logo)}
                                                alt={`${chatRoom.nickname} 프로필`}
                                                className="profile-image"
                                            />
                                        </div>
                                        <div className="chat-info">
                                            <div className="nickname">{chatRoom.nickname}</div>
                                            <div className="last-message">{chatRoom.lastMessage}</div>
                                        </div>
                                        <div className="chat-meta">
                                            <span className="timestamp">
                                                
                                                { chatRoom.lastMessageTime != null ?  (new Date(chatRoom.lastMessageTime).toLocaleString()) : (<></>)}
                                            </span>
                                            {chatRoom.unreadCount > 0 && (
                                                <div className="unread-count">
                                                    {chatRoom.unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}
