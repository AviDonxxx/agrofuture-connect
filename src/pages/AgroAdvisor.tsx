import { useState } from "react";
import {
    analyzeAndAdvise,
    FarmerInput,
    AgroAdvice,
    REGIONS,
    GOALS,
    Region,
    WaterAccess,
    IrrigationType,
    Goal,
} from "@/lib/agroEngine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sprout,
    Droplets,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    RotateCcw,
    Wheat,
    Sun,
    CloudRain,
    Banknote,
    Lightbulb,
    MapPin,
    Ruler,
    Target,
} from "lucide-react";

// ── Форма ────────────────────────────────────────────────────────────────────

interface FormState {
    region: Region | "";
    areaInput: string;
    waterAccess: WaterAccess | "";
    irrigationType: IrrigationType | "";
    budgetInput: string;
    goal: Goal | "";
}

const INITIAL_FORM: FormState = {
    region: "",
    areaInput: "",
    waterAccess: "",
    irrigationType: "",
    budgetInput: "",
    goal: "",
};

// ── Utility ──────────────────────────────────────────────────────────────────

function formatSom(n: number): string {
    if (Math.abs(n) >= 1000000) return `${(n / 1000000).toFixed(1)} млн с`;
    if (Math.abs(n) >= 1000) return `${Math.round(n / 1000)} тыс с`;
    return `${n} с`;
}

