// E:\hue\AIBE2_FinalProject_shiwal_FE\hue\apps\frontend\src\pages\dev\AiSmokePlayground.tsx
import { useState } from 'react'
import { aiSmoke, analyzeSmoke } from '@/lib/api'

export default function AiSmokePlayground() {
  const [msg, setMsg] = useState('오늘 할 일 시작이 막막해요.')
  const [anText, setAnText] = useState('죽   고   싶   어   요')
  const [out, setOut] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const runChat = async () => {
    setErr(null); setLoading(true)
    try {
      const res = await aiSmoke(msg, 'fe-s1', 1)
      setOut(res)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  const runAnalyze = async () => {
    setErr(null); setLoading(true)
    try {
      const res = await analyzeSmoke(anText)
      setOut(res)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui'}}>
      <h2>AI Smoke Playground (FE → BE1 → BE2)</h2>

      <section style={{marginTop: 16}}>
        <label>대화 메시지</label>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={3} style={{width:'100%'}} />
        <button onClick={runChat} disabled={loading} style={{marginTop:8}}>
          {loading ? '요청 중...' : '대화 스모크 실행'}
        </button>
      </section>

      <section style={{marginTop: 24}}>
        <label>분석 텍스트</label>
        <textarea value={anText} onChange={e=>setAnText(e.target.value)} rows={2} style={{width:'100%'}} />
        <button onClick={runAnalyze} disabled={loading} style={{marginTop:8}}>
          {loading ? '요청 중...' : '분석 스모크 실행'}
        </button>
      </section>

      {err && <pre style={{color:'crimson', marginTop:16}}>Error: {err}</pre>}
      {out !== null && <pre style={{marginTop:16, background:'#111', color:'#0f0', padding:12, overflow:'auto'}}>
        {JSON.stringify(out, null, 2)}
      </pre>}
    </div>
  )
}