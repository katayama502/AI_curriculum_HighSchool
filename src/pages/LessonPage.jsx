import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { units, getLessonTypeLabel, getLessonTypeColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import QuizComponent from '../components/QuizComponent'
import GoogleSlidesEmbed from '../components/GoogleSlidesEmbed'

export default function LessonPage() {
  const { unitId, lessonId } = useParams()
  const { markComplete, isComplete } = useProgress()

  const unit = units.find(u => u.id === unitId)
  if (!unit) return <Navigate to="/curriculum" replace />

  const lessonIdx = unit.lessons.findIndex(l => l.id === lessonId)
  if (lessonIdx === -1) return <Navigate to={`/unit/${unitId}`} replace />

  const lesson = unit.lessons[lessonIdx]
  const done = isComplete(lesson.id)
  const prevLesson = unit.lessons[lessonIdx - 1]
  const nextLesson = unit.lessons[lessonIdx + 1]

  const unitIdx = units.findIndex(u => u.id === unitId)
  const prevUnit = unitIdx > 0 ? units[unitIdx - 1] : null
  const nextUnit = unitIdx < units.length - 1 ? units[unitIdx + 1] : null

  const handleComplete = () => markComplete(lesson.id)

  const isQuiz = lesson.type === 'quiz'

  const typeColors = {
    lecture: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
    activity: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
    quiz: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
  }

  return (
    // スライド埋め込みのため、クイズ時は max-w-2xl、スライド時は max-w-5xl で表示
    <div className={`mx-auto px-4 py-24 ${isQuiz ? 'max-w-2xl' : 'max-w-5xl'}`}>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link to="/curriculum" className="hover:text-slate-300 transition-colors">カリキュラム</Link>
        <span>/</span>
        <Link to={`/unit/${unitId}`} className="hover:text-slate-300 transition-colors truncate">
          {unit.title}
        </Link>
        <span>/</span>
        <span className="text-slate-400 truncate">{lesson.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className={`badge border ${typeColors[lesson.type]}`}>
            {getLessonTypeLabel(lesson.type)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration}分
          </span>
          {done && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              完了済み
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100 mb-1">{lesson.title}</h1>
        <p className="text-slate-400 text-sm">{lesson.description}</p>
      </div>

      {/* Main Content */}
      {isQuiz && lesson.quiz ? (
        <div className="glass rounded-2xl p-6 md:p-8 mb-6">
          <QuizComponent quiz={lesson.quiz} onComplete={handleComplete} />
        </div>
      ) : (
        <div className="mb-6">
          <GoogleSlidesEmbed url={lesson.slideUrl} title={lesson.title} />
        </div>
      )}

      {/* Complete Button（クイズ以外） */}
      {!isQuiz && (
        <div className="mb-8 text-center">
          {done ? (
            <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/50 text-emerald-300 px-6 py-3 rounded-xl font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              このレッスンを完了しました
            </div>
          ) : (
            <button onClick={handleComplete} className="btn-primary py-3 px-8 text-base">
              <CheckCircle2 className="w-5 h-5" />
              完了にする
            </button>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {/* 前へ */}
        {prevLesson ? (
          <PrevLink to={`/unit/${unitId}/lesson/${prevLesson.id}`} label="前のレッスン" title={prevLesson.title} />
        ) : prevUnit ? (
          <PrevLink to={`/unit/${prevUnit.id}`} label="前の章" title={`${prevUnit.icon} ${prevUnit.title}`} />
        ) : (
          <PrevLink to="/curriculum" label="戻る" title="カリキュラム一覧" />
        )}

        {/* 次へ */}
        {nextLesson ? (
          <NextLink to={`/unit/${unitId}/lesson/${nextLesson.id}`} label="次のレッスン" title={nextLesson.title} />
        ) : nextUnit ? (
          <NextLink to={`/unit/${nextUnit.id}`} label="次の章" title={`${nextUnit.icon} ${nextUnit.title}`} />
        ) : (
          <div className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-0.5">完了</div>
              <div className="text-sm font-medium text-emerald-300">🎉 全章制覇！</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  )
}

function PrevLink({ to, label, title }) {
  return (
    <Link
      to={to}
      className="flex-1 glass rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800/40 transition-colors group"
    >
      <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
      <div className="min-w-0">
        <div className="text-xs text-slate-500 mb-0.5">{label}</div>
        <div className="text-sm font-medium text-slate-300 truncate">{title}</div>
      </div>
    </Link>
  )
}

function NextLink({ to, label, title }) {
  return (
    <Link
      to={to}
      className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3 hover:bg-slate-800/40 transition-colors group"
    >
      <div className="min-w-0 text-right">
        <div className="text-xs text-slate-500 mb-0.5">{label}</div>
        <div className="text-sm font-medium text-slate-300 truncate">{title}</div>
      </div>
      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
    </Link>
  )
}
