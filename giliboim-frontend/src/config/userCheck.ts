import base64 from 'base-64';
import { useEffect, useState } from 'react';

const useUserCheck = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("accessToken");
        let userPayload = null;
        let userAuthority = null;

        if (userInfo != null) {
            userPayload = userInfo.substring(userInfo.indexOf('.') + 1, userInfo.lastIndexOf('.'));
            userPayload = base64.decode(userPayload);

            const parsPayload = JSON.parse(userPayload);

            userAuthority = parsPayload.admin;
            setToken(userAuthority);
        }

        console.log(userInfo);
    }, []); // 빈 의존성 배열을 사용하여 처음에만 실행되도록 설정

    return token;
}

export default useUserCheck;
