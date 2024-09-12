import { Member } from "../../type/user"


export default function ChatRoomMembers({ chatRoomMembers }: { chatRoomMembers: Member[] }) {
    return (
        <div className="chat-room-members">
            <h4>참여자 목록</h4>
            <ul className="chat-room-members-ul">
                {
                    chatRoomMembers.map(member => {
                        return (
                            <li key={member.memberNo}>
                               <span className={"user-status "+(member.loginStatus == 'y' ? 'online' : 'offline')}></span>{member.nickname}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
