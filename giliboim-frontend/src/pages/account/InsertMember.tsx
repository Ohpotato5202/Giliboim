import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/common/InsertMember.module.css';
import logo from '../../assets/images/giliboim-logo.png';
import phone from 'phone';
import { defaultUser, User } from '../../type/user';
import { useNavigate } from 'react-router-dom';
import api from '../../config/customAxiosInterceptor';


const InsertMember: React.FC = () => {


    const MINUTES_IN = 180; // 3분
    const INTERVAL = 1;
    const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN);

    const minutes = String(Math.floor(timeLeft/60)).padStart(1, '0');
    const second = String(timeLeft%60).padStart(2, '0');
    const [isRunning, setIsRunning] = useState(false);

    const navi = useNavigate();


    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - INTERVAL;
                if (newTime <= 0) {
                    clearInterval(timer); // 시간이 다 되면 인터벌 해제
                    setIsRunning(false); // 타이머 실행 상태를 종료
                    alert("제한시간이 종료되었습니다. 다시 시도바랍니다.");
                    return 0; // 시간이 음수가 되지 않도록 0 반환
                }
                return newTime;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);


    
    const [form, setForm] = useState<User>(defaultUser);
    const [formcheck,setFormcheck] = useState("인증요청");
    const [check,setCheck] = useState({
        id : false,
        nickname : false
    })

    const handleChange = (e:ChangeEvent) => {
        let {name,value} = e.target as HTMLInputElement;
        if(name == "id" || name == "nickname"){
            setCheck({
                ...check,
                [name] : false
            })
        }
        setForm({
            ...form,
            [name] : value
        });
    };

    const sendMessage = () =>{
        api.post("http://localhost:8085/api/phoneVerify/send",null,{params : {phoneNumber : form.phone}})
            .then(result => {
                if(result.data < 5){
                    alert("인증번호가 발송되었습니다.");
                    setTimeLeft(180);
                    setIsRunning(true);
                    }
                else{
                    const time = (result.data + 100).toString().substr(1,4);
                    const resultTime = time.substr(0, 2) + '시' + time.substr(2, 2) + '분';
                    alert(`최근 한시간내에 5회이상 인증요청 시도가 있었습니다.\n${resultTime} 이후부터 가능합니다.`);
                }
            });
        }

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        if(!(form.pwd === form.confirmPassword)){
            alert("비밀번호가 서로 다릅니다.");
            return;
        }
        if(formcheck=="인증요청"){
            const phoneFormat = phone(form.phone, { country: "KOR" });
            if (!phoneFormat.isValid) {
                alert("잘못된 형식의 전화번호입니다.");
                setForm({
                    ...form,
                    phone : ''
                })
                return;
            }
            api.get("http://localhost:8085/api/Account/phoneCheck",{
                params: {
                    phone: phoneFormat.phoneNumber
                }
              })
              .then((result)=>{
                if(result.data==0){
                    api.post("http://localhost:8085/api/phoneVerify/send",null,{params : {phoneNumber : phoneFormat.phoneNumber}})
                .then(result => {
                    if(result.data < 5){
                        alert("인증번호가 발송되었습니다.");
                        setForm({
                            ...form,
                            phone : phoneFormat.phoneNumber
                        });
                        setIsRunning(true);
                        setFormcheck("회원가입");
                    }
                    else{
                        const time = (result.data + 100).toString().substr(1,4);
                        const resultTime = time.substr(0, 2) + "시 " + time.substr(2, 2) + "분";
                        alert(`최근 한시간내에 5회이상 인증요청 시도가 있었습니다.\n${resultTime} 이후부터 가능합니다.`);
                    }
                })
                }
                else {
                    alert("이미 있는 전화번호입니다.");
                    return;
                }
              })
        }
        else{

            api.post("http://localhost:8085/api/phoneVerify/verify",null,{params:{phoneNumber : form.phone, code : form.verificationCode}})
                .then(result => {
                    if(result.data == 1){
                        api.post("http://localhost:8085/api/Account/insertMember",form)
                        .then(()=>{
                            alert("회원가입에 성공하셨습니다.");
                            navi('/');
                        })
                    } else {
                        alert("인증번호가 다릅니다.");
                    }
                    });
        }
    };
    
    //name = id, nickname
    const handleDuplicateCheck = (name : keyof User) => {
        //중복체크
        const fieldValue = form[name];

        api.get("http://localhost:8085/api/Account/insertMemberCheck",{
            params : {
                key : name,
                value1 : fieldValue}})
            .then(response=>{
                console.log(response.data);
                //결과값이 없으면 count = 0
                if(response.data == 0){
                    alert("사용가능합니다.");
                    setCheck({
                        ...check,
                        [name] : true
                    })
                } else {
                    alert("이미 있습니다.");
                }
            })
            .catch(error=>{
                console.log(error);
            })
    };

    return (
        <div className={styles["registration-container"]}>
            <img src={logo} alt="길이보임 로고" className={styles["logo"]} />
            <div className={styles["registration-box"]}>
                <form onSubmit={handleSubmit}>
                <div className={styles["input-group"]}>
                    <input
                        className={styles["insertInput"]}
                        type="text"
                        name="id"
                        placeholder="아이디"
                        value={form.id}
                        onChange={handleChange}
                        required
                    />
                    <button type='button' className={`${check.id ? styles['buttonCheck']:styles['buttonNoCheck']}`} disabled={check.id} onClick={() => handleDuplicateCheck('id')}>중복확인</button>
                </div>

                <div className={styles["input-group"]}>
                    <input
                        className={styles["insertInput"]}
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        value={form.nickname}
                        onChange={handleChange}
                        required
                    />
                    <button type='button' className={`${check.nickname ? styles['buttonCheck']:styles['buttonNoCheck']}`} disabled={check.nickname} onClick={() => handleDuplicateCheck('nickname')}>중복확인</button>
                </div>

                <input
                    className={styles["insertInput"]}
                    type="password"
                    name="pwd"
                    placeholder="비밀번호"
                    value={form.pwd}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles["insertInput"]}
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <div className={styles["input-group"]}>
                    <input
                        className={styles["insertInput"]}
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles["input-group"]}>
                    <input
                        className={styles["insertInput"]}
                        type="text"
                        name="birthdate"
                        placeholder="생년월일(8글자)"
                        value={form.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles["input-group"]}>
                    <input
                        className={styles["insertInput"]}
                        type="text"
                        name="phone"
                        placeholder="휴대전화번호"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                {      
                <>      
                    {formcheck == "회원가입" &&(
                        <div className={styles["input-group"]}>
                            <input
                            className={styles["insertInput"]}
                            type="text"
                            name="verificationCode"
                            placeholder="인증번호 입력"
                            value={form.verificationCode}
                            onChange={handleChange}
                            required
                            />
                            <span className={styles["timer"]}>{minutes}:{second}</span>
                            <button onClick={sendMessage}>재전송</button>
                        </div>
                        )
                    } 
                </>
                }                  
                <button type='submit' className={`${(check.id&&check.nickname)&&!(timeLeft==0) ? styles['submit-buttonCheck'] : styles["buttonNoCheck"]} ${styles['submit-button']}`}  disabled={!(check.id && check.nickname)||timeLeft==0}>{formcheck}</button>
                </form>
            </div>
        </div>
    );
};

export default InsertMember;
