INSERT INTO MEMBER (
    MEMBER_NO, 
    AUTHORITY_NO, 
    ST_NO, 
    ID, 
    PHONE, 
    PWD, 
    NAME, 
    NICKNAME, 
    BIRTHDATE, 
    ENROLL_DATE, 
    MODIFY_DATE, 
    STATUS, 
    LOGIN_STATUS, 
    PROFILE
) VALUES (
    1004,                -- MEMBER_NO: 회원 번호 (유니크 값이어야 함)
    1,                   -- AUTHORITY_NO: 권한 번호 (예: 1 = 일반 사용자)
    1,                   -- ST_NO: 상태 번호 (예: 1 = 정상)
    'for_everyoung10',   -- ID: 사용자 ID
    '01036795202',       -- PHONE: 전화번호
    '0831',              -- PWD: 비밀번호 (암호화된 값이어야 함, 예시에서는 단순히 0831로 설정)
    '장원영',            -- NAME: 사용자 이름
    'Vicky',             -- NICKNAME: 사용자 닉네임
    '20040831',          -- BIRTHDATE: 출생일
    TO_DATE('2018-10-19', 'YYYY-MM-DD'), -- ENROLL_DATE: 가입일
    NULL,                -- MODIFY_DATE: 수정일 (초기에는 NULL)
    'Y',                 -- STATUS: 상태 ('Y' 또는 'N' 중 하나)
    'N',                 -- LOGIN_STATUS: 로그인 상태 ('Y' 또는 'N' 중 하나)
    NULL                 -- PROFILE: 프로필 사진 경로 또는 URL (초기에는 NULL)
);

commit;

DESC MEMBER;

SELECT constraint_name, search_condition 
FROM user_constraints 
WHERE table_name = 'MEMBER' AND constraint_type = 'C';

INSERT INTO INQUIRE (INQUIRE_NO, MEMBER_NO, TITLE, INQUIRE_CONTENT, CREATE_DATE, STATUS, ANSWER_CONTENT) 
VALUES (1, 1, '첫 번째 문의', '배고프다~.', TO_DATE('2024-08-13', 'YYYY-MM-DD'), 'Y', NULL);

INSERT INTO INQUIRE (INQUIRE_NO, MEMBER_NO, TITLE, INQUIRE_CONTENT, CREATE_DATE, STATUS, ANSWER_CONTENT) 
VALUES (2, 2, '두 번째 문의', '싹싹김치.', TO_DATE('2024-08-12', 'YYYY-MM-DD'), 'Y', NULL);

INSERT INTO INQUIRE (INQUIRE_NO, MEMBER_NO, TITLE, INQUIRE_CONTENT, CREATE_DATE, STATUS, ANSWER_CONTENT) 
VALUES (3, 1004, '럭키비키', '장원영하다', TO_DATE('2024-08-11', 'YYYY-MM-DD'), 'Y', NULL);

INSERT INTO INQUIRE (INQUIRE_NO, MEMBER_NO, TITLE, INQUIRE_CONTENT, CREATE_DATE, STATUS, ANSWER_CONTENT) 
VALUES (4, 3, ' 럭키비키', '비키 입니다.', TO_DATE('2024-08-12', 'YYYY-MM-DD'), 'Y', NULL);

ALTER TABLE INQUIRE MODIFY STATUS VARCHAR2(20);

SELECT * FROM MEMBER WHERE MEMBER_NO IN (1, 2, 3);


SELECT 
    INQUIRE_NO, 
    MEMBER_NO, 
    TITLE, 
    INQUIRE_CONTENT, 
    CREATE_DATE, 
    STATUS, 
    ANSWER_CONTENT 
FROM 
    INQUIRE;


