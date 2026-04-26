import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lightbulb, BookOpen } from 'lucide-react'
import { units, getLessonTypeLabel, getLessonTypeColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import QuizComponent from '../components/QuizComponent'
import MarkdownContent from '../components/MarkdownContent'

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

  // Find prev/next across all units
  const unitIdx = units.findIndex(u => u.id === unitId)
  const prevUnit = unitIdx > 0 ? units[unitIdx - 1] : null
  const nextUnit = unitIdx < units.length - 1 ? units[unitIdx + 1] : null

  const handleComplete = () => {
    markComplete(lesson.id)
  }

  const typeColors = {
    lecture: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
    activity: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
    quiz: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/curriculum" className="hover:text-slate-300 transition-colors">カリキュラム</Link>
        <span>/</span>
        <Link to={`/unit/${unitId}`} className="hover:text-slate-300 transition-colors truncate">
          {unit.title}
        </Link>
        <span>/</span>
        <span className="text-slate-400 truncate">{lesson.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
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
        <h1 className="text-3xl font-black text-slate-100 mb-2">{lesson.title}</h1>
        <p className="text-slate-400">{lesson.description}</p>
      </div>

      {/* Main Content */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-6">
        {lesson.type === 'quiz' && lesson.quiz ? (
          <QuizComponent quiz={lesson.quiz} onComplete={handleComplete} />
        ) : lesson.content ? (
          <>
            <MarkdownContent content={lesson.content} />

            {/* Key Points */}
            {lesson.keyPoints && lesson.keyPoints.length > 0 && (
              <div className="mt-8 rounded-xl bg-primary-950/40 border border-primary-800/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-primary-400" />
                  <span className="font-semibold text-primary-300 text-sm">この授業のポイント</span>
                </div>
                <ul className="space-y-2">
                  {lesson.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-primary-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Complete Button */}
      {lesson.type !== 'quiz' && (
        <div className="mb-6 text-center">
          {done ? (
            <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/50 text-emerald-300 px-6 py-3 rounded-xl font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              このレッスンを完了しました
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="btn-primary py-3 px-8 text-base"
            >
              <CheckCircle2 className="w-5 h-5" />
              完了にする
            </button>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {prevLesson ? (
          <Link
            to={`/unit/${unitId}/lesson/${prevLesson.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
            <div className="min-w-0">
              <div className="text-xs text-slate-500 mb-0.5">前のレッスン</div>
              <div className="text-sm font-medium text-slate-300 truncate">{prevLesson.title}</div>
            </div>
          </Link>
        ) : prevUnit ? (
          <Link
            to={`/unit/${prevUnit.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
            <div className="min-w-0">
              <div className="text-xs text-slate-500 mb-0.5">前の章</div>
              <div className="text-sm font-medium text-slate-300 truncate">{prevUnit.icon} {prevUnit.title}</div>
            </div>
          </Link>
        ) : (
          <Link
            to="/curriculum"
            className="flex-1 glass rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5">戻る</div>
              <div className="text-sm font-medium text-slate-300">カリキュラム一覧</div>
            </div>
          </Link>
        )}

        {nextLesson ? (
          <Link
            to={`/unit/${unitId}/lesson/${nextLesson.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <div className="min-w-0 text-right">
              <div className="text-xs text-slate-500 mb-0.5">次のレッスン</div>
              <div className="text-sm font-medium text-slate-300 truncate">{nextLesson.title}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
          </Link>
        ) : nextUnit ? (
          <Link
            to={`/unit/${nextUnit.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <div className="min-w-0 text-right">
              <div className="text-xs text-slate-500 mb-0.5">次の章</div>
              <div className="text-sm font-medium text-slate-300 truncate">{nextUnit.icon} {nextUnit.title}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
          </Link>
        ) : (
          <Link
            to="/curriculum"
            className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-0.5">完了</div>
              <div className="text-sm font-medium text-emerald-300">🎉 全章制覇！</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  )
}
