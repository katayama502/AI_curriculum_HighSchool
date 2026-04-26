import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

export default function HtmlSlideViewer({ slides = [], title = '' }) {
  const [current, setCurrent] = useState(0)
  const [scale, setScale] = useState(1)
  const containerRef = useRef(null)

  // コンテナ幅に合わせてiframeをスケーリング（スライドは1280×720固定）
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1280)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!slides.length) return null

  const total = slides.length
  const slideFile = `/slides/${slides[current]}.html`

  const prev = () => setCurrent(i => Math.max(0, i - 1))
  const next = () => setCurrent(i => Math.min(total - 1, i + 1))

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div className="w-full" onKeyDown={handleKey} tabIndex={0} style={{ outline: 'none' }}>
      {/* スライド本体 */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/40 bg-slate-900"
        style={{ height: `${720 * scale}px` }}
      >
        <div
          style={{
            width: 1280,
            height: 720,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            key={slideFile}
            src={slideFile}
            title={`${title} - スライド ${current + 1}`}
            className="w-full h-full border-0"
            style={{ width: 1280, height: 720 }}
          />
        </div>
      </div>

      {/* コントロールバー */}
      <div className="flex items-center justify-between mt-3 px-1">
        {/* 前へ */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
        >
          <ChevronLeft className="w-4 h-4" />
          前へ
        </button>

        {/* スライド番号ドット */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 max-w-xs overflow-hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current
                    ? 'bg-primary-400 scale-125'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 ml-2 tabular-nums">
            {current + 1} / {total}
          </span>
        </div>

        {/* 次へ */}
        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
        >
          次へ
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 全画面リンク */}
      <div className="mt-2 flex justify-end">
        <a
          href={slideFile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          全画面で開く
        </a>
      </div>
    </div>
  )
}
