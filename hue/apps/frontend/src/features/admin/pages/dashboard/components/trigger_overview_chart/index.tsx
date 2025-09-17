import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

// 더미
const data = [
    { month: '1월', 위험발언: 4, 폭력발언: 8, 혐오발언: 5, 욕설: 3 },
    { month: '2월', 위험발언: 6, 폭력발언: 3, 혐오발언: 3, 욕설: 1 },
    { month: '3월', 위험발언: 5, 폭력발언: 7, 혐오발언: 4, 욕설: 6 },
    { month: '4월', 위험발언: 4, 폭력발언: 6, 혐오발언: 6, 욕설: 5 },
    { month: '5월', 위험발언: 2, 폭력발언: 4, 혐오발언: 2, 욕설: 2 },
    { month: '6월', 위험발언: 1, 폭력발언: 2, 혐오발언: 5, 욕설: 4 },
    { month: '7월', 위험발언: 2, 폭력발언: 5, 혐오발언: 1, 욕설: 6 }
]

const TriggerOverviewChart = () => {
    return (
        <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="위험발언" stackId="a" fill="#ef4444"/>
                    <Bar dataKey="폭력발언" stackId="a" fill="#3b82f6"/>
                    <Bar dataKey="혐오발언" stackId="a" fill="#facc15"/>
                    <Bar dataKey="욕설" stackId="a" fill="#22c55e"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TriggerOverviewChart
