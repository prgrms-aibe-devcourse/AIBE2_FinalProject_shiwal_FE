import './ai_counsel_summary.css'

type Risk_item = {
    nickname: string
    tags: string[] // 예: ["진로", "학업", "우울", "자살"]
}

const AiCounselSummary = () => {
    // 더미
    const detected_count = 19
    const total_conversations = 152

    const recent_items: Risk_item[] = [
        { nickname: '식빵맨', tags: ['진로', '학업', '우울', '자살'] },
        { nickname: '콩콩이', tags: ['가정', '불안'] },
        { nickname: '후추', tags: ['대인관계', '분노'] },
    ]

    return (
        <div className="ai_summary">
            <div className="ai_summary_header">
                <h2>AI 상담대화</h2>
            </div>

            <div className="ai_summary_body">
                <div className="ai_summary_stat">
                    <div className="ai_summary_icon">💬</div>

                    <div className="ai_summary_rows">
                        <div className="ai_summary_row">
                            <span className="ai_summary_label">위험감지</span>
                            <span className="ai_summary_value">{detected_count}건</span>
                        </div>
                        <div className="ai_summary_row">
                            <span className="ai_summary_label">전체대화</span>
                            <span className="ai_summary_value">{total_conversations}건</span>
                        </div>
                    </div>
                </div>

                <div className="ai_summary_list">
                    <div className="ai_summary_list_title">기간 내 위험감지 대화</div>
                    <ul>
                        {recent_items.map((it, idx) => (
                            <li key={idx} className="ai_summary_item">
                                <span className="ai_summary_nick">{it.nickname}</span>
                                <span className="ai_summary_tags">
                  {it.tags.join(', ')}
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AiCounselSummary