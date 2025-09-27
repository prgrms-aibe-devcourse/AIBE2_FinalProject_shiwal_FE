import './DrawingMain.css'

const BreathMain = () => {
    return (
        <div className="healing-content">
            <h2>창작 & 몰입</h2>
            <p>“그림, 색칠, 작은 활동으로 몰입하여 마음을 표현하세요.”</p>

            <div className="playlist-columns">
                <div className="playlist-category">
                    <h4>컬리링북</h4>
                    <p className="category-desc">마음을 차분하게 해주는 색칠하기로 힐링하세요.</p>
                    <div className="song-button">색칠놀이하기 <span>▶</span></div>
                </div>

                <div className="playlist-category">
                    <h4>그림 캔버스</h4>
                    <p className="category-desc">오늘의 기분을 자유롭게 그림으로 표현해보세요.</p>
                    <div className="song-button">그림 그리기<span>▶</span></div>
                </div>
            </div>
        </div>
    );
};

export default BreathMain;