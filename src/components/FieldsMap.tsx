import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type FieldInfo = {
  id: number;
  name: string;
  region: string;
  lat: number;
  lng: number;
  hectares: number;
  crop: string;
  status: "online" | "maintenance" | "offline";
  irrigationEfficiency: number;
  moisture: number;
};

const fields: FieldInfo[] = [
  { id: 1, name: "Чуй-01", region: "Чуйская", lat: 42.889, lng: 74.590, hectares: 2.1, crop: "Пшеница", status: "online", irrigationEfficiency: 41, moisture: 52 },
  { id: 2, name: "Чуй-02", region: "Чуйская", lat: 42.640, lng: 75.150, hectares: 1.8, crop: "Картофель", status: "online", irrigationEfficiency: 39, moisture: 48 },
  { id: 3, name: "Чуй-03", region: "Чуйская", lat: 42.520, lng: 74.820, hectares: 1.5, crop: "Кукуруза", status: "maintenance", irrigationEfficiency: 35, moisture: 50 },
  { id: 4, name: "Талас-01", region: "Таласская", lat: 42.521, lng: 72.242, hectares: 1.9, crop: "Подсолнечник", status: "online", irrigationEfficiency: 42, moisture: 47 },
  { id: 5, name: "Талас-02", region: "Таласская", lat: 42.650, lng: 72.400, hectares: 1.2, crop: "Соя", status: "online", irrigationEfficiency: 38, moisture: 53 },
  { id: 6, name: "Нарын-01", region: "Нарынская", lat: 41.430, lng: 75.981, hectares: 2.4, crop: "Ячмень", status: "online", irrigationEfficiency: 43, moisture: 46 },
  { id: 7, name: "Нарын-02", region: "Нарынская", lat: 41.050, lng: 76.350, hectares: 1.6, crop: "Люцерна", status: "offline", irrigationEfficiency: 0, moisture: 0 },
  { id: 8, name: "Нарын-03", region: "Нарынская", lat: 41.660, lng: 74.910, hectares: 1.7, crop: "Картофель", status: "online", irrigationEfficiency: 37, moisture: 51 },
  { id: 9, name: "Иссык-Куль-01", region: "Иссык-Кульская", lat: 42.480, lng: 78.395, hectares: 2.0, crop: "Яблоня", status: "online", irrigationEfficiency: 40, moisture: 55 },
  { id: 10, name: "Иссык-Куль-02", region: "Иссык-Кульская", lat: 42.700, lng: 77.400, hectares: 1.4, crop: "Виноград", status: "maintenance", irrigationEfficiency: 33, moisture: 44 },
  { id: 11, name: "Иссык-Куль-03", region: "Иссык-Кульская", lat: 41.950, lng: 77.980, hectares: 1.9, crop: "Овёс", status: "online", irrigationEfficiency: 36, moisture: 49 },
  { id: 12, name: "Ош-01", region: "Ошская", lat: 40.540, lng: 72.810, hectares: 2.5, crop: "Хлопок", status: "online", irrigationEfficiency: 45, moisture: 43 },
  { id: 13, name: "Ош-02", region: "Ошская", lat: 40.930, lng: 72.980, hectares: 1.3, crop: "Перец", status: "maintenance", irrigationEfficiency: 31, moisture: 40 },
  { id: 14, name: "Ош-03", region: "Ошская", lat: 40.730, lng: 73.300, hectares: 1.6, crop: "Помидор", status: "online", irrigationEfficiency: 38, moisture: 45 },
  { id: 15, name: "Баткен-01", region: "Баткенская", lat: 40.060, lng: 70.820, hectares: 1.1, crop: "Фисташка", status: "online", irrigationEfficiency: 34, moisture: 37 },
  { id: 16, name: "Баткен-02", region: "Баткенская", lat: 40.340, lng: 71.520, hectares: 1.5, crop: "Абрикос", status: "online", irrigationEfficiency: 36, moisture: 42 },
  { id: 17, name: "Баткен-03", region: "Баткенская", lat: 40.430, lng: 70.950, hectares: 1.8, crop: "Виноград", status: "maintenance", irrigationEfficiency: 32, moisture: 39 },
  { id: 18, name: "Джалал-Абад-01", region: "Джалал-Абадская", lat: 41.110, lng: 72.970, hectares: 2.2, crop: "Грецкий орех", status: "online", irrigationEfficiency: 44, moisture: 54 },
  { id: 19, name: "Джалал-Абад-02", region: "Джалал-Абадская", lat: 41.310, lng: 73.800, hectares: 1.7, crop: "Чеснок", status: "online", irrigationEfficiency: 37, moisture: 49 },
  { id: 20, name: "Джалал-Абад-03", region: "Джалал-Абадская", lat: 40.910, lng: 73.190, hectares: 1.9, crop: "Чай", status: "online", irrigationEfficiency: 35, moisture: 46 },
  { id: 21, name: "Бишкек-Опыт", region: "Город Бишкек", lat: 42.874, lng: 74.612, hectares: 0.9, crop: "Теплица", status: "online", irrigationEfficiency: 47, moisture: 58 },
  { id: 22, name: "Ош-Опыт", region: "Город Ош", lat: 40.515, lng: 72.800, hectares: 1.0, crop: "Теплица", status: "online", irrigationEfficiency: 46, moisture: 56 },
  { id: 23, name: "Ат-Башы", region: "Нарынская", lat: 41.172, lng: 75.800, hectares: 1.4, crop: "Картофель", status: "online", irrigationEfficiency: 39, moisture: 48 },
  { id: 24, name: "Каракол", region: "Иссык-Кульская", lat: 42.490, lng: 78.390, hectares: 1.6, crop: "Ягоды", status: "online", irrigationEfficiency: 41, moisture: 52 },
];

