// src/shared/formatters/datetime.ts
export function formatJoinDate(
  iso?: string | null,
  timeZone: string = 'Asia/Seoul'
): string {
  if (!iso) return '-'

  try {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return String(iso)

    // ko-KR + 지정 타임존으로 안전하게 분해
    const parts = new Intl.DateTimeFormat('ko-KR', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date)

    // NOTE: 일부 TS 환경에서 Intl.DateTimeFormatPartTypes 타입을 못 찾을 수 있어 string으로 처리
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''

    const year = get('year')
    const month = get('month').padStart(2, '0')
    const day = get('day').padStart(2, '0')
    const hour = get('hour').padStart(2, '0')
    const minute = get('minute').padStart(2, '0')

    // 최종 출력: YYYY-MM-DD HH:mm
    if (year && month && day && hour && minute) {
      return `${year}-${month}-${day} ${hour}:${minute}`
    }

    // parts가 비정상인 드문 케이스 대비 수동 포맷
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}`
  } catch {
    // 어떤 예외가 와도 원문 반환 (깨진 문자열 표시 방지)
    return String(iso)
  }
}