import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// Axios 인스턴스 생성
const api = axios.create({
  withCredentials: true, // 쿠키 자동 전송 설정
});

api.interceptors.request.use(
  config => {
    // Authorization 헤더를 설정
    const accessToken = localStorage.getItem('accessToken');
    console.log("엑세스토큰 값 = " + accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config값 \n"+config);
    return config;
  },
  error => {
    // 요청이 오류로 끝난 경우 수행할 작업
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  
  response => {
    return response;
  },

  async error => {
    console.log("1");
    
    const originalRequest = error.config;
    const currentPath = window.location.pathname;

    // 특정 페이지에서는 인터셉터 로직을 실행하지 않음 << 로그인과 회원가입에선 실행안됨. 회원가입페이지들 하위요소로 모아서 바꾸기
    if (
          currentPath.startsWith('/search') || 
          currentPath.startsWith('/join')) {
          console.log("3");
      return Promise.reject(error);
    }

    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    if (error.response && error.response.status === 401 && originalRequest._retryCount < 1) {
      originalRequest._retryCount += 1;

      try {
        // Refresh Token을 사용하여 새로운 Access Token 요청
        console.log("5");
        const response = await axios.post('http://localhost:8085/api/Account/refreshToken', {}, { withCredentials: true });

        // 새로운 Access Token을 헤더에 추가
        const newAccessToken = response.data;
        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // 기존 요청의 Authorization 헤더를 새로 설정
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log(originalRequest.headers['Authorization']);
        // 기존 요청 재실행
        return api(originalRequest);

      } catch (refreshError) {
        alert("리프레쉬 없음 로그인이동");
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    // 여기 보통 올일없는데 뭔가 잘못짰으면 올듯?
    return Promise.reject(error);
  }
);


export default api;

