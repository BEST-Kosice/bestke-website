import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Award,
  Globe,
  Heart,
  Newspaper,
  // FileText,
  // Rss,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import translations, { t } from "../i18n/translations";
import { fetchNews, getStrapiMediaUrl } from "../services/api";

const tagConfig = {
  Recruitment: {
    color: "bg-[#990032]/20 text-[#ff3366] border border-[#990032]/30",
    icon: Users,
  },
  Event: {
    color: "bg-[#FF6600]/20 text-[#FF6600] border border-[#FF6600]/30",
    icon: Zap,
  },
  Recap: {
    color: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    icon: Award,
  },
  Partnership: {
    color: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    icon: Globe,
  },
  Internal: {
    color: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    icon: Heart,
  },
};

const tagAccentColors = {
  Recruitment: "#990032",
  Event: "#FF6600",
  Recap: "#10b981",
  Partnership: "#8b5cf6",
  Internal: "#3b82f6",
};

export default function NewsPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchNews()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Pinned article goes to featured slot; rest sorted by date
  let featured = null;
  let rest = [];
  if (articles.length > 0) {
    const pinnedIdx = articles.findIndex((a) => a.pinned);
    if (pinnedIdx >= 0) {
      featured = articles[pinnedIdx];
      rest = [
        ...articles.slice(0, pinnedIdx),
        ...articles.slice(pinnedIdx + 1),
      ];
    } else {
      featured = articles[0];
      rest = articles.slice(1);
    }
    rest.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Header */}
      <section className="pt-16 md:pt-15 pb-12 md:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#990032]/10 border border-[#990032]/20 text-[#ff3366] text-sm font-medium mb-8">
            <BookOpen size={14} />
            {t(translations.newsPage.headingMark, language)}
            <Megaphone size={14} />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            {t(translations.newsPage.heading, language)}{" "}
            <span className="gradient-text">
              {t(translations.newsPage.headingHighlight, language)}
            </span>
          </h1>
          {articles.length !== 0 && (
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t(translations.newsPage.subtitle, language)}
            </p>
          )}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-[#990032] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        /* ─── Empty state ─── */
        <section className="pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#990032]/10 border border-[#990032]/20 flex items-center justify-center mx-auto mb-6">
              <Newspaper size={32} className="text-[#990032]/60" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t(translations.newsPage.emptyTitle, language)}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
              {t(translations.newsPage.emptyDescription, language)}
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          {featured && (
            <section className="pb-16 md:pb-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <CmsFeaturedCard article={featured} language={language} />
              </div>
            </section>
          )}

          {/* Alternating Articles */}
          {rest.length > 0 && (
            <section className="pb-24 md:pb-32">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section divider */}
                <div className="flex items-center gap-4 mb-14">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold whitespace-nowrap">
                    {t(translations.newsPage.other, language)}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="relative">
                  {/* Vertical timeline line (desktop only) */}
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#990032]/40 via-[#FF6600]/20 to-transparent" />

                  <div className="space-y-16 lg:space-y-24">
                    {rest.map((item, index) => (
                      <CmsAlternatingCard
                        key={item.id}
                        article={item}
                        language={language}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Tag badge helper ─── */
function TagBadge({ tag, language }) {
  const config = tagConfig[tag] || {
    color: "bg-white/10 text-gray-400",
    icon: Sparkles,
  };
  const Icon = config.icon;
  const tagLabel = t(translations.newsPage?.tags?.[tag], language) || tag;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
    >
      <Icon size={12} />
      {tagLabel}
    </span>
  );
}

/* ─── Timeline dot (desktop) ─── */
function TimelineDot({ tag }) {
  const accent = tagAccentColors[tag] || "#990032";
  return (
    <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
      <div
        className="w-4 h-4 rounded-full border-2"
        style={{ borderColor: accent, backgroundColor: `${accent}33` }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full mx-auto mt-[3px]"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

/* ─── FEATURED CARDS ─── */

function CmsFeaturedCard({ article, language }) {
  const [isHovered, setIsHovered] = useState(false);
  const localeMap = { EN: "en-US", SK: "sk-SK", UA: "uk-UA" };
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    localeMap[language] || "en-US",
    { year: "numeric", month: "long" },
  );
  const coverUrl = getStrapiMediaUrl(article.cover);
  const accent = tagAccentColors[article.tag] || "#990032";
  const Icon = tagConfig[article.tag]?.icon || Newspaper;

  return (
    <Link
      to={`/news/${article.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#1a0a12] to-[#0d0509]">
        <div className="absolute top-4 left-4 z-20">
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: accent }}
          >
            {t(translations.newsPage.featuredItem, language)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Cover */}
          <div className="relative h-64 md:h-[420px] overflow-hidden">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accent}30 0%, #1a0a12 50%, ${accent}10 100%)`,
                }}
              >
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border"
                    style={{
                      backgroundColor: `${accent}20`,
                      borderColor: `${accent}40`,
                    }}
                  >
                    <Icon size={36} style={{ color: accent }} />
                  </div>
                  <p className="text-gray-600 text-sm uppercase tracking-widest">
                    BEST Košice
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0509] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0d0509]/80" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <div
              className="absolute top-0 left-0 w-1 h-full hidden md:block"
              style={{
                background: `linear-gradient(to bottom, ${accent}, ${accent}44)`,
              }}
            />

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={14} />
                {formattedDate}
              </div>
              <TagBadge tag={article.tag} language={language} />
            </div>

            <h2
              className="text-white font-black text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight transition-colors duration-300"
              style={{ color: isHovered ? accent : undefined }}
            >
              {article.title}
            </h2>
            <p className="text-gray-400 leading-relaxed text-base md:text-lg line-clamp-4">
              {article.summary}
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
              style={{ color: accent }}
            >
              {t(translations.newsPage.itemReadMore, language)}
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── ALTERNATING CARDS ─── */

function CmsAlternatingCard({ article, language, index }) {
  const localeMap = { EN: "en-US", SK: "sk-SK", UA: "uk-UA" };
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    localeMap[language] || "en-US",
    { year: "numeric", month: "long" },
  );
  const coverUrl = getStrapiMediaUrl(article.cover);
  const isLeft = index % 2 === 0;
  const accent = tagAccentColors[article.tag] || "#990032";

  return (
    <div className="relative">
      <TimelineDot tag={article.tag} />

      <Link to={`/news/${article.slug}`} className="block group">
        <div
          className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
            isLeft ? "" : "lg:direction-rtl"
          }`}
          style={!isLeft ? { direction: "rtl" } : {}}
        >
          {/* Visual side */}
          <div
            className={`${isLeft ? "lg:pr-12" : "lg:pl-12"}`}
            style={!isLeft ? { direction: "ltr" } : {}}
          >
            <div className="relative rounded-xl overflow-hidden border border-white/[0.06] group-hover:border-white/10 transition-colors duration-300">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={article.title}
                  className="w-full h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div
                  className="w-full h-56 md:h-72 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${accent}15 0%, #0d0509 60%, ${accent}08 100%)`,
                  }}
                >
                  {(() => {
                    const Icon = tagConfig[article.tag]?.icon || Sparkles;
                    return (
                      <Icon
                        size={40}
                        style={{ color: accent }}
                        className="opacity-40"
                      />
                    );
                  })()}
                </div>
              )}
              {/* Number overlay */}
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: accent }}>
                  {String(index + 2).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div
            className={`${isLeft ? "lg:pl-12" : "lg:pr-12"}`}
            style={!isLeft ? { direction: "ltr" } : {}}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={14} />
                {formattedDate}
              </div>
              <TagBadge tag={article.tag} language={language} />
            </div>

            <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-4 leading-tight group-hover:text-[#FF6600] transition-colors duration-300">
              {article.title}
            </h2>
            <p className="text-gray-400 leading-relaxed line-clamp-3 mb-5">
              {article.summary}
            </p>

            <div className="inline-flex items-center gap-2 text-[#FF6600] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              {t(translations.newsPage.itemReadMore, language)}
              <ArrowRight size={14} />
            </div>

            {/* Accent bar */}
            <div
              className="mt-6 h-0.5 w-16 rounded-full opacity-40"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
