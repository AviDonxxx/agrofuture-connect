import { useEffect, useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

type LivePoint = {
  time: string;
  moisture: number;
  temperature: number;
  sunlight: number;
};

const initialData: LivePoint[] = Array.from({ length: 7 }).map((_, idx) => ({
  time: `-${(6 - idx) * 5} мин`,
  moisture: 40 + Math.random() * 15,
  temperature: 18 + Math.random() * 8,
  sunlight: 60 + Math.random() * 20,
}));

const LiveDataCharts = () => {
  const [data, setData] = useState<LivePoint[]>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const nextPoint: LivePoint = {
          time: new Date().toLocaleTimeString("ru-RU", { minute: "2-digit", second: "2-digit" }),
          moisture: clamp(prev[prev.length - 1].moisture + randomDelta(), 35, 70),
          temperature: clamp(prev[prev.length - 1].temperature + randomDelta(), 16, 32),
          sunlight: clamp(prev[prev.length - 1].sunlight + randomDelta() * 2, 40, 100),
        };

        return [...prev.slice(-6), nextPoint];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const latest = useMemo(() => data[data.length - 1], [data]);

  return (
    <section className="py-16" id="live-data">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm uppercase tracking-widest text-secondary">Live-данные</p>
          <h2 className="text-4xl font-bold">Поток телеметрии с 24 полей</h2>
          <p className="text-muted-foreground text-lg">
            Каждые 4 секунды мы обновляем показатели влажности, температуры и солнечной активности, чтобы AI мог корректировать полив и питание.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <LiveCard label="Влажность почвы" value={`${latest.moisture.toFixed(1)}%`} trend="+0.6%" />
          <LiveCard label="Температура" value={`${latest.temperature.toFixed(1)}°C`} trend="-0.2°C" />
          <LiveCard label="Солнечная активность" value={`${latest.sunlight.toFixed(0)} klx`} trend="+1.1 klx" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-lg">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" domain={[30, 80]} />
                <YAxis yAxisId="right" orientation="right" domain={[10, 40]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moisture" stroke="#22c55e" strokeWidth={3} yAxisId="left" dot={false} />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={3} yAxisId="right" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4 shadow-lg">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="sunlight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fde047" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#fde047" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="time" />
                <YAxis domain={[30, 110]} />
                <Tooltip />
                <Area type="monotone" dataKey="sunlight" stroke="#facc15" fillOpacity={1} fill="url(#sunlight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const LiveCard = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-1">
    <p className="text-sm text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-secondary">{trend} за 30 мин</p>
  </div>
);

const randomDelta = () => (Math.random() - 0.5) * 2;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default LiveDataCharts;

