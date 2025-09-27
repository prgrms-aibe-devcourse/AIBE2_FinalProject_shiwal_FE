import { useState } from "react";
import MusicMain from './sound/MusicMain';
import BreathMain from './meditation/BreathMain';
import DrawingMain from './creation/DrawingMain';
import './HealingMain.css'

const HealingMain = () => {
const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const handleClickSound = () => {
        setActiveCategory('sound');
    };

    const handleClickMeditation = () => {
        setActiveCategory('meditation');
    };
    const handleClickCreation = () => {
        setActiveCategory('creation');
    };

    return (
        <div className="healing-wrapper">
        <div className={`healing-container ${activeCategory ? 'shrink' : ''}`}>
            <div className={`left-panel ${activeCategory ? 'shrink' : ''}`}>
        <div className="healing-main">
            <h2>힐링 콘텐츠</h2>
            <p className="description">
                “힘들 땐 음악을, 지칠 땐 한 줄의 글을, 답답할 땐 짧은 명상을.<br />
                힐링 콘텐츠는 누구나 쉽게 즐길 수 있는 마음 건강 도구예요.<br />
                내 기분을 위한 작은 휴식이 큰 변화를 만듭니다.”
            </p>
        </div>

            <div className="healing-section">
                <div className="healing-box" onClick={handleClickSound}>
                    <div className="left">음악 & 사운드</div>
                    <div className="right">
                        <p onClick={(e) => e.stopPropagation()}>맞춤 음악 플레이리스트</p>
                        <p onClick={(e) => e.stopPropagation()}>자연의 소리</p>
                        <p onClick={(e) => e.stopPropagation()}>백색소음 계열</p>
                    </div>
                </div>

                <div className="healing-box" onClick={handleClickMeditation}>
                    <div className="left">명상 & 호흡</div>
                    <div className="right">
                        <p onClick={(e) => e.stopPropagation()}>호흡 가이드</p>
                        <p onClick={(e) => e.stopPropagation()}>짧은 명상</p>
                        <p onClick={(e) => e.stopPropagation()}>간단 스트레칭</p>
                    </div>
                </div>

                <div className="healing-box" onClick={handleClickCreation}>
                    <div className="left">창작 & 몰입</div>
                    <div className="right">
                        <p onClick={(e) => e.stopPropagation()}>색칠놀이</p>
                        <p onClick={(e) => e.stopPropagation()}>그림 캔버스</p>
                    </div>
                </div>
            </div>
            </div>



            <div className={`right-panel ${activeCategory ? 'show' : ''}`}>
                {activeCategory === 'sound' && <MusicMain />}
                {activeCategory === 'meditation' && <BreathMain />}
                {activeCategory === 'creation' && <DrawingMain />}
                </div>
            </div>
        </div>
    )
}

export default HealingMain