import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ()=>{

    const navi = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    useEffect(() => {
        if (token) {
            localStorage.setItem('accessToken', token);
            alert("소셜로그인 성공");
            navi("/");
        } else {
            alert("토큰이 없습니다. 로그인 실패.");
        }
    }, [token, navi]);
    
    return null;
}

export default SocialLogin;