import { Droplets, TrendingUp, Users, Leaf } from "lucide-react";

const goals = [
  {
    icon: Droplets,
    label: "Экономия поливной воды",
    description: "Снижение расхода ресурсов за счёт умных ИИ-рекомендаций и датчиков.",
    color: "text-blue-400"
  },
  {
    icon: TrendingUp,
    label: "Рост урожайности",
    description: "Повышение эффективности за счёт осознанного выбора культур и режимов полива.",
    color: "text-emerald-400"
  },
  {
    icon: Users,
    label: "Обучение фермеров",
    description: "Развитие навыков работы с ИИ-технологиями в сельском хозяйстве.",
    color: "text-amber-400"
  },
  {
    icon: Leaf,
    label: "Эко-устойчивость",
    description: "Внедрение бережных технологий возделывания почв для будущих поколений.",
    color: "text-secondary"
  },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Цели и потенциал AgroFarm
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Основные направления развития и ожидаемые эффекты от внедрения пилотного проекта
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-center">
                  <div className={`p-3 rounded-2xl bg-white/10 ${goal.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{goal.label}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
