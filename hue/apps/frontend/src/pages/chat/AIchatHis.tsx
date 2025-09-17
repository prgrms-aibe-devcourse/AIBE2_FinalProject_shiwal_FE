import { useEffect, useState } from "react";

interface ChatSummary {
    id: number;
    title: string;
    keywords: string[];
    date: string;
    details: string[];
    bookmarked?: boolean;
}

// 더미 데이터 (→ 나중에 API 연동으로 교체 가능)
const dummyData: ChatSummary[] = [
    {
        id: 1,
        title: "대인관계 불안",
        keywords: ["대인관계", "불안"],
        date: "2025-08-08",
        details: [
            "최근 친구와의 갈등으로 불안을 경험함",
            "자기 표현이 어렵고, 상대방의 반응을 과도하게 신경 씀",
            "스트레스 수준이 높음 (피로감 호소)",
        ],
        bookmarked: true,
    },
    {
        id: 2,
        title: "학업 스트레스, 자기비판",
        keywords: ["학업", "자기비판"],
        date: "2025-08-09",
        details: [
            "시험 준비 중 압박감을 느낌",
            "자기 비판적 태도가 강화되고, 성취에 대한 부담이 큼",
            "집중력 저하와 수면 부족이 동반됨",
        ],
        bookmarked: false,
    },
    {
        id: 3,
        title: "직장 내 갈등",
        keywords: ["직장", "스트레스"],
        date: "2025-08-17",
        details: [
            "상사와의 의견 충돌이 잦음",
            "업무 과부하로 인한 불만 호소",
            "스트레스로 인한 수면 장애 발생",
        ],
        bookmarked: true,
    },
];

function AIchatHis() {
    const [summaries, setSummaries] = useState<ChatSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("전체");

    useEffect(() => {
        // 나중에 fetch(API)로 교체 예정
        setTimeout(() => {
            setSummaries(dummyData);
            setLoading(false);
        }, 300);
    }, []);

    if (loading) return <div>불러오는 중...</div>;

    // 검색 + 필터 적용
    const filtered = summaries.filter((s) => {
        const matchSearch =
            s.title.includes(search) ||
            s.keywords.some((k) => k.includes(search)) ||
            s.details.some((d) => d.includes(search));

        const matchFilter =
            filter === "전체" ||
            (filter === "북마크" && s.bookmarked) ||
            (filter === "이번 주" && s.date >= "2025-08-14") || // 임시 조건
            (filter === "이번 달" && s.date.startsWith("2025-08"));

        return matchSearch && matchFilter;
    });

    return (
        <div className="main-box-row">
            <div className="title">채팅 요약 모아보기</div>
            <section className="green-box">

            {/* 검색 + 필터 */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="대화 주제, 키워드 검색 ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="이번 주">이번 주</option>
                    <option value="이번 달">이번 달</option>
                    <option value="전체">전체</option>
                    <option value="북마크">북마크</option>
                </select>
            </div>

            {/* 카드 리스트 */}
                <div className="cards">
                {filtered.length > 0 ? (
                    filtered.map((s) => (
                        <div key={s.id} className="summary-card">
                            <div className="summary-header">
                <span className="summary-title">
                  {s.title} {s.bookmarked ? "⭐" : ""}
                </span>
                                <span className="summary-date">{s.date}</span>
                            </div>
                            <div className="summary-content">
                                {s.details.slice(0, 3).map((d, i) => (
                                    <p key={i}>⦁ {d}</p>
                                ))}
                            </div>
                            <div className="summary-footer">
                                <p>...</p> <button className="detail-btn">자세히 보기</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
                </div>
            </section>
        </div>
    );
}

export default AIchatHis;
// 카드 스크롤, 북마크 로직(필수 X), 자세히 보기(필수 X) 설정 X