const statusColors: Record<FieldInfo["status"], string> = {
  online: "#10b981",
  maintenance: "#f97316",
  offline: "#ef4444",
};

const FieldsMap = () => {
  const [activeField, setActiveField] = useState<FieldInfo>(fields[0]);

  const summary = useMemo(() => {
    const totalHectares = fields.reduce((acc, field) => acc + field.hectares, 0);
    const online = fields.filter((f) => f.status === "online").length;
    const efficiency = Math.round(fields.reduce((acc, field) => acc + field.irrigationEfficiency, 0) / fields.length);
    return { totalHectares, online, efficiency };
  }, []);

  return (
    <section className="py-16" id="map">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-10">
          <div className="rounded-3xl border border-border shadow-lg overflow-hidden">
            <MapContainer
              center={[41.4, 74.7] as LatLngExpression}
              zoom={6.3}
              className="h-[500px] w-full"
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {fields.map((field) => (
                <CircleMarker
                  key={field.id}
                  center={[field.lat, field.lng]}
                  radius={10}
                  pathOptions={{
                    color: statusColors[field.status],
                    fillColor: statusColors[field.status],
                    fillOpacity: 0.8,
                  }}
                  eventHandlers={{
                    click: () => setActiveField(field),
                  }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-semibold">{field.name}</p>
                      <p className="text-sm text-muted-foreground">{field.region}</p>
                      <p className="text-sm">Культура: {field.crop}</p>
                      <p className="text-sm">Площадь: {field.hectares.toFixed(1)} га</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 shadow">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Активное поле</p>
              <h3 className="text-2xl font-bold mt-2">{activeField.name}</h3>
              <p className="text-muted-foreground">{activeField.region}</p>
              <div className="mt-4 space-y-2 text-sm">
                <p>Культура: <span className="font-semibold text-foreground">{activeField.crop}</span></p>
                <p>Площадь: <span className="font-semibold">{activeField.hectares.toFixed(1)} га</span></p>
                <p>Влажность почвы: <span className="font-semibold">{activeField.moisture}%</span></p>
                <p>Эффективность полива: <span className="font-semibold">{activeField.irrigationEfficiency}%</span></p>
                <p>
                  Статус:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: statusColors[activeField.status] }}
                  >
                    {activeField.status === "online"
                      ? "Онлайн"
                      : activeField.status === "maintenance"
                        ? "Сервис"
                        : "Отключено"}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border p-4 text-center">
                <p className="text-sm text-muted-foreground">Полей онлайн</p>
                <p className="text-3xl font-bold text-primary">{summary.online}/24</p>
              </div>
              <div className="rounded-2xl border border-border p-4 text-center">
                <p className="text-sm text-muted-foreground">Общая площадь</p>
                <p className="text-3xl font-bold text-secondary">{summary.totalHectares.toFixed(1)} га</p>
              </div>
              <div className="rounded-2xl border border-border p-4 text-center">
                <p className="text-sm text-muted-foreground">Эффективность</p>
                <p className="text-3xl font-bold text-foreground">{summary.efficiency}%</p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border p-4">
              <p className="text-sm text-muted-foreground mb-2">Фильтр по статусу</p>
              <div className="flex gap-3 flex-wrap text-sm">
                {Object.entries(statusColors).map(([status, color]) => (
                  <span key={status} className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    {status === "online" ? "Онлайн" : status === "maintenance" ? "Сервис" : "Оффлайн"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const fieldsData = fields;

export default FieldsMap;

