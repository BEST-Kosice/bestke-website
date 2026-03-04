import { useLanguage } from '../context/LanguageContext'
import translations, { t } from '../i18n/translations'
import {
  Users,
  Megaphone,
  Palette,
  Monitor,
  Handshake,
  Mail,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

/* ── Board & non-board data ── */
const boardMembers = [
  {
    name: 'Roderik Basanda',
    role: { EN: 'President', SK: 'Prezident', UA: 'Президент' },
    email: 'roderik.basanda@best-eu.org',
    photo: '/public/board/roderik.webp',
  },
  {
    name: 'Katarína Gondová',
    role: { EN: 'Secretary', SK: 'Tajomníčka', UA: 'Секретар' },
    email: 'katarina.gondova@best-eu.org',
    photo: '/public/board/gadga.webp',
  },
  {
    name: 'Peter Leško',
    role: { EN: 'Treasurer', SK: 'Pokladník', UA: 'Скарбник' },
    email: 'peter.lesko@best-eu.org',
    photo: '/public/board/peto.webp',
  },
  {
    name: 'Jozef Belušak',
    role: {
      EN: 'VP for Fundraising',
      SK: 'VP pre Fundraising',
      UA: 'VP з фандрейзингу',
    },
    email: 'jozef.belusak@best-eu.org',
    photo: '/public/board/jozo.webp',
  },
  {
    name: 'Denis Le Thanh',
    role: {
      EN: 'VP for Human Resources',
      SK: 'VP pre ľudské zdroje',
      UA: 'VP з людських ресурсів',
    },
    email: 'denis.le.thanh@best-eu.org',
    photo: '/public/board/delety.webp',
  },
  {
    name: 'Jakub Paranič',
    role: {
      EN: 'VP for Public Relations',
      SK: 'VP pre vzťahy s verejnosťou',
      UA: 'VP зі зв\'язків з громадськістю',
    },
    email: 'jakub.paranic@best-eu.org',
    photo: '/public/board/kubo.webp',
  },
  {
    name: 'Lubomír Krajčík',
    role: {
      EN: 'Design Responsible',
      SK: 'Zodpovedný za dizajn',
      UA: 'Відповідальний за дизайн',
    },
    email: 'lubomir.krajcik@best-eu.org',
    photo: '/public/board/lubo.webp',
  },
  {
    name: 'Nikita Chernysh',
    role: {
      EN: 'IT Responsible',
      SK: 'Zodpovedný za IT',
      UA: 'Відповідальний за IT',
    },
    email: 'nikita.chernysh@best-eu.org',
    photo: '/public/board/nikita.webp',
  },
]

/* ── Departments / Working Groups ── */
const departments = [
  {
    icon: <Users className="w-7 h-7" />,
    name: { EN: 'Human Resources', SK: 'Ľudské zdroje', UA: 'Людські ресурси' },
    description: {
      EN: 'Responsible for recruitment, onboarding, team building, and the personal development of all members.',
      SK: 'Zodpovedná za nábor, zaúčanie, teambuilding a osobný rozvoj všetkých členov.',
      UA: 'Відповідає за набір, адаптацію, тімбілдинг та особистий розвиток усіх членів.',
    },
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: <Megaphone className="w-7 h-7" />,
    name: {
      EN: 'Public Relations',
      SK: 'Vzťahy s verejnosťou',
      UA: 'Зв\'язки з громадськістю',
    },
    description: {
      EN: 'Manages our social media presence, creates content, and communicates with the public and student community.',
      SK: 'Spravuje naše sociálne siete, tvorí obsah a komunikuje s verejnosťou a študentskou komunitou.',
      UA: 'Керує нашою присутністю в соціальних мережах, створює контент та комунікує з громадськістю та студентською спільнотою.',
    },
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <Palette className="w-7 h-7" />,
    name: { EN: 'Design', SK: 'Dizajn', UA: 'Дизайн' },
    description: {
      EN: 'Creates visual identity, designs promotional materials, and ensures consistent branding across all channels.',
      SK: 'Tvorí vizuálnu identitu, navrhuje propagačné materiály a zabezpečuje konzistentný branding naprieč všetkými kanálmi.',
      UA: 'Створює візуальну ідентичність, розробляє рекламні матеріали та забезпечує послідовний брендинг у всіх каналах.',
    },
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    name: {
      EN: 'Information Technologies',
      SK: 'Informačné technológie',
      UA: 'Інформаційні технології',
    },
    description: {
      EN: 'Develops and maintains our digital infrastructure, website, and technical tools supporting all activities.',
      SK: 'Vyvíja a udržiava našu digitálnu infraštruktúru, webovú stránku a technické nástroje podporujúce všetky aktivity.',
      UA: 'Розробляє та підтримує нашу цифрову інфраструктуру, веб-сайт та технічні інструменти, що підтримують усі активності.',
    },
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    name: {
      EN: 'Corporate Relations',
      SK: 'Firemné vzťahy',
      UA: 'Корпоративні зв\'язки',
    },
    description: {
      EN: 'Builds and maintains partnerships with companies, secures sponsorships, and co-creates career-oriented events.',
      SK: 'Buduje a udržiava partnerstvá s firmami, zabezpečuje sponzorov a spoluvytvára kariérne orientované podujatia.',
      UA: 'Будує та підтримує партнерства з компаніями, забезпечує спонсорство та співтворить заходи, орієнтовані на кар\'єру.',
    },
    color: 'from-amber-500 to-orange-600',
  },
]

/* ── Person Card ── */
function PersonCard({ member, language, highlight = false }) {
  return (
    <a
      className={`group relative glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-best-primary/10 ${
        highlight ? 'ring-2 ring-best-primary/40' : ''
      }`}
      {...(member.role.EN === "IT Responsible" && {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      })}    >
      <div className="aspect-[3/4] overflow-hidden bg-best-neutral-dark">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-white font-bold text-lg leading-tight">{member.name}</h3>
        <p className="text-best-secondary font-semibold text-sm mt-1">
          {t(member.role, language)}
        </p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs mt-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            {member.email}
          </a>
        )}
      </div>
    </a>
  )
}

