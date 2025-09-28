import { useState } from 'react'

// 타입 정의
type Category = { id: string; name: string; desc?: string }
type TestItem = { id: string; categoryId: string; title: string; active: boolean }

// 초기 더미 데이터
const cats: Category[] = [
    { id: 'c1', name: '마음 상태 체크', desc: '하루 기분/스트레스' },
    { id: 'c2', name: '수면/에너지', desc: '피로/수면의 질' },
]
const items: TestItem[] = [
    { id: 't1', categoryId: 'c1', title: '오늘의 기분 5점 척도', active: true },
    { id: 't2', categoryId: 'c2', title: '지난 1주 수면 만족도', active: true },
]

export default function SelfTestEditor() {
    // 상태 선언
    const [category, setCategory] = useState<Category[]>(cats)
    const [tests, setTests] = useState<TestItem[]>(items)

    const [newCategory, setNewCategory] = useState({ name: '', desc: '' })
    const [newTestTitle, setNewTestTitle] = useState('')

    // 카테고리 추가 함수
    const handleAddCategory = () => {
        if (!newCategory.name.trim()) return
        const newCat: Category = {
            id: `c${Date.now()}`,
            name: newCategory.name,
            desc: newCategory.desc,
        }
        setCategory(prev => [...prev, newCat])
        setNewCategory({ name: '', desc: '' })
    }

    // 테스트 항목 추가 함수
    const handleAddTest = () => {
        if (!newTestTitle.trim()) return
        const firstCategoryId = category[0]?.id || 'c1'
        const newTest: TestItem = {
            id: `t${Date.now()}`,
            categoryId: firstCategoryId,
            title: newTestTitle,
            active: true,
        }
        setTests(prev => [...prev, newTest])
        setNewTestTitle('')
    }

    return (
        <div className="se_wrap">
            <h2 className="se_heading"></h2>

            {/* 입력 영역 */}
            <div className="se_toolbar">
                <input
                    type="text"
                    placeholder="카테고리 이름"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="se_input"
                />
                <input
                    type="text"
                    placeholder="설명"
                    value={newCategory.desc}
                    onChange={(e) => setNewCategory({ ...newCategory, desc: e.target.value })}
                    className="se_input"
                />
                <button className="se_btn primary" onClick={handleAddCategory}>+ 카테고리</button>
            </div>

            <div className="se_toolbar">
                <input
                    type="text"
                    placeholder="테스트 항목 제목"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    className="se_input"
                />
                <button className="se_btn" onClick={handleAddTest}>+ 테스트</button>
            </div>

            {/* 목록 출력 영역 */}
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