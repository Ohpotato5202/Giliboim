import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from '../../styles/common/SearchId.module.css';
import logo from '../../assets/images/giliboim-logo.png';
import phone from 'phone';
import { useNavigate } from 'react-router-dom';
import api from '../../config/customAxiosInterceptor';

const SearchId: React.FC = () => {
  const [isVerificationStage, setIsVerificationStage] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // 휴대전화 번호 상태
  const [code, setCode] = useState('');
  const [searchIdEnd, setSearchIdEnd] = useState(false);
  const [id, setId] = useState('');
  const navi = useNavigate();

  const MINUTES_IN = 180; // 3분
  const INTERVAL = 1;
  const [timer, setTimer] = useState<number>(MINUTES_IN); // 5 minutes in seconds

  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimer((prevTime) => {
        const newTime = prevTime - INTERVAL;
        if (newTime <= 0) {
          clearInterval(timer); // 시간이 다 되면 인터벌 해제
          setIsTimerRunning(false); // 타이머 실행 상태를 종료
          alert("제한시간이 종료되었습니다. 다시 시도바랍니다.");
          return 0; // 시간이 음수가 되지 않도록 0 반환
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning]);

  const handleIdSearch = () => {
    const phoneFormat = phone(phoneNumber, { country: "KOR" });

    if (phoneFormat.isValid) {

      api.post("http://localhost:8085/api/phoneVerify/send", null, { params: { phoneNumber: phoneFormat.phoneNumber } })
        .then(result => {
          if (result.data < 5) {
            setPhoneNumber(phoneFormat.phoneNumber);
            setIsVerificationStage(true);
            handleResendCode();
            alert("인증번호가 발송되었습니다.");
          }
          else {
            const time = (result.data + 100).toString().substr(1, 4);
            const resultTime = time.substr(0, 2) + '시' + time.substr(2, 2) + '분';
            alert(`최근 한시간내에 5회이상 인증요청 시도가 있었습니다.\n${time} 이후부터 가능합니다.`);
          }
        })
    } else {
      showAlert('유효하지 않은 번호입니다.');
    }
  };

  const handleResendCode = () => {
    setIsTimerRunning(true);
    setTimer(MINUTES_IN);
  };

  const showAlert = (message: string) => {
    window.alert(message);
    if (navigator.vibrate) {
      navigator.vibrate(200); // 진동 200ms
    }
    setPhoneNumber(''); // 입력한 값 초기화
  };

  const handleVerify = () => {
    api.post("http://localhost:8085/api/phoneVerify/verify", null, { params: { phoneNumber: phoneNumber, code: code } })
      .then(result => {
        if (result.data == 1) {
          api.get("http://localhost:8085/api/Account/searchId", {
            params: { phone: phoneNumber }
          })
            .then((result) => {
              if (result.data == null) {
                alert("전화번호에 해당되는 아이디가 없습니다.");
                return;
              }
              setIsTimerRunning(false);
              clearInterval(timer);
              setSearchIdEnd(true);
              setId(result.data);
            })
        } else {
          alert("인증번호가 다릅니다.");
        }
      });
  }

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className={styles['search-id-container']}>
      <div className={styles['search-id-content']}>
        {/* 이미지 삽입 위치 */}
        <div className={styles['logo-container']}>
          <img src={logo} alt="길이보임 로고" className={styles['logo']} />
        </div>

        {
          !searchIdEnd ? (
            !isVerificationStage ? (
              <div>
                <input
                  type="text"
                  placeholder="휴대전화 번호"
                  className={styles["inputField"]}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br />
                <button onClick={handleIdSearch} className={styles["action-button"]}>인증번호 발송</button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="휴대전화 번호"
                  id='searchid'
                  className={`${styles['inputField']} ${isVerificationStage ? styles['disabled'] : ''}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isVerificationStage} // 인증 단계에서는 비활성화
                />
                <div className={styles["verification-container"]}>
                  <input type="text" placeholder="인증번호" className={styles["input-number"]}
                    value={code} onChange={(e) => { setCode(e.target.value) }} />
                  <button onClick={handleIdSearch} className={styles["resend-button"]}>재전송</button>
                  <span className={styles["timer"]}>{formatTime()}</span>
                </div>
                <button onClick={handleVerify} className={styles["action-button"]}>
                  아이디 찾기
                </button>
              </div>
            )
          ) : (
            <div>
              <div style={{fontSize : '30px'}}>아이디</div>
              <br></br>
              <div style={{fontSize : '30px'}}>{id}</div>
              <br></br>
              <button onClick={()=>{navi("/")}}>메인으로</button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default SearchId;
