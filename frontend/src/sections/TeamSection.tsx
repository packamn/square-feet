const team = [
  {
    name: 'Brooke Winters',
    role: 'Founder & Managing Broker',
    bio: 'Former proptech VP with 15 years of luxury brokerage experience across SF, NY, and Austin.',
    avatar: 'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jules Ramirez',
    role: 'Head of Client Strategy',
    bio: 'Drives buyer success teams and analytics operations, specializing in relocation and investment portfolios.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Noah Mitchell',
    role: 'Director of Listings',
    bio: 'Architects fast-track listing programs with concierge staging, marketing, and partner network coordination.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
]

const TeamSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">Advisors</p>
          <h2 className="font-display text-3xl font-semibold text-slate-900">Built by operators, guided by data</h2>
          <p className="text-slate-600">
            Our leadership team combines luxury brokerage, investment analytics, and white-glove client service. We’re here to
            unlock your next move—no matter the city.
          </p>
        </div>
        <a
          href="/about"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
        >
          Meet the full team
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white"
          >
            <div className="flex items-center gap-4">
              <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full object-cover shadow" />
              <div>
                <p className="font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs uppercase tracking-wide text-brand-500">{member.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TeamSection
