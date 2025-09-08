import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

// 더미
const data = [
    { month: '1월', self_harm: 4, violence: 8, hate: 5, profanity: 7 },
    { month: '2월', self_harm: 6, violence: 5, hate: 3, profanity: 4 },
    { month: '3월', self_harm: 5, violence: 7, hate: 4, profanity: 6 },
    { month: '4월', self_harm: 7, violence: 6, hate: 6, profanity: 5 },
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
                    <Bar dataKey="self_harm" stackId="a" />
                    <Bar dataKey="violence" stackId="a" />
                    <Bar dataKey="hate" stackId="a" />
                    <Bar dataKey="profanity" stackId="a" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TriggerOverviewChart
