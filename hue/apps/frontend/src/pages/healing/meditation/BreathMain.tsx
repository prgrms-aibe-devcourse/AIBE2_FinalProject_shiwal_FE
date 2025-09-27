import './Meditation.css'

const BreathMain = () => {
    return (
        <div className="healing-content">
            <h2>명상 & 호흡</h2>
            <p>“빗소리, 파도, 숲 속 바람... 자연의 소리가 마음을 편안하게 감싸줍니다.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>호흡 가이드</h4>
                    <p className="category-desc">짧은 호흡법으로 불안을 줄이고 마음을 안정시켜보세요.</p>
                    <div className="song-button">1분 심호흡 <span>▶</span></div>
                    <div className="song-button">4-7-8 호흡법 <span>▶</span></div>
                    <div className="song-button">박자 호흡 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>짧은 명상</h4>
                    <p className="category-desc">아침.밤 불안한 순간 언제든 잠시 멈추고 마음을 리셋하세요.</p>
                    <div className="song-button">아침 시작 명상 <span>▶</span></div>
                    <div className="song-button">잠들기 전 명상 <span>▶</span></div>
                    <div className="song-button">불안 완화 명상 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>간단 스트레칭</h4>
                    <p className="category-desc">목.어깨 손목을 풀어주는 가벼운 스트레칭으로 긴장을 완화하세요.</p>
                    <div className="song-button">목, 어깨 스트레칭 <span>▶</span></div>
                    <div className="song-button">손목 풀기 <span>▶</span></div>
                    <div className="song-button">의자 요가 <span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default BreathMain;