// AgroFarm AI Consultant Engine
// Специализирован для фермеров Кыргызстана

export type Region =
    | "Чуй"
    | "Ош"
    | "Джалал-Абад"
    | "Баткен"
    | "Нарын"
    | "Иссык-Куль"
    | "Талас";

export type WaterAccess = "good" | "limited" | "scarce";
export type IrrigationType = "drip" | "traditional";
export type Goal = "max_profit" | "stable" | "min_risk";

export interface FarmerInput {
    region: Region;
    areaHectares: number;
    crop?: string;
    waterAccess: WaterAccess;
    irrigationType: IrrigationType;
    budgetSom: number;
    goal: Goal;
}

export interface CropRecommendation {
    name: string;
    nameRu: string;
    reason: string;
    yieldPerHa: { min: number; max: number }; // кг/га
    pricePerKg: { min: number; max: number }; // сом/кг
    droughtTolerance: "high" | "medium" | "low";
    maturityDays: number;
}

export interface WaterPlan {
    frequency: string;
    amount: string;
    timing: string;
    mulchingTip: string;
    additionalTips: string[];
}

export interface EconomicScenario {
    seedCostPerHa: number;
    fertilizerCostPerHa: number;
    waterCostPerHa: number;
    laborCostPerHa: number;
    totalCostPerHa: number;
    estimatedYieldKg: number;
    estimatedRevenue: { min: number; max: number };
    estimatedProfit: { min: number; max: number };
    disclaimer: string;
}

export interface AgroAdvice {
    situation: string;
    risks: string[];
    recommendedCrops: CropRecommendation[];
    waterPlan: WaterPlan;
    economics: EconomicScenario;
    practicalSteps: string[];
}

// ── Региональные данные ──────────────────────────────────────────────────────

const REGION_DATA: Record<
    Region,
    {
        climate: string;
        altitude: string;
        avgRainfall: number; // мм/год
        growingSeason: string;
        mainRisks: string[];
    }
> = {
    Чуй: {
        climate: "умеренно-континентальный, плодородная долина",
        altitude: "700–900 м",
        avgRainfall: 400,
        growingSeason: "апрель–октябрь",
        mainRisks: [
            "весенние заморозки",
            "летняя засуха в июле–августе",
            "дефицит поливной воды из канала",
        ],
    },
    Ош: {
        climate: "жаркий и засушливый, Ферганская долина",
        altitude: "900–1000 м",
        avgRainfall: 250,
        growingSeason: "март–ноябрь",
        mainRisks: [
            "сильная летняя жара (до +40°C)",
            "острый дефицит воды в июле–августе",
            "засоление почвы",
        ],
    },
    "Джалал-Абад": {
        climate: "тёплый, субтропические черты",
        altitude: "800–1200 м",
        avgRainfall: 300,
        growingSeason: "март–ноябрь",
        mainRisks: [
            "нерегулярность осадков",
            "перебои с электроснабжением",
            "ограниченный доступ к воде в пиковый сезон",
        ],
    },
    Баткен: {
        climate: "очень жаркий и засушливый",
        altitude: "600–900 м",
        avgRainfall: 180,
        growingSeason: "март–ноябрь",
        mainRisks: [
            "критический дефицит воды",
            "самый низкий уровень осадков в стране",
            "деградация почвы",
        ],
    },
    Нарын: {
        climate: "высокогорный, суровый",
        altitude: "2000–2500 м",
        avgRainfall: 250,
        growingSeason: "июнь–сентябрь",
        mainRisks: [
            "короткий вегетационный период (3–4 мес.)",
            "поздние весенние заморозки до июня",
            "суровые зимы",
        ],
    },
    "Иссык-Куль": {
        climate: "мягкий, озёрный микроклимат",
        altitude: "1600–1800 м",
        avgRainfall: 350,
        growingSeason: "май–октябрь",
        mainRisks: [
            "весенние заморозки",
            "летние ветры с озера",
            "ограниченный тёплый период",
        ],
    },
    Талас: {
        climate: "умеренный, долинный",
        altitude: "1200–1500 м",
        avgRainfall: 380,
        growingSeason: "апрель–октябрь",
        mainRisks: [
            "ночные заморозки весной",
            "нестабильное орошение",
            "удалённость от рынков сбыта",
        ],
    },
};

