import './Sound.css'

const MusicMain = () => {
    return (
        <div className="healing-content">
            <h2>음악 & 사운드</h2>
            <h3>기분별 음악 플레이리스트</h3>
            <p>“빗소리, 파도, 숲 속 바람... 자연의 소리가 마음을 편안하게 감싸줍니다.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>집중 UP!</h4>
                    <p className="category-desc"></p>
                    <div className="song-button">잔잔한 빗소리 <span>▶</span></div>
                    <div className="song-button">잔잔한 빗소리 <span>▶</span></div>
                    <div className="song-button">잔잔한 빗소리 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>휴식/명상</h4>
                    <p className="category-desc"></p>
                    <div className="song-button">새 지저귐 <span>▶</span></div>
                    <div className="song-button">새 지저귐 <span>▶</span></div>
                    <div className="song-button">새 지저귐 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>수면용</h4>
                    <p className="category-desc"></p>
                    <div className="song-button">천둥 없는 빗소리 <span>▶</span></div>
                    <div className="song-button">천둥 없는 빗소리 <span>▶</span></div>
                    <div className="song-button">천둥 없는 빗소리 <span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default MusicMain;