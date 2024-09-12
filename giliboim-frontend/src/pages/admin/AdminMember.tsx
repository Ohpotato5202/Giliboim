import React, { useEffect, useState } from 'react';
import '../../styles/admin/AdminMember.css';
import logo from '../../assets/images/giliboim-logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Members } from '../../type/user';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';
import Pagination from '../../components/Pagination';
import { initPageInfo, PageInfo } from '../../type/PageInfo';

function AdminMember() {
    const navigate = useNavigate();
    const locate = useLocation();
    const queryString = locate.search;

    const [members, setMembers] = useState<Members>([]);
    const [isCommunityExpanded, setIsCommunityExpanded] = useState(false);
    const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.get(`http://localhost:8085/api/admin/allAccount${queryString}`)
            .then((res) => {
                console.log(res.data);
                setMembers(res.data.AccountList); // 데이터 가져오기
                setPageInfo(res.data.pi); // 페이지 정보 가져오기
            })
            .catch((err) => {
                console.log(err);
            });
    }, [queryString]);

    const toggleStatus = (memberNo: number, currentStatus: string) => {
        const newStatus = currentStatus === 'Y' ? 'S' : 'Y';
        api.patch(`http://localhost:8085/api/admin/account/${memberNo}/toggleStatus`, { status: newStatus })
            .then(() => {
                setMembers((prevMembers) =>
                    prevMembers.map((member) =>
                        member.memberNo === memberNo ? { ...member, status: newStatus } : member
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleIconClick = (memberNo: number, status: string) => {
        toggleStatus(memberNo, status);
        setIsCommunityExpanded(!isCommunityExpanded);
    };

    const renderStatusIcon = (status: string) => {
        if (status === 'Y') {
            return (
                <svg width="51" height="31" viewBox="0 0 51 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_563_1799)">
                        <rect width="51" height="31" rx="15.5" fill="#787880" fillOpacity="0.16" />
                        <g filter="url(#filter0_ddd_563_1799)">
                            <rect x="2" y="2" width="27" height="27" rx="13.5" fill="white" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_ddd_563_1799" x="-6" y="-3" width="43" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_563_1799" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect1 dropShadow_563_1799" result="effect2 dropShadow_563_1799" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                            <feBlend mode="normal" in2="effect2 dropShadow_563_1799" result="effect3 dropShadow_563_1799" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect3 dropShadow_563_1799" result="shape" />
                        </filter>
                        <clipPath id="clip0_563_1799">
                            <rect width="51" height="31" rx="15.5" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        } else if (status === 'S') {
            return (
                <svg width="51" height="31" viewBox="0 0 51 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_563_1805)">
                        <rect x="51" y="31" width="51" height="31" rx="15.5" transform="rotate(180 51 31)" fill="black" />
                        <g filter="url(#filter0_ddd_563_1805)">
                            <rect x="49" y="29" width="27" height="27" rx="13.5" transform="rotate(180 49 29)" fill="white" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_ddd_563_1805" x="14" y="-3" width="43" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1 dropShadow_563_1805" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect1 dropShadow_563_1805" result="effect2 dropShadow_563_1805" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                            <feBlend mode="normal" in2="effect2 dropShadow_563_1805" result="effect3 dropShadow_563_1805" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect3 dropShadow_563_1805" result="shape" />
                        </filter>
                        <clipPath id="clip0_563_1805">
                            <rect x="51" y="31" width="51" height="31" rx="15.5" transform="rotate(180 51 31)" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        } else if (status === 'D') {
            return (
                <svg width="51" height="31" viewBox="0 0 51 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_570_1813)">
                        <rect x="51" y="31" width="51" height="31" rx="15.5" transform="rotate(180 51 31)" fill="#FF3B30" />
                        <g filter="url(#filter0_ddd_570_1813)">
                            <rect x="49" y="29" width="27" height="27" rx="13.5" transform="rotate(180 49 29)" fill="white" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_ddd_570_1813" x="14" y="-3" width="43" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_570_1813" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_570_1813" result="effect2_dropShadow_570_1813" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect3_dropShadow_570_1813" />
                            <feOffset />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                            <feBlend mode="normal" in2="effect2_dropShadow_570_1813" result="effect3_dropShadow_570_1813" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_570_1813" result="shape" />
                        </filter>
                        <clipPath id="clip0_570_1813">
                            <rect x="51" y="31" width="51" height="31" rx="15.5" transform="rotate(180 51 31)" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            );
        } else {
            return null;
        }
    };

    return (
        <>
            <div className="admin-member-page">
                <AdminHeader title="회원 관리" />
                <div className="member-list">
                    {members.map((member) => (
                        <div key={member.memberNo} className="member-item">
                            <img src={ member.profile ? ("http://localhost:8085/api/static/images/profile/"+member.profile) : logo } alt="프로필 이미지" className="member-image" />
                            <div className="member-info" onClick={() => navigate('/admin/AdminMember/' + member.memberNo)}>
                                <div className="member-name">{member.nickname}</div>
                                <div className="member-phone">{member.phone}</div>
                            </div>
                            <div className="status-icon" onClick={() => handleIconClick(member.memberNo, member.status)}>
                                {renderStatusIcon(member.status)}
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination pageInfo={pageInfo} />
            </div>
            <Footer />
        </>
    );
}

export default AdminMember;
