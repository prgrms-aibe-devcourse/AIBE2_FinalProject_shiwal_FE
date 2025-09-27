import './Sound.css'

const WhiteNoise = () => {
    return (
        <div className="healing-content">
            <h2>음악 & 사운드</h2>
            <h3>기분별 음악 플레이리스트</h3>
            <p>“기계음 같은 단순한 소리는 뇌를 편안하게 만들어주는 마법같은 도구에요.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>비행기/기내모드</h4>
                    <p className="category-desc"></p>
                    <div className="song-button">비행기 엔진 소리 <span>▶</span></div>
                    <div className="song-button">기내 화이트 노이즈 <span>▶</span></div>
                    <div className="song-button">기내 화이트 노이즈 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>신생아 안정</h4>
                    <p className="category-desc"></p>
                    <div className="song-button">엄마 심장 소리 <span>▶</span></div>
                    <div className="song-button">자궁 안 소리 <span>▶</span></div>
                    <div className="song-button">청소기 소리 <span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default WhiteNoise;