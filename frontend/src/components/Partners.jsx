import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const partners = [
  { logo: '/Sponsors/LocalHost - Full.svg', url: 'https://www.localhost.company/' },
  { logo: '/Sponsors/RMKK.svg', url: 'https://rmkk.sk/' },
]

export default function Partners() {
  const { language } = useLanguage()

  return (
    <section id="partners" className="py-20 md:py-24 bg-best-neutral-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t(translations.partners.heading, language)} <span className="gradient-text">{t(translations.partners.headingHighlight, language)}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t(translations.partners.subtitle, language)}
          </p>
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {partners.map((partner) => (
            <a
              key={partner.url}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block opacity-80 hover:opacity-100 transition-opacity bg-gray-200 rounded-lg p-4"
            >
              <img
                src={partner.logo}
                alt="Partner"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-md p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-2xl mb-3">{t(translations.partners.ctaTitle, language)}</h3>
            <p className="text-gray-400 mb-6">
              {t(translations.partners.ctaDescription, language)}
            </p>
            <a
              href="mailto:kosice@best.tuke.sk"
              className="bg-best-secondary hover:bg-best-secondary-light text-best-neutral-dark px-8 py-3 rounded-md font-semibold transition-colors inline-block"
            >
              {t(translations.partners.ctaButton, language)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
