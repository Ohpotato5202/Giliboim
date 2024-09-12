import { KeyboardEvent, useEffect, useRef, useState } from "react";
import SockJs from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { useParams, useNavigate } from "react-router-dom"; // <-- useNavigate 추가
import { useDispatch, useSelector } from "react-redux";
import { ChatMessage } from "./type";
import { Member } from "../../type/user";  // User 타입을 가져옴
import api from "../../config/customAxiosInterceptor";
import { setMember } from "../../features/memberSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { RootState } from "../../store/store";
import '../../styles/common/ChatRoom.css';

export default function ChattingRoom() {
    const { chatRoomNo } = useParams<{ chatRoomNo: string }>();
    const [webSocket, setWebSocket] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // <-- useNavigate 훅 사용
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLLIElement>(null); // <--- HTMLLIElement 타입 지정
    
    const member : Member = useSelector((state:RootState) => state.member);  // 현재 로그인한 사용자 정보

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatRoomMembers, setChatRoomMembers] = useState<Member[]>([]);

    const url = 'http://localhost:8085/api';

    useEffect(()=> {
        api.get(`${url}/chat/member`)
            .then((res)=>{
                dispatch(setMember(res.data));
            })
            .catch((err)=> {    
                console.log(err);                
            })
    }, []); 

    useEffect(() => {
        if (!chatRoomNo) return;

        const createWebSocket = () => new SockJs(url + "/stompServer");

        const stompClient = new Client({
            webSocketFactory: createWebSocket,
            reconnectDelay: 10000,
            onConnect: () => {
                stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/message`, (frame) => {
                    const message = JSON.parse(frame.body);
                    console.log('New message received:', message); // <--- 메시지 수신 시 콘솔 출력
                    setChatMessages(prevState => [...prevState, message]);
                });

                stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/members`, (frame) => {
                    const members = JSON.parse(frame.body);
                    setChatRoomMembers(members);
                });
            }
        });

        stompClient.activate();
        setWebSocket(stompClient);

        api.get(`${url}/chat/chatMessage/chatRoomNo/${chatRoomNo}`)
            .then(res => {
                console.log('Messages fetched from server:', res.data); // <--- 서버에서 메시지 가져올 때 콘솔 출력
                setChatMessages(res.data);
            })
            .catch(error => console.error("메시지를 불러오는데 실패했습니다.", error));

        api.get(`${url}/chat/chatRoomJoin/chatRoomNo/${chatRoomNo}`)
            .then(res => setChatRoomMembers(res.data))
            .catch(error => console.error("채팅방 멤버 정보를 불러오는데 실패했습니다.", error));

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [chatRoomNo]);

    // 메시지 수신 또는 전송 시 스크롤을 맨 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const submitMessage = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (!message || !member || !webSocket) return;

        const chatMessage = {
            chatRoomNo: chatRoomNo!,
            memberNo: member.memberNo,
            chatText: message,
            createDate: new Date().toISOString()  // 현재 시간을 ISO 형식으로 저장
        };

        webSocket.publish({
            destination: `/chat/sendMessage/chatRoomNo/${chatRoomNo}`,
            body: JSON.stringify(chatMessage)
        });
        
        setMessage('');
    };

    const scrollToBottom = () => {
        if (bottomRef.current) { // null 체크 추가
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 나가기 버튼 클릭 핸들러
    const handleExit = () => {
        if (webSocket) {
            webSocket.deactivate(); // 웹소켓 연결 해제
        }
        navigate('/Chat/ChatList'); // 채팅방 목록으로 이동
    };

    // 날짜 포맷팅 함수
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()];
        return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
    };

    // 시간 포맷팅 함수
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        console.log('Formatting time for date:', date); // <--- 변환된 Date 객체 확인
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };

    return (
        <>
        <Header/>
        <div className="main">
            <div className="chatting-area">
                <div className="chat-header">
                    <div className="chat-header-left">
                        {chatRoomMembers.filter(memberItem => memberItem.memberNo !== member.memberNo)
                            .map((filteredMember) => (
                                <h2 key={filteredMember.memberNo}>{filteredMember.nickname}</h2>
                        ))}
                    </div>
                    <button className="btn1 btn1-outline-danger exit-button" onClick={handleExit}>나가기</button> {/* handleExit 함수 연결 */}
                </div>
    
                <ul className="display-chatting">
                    {/* 날짜 구분선을 위한 로직 추가 */}
                    {chatMessages.map((chatMessage, index) => {
                        const messageDate = new Date(chatMessage.createDate);
                        const previousMessageDate = index > 0 ? new Date(chatMessages[index - 1].createDate) : null;
                        const showDateDivider = !previousMessageDate || messageDate.toDateString() !== previousMessageDate.toDateString();

                        return (
                            <div key={index}>
                                {showDateDivider && ( // 날짜가 변경되면 날짜 구분선을 표시합니다.
                                    <li className="date-divider">
                                        <span>{formatDate(messageDate)}</span>
                                    </li>
                                )}
                                <li 
                                    className={`chat-message ${chatMessage.memberNo === member.memberNo ? 'my-message' : 'other-message'}`}
                                >
                                    <div className={`message-bubble ${chatMessage.memberNo === member.memberNo ? 'sent' : 'received'}`}>
                                        {chatMessage.chatText}
                                        <span className="message-time">{formatTime(chatMessage.createDate)}</span>
                                    </div>
                                </li>
                            </div>
                        );
                    })}
                    <li ref={bottomRef}></li>
                </ul>
    
                <div className="input-area">
                    <textarea rows={2} name="message"  
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={submitMessage}
                    ></textarea>
                    <button className="send-button" onClick={sendMessage}>전송</button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}
