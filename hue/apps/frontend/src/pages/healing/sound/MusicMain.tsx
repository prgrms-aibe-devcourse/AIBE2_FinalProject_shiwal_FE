import './Sound.css'

const MusicMain = () => {
    return (
        <div className="healing-content">
            <h2>음악 & 사운드</h2>
            <p>“신나는 하루, 집중이 필요한 순간, 차분한 밤까지 당신의 기분의 맞는 음악을 골라보세요.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>맞춤 음악</h4>
                    <p className="category-desc">활력 충전, 집중 유지, 차분한 휴식</p>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                    <div className="song-button">거짓말 - 빅뱅 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>자연의 소리</h4>
                    <p className="category-desc">마음의 평안을 가져다 줍니다. </p>
                    <div className="song-button">잔잔한 빗소리 <span>▶</span></div>
                    <div className="song-button">새 지저귐 <span>▶</span></div>
                    <div className="song-button">천둥 없는 빗소리 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>백색소음 계열</h4>
                    <p className="category-desc">단순한 소리는 뇌를 편안하게 만들어주는 마법같은 도구에요.</p>
                    <div className="song-button">비행기 엔진소리 <span>▶</span></div>
                    <div className="song-button">기내 화이트 노이즈 <span>▶</span></div>
                    <div className="song-button">심장 소리 <span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default MusicMain;