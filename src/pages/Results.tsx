import { useState } from "react";
import LiveDataCharts from "@/components/LiveDataCharts";
import Statistics from "@/components/Statistics";
import { AgroCaseStudies } from "@/components/AgroCaseStudies";
import { Droplets, TrendingUp, Target, BarChart3, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    title: "Оптимизация полива",
    value: "Цель",
    sub: "Снижение расхода ресурсов",
    description: "Внедрение AI и микрополива для минимизации потерь воды при сохранении урожайности.",
    icon: Droplets,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800/40",
  },
  {
    title: "Эффективность ферм",
    value: "Потенциал",
    sub: "Рост доходов участников",
    description: "Повышение доходности за счет прецизионной агрономии и точного планирования спроса.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800/40",
  },
  {
    title: "Точность прогнозов",
    value: "ML-модели",
    sub: "Предотвращение болезней",
    description: "Использование нейросетей для раннего обнаружения угроз и пиков энергопотребления.",
    icon: Target,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800/40",
  },
];

const TABS = [
  { id: "overview", label: "Метрики", icon: BarChart3 },
  { id: "charts", label: "Live-графики", icon: TrendingUp },
  { id: "cases", label: "Кейсы фермеров", icon: Leaf },
];

const Results = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-0 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/15 to-background py-14">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-secondary-foreground/70 font-medium">
            Результаты
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Точные метрики<br />
            <span className="text-primary">проекта AgroFarm</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Каждый сенсор, дрон и фермерский дневник синхронизируются в единой платформе. Смотрите сводные показатели в реальном времени.
          </p>
        </div>
      </section>

      {/* Key highlights */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  "rounded-2xl border p-6 shadow-sm space-y-3",
                  item.bg,
                  item.border,
                )}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                  <span className={`text-3xl font-black ${item.color}`}>
                    {item.value}
                  </span>
                </div>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4">
        <div className="flex gap-1 p-1 bg-muted/50 rounded-2xl w-fit mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-card shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "overview" && <Statistics />}
        {activeTab === "charts" && <LiveDataCharts />}
        {activeTab === "cases" && <AgroCaseStudies />}
      </section>
    </div>
  );
};

export default Results;
