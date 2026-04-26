import { ExternalLink, Presentation } from 'lucide-react'

/**
 * Google SlidesのURLをiframe埋め込み用URLに変換する
 * 対応形式:
 *   /edit   → /embed
 *   /pub    → /embed
 *   /view   → /embed
 *   /present → /embed
 *   すでに /embed の場合はそのまま
 */
function toEmbedUrl(url) {
  if (!url) return null
  const base = url.split('#')[0].split('?')[0]
  const embedBase = base.replace(/\/(edit|pub|present|view)\/?$/, '') + '/embed'
  return `${embedBase}?start=false&loop=false&delayms=3000`
}

export default function GoogleSlidesEmbed({ url, title }) {
  const embedUrl = toEmbedUrl(url)

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video rounded-xl bg-slate-800/50 border border-slate-700/50 border-dashed flex flex-col items-center justify-center gap-3 text-slate-500">
        <Presentation className="w-10 h-10 opacity-40" />
        <p className="text-sm">スライドのURLが設定されていません</p>
        <p className="text-xs opacity-60">curriculum.js の slideUrl にGoogleスライドのURLを設定してください</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* 16:9 レスポンシブ iframe */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/50"
           style={{ paddingTop: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        />
      </div>

      {/* 元リンク */}
      <div className="mt-2 flex justify-end">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Googleスライドで開く
        </a>
      </div>
    </div>
  )
}
