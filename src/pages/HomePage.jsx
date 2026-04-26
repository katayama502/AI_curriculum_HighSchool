import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Brain, Shield, Zap, ChevronRight, Star, Users, Clock } from 'lucide-react'
import { units, getDifficultyLabel } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

export default function HomePage() {
  const { getTotalProgress } = useProgress()
  const total = getTotalProgress(units)

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI基礎から応用まで',
      desc: '「AIとは何か」から機械学習・倫理・実践まで体系的に学習',
      color: 'from-blue-600/20 to-blue-800/20 border-blue-700/40',
      iconBg: 'bg-blue-500/20 text-blue-400',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'インタラクティブなクイズ',
      desc: '各単元の理解度をクイズで確認。解説付きで確実に身につく',
      color: 'from-purple-600/20 to-purple-800/20 border-purple-700/40',
      iconBg: 'bg-purple-500/20 text-purple-400',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '進捗を自動保存',
      desc: '学習状況をブラウザに保存。続きからいつでも再開できる',
      color: 'from-emerald-600/20 to-emerald-800/20 border-emerald-700/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'AI倫理も学べる',
      desc: 'バイアス・プライバシー・仕事の未来など現代社会の必須知識',
      color: 'from-orange-600/20 to-orange-800/20 border-orange-700/40',
      iconBg: 'bg-orange-500/20 text-orange-400',
    },
  ]

  const totalLessons = units.reduce((s, u) => s + u.lessons.length, 0)
  const totalMinutes = units.reduce((s, u) => s + u.estimatedMinutes, 0)

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent-600/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-400 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            高校生のためのAI学習プラットフォーム
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            <span className="gradient-text">AIの時代</span>を<br />
            <span className="text-slate-100">自分の武器</span>にする
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            AIの基礎理論から倫理・実践まで、体系的に学べる高校生向けカリキュラム。
            <br className="hidden md:block" />
            クイズや実践課題で、本物の理解を身につけよう。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/curriculum" className="btn-primary text-base py-4 px-8">
              カリキュラムを見る
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/unit/unit-1" className="btn-outline text-base py-4 px-8">
              第1章から学ぶ
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: <BookOpen className="w-4 h-4" />, value: `${units.length}`, label: '単元' },
              { icon: <Star className="w-4 h-4" />, value: `${totalLessons}`, label: 'レッスン' },
              { icon: <Clock className="w-4 h-4" />, value: `${Math.round(totalMinutes / 60)}h`, label: '学習時間' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl py-4 px-3 flex flex-col items-center gap-1">
                <div className="text-primary-400 flex items-center gap-1 text-xs text-slate-500">
                  {stat.icon} {stat.label}
                </div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">このサイトでできること</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              単なる読み物ではなく、理解度チェックや実践課題で本当の学びを提供します
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className={`rounded-2xl p-5 border bg-gradient-to-br ${f.color} card-hover`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Units Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">学習カリキュラム</h2>
              <p className="text-slate-400">基礎から応用まで5つの単元で構成</p>
            </div>
            <Link to="/curriculum" className="btn-outline text-sm py-2">
              全て見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <Link
                key={unit.id}
                to={`/unit/${unit.id}`}
                className="glass rounded-2xl p-5 card-hover group block"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${unit.color} mb-4`}>
                  <span className="text-xl">{unit.icon}</span>
                  <span className="text-xs font-bold text-white">第{unit.number}章</span>
                </div>
                <h3 className="font-bold text-lg text-slate-100 mb-1 group-hover:text-primary-300 transition-colors">
                  {unit.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{unit.subtitle}</p>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">{unit.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{unit.totalLessons} レッスン</span>
                  <span>{unit.estimatedMinutes} 分</span>
                </div>
              </Link>
            ))}
            <div className="glass rounded-2xl p-5 border-dashed border-2 border-slate-700/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">🔜</div>
                <p className="text-sm text-slate-500">更多のコンテンツ準備中</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-accent-900/20 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                今すぐ学習を<span className="gradient-text">はじめよう</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                登録不要・無料で全コンテンツにアクセスできます
              </p>
              <Link to="/unit/unit-1" className="btn-primary text-lg py-4 px-10">
                第1章から学ぶ
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
