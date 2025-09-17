import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

type Point = { date: string; signups: number };

// 더미
const data: Point[] = [
    { date: '06-01', signups: 8123 },
    { date: '07-01', signups: 15422 },
    { date: '08-01', signups: 9744 },
    { date: '09-01', signups: 18732 },
    { date: '10-01', signups: 7055 },
    { date: '11-01', signups: 13211 },
    { date: '12-01', signups: 16824 }
];

const SignupTrend = () => {
    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip />
                    <Line type="monotone" dataKey="signups" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SignupTrend;