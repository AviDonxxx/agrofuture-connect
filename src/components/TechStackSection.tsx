const stack = [
  {
    title: "Базовый стек MVP",
    items: [
      "React / Next.js — основа интерфейса",
      "Tailwind CSS — современная стилизация",
      "Lucide / Recharts — иконки и базовые графики",
      "Node.js / Python — серверная логика и API",
      "PostgreSQL — надежное хранение данных",
    ],
  },
  {
    title: "Масштабирование (Future)",
    items: [
      "MQTT & InfluxDB — промышленный IoT",
      "Интеграции с ERP и гос-системами",
      "Банковские API для транзакций",
      "Автоматизация мониторинга энергии",
      "Продвинутая ML-аналитика почвы",
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/60 to-background" id="tech-stack">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">Технический стек</p>
          <h2 className="text-4xl font-bold">Архитектура и готовность к росту</h2>
          <p className="text-muted-foreground text-lg">
            Это стек, на котором мы строим MVP. Он выбран для обеспечения быстрого старта, надежности и полной готовности к масштабированию до промышленного уровня.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stack.map((category) => (
            <div key={category.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-3">
              <h3 className="text-2xl font-semibold text-primary">{category.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

