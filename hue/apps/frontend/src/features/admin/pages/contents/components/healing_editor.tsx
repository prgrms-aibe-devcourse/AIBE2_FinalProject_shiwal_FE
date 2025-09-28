import { useState } from 'react'

type HealingItem = {
    id: string
    title: string
    category: 'music' | 'nature' | 'meditation'
    visible: boolean
}

const dummy: HealingItem[] = [
    { id: 'h1', title: '기분별 음악 – 활력', category: 'music', visible: true },
    { id: 'h2', title: '파도 소리 (10분)', category: 'nature', visible: true },
    { id: 'h3', title: '3분 호흡 명상', category: 'meditation', visible: false },
]

export default function HealingEditor() {
    const [list] = useState<HealingItem[]>(dummy)

    return (
        <div className="ce_wrap">
            <div className="ce_toolbar">
                <h2 className="se_heading"></h2>
                <input className="ce_input" placeholder="검색(제목/카테고리)" />
                <button className="ce_btn primary">+ 새 콘텐츠</button>
            </div>

            <div className="ce_table">
                <div className="ce_head">
                    <div>제목</div><div>카테고리</div><div>공개</div><div></div>
                </div>
                {list.map(item => (
                    <div className="ce_row" key={item.id}>
                        <div>{item.title}</div>
                        <div>{item.category}</div>
                        <div>{item.visible ? 'ON' : 'OFF'}</div>
                        <div className="ce_actions">
                            <button className="ce_btn">수정</button>
                            <button className="ce_btn danger">삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}