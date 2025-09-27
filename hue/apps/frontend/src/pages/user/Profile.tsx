import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 백엔드에서 받아올 데이터 타입 정의
interface UserProfile {
    name: string;
    email: string;
    nickname: string;
    serviceAgree: boolean;
    dataAgree: boolean;
}

// 백엔드 API 응답 시뮬레이션을 위한 더미 데이터
const dummyProfile: UserProfile = {
    name: "김땡땡",
    email: "email1234@gmail.com",
    nickname: "자유로운 영혼 1",
    serviceAgree: true,
    dataAgree: false,
};

function Profile() {
    const navigate = useNavigate();

    // 1. 상태 관리: API 호출 목적에 따라 상태 분리
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    // 프로필 정보(닉네임/동의) 업데이트 중 상태
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    // 로그아웃 진행 중 상태 (로그아웃 버튼 전용)
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // 닉네임 수정 관련 상태
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [tempNickname, setTempNickname] = useState("");

    // 2. 프로필 데이터 불러오기 (API 호출 시뮬레이션)
    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProfileData(dummyProfile);
            setTempNickname(dummyProfile.nickname);
            setLoading(false);
        };
        fetchProfile();
    }, []);

    // 3. 로그아웃 처리 (isLoggingOut 상태 사용)
    const handleLogout = async () => {
        if (isLoggingOut || isUpdatingProfile) return; // 다른 작업 중에는 실행 방지
        setIsLoggingOut(true); // 로그아웃 상태만 true로 설정

        console.log("로그아웃 요청 시작...");
        try {
            // 실제 API 호출: await fetch("/auth/logout", { method: "POST", ... });

            // 더미 응답 시뮬레이션 (1초 지연)
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("✅ 로그아웃 성공: 백엔드 세션 종료됨");
            // navigate("/login");

        } catch (err) {
            console.error("❌ 로그아웃 중 오류 발생:", err);
        } finally {
            setIsLoggingOut(false); // 로그아웃 상태만 해제
        }
    };

    // 4. 동의/수집 토글 처리 (isUpdatingProfile 상태 사용)
    const handleToggleAgreement = async (key: keyof UserProfile, newValue: boolean) => {
        if (!profileData || isLoggingOut || isUpdatingProfile) return; // 로그아웃 또는 다른 업데이트 중에는 방지

        setProfileData(prev => prev ? ({ ...prev, [key]: newValue }) : null);
        setIsUpdatingProfile(true); // 프로필 업데이트 상태 true

        const endpoint = key === 'serviceAgree' ? '/api/user/toggle-service' : '/api/user/toggle-data';
        console.log(`${key} 변경 요청: ${newValue}`);

        try {
            // 실제 API 호출: await fetch(endpoint, { method: "PUT", ... });

            // 더미 응답 시뮬레이션 (0.5초 지연)
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log(`✅ ${key} 상태 업데이트 성공: ${newValue}`);

        } catch (err) {
            console.error(`❌ ${key} 상태 업데이트 실패:`, err);
            setProfileData(prev => prev ? ({ ...prev, [key]: !newValue }) : null);
        } finally {
            setIsUpdatingProfile(false); // 프로필 업데이트 상태 false
        }
    };

    // 5. 닉네임 수정 처리 (isUpdatingProfile 상태 사용)
    const handleSaveNickname = async () => {
        if (!profileData || isLoggingOut || isUpdatingProfile || !tempNickname.trim()) {
            console.log("닉네임을 입력해주세요.");
            return;
        }

        setIsUpdatingProfile(true); // 프로필 업데이트 상태 true
        console.log(`닉네임 변경 요청: ${tempNickname}`);

        try {
            // 실제 API 호출: await fetch('/api/user/nickname', { method: "PUT", ... });

            // 더미 응답 시뮬레이션 (1초 지연)
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProfileData(prev => prev ? ({ ...prev, nickname: tempNickname }) : null);
            setIsEditingNickname(false);
            console.log(`✅ 닉네임 변경 성공: ${tempNickname}`);

        } catch (err) {
            console.error("❌ 닉네임 변경 실패:", err);
            setTempNickname(profileData!.nickname);
        } finally {
            setIsUpdatingProfile(false); // 프로필 업데이트 상태 false
        }
    };

    // 로딩 및 에러 처리 UI
    if (loading) {
        return <div className="p-8 text-center text-gray-500">프로필 데이터를 불러오는 중입니다...</div>;
    }

    if (!profileData) {
        return <div className="p-8 text-center text-red-500">프로필 데이터를 불러오지 못했습니다.</div>;
    }

    // 모든 버튼의 disabled 상태는 isLoggingOut과 isUpdatingProfile을 모두 확인하여
    // 동시 요청으로 인한 오류를 방지합니다.
    const isDisabled = isLoggingOut || isUpdatingProfile;

    return (
        <div className="main-box-profile">
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
                        <span className="value">{profileData.name}</span>
                    </div>
                    <div className="row">
                        <span className="label">이메일</span>
                        <span className="value">{profileData.email}</span>
                    </div>

                    {/* 닉네임 수정 영역 */}
                    <div className="row nickname-row">
                        <span className="label">닉네임</span>
                        {isEditingNickname ? (
                            <>
                                <input
                                    type="text"
                                    value={tempNickname}
                                    onChange={(e) => setTempNickname(e.target.value)}
                                    disabled={isDisabled}
                                    className="nickname-input"
                                />
                                <button
                                    className="edit-btn save-btn"
                                    onClick={handleSaveNickname}
                                    disabled={isDisabled || tempNickname === profileData.nickname}
                                >
                                    {isUpdatingProfile ? "저장 중" : "저장"}
                                </button>
                                <button
                                    className="edit-btn cancel-btn"
                                    onClick={() => {
                                        setTempNickname(profileData.nickname);
                                        setIsEditingNickname(false);
                                    }}
                                    disabled={isDisabled}
                                >
                                    취소
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="value">{profileData.nickname}</span>
                                <button
                                    className="edit-btn"
                                    onClick={() => setIsEditingNickname(true)}
                                    disabled={isDisabled}
                                >
                                    수정
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* 동의 스위치 */}
                <div className="toggle-box">
                    <div className="toggle-row">
                        서비스 알림 수신 동의
                        <label className="agree-switch">
                            <input
                                type="checkbox"
                                checked={profileData.serviceAgree}
                                onChange={(e) =>
                                    handleToggleAgreement('serviceAgree', e.target.checked)
                                }
                                disabled={isDisabled}
                            />
                            <span className="agree-slider"></span>
                        </label>
                    </div>
                    <div className="toggle-row">
                        데이터 수집 동의
                        <label className="agree-switch">
                            <input
                                type="checkbox"
                                checked={profileData.dataAgree}
                                onChange={(e) =>
                                    handleToggleAgreement('dataAgree', e.target.checked)
                                }
                                disabled={isDisabled}
                            />
                            <span className="agree-slider"></span>
                        </label>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="action-buttons">
                    <button
                        className="logout"
                        onClick={handleLogout}
                        // 로그아웃 버튼의 상태는 isLoggingOut에만 의존합니다.
                        disabled={isLoggingOut}
                    >
                        {/* 로그아웃 버튼의 텍스트도 isLoggingOut에만 의존합니다. */}
                        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                    </button>
                    {/* 회원탈퇴 버튼은 isLoggingOut 상태에 영향을 받게 하여 동시 작업을 방지합니다. */}
                    <button className="withdraw" disabled={isDisabled}>
                        회원탈퇴
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Profile;