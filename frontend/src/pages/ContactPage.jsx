import {
    Building2,
    ExternalLink,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'

const socialLinks = [
  {
    name: 'Facebook',
    icon: <Facebook size={24} />,
    url: 'https://www.facebook.com/BESTKosice?locale=sk_SK',
    color: 'hover:bg-blue-600/20 hover:text-blue-400',
  },
  {
    name: 'Instagram',
    icon: <Instagram size={24} />,
    url: 'https://www.instagram.com/bestkosice/',
    color: 'hover:bg-pink-600/20 hover:text-pink-400',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={24} />,
    url: 'https://www.linkedin.com/company/best-kosice/posts/?feedView=all',
    color: 'hover:bg-sky-600/20 hover:text-sky-400',
  },
]

const keyContacts = [
  {
    name: 'Roderik Basanda',
    role: { EN: 'President', SK: 'Prezident', UA: 'Президент' },
    email: 'roderik.basanda@best-eu.org',
    photo: 'https://best.tuke.sk/img/people/board/roderik.webp',
  },
  {
    name: 'Katarína Gondová',
    role: { EN: 'Secretary', SK: 'Tajomníčka', UA: 'Секретар' },
    email: 'katarina.gondova@best-eu.org',
    photo: 'https://best.tuke.sk/img/people/board/gadga.webp',
  },
  {
    name: 'Jozef Belušak',
    role: {
      EN: 'VP for Fundraising',
      SK: 'VP pre Fundraising',
      UA: 'VP з фандрейзингу',
    },
    email: 'jozef.belusak@best-eu.org',
    photo: 'https://best.tuke.sk/img/people/board/jozo.webp',
  },
]

export default function ContactPage() {
  const { language } = useLanguage()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-best-primary/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            {t(translations.contactPage.heroTitle, language)}{' '}
            <span className="gradient-text">
              {t(translations.contactPage.heroHighlight, language)}
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t(translations.contactPage.heroSubtitle, language)}
          </p>
        </div>
      </section>

      {/* ── Contact Info + Key Contacts ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                {t(translations.contactPage.infoHeading, language)}{' '}
                <span className="gradient-text">
                  {t(translations.contactPage.infoHighlight, language)}
                </span>
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="glass rounded-md p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-best-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-best-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {t(translations.contactPage.emailLabel, language)}
                    </h3>
                    <a
                      href="mailto:kosice@best-eu.org"
                      className="text-gray-400 hover:text-best-secondary transition-colors"
                    >
                      kosice@best-eu.org
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="glass rounded-md p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-best-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-best-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {t(translations.contactPage.addressLabel, language)}
                    </h3>
                    <p className="text-gray-400">
                      {t(translations.contactPage.addressValue, language)}
                    </p>
                  </div>
                </div>

                {/* Office */}
                <div className="glass rounded-md p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-best-primary/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-best-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {t(translations.contactPage.officeLabel, language)}
                    </h3>
                    <p className="text-gray-400">
                      {t(translations.contactPage.officeValue, language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(translations.contactPage.socialHeading, language)}{' '}
                  <span className="gradient-text">
                    {t(translations.contactPage.socialHighlight, language)}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {t(translations.contactPage.socialSubtitle, language)}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="https://www.best.eu.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-best-secondary hover:text-best-secondary-light transition-colors text-sm font-medium"
                  >
                    {t(translations.contactPage.bestEuOrg, language)}{' '}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Key Contacts (Board Members) */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {t(translations.contactPage.keyContactsHeading, language)}{' '}
                <span className="gradient-text">
                  {t(translations.contactPage.keyContactsHighlight, language)}
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                {t(translations.contactPage.keyContactsSubtitle, language)}
              </p>

              <div className="space-y-6">
                {keyContacts.map((member) => (
                  <div
                    key={member.name}
                    className="glass rounded-md p-6 flex items-center gap-5"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-best-primary/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-lg">{member.name}</h3>
                      <p className="text-best-secondary text-sm font-medium mb-2">
                        {t(member.role, language)}
                      </p>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-best-secondary transition-colors text-sm break-all"
                      >
                        <Mail size={14} className="shrink-0" />
                        {member.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t(translations.contactPage.mapHeading, language)}{' '}
              <span className="gradient-text">
                {t(translations.contactPage.mapHighlight, language)}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full" />
          </div>

          <div className="glass rounded-md overflow-hidden">
            <iframe
              title="BEST Košice Location"
              src="https://maps.google.com/maps?q=48.73048,21.24505&z=17&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