// ── База культур ─────────────────────────────────────────────────────────────

const CROP_DATABASE: Record<string, CropRecommendation> = {
    tomato: {
        name: "tomato",
        nameRu: "Томат",
        reason:
            "Высокорентабельная культура, хорошо продаётся на местных рынках. Раннеспелые сорта дают урожай за 90–110 дней. При капельном поливе экономит до 40% воды.",
        yieldPerHa: { min: 20000, max: 40000 },
        pricePerKg: { min: 25, max: 60 },
        droughtTolerance: "medium",
        maturityDays: 100,
    },
    onion: {
        name: "onion",
        nameRu: "Лук репчатый",
        reason:
            "Стабильный спрос, хорошо хранится, подходит для экспорта. Засухоустойчив на финальном этапе. Сравнительно дёшев в производстве.",
        yieldPerHa: { min: 15000, max: 30000 },
        pricePerKg: { min: 15, max: 35 },
        droughtTolerance: "high",
        maturityDays: 120,
    },
    wheat: {
        name: "wheat",
        nameRu: "Пшеница (озимая)",
        reason:
            "Стабильная культура с минимальными рисками, не требует много воды. Идеальна для фермеров с целью минимальных рисков — потребляет осадки и требует полива только 3–4 раза за сезон.",
        yieldPerHa: { min: 2500, max: 5000 },
        pricePerKg: { min: 20, max: 30 },
        droughtTolerance: "high",
        maturityDays: 260,
    },
    potato: {
        name: "potato",
        nameRu: "Картофель",
        reason:
            "Высокий спрос и урожайность. Хорошо растёт в прохладном климате Нарына и Иссык-Куля. Ранние сорта созревают за 60–70 дней.",
        yieldPerHa: { min: 15000, max: 28000 },
        pricePerKg: { min: 20, max: 45 },
        droughtTolerance: "medium",
        maturityDays: 90,
    },
    corn: {
        name: "corn",
        nameRu: "Кукуруза",
        reason:
            "Засухоустойчива в среднем, даёт хорошую биомассу для корма скота. Востребована на юге страны. Нетребовательна к уходу.",
        yieldPerHa: { min: 4000, max: 9000 },
        pricePerKg: { min: 18, max: 28 },
        droughtTolerance: "medium",
        maturityDays: 110,
    },
    sorghum: {
        name: "sorghum",
        nameRu: "Сорго",
        reason:
            "Очень высокая засухоустойчивость, идеально для Баткена и Оша. Корневая система уходит вглубь, меньше зависит от полива. Используется как корм и зерно.",
        yieldPerHa: { min: 3000, max: 7000 },
        pricePerKg: { min: 15, max: 22 },
        droughtTolerance: "high",
        maturityDays: 100,
    },
    sunflower: {
        name: "sunflower",
        nameRu: "Подсолнечник",
        reason:
            "Засухоустойчив, невысокие требования к поливу, стабильный рынок масличного сырья. Подходит для ограниченного полива.",
        yieldPerHa: { min: 1500, max: 2800 },
        pricePerKg: { min: 35, max: 55 },
        droughtTolerance: "high",
        maturityDays: 110,
    },
    pepper: {
        name: "pepper",
        nameRu: "Перец болгарский",
        reason:
            "Высокая рентабельность, востребован в Ошской и Джалал-Абадской областях. При капельном поливе даёт отличный результат.",
        yieldPerHa: { min: 18000, max: 35000 },
        pricePerKg: { min: 40, max: 90 },
        droughtTolerance: "medium",
        maturityDays: 120,
    },
};

