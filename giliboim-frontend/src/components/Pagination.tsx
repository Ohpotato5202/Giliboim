import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageInfo } from '../type/PageInfo';

const Pagination = (props: { pageInfo: PageInfo }) => {
  const location = useLocation();
  const { endPage, maxPage, pageNo, startPage } = props.pageInfo;

  // 현재 URL 경로 가져오기
  const currentPath = location.pathname;

  const renderPageLinks = () => {
    const links = [];

    // 이전 페이지 버튼
    if (pageNo > 1) {
      links.push(
        <Link
          to={`${currentPath}?pageNo=${pageNo - 1}`}
          className="page-item"
          key="prev"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1602 7.41L10.5802 12L15.1602 16.59L13.7502 18L7.75016 12L13.7502 6L15.1602 7.41Z"
              fill="black"
            />
          </svg>
        </Link>
      );
    }

    // 페이지 번호 링크
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <Link
          to={`${currentPath}?pageNo=${i}`}
          className={`page-item ${pageNo === i ? 'page-on' : ''}`}
          key={i}
        >
          {i}
        </Link>
      );
    }

    // 다음 페이지 버튼
    if (pageNo < maxPage) {
      links.push(
        <Link
          to={`${currentPath}?pageNo=${pageNo + 1}`}
          className="page-item"
          key="next"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.83984 7.41L13.4198 12L8.83984 16.59L10.2498 18L16.2498 12L10.2498 6L8.83984 7.41Z"
              fill="black"
            />
          </svg>
        </Link>
      );
    }

    return links;
  };

  return (
    <>
      <div className='pagenation'>
        <div className='page-bar'>
          {renderPageLinks()}
        </div>
      </div>
    </>
  )

};

export default Pagination;
