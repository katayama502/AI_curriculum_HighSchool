import { Link } from 'react-router-dom'
import { Clock, BookOpen, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

export default function CurriculumPage() {
  const { getUnitProgress, isComplete, getTotalProgress } = useProgress()
  const total = getTotalProgress(units)
  const totalLessons = units.reduce((s, u) => s + u.lessons.length, 0)
  const totalMinutes = units.reduce((s, u) => s + u.estimatedMinutes, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">AIカリキュラム</span>
        </h1>
        <p className="text-slate-400 text-lg">
          AIの基礎から倫理・実践まで、{units.length}単元{totalLessons}レッスンで体系的に学習
        </p>
      </div>

      {/* Progress Summary */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-slate-200">全体の進捗</span>
          <span className="text-sm text-slate-400">{total.done} / {total.total} レッスン完了</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000"
            style={{ width: `${total.percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
          <span>{total.percent}% 完了</span>
          <span>約{Math.round(totalMinutes / 60)}時間のコンテンツ</span>
        </div>
      </div>

      {/* Units */}
      <div className="space-y-4">
        {units.map((unit, unitIdx) => {
          const prog = getUnitProgress(unit)
          return (
            <div key={unit.id} className="glass rounded-2xl overflow-hidden">
              {/* Unit Header */}
              <Link
                to={`/unit/${unit.id}`}
                className="flex items-center gap-4 p-5 hover:bg-slate-800/30 transition-colors group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  {unit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-slate-500">第{unit.number}章</span>
                    <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
                      {getDifficultyLabel(unit.difficulty)}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-slate-100 truncate group-hover:text-primary-300 transition-colors">
                    {unit.title}
                  </h2>
                  <p className="text-sm text-slate-500">{unit.subtitle}</p>
                </div>
                <div className="hidden sm:block text-right flex-shrink-0">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {unit.totalLessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {unit.estimatedMinutes}分
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{prog.done}/{prog.total}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition-colors flex-shrink-0" />
              </Link>

              {/* Lesson List */}
              <div className="border-t border-slate-800/50 divide-y divide-slate-800/30">
                {unit.lessons.map((lesson, lIdx) => {
                  const done = isComplete(lesson.id)
                  const typeColors = {
                    lecture: 'text-blue-400',
                    activity: 'text-emerald-400',
                    quiz: 'text-purple-400',
                  }
                  const typeLabels = { lecture: '講義', activity: '実践', quiz: 'クイズ' }
                  return (
                    <Link
                      key={lesson.id}
                      to={`/unit/${unit.id}/lesson/${lesson.id}`}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/20 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        {done
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          : <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        }
                      </div>
                      <span className="text-sm font-medium text-slate-500 w-6 flex-shrink-0">
                        {lIdx + 1}
                      </span>
                      <span className="flex-1 text-sm text-slate-300 group-hover:text-slate-100 transition-colors truncate">
                        {lesson.title}
                      </span>
                      <span className={`text-xs font-medium flex-shrink-0 ${typeColors[lesson.type]}`}>
                        {typeLabels[lesson.type]}
                      </span>
                      <span className="text-xs text-slate-600 flex-shrink-0 hidden sm:block">
                        {lesson.duration}分
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
