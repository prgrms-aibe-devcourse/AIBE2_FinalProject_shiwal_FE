import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function Home() {
    return (
        <div className="home-container">
            {/* 상단 (왼쪽 텍스트, 오른쪽 일러스트) */}
            <header className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1 className="home-title">당신을 위한 맞춤 마음 돌봄 휴(休)</h1>
                        <p className="home-description">
                            휴(休)는 마음을 가볍게 살피고 돌볼 수 있는 공간입니다.<br />
                            작은 체크인과 힐링 콘텐츠로 시작해보세요.<br />
                            당신의 마음을 가볍게 살피고, 쉬어갈 수 있는 공간이에요.<br />
                            지금 바로 휴봇과의 대화로 오늘의 기분을 체크해 보세요.
                        </p>
                    </div>

                    <div className="hero-illustration">
                        <img src="/main.jpg" alt="메인 일러스트" />
                    </div>
                </div>
            </header>

            {/* 구분선 (녹색 얇은 라인) */}
            <div className="divider" />

            {/* 배경(블러) 이미지 위에 카드(버튼)를 오버레이 */}
            <section className="demo-area">
                <img className="demo-bg" src="/blur.png" alt="채팅 인터페이스" />
                <div className="modal-card" role="dialog" aria-labelledby="modal-title">
                    <h3 id="modal-title">휴봇과 대화하러 가기</h3>
                    <Link to="/aichat">
                        <button className="confirm-button">확인</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