function formatKg(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)} т`;
    return `${n} кг`;
}

// ── Компоненты секций результата ─────────────────────────────────────────────

function SectionCard({
    icon,
    title,
    color,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    color: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`rounded-2xl border bg-card shadow-sm overflow-hidden`}>
            <div className={`flex items-center gap-3 px-6 py-4 ${color}`}>
                <div className="text-white">{icon}</div>
                <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
            </div>
            <div className="px-6 py-5">{children}</div>
        </div>
    );
}

function RiskBadge({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-2 py-1">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80">{text}</span>
        </div>
    );
}

function StepItem({ text, index }: { text: string; index: number }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index}
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{text}</p>
        </div>
    );
}

// ── Результаты ───────────────────────────────────────────────────────────────

function ResultsView({
    advice,
    input,
    onReset,
}: {
    advice: AgroAdvice;
    input: FarmerInput;
    onReset: () => void;
}) {
    const primaryCrop = advice.recommendedCrops[0];
    const secondaryCrop = advice.recommendedCrops[1];

    const droughtColor = {
        high: "bg-emerald-100 text-emerald-700",
        medium: "bg-amber-100 text-amber-700",
        low: "bg-red-100 text-red-700",
    };
    const droughtLabel = {
        high: "Высокая засухоустойчивость",
        medium: "Средняя засухоустойчивость",
        low: "Требует постоянного полива",
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Шапка результата */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Ваш агро-план 🌱</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        {input.region} · {input.areaHectares} га ·{" "}
                        {input.goal === "max_profit"
                            ? "Максимум прибыли"
                            : input.goal === "stable"
                                ? "Стабильный доход"
                                : "Минимум рисков"}
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Новый расчёт
                </Button>
            </div>

            {/* СИТУАЦИЯ */}
            <SectionCard
                icon={<MapPin className="w-5 h-5" />}
                title="Ситуация"
                color="bg-slate-600"
            >
                <p className="text-sm leading-relaxed text-foreground/85">
                    {advice.situation}
                </p>
                {advice.risks.length > 0 && (
                    <div className="mt-4 space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Возможные риски
                        </p>
                        {advice.risks.map((r, i) => (
                            <RiskBadge key={i} text={r} />
                        ))}
                    </div>
                )}
            </SectionCard>

            {/* РЕКОМЕНДУЕМЫЕ КУЛЬТУРЫ */}
            <SectionCard
                icon={<Sprout className="w-5 h-5" />}
                title="Рекомендуемые культуры"
                color="bg-emerald-600"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    {[primaryCrop, secondaryCrop].filter(Boolean).map((crop, i) => (
                        <div
                            key={crop.name}
                            className={`rounded-xl border p-4 ${i === 0 ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/10" : "bg-muted/40"}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="font-bold text-base">{crop.nameRu}</span>
                                    {i === 0 && (
                                        <Badge className="ml-2 text-xs bg-emerald-500 text-white">
                                            Основная
                                        </Badge>
                                    )}
                                </div>
                                <Wheat className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                                {crop.reason}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-medium ${droughtColor[crop.droughtTolerance]}`}
                                >
                                    {droughtLabel[crop.droughtTolerance]}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                    Созревает за {crop.maturityDays} дней
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            {/* ПЛАН ПОЛИВА */}
            <SectionCard
                icon={<Droplets className="w-5 h-5" />}
                title="План полива"
                color="bg-blue-600"
            >
                <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    <div className="bg-blue-50/60 dark:bg-blue-900/10 rounded-xl p-4">
                        <CloudRain className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Частота</p>
                        <p className="font-semibold text-sm mt-0.5">
                            {advice.waterPlan.frequency}
                        </p>
                    </div>
                    <div className="bg-blue-50/60 dark:bg-blue-900/10 rounded-xl p-4">
                        <Droplets className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Объём</p>
                        <p className="font-semibold text-sm mt-0.5">
                            {advice.waterPlan.amount}
                        </p>
                    </div>
                    <div className="bg-blue-50/60 dark:bg-blue-900/10 rounded-xl p-4">
                        <Sun className="w-5 h-5 text-amber-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Время полива</p>
                        <p className="font-semibold text-sm mt-0.5">
                            {advice.waterPlan.timing}
                        </p>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-xl px-4 py-3 mb-4">
                    <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                        🌾 <strong>Мульчирование:</strong> {advice.waterPlan.mulchingTip}
                    </p>
                </div>

                <div className="space-y-2">
                    {advice.waterPlan.additionalTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground/80">{tip}</p>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4 italic">
                    * Примерные рекомендации — корректируйте по реальным условиям и
                    влажности почвы.
                </p>
            </SectionCard>

            {/* ПРИМЕРНАЯ ЭКОНОМИКА */}
            <SectionCard
                icon={<TrendingUp className="w-5 h-5" />}
                title="Примерная экономика"
                color="bg-violet-600"
            >
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {/* Затраты */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Ориентировочные затраты (на {input.areaHectares} га)
                        </p>
                        {[
                            {
                                label: "Семена / посадочный материал",
                                val: advice.economics.seedCostPerHa * input.areaHectares,
                            },
                            {
                                label: "Удобрения",
                                val: advice.economics.fertilizerCostPerHa * input.areaHectares,
                            },
                            {
                                label: "Полив",
                                val: advice.economics.waterCostPerHa * input.areaHectares,
                            },
                            {
                                label: "Труд",
                                val: advice.economics.laborCostPerHa * input.areaHectares,
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex justify-between items-center text-sm"
                            >
                                <span className="text-muted-foreground">{item.label}</span>
                                <span className="font-medium">{formatSom(item.val)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between items-center">
                            <span className="text-sm font-semibold">Итого затрат</span>
                            <span className="font-bold text-red-600">
                                {formatSom(advice.economics.totalCostPerHa * input.areaHectares)}
                            </span>
                        </div>
                    </div>

                    {/* Доход */}
                    <div className="bg-violet-50/60 dark:bg-violet-900/10 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                Потенциальный результат
                            </p>
                            <div className="flex items-center gap-2 mb-1">
                                <Wheat className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Ожидаемый урожай:
                                </span>
                                <span className="font-bold">
                                    {formatKg(advice.economics.estimatedYieldKg)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <Banknote className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Выручка:</span>
                                <span className="font-bold">
                                    {formatSom(advice.economics.estimatedRevenue.min)} –{" "}
                                    {formatSom(advice.economics.estimatedRevenue.max)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 border-t pt-3">
                            <p className="text-xs text-muted-foreground mb-1">
                                Прибыль (после затрат):
                            </p>
                            <p
                                className={`text-2xl font-black ${advice.economics.estimatedProfit.min >= 0 ? "text-emerald-600" : "text-red-500"}`}
                            >
                                {formatSom(advice.economics.estimatedProfit.min)} –{" "}
                                {formatSom(advice.economics.estimatedProfit.max)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                        {advice.economics.disclaimer}
                    </p>
                </div>
            </SectionCard>

            {/* ПРАКТИЧЕСКИЕ ШАГИ */}
            <SectionCard
                icon={<Lightbulb className="w-5 h-5" />}
                title="Практические шаги на этот сезон"
                color="bg-orange-500"
            >
                <div className="space-y-4">
                    {advice.practicalSteps.map((step, i) => (
                        <StepItem key={i} text={step} index={i + 1} />
                    ))}
                </div>
            </SectionCard>

            <div className="text-center text-xs text-muted-foreground pb-4">
                AgroFarm AI · Рекомендации носят ориентировочный характер. При серьёзных
                решениях консультируйтесь с местным агрономом.
            </div>
        </div>
    );
}

// ── ФОРМА ОПРОСА ─────────────────────────────────────────────────────────────

function SelectCard({
    label,
    description,
    selected,
    onClick,
    icon,
}: {
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-150 hover:border-primary/60 focus:outline-none ${selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card"
                }`}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <div
                        className={`text-xl ${selected ? "text-primary" : "text-muted-foreground"}`}
                    >
                        {icon}
                    </div>
                )}
                <div>
                    <p
                        className={`font-medium text-sm ${selected ? "text-primary" : "text-foreground"}`}
                    >
                        {label}
                    </p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
                {selected && (
                    <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />
                )}
            </div>
        </button>
    );
}