// ── Логика выбора культур ────────────────────────────────────────────────────

function selectCrops(input: FarmerInput): CropRecommendation[] {
    const { region, waterAccess, goal } = input;

    // Культуры для каждого региона (основной список)
    const regionCropMap: Record<Region, string[]> = {
        Чуй: ["tomato", "onion", "corn", "wheat", "pepper"],
        Ош: ["onion", "pepper", "sorghum", "tomato", "corn"],
        "Джалал-Абад": ["pepper", "tomato", "corn", "onion", "sunflower"],
        Баткен: ["sorghum", "onion", "sunflower", "wheat"],
        Нарын: ["potato", "wheat", "onion"],
        "Иссык-Куль": ["potato", "wheat", "onion", "sunflower"],
        Талас: ["wheat", "potato", "onion", "corn"],
    };

    let candidates = regionCropMap[region] || ["wheat", "onion"];

    // Фильтрация по доступу к воде
    if (waterAccess === "scarce") {
        candidates = candidates.filter(
            (c) =>
                CROP_DATABASE[c]?.droughtTolerance === "high" ||
                CROP_DATABASE[c]?.droughtTolerance === "medium"
        );
        // При критическом дефиците – только высокозасухоустойчивые
        const highTolerance = candidates.filter(
            (c) => CROP_DATABASE[c]?.droughtTolerance === "high"
        );
        if (highTolerance.length > 0) candidates = highTolerance;
    } else if (waterAccess === "limited") {
        candidates = candidates.filter(
            (c) => CROP_DATABASE[c]?.droughtTolerance !== "low"
        );
    }

    // Сортировка по цели
    if (goal === "max_profit") {
        candidates.sort((a, b) => {
            const aRev =
                (CROP_DATABASE[a].yieldPerHa.max * CROP_DATABASE[a].pricePerKg.max) /
                1000;
            const bRev =
                (CROP_DATABASE[b].yieldPerHa.max * CROP_DATABASE[b].pricePerKg.max) /
                1000;
            return bRev - aRev;
        });
    } else if (goal === "min_risk") {
        candidates.sort((a, b) => {
            const toleranceScore = { high: 3, medium: 2, low: 1 };
            return (
                toleranceScore[CROP_DATABASE[b]?.droughtTolerance || "low"] -
                toleranceScore[CROP_DATABASE[a]?.droughtTolerance || "low"]
            );
        });
    }

    // Вернуть 2 лучших варианта
    return candidates
        .slice(0, 2)
        .map((c) => CROP_DATABASE[c])
        .filter(Boolean);
}

// ── Логика плана полива ──────────────────────────────────────────────────────

function buildWaterPlan(input: FarmerInput, crop: CropRecommendation): WaterPlan {
    const { waterAccess, irrigationType } = input;

    let frequency = "";
    let amount = "";
    const additionalTips: string[] = [];

    if (irrigationType === "drip") {
        frequency = "ежедневно или через день";
        amount = "2–4 литра на растение в сутки (в период плодоношения больше)";
        additionalTips.push(
            "Капельный полив экономит до 40–50% воды — вы уже делаете всё правильно."
        );
        additionalTips.push(
            "Проверяйте капельницы раз в неделю: забитые капельницы снижают урожай."
        );
    } else {
        if (waterAccess === "good") {
            frequency = "2–3 раза в неделю";
            amount = "30–40 мм на полив (примерно 300–400 литров на 1 сотку)";
        } else if (waterAccess === "limited") {
            frequency = "1–2 раза в неделю";
            amount = "40–50 мм на полив медленно по бороздам";
            additionalTips.push(
                "Поливайте реже, но глубже — корни уходят вглубь и растение лучше переносит засуху."
            );
        } else {
            frequency = "раз в 10–14 дней в жару, раз в 2–3 недели в прохладу";
            amount = "50–60 мм за раз, медленно, у основания растения";
            additionalTips.push(
                "При остром дефиците воды — поливайте только в критические фазы: всходы, цветение, налив плода."
            );
        }
    }

    const timing = "рано утром (6:00–9:00) или вечером (18:00–20:00)";

    const mulchingTip =
        "Замульчируйте почву соломой или сухой травой (слой 5–8 см) — это сохранит влагу в 1,5–2 раза дольше и снизит потребность в поливе.";

    additionalTips.push(
        `В жаркий период (июль–август) добавьте дополнительный полив перед ${crop.nameRu === "Томат" || crop.nameRu === "Перец болгарский" ? "цветением и завязью плодов" : "налив зерна/клубней"}.`
    );
    additionalTips.push(
        "Никогда не поливайте в середине дня — вода испаряется до 60% и может обжечь листья."
    );

    return {
        frequency,
        amount,
        timing,
        mulchingTip,
        additionalTips,
    };
}

