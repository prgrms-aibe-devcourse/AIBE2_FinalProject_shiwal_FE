import './contents.css'

const ContentsPage = () => {
    return (
        <div className="contents_wrap">
            <h2>콘텐츠 관리</h2>

            <div className="contents_tabs">
                <button className="tab_btn">힐링콘텐츠 수정/관리</button>
                <button className="tab_btn">자기분석 테스트 목록 수정/관리</button>
            </div>

            <div className="contents_area">
            </div>
        </div>
    )
}

export default ContentsPage