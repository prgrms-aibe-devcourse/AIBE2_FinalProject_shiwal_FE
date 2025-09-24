// src/features/admin/pages/dashboard/components/signup_trend/index.tsx
import { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

import { AdminApi } from '../../../../../../lib/adminApi';

type Point = { date: string; signups: number };

const fmtISO = (d: Date) => d.toISOString().slice(0, 10); // YYYY-MM-DD
const labelMM = (iso: string) => {
    // "2025-09-01" -> "09-01" (원래 그래프 라벨 스타일 유지)
    if (!iso) return '';
    const mm = iso.slice(2, 4);
    const dd = iso.slice(5, 7);
    return `${mm}.${dd}`;
};

const SignupTrend = () => {
    const [data, setData] = useState<Point[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const to = new Date();
        const from = new Date();
        from.setMonth(to.getMonth() - 6); // 최근 6개월 범위

        AdminApi.getMonthlyMetrics(fmtISO(from), fmtISO(to))
            .then((res) => {
                // Swagger 응답: MonthlyMetric[] (month, monthlyNewSignups, ...)
                const arr = (res.data ?? []) as Array<any>;
                const shaped: Point[] = arr.map((m) => ({
                    date: labelMM(m.month),                         // X축 라벨
                    signups: Number(m.monthlyNewSignups ?? 0),      // 가입자 수
                }));
                setData(shaped);
            })
            .catch((err) => {
                console.error(err);
                alert('가입자 추이를 불러오지 못했습니다.');
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
                    <Line type="monotone" dataKey="signups" dot={false} name="가입자" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SignupTrend;