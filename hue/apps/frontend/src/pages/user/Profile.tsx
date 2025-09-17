import { useState } from "react";

function Profile() {
    // 추후 백엔드에서 불러올 데이터 (지금은 더미)
    const [name, setName] = useState("김땡땡");
    const [email, setEmail] = useState("email1234@gmail.com");
    const [nickname, setNickname] = useState("자유로운 영혼 1");

    // 서비스 동의 여부 (토글 스위치)
    const [serviceAgree, setServiceAgree] = useState(false);
    const [dataAgree, setDataAgree] = useState(false);

    return (
        <div className="main-box-col">
            <div className="title">나의 프로필</div>
            <section className="green-box">
                {/* 프로필 이미지 */}
                <div className="profile-image">
                    <img src="/logo.png" alt="프로필 이미지" />
                </div>

                {/* 개인정보 */}
                <div className="profile-info">
                    <div className="row">
                        <span className="label">이름</span>
                        <span className="value">{name}</span>
                    </div>
                    <div className="row">
                        <span className="label">이메일</span>
                        <span className="value">{email}</span>
                    </div>
                    <div className="row">
                        <span className="label">닉네임</span>
                        <span className="value">{nickname}</span>
                        <button className="edit-btn">수정</button>
                    </div>
                </div>

                {/* 동의 스위치 */}
                <div className="toggle-box">
                    <div className="toggle-row">
                        서비스 알림 수신 동의
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={serviceAgree}
                                onChange={(e) => setServiceAgree(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-row">
                        데이터 수집 동의
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={dataAgree}
                                onChange={(e) => setDataAgree(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="action-buttons">
                    <button className="logout">로그아웃</button>
                    <button className="withdraw">회원탈퇴</button>
                </div>
            </section>
        </div>
    );
}

export default Profile;
