import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout, User, Send, RotateCcw } from "lucide-react";
import {
    analyzeAndAdvise,
    parseRegionFromText,
    FarmerInput,
    Region,
    WaterAccess,
    IrrigationType,
    Goal,
} from "@/lib/agroEngine";

// ── Типы ─────────────────────────────────────────────────────────────────────

type MessageRole = "ai" | "user";

interface ChatMessage {
    id: string;
    role: MessageRole;
    text: string;
    isTyping?: boolean;
}

type ConvStep =
    | "greeting"
    | "ask_region"
    | "ask_area"
    | "ask_water"
    | "ask_irrigation"
    | "ask_budget"
    | "ask_goal"
    | "show_advice"
    | "followup";

interface ConvState {
    step: ConvStep;
    region?: Region;
    areaHa?: number;
    waterAccess?: WaterAccess;
    irrigationType?: IrrigationType;
    budgetSom?: number;
    goal?: Goal;
}

// ── Шаги диалога ─────────────────────────────────────────────────────────────

const GREETING = `Привет! Я ИИ-консультант AgroFarm 🌱

Я помогу тебе:
• выбрать подходящие культуры для участка
• прикинуть план полива с экономией воды
• грубо оценить расходы и возможный доход

Начнём! Первый вопрос:
**1) В каком ты регионе?** (Например: Чуйская, Ошская, Нарынская, Иссык-Кульская, Джалал-Абадская, Баткенская, Таласская область)`;

const QUESTIONS: Record<ConvStep, string> = {
    greeting: GREETING,
    ask_region: GREETING,
    ask_area:
        "Понял! **2) Какая у тебя площадь участка?**\n_(Напиши в сотках или гектарах — например: «20 соток» или «0.5 га»)_",
    ask_water:
        "**3) Как у тебя с доступом к поливной воде?**\n\nОтветь одним словом или выбери:\n• **хороший** — вода есть без ограничений\n• **ограниченный** — иногда не хватает\n• **почти нет** — серьёзный дефицит",
    ask_irrigation:
        "**4) Как ты поливаешь?**\n\n• **капельное** — трубки/капельницы к каждому растению\n• **обычный** — борозды, шланг, арык",
    ask_budget:
        "**5) Примерный бюджет на сезон?**\n_(Напиши цифру в сомах, например: «30 000» или «50 тыс»)_",
    ask_goal:
        "**6) Какая цель на этот сезон?**\n\n• **максимум прибыли** — хочу заработать как можно больше\n• **стабильный** — надёжный средний доход, без рисков\n• **минимум рисков** — главное не уйти в минус",
    show_advice: "",
    followup:
        "Есть ещё вопросы? Можешь спросить что-то конкретное — о поливе, выборе сорта, удобрениях или чём-то другом. Или напиши **«заново»**, чтобы начать новый расчёт.",
};

// ── Парсинг ответов пользователя ──────────────────────────────────────────────

function parseArea(text: string): number | null {
    const lower = text.toLowerCase().replace(/\s/g, "");
    // проверяем гектары
    const haMatch = lower.match(/([\d.,]+)\s*га/);
    if (haMatch) return parseFloat(haMatch[1].replace(",", "."));
    // соткимatch
    const sotkiMatch = lower.match(/([\d.,]+)\s*(соток?|сотк)/);
    if (sotkiMatch) return parseFloat(sotkiMatch[1].replace(",", ".")) / 100;
    // просто число — считаем что сотки если маленькое, гектары если большое
    const numMatch = lower.match(/^([\d.,]+)$/);
    if (numMatch) {
        const n = parseFloat(numMatch[1].replace(",", "."));
        return n < 20 ? n : n / 100; // если > 20 — скорее всего сотки
    }
    return null;
}

function parseWater(text: string): WaterAccess | null {
    const lower = text.toLowerCase();
    if (lower.includes("хорош") || lower.includes("отлич") || lower.includes("много") || lower.includes("есть")) return "good";
    if (
        lower.includes("огранич") ||
        lower.includes("иногда") ||
        lower.includes("мало") ||
        lower.includes("немного")
    )
        return "limited";
    if (
        lower.includes("почти нет") ||
        lower.includes("нет") ||
        lower.includes("дефицит") ||
        lower.includes("критич") ||
        lower.includes("очень мало") ||
        lower.includes("мало")
    )
        return "scarce";
    return null;
}

