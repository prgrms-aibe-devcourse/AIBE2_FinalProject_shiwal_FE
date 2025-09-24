// src/shared/formatters/datetime.ts
export function formatJoinDate(
    iso?: string | null,
    timeZone: string = 'Asia/Seoul'
): string {
    if (!iso) return '-'
    try {
        const date = new Date(iso)
        if (isNaN(date.getTime())) return String(iso)

        // ko-KR + KST로 2자리 포맷 만들기
        const parts = new Intl.DateTimeFormat('ko-KR', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).formatToParts(date)

        const get = (type: Intl.DateTimeFormatPartTypes) =>
            parts.find(p => p.type === type)?.value ?? ''

        return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`
    } catch {
        return String(iso)
    }
}