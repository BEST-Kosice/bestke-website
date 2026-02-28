import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import translations, { t } from "../i18n/translations";
import { fetchArticles, getStrapiMediaUrl } from "../services/api";

const tagColors = {
  Recruitment: "bg-[#990032]/20 text-[#ff3366]",
  Event: "bg-[#FF6600]/20 text-[#FF6600]",
  Recap: "bg-emerald-500/20 text-emerald-400",
  Partnership: "bg-purple-500/20 text-purple-400",
  Internal: "bg-blue-500/20 text-blue-400",
};

export default function NewsPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingCms, setUsingCms] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchArticles()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
          setUsingCms(true);
        }
        setLoading(false);
      })
      .catch(() => {
        // Strapi not available — fall back to static translations
        setLoading(false);
      });
  }, []);

  const staticItems = translations.newsPage.items;

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {t(translations.newsPage.heading, language)}{" "}
            <span className="gradient-text">
              {t(translations.newsPage.headingHighlight, language)}
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#990032] to-[#FF6600] mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t(translations.newsPage.subtitle, language)}
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-[#990032] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 mt-10">
              {usingCms
                ? articles.map((article) => (
                    <CmsArticleCard
                      key={article.id}
                      article={article}
                      language={language}
                    />
                  ))
                : staticItems.map((item, index) => (
                    <StaticArticleCard
                      key={index}
                      item={item}
                      language={language}
                    />
                  ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/** Card for CMS-sourced articles (clickable, opens full article) */
function CmsArticleCard({ article, language }) {
  const localeMap = { EN: "en-US", SK: "sk-SK", UA: "uk-UA" };
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    localeMap[language] || "en-US",
    { year: "numeric", month: "long" },
  );
  const coverUrl = getStrapiMediaUrl(article.cover);
  const tagLabel =
    t(translations.newsPage?.tags?.[article.tag], language) || article.tag;

  return (
    <Link to={`/news/${article.slug}`} className="block group">
      <article className="glass rounded-md overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-white/20 hover:bg-white/[0.06]">
        <div className="flex flex-col md:flex-row">
          {/* Cover thumbnail */}
          {coverUrl && (
            <div className="md:w-56 md:min-h-full flex-shrink-0">
              <img
                src={coverUrl}
                alt={article.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8 flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={14} />
                {formattedDate}
              </div>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                  tagColors[article.tag] || "bg-white/10 text-gray-400"
                }`}
              >
                {tagLabel}
              </span>
            </div>

            <h2 className="text-white font-bold text-xl md:text-2xl mb-3 group-hover:text-[#FF6600] transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-400 leading-relaxed line-clamp-3">
              {article.summary}
            </p>

            <div className="mt-4 flex items-center gap-2 text-[#FF6600] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {{ EN: "Read more", SK: "Čítať viac", UA: "Читати далі" }[
                language
              ] || "Read more"}
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** Card for static/fallback articles (non-clickable, same style as before) */
function StaticArticleCard({ item, language }) {
  return (
    <article className="glass rounded-md p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={14} />
          {t(item.date, language)}
        </div>
        <span
          className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
            tagColors[item.tag] || "bg-white/10 text-gray-400"
          }`}
        >
          {t(translations.newsPage.tags[item.tag], language)}
        </span>
      </div>
      <h2 className="text-white font-bold text-xl md:text-2xl mb-3">
        {t(item.title, language)}
      </h2>
      <p className="text-gray-400 leading-relaxed">
        {t(item.summary, language)}
      </p>
    </article>
  );
}
