import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

type Point = { date: string; visitors: number };

// 더미
const data: Point[] = [
    { date: '01-01', visitors: 145_632 },
    { date: '01-08', visitors: 191_472 },
    { date: '01-15', visitors: 89_375 },
    { date: '01-22', visitors: 246_904 },
    { date: '01-29', visitors: 103_408 },
];

const VisitTrend = () => {
    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitTrend;