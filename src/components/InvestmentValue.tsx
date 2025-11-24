const InvestmentValue = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">Стоимость и улучшения</p>
          <h2 className="text-4xl font-bold">Бюджет $300–370k → устойчивый агротех-хаб</h2>
          <p className="text-muted-foreground text-lg">
            Инвестиции закрывают оборудование IoT, энергоустановки, обучение и поддержку фермеров. Далее мы расширяем умные гектары и экспорт решений.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Поддержка полей, образовательных центров и команд данных.</li>
            <li>• Инвестиции реинвестируются в расширение и R&amp;D.</li>
            <li>• Формируем единый стандарт данных и консалтинга для региона.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg space-y-6">
          <div>
            <p className="text-sm uppercase text-muted-foreground tracking-widest">Ценность для страны</p>
            <p className="text-2xl font-semibold">Экономия воды 40% • Урожайность +20–35%</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Доход сельских семей</p>
              <p className="text-3xl font-bold text-primary">+$ млн</p>
              <p className="text-xs text-muted-foreground">тысячи домохозяйств выходят в плюс</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Рабочие места</p>
              <p className="text-3xl font-bold text-secondary">+ сотни</p>
              <p className="text-xs text-muted-foreground">инженеры, агрономы, аналитики</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            «АгроПоле-242» становится прототипом для горных регионов Азии и мира, защищая продовольствие от климатических и энергетических ударов.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentValue;

