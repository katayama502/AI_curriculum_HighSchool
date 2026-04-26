import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen, ChevronRight, CheckCircle2, Circle, Play } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = units.find(u => u.id === unitId)
  const { getUnitProgress, isComplete } = useProgress()

  if (!unit) return <Navigate to="/curriculum" replace />

  const prog = getUnitProgress(unit)
  const unitIdx = units.findIndex(u => u.id === unitId)
  const prevUnit = units[unitIdx - 1]
  const nextUnit = units[unitIdx + 1]

  const typeColors = {
    lecture: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
    activity: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
    quiz: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
  }
  const typeLabels = { lecture: '講義', activity: '実践', quiz: 'クイズ' }
  const typeIcons = { lecture: '📖', activity: '🔬', quiz: '✏️' }

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      {/* Back */}
      <Link
        to="/curriculum"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        カリキュラムに戻る
      </Link>

      {/* Unit Header */}
      <div className={`rounded-2xl p-6 mb-6 bg-gradient-to-br ${unit.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full text-white">
              第{unit.number}章
            </span>
            <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
              {getDifficultyLabel(unit.difficulty)}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{unit.icon}</span>
            <div>
              <h1 className="text-3xl font-black text-white mb-1">{unit.title}</h1>
              <p className="text-white/70 text-sm mb-3">{unit.subtitle}</p>
              <p className="text-white/80 text-sm leading-relaxed">{unit.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {unit.totalLessons} レッスン
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              約{unit.estimatedMinutes}分
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">この章の進捗</span>
          <span className="text-sm text-slate-500">{prog.done}/{prog.total}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
            style={{ width: `${prog.percent}%` }}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {unit.lessons.map((lesson, idx) => {
          const done = isComplete(lesson.id)
          const isFirst = idx === 0
          const prevLesson = unit.lessons[idx - 1]
          const prevDone = prevLesson ? isComplete(prevLesson.id) : true

          return (
            <Link
              key={lesson.id}
              to={`/unit/${unit.id}/lesson/${lesson.id}`}
              className="glass rounded-xl p-4 flex items-center gap-4 card-hover group block"
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {done
                  ? <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  : <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-primary-600 transition-colors">
                      <span className="text-slate-500 font-bold text-sm group-hover:text-primary-400 transition-colors">
                        {idx + 1}
                      </span>
                    </div>
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`badge border ${typeColors[lesson.type]}`}>
                    {typeIcons[lesson.type]} {typeLabels[lesson.type]}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-200 group-hover:text-primary-300 transition-colors truncate">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{lesson.description}</p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm text-slate-600 hidden sm:block">{lesson.duration}分</span>
                <Play className="w-4 h-4 text-slate-600 group-hover:text-primary-400 transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Navigation between units */}
      <div className="flex items-center gap-3 mt-8">
        {prevUnit && (
          <Link
            to={`/unit/${prevUnit.id}`}
            className="flex-1 glass rounded-xl p-4 text-center hover:bg-slate-800/40 transition-colors"
          >
            <div className="text-xs text-slate-500 mb-1">前の章</div>
            <div className="text-sm font-medium text-slate-300 truncate">
              {prevUnit.icon} {prevUnit.title}
            </div>
          </Link>
        )}
        {nextUnit && (
          <Link
            to={`/unit/${nextUnit.id}`}
            className="flex-1 glass rounded-xl p-4 text-center hover:bg-slate-800/40 transition-colors"
          >
            <div className="text-xs text-slate-500 mb-1">次の章</div>
            <div className="text-sm font-medium text-slate-300 truncate">
              {nextUnit.icon} {nextUnit.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
