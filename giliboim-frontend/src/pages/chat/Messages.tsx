import { useSelector } from "react-redux";
import { ChatMessage } from "./type";
import { RootState } from "../../store/store";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";


export default function Messages({chatMessages}:{chatMessages:ChatMessage[]}){

    const member = useSelector((state:RootState) => state.member);

    console.log(member);
    return (
        <>
        {
            chatMessages.map((chat)=> {
                return (
                    chat.memberNo == member.memberNo ?
                    <MyChat chat={chat}/> : <OtherChat chat={chat}/>
                )
            })
        }
    </>)
}