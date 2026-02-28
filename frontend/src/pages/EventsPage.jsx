import { useEffect } from 'react'
import { Code, Briefcase, GraduationCap, Users, Lightbulb, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const eventMeta = [
  { icon: <Calendar className="w-8 h-8" />, color: 'from-[#990032] to-[#FF6600]' },
  { icon: <GraduationCap className="w-8 h-8" />, color: 'from-[#FF6600] to-amber-500' },
  { icon: <Briefcase className="w-8 h-8" />, color: 'from-[#990032] to-rose-500' },
  { icon: <Users className="w-8 h-8" />, color: 'from-[#FF6600] to-orange-400' },
  { icon: <Lightbulb className="w-8 h-8" />, color: 'from-[#990032] to-purple-600' },
  { icon: <Code className="w-8 h-8" />, color: 'from-[#FF6600] to-[#990032]' },
]

export default function EventsPage() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-best-neutral-dark">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {t(translations.eventsPage.heading, language)}{' '}
            <span className="gradient-text">{t(translations.eventsPage.headingHighlight, language)}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#990032] to-[#FF6600] mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t(translations.eventsPage.subtitle, language)}
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {translations.eventsPage.items.map((event, index) => (
              <div
                key={index}
                className="glass rounded-md overflow-hidden"
              >
                <div className="md:flex">
                  {/* Icon strip */}
                  <div
                    className={`bg-gradient-to-br ${eventMeta[index].color} p-8 flex items-center justify-center md:w-48 shrink-0`}
                  >
                    <div className="text-white">{eventMeta[index].icon}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1">
                    <h2 className="text-white font-bold text-2xl mb-3">{t(event.title, language)}</h2>
                    <p className="text-gray-400 leading-relaxed">{t(event.description, language)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
