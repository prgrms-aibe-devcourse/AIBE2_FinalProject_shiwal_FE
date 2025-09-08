import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

type Point = { date: string; signups: number };

// 더미
const data: Point[] = [
    { date: '01-01', signups: 8123 },
    { date: '01-08', signups: 15422 },
    { date: '01-15', signups: 9744 },
    { date: '01-22', signups: 18732 },
    { date: '01-29', signups: 13211 },
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