function parseIrrigation(text: string): IrrigationType | null {
    const lower = text.toLowerCase();
    if (lower.includes("капельн") || lower.includes("капли") || lower.includes("трубк")) return "drip";
    if (
        lower.includes("обычн") ||
        lower.includes("арык") ||
        lower.includes("борозд") ||
        lower.includes("шланг") ||
        lower.includes("традиц") ||
        lower.includes("нет") ||
        lower.includes("обычно")
    )
        return "traditional";
    return null;
}

function parseBudget(text: string): number | null {
    const clean = text.toLowerCase().replace(/\s/g, "");
    // «50тыс», «50000», «50к»
    const milMatch = clean.match(/([\d.,]+)\s*млн/);
    if (milMatch) return parseFloat(milMatch[1].replace(",", ".")) * 1_000_000;
    const tysMatch = clean.match(/([\d.,]+)\s*(тыс|т|k|к)/);
    if (tysMatch) return parseFloat(tysMatch[1].replace(",", ".")) * 1000;
    const numMatch = clean.match(/([\d.,]+)/);
    if (numMatch) return parseFloat(numMatch[1].replace(",", "."));
    return null;
}

function parseGoal(text: string): Goal | null {
    const lower = text.toLowerCase();
    if (
        lower.includes("максимум") ||
        lower.includes("прибыл") ||
        lower.includes("зараб") ||
        lower.includes("больше") ||
        lower.includes("макс")
    )
        return "max_profit";
    if (
        lower.includes("стабил") ||
        lower.includes("средн") ||
        lower.includes("надёжн") ||
        lower.includes("надежн")
    )
        return "stable";
    if (
        lower.includes("риск") ||
        lower.includes("минимум") ||
        lower.includes("безопасн") ||
        lower.includes("мин")
    )
        return "min_risk";
    return null;
}

// ── Форматирование совета ─────────────────────────────────────────────────────

function formatAdviceAsChat(input: FarmerInput): string {
    const advice = analyzeAndAdvise(input);
    const primary = advice.recommendedCrops[0];
    const secondary = advice.recommendedCrops[1];

    const profitMin = Math.round(advice.economics.estimatedProfit.min / 1000);
    const profitMax = Math.round(advice.economics.estimatedProfit.max / 1000);
    const costTotal = Math.round(
        (advice.economics.totalCostPerHa * input.areaHectares) / 1000
    );
    const yieldKg = advice.economics.estimatedYieldKg;
    const yieldStr = yieldKg >= 1000 ? `${(yieldKg / 1000).toFixed(1)} т` : `${yieldKg} кг`;

    const waterIcon =
        input.waterAccess === "good" ? "💧💧💧" : input.waterAccess === "limited" ? "💧💧" : "💧";

    return `Отлично, у меня есть всё что нужно! Вот твой план:

---

**📍 Ситуация**
${advice.situation}

**⚠️ Основные риски:**
${advice.risks.map((r) => `• ${r}`).join("\n")}

---

**🌾 Рекомендую посадить:**

**1. ${primary.nameRu}** ← основная культура
${primary.reason}
_Созревает за ${primary.maturityDays} дней._

${secondary ? `**2. ${secondary.nameRu}** ← альтернатива\n${secondary.reason}\n_Созревает за ${secondary.maturityDays} дней._` : ""}

---

**${waterIcon} План полива**
• **Как часто:** ${advice.waterPlan.frequency}
• **Сколько:** ${advice.waterPlan.amount}
• **Когда:** ${advice.waterPlan.timing}
• 🌾 **Мульчирование:** ${advice.waterPlan.mulchingTip}

${advice.waterPlan.additionalTips.map((t) => `• ${t}`).join("\n")}

---

**💰 Примерная экономика (на ${input.areaHectares} га)**
• Затраты: ~${costTotal} тыс сом
• Ожидаемый урожай: ~${yieldStr}
• **Прибыль: ${profitMin >= 0 ? "+" : ""}${profitMin} → ${profitMax >= 0 ? "+" : ""}${profitMax} тыс сом**

⚠️ _Это грубая оценка. Реальные цифры зависят от цен, погоды и uhода._

---

**✅ Практические шаги уже сейчас:**
${advice.practicalSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

---

Есть вопросы по рекомендациям? Спрашивай! 👇`;
}

// ── Followup-ответы для частых вопросов ──────────────────────────────────────

function getFollowupResponse(text: string, state: ConvState): string {
    const lower = text.toLowerCase();
    if (lower.includes("полив") || lower.includes("вод")) {
        return `По поводу полива:\n\n• Лучшее время — **ранним утром (6–9 ч)** или **вечером (18–20 ч)**. В полдень вода испаряется на 50–60%.\n• При нехватке воды — поливайте реже, но глубже: корни уйдут вглубь.\n• **Мульча из соломы** (5–8 см) сохраняет влагу в 1.5–2 раза дольше — бесплатный способ экономии.\n• Самые критичные фазы для полива: всходы, цветение, налив плода — в эти периоды воды не жалейте.`;
    }
    if (lower.includes("удобр") || lower.includes("навоз") || lower.includes("компост")) {
        return `По удобрениям:\n\n• **Навоз или компост** — лучший бюджетный вариант. Вносят осенью под вспашку или весной.\n• Если есть деньги: **карбамид (мочевина)** — дешевле, чем большинство удобрений, хорош для листовой подкормки.\n• Не перебарщивайте с азотом (N) — даёт много листвы, но плоды мельчают.\n• Для томатов и перца важен **калий и фосфор** — ищите "суперфосфат" или "монофосфат калия".`;
    }
    if (lower.includes("сорт") || lower.includes("семен")) {
        return `По выбору сортов:\n\n• Всегда берите **раннеспелые или среднеспелые** сорта — они успевают дать урожай до жары или заморозков.\n• Покупайте семена у **местных поставщиков** в Бишкеке или областном центре — они адаптированы к климату.\n• Проверенные бренды в КР: Seminis, Nunhems, либо местная опытная станция.\n• При нехватке воды — ищите сорта с пометкой "засухоустойчивый" или "для орошаемых зон".`;
    }
    if (lower.includes("болезн") || lower.includes("вредит") || lower.includes("хим")) {
        return `По болезням и вредителям:\n\n• **Фитофтора** — главный враг томатов и картофеля. Профилактика: не загущайте посадку, поливайте у корня, не по листьям.\n• **Тля** — смыть мыльной водой, опрыскать настоем чеснока.\n• Химию применяйте только крайней необходимости и **строго по инструкции**.\n• Лучший метод — **севооборот**: не сажайте одну культуру на одном месте несколько лет.`;
    }
    if (lower.includes("заново") || lower.includes("ещё раз") || lower.includes("начать")) {
        return "RESET";
    }
    if (lower.includes("спасиб") || lower.includes("рахмат") || lower.includes("отлич")) {
        return `Рад помочь! 🌱 Удачного сезона и богатого урожая!\n\nЕсли появятся новые вопросы или захочешь пересчитать для другого участка — просто напиши **«заново»**.`;
    }
    return `Хороший вопрос! По теме "${text.slice(0, 40)}..." — рекомендую обратиться к местному агроному или в районное управление сельского хозяйства. Они дадут совет с учётом конкретных условий вашего участка.\n\nМогу ответить на вопросы по поливу, удобрениям, выбору сорта или болезням растений. Или напиши **«заново»**, чтобы получить совет для другого участка.`;
}

// ── Компонент ─────────────────────────────────────────────────────────────────

function formatText(text: string): React.ReactNode {
    // Минимальный markdown: **bold**, _italic_, ---
    const lines = text.split("\n");
    return lines.map((line, li) => {
        if (line === "---") {
            return <hr key={li} className="border-border my-2" />;
        }
        // Обработка inline: **bold** и _italic_
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let key = 0;
        while (remaining.length > 0) {
            const boldIdx = remaining.indexOf("**");
            const italicIdx = remaining.indexOf("_");
            if (boldIdx === -1 && italicIdx === -1) {
                parts.push(<span key={key++}>{remaining}</span>);
                break;
            }
            const firstIdx =
                boldIdx === -1
                    ? italicIdx
                    : italicIdx === -1
                        ? boldIdx
                        : Math.min(boldIdx, italicIdx);
            if (firstIdx > 0) {
                parts.push(<span key={key++}>{remaining.slice(0, firstIdx)}</span>);
                remaining = remaining.slice(firstIdx);
                continue;
            }
            if (remaining.startsWith("**")) {
                const closeIdx = remaining.indexOf("**", 2);
                if (closeIdx === -1) {
                    parts.push(<span key={key++}>{remaining}</span>);
                    break;
                }
                parts.push(
                    <strong key={key++} className="font-semibold">
                        {remaining.slice(2, closeIdx)}
                    </strong>
                );
                remaining = remaining.slice(closeIdx + 2);
            } else if (remaining.startsWith("_")) {
                const closeIdx = remaining.indexOf("_", 1);
                if (closeIdx === -1) {
                    parts.push(<span key={key++}>{remaining}</span>);
                    break;
                }
                parts.push(
                    <em key={key++} className="italic text-muted-foreground text-xs">
                        {remaining.slice(1, closeIdx)}
                    </em>
                );
                remaining = remaining.slice(closeIdx + 1);
            }
        }
        return (
            <p key={li} className={li > 0 ? "mt-1" : ""}>
                {parts}
            </p>
        );
    });
}

