import { Link } from 'react-router-dom'
import { Brain, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">
              <span className="gradient-text">AI</span>
              <span className="text-slate-100">探求ラボ</span>
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-300 transition-colors">ホーム</Link>
            <Link to="/curriculum" className="hover:text-slate-300 transition-colors">カリキュラム</Link>
          </nav>

          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} AI探求ラボ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