/* ── Department Card ── */
function DepartmentCard({ dept, language }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="glass rounded-xl p-6 text-left w-full transition-all duration-300 hover:shadow-lg hover:shadow-best-primary/5 group cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center text-white shrink-0`}
          >
            {dept.icon}
          </div>
          <h3 className="text-white font-bold text-lg">{t(dept.name, language)}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed">{t(dept.description, language)}</p>
      </div>
    </button>
  )
}

/* ── Page ── */
export default function AboutUsPage() {
  const { language } = useLanguage()
  const tr = translations.aboutUsPage

  return (
    <div className="min-h-screen">
      {/* ────── Hero Banner ────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{ backgroundImage: "url('/image2.webp')" }}
        />
        <div className="absolute inset-0 bg-best-neutral-dark/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 flex items-center justify-center gap-4 flex-wrap">
            {/* {t(tr.heroTitle, language)}{' '} */}
            <img src="/BESTKEWhite.png" alt="BEST Košice" className="h-14 md:h-20 lg:h-24 w-auto" />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t(tr.heroSubtitle, language)}
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { value: '30+', label: t(tr.statYears, language) },
              { value: '96', label: t(tr.statLBGs, language) },
              { value: '33', label: t(tr.statCountries, language) },
              { value: '500+', label: t(tr.statAlumni, language) },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-best-primary">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ────── Board ────── */}
      <section className="py-20 md:py-24 bg-best-neutral-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-best-secondary font-semibold uppercase tracking-widest text-sm">
              {t(tr.boardSubtitle, language)}
            </p>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t(tr.boardHeading, language)}{' '}
              <span className="gradient-text">{t(tr.boardHighlight, language)}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t(tr.boardDescription, language)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((m) => (
              <PersonCard key={m.name} member={m} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* ────── Departments / Working Groups ────── */}
      <section className="py-20 md:py-24 bg-best-neutral border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t(tr.deptHeading, language)}{' '}
              <span className="gradient-text">{t(tr.deptHighlight, language)}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t(tr.deptDescription, language)}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {departments.map((d) => (
              <div key={t(d.name, 'EN')} className="w-full md:w-[calc(50%-0.5rem)]">
                <DepartmentCard dept={d} language={language} />
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
