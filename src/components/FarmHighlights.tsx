import { SunMedium, Droplet, Wheat } from "lucide-react";

const highlights = [
  {
    title: "Живые грядки",
    description: "Тепличные модули с капельным поливом и датчиками освещённости дают до +28% урожая.",
    stat: "18 теплиц",
    texture: "repeating-linear-gradient(135deg,#fef3c7 0px,#fef3c7 12px,#fde68a 12px,#fde68a 24px)",
    icon: SunMedium,
  },
  {
    title: "Аква-контур",
    description: "Сеть подземных труб поддерживает оптимальную влажность 48-55% даже в жару.",
    stat: "-40% воды",
    texture: "repeating-linear-gradient(145deg,#e0f2fe 0px,#e0f2fe 10px,#bae6fd 10px,#bae6fd 20px)",
    icon: Droplet,
  },
  {
    title: "Полосы урожая",
    description: "Грядки оформлены как «фермерские полосы» с IoT-маячками и QR-паспортом каждой культуры.",
    stat: "24 поля",
    texture: "repeating-linear-gradient(90deg,#fef9c3 0px,#fef9c3 16px,#bbf7d0 16px,#bbf7d0 32px)",
    icon: Wheat,
  },
];

const FarmHighlights = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">Фермерский дизайн</p>
          <h2 className="text-4xl font-bold">Земля, грядки и вода как элементы интерфейса</h2>
          <p className="text-muted-foreground text-lg">
            Визуальные «полосы» напоминают настоящие поля: солнечные гряды, влажные контуры и полосы урожая. Пользователи быстрее считывают состояние полей.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="relative rounded-3xl border border-border shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: highlight.texture }} />
                <div className="relative z-10 p-6 space-y-4 backdrop-blur-[1px]">
                  <div className="inline-flex items-center justify-center rounded-full bg-white/80 p-3 shadow">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">эко-элемент</p>
                    <h3 className="text-2xl font-semibold">{highlight.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                  <p className="text-lg font-semibold text-primary">{highlight.stat}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FarmHighlights;

