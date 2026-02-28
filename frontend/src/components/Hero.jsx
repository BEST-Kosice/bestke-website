import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

export default function Hero() {
  const images = ['/image1.webp', '/image2.webp', '/image3.webp', '/image4.webp']
  const [currentImage, setCurrentImage] = useState(0)
  const { language } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-best-neutral-dark/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div>
          <p className="text-best-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
            {t(translations.hero.subtitle, language)}
          </p>
          <h1 className="font-knewave text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
            {t(translations.hero.title1, language)}{' '}
            <span className="gradient-text">{t(translations.hero.title2, language)}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t(translations.hero.description, language)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#join"
            className="bg-best-primary hover:bg-best-primary-light text-white px-8 py-3.5 rounded-md text-lg font-semibold transition-colors"
          >
            {t(translations.hero.joinUs, language)}
          </a>
          <a
            href="#partners"
            className="border border-white/20 hover:border-best-primary text-white px-8 py-3.5 rounded-md text-lg font-semibold transition-colors"
          >
            {t(translations.hero.becomePartner, language)}
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-best-primary transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  )
}
