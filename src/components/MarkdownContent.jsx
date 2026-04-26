/**
 * Simple Markdown renderer — no external dependency.
 * Handles: headings, bold, code blocks, inline code, tables, lists, hr, blockquotes, paragraphs.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderInline(text) {
  return text
    .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-100 font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="italic text-slate-300">$1</em>')
}

export default function MarkdownContent({ content }) {
  const lines = content.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block (handles escaped backticks \`\`\` from template literals)
    const backtick3 = '\`\`\`'
    if (line.startsWith(backtick3)) {
      const lang = line.slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith(backtick3)) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      elements.push(
        <div key={i} className="my-4 rounded-xl overflow-hidden border border-slate-700/50">
          {lang && (
            <div className="bg-slate-800/80 px-4 py-1.5 text-xs text-slate-500 font-mono border-b border-slate-700/50">
              {lang}
            </div>
          )}
          <pre className="bg-slate-900/80 p-4 overflow-x-auto text-sm">
            <code
              className="text-slate-300 font-mono leading-relaxed"
              dangerouslySetInnerHTML={{ __html: codeLines.join('\n') }}
            />
          </pre>
        </div>
      )
      i++
      continue
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="border-slate-700/50 my-6" />)
      i++
      continue
    }

    // Headings
    const h3 = line.match(/^### (.+)/)
    const h2 = line.match(/^## (.+)/)
    const h1 = line.match(/^# (.+)/)
    if (h1) {
      elements.push(<h1 key={i} className="text-3xl font-black text-slate-100 mt-8 mb-4" dangerouslySetInnerHTML={{ __html: renderInline(h1[1]) }} />)
      i++; continue
    }
    if (h2) {
      elements.push(<h2 key={i} className="text-xl font-bold text-slate-100 mt-6 mb-3 flex items-center gap-2" dangerouslySetInnerHTML={{ __html: renderInline(h2[1]) }} />)
      i++; continue
    }
    if (h3) {
      elements.push(<h3 key={i} className="text-base font-semibold text-slate-200 mt-5 mb-2" dangerouslySetInnerHTML={{ __html: renderInline(h3[1]) }} />)
      i++; continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-primary-600 pl-4 my-4 italic text-slate-400 text-sm">
          <span dangerouslySetInnerHTML={{ __html: renderInline(line.slice(2)) }} />
        </blockquote>
      )
      i++; continue
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map(c => c.trim()).filter(Boolean)
      i += 2 // skip separator
      const rows = []
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').map(c => c.trim()).filter(Boolean))
        i++
      }
      elements.push(
        <div key={i} className="my-4 overflow-x-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80">
                {headers.map((h, j) => (
                  <th key={j} className="px-4 py-2.5 text-left text-slate-300 font-semibold" dangerouslySetInnerHTML={{ __html: renderInline(h) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/20'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-slate-400 border-t border-slate-800/50" dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*] /, ''))
        i++
      }
      elements.push(
        <ul key={i} className="my-3 space-y-1.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
              <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={i} className="my-3 space-y-1.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
              <span className="text-primary-400 font-semibold mt-0.5 flex-shrink-0 w-5">{j + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-slate-400 text-sm leading-relaxed my-2" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
    )
    i++
  }

  return <div className="markdown-content">{elements}</div>
}
