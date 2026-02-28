import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const socialLinks = [
  { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://www.facebook.com/BESTKosice?locale=sk_SK' },
  { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/bestkosice/' },
  { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/company/best-kosice/posts/?feedView=all' },
]

export default function Footer() {
  const { language } = useLanguage()

  const footerLinks = [
    { name: t(translations.footer.home, language), to: '/' },
    { name: t(translations.footer.events, language), to: '/events' },
    { name: t(translations.footer.news, language), to: '/news' },
  ]

  return (
    <footer id="contact" className="relative bg-best-neutral-dark pt-16 pb-8 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#990032]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/BESTKosiceWhite.png"
                alt="BEST"
                className="h-14 md:h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t(translations.footer.brand, language)}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#990032]/20 flex items-center justify-center text-gray-400 hover:text-[#990032] transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">{t(translations.footer.quickLinks, language)}</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[#FF6600] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">{t(translations.footer.contact, language)}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF6600] mt-0.5 shrink-0" />
                <div className="text-gray-400 text-sm">
                  Letná 9, 040 01<br />
                  Košice, Slovakia
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF6600] mt-0.5 shrink-0" />
                <div className="text-gray-400 text-sm">
                  Office: Boženy Nemcovej 32<br />
                  040 01 Košice
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF6600] shrink-0" />
                <a
                  href="mailto:kosice@best-eu.org"
                  className="text-gray-400 hover:text-[#FF6600] transition-colors text-sm"
                >
                  kosice@best-eu.org
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold mb-4">{t(translations.footer.socialMedia, language)}</h3>
            <div className="space-y-3">
              <a
                href="https://www.facebook.com/BESTKosice?locale=sk_SK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6600] transition-colors text-sm"
              >
                <Facebook size={16} /> Facebook
              </a>
              <a
                href="https://www.instagram.com/bestkosice/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6600] transition-colors text-sm"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/best-kosice/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6600] transition-colors text-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
            <div className="mt-6">
              <a
                href="https://www.best.eu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF6600] hover:text-[#ff8533] transition-colors text-sm font-medium"
              >
                Visit BEST.eu.org <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BEST Košice. {t(translations.footer.allRights, language)}
          </p>
          <p className="text-gray-600 text-xs">
            by SD & MB
          </p>
        </div>
      </div>
    </footer>
  )
}
