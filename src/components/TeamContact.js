import React, { useState } from 'react';

const team = [
  { name: 'Alex Vega', role: 'ML Engineer', img: 'https://via.placeholder.com/300x300?text=Alex', link: 'https://www.linkedin.com' },
  { name: 'Riley Chen', role: 'Data Scientist', img: 'https://via.placeholder.com/300x300?text=Riley', link: 'https://www.linkedin.com' },
  { name: 'Sam Patel', role: 'Frontend Dev', img: 'https://via.placeholder.com/300x300?text=Sam', link: 'https://www.linkedin.com' },
  { name: 'Jordan Lee', role: 'UX Designer', img: 'https://via.placeholder.com/300x300?text=Jordan', link: 'https://www.linkedin.com' },
];

export default function TeamContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-10" data-aos="fade-up">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-aos="fade-up">
          {team.map((m) => (
            <div key={m.name} className="bg-black/50 rounded-xl border border-white/10 p-4 text-center hover:-translate-y-2 transition-transform">
              <img src={m.img} alt={`${m.name} headshot`} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" loading="lazy" />
              <div className="text-white font-semibold">{m.name}</div>
              <div className="text-gray-400 text-sm">{m.role}</div>
              <a href={m.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-neon underline">LinkedIn</a>
            </div>
          ))}
        </div>

        <h3 id="contact" className="font-orbitron text-2xl text-white mb-6" data-aos="fade-up">Contact Us</h3>
        <form onSubmit={onSubmit} className="bg-black/50 rounded-xl border border-white/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-4" data-aos="fade-up" aria-labelledby="contact">
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-md p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1" htmlFor="message">Message</label>
            <textarea id="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-md p-2"></textarea>
          </div>
          <div>
            <button type="submit" className="gradient-cta px-6 py-3 rounded-md text-white font-semibold hover:scale-105 transition-transform">Send</button>
          </div>
          {submitted && <div role="status" aria-live="polite" className="text-green-400">Thanks! We will reach out soon.</div>}
        </form>
      </div>
    </section>
  );
}

