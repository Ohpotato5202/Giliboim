import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/common/AdminHeader.module.css';
import api from '../config/customAxiosInterceptor';

interface CommunityHeaderProps {
  title: string;
}

function CommunityHeader({ title }: CommunityHeaderProps) {
  const navi = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nowUrl = useLocation().pathname;
  const baseUrl = "http://localhost:3000";

  const handleBackClick = () => {
    navi('/main');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      const searchPath = `/admin/${trimmedQuery}`;
      navi(searchPath);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const partialLookup = (category:string) =>{
    console.log("입력한 주소 값  = "+baseUrl+nowUrl+"?category="+category);
    navi(nowUrl+"?category="+category);
  }

  return (
    <header className={styles["admin-member-header"]}>
      <div className={styles["header-left"]}>
        <button className={styles["back-button"]} onClick={handleBackClick}>
          <svg
            width="44"
            height="52"
            viewBox="0 0 44 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M25.6667 39L14.6667 26L25.6667 13L28.2334 16.0333L19.8001 26L28.2334 35.9667L25.6667 39Z"
              fill="#1D1B20"
              />
          </svg>
        </button>
              <h1>{title}</h1>
      </div>
      <div className={styles["header-icons"]}>
        <button className={styles["notification-icon"]}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 19V17H6V10C6 8.61667 6.41667 7.39167 7.25 6.325C8.08333 5.24167 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6417 2.73333 10.925 2.45C11.225 2.15 11.5833 2 12 2C12.4167 2 12.7667 2.15 13.05 2.45C13.35 2.73333 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.24167 16.75 6.325C17.5833 7.39167 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.975 21.8083 10.575 21.425C10.1917 21.025 10 20.55 10 20H14C14 20.55 13.8 21.025 13.4 21.425C13.0167 21.8083 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z"
              fill="#1D1B20"
            />
          </svg>
        </button>
        <div>
        <button className={styles["menu-button"]} onClick={toggleMenu}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="#1E1E1E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        </div>
        <div className={styles["admin-search"]}>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            onKeyDown={handleKeyDown} 
          />
          <button className={styles["search-icon"]} onClick={handleSearchSubmit}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="#1D1B20"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 사이드 메뉴 */}
      {isMenuOpen && (
          <div className={styles["side-menu"]}>
            <ul className={styles["menu-list"]}>
              <li className={styles["menu-item"]} onClick={()=>{partialLookup("all")}}>전체 조회</li>
              <li className={styles["menu-item"]} onClick={()=>{partialLookup("declaration")}}>신고 조회</li>
              <li className={styles["menu-item"]} onClick={()=>{partialLookup("nomal")}}>일반 조회</li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default CommunityHeader;
