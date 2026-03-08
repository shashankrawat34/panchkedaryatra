import { FiLinkedin, FiInstagram, FiAward } from 'react-icons/fi';
import { FaMountain } from 'react-icons/fa';

const team = [
  {
    name: 'Devendra Rawat',
    role: 'Founder & Lead Guide',
    bio: 'Born in Ukhimath village, Devendra has been guiding Panch Kedar treks for 22+ years. Certified by the Indian Mountaineering Foundation with expertise in high-altitude rescue.',
    certifications: 'IMF Certified',
    initials: 'DR',
    color: 'from-primary-700 to-primary-900',
  },
  {
    name: 'Meera Bisht',
    role: 'Operations Manager',
    bio: 'Meera ensures every yatra runs seamlessly – from logistics and accommodations to meals and permits. She has managed 500+ successful pilgrimages across Uttarakhand.',
    certifications: 'Tourism Management',
    initials: 'MB',
    color: 'from-accent-500 to-accent-700',
  },
  {
    name: 'Prakash Negi',
    role: 'Senior Trek Leader',
    bio: 'With over 15 years of mountaineering experience, Prakash specializes in the Rudranath and Madmaheshwar routes. Known for his calm demeanor and encyclopedic knowledge of local flora.',
    certifications: 'WFA Certified',
    initials: 'PN',
    color: 'from-green-600 to-green-800',
  },
  {
    name: 'Anita Thapa',
    role: 'Guest Relations & Wellness',
    bio: 'Anita manages pilgrim wellbeing, from altitude acclimatization guidance to yoga sessions at base camps. Her warm hospitality has earned glowing reviews from thousands of travelers.',
    certifications: 'Yoga & First Aid',
    initials: 'AT',
    color: 'from-purple-600 to-purple-800',
  },
];

export default function Team() {
  return (
    <section id="team" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Our Team
          </span>
          <h2 className="section-title">
            Meet Your <span className="text-accent-500">Expert Guides</span>
          </h2>
          <p className="section-subtitle">
            Our passionate team of certified mountaineers and hospitality professionals ensure 
            your Panch Kedar Yatra is safe, comfortable, and unforgettable.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={member.name}
              className="card group text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative overflow-hidden">
                <div className={`w-full h-64 bg-gradient-to-br ${member.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                  <span className="text-5xl font-bold text-white/90 select-none">{member.initials}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Social overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href="#"
                    className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary-800 hover:bg-accent-500 hover:text-white transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary-800 hover:bg-accent-500 hover:text-white transition-colors"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <FiInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-primary-800 text-lg mb-0.5">
                  {member.name}
                </h3>
                <p className="text-accent-500 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-primary-700 text-xs leading-relaxed mb-3">{member.bio}</p>
                <span className="inline-flex items-center gap-1.5 text-xs bg-primary-50 text-primary-800 px-3 py-1 rounded-full">
                  <FiAward className="w-3.5 h-3.5" />
                  {member.certifications}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
