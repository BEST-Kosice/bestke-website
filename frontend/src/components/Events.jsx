import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const eventMeta = [
  { photo: './course.webp', color: 'from-best-primary to-best-primary-light' },
  { photo: './workshop.webp', color: 'from-best-secondary to-orange-400' },
  { photo: './weekend.webp', color: 'from-emerald-600 to-emerald-400' },
  { photo: './Halloween.png', color: 'from-emerald-600 to-emerald-400' },
]

export default function Events() {
  const { language } = useLanguage()

  return (
    <section id="events" className="py-20 md:py-28 bg-best-neutral-dark border-t border-white/10">
      <div className="max-w-16xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t(translations.events.heading1, language)} <span className="gradient-text">{t(translations.events.heading2, language)}</span>{t(translations.events.headingEnd, language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t(translations.events.subtitle, language)}
          </p>
        </div>

        {/* Horizontal Event Rows */}
        <div className="flex flex-col gap-16">
          {translations.events.items.map((event, index) => {
            const isReversed = index % 2 !== 0
            const meta = eventMeta[index] || {}

            return (
              <div
                key={t(event.title, language)}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    {meta.photo ? (
                      <img
                        src={meta.photo}
                        alt={t(event.title, language)}
                        className="w-full h-72 md:h-80 object-cover"
                      />
                    ) : (
                      <div
                        className={`h-72 md:h-80 bg-gradient-to-br ${meta.color || 'from-best-primary to-best-secondary'} flex items-center justify-center`}
                      >
                        <span className="text-white/80 font-bold text-2xl tracking-wide">
                          {t(event.title, language)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t(event.title, language)}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                    {t(event.description, language)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
