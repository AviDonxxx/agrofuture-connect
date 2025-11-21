import waterIcon from "@/assets/water-icon.png";
import energyIcon from "@/assets/energy-icon.png";
import growthIcon from "@/assets/growth-icon.png";

const solutions = [
  {
    icon: waterIcon,
    problem: "Дефицит воды",
    solution: "AI-орошение экономит 35-40%",
    description: "Умные датчики и алгоритмы машинного обучения оптимизируют полив в режиме реального времени",
  },
  {
    icon: energyIcon,
    problem: "Нехватка электричества",
    solution: "Солнечная энергия + edge AI",
    description: "Автономные солнечные панели и энергоэффективные AI-чипы работают независимо от сети",
  },
  {
    icon: growthIcon,
    problem: "Низкая урожайность",
    solution: "Рост дохода фермеров на 25-35%",
    description: "Научно обоснованные рекомендации повышают качество и объём урожая",
  },
];

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            От вызовов к решениям
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Современные технологии решают главные проблемы сельского хозяйства Кыргызстана
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <img
                  src={item.icon}
                  alt={item.problem}
                  className="w-20 h-20 mx-auto"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-destructive mb-2 text-center">
                {item.problem}
              </h3>
              
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
              
              <p className="text-2xl font-bold text-primary mb-4 text-center">
                {item.solution}
              </p>
              
              <p className="text-muted-foreground text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
