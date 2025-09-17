import { useState } from 'react'
import './contents.css'
import HealingEditor from './components/healing_editor'
import SelfTestEditor from './components/selftest_editor'

type Tab = 'healing' | 'selftest'

export default function ContentsPage() {
    const [tab, setTab] = useState<Tab>('healing')

    return (
        <div className="contents_wrap">
            <h2>콘텐츠 관리</h2>

            <div className="contents_tabs">
                <button
                    className={`tab_btn ${tab === 'healing' ? 'active' : ''}`}
                    onClick={() => setTab('healing')}
                >
                    힐링콘텐츠 수정/관리
                </button>
                <button
                    className={`tab_btn ${tab === 'selftest' ? 'active' : ''}`}
                    onClick={() => setTab('selftest')}
                >
                    자기분석 테스트 목록 수정/관리
                </button>
            </div>

            <div className="contents_area">
                {tab === 'healing' ? <HealingEditor /> : <SelfTestEditor />}
            </div>
        </div>
    )
}