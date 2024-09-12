import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/admin/MemberDetail.css';
import logo from '../../assets/images/giliboim-logo.png';
import { initMember, Member } from '../../type/user';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import api from '../../config/customAxiosInterceptor';

function AdminMemberDetail() {
    const { memberNo } = useParams();
    const [member, setMember] = useState<Member>(initMember);
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        api.get(`http://localhost:8085/api/admin/account/${memberNo}`)
            .then((res) => {
                console.log(res.data);
                setMember(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [memberNo]);

    const handleSaveMember = () => {
        api.post(`http://localhost:8085/api/admin/account`, member)
            .then(() => {
                alert('회원 정보가 저장되었습니다.');
                navigate('/admin/AdminMember');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleSuspendMember = () => {
        api.patch(`http://localhost:8085/api/admin/account/${memberNo}/suspend`)
            .then(() => {
                alert('회원이 정지되었습니다.');
                navigate('/admin/AdminMember'); // 회원 목록으로 돌아가기
            })
            .catch((err) => {
                console.error("Error suspending member:", err.response?.data || err.message);
            });
    };
    
    const handleDeleteMember = () => {
        api.delete(`http://localhost:8085/api/admin/account/${memberNo}`)
            .then(() => {
                alert('회원이 삭제되었습니다.');
                navigate('/admin/AdminMember'); // 회원 목록으로 돌아가기
            })
            .catch((err) => {
                console.error("Error deleting member:", err.response?.data || err.message);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    return (
        <>
        <div className="member-detail-page">
             <AdminHeader title={`회원 상세 정보`} />
            <div key={member.memberNo} className="detail-member-info">
                <img src={ member.profile ? ("http://localhost:8085/api/static/images/profile/"+member.profile) : logo } alt="프로필 이미지" className="detail-member-image" />
                <div className="member-basic-info">
                    <input
                        type="text"
                        name="name"
                        value={member.name}
                        onChange={handleChange}
                        className="detail-member-name"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={member.phone}
                        onChange={handleChange}
                        className="detail-member-phone"
                    />
                </div>
            </div>
            <table className="member-stats">
                <tbody> 
                    <tr>
                        <td className="stat-label">생년월일</td>
                        <td className="stat-value">
                            <input
                                type="text"
                                name="birthdate"
                                value={member.birthdate}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="stat-label">가입일</td>
                        <td className="stat-value">{member.enrollDate}</td>
                    </tr>
                    <br /><br /><br />
                </tbody>
            </table>
            <div className="favorite-buttons">
                <div className="favorite-button" onClick={() => navigate("/admin/AdminPost?category=all&memberNo="+memberNo)}>
                    작성한 게시글 목록
                </div>
                <div className="favorite-button" onClick={() => navigate("/admin/AdminPost?category=declaration&memberNo="+memberNo)}>
                    신고한 게시글 목록
                </div>
                <div className="favorite-button" onClick={() => navigate("/admin/AdminComments?category=all&memberNo="+memberNo)}>
                    작성한 댓글 목록
                </div>
                <div className="favorite-button" onClick={() => navigate("/admin/AdminComments?category=declaration&memberNo="+memberNo)}>
                    신고한 댓글 목록
                </div>
            </div>
            <div className="member-actions">
                <div className="action-button" onClick={() => setShowEditModal(true)}>회원 정보 수정</div>
                <div className="action-button" onClick={() => setShowSuspendModal(true)}>회원 정지</div>
                <div className="action-button" onClick={() => setShowDeleteModal(true)}>회원 삭제</div>
            </div>

                {/* 회원 정보 수정 모달 */}
                {showEditModal && (
                    <div className="modal-container" onClick={() => setShowEditModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>회원 정보를 수정하시겠습니까?</h2>
                            </div>
                            <div className="modal-body">
                                <div className="button-container">
                                    <button onClick={handleSaveMember}>수정</button>
                                    <button onClick={() => setShowEditModal(false)}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 회원 정지 모달 */}
                {showSuspendModal && (
                    <div className="modal-container" onClick={() => setShowSuspendModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>선택된 회원을 정지 하시겠습니까?</h2>
                            </div>
                            <div className="modal-body">
                                <div className="button-container">
                                    <button onClick={handleSuspendMember}>정지</button>
                                    <button onClick={() => setShowSuspendModal(false)}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 회원 삭제 모달 */}
                {showDeleteModal && (
                    <div className="modal-container" onClick={() => setShowDeleteModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>선택된 회원을 삭제 하시겠습니까?</h2>
                            </div>
                            <div className="modal-body">
                                <div className="button-container">
                                    <button onClick={handleDeleteMember}>삭제</button>
                                    <button onClick={() => setShowDeleteModal(false)}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
        <Footer/>
        </>
    );
}

export default AdminMemberDetail;
