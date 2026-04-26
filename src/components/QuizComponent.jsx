import { useState } from 'react'
import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react'

export default function QuizComponent({ quiz, onComplete }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = quiz.questions
  const q = questions[current]
  const totalQ = questions.length

  const handleSelect = (qId, optIdx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  const handleSubmitQuestion = () => {
    if (answers[q.id] === undefined) return
    setSubmitted(true)
  }

  const handleNext = () => {
    if (current < totalQ - 1) {
      setCurrent(c => c + 1)
      setSubmitted(false)
    } else {
      setShowResult(true)
      onComplete?.()
    }
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
    setCurrent(0)
    setShowResult(false)
  }

  const score = questions.filter(q => answers[q.id] === q.answer).length

  if (showResult) {
    const percent = Math.round((score / totalQ) * 100)
    return (
      <div className="text-center py-8">
        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl ${
          percent >= 80 ? 'bg-emerald-500/20 border-2 border-emerald-500/50' : 'bg-yellow-500/20 border-2 border-yellow-500/50'
        }`}>
          {percent >= 80 ? '🎉' : '📚'}
        </div>
        <h3 className="text-2xl font-black mb-2">
          {score} / {totalQ} 正解
        </h3>
        <p className={`text-lg font-semibold mb-6 ${percent >= 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
          {percent >= 80 ? '素晴らしい！よく理解できています 🌟' : 'もう一度復習してみましょう'}
        </p>

        {/* Answer review */}
        <div className="text-left space-y-3 mb-8">
          {questions.map((q, i) => {
            const correct = answers[q.id] === q.answer
            return (
              <div key={q.id} className={`rounded-xl p-4 border ${
                correct ? 'bg-emerald-950/30 border-emerald-700/40' : 'bg-red-950/30 border-red-700/40'
              }`}>
                <div className="flex items-start gap-2 mb-2">
                  {correct
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  }
                  <p className="text-sm font-medium text-slate-200">{q.question}</p>
                </div>
                {!correct && (
                  <p className="text-xs text-slate-400 ml-7">
                    正解: <span className="text-emerald-300">{q.options[q.answer]}</span>
                  </p>
                )}
                <p className="text-xs text-slate-500 ml-7 mt-1">{q.explanation}</p>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={handleRetry} className="btn-outline">
            <RotateCcw className="w-4 h-4" />
            やり直す
          </button>
        </div>
      </div>
    )
  }

  const selectedAnswer = answers[q.id]
  const isCorrect = submitted && selectedAnswer === q.answer

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-500">問題 {current + 1} / {totalQ}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i < current
                  ? answers[questions[i].id] === questions[i].answer
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                  : i === current
                  ? 'bg-primary-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-100 leading-relaxed">{q.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let style = 'border-slate-700 bg-slate-800/50 hover:border-primary-600 hover:bg-primary-950/30'
          if (selectedAnswer === i && !submitted) {
            style = 'border-primary-500 bg-primary-950/50'
          }
          if (submitted) {
            if (i === q.answer) {
              style = 'border-emerald-500 bg-emerald-950/40'
            } else if (selectedAnswer === i && i !== q.answer) {
              style = 'border-red-500 bg-red-950/40'
            } else {
              style = 'border-slate-700 bg-slate-800/30 opacity-50'
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(q.id, i)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${style} flex items-center gap-3`}
            >
              <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                selectedAnswer === i && !submitted
                  ? 'border-primary-400 bg-primary-900/50 text-primary-300'
                  : submitted && i === q.answer
                  ? 'border-emerald-400 bg-emerald-900/50 text-emerald-300'
                  : submitted && selectedAnswer === i
                  ? 'border-red-400 bg-red-900/50 text-red-300'
                  : 'border-slate-600 text-slate-500'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm text-slate-200">{opt}</span>
              {submitted && i === q.answer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />
              )}
              {submitted && selectedAnswer === i && i !== q.answer && (
                <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div className={`rounded-xl p-4 mb-6 ${isCorrect ? 'bg-emerald-950/40 border border-emerald-700/50' : 'bg-red-950/40 border border-red-700/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            {isCorrect
              ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              : <XCircle className="w-4 h-4 text-red-400" />
            }
            <span className={`text-sm font-semibold ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
              {isCorrect ? '正解！' : '不正解'}
            </span>
          </div>
          <p className="text-sm text-slate-400">{q.explanation}</p>
        </div>
      )}

      {/* Button */}
      {!submitted
        ? (
          <button
            onClick={handleSubmitQuestion}
            disabled={selectedAnswer === undefined}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              selectedAnswer !== undefined
                ? 'btn-primary justify-center'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            回答する
          </button>
        )
        : (
          <button onClick={handleNext} className="w-full btn-primary justify-center py-3">
            {current < totalQ - 1 ? '次の問題へ' : '結果を見る'}
          </button>
        )
      }
    </div>
  )
}
