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
  CalendarDays,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import translations, { t } from "../i18n/translations";
import { fetchEvents, getStrapiMediaUrl } from "../services/api";

/* ─── Tag config (same look as NewsPage) ─── */
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

export default function EventsPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchEvents()
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

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Header */}
      <section className="pt-16 md:pt-15 pb-12 md:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-sm font-medium mb-8">
            <BookOpen size={14} />
            {t(translations.eventsPage.headingMark, language)}
            <Megaphone size={14} />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            {t(translations.eventsPage.heading, language)}{" "}
            <span className="gradient-text">
              {t(translations.eventsPage.headingHighlight, language)}
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t(translations.eventsPage.subtitle, language)}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-[#FF6600] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        /* ─── Empty state ─── */
        <section className="pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center mx-auto mb-6">
              <CalendarDays size={32} className="text-[#FF6600]/60" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t(translations.eventsPage.emptyTitle, language)}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
              {t(translations.eventsPage.emptyDescription, language)}
            </p>
          </div>
        </section>
      ) : (
        /* ─── CMS Events (alternating cards, no featured) ─── */
        <section className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Vertical timeline line (desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6600]/40 via-[#990032]/20 to-transparent" />

              <div className="space-y-16 lg:space-y-24">
                {articles.map((article, index) => (
                  <CmsAlternatingCard
                    key={article.id}
                    article={article}
                    language={language}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
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
  const tagLabel =
    t(translations.eventsPage?.tags?.[tag], language) ||
    t(translations.newsPage?.tags?.[tag], language) ||
    tag;

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
  const accent = tagAccentColors[tag] || "#FF6600";
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

/* ─── Alternating CMS Card ─── */
function CmsAlternatingCard({ article, language, index }) {
  const localeMap = { EN: "en-US", SK: "sk-SK", UA: "uk-UA" };
  const formattedDate = new Date(article.publishDate).toLocaleDateString(
    localeMap[language] || "en-US",
    { year: "numeric", month: "long" },
  );
  const coverUrl = getStrapiMediaUrl(article.cover);
  const isLeft = index % 2 === 0;
  const accent = tagAccentColors[article.tag] || "#FF6600";

  return (
    <div className="relative">
      <TimelineDot tag={article.tag} />

      <Link to={`/events/${article.slug}`} className="block group">
        <div
          className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${isLeft ? "" : "lg:direction-rtl"}`}
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
                  {String(index + 1).padStart(2, "0")}
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
              {t(translations.eventsPage.readMore, language)}
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
