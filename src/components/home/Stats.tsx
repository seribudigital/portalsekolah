import { Users, GraduationCap, Award, Trophy } from 'lucide-react';

const stats = [
  {
    label: 'Santri',
    value: '1.200+',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Guru',
    value: '50+',
    icon: GraduationCap,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    label: 'Akreditasi',
    value: 'A',
    icon: Award,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Ekskul',
    value: '25+',
    icon: Trophy,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

export function Stats() {
  return (
    <section className="relative z-20 -mt-12 md:-mt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${item.bgColor} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