export function AgroConsultantChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [convState, setConvState] = useState<ConvState>({ step: "greeting" });
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Инициализация приветствия
    useEffect(() => {
        setIsTyping(true);
        setTimeout(() => {
            pushAI(GREETING);
            setConvState({ step: "ask_area" });
            setIsTyping(false);
        }, 600);
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const pushAI = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: "ai", text },
        ]);
    };

    const pushUser = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: (Date.now() + 1).toString(), role: "user", text },
        ]);
    };

    const delayedAI = (text: string, delay = 800) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            pushAI(text);
        }, delay);
    };

    const resetChat = () => {
        setMessages([]);
        setConvState({ step: "greeting" });
        setInputValue("");
        setIsTyping(true);
        setTimeout(() => {
            pushAI(GREETING);
            setConvState({ step: "ask_area" });
            setIsTyping(false);
        }, 600);
    };

    const handleSend = () => {
        const text = inputValue.trim();
        if (!text || isTyping) return;
        setInputValue("");
        pushUser(text);

        const state = convState;

        // Если в followup режиме
        if (state.step === "followup" || state.step === "show_advice") {
            const resp = getFollowupResponse(text, state);
            if (resp === "RESET") {
                resetChat();
                return;
            }
            delayedAI(resp);
            return;
        }

        // Шаг 1: регион
        if (state.step === "ask_area") {
            const region = parseRegionFromText(text);
            if (!region) {
                delayedAI(
                    `Не смог определить регион 🤔\nПожалуйста, укажи одно из:\n• Чуй / Бишкек\n• Ош\n• Джалал-Абад\n• Баткен\n• Нарын\n• Иссык-Куль / Каракол\n• Талас`
                );
                return;
            }
            setConvState((s) => ({ ...s, step: "ask_water", region }));
            delayedAI(
                `Понял, ${region}ская область! ${QUESTIONS["ask_area"]}`
            );
            return;
        }

        // Шаг 2: площадь
        if (state.step === "ask_water") {
            const area = parseArea(text);
            if (!area || area <= 0 || area > 500) {
                delayedAI(
                    `Не понял площадь 🤔\nНапиши, например:\n• «25 соток»\n• «0.5 га»\n• «1.2 га»\n• «100 соток»`
                );
                return;
            }
            setConvState((s) => ({ ...s, step: "ask_irrigation", areaHa: area }));
            delayedAI(
                `Записал — ${area < 1 ? Math.round(area * 100) + " соток" : area + " га"}. ${QUESTIONS["ask_water"]}`
            );
            return;
        }

        // Шаг 3: вода
        if (state.step === "ask_irrigation") {
            const water = parseWater(text);
            if (!water) {
                delayedAI(
                    `Напиши просто:\n• **хороший** — воды достаточно\n• **ограниченный** — иногда не хватает\n• **почти нет** — серьёзный дефицит`
                );
                return;
            }
            setConvState((s) => ({ ...s, step: "ask_budget", waterAccess: water }));
            const waterLabel =
                water === "good" ? "хороший" : water === "limited" ? "ограниченный" : "очень мало";
            delayedAI(
                `Понял, доступ к воде — ${waterLabel}. ${QUESTIONS["ask_irrigation"]}`
            );
            return;
        }

        // Шаг 4: тип орошения
        if (state.step === "ask_budget") {
            const irr = parseIrrigation(text);
            if (!irr) {
                delayedAI(
                    `Напиши:\n• **капельное** — если есть система капельниц\n• **обычный** — борозды, шланг, арык`
                );
                return;
            }
            setConvState((s) => ({ ...s, step: "ask_goal", irrigationType: irr }));
            const irrLabel = irr === "drip" ? "капельное орошение" : "обычный полив";
            delayedAI(`Записал — ${irrLabel}. ${QUESTIONS["ask_budget"]}`);
            return;
        }

        // Шаг 5: бюджет
        if (state.step === "ask_goal") {
            const budget = parseBudget(text);
            if (!budget || budget < 1000) {
                delayedAI(
                    `Не смог распознать сумму. Напиши, например:\n• «30000»\n• «50 тыс»\n• «100 000 сом»`
                );
                return;
            }
            setConvState((s) => ({ ...s, step: "show_advice", budgetSom: budget }));
            const budgetStr =
                budget >= 1000000
                    ? `${(budget / 1000000).toFixed(1)} млн сом`
                    : budget >= 1000
                        ? `${Math.round(budget / 1000)} тыс сом`
                        : `${budget} сом`;
            delayedAI(
                `Бюджет ~${budgetStr}. ${QUESTIONS["ask_goal"]}`
            );
            return;
        }

        // Шаг 6: цель → финальный анализ
        if (state.step === "show_advice") {
            const goal = parseGoal(text);
            if (!goal) {
                delayedAI(
                    `Напиши:\n• **максимум прибыли**\n• **стабильный**\n• **минимум рисков**`
                );
                return;
            }

            const finalState = { ...state, goal };
            setConvState({ ...finalState, step: "followup" });

            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                try {
                    const input: FarmerInput = {
                        region: finalState.region!,
                        areaHectares: finalState.areaHa!,
                        waterAccess: finalState.waterAccess!,
                        irrigationType: finalState.irrigationType!,
                        budgetSom: finalState.budgetSom!,
                        goal: goal,
                    };
                    const adviceText = formatAdviceAsChat(input);
                    pushAI(adviceText);
                    setTimeout(() => {
                        setIsTyping(true);
                        setTimeout(() => {
                            setIsTyping(false);
                            pushAI(QUESTIONS["followup"]);
                        }, 1000);
                    }, 1500);
                } catch {
                    pushAI(
                        "Что-то пошло не так при анализе 😔 Попробуй написать **«заново»** и пройти опрос ещё раз."
                    );
                }
            }, 1400);
            return;
        }
    };

    return (
        <div className="flex flex-col h-[580px]">
            {/* Шапка */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-5 py-4 flex items-center justify-between gap-3 rounded-t-lg">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm leading-tight">
                            AI-Агроконсультант
                        </h3>
                        <p className="text-emerald-200 text-xs">
                            {isTyping ? "печатает..." : "онлайн • бесплатно"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={resetChat}
                    title="Начать заново"
                    className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Сообщения */}
            <ScrollArea className="flex-1 border-x bg-muted/10">
                <div className="p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user"
                                        ? "bg-primary/20"
                                        : "bg-gradient-to-br from-emerald-500 to-teal-600"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    <User className="w-3.5 h-3.5 text-primary" />
                                ) : (
                                    <Sprout className="w-3.5 h-3.5 text-white" />
                                )}
                            </div>
                            <div
                                className={`rounded-2xl px-4 py-3 text-sm max-w-[82%] leading-relaxed shadow-sm ${msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : "bg-card border rounded-tl-sm"
                                    }`}
                            >
                                {msg.role === "ai" ? (
                                    <div className="space-y-0.5">{formatText(msg.text)}</div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Индикатор печати */}
                    {isTyping && (
                        <div className="flex gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 mt-1">
                                <Sprout className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="bg-card border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                <div className="flex gap-1 items-center h-4">
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Ввод */}
            <div className="p-3 border border-t-0 rounded-b-lg bg-background flex gap-2">
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={
                        isTyping ? "Подождите..." : "Напишите ответ..."
                    }
                    disabled={isTyping}
                    className="flex-1 bg-muted/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:opacity-50 border border-transparent focus:border-emerald-300/50 transition-all"
                />
                <Button
                    onClick={handleSend}
                    disabled={isTyping || !inputValue.trim()}
                    size="icon"
                    className="bg-emerald-600 hover:bg-emerald-700 rounded-xl shrink-0"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
