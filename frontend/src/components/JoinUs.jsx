import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

export default function JoinUs() {
  const { language } = useLanguage()

  return (
    <section id="join" className="py-20 md:py-24 bg-best-neutral border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t(translations.joinUs.heading, language)} <span className="gradient-text">{t(translations.joinUs.headingHighlight, language)}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t(translations.joinUs.subtitle, language)}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h3 className="text-white font-bold text-2xl mb-6">{t(translations.joinUs.whyJoin, language)}</h3>
              <div className="space-y-4">
                {translations.joinUs.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-best-primary shrink-0" />
                    <span className="text-gray-300">{t(benefit, language)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 glass rounded-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-best-secondary" />
                  <span className="text-white font-semibold">{t(translations.joinUs.whereToFind, language)}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Technical University of Košice<br />
                  Letná 1/9, 042 00 Košice-Sever, Slovakia
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div>
              <div className="glass rounded-md p-8 md:p-10">
                <h3 className="text-white font-bold text-2xl mb-2">{t(translations.joinUs.readyToStart, language)}</h3>
                <p className="text-gray-400 mb-8">
                  {t(translations.joinUs.readyDescription, language)}
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:kosice@best.tuke.sk"
                    className="flex items-center justify-center gap-2 w-full bg-best-primary hover:bg-best-primary-light text-white py-3.5 rounded-md font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    {t(translations.joinUs.applyEmail, language)}
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-sm text-center">
                    {t(translations.joinUs.recruitmentNote, language)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
