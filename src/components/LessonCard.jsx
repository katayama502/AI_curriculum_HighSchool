import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, Play } from 'lucide-react'

const TYPE_LABEL  = { lecture: '講義', activity: '実践', quiz: 'クイズ' }
const TYPE_ICON   = { lecture: '📖', activity: '🔬', quiz: '✏️' }
const TYPE_COLOR  = {
  lecture:  'bg-blue-900/70 text-blue-200 border-blue-700/50',
  activity: 'bg-emerald-900/70 text-emerald-200 border-emerald-700/50',
  quiz:     'bg-purple-900/70 text-purple-200 border-purple-700/50',
}

const FALLBACK_GRADIENT = [
  'from-blue-700 to-blue-900',
  'from-emerald-700 to-emerald-900',
  'from-purple-700 to-purple-900',
  'from-orange-700 to-orange-900',
  'from-pink-700 to-pink-900',
]

export default function LessonCard({ lesson, unitId, lessonIndex, unitIndex = 0, done = false }) {
  const fallback = FALLBACK_GRADIENT[unitIndex % FALLBACK_GRADIENT.length]
  const [imgError, setImgError] = useState(false)

  const showImage = lesson.bannerUrl && !imgError

  return (
    <Link
      to={`/unit/${unitId}/lesson/${lesson.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden glass card-hover"
    >
      {/* ── バナー画像 ── */}
      <div className="relative overflow-hidden aspect-video bg-slate-900">
        {showImage ? (
          <img
            src={lesson.bannerUrl}
            alt={lesson.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallback}`} />
        )}

        {/* 完了バッジ */}
        {done && (
          <div className="absolute top-2 right-2 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
            <CheckCircle2 className="w-3.5 h-3.5" />
            完了
          </div>
        )}

        {/* レッスン番号 */}
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
          {lessonIndex + 1}
        </div>

        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* ── カード本文 ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* タイプバッジ */}
        <div className="mb-2">
          <span className={`badge border ${TYPE_COLOR[lesson.type]}`}>
            {TYPE_ICON[lesson.type]} {TYPE_LABEL[lesson.type]}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="font-bold text-slate-100 leading-snug mb-1.5 group-hover:text-primary-300 transition-colors line-clamp-2">
          {lesson.title}
        </h3>

        {/* 説明 */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {lesson.description}
        </p>

        {/* フッター */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/40">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration}分
          </span>
          {done
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <span className="text-xs text-slate-600 group-hover:text-primary-400 transition-colors font-medium">
                学習する →
              </span>
          }
        </div>
      </div>
    </Link>
  )
}
