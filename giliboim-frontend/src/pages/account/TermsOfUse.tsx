import React, { useState } from 'react';
import styles from '../../styles/common/TermsOfUse.module.css';
import logo from '../../assets/images/giliboim-logo.png';
import { useNavigate } from 'react-router-dom';

const TermsOfUse: React.FC = () => {

    const navi = useNavigate();

    const [terms, setTerms] = useState({
      allChecked: false,
      term1: false,
      term2: false,
      term3: false,
      term4: false,
      term5: false,
    });

    const checkboxAll = () => {
      const Checked = !terms.allChecked;
      setTerms({
        allChecked: Checked,
        term1: Checked,
        term2: Checked,
        term3: Checked,
        term4: Checked,
        term5: Checked
      });
    };

    const checkboxChange = (term: string) => {
        setTerms((prevState) => {
          const newState = {
            ...prevState,
            [term]: !prevState[term as keyof typeof prevState]
          };
          const allChecked = newState.term1 && newState.term2 && newState.term3 && newState.term4 && newState.term5;
          return { ...newState, allChecked };
        });
      };

    const termsNext = ()=>{
        if(!terms.allChecked == true){
            alert("이용약관을 전부 동의해주세요.");
            return;
        }
        navi('/join/insert');
    }

  return (
    <div className={styles["terms-container"]}>
      <img src={logo} alt="길이보임 로고" className={styles["logo"]} />
      <div className={styles["terms-box"]}>
        <label className={styles["checkbox-container"]}>
          <input type="checkbox" checked={terms.allChecked} onChange={()=>checkboxAll()}/>
          이용약관 전체 동의
        </label>
        <hr className={styles["divider"]} />

        <div className={styles["term-item"]}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" checked={terms.term1} onChange={()=>checkboxChange("term1")}/>
            이용약관 동의 (필수)
          </label>
          <span className={styles["details-link"]}>상세보기</span>
        </div>

        <div className={styles["term-item"]}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" checked={terms.term2} onChange={()=>checkboxChange("term2")} />
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <span className={styles["details-link"]}>상세보기</span>
        </div>

        <div className={styles["term-item"]}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" checked={terms.term3} onChange={()=>checkboxChange("term3")} />
            개인정보 제3자 제공 동의 (필수)
          </label>
          <span className={styles["details-link"]}>상세보기</span>
        </div>

        <div className={styles["term-item"]}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" checked={terms.term4} onChange={()=>checkboxChange("term4")}/>
            개인정보 처리 위탁 동의 (필수)
          </label>
          <span className={styles["details-link"]}>상세보기</span>
        </div>

        <div className={styles["term-item"]}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" checked={terms.term5} onChange={()=>checkboxChange("term5")}/>
            위치기반 서비스 이용약관 (필수)
          </label>
          <span className={styles["details-link"]}>상세보기</span>
        </div>

        <button className={styles["next-button"]} onClick={termsNext}>다음</button>
      </div>
    </div>
  );
};

export default TermsOfUse;