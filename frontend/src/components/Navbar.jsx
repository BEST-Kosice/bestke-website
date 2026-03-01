import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Facebook, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileHidden, setMobileHidden] = useState(false)
  const location = useLocation()
  const lastScrollY = useRef(0)

  const navRouteLinks = [
    { name: t(translations.nav.events, language), to: '/events' },
    { name: t(translations.nav.news, language), to: '/news' },
    { name: t(translations.nav.aboutUs, language), to: '/about' },
  ]

  const navAnchorLinks = [
    { name: t(translations.nav.contacts, language), href: '/#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth < 768

      setScrolled(currentScrollY > 20)

      if (isMobile) {
        if (currentScrollY < 20) {
          setMobileHidden(false)
        } else if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 80) {
          setMobileHidden(true)
        } else if (currentScrollY < lastScrollY.current - 8) {
          setMobileHidden(false)
        }
      } else {
        setMobileHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#990032] shadow-lg transition-transform duration-300 ${
        mobileHidden ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16 lg:h-20' : 'h-16 md:h-20 lg:h-24'
          }`}
        >
          {/* Logo — links home */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/BESTKEWhite.png"
              alt="BEST Košice"
              className={`w-auto group-hover:scale-105 transition-all duration-300 ${
                scrolled ? 'h-10 md:h-12 lg:h-14' : 'h-11 md:h-14 lg:h-16'
              }`}
            />
          </Link>

          {/* Desktop: nav links + language + social icons */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navRouteLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-white border-b-2 border-white pb-0.5'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {navAnchorLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-white/30 rounded-md text-white/90 hover:text-white hover:border-white/60 transition-colors"
              aria-label="Switch language"
            >
              {language}
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-3 ml-4 border-l border-white/20 pl-6">
              <a
                href="https://www.facebook.com/BESTKosice?locale=sk_SK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/bestkosice/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/best-kosice/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#990032] border-t border-white/10 px-4 py-4 space-y-3">
          {navRouteLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === link.to
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {navAnchorLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
            aria-label="Switch language"
          >
            {t(translations.nav.language, language)}: {language}
          </button>

          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            <a
              href="https://www.facebook.com/BESTKosice?locale=sk_SK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/bestkosice/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/best-kosice/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
