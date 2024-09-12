
import base64 from 'base-64';

const getMemberNo = () => {
    const userInfo = localStorage.getItem("accessToken");
    let userPayload = null;
    let memberNo = null; 

    if (userInfo) {    
        try {
            userPayload = userInfo.split('.')[1];
            userPayload = userPayload.replace(/-/g, '+').replace(/_/g, '/');
            userPayload = base64.decode(userPayload);

            const parsedPayload = JSON.parse(userPayload);

            memberNo = parsedPayload.sub;
        }
        catch(error) {
            console.log("토큰 디코딩 에러 발생");
        }
    }
    return memberNo;
}

export default getMemberNo;