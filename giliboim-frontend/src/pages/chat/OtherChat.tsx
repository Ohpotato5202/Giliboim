import { ChatMessage } from "./type";

export default function OtherChat({chat}:{chat:ChatMessage}){
    return(
        <li>
           <div>
            <img src={chat.profile} style={{width:'30px', borderRadius:'50px'}} />
            <b>{chat.nickName}</b>
           </div>
           <p className="chat">{chat.chatText}</p>
           <span className="chatDate">{chat.createDate}</span>

        </li>
    )
}