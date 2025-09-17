import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

type Point = { date: string; visitors: number };

// 더미
const data: Point[] = [
    { date: '06-01', visitors: 3464 },
    { date: '07-01', visitors: 12466 },
    { date: '08-01', visitors: 6789 },
    { date: '09-01', visitors: 20592 },
    { date: '10-01', visitors: 4124 },
    { date: '11-01', visitors: 13211 },
    { date: '12-01', visitors: 4678 }
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