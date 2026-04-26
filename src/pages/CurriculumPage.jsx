import { Link } from 'react-router-dom'
import { Clock, BookOpen, ChevronRight } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import LessonCard from '../components/LessonCard'

export default function CurriculumPage() {
  const { isComplete, getUnitProgress, getTotalProgress } = useProgress()
  const total = getTotalProgress(units)
  const totalLessons = units.reduce((s, u) => s + u.lessons.length, 0)
  const totalMinutes = units.reduce((s, u) => s + u.estimatedMinutes, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">

      {/* ── ページヘッダー ── */}
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">AIカリキュラム</span>
        </h1>
        <p className="text-slate-400 text-lg">
          AIの基礎から倫理・実践まで、{units.length}単元・{totalLessons}レッスンで体系的に学習
        </p>
      </div>

      {/* ── 全体進捗バー ── */}
      <div className="glass rounded-2xl p-6 mb-12">
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

      {/* ── 単元ごとのセクション ── */}
      <div className="space-y-16">
        {units.map((unit, unitIdx) => {
          const prog = getUnitProgress(unit)

          return (
            <section key={unit.id}>

              {/* 単元ヘッダー */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {unit.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Chapter {unit.number}
                      </span>
                      <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
                        {getDifficultyLabel(unit.difficulty)}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-slate-100">{unit.title}</h2>
                    <p className="text-sm text-slate-500">{unit.subtitle}</p>
                  </div>
                </div>

                {/* 章の進捗 + リンク */}
                <div className="flex-shrink-0 text-right hidden sm:block">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 justify-end">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {unit.totalLessons}レッスン
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {unit.estimatedMinutes}分
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-end mb-3">
                    <div className="h-1.5 w-28 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{prog.done}/{prog.total}</span>
                  </div>
                  <Link
                    to={`/unit/${unit.id}`}
                    className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors font-medium"
                  >
                    章の概要 <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* レッスンカードグリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {unit.lessons.map((lesson, lIdx) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    unitId={unit.id}
                    lessonIndex={lIdx}
                    unitIndex={unitIdx}
                    done={isComplete(lesson.id)}
                  />
                ))}
              </div>

              {/* 区切り線（最後以外） */}
              {unitIdx < units.length - 1 && (
                <div className="mt-12 border-b border-slate-800/50" />
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
