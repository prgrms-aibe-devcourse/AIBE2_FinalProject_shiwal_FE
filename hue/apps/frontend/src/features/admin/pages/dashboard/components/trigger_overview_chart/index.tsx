import { useEffect, useState } from "react"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { AdminApi } from "../../../../../../lib/adminApi"

type ChartRow = { month: string; chat: number; assess: number }

const TriggerOverviewChart = () => {
    const [data, setData] = useState<ChartRow[]>([])

    useEffect(() => {
        // 최근 7개월 데이터 가져오기
        AdminApi.getHighRiskMonthlySplit(7).then(res => {
            const merged = res.labels.map((label, i) => ({
                month: label,
                chat: res.chat[i],
                assess: res.assess[i],
            }))
            setData(merged)
        })
    }, [])

    return (
        <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="chat" name="AI 상담 고위험" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="assess" name="자가진단 고위험" stackId="a" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TriggerOverviewChart