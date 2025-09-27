import './Sound.css'

const MusicMain = () => {
    return (
        <div className="healing-content">
            <h2>음악 & 사운드</h2>
            <h3>기분별 음악 플레이리스트</h3>
            <p>“신나는 하루, 집중이 필요한 순간, 차분한 밤까지 당신의 기분의 맞는 음악을 골라보세요.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>활력 충전</h4>
                    <p className="category-desc">신나는 팝, EDM, 운동할 때 듣는 음악</p>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>집중 유지</h4>
                    <p className="category-desc">재즈, 피아노 연주곡</p>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>차분한 휴식</h4>
                    <p className="category-desc">잔잔한 발라드, 클래식, 어쿠스틱</p>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default MusicMain;