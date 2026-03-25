import { Users, UserCheck, Layers, ArrowRight } from 'lucide-react'

const departments = [
  { name: 'Human Resources', icon: <Users className="w-5 h-5" />, members: '8-12', description: 'Recruitment, team building, and member development' },
  { name: 'Corporate Relations', icon: <UserCheck className="w-5 h-5" />, members: '6-10', description: 'Partnership management and company relations' },
  { name: 'Public Relations', icon: <Layers className="w-5 h-5" />, members: '6-10', description: 'Marketing, social media, and brand management' },
  { name: 'IT', icon: <Layers className="w-5 h-5" />, members: '4-8', description: 'Technical infrastructure and digital solutions' },
  { name: 'Design', icon: <Layers className="w-5 h-5" />, members: '4-8', description: 'Visual identity and creative materials' },
  { name: 'Finance', icon: <Layers className="w-5 h-5" />, members: '3-5', description: 'Budget management and financial planning' },
]

export default function Structure() {
  return (
    <section id="structure" className="py-20 md:py-24 bg-best-neutral border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            How Organization is <span className="gradient-text">Structured</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Over 500 students have volunteered in the organization throughout its history!
            Generations of students have spent their student years here: working, having fun, and shaping their own BEST!
          </p>
        </div>

        {/* Org Chart */}
        <div>
          {/* President */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-md p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-best-primary to-best-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg">President</h3>
              <p className="text-gray-400 text-sm">Leading the organization</p>
            </div>
          </div>

          {/* Connection line */}
          <div className="flex justify-center mb-8">
            <div className="w-0.5 h-8 bg-gradient-to-b from-best-primary to-best-secondary" />
          </div>

          {/* Board */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-md px-8 py-4 text-center">
              <h3 className="text-white font-bold">Board of Directors</h3>
              <p className="text-gray-400 text-sm">Strategic leadership team</p>
            </div>
          </div>

          {/* Connection lines */}
          <div className="flex justify-center mb-8">
            <div className="w-0.5 h-8 bg-gradient-to-b from-best-primary to-best-secondary" />
          </div>

          {/* Departments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, index) => (
              <div
                key={dept.name}
                className="glass rounded-md p-5 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-md bg-best-primary/10 text-best-primary flex items-center justify-center">
                    {dept.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{dept.name}</h4>
                    <p className="text-best-primary text-xs">{dept.members} members</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{dept.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#join"
              className="inline-flex items-center gap-2 text-best-primary hover:text-best-primary-light transition-colors font-semibold"
            >
              Structure of BEST Košice <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