// ── Экономический сценарий ───────────────────────────────────────────────────

function buildEconomics(
    input: FarmerInput,
    crop: CropRecommendation
): EconomicScenario {
    const ha = input.areaHectares;

    // Базовые статьи затрат на гектар (в сомах, примерные рыночные цены Кыргызстана)
    const seedCostPerHa = crop.name === "wheat" ? 6000 : crop.name === "potato" ? 35000 : 8000;
    const fertilizerCostPerHa = 15000;
    const waterCostPerHa =
        input.irrigationType === "drip"
            ? 8000
            : input.waterAccess === "good"
                ? 12000
                : input.waterAccess === "limited"
                    ? 8000
                    : 5000;
    const laborCostPerHa = crop.name === "tomato" || crop.name === "pepper" ? 25000 : 12000;

    const totalCostPerHa =
        seedCostPerHa + fertilizerCostPerHa + waterCostPerHa + laborCostPerHa;

    // Снижение урожая при нехватке воды
    const yieldMultiplier =
        input.waterAccess === "good"
            ? 1.0
            : input.waterAccess === "limited"
                ? 0.75
                : 0.55;

    const estimatedYieldKg =
        Math.round(
            ((crop.yieldPerHa.min + crop.yieldPerHa.max) / 2) * yieldMultiplier * ha
        );

    const minRevenue = Math.round(estimatedYieldKg * crop.pricePerKg.min * 0.85);
    const maxRevenue = Math.round(estimatedYieldKg * crop.pricePerKg.max * 0.85);

    const minProfit = minRevenue - Math.round(totalCostPerHa * ha);
    const maxProfit = maxRevenue - Math.round(totalCostPerHa * ha);

    return {
        seedCostPerHa,
        fertilizerCostPerHa,
        waterCostPerHa,
        laborCostPerHa,
        totalCostPerHa,
        estimatedYieldKg,
        estimatedRevenue: { min: minRevenue, max: maxRevenue },
        estimatedProfit: { min: minProfit, max: maxProfit },
        disclaimer:
            "⚠️ Это приблизительный расчёт. Реальные цифры зависят от рыночных цен, погоды, качества ухода и сорта. Не является гарантией дохода.",
    };
}

// ── Практические советы ──────────────────────────────────────────────────────

