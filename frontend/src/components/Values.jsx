import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

export default function Values() {
  const { language } = useLanguage()
  const v = translations.values.items

  return (
    <section id="values" className="py-20 md:py-28 bg-best-neutral border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t(translations.values.heading, language)} <span className="gradient-text">{t(translations.values.headingHighlight, language)}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full" />
        </div>

        {/* Desktop: radial layout with monke in center */}
        <div className="hidden lg:block">
          <div className="relative mx-auto" style={{ width: '1200px', height: '700px' }}>
            {/* Center monkey */}
            <div className="absolute left-1/2 top-1/2 -translate-x-[40%] -translate-y-[90%] z-10">
              <img src="/monke.svg" alt="BEST Monkey" className="w-48 h-48 drop-shadow-lg" />
            </div>

            {/* Top-left */}
            <div className="absolute text-center" style={{ top: '0', left: '60px', width: '300px' }}>
              <h3 className="font-knewave text-best-secondary-light font-semibold text-2xl mb-2">{t(v[0].title, language)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(v[0].description, language)}</p>
            </div>

            {/* Top-right */}
            <div className="absolute text-center" style={{ top: '0', right: '60px', width: '300px' }}>
              <h3 className="font-knewave text-best-secondary-light font-semibold text-2xl mb-2">{t(v[1].title, language)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(v[1].description, language)}</p>
            </div>

            {/* Bottom-center (Fun) */}
            <div className="absolute text-center" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '300px' }}>
              <h3 className="font-knewave text-best-secondary-light font-semibold text-2xl mb-2">{t(v[2].title, language)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(v[2].description, language)}</p>
            </div>

            {/* Bottom-left */}
            <div className="absolute text-center" style={{ bottom: '65px', left: '10px', width: '300px' }}>
              <h3 className="font-knewave text-best-secondary-light font-semibold text-2xl mb-2">{t(v[3].title, language)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(v[3].description, language)}</p>
            </div>

            {/* Bottom-right */}
            <div className="absolute text-center" style={{ bottom: '60px', right: '20px', width: '300px' }}>
              <h3 className="font-knewave text-best-secondary-light font-semibold text-2xl mb-2">{t(v[4].title, language)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{t(v[4].description, language)}</p>
            </div>
          </div>
        </div>

        {/* Tablet: 2-column grid with monke between rows */}
        <div className="hidden md:block lg:hidden">
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
              {v.slice(0, 2).map((item) => (
                <div key={t(item.title, language)} className="text-center">
                  <h3 className="font-knewave text-best-secondary-light font-bold text-xl mb-2">{t(item.title, language)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(item.description, language)}</p>
                </div>
              ))}
            </div>

            <img src="/monke.svg" alt="BEST Monkey" className="w-36 h-36" />

            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
              {v.slice(2, 4).map((item) => (
                <div key={t(item.title, language)} className="text-center">
                  <h3 className="font-knewave text-best-secondary-light font-bold text-xl mb-2">{t(item.title, language)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(item.description, language)}</p>
                </div>
              ))}
            </div>

            <div className="text-center max-w-xs">
              <h3 className="font-knewave text-best-secondary-light font-bold text-xl mb-2">{t(v[4].title, language)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t(v[4].description, language)}</p>
            </div>
          </div>
        </div>

        {/* Mobile: stacked with monke on top */}
        <div className="md:hidden flex flex-col items-center gap-10">
          <img src="/monke.svg" alt="BEST Monkey" className="w-32 h-32" />

          {v.map((item) => (
            <div key={t(item.title, language)} className="text-center max-w-sm">
              <h3 className="font-knewave text-best-secondary-light font-bold text-xl mb-2">{t(item.title, language)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t(item.description, language)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
