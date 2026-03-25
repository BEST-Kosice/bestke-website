import { useEffect } from 'react'

const timelineData = [
  { year: '1989', title: 'Founding of BEST International', description: 'BEST was founded in Berlin, connecting students of technology across Europe.' },
  { year: '2003', title: 'Establishment of BEST Košice', description: 'BEST Košice was founded at the Technical University of Košice, becoming an active LBG in Slovakia.' },
  { year: '2005', title: 'First BEST Course in Košice', description: 'Our first international BEST Course brought together students from across Europe.' },
  { year: '2008', title: 'First Engineering Job Fair', description: 'Launched the first Engineering Job Fair connecting students with top companies.' },
  { year: '2010', title: 'First EBEC', description: 'Organized the first BEST Engineering Competition at our university.' },
  { year: '2013', title: 'First BEST Training Week', description: 'A week of free intensive workshops, trainings, and lectures for students.' },
  { year: '2016', title: 'First BEST::HACKath0n', description: 'Inaugural hackathon event challenging participants to create innovative solutions.' },
  { year: '2020', title: 'Transition to Online Events', description: 'Successfully adapted all events to virtual formats during the global pandemic.' },
  { year: '2024', title: 'Record Membership Year', description: 'Reached our highest number of active members and organized events.' },
]

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className="flex items-center gap-4 md:gap-8">
      
      {/* Left content (desktop) */}
      <div className={`hidden md:block w-5/12 ${isLeft ? '' : 'order-3'}`}>
        <div className={`glass rounded-md p-6 ${isLeft ? 'text-right' : 'text-left'}`}>
          <div className="text-best-primary font-black text-2xl mb-2">{item.year}</div>
          <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="flex flex-col items-center order-1 md:order-2 shrink-0">
        <div className="w-4 h-4 rounded-full bg-best-primary border-4 border-best-neutral-dark shadow-lg shadow-best-primary/30 z-10" />
      </div>

      {/* Right content (desktop) / Mobile content */}
      <div className={`flex-1 md:w-5/12 ${isLeft ? 'order-3' : 'order-1'}`}>
        {/* Mobile view */}
        <div className="md:hidden glass rounded-md p-4">
          <div className="text-best-primary font-black text-xl mb-1">{item.year}</div>
          <h3 className="text-white font-bold mb-1">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
        {/* Desktop spacer for opposite side */}
        <div className="hidden md:block" />
      </div>
    </div>
  )
}

export default function Timeline() {
  useEffect(() => {
    window.scrollTo(window.scrollX, window.scrollY)
  }, [])

  return (
    <section id="timeline" className="py-20 md:py-24 bg-best-neutral border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Key <span className="gradient-text">Dates</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-best-primary to-best-secondary mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line md:-translate-x-0.5" />

          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>

          {/* To Be Continued */}
          <div className="mt-12 text-center">
            <div className="glass rounded-md px-8 py-4 inline-flex items-center gap-3">
              <span className="text-2xl">∞</span>
              <div className="text-left">
                <div className="text-white font-bold">To Be Continued</div>
                <div className="text-gray-400 text-sm">You might be the one to create something new!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
