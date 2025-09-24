import { useEffect, useState } from "react";
import { api, qs, type Page } from "../../../../../lib/api";

type Assessment = { id:number; code:string; title:string; deleted?:boolean; updatedAt?:string; };

export default function SelftestEditor(){
    const [q,setQ]=useState(""); const [page,setPage]=useState(0);
    const [size,setSize]=useState(10); const [sort,setSort]=useState("id,desc");
    const [data,setData]=useState<Page<Assessment>>({content:[],number:0,size:10,totalElements:0,totalPages:0});
    const [loading,setLoading]=useState(false);

    const load = async()=>{
        setLoading(true);
        const res = await api.get<Page<Assessment>>("/api/admin/assessments/all"+qs({page,size,q,sort}));
        setData(res.data); setLoading(false);
    };

    useEffect(()=>{ load(); /* eslint-disable-next-line */},[page,size,sort]);

    const remove = async(id:number)=>{ if(!confirm(`#${id} 삭제?`)) return; await api.delete(`/api/admin/assessments/${id}`); load(); };
    const restore = async(id:number)=>{ await api.post(`/api/admin/assessments/${id}/restore`); load(); };

    return (
        <section>
            <h2>자가분석테스트 관리</h2>
            <form onSubmit={e=>{e.preventDefault(); setPage(0); load();}} style={{display:"flex",gap:8,margin:"12px 0"}}>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="코드/제목 검색"/>
                <button type="submit">검색</button>
                <div style={{marginLeft:"auto",display:"flex",gap:8}}>
                    <select value={size} onChange={e=>setSize(+e.target.value)}>{[10,20,50].map(n=><option key={n} value={n}>{n}개</option>)}</select>
                    <select value={sort} onChange={e=>setSort(e.target.value)}>
                        <option value="id,desc">최신순</option><option value="title,asc">이름↑</option>
                    </select>
                    <button type="button" onClick={()=>alert("신규 검사 생성")}>+ 생성</button>
                </div>
            </form>

            <div className="content_card">
                {loading ? "로딩중..." : (
                    <table width="100%">
                        <thead><tr><th>ID</th><th>코드</th><th>이름</th><th>상태</th><th>수정일</th><th>액션</th></tr></thead>
                        <tbody>
                        {data.content.map(r=>(
                            <tr key={r.id}>
                                <td>{r.id}</td><td>{r.code}</td><td>{r.title}</td>
                                <td>{r.deleted ? "삭제됨" : "정상"}</td>
                                <td>{r.updatedAt??"-"}</td>
                                <td>
                                    <button onClick={()=>alert(`문항 관리 ${r.id}`)}>문항</button>{" "}
                                    <button onClick={()=>alert(`점수범위 관리 ${r.id}`)}>범위</button>{" "}
                                    {r.deleted
                                        ? <button onClick={()=>restore(r.id)}>복원</button>
                                        : <button onClick={()=>remove(r.id)}>삭제</button>}
                                </td>
                            </tr>
                        ))}
                        {data.content.length===0 && <tr><td colSpan={6}>데이터 없음</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>

            <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                <button disabled={page<=0} onClick={()=>setPage(0)}>«</button>
                <button disabled={page<=0} onClick={()=>setPage(p=>p-1)}>‹</button>
                <span>{page+1} / {Math.max(data.totalPages,1)}</span>
                <button disabled={page+1>=data.totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
                <button disabled={page+1>=data.totalPages} onClick={()=>setPage(data.totalPages-1)}>»</button>
            </div>
        </section>
    );
}