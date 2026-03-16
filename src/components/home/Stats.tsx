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
    <section className="relative z-20 -mt-8 md:-mt-12 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className={`${item.bgColor} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color}`} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
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

