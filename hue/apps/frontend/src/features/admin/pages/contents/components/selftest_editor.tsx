import { useState } from 'react'

type Category = { id: string; name: string; desc?: string }
type TestItem = { id: string; categoryId: string; title: string; active: boolean }

const cats: Category[] = [
    { id: 'c1', name: '마음 상태 체크', desc: '하루 기분/스트레스' },
    { id: 'c2', name: '수면/에너지', desc: '피로/수면의 질' },
]
const items: TestItem[] = [
    { id: 't1', categoryId: 'c1', title: '오늘의 기분 5점 척도', active: true },
    { id: 't2', categoryId: 'c2', title: '지난 1주 수면 만족도', active: true },
]

export default function SelfTestEditor() {
    const [category] = useState<Category[]>(cats)
    const [tests] = useState<TestItem[]>(items)

    return (
        <div className="se_wrap">
            <div className="se_toolbar">
                <button className="se_btn primary">+ 카테고리</button>
                <button className="se_btn">+ 테스트</button>
            </div>

            <div className="se_grid">
                <div className="se_panel">
                    <h3>카테고리</h3>
                    {category.map(c => (
                        <div key={c.id} className="se_row">
                            <div className="se_title">{c.name}</div>
                            <div className="se_desc">{c.desc}</div>
                        </div>
                    ))}
                </div>

                <div className="se_panel">
                    <h3>테스트 목록</h3>
                    {tests.map(t => (
                        <div key={t.id} className="se_row">
                            <div className="se_title">{t.title}</div>
                            <div className="se_badge">{t.active ? '활성' : '비활성'}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}