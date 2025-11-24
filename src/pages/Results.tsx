import LiveDataCharts from "@/components/LiveDataCharts";
import Statistics from "@/components/Statistics";

const highlights = [
  {
    title: "Экономия воды",
    value: "127 000 м³",
    description: "AI-полив и микрополив снизили расход воды на 40% при росте урожайности.",
  },
  {
    title: "Рост дохода фермеров",
    value: "+32%",
    description: "Прецизионная агрономия и прогноз спроса дают стабильный доход.",
  },
  {
    title: "Точность прогнозов",
    value: "92%",
    description: "ML-модели предсказывают болезни и пики потребления энергии.",
  },
];

const Results = () => {
  return (
    <div className="space-y-12 pb-16">
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-secondary-foreground">Результаты</p>
          <h1 className="text-4xl md:text-5xl font-bold">Точные метрики проекта АгроПоле-242</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Каждый сенсор, дрон и фермерский дневник синхронизируются в единой платформе. Смотрите сводные показатели и live-графики в режиме реального времени.
          </p>
        </div>
      </section>

      <Statistics />

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-lg space-y-2">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">{item.title}</p>
              <p className="text-4xl font-bold text-primary">{item.value}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <LiveDataCharts />
    </div>
  );
};

export default Results;

