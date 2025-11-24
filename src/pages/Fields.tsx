import FieldsMap, { fieldsData } from "@/components/FieldsMap";

const Fields = () => {
  return (
    <div className="space-y-12 pb-16">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-secondary uppercase tracking-[0.3em] text-sm">Наши поля</p>
          <h1 className="text-4xl md:text-5xl font-bold">24 поля и теплицы по всему Кыргызстану</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Спутники, IoT-датчики и AI координируют полив, питание и энергопотребление, снижая расход воды на 40% и повышая урожайность на 30%.
          </p>
        </div>
      </section>

      <FieldsMap />

      <section className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-bold">Живой каталог полей</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fieldsData.map((field) => (
            <div key={field.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">{field.region}</p>
              <h3 className="text-2xl font-semibold">{field.name}</h3>
              <p className="text-muted-foreground">Культура: {field.crop}</p>
              <div className="text-sm grid grid-cols-2 gap-2">
                <span>Площадь: <strong>{field.hectares.toFixed(1)} га</strong></span>
                <span>Влажность: <strong>{field.moisture}%</strong></span>
                <span>Эффективность: <strong>{field.irrigationEfficiency}%</strong></span>
                <span>Статус: <strong>{translateStatus(field.status)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const translateStatus = (status: (typeof fieldsData)[number]["status"]) => {
  switch (status) {
    case "online":
      return "онлайн";
    case "maintenance":
      return "сервис";
    default:
      return "оффлайн";
  }
};

export default Fields;

