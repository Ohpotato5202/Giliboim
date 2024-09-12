import { ChatMessage } from "./type";

export default function MyChat({chat}:{chat:ChatMessage}){
    return (
        <li className="myChat">
            <span className="chatDate">{chat.createDate}</span>
            <p className="chat">{chat.chatText}</p>
        </li>
    )
}