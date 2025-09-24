// features/admin/pages/contents/components/healing_editor.tsx
import { useEffect, useState } from "react";
import Modal from "../../../../../components/Modal";
import { api, qs, type Page } from "../../../../../lib/api";

/** 서버 Enum 스펙에 맞춘 타입 */
type Category = "MUSIC" | "MEDITATION" | "MOOD_BOOST";
type MediaType = "AUDIO" | "VIDEO" | "TEXT" | "LINK";
type Visibility = "PUBLIC" | "PRIVATE";

type CmsContent = {
    id: number;
    category: Category;
    title: string;
    text: string;
    mediaType: MediaType;
    duration: number;
    thumbnailUrl: string;
    visibility: Visibility;
    groupKey: string;
    publishedAt: string; // ISO
    updatedAt?: string;
};

type FormState = Partial<CmsContent> & { id?: number };

// datetime-local <-> ISO 변환 유틸
function toLocalInputValue(iso: string) {
    try {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
            d.getHours()
        )}:${pad(d.getMinutes())}`;
    } catch {
        return "";
    }
}
function fromLocalInputValue(localStr: string) {
    return localStr ? new Date(localStr).toISOString() : new Date().toISOString();
}

export default function HealingEditor() {
    const [q, setQ] = useState("");
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const [data, setData] = useState<Page<CmsContent>>({
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10,
    } as any);
    const [, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>({
        category: "MUSIC",
        title: "",
        text: "",
        mediaType: "AUDIO",
        duration: 0,
        thumbnailUrl: "",
        visibility: "PUBLIC",
        groupKey: "default",
        publishedAt: new Date().toISOString(),
    });

    const load = async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await api.get<Page<CmsContent>>(
                "/api/admin/cms-contents" + qs({ page, size, q })
            );
            const body: any = res.data;
            if (Array.isArray(body)) {
                setData({
                    content: body,
                    totalElements: body.length,
                    totalPages: 1,
                    number: 0,
                    size,
                } as any);
            } else {
                setData(body);
            }
        } catch (e: any) {
            console.error("LIST FAILED:", e.response?.status, e.response?.data);
            setErr(e.response?.data?.message ?? "불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, q]);

    const edit = async (id: number) => {
        try {
            const res = await api.get<CmsContent>(`/api/admin/cms-contents/${id}`);
            setForm({
                ...res.data,
                publishedAt: res.data.publishedAt || new Date().toISOString(),
            });
            setOpen(true);
        } catch (e: any) {
            alert(e.response?.data?.message ?? "항목 불러오기 실패");
        }
    };

    const save = async () => {
        try {
            const payload: CmsContent = {
                id: form.id ?? 0,
                category: (form.category as Category) ?? "MUSIC",
                title: form.title ?? "",
                text: form.text ?? "",
                mediaType: (form.mediaType as MediaType) ?? "AUDIO",
                duration: Number(form.duration ?? 0),
                thumbnailUrl: form.thumbnailUrl ?? "",
                visibility: (form.visibility as Visibility) ?? "PUBLIC",
                groupKey: form.groupKey ?? "default",
                publishedAt: form.publishedAt ?? new Date().toISOString(),
            };

            if (form.id) {
                await api.put(`/api/admin/cms-contents/${form.id}`, payload);
            } else {
                await api.post(`/api/admin/cms-contents`, payload);
            }
            setOpen(false);
            await load();
        } catch (e: any) {
            console.error("SAVE FAILED:", e.response?.status, e.response?.data);
            alert(e.response?.data?.message ?? "저장 실패");
        }
    };

    const remove = async (id: number) => {
        if (!confirm(`#${id} 삭제할까요?`)) return;
        try {
            await api.delete(`/api/admin/cms-contents/${id}`);
            await load();
        } catch (e: any) {
            alert(e.response?.data?.message ?? "삭제 실패");
        }
    };

    const toggleVisibility = async (id: number) => {
        try {
            await api.patch(`/api/admin/cms-contents/${id}/visibility`);
            await load();
        } catch (e: any) {
            alert(e.response?.data?.message ?? "상태 변경 실패");
        }
    };

    return (
        <section>
            <h2>힐링콘텐츠 관리</h2>

            {/* 검색 */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage(0);
                    load();
                }}
            >
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="제목/카테고리 검색" />
                <button type="submit">검색</button>
                <button
                    type="button"
                    onClick={() => {
                        setForm({
                            category: "MUSIC",
                            title: "",
                            text: "",
                            mediaType: "AUDIO",
                            duration: 0,
                            thumbnailUrl: "",
                            visibility: "PUBLIC",
                            groupKey: "default",
                            publishedAt: new Date().toISOString(),
                        });
                        setOpen(true);
                    }}
                >
                    + 신규 등록
                </button>
            </form>

            {err && <div style={{ color: "red" }}>{err}</div>}

            {/* 리스트 */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>카테고리</th>
                    <th>미디어</th>
                    <th>공개</th>
                    <th>발행</th>
                    <th>액션</th>
                </tr>
                </thead>
                <tbody>
                {data.content.map((r) => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.title}</td>
                        <td>{r.category}</td>
                        <td>{r.mediaType}</td>
                        <td>{r.visibility}</td>
                        <td>{r.publishedAt ? toLocalInputValue(r.publishedAt) : "-"}</td>
                        <td>
                            <button onClick={() => edit(r.id)}>수정</button>
                            <button onClick={() => toggleVisibility(r.id)}>공개토글</button>
                            <button onClick={() => remove(r.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 모달 */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={form.id ? `콘텐츠 수정 #${form.id}` : "신규 콘텐츠 등록"}
            >
                <label>
                    제목
                    <input value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                </label>

                <label>
                    카테고리
                    <select value={form.category ?? "MUSIC"} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}>
                        <option value="MUSIC">MUSIC</option>
                        <option value="MEDITATION">MEDITATION</option>
                        <option value="MOOD_BOOST">MOOD_BOOST</option>
                    </select>
                </label>

                <label>
                    미디어 타입
                    <select value={form.mediaType ?? "AUDIO"} onChange={(e) => setForm((f) => ({ ...f, mediaType: e.target.value as MediaType }))}>
                        <option value="AUDIO">AUDIO</option>
                        <option value="VIDEO">VIDEO</option>
                        <option value="TEXT">TEXT</option>
                        <option value="LINK">LINK</option>
                    </select>
                </label>

                <label>
                    본문/설명
                    <textarea value={form.text ?? ""} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} />
                </label>

                <label>
                    썸네일 URL
                    <input value={form.thumbnailUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, thumbnailUrl: e.target.value }))} />
                </label>

                <label>
                    그룹키
                    <input value={form.groupKey ?? "default"} onChange={(e) => setForm((f) => ({ ...f, groupKey: e.target.value }))} />
                </label>

                <label>
                    재생 시간(초)
                    <input type="number" value={form.duration ?? 0} onChange={(e) => setForm((f) => ({ ...f, duration: Number(e.target.value) }))} />
                </label>

                <label>
                    발행일시
                    <input type="datetime-local" value={toLocalInputValue(form.publishedAt ?? new Date().toISOString())} onChange={(e) => setForm((f) => ({ ...f, publishedAt: fromLocalInputValue(e.target.value) }))} />
                </label>

                <label>
                    공개여부
                    <select value={form.visibility ?? "PUBLIC"} onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value as Visibility }))}>
                        <option value="PUBLIC">PUBLIC</option>
                        <option value="PRIVATE">PRIVATE</option>
                    </select>
                </label>

                <button onClick={save}>저장</button>
            </Modal>
        </section>
    );
}