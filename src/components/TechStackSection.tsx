const stack = [
  {
    title: "Frontend",
    items: [
      "React / Next.js для SSR и SEO",
      "Tailwind CSS для быстрой стилизации",
      "Recharts для дашбордов",
      "Leaflet / Mapbox для карт полей",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js (Express) или Python (FastAPI)",
      "PostgreSQL: поля, пользователи, датчики",
      "InfluxDB: временные ряды телеметрии",
      "MQTT + WebSocket для real-time обновлений",
    ],
  },
  {
    title: "Хостинг и инфраструктура",
    items: [
      "Vercel для фронтенда (free tier)",
      "DigitalOcean / Hetzner для API ($10-20/мес)",
      "Cloudflare CDN для ускорения",
      "Google Analytics + Hotjar для аналитики",
    ],
  },
  {
    title: "Дополнительно",
    items: [
      "Telegram Bot API — уведомления фермерам",
      "CI/CD и мониторинг энергопотребления",
      "Интеграции с ERP и банковскими сервисами",
      "Экспорт данных для государственных систем",
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/60 to-background" id="tech-stack">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">Технический стек</p>
          <h2 className="text-4xl font-bold">Рекомендованная архитектура для масштабирования</h2>
          <p className="text-muted-foreground text-lg">
            Мы комбинируем лучшие инструменты для карт, IoT и аналитики, чтобы быстро запускать MVP и уверенно выходить на промышленный уровень.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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

