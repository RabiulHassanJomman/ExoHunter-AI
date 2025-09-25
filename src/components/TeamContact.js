
/**
 * Team member data
 * Each team member has a name, role, and LinkedIn profile link
 * Gradient avatars are generated using initials from names
 */
const team = [
  { name: 'Md. Abrar Fairuj Raiyan', role: 'ML Engineer', link: 'https://www.linkedin.com' },
  { name: 'Afif Al Hasnain', role: 'Data Scientist', link: 'https://www.linkedin.com' },
  { name: 'MD. Jomman', role: 'Frontend Developer', link: 'https://www.linkedin.com' },
  { name: 'Farabi', role: 'Frontend Developer', link: 'https://www.linkedin.com' },
  { name: 'Hasan Md Arik', role: 'Front and Backend Developer', link: 'https://www.linkedin.com' },
  { name: 'Md Abrar Zahin Antor', role: 'ML Engineer', link: 'https://www.linkedin.com' },
];

/**
 * Team Component - Displays ExoHunter AI team members
 * 
 * Features:
 * - Responsive grid layout (1/2/3 columns based on screen size)
 * - Gradient avatar generation from name initials
 * - Individual member cards with hover animations
 * - LinkedIn profile links for each member
 */
export default function Team() {

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-10" data-aos="fade-up">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" data-aos="fade-up">
          {team.map((m) => (
            <div key={m.name} className="bg-black/50 rounded-xl border border-white/10 p-6 text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                {m.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
              <div className="text-white font-semibold">{m.name}</div>
              <div className="text-gray-400 text-sm">{m.role}</div>
              <a href={m.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-neon underline">LinkedIn</a>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

