import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { fetchArticleBySlug, getStrapiMediaUrl } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const tagColors = {
  Recruitment: 'bg-[#990032]/20 text-[#ff3366]',
  Event: 'bg-[#FF6600]/20 text-[#FF6600]',
  Recap: 'bg-emerald-500/20 text-emerald-400',
  Partnership: 'bg-purple-500/20 text-purple-400',
  Internal: 'bg-blue-500/20 text-blue-400',
}

export default function ArticlePage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    fetchArticleBySlug(slug)
      .then((data) => {
        setArticle(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-best-neutral-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#990032] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">
            {language === 'SK' ? 'Načítavanie...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-best-neutral-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">404</h1>
          <p className="text-gray-400 mb-8">
            {language === 'SK'
              ? 'Článok nebol nájdený.'
              : 'Article not found.'}
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[#FF6600] hover:text-[#ff3366] transition-colors"
          >
            <ArrowLeft size={18} />
            {language === 'SK' ? 'Späť na novinky' : 'Back to News'}
          </Link>
        </div>
      </div>
    )
  }

  const coverUrl = getStrapiMediaUrl(article.cover)
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    language === 'SK' ? 'sk-SK' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          {language === 'SK' ? 'Späť na novinky' : 'Back to News'}
        </Link>
      </div>

      {/* Article header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Tag & date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
              tagColors[article.tag] || 'bg-white/10 text-gray-400'
            }`}
          >
            {t(translations.newsPage?.tags?.[article.tag], language) || article.tag}
          </span>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={14} />
            {formattedDate}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 border-l-2 border-[#990032] pl-4">
          {article.summary}
        </p>

        {/* Cover image */}
        {coverUrl && (
          <div className="mb-10 rounded-lg overflow-hidden">
            <img
              src={coverUrl}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Author */}
        {article.author && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} className="text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm">{article.author.name}</span>
          </div>
        )}

        {/* Article content (Strapi rich text is Markdown) */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-[#FF6600] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-blockquote:border-[#990032] prose-blockquote:text-gray-400
            prose-code:text-[#ff3366]
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
        />
      </article>
    </div>
  )
}

/**
 * Simple Markdown → HTML converter for Strapi rich text.
 * Handles headers, bold, italic, links, images, lists, blockquotes, code, and paragraphs.
 */
function markdownToHtml(md) {
  if (!md) return ''
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Headers
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Wrap remaining loose lines in <p> tags
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^<[a-z]/.test(trimmed)) return trimmed
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  return html
}
