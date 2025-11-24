const phases = [
  {
    id: "Фаза 0",
    period: "Декабрь 2025 – Февраль 2026",
    budget: "$15–20k",
    focus: "Подготовка, выбор площадок, партнёрства, заявки на гранты.",
  },
  {
    id: "Фаза 1",
    period: "Март – Октябрь 2026",
    budget: "$80–100k",
    focus: "Пилотные поля, установка оборудования, демонстрации, сбор данных, первый публичный отчёт.",
  },
  {
    id: "Фаза 2",
    period: "2027",
    budget: "$200–250k",
    focus: "Масштабирование на 24 поля, образовательные программы, коммерческие контракты.",
  },
  {
    id: "Фаза 3",
    period: "2028+",
    budget: "$430–630k/год",
    focus: "Самоокупаемость, консалтинг, продажи данных и технологий, повторные гранты.",
  },
];

const RoadmapPlan = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-muted/50 to-background" id="roadmap">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">План разработки</p>
          <h2 className="text-4xl font-bold">Как мы развиваем «АгроПоле-242»</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Пошаговая дорожная карта превращает проект из пилота в самоокупаемую платформу для горных и энергодефицитных регионов.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col gap-3"
            >
              <div className="text-sm font-semibold text-secondary tracking-wide">{phase.id}</div>
              <div className="text-lg font-bold">{phase.period}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Бюджет</div>
              <div className="text-2xl font-semibold text-primary">{phase.budget}</div>
              <p className="text-muted-foreground">{phase.focus}</p>
              <div className="mt-auto text-xs text-muted-foreground/80">Этап {index + 1} из 4</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapPlan;