function FormField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-3">
            <p className="font-semibold text-sm text-foreground">{label}</p>
            {children}
        </div>
    );
}

// ── ГЛАВНАЯ СТРАНИЦА ──────────────────────────────────────────────────────────

export default function AgroAdvisor() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [advice, setAdvice] = useState<AgroAdvice | null>(null);
    const [savedInput, setSavedInput] = useState<FarmerInput | null>(null);
    const [error, setError] = useState<string>("");

    const handleSubmit = () => {
        setError("");

        if (!form.region) {
            setError("Пожалуйста, выберите регион.");
            return;
        }
        const area = parseFloat(form.areaInput.replace(",", "."));
        if (!area || area <= 0 || area > 1000) {
            setError("Введите корректную площадь (от 0.01 до 1000 га).");
            return;
        }
        if (!form.waterAccess) {
            setError("Укажите доступ к поливной воде.");
            return;
        }
        if (!form.irrigationType) {
            setError("Укажите тип орошения.");
            return;
        }
        const budget = parseFloat(form.budgetInput.replace(",", ".").replace(/\s/g, ""));
        if (!budget || budget < 1000) {
            setError("Введите бюджет на сезон (минимум 1 000 сом).");
            return;
        }
        if (!form.goal) {
            setError("Выберите цель сезона.");
            return;
        }

        const input: FarmerInput = {
            region: form.region as Region,
            areaHectares: area,
            waterAccess: form.waterAccess as WaterAccess,
            irrigationType: form.irrigationType as IrrigationType,
            budgetSom: budget,
            goal: form.goal as Goal,
        };

        const result = analyzeAndAdvise(input);
        setSavedInput(input);
        setAdvice(result);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleReset = () => {
        setAdvice(null);
        setSavedInput(null);
        setForm(INITIAL_FORM);
        setError("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-background to-background dark:from-emerald-950/20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-emerald-500/30 text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/40">
                                🤖 AI-Агроконсультант
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                            Умные советы для вашего поля
                        </h1>
                        <p className="text-emerald-100 text-base md:text-lg leading-relaxed max-w-xl">
                            Введите данные о вашем участке — и получите персональные
                            рекомендации по культурам, поливу и примерному доходу. Всё
                            адаптировано под реалии Кыргызстана.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="max-w-3xl mx-auto">
                    {advice && savedInput ? (
                        <ResultsView
                            advice={advice}
                            input={savedInput}
                            onReset={handleReset}
                        />
                    ) : (
                        <div className="space-y-8">
                            <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-xl">
                                        <Sprout className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Данные о вашем поле</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Заполните все поля — это займёт около 2 минут
                                        </p>
                                    </div>
                                </div>

                                {/* Регион */}
                                <FormField label="1. В каком регионе ваш участок?">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                        {REGIONS.map((r) => (
                                            <SelectCard
                                                key={r}
                                                label={r}
                                                selected={form.region === r}
                                                onClick={() =>
                                                    setForm((f) => ({ ...f, region: r }))
                                                }
                                                icon={<MapPin className="w-4 h-4" />}
                                            />
                                        ))}
                                    </div>
                                </FormField>

                                {/* Площадь */}
                                <FormField label="2. Площадь участка (в гектарах)">
                                    <div className="flex items-center gap-3 max-w-xs">
                                        <div className="relative flex-1">
                                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                placeholder="напр. 0.5 или 2"
                                                value={form.areaInput}
                                                onChange={(e) =>
                                                    setForm((f) => ({ ...f, areaInput: e.target.value }))
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground">га</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        1 га = 100 соток. Например: 0.25 га = 25 соток
                                    </p>
                                </FormField>

                                {/* Вода */}
                                <FormField label="3. Доступ к поливной воде">
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        <SelectCard
                                            label="Хороший"
                                            description="Вода есть всегда, без ограничений"
                                            selected={form.waterAccess === "good"}
                                            onClick={() =>
                                                setForm((f) => ({ ...f, waterAccess: "good" }))
                                            }
                                            icon={<Droplets className="w-4 h-4 text-blue-500" />}
                                        />
                                        <SelectCard
                                            label="Ограниченный"
                                            description="Иногда не хватает воды"
                                            selected={form.waterAccess === "limited"}
                                            onClick={() =>
                                                setForm((f) => ({ ...f, waterAccess: "limited" }))
                                            }
                                            icon={<Droplets className="w-4 h-4 text-amber-500" />}
                                        />
                                        <SelectCard
                                            label="Очень мало"
                                            description="Серьёзный дефицит, вода — редкость"
                                            selected={form.waterAccess === "scarce"}
                                            onClick={() =>
                                                setForm((f) => ({ ...f, waterAccess: "scarce" }))
                                            }
                                            icon={<Droplets className="w-4 h-4 text-red-400" />}
                                        />
                                    </div>
                                </FormField>

                                {/* Орошение */}
                                <FormField label="4. Способ орошения">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <SelectCard
                                            label="Капельное орошение"
                                            description="Трубки или капельницы к каждому растению"
                                            selected={form.irrigationType === "drip"}
                                            onClick={() =>
                                                setForm((f) => ({ ...f, irrigationType: "drip" }))
                                            }
                                            icon="💧"
                                        />
                                        <SelectCard
                                            label="Традиционный полив"
                                            description="Борозды, шланг или арык"
                                            selected={form.irrigationType === "traditional"}
                                            onClick={() =>
                                                setForm((f) => ({
                                                    ...f,
                                                    irrigationType: "traditional",
                                                }))
                                            }
                                            icon="🌊"
                                        />
                                    </div>
                                </FormField>

                                {/* Бюджет */}
                                <FormField label="5. Примерный бюджет на сезон (в сомах)">
                                    <div className="flex items-center gap-3 max-w-xs">
                                        <div className="relative flex-1">
                                            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="number"
                                                min="1000"
                                                step="1000"
                                                placeholder="напр. 50000"
                                                value={form.budgetInput}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        budgetInput: e.target.value,
                                                    }))
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground">сом</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Сюда входят: семена, удобрения, вода, трудозатраты.
                                    </p>
                                </FormField>

                                {/* Цель */}
                                <FormField label="6. Ваша цель на этот сезон">
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        {GOALS.map((g) => (
                                            <SelectCard
                                                key={g.value}
                                                label={g.label}
                                                selected={form.goal === g.value}
                                                onClick={() =>
                                                    setForm((f) => ({ ...f, goal: g.value }))
                                                }
                                                icon={<Target className="w-4 h-4" />}
                                            />
                                        ))}
                                    </div>
                                </FormField>

                                {error && (
                                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                                        <p className="text-sm text-red-700 dark:text-red-400">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                <Button
                                    onClick={handleSubmit}
                                    size="lg"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-base rounded-xl gap-2"
                                >
                                    Получить рекомендации
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Подсказка */}
                            <div className="bg-muted/40 rounded-2xl p-5 flex gap-4 items-start">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg shrink-0">
                                    <Lightbulb className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm mb-1">Как это работает?</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        AI-консультант анализирует ваш регион, доступные ресурсы и
                                        цели — и выдаёт конкретный план: какие культуры посадить,
                                        как поливать и сколько примерно можно заработать. Всё
                                        адаптировано под условия Кыргызстана без лишней теории.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
