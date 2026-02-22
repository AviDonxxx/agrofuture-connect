import { useState } from "react";
import FieldsMap, { fieldsData } from "@/components/FieldsMap";
import { Droplets, Thermometer, Wifi, WifiOff, Wrench, BarChart3, Filter } from "lucide-react";

type StatusFilter = "all" | "online" | "maintenance" | "offline";

const translateStatus = (status: (typeof fieldsData)[number]["status"]) => {
  switch (status) {
    case "online": return "онлайн";
    case "maintenance": return "сервис";
    default: return "оффлайн";
  }
};

const statusConfig = {
  online: {
    label: "Онлайн",
    icon: Wifi,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    dot: "bg-emerald-500",
  },
  maintenance: {
    label: "Сервис",
    icon: Wrench,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    dot: "bg-amber-500",
  },
  offline: {
    label: "Оффлайн",
    icon: WifiOff,
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-900/30",
    dot: "bg-red-400",
  },
} as const;

const stats = [
  { label: "Полей в проекте", value: "24", sub: "пилотная зона", icon: BarChart3, color: "text-primary" },
  { label: "Целевая экономия", value: "до 40%", sub: "прогноз AI-полива", icon: Droplets, color: "text-blue-500" },
  { label: "Целевая влажность", value: "61%", sub: "оптимальный уровень", icon: Thermometer, color: "text-amber-500" },
  { label: "IoT-маячков", value: "312", sub: "в тестовой сети", icon: Wifi, color: "text-emerald-500" },
];

const Fields = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const regions = Array.from(new Set(fieldsData.map((f) => f.region)));

  const filtered = fieldsData.filter((f) => {
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    if (regionFilter !== "all" && f.region !== regionFilter) return false;
    return true;
  });

  return (
    <div className="space-y-0 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-14">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-primary font-medium">Наши поля</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            24 поля и теплицы<br />
            <span className="text-primary">по всему Кыргызстану</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Спутники, IoT-датчики и AI координируют полив, питание и энергопотребление в режиме реального времени.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="bg-muted p-2.5 rounded-xl shrink-0">
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
                  <p className="text-xs text-muted-foreground/60">{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 pb-6">
        <div className="rounded-3xl overflow-hidden border shadow-lg">
          <FieldsMap />
        </div>
      </section>

      {/* Fields catalog */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Каталог полей</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} из {fieldsData.length} полей
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="text-sm border rounded-lg px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">Все статусы</option>
              <option value="online">Онлайн</option>
              <option value="maintenance">Сервис</option>
              <option value="offline">Оффлайн</option>
            </select>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">Все регионы</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border">
            <Wifi className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Нет полей по выбранным фильтрам</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((field) => {
              const cfg = statusConfig[field.status] || statusConfig.offline;
              const Icon = cfg.icon;
              return (
                <div
                  key={field.id}
                  className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{field.region}</p>
                      <h3 className="text-lg font-bold leading-tight mt-0.5">{field.name}</h3>
                      <p className="text-sm text-muted-foreground">Культура: <span className="font-medium text-foreground">{field.crop}</span></p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color} shrink-0`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                      {cfg.label}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Площадь</p>
                      <p className="text-base font-bold text-primary">{field.hectares.toFixed(1)} га</p>
                    </div>
                    <div className="bg-blue-50/60 dark:bg-blue-900/10 rounded-xl p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <p className="text-xs text-muted-foreground">Влажность</p>
                      </div>
                      <p className="text-base font-bold text-blue-600">{field.moisture}%</p>
                    </div>
                  </div>

                  {/* Efficiency bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground">Эффективность орошения</span>
                      <span className="text-xs font-bold text-emerald-600">{field.irrigationEfficiency}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                        style={{ width: `${field.irrigationEfficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Fields;
