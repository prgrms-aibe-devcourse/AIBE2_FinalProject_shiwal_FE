type Risk_item = {
    nickname: string
    tags: string[]
}

const SelfDiagnosisSummary = () => {
    // 더미
    const detected_count = 12
    const total_tests = 98

    const recent_items: Risk_item[] = [
        { nickname: '식빵맨', tags: ['불안', '우울'] },
        { nickname: '콩콩이', tags: ['스트레스', '무기력'] },
        { nickname: '후추', tags: ['자살 생각', '불면'] },
    ]

    return (
        <div className="self_summary">
            <div className="self_summary_header">
                <h2>자가진단검사</h2>
            </div>

            <div className="self_summary_body">
                <div className="self_summary_stat">
                    <div className="self_summary_icon">📄</div>
                    <div className="self_summary_rows">
                        <div className="self_summary_row">
                            <span className="self_summary_label">위험감지</span>
                            <span className="self_summary_value">{detected_count}건</span>
                        </div>
                        <div className="self_summary_row">
                            <span className="self_summary_label">전체검사</span>
                            <span className="self_summary_value">{total_tests}건</span>
                        </div>
                    </div>
                </div>

                <div className="self_summary_list">
                    <div className="self_summary_list_title">기간 내 위험감지 검사</div>
                    <ul>
                        {recent_items.map((it, idx) => (
                            <li key={idx} className="self_summary_item">
                                <span className="self_summary_nick">{it.nickname}</span>
                                <span className="self_summary_tags">{it.tags.join(', ')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelfDiagnosisSummary