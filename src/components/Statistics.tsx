import { useEffect, useState } from "react";

const stats = [
  { value: 48, label: "га умных полей", suffix: "" },
  { value: 127000, label: "сэкономлено воды", suffix: "м³" },
  { value: 2847, label: "обученных фермеров", suffix: "" },
  { value: 32, label: "средний рост урожайности", suffix: "%" },
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Цифры, которые говорят сами
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Реальные результаты проекта АгроПоле-242
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, suffix, index }: {
  value: number;
  label: string;
  suffix: string;
  index: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className="text-center animate-count-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">
        {count.toLocaleString('ru-RU')}
        {suffix && <span className="text-3xl md:text-4xl ml-1">{suffix}</span>}
      </div>
      <div className="text-sm md:text-base text-primary-foreground/90 font-medium">
        {label}
      </div>
    </div>
  );
};

export default Statistics;
