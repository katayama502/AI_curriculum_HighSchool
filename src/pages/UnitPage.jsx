import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import LessonCard from '../components/LessonCard'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = units.find(u => u.id === unitId)
  const { getUnitProgress, isComplete } = useProgress()

  if (!unit) return <Navigate to="/curriculum" replace />

  const prog = getUnitProgress(unit)
  const unitIdx = units.findIndex(u => u.id === unitId)
  const prevUnit = units[unitIdx - 1]
  const nextUnit = units[unitIdx + 1]

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">

      {/* 戻るリンク */}
      <Link
        to="/curriculum"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        カリキュラムに戻る
      </Link>

      {/* ── 単元ヒーローバナー ── */}
      <div className={`rounded-2xl p-7 mb-6 bg-gradient-to-br ${unit.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
              第{unit.number}章
            </span>
            <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
              {getDifficultyLabel(unit.difficulty)}
            </span>
          </div>
          <div className="flex items-start gap-5">
            <span className="text-6xl drop-shadow-lg">{unit.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{unit.title}</h1>
              <p className="text-white/70 text-sm mb-3">{unit.subtitle}</p>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">{unit.description}</p>
              <div className="flex items-center gap-5 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {unit.totalLessons} レッスン
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  約{unit.estimatedMinutes}分
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 進捗バー ── */}
      <div className="glass rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">この章の進捗</span>
          <span className="text-sm text-slate-500">{prog.done} / {prog.total} 完了</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
            style={{ width: `${prog.percent}%` }}
          />
        </div>
      </div>

      {/* ── レッスンカードグリッド ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {unit.lessons.map((lesson, idx) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            unitId={unit.id}
            lessonIndex={idx}
            unitIndex={unitIdx}
            done={isComplete(lesson.id)}
          />
        ))}
      </div>

      {/* ── 章ナビゲーション ── */}
      <div className="flex items-center gap-3">
        {prevUnit && (
          <Link
            to={`/unit/${prevUnit.id}`}
            className="flex-1 glass rounded-xl p-4 text-center hover:bg-slate-800/40 transition-colors"
          >
            <div className="text-xs text-slate-500 mb-1">← 前の章</div>
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
            <div className="text-xs text-slate-500 mb-1">次の章 →</div>
            <div className="text-sm font-medium text-slate-300 truncate">
              {nextUnit.icon} {nextUnit.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
