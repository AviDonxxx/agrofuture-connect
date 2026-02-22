import { useState } from "react";
import {
    User,
    Lightbulb,
    TrendingUp,
    Droplets,
    ChevronDown,
    ChevronUp,
    Star,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

// ── Тип кейса ─────────────────────────────────────────────────────────────────

interface FarmerCase {
    id: string;
    region: string;
    area: string;
    crop: string;
    farmerName: string;
    conditions: {
        region: string;
        area: string;
        water: string;
        crop: string;
        budget: string;
    };
    withoutAI: {
        decisions: string[];
        mistakes: string[];
        result: string;
    };
    withAI: {
        recommendedCrop: string;
        waterPlan: string;
        economics: string;
    };
    effect: {
        waterSaving: string;
        riskReduction: string;
        planning: string;
        estimatedExtraProfitSom: string;
    };
    tag: string;
    tagColor: string;
}

// ── Учебные кейсы ─────────────────────────────────────────────────────────────

const CASES: FarmerCase[] = [
    {
        id: "case_chuiy_tomato",
        region: "Чуйская область",
        area: "30 соток",
        crop: "Томат → Перец болгарский",
        farmerName: "Условный фермер из Чуя",
        tag: "Смена культуры",
        tagColor: "bg-blue-100 text-blue-700",
        conditions: {
            region: "Чуйская область, пригород Бишкека",
            area: "30 соток (0.3 га)",
            water: "Ограниченный доступ к поливной воде из канала",
            crop: "Рассматривал томаты, но сомневался",
            budget: "~45 000 сом",
        },
        withoutAI: {
            decisions: [
                "Посадил томаты, как делал последние 5 лет",
                "Поливал по привычке — каждый день понемногу в жару",
                "Не мульчировал, расходовал воду неэффективно",
                "Продавал урожай оптовику по низкой цене осенью",
            ],
            mistakes: [
                "Дневной полив в июле–августе — испарялось до 50% воды",
                "Перегруженный рынок томатов в Чуйской области → цена падала",
                "Не считал, что затраты на труд съедают большую часть прибыли",
            ],
            result:
                "Урожай ~5 тонн, продано по 28 сом/кг. Выручка ~140 тыс сом, затраты ~95 тыс сом. Прибыль — около 45 тыс сом за сезон.",
        },
        withAI: {
            recommendedCrop:
                "AI предложил перейти на **перец болгарский**: в Чуйской долине он менее конкурентен, чем томат, цена выше (45–80 сом/кг), а при капельном поливе даёт хорошую урожайность — 18–25 т/га.",
            waterPlan:
                "Полив 2–3 раза в неделю по бороздам, строго рано утром (6–9 ч). Мульча из соломы. На 30 сотках это сокращает расход воды примерно на 30–35%.",
            economics:
                "Затраты по схеме AI: ~55 тыс сом (чуть выше из-за семян перца). Ожидаемый урожай: ~5–7 т. При цене 50 сом/кг выручка 250–350 тыс сом → прибыль 190–290 тыс сом.",
        },
        effect: {
            waterSaving: "~30–35% экономии воды за счёт оптимизации режима полива",
            riskReduction:
                "Снижение риска демпинга: перец менее перегружен на рынке, чем томат в летний пик",
            planning:
                "Фермер видит примерные цифры до посева — может планировать расходы и не брать лишних долгов",
            estimatedExtraProfitSom:
                "Потенциально +100–200 тыс сом дополнительной прибыли по сравнению с прежней схемой",
        },
    },
    {
        id: "case_batken_sorghum",
        region: "Баткенская область",
        area: "1 га",
        crop: "Кукуруза → Сорго",
        farmerName: "Условный фермер из Баткена",
        tag: "Дефицит воды",
        tagColor: "bg-amber-100 text-amber-700",
        conditions: {
            region: "Баткенская область, самый засушливый регион КР",
            area: "1 гектар",
            water: "Очень мало — острый дефицит, вода из арыка 1 раз в 2 недели",
            crop: "Кукуруза, как и все соседи",
            budget: "~30 000 сом",
        },
        withoutAI: {
            decisions: [
                "Сажал кукурузу, потому что «все так делают»",
                "В засушливый июль–август кукуруза страдала от недостатка воды",
                "При нехватке поливного дня поливал не весь участок",
                "Урожай сильно зависел от погоды каждый год",
            ],
            mistakes: [
                "Кукуруза требует воды в критический период цветения — а именно тогда воды меньше всего",
                "При 1 поливе в 2 недели кукуруза в июле теряет до 40% потенциального урожая",
                "«Сосед сажает» — не лучший аргумент, у всех разный доступ к воде",
            ],
            result:
                "Урожай кукурузы ~3 т/га (при норме 5–7 т/га). Выручка ~60 тыс сом. Затраты ~45 тыс сом. Прибыль — около 15 тыс сом за сезон.",
        },
        withAI: {
            recommendedCrop:
                "AI рекомендовал **сорго**: в отличие от кукурузы, сорго переносит засуху в 2–3 раза лучше. Корни уходят на 1.5–2 м в глубину и берут остаточную влагу. Даже при 1 поливе в 10–14 дней сорго даёт 70–80% урожая.",
            waterPlan:
                "Полив 1 раз в 10–14 дней, 50–60 мм за раз (медленно, у борозд). Мульча обязательна. Критичные фазы: всходы + выметывание метёлки.",
            economics:
                "Затраты на сорго: ~28 тыс сом. Ожидаемый урожай: ~3.5–5 т/га. Сорго используется на корм скоту → рядом есть покупатели (животноводы). Цена 15–22 сом/кг → выручка 52–110 тыс сом → прибыль 24–82 тыс сом.",
        },
        effect: {
            waterSaving:
                "~40–45% экономии воды: сорго требует значительно меньше поливов, чем кукуруза",
            riskReduction:
                "Потеря урожая при пропуске полива: кукуруза −40%, сорго −10–15%. Снижение риска неурожая в засушливый год",
            planning:
                "Фермер может предсказуемо планировать корм для скота и договариваться с соседними животноводами заранее",
            estimatedExtraProfitSom:
                "Потенциально +10–60 тыс сом стабильнее, чем при кукурузе в засушливый год",
        },
    },
    {
        id: "case_naryn_potato",
        region: "Нарынская область",
        area: "20 соток",
        crop: "Картофель (поздний → ранний сорт)",
        farmerName: "Условный фермер из Нарына",
        tag: "Короткий сезон",
        tagColor: "bg-purple-100 text-purple-700",
        conditions: {
            region: "Нарынская область, высокогорье, 2100 м над уровнем моря",
            area: "20 соток (0.2 га)",
            water: "Хороший доступ — горный ручей рядом",
            crop: "Картофель. Сажает поздно — в июне. Убирает в сентябре.",
            budget: "~20 000 сом",
        },
        withoutAI: {
            decisions: [
                "Сажал картофель в начале июня, как привык",
                "Использовал поздний сорт «Синеглазка» — привычный",
                "Убирал в середине сентября, перед снегом",
                "Продавал всё сразу осенью, когда цены низкие",
            ],
            mistakes: [
                "В Нарыне сезон короткий — поздний сорт не успевает полностью созреть",
                "Заморозки могут прийти уже в конце августа на высоте 2100 м",
                "Посадка без рассады теряет 3–4 недели ценного времени",
                "Продажа осенью в пик предложения = 20–25 сом/кг",
            ],
            result:
                "Урожай ~2.5 т. Выручка ~55 тыс сом по 22 сом/кг. Затраты ~30 тыс сом. Прибыль ~25 тыс сом.",
        },
        withAI: {
            recommendedCrop:
                "AI рекомендовал ранний сорт картофеля (например, «Беллароза» или «Импала», срок 60–75 дней) и **посадку через рассаду в конце апреля в парнике**, а в открытый грунт — в начале июня. Так урожай готов уже в конце июля — начале августа.",
            waterPlan:
                "Полив 2 раза в неделю в период клубнеобразования (июль). В остальное время — 1 раз. Мульчирование сохраняет тепло почвы — особенно важно в прохладном Нарыне.",
            economics:
                "Затраты схожие: ~22 тыс сом. Ранний урожай (конец июля): цена 35–55 сом/кг. При 2–3 т выручка 70–165 тыс сом → прибыль 50–140 тыс сом.",
        },
        effect: {
            waterSaving:
                "Экономия воды ~15–20% — за счёт раннего сбора урожая мульчирование + меньше жарких дней",
            riskReduction:
                "Ранний сорт убран до заморозков — риск потери урожая снижается критически",
            planning:
                "Фермер продаёт ранний картофель по высокой цене в июле–августе, пока других нет",
            estimatedExtraProfitSom:
                "Потенциально +25–100 тыс сом за счёт ранних сроков и более высокой цены реализации",
        },
    },
];

// ── Карточка кейса ────────────────────────────────────────────────────────────

function CaseCard({ caseData }: { caseData: FarmerCase }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Шапка */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">{caseData.farmerName}</p>
                            <p className="text-xs text-muted-foreground">
                                {caseData.region} · {caseData.area}
                            </p>
                        </div>
                    </div>
                    <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${caseData.tagColor}`}
                    >
                        {caseData.tag}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Культура:</strong> {caseData.crop}
                </p>

                {/* Ключевые эффекты — сразу видны */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 flex items-start gap-2">
                        <Droplets className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-muted-foreground">Вода</p>
                            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                                {caseData.effect.waterSaving.split(":")[0]}
                            </p>
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3 flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-muted-foreground">Прибыль</p>
                            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                {caseData.effect.estimatedExtraProfitSom}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                    {open ? "Скрыть детали" : "Подробный разбор кейса"}
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* Детали */}
            {open && (
                <div className="border-t px-5 pb-5 space-y-5 pt-5 animate-fade-in">
                    {/* Условия */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Исходные условия
                        </p>
                        <div className="bg-muted/30 rounded-xl p-4 space-y-1.5 text-sm">
                            {Object.entries(caseData.conditions).map(([key, val]) => {
                                const labels: Record<string, string> = {
                                    region: "Регион",
                                    area: "Площадь",
                                    water: "Доступ к воде",
                                    crop: "Культура",
                                    budget: "Бюджет",
                                };
                                return (
                                    <div key={key} className="flex gap-2">
                                        <span className="text-muted-foreground shrink-0 w-28">
                                            {labels[key]}:
                                        </span>
                                        <span className="font-medium">{val}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Без AI */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Что делал фермер без AI
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="bg-muted/20 rounded-xl p-4">
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                    Типичные решения:
                                </p>
                                <ul className="space-y-1">
                                    {caseData.withoutAI.decisions.map((d, i) => (
                                        <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                                            <span className="shrink-0">•</span> {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 dark:bg-red-900/10 rounded-xl p-4">
                                <p className="text-xs font-medium text-red-600 mb-2">
                                    Ошибки:
                                </p>
                                <ul className="space-y-1">
                                    {caseData.withoutAI.mistakes.map((m, i) => (
                                        <li key={i} className="text-xs text-foreground/75 flex gap-1.5">
                                            <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 bg-muted/30 rounded-xl px-4 py-2.5">
                            <p className="text-xs"><strong>Результат без AI:</strong> {caseData.withoutAI.result}</p>
                        </div>
                    </div>

                    {/* С AI */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-emerald-500" />
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Что посоветовал AI-консультант AgroFarm
                            </p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: "🌾 Культура", text: caseData.withAI.recommendedCrop },
                                { label: "💧 Полив", text: caseData.withAI.waterPlan },
                                { label: "💰 Экономика", text: caseData.withAI.economics },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-700/20 rounded-xl px-4 py-3"
                                >
                                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-foreground/80 leading-relaxed">
                                        {item.text.replace(/\*\*/g, "")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Эффект */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 text-amber-500" />
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Условный эффект от AI
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {[
                                { icon: <Droplets className="w-4 h-4 text-blue-500" />, label: "Вода", val: caseData.effect.waterSaving },
                                { icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, label: "Риски", val: caseData.effect.riskReduction },
                                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, label: "Планирование", val: caseData.effect.planning },
                                { icon: <TrendingUp className="w-4 h-4 text-violet-500" />, label: "Прибыль", val: caseData.effect.estimatedExtraProfitSom },
                            ].map((item) => (
                                <div key={item.label} className="bg-muted/20 rounded-xl p-3 flex items-start gap-2">
                                    <div className="shrink-0 mt-0.5">{item.icon}</div>
                                    <div>
                                        <p className="text-xs font-semibold">{item.label}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-700/20 rounded-xl px-4 py-3">
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            ⚠️ Это учебный пример-иллюстрация. Цифры являются ориентировочными и не представляют реальный кейс конкретного фермера.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Главный компонент ─────────────────────────────────────────────────────────

export function AgroCaseStudies() {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-xl">Учебные кейсы AgroFarm</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Иллюстрации того, как AI-консультант помогает принимать лучшие решения.
                    Это учебные примеры — не реальные истории конкретных фермеров.
                </p>
            </div>

            <div className="space-y-4">
                {CASES.map((c) => (
                    <CaseCard key={c.id} caseData={c} />
                ))}
            </div>
        </div>
    );
}