function buildPracticalSteps(
    input: FarmerInput,
    crop: CropRecommendation
): string[] {
    const steps: string[] = [];

    // Совет по сортам
    steps.push(
        `Выберите раннеспелый сорт ${crop.nameRu}: он созревает за ${Math.round(crop.maturityDays * 0.85)}–${crop.maturityDays} дней — успеет до жары или заморозков.`
    );

    // Мульчирование
    if (input.waterAccess !== "good") {
        steps.push(
            "Замульчируйте грядки соломой или скошенной травой сразу после посадки — бесплатный способ сохранить влагу в почве."
        );
    }

    // Удобрения
    steps.push(
        "Внесите навоз или компост (если есть) под вспашку осенью или весной — это заменит дорогие минеральные удобрения и улучшит структуру почвы."
    );

    // Полив
    if (input.irrigationType === "traditional" && input.waterAccess !== "good") {
        steps.push(
            "Полейте по бороздам, а не сплошным затоплением — так вода доходит прямо к корням, а не испаряется с поверхности."
        );
    }

    // Севооборот
    steps.push(
        `Не сажайте ${crop.nameRu} на одном месте несколько лет подряд: меняйте с луком или зерновыми — это снизит болезни без химии.`
    );

    // Густота посадки
    if (crop.name === "tomato" || crop.name === "pepper") {
        steps.push(
            "Не загущайте посадку — 40–50 см между растениями обеспечивает вентиляцию и снижает риск болезней."
        );
    }

    // Специальный совет для региона
    const region = input.region;
    if (region === "Нарын" || region === "Иссык-Куль") {
        steps.push(
            "В вашем регионе короткое лето — используйте рассаду вместо посева семян в открытый грунт. Это даст 3–4 недели форы."
        );
    }
    if (region === "Баткен" || region === "Ош") {
        steps.push(
            "В жаркие месяцы накрывайте молодые растения агроволокном или притеняющей сеткой в полдень — снизит стресс от жары."
        );
    }

    return steps.slice(0, 5);
}

// ── Главная функция анализа ──────────────────────────────────────────────────

export function analyzeAndAdvise(input: FarmerInput): AgroAdvice {
    const regionData = REGION_DATA[input.region];
    const recommendedCrops = selectCrops(input);
    const primaryCrop = recommendedCrops[0];

    const situation = `Вы работаете в ${input.region}ской области (${regionData.altitude} над уровнем моря, ${regionData.climate}). Вегетационный сезон: ${regionData.growingSeason}. Участок: ${input.areaHectares} га. Доступ к воде: ${input.waterAccess === "good" ? "хороший" : input.waterAccess === "limited" ? "ограниченный" : "очень мало"}. Система полива: ${input.irrigationType === "drip" ? "капельное орошение" : "традиционный полив"}.`;

    const risks = [...regionData.mainRisks];
    if (input.budgetSom < 30000 * input.areaHectares) {
        risks.push("Бюджет ниже среднего — рискуете не покрыть все затраты при неурожае");
    }
    if (input.irrigationType === "traditional" && input.waterAccess === "scarce") {
        risks.push("Традиционный полив при дефиците воды — высокий риск потери урожая");
    }

    const waterPlan = buildWaterPlan(input, primaryCrop);
    const economics = buildEconomics(input, primaryCrop);
    const practicalSteps = buildPracticalSteps(input, primaryCrop);

    return {
        situation,
        risks,
        recommendedCrops,
        waterPlan,
        economics,
        practicalSteps,
    };
}

// ── Парсинг региона из текста ─────────────────────────────────────────────────

export function parseRegionFromText(text: string): Region | null {
    const lower = text.toLowerCase();
    if (lower.includes("чуй") || lower.includes("бишкек")) return "Чуй";
    if (lower.includes("ош")) return "Ош";
    if (lower.includes("джалал") || lower.includes("жалал")) return "Джалал-Абад";
    if (lower.includes("баткен")) return "Баткен";
    if (lower.includes("нарын")) return "Нарын";
    if (lower.includes("иссык") || lower.includes("каракол")) return "Иссык-Куль";
    if (lower.includes("талас")) return "Талас";
    return null;
}

export const REGIONS: Region[] = [
    "Чуй",
    "Ош",
    "Джалал-Абад",
    "Баткен",
    "Нарын",
    "Иссык-Куль",
    "Талас",
];

export const GOALS: { value: Goal; label: string }[] = [
    { value: "max_profit", label: "Максимум прибыли" },
    { value: "stable", label: "Стабильный средний доход" },
    { value: "min_risk", label: "Минимальные риски" },
];
