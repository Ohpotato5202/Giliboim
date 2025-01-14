-- REPORT 테이블의 데이터 삭제
DELETE FROM REPORT;

-- POST_COMMENT 테이블의 데이터 삭제
DELETE FROM POST_COMMENT;

-- POST 테이블의 데이터 삭제
DELETE FROM POST;

-- MEMBER 테이블의 데이터 삭제
DELETE FROM MEMBER;

-- AUTHORITY 테이블에 데이터 삽입 (이미 존재할 수 있으므로 MERGE 사용)
MERGE INTO AUTHORITY a
USING (SELECT 1 AS AUTHORITY_NO, 'Admin' AS AUTHORITY_NAME FROM DUAL UNION ALL
       SELECT 2, 'User' FROM DUAL) b
ON (a.AUTHORITY_NO = b.AUTHORITY_NO)
WHEN NOT MATCHED THEN
INSERT (AUTHORITY_NO, AUTHORITY_NAME)
VALUES (b.AUTHORITY_NO, b.AUTHORITY_NAME);

-- SOCIAL_TYPE 테이블에 데이터 삽입 (이미 존재할 수 있으므로 MERGE 사용)
MERGE INTO SOCIAL_TYPE s
USING (SELECT 1 AS ST_NO, 'Facebook' AS NAME FROM DUAL UNION ALL
       SELECT 2, 'Google' FROM DUAL) c
ON (s.ST_NO = c.ST_NO)
WHEN NOT MATCHED THEN
INSERT (ST_NO, NAME)
VALUES (c.ST_NO, c.NAME);

-- REPORT_CATEGORY 테이블에 데이터 삽입 (REPORT 테이블이 참조)
INSERT INTO REPORT_CATEGORY (RC_NO, CATEGORY)
VALUES (1, 'Spam');

INSERT INTO REPORT_CATEGORY (RC_NO, CATEGORY)
VALUES (2, 'Inappropriate Content');

-- MEMBER 테이블에 데이터 삽입 (기본 키 오류를 피하기 위해 먼저 데이터 삭제)
DELETE FROM MEMBER WHERE MEMBER_NO IN (1, 2);
INSERT INTO MEMBER (MEMBER_NO, ID, NAME, NICKNAME, STATUS, AUTHORITY_NO, ST_NO, PWD, PHONE, BIRTHDATE) 
VALUES (1, 'user01', 'John Doe', 'johnd', 'Y', 1, 1, 'password1', '010-1111-1111', '19900101');

INSERT INTO MEMBER (MEMBER_NO, ID, NAME, NICKNAME, STATUS, AUTHORITY_NO, ST_NO, PWD, PHONE, BIRTHDATE) 
VALUES (2, 'user02', 'Jane Doe', 'janed', 'Y', 2, 2, 'password2', '010-2222-2222', '19920512');

-- POST 테이블에 데이터 삽입
DELETE FROM POST WHERE POST_NO IN (1, 2);
INSERT INTO POST (POST_NO, MEMBER_NO, ROAD_ADDRESS, TITLE, CONTENT, STATUS, CREATE_DATE)
VALUES (1, 1, '123 Main St', 'First Post Title', 'This is the content of the first post.', 'Y', SYSDATE);

INSERT INTO POST (POST_NO, MEMBER_NO, ROAD_ADDRESS, TITLE, CONTENT, STATUS, CREATE_DATE)
VALUES (2, 2, '456 Elm St', 'Second Post Title', 'This is the content of the second post.', 'Y', SYSDATE);

-- POST_COMMENT 테이블에 데이터 삽입
DELETE FROM POST_COMMENT WHERE PC_NO IN (1, 2);
INSERT INTO POST_COMMENT (PC_NO, MEMBER_NO, POST_NO, CONTENT)
VALUES (1, 1, 1, 'This is the first comment on the first post.');

INSERT INTO POST_COMMENT (PC_NO, MEMBER_NO, POST_NO, CONTENT)
VALUES (2, 2, 2, 'This is the first comment on the second post.');

-- REPORT 테이블에 데이터 삽입
DELETE FROM REPORT WHERE REPORT_NO IN (1, 2);
INSERT INTO REPORT (REPORT_NO, RC_NO, MEMBER_NO, POST_NO, COMMENT_NO, REASON, CREATE_DATE)
VALUES (1, 1, 1, 1, NULL, 'Inappropriate content in the post.', SYSDATE);

INSERT INTO REPORT (REPORT_NO, RC_NO, MEMBER_NO, POST_NO, COMMENT_NO, REASON, CREATE_DATE)
VALUES (2, 2, 2, NULL, 1, 'Spam comment.', SYSDATE);
