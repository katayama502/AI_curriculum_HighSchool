import { Link } from 'react-router-dom'
import { Clock, BookOpen, ChevronRight, Trophy, PlayCircle, BarChart3 } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

export default function CurriculumPage() {
  const { isComplete, getUnitProgress, getTotalProgress } = useProgress()
  const total = getTotalProgress(units)
  const totalLessons = units.reduce((s, u) => s + u.lessons.length, 0)
  const totalMinutes = units.reduce((s, u) => s + u.estimatedMinutes, 0)

  // 最初の未完了レッスンを探す
  let continueUnit = null
  let continueLesson = null
  for (const unit of units) {
    const lesson = unit.lessons.find(l => !isComplete(l.id))
    if (lesson) {
      continueUnit = unit
      continueLesson = lesson
      break
    }
  }

  const allDone = total.done > 0 && total.done === total.total

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">

      {/* ── ページヘッダー ── */}
      <div className="mb-10">
        <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">AI探求ラボ</p>
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">AIカリキュラム</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
          AIの基礎から倫理・実践まで、{units.length}章・{totalLessons}レッスンで体系的に学習。
          動画スライドとクイズで理解を深めながら、自分のペースで進められます。
        </p>
      </div>

      {/* ── コース概要カード ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: BookOpen, label: 'レッスン数', value: `${totalLessons}本` },
          { icon: Clock,     label: '学習時間',  value: `約${Math.round(totalMinutes / 60)}時間` },
          { icon: BarChart3, label: '章数',      value: `${units.length}章` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-1">
            <Icon className="w-5 h-5 text-primary-400 mb-1" />
            <span className="text-xl font-black text-slate-100">{value}</span>
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      {/* ── 全体進捗 ── */}
      <div className="glass rounded-2xl p-5 mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-200 text-sm">全体の進捗</span>
          </div>
          <span className="text-sm text-slate-400 tabular-nums">
            {total.done} / {total.total} レッスン
          </span>
        </div>
        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000"
            style={{ width: `${total.percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{total.percent}% 完了</span>
          {allDone ? (
            <span className="text-emerald-400 font-semibold">🎉 全章制覇！</span>
          ) : continueLesson ? (
            <Link
              to={`/unit/${continueUnit.id}/lesson/${continueLesson.id}`}
              className="flex items-center gap-1 text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              続きから学ぶ
            </Link>
          ) : null}
        </div>
      </div>

      {/* ── 章カード一覧 ── */}
      <div className="space-y-4">
        {units.map((unit, unitIdx) => {
          const prog = getUnitProgress(unit)
          const unitDone = prog.done === prog.total && prog.total > 0

          return (
            <Link
              key={unit.id}
              to={`/unit/${unit.id}`}
              className="group glass rounded-2xl p-6 flex items-center gap-5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/50 hover:border-slate-600/60 card-hover block"
            >
              {/* アイコン */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {unit.icon}
              </div>

              {/* テキスト */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    第{unit.number}章
                  </span>
                  <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
                    {getDifficultyLabel(unit.difficulty)}
                  </span>
                  {unitDone && (
                    <span className="badge border bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                      ✓ 完了
                    </span>
                  )}
                </div>
                <h2 className="font-black text-slate-100 text-lg group-hover:text-primary-300 transition-colors truncate">
                  {unit.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 mb-3 line-clamp-1">{unit.subtitle}</p>

                {/* 進捗バー */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 tabular-nums flex-shrink-0">
                    {prog.done}/{prog.total}
                  </span>
                </div>
              </div>

              {/* 右側メタ情報 */}
              <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0 text-right">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {unit.totalLessons}レッスン
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {unit.estimatedMinutes}分
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-primary-400 transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
