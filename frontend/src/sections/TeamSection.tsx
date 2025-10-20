const team = [
  {
    name: 'Yadavally Venkateshwarlu',
    role: 'Managing Director',
    bio: 'Former Deputy Engineer of over 30 years of experience working for the Irrigation Department of the government of Telangana (erstwhile United AP) turned to private construction since 2014. Leads our Construction Division along with Site inspections and Flood Management.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Manthrala Jyothi',
    role: 'Acquisitions & Legal',
    bio: 'Former Teacher for the government of Telangana, practicing Lawyer at the Ranga Reddy District Court. Leads our Acquisitions and Legal Division.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Yadavally Mourya',
    role: 'Sales',
    bio: 'Data Analyst & IT Consulting Business Operator. Leads our NRI Sales Division.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
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
            Family owned and operated business. Our Team includes
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
