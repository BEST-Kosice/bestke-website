import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

export default function About() {
const { language } = useLanguage()
return (
    <section id="about" className="py-20 md:py-24 bg-best-neutral border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
        {/* Section Header */}
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center gap-3 flex-wrap">
            <span>{t(translations.about.heading, language)}</span>
            <img src="/BEST.png" alt="BEST" className="h-12 md:h-24 w-auto" />
            <span>?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-best-neutral-dark">
            <img
                src="/team.jpg"
                alt="BEST Košice Team"
                className="w-full h-full object-cover"
            />
            </div>

            {/* Content side */}
            <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed"
               dangerouslySetInnerHTML={{ __html: t(translations.about.description, language) }}
            />

            <div className="glass rounded-md p-6">
                <img src="BESTKEWhite.png" alt="Best Kosice Logo" className="h-12 md:h-14 w-auto"/>
                <p className="text-gray-300 leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: t(translations.about.localDescription, language) }}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-md p-4 text-center">
                <div className="text-2xl font-black text-best-primary">96</div>
                <div className="text-gray-400 text-sm">{t(translations.about.lbgsInEurope, language)}</div>
                </div>
                <div className="glass rounded-md p-4 text-center">
                <div className="text-2xl font-black text-best-secondary">33</div>
                <div className="text-gray-400 text-sm">{t(translations.about.countries, language)}</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
)
}
