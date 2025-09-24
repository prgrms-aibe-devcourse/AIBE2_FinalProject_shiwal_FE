// src/features/admin/pages/dashboard/components/self_diagnosis_summary/index.tsx
import './self_diagnosis_summary.css'
import { useEffect, useState } from 'react'
import { AdminApi } from '../../../../../../lib/adminApi'
import type { MetricsSummary } from '../../../../../../lib/adminApi' // <- 타입만 import

type Risk_item = {
    nickname: string
    tags: string[]
}

const SelfDiagnosisSummary = () => {
    // --------------------- 변경: 더미 → 상태 ---------------------
    const [detectedCount, setDetectedCount] = useState<number>(0)     // 위험감지
    const [totalTests, setTotalTests] = useState<number>(0)           // 전체검사
    // -------------------------------------------------------------

    // (선택) 최근 위험 사용자 더미는 일단 그대로. 별도 API가 생기면 여기에 교체.
    const recent_items: Risk_item[] = [
        { nickname: '식빵맨', tags: ['불안', '우울'] },
        { nickname: '콩콩이', tags: ['스트레스', '무기력'] },
        { nickname: '후추',   tags: ['자살 생각', '불면'] },
    ]

    // --------------------- 추가: 최근 1개월 자동 조회 ---------------------
    useEffect(() => {
        const today = new Date()
        const to = today.toISOString().split('T')[0]

        const fromDate = new Date()
        fromDate.setMonth(today.getMonth() - 1)
        const from = fromDate.toISOString().split('T')[0]

        AdminApi.getMetricsSummary(from, to)
            .then((res) => {
                const d: MetricsSummary = res.data
                // ⚠️ 매핑 규칙
                // - 위험감지  = 자가진단에서의 고위험 수 -> d.highRiskFromAssessment
                // - 전체검사  = 자가진단 참여 사용자 수(또는 전체 검사 수) -> d.selfAssessmentUsers
                setDetectedCount(d.highRiskFromAssessment ?? 0)
                setTotalTests(d.selfAssessmentUsers ?? 0)
            })
            .catch((err) => {
                console.error('자가진단 요약 불러오기 실패:', err)
            })
    }, [])
    // --------------------------------------------------------------------

    // ⬇️ 아래 JSX 구조/클래스는 "그대로" 유지 (UI 무변경)
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
                            <span className="self_summary_value">{detectedCount}건</span> {/* 변경 */}
                        </div>
                        <div className="self_summary_row">
                            <span className="self_summary_label">전체검사</span>
                            <span className="self_summary_value">{totalTests}건</span>     {/* 변경 */}
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