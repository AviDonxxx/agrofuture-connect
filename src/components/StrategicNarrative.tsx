const StrategicNarrative = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <p className="text-secondary uppercase tracking-[0.4em] text-sm">Какую проблему решает проект</p>
          <h2 className="text-4xl font-bold">
            «АгроПоле-242» снимает барьер недоверия к AI и делает сельское хозяйство Кыргызстана устойчивым
          </h2>
          <p className="text-muted-foreground text-lg">
            Мы показываем живые доказательства эффективности технологий: от экономии воды до роста урожайности. Каждый кейс наглядно демонстрирует, что AI — это не «магия», а источник прибыли и стабильности даже для консервативных хозяйств.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-3">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Корневая боль</p>
            <h3 className="text-2xl font-semibold">Недоверие к инновациям и устаревшая техника</h3>
            <p className="text-muted-foreground">
              Фермеры привыкли опираться на прошлый опыт, используют оборудование 90-х и низкий генетический потенциал скота. Мы ломаем скепсис демонстрациями полей и публичными дашбордами с урожайностью, влажностью и экономией воды.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-3">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Контекст 2025 года</p>
            <h3 className="text-2xl font-semibold">Энергокризис, климат и свёрнутые господдержки</h3>
            <p className="text-muted-foreground">
              Кыргызстан переживает отключения электричества, рост тарифов и закрытие льготного кредитования. Климат заставляет растения потреблять больше воды. Всё это ставит под удар продовольственную безопасность, поэтому мы предлагаем технологический ответ.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-border p-6 bg-background/60">
          <p className="text-sm uppercase tracking-widest text-secondary">Кому выгодно</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-sm md:text-base">
            <div className="p-4 rounded-2xl bg-card shadow-sm">
              <p className="font-semibold text-primary mb-1">Фермеры и сельские семьи</p>
              <p className="text-muted-foreground">Получают доход, рабочие места, доступ к воде и энергии.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card shadow-sm">
              <p className="font-semibold text-primary mb-1">FAO, USAID и доноры</p>
              <p className="text-muted-foreground">Видят прозрачные KPI и масштабируемую модель помощи.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card shadow-sm">
              <p className="font-semibold text-primary mb-1">AgriTech-бизнес</p>
              <p className="text-muted-foreground">Тестирует решения на пилотах и заключает контракты.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card shadow-sm">
              <p className="font-semibold text-primary mb-1">Правительство КР</p>
              <p className="text-muted-foreground">Укрепляет продовольственную безопасность и экспорт.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card shadow-sm">
              <p className="font-semibold text-primary mb-1">Сельхозбанки и инвесторы</p>
              <p className="text-muted-foreground">Получают подтверждённую экономику проектов и дорожную карту масштабирования.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicNarrative;

