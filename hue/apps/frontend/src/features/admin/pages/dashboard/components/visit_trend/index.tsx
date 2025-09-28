// src/features/admin/pages/dashboard/components/visit_trend/index.tsx
import { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

import { AdminApi } from '../../../../../../lib/adminApi';

type Point = { date: string; visitors: number };

const fmtISO = (d: Date) => d.toISOString().slice(0, 10);

// "2025-09-01" -> "25.09"
const labelYM = (iso: string) => {
    if (!iso) return '';
    const yy = iso.slice(2, 4);
    const mm = iso.slice(5, 7);
    return `${yy}.${mm}`;
};

const VisitTrend = () => {
    const [data, setData] = useState<Point[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const to = new Date();
        const from = new Date();
        from.setMonth(to.getMonth() - 6); // 최근 6개월

        AdminApi.getMonthlyMetrics(fmtISO(from), fmtISO(to))
            .then((res) => {
                const arr = (res.data ?? []) as Array<any>;
                const shaped: Point[] = arr.map((m) => ({
                    date: labelYM(m.month),
                    visitors: Number(m.monthlyActiveUsers ?? 0), // ✅ 방문자 수
                }));
                setData(shaped);
            })
            .catch((err) => {
                console.error(err);
                alert('방문자 추이를 불러오지 못했습니다.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div style={{ height: 220, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>로딩중…</div>;
    }

    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v: number) => v.toLocaleString()} />
                    <Tooltip
                        formatter={(v: any) => Number(v).toLocaleString()}
                        labelFormatter={(label) => label}
                    />
                    <Line type="monotone" dataKey="visitors" dot={false} name="방문자" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitTrend;