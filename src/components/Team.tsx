import { Users, Code, GraduationCap } from "lucide-react";

const roles = [
  {
    icon: Users,
    title: "Фермеры",
    subtitle: "эксперты полей",
    description: "Опытные агрономы делятся знаниями и внедряют инновации на своих участках",
    color: "from-primary to-primary-light",
  },
  {
    icon: Code,
    title: "IT-разработчики",
    subtitle: "создатели AI",
    description: "Инженеры и data scientists разрабатывают умные алгоритмы для сельского хозяйства",
    color: "from-secondary to-accent",
  },
  {
    icon: GraduationCap,
    title: "Студенты",
    subtitle: "будущее агротехнологий",
    description: "Молодые специалисты учатся и создают инновационные решения для отрасли",
    color: "from-primary-light to-secondary",
  },
];

const Team = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Кто мы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Уникальное сообщество профессионалов, объединённых одной целью
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {role.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-primary mb-4">
                    {role.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
