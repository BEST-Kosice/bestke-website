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
  Pin,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
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

  /* ─── Split into upcoming (not completed) and past (completed) ─── */
  const upcomingEvents = articles.filter((a) => !a.completed);
  const pastEvents = articles.filter((a) => a.completed);

  /* ─── Sort: pinned first, then by publishDate desc ─── */
  const sortEvents = (events) =>
    [...events].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.publishDate) - new Date(a.publishDate);
    });

  const sortedUpcoming = sortEvents(upcomingEvents);
  const sortedPast = sortEvents(pastEvents);

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Header */}
      <section className="pt-16 md:pt-15 pb-12 md:pb-10 bg-gradient-to-b from-best-primary/10 to-transparent">
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
        <>
          {/* ─── BEST Courses Info Section ─── */}
          <section className="pb-12 md:pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-2xl overflow-hidden border border-[#FF6600]/15 bg-gradient-to-br from-[#FF6600]/5 via-[#1a0f08] to-[#0d0509] p-8 md:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6600]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center">
                    <GraduationCap size={28} className="text-[#FF6600]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="flex items-center gap-3 text-white font-bold text-xl md:text-2xl mb-2">
                      {t(translations.eventsPage.coursesTitle, language)}
                      <img src="BEST-Courses-Logo.png" alt="BEST" className="h-8 md:h-10 w-auto" />
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {t(translations.eventsPage.coursesDescription, language)}
                    </p>
                  </div>
                  <a
                    href="https://best.eu.org/courses/list.jsp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6600] hover:bg-[#FF6600]/90 text-white font-semibold text-sm transition-colors duration-200"
                  >
                    {t(translations.eventsPage.coursesLink, language)}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* ─── Upcoming Events Section ─── */}
          <section className="pb-16 md:pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                heading={t(translations.eventsPage.upcomingHeading, language)}
                highlight={t(
                  translations.eventsPage.upcomingHighlight,
                  language,
                )}
                accentColor="#FF6600"
              />

              {sortedUpcoming.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays
                      size={28}
                      className="text-[#FF6600]/60"
                    />
                  </div>
                  <p className="text-gray-400 text-lg">
                    {t(translations.eventsPage.noUpcoming, language)}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {t(
                      translations.eventsPage.noUpcomingDescription,
                      language,
                    )}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6600]/40 via-[#990032]/20 to-transparent" />
                  <div className="space-y-16 lg:space-y-24">
                    {sortedUpcoming.map((article, index) => (
                      <CmsAlternatingCard
                        key={article.id}
                        article={article}
                        language={language}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ─── Past Events Section ─── */}
          {sortedPast.length > 0 && (
            <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-16 md:pt-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                  heading={t(translations.eventsPage.pastHeading, language)}
                  highlight={t(
                    translations.eventsPage.pastHighlight,
                    language,
                  )}
                  accentColor="#990032"
                />

                <div className="relative">
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#990032]/40 via-[#990032]/10 to-transparent" />
                  <div className="space-y-16 lg:space-y-24">
                    {sortedPast.map((article, index) => (
                      <CmsAlternatingCard
                        key={article.id}
                        article={article}
                        language={language}
                        index={index}
                        isPast
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

/* ─── Section heading ─── */
function SectionHeading({ heading, highlight, accentColor }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
        {heading}{" "}
        <span style={{ color: accentColor }}>{highlight}</span>
      </h2>
      <div
        className="w-24 h-1 mx-auto rounded-full mb-6"
        style={{
          background: `linear-gradient(to right, ${accentColor}, ${accentColor}88)`,
        }}
      />
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
function CmsAlternatingCard({ article, language, index, isPast }) {
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
            <div className={`relative rounded-xl overflow-hidden border border-white/[0.06] group-hover:border-white/10 transition-colors duration-300 ${isPast ? "opacity-75" : ""}`}>
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={article.title}
                  className={`w-full h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ${isPast ? "grayscale-[30%]" : ""}`}
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
              {/* Pinned badge */}
              {article.pinned && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6600]/90 text-white text-xs font-semibold backdrop-blur-sm">
                  <Pin size={12} />
                  Pinned
                </div>
              )}
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
              {isPast && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  <CheckCircle2 size={12} />
                  Completed
                </span>
              )}
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
