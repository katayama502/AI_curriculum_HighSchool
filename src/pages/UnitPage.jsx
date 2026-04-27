import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, BookOpen, CheckCircle2, Play, Lock } from 'lucide-react'
import { units, getDifficultyLabel, getDifficultyColor } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

const TYPE_LABEL = { lecture: '講義', activity: '実践', quiz: 'クイズ' }
const TYPE_ICON  = { lecture: '📖', activity: '🔬', quiz: '✏️' }
const TYPE_COLOR = {
  lecture:  'bg-blue-900/60 text-blue-300 border-blue-700/40',
  activity: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/40',
  quiz:     'bg-purple-900/60 text-purple-300 border-purple-700/40',
}

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = units.find(u => u.id === unitId)
  const { getUnitProgress, isComplete } = useProgress()

  if (!unit) return <Navigate to="/curriculum" replace />

  const prog = getUnitProgress(unit)
  const unitIdx = units.findIndex(u => u.id === unitId)
  const prevUnit = units[unitIdx - 1]
  const nextUnit = units[unitIdx + 1]
  const allDone = prog.done === prog.total && prog.total > 0

  // 最初の未完了レッスン（「続きから」ボタン用）
  const nextLesson = unit.lessons.find(l => !isComplete(l.id))

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">

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
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
              第{unit.number}章
            </span>
            <span className={`badge border ${getDifficultyColor(unit.difficulty)}`}>
              {getDifficultyLabel(unit.difficulty)}
            </span>
          </div>
          <div className="flex items-start gap-5">
            <span className="text-5xl drop-shadow-lg">{unit.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{unit.title}</h1>
              <p className="text-white/70 text-sm mb-3">{unit.subtitle}</p>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">{unit.description}</p>
              <div className="flex items-center gap-5 mt-4 text-sm text-white/70 flex-wrap">
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

      {/* ── 進捗バー + CTA ── */}
      <div className="glass rounded-2xl p-5 mb-8 flex items-center gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">この章の進捗</span>
            <span className="text-sm text-slate-500 tabular-nums">{prog.done} / {prog.total}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
              style={{ width: `${prog.percent}%` }}
            />
          </div>
        </div>
        {allDone ? (
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            完了
          </div>
        ) : nextLesson ? (
          <Link
            to={`/unit/${unitId}/lesson/${nextLesson.id}`}
            className="btn-primary py-2 px-5 text-sm flex-shrink-0"
          >
            <Play className="w-4 h-4" />
            {prog.done === 0 ? '学習をはじめる' : '続きから学ぶ'}
          </Link>
        ) : null}
      </div>

      {/* ── レッスン一覧 ── */}
      <div className="glass rounded-2xl overflow-hidden mb-10">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h2 className="font-bold text-slate-200 text-sm">レッスン一覧</h2>
        </div>
        <div className="divide-y divide-slate-800/60">
          {unit.lessons.map((lesson, idx) => {
            const done = isComplete(lesson.id)
            return (
              <Link
                key={lesson.id}
                to={`/unit/${unitId}/lesson/${lesson.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/40 transition-colors group"
              >
                {/* 番号 / 完了アイコン */}
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-400 transition-colors tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* タイプアイコン */}
                <span className="text-lg flex-shrink-0 w-6 text-center">
                  {TYPE_ICON[lesson.type]}
                </span>

                {/* テキスト */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate transition-colors ${done ? 'text-slate-400' : 'text-slate-200 group-hover:text-primary-300'}`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 hidden sm:block">
                    {lesson.description}
                  </p>
                </div>

                {/* メタ */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`badge border hidden sm:inline-flex ${TYPE_COLOR[lesson.type]}`}>
                    {TYPE_LABEL[lesson.type]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}分
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── 章ナビゲーション ── */}
      <div className="flex items-center gap-3">
        {prevUnit ? (
          <Link
            to={`/unit/${prevUnit.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
            <div className="min-w-0">
              <div className="text-xs text-slate-500 mb-0.5">前の章</div>
              <div className="text-sm font-medium text-slate-300 truncate">
                {prevUnit.icon} {prevUnit.title}
              </div>
            </div>
          </Link>
        ) : <div className="flex-1" />}
        {nextUnit ? (
          <Link
            to={`/unit/${nextUnit.id}`}
            className="flex-1 glass rounded-xl p-4 flex items-center justify-end gap-3 hover:bg-slate-800/40 transition-colors group"
          >
            <div className="min-w-0 text-right">
              <div className="text-xs text-slate-500 mb-0.5">次の章</div>
              <div className="text-sm font-medium text-slate-300 truncate">
                {nextUnit.icon} {nextUnit.title}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
