import { Users, GraduationCap, Award, Trophy } from 'lucide-react';

const stats = [
  {
    label: 'Santri',
    value: '1.200+',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Guru',
    value: '50+',
    icon: GraduationCap,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    label: 'Akreditasi',
    value: 'A',
    icon: Award,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Ekskul',
    value: '25+',
    icon: Trophy,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

export function Stats() {
  return (
    <section className="relative z-20 -mt-24 md:-mt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:border-blue-500/20 transition-all duration-300"
            >
              <div className={`${item.bgColor} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-7 h-7 md:w-8 md:h-8 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">
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
