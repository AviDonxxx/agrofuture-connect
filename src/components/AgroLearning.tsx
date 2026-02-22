import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Lightbulb, AlertCircle, Globe, CheckCircle2 } from "lucide-react";

// ── Темы ──────────────────────────────────────────────────────────────────────

interface LessonTopic {
    id: string;
    label: string;
    icon: string;
    content: LessonContent;
}

interface LessonContent {
    title: string;
    intro: string[];           // 2–3 абзаца объяснения
    whyKG: string;             // Почему важно в КР
    tips: string[];            // 3–5 советов
    mistakes: { wrong: string; right: string }[]; // Ошибки
}

const LESSONS: LessonTopic[] = [
    {
        id: "water_saving",
        label: "Как экономить воду в овощеводстве",
        icon: "💧",
        content: {
            title: "Экономия воды в овощеводстве",
            intro: [
                "Вода — самый дорогой ресурс для фермера в Кыргызстане. Большинство потерь происходит не тогда, когда поле сухое, а когда фермер поливает слишком часто, в жару, или без контроля.",
                "Главный принцип экономии воды — это не «меньше поливать», а «поливать умнее». Растение берёт воду из почвы, а не с поверхности. Поэтому важно, чтобы вода дошла до корней, а не испарилась.",
                "Если вы сделаете всего три вещи — поливать утром или вечером, замульчировать почву и поливать реже но глубже — вы сэкономите до 35–40% воды без потери урожая.",
            ],
            whyKG:
                "В Кыргызстане большинство регионов получают 180–400 мм осадков в год — это мало для овощей. В Баткене, Оше и Джалал-Абаде в июле–августе воды из арыков часто не хватает даже для половины потребности. Перебои с электричеством делают насосный полив ненадёжным. Поэтому каждый литр воды нужно использовать с умом.",
            tips: [
                "Поливайте рано утром (6–9 ч) или вечером (18–20 ч). В полдень при +35°C до 60% воды испаряется раньше, чем доходит до корней.",
                "Замульчируйте грядки соломой, сухой травой или картоном между рядами (слой 5–8 см). Мульча сохраняет влагу в 1.5–2 раза дольше и снижает нужду в поливе.",
                "Поливайте у основания растения, а не по листьям. Листья не пьют воду — это делают корни.",
                "Поливайте редко, но обильно: лучше один раз в 5–7 дней залить 50 мм, чем каждый день поверхностно 10 мм. Глубокий полив = глубокие корни = устойчивость к засухе.",
                "Если есть возможность — хотя бы простое капельное орошение из пластиковых бутылок с дырочками у томатов сэкономит 30–40% воды.",
            ],
            mistakes: [
                { wrong: "Поливать каждый день понемногу", right: "Поливать реже, но глубоко — корни уходят вглубь" },
                { wrong: "Поливать в полдень на солнце", right: "Поливать утром до 9:00 или вечером после 18:00" },
                { wrong: "Поливать по листьям сверху", right: "Поливать у корня, по бороздам" },
                { wrong: "Не мульчировать почву", right: "Солома/трава слоем 5–8 см — бесплатная экономия воды" },
            ],
        },
    },
    {
        id: "drip_irrigation",
        label: "Что такое капельное орошение",
        icon: "🚿",
        content: {
            title: "Капельное орошение: что это и зачем",
            intro: [
                "Капельное орошение — это система труб или шлангов, по которым вода капает прямо к корням каждого растения. Вместо того чтобы заливать всё поле, вода идёт точно туда, где нужна.",
                "Самое главное преимущество: экономия воды на 40–60% по сравнению с традиционным поливом по бороздам. При этом урожайность обычно не снижается, а иногда даже растёт — потому что почва всегда в оптимальном состоянии, без пересыхания и переувлажнения.",
                "Вопреки распространённому мнению, простую капельную систему на 5–10 соток можно собрать из подручных материалов за несколько тысяч сомов. Не обязательно покупать дорогое оборудование.",
            ],
            whyKG:
                "В условиях острой нехватки воды в Баткене, Оше на юге страны капельное орошение может быть вопросом выживаемости хозяйства. Там, где традиционный полив требует 800–1000 м³ воды на сотку за сезон, капля потребует 400–500 м³. Это особенно важно при перебоях в подаче воды из арыков.",
            tips: [
                "Простейшая система: бак-накопитель 1–2 куб.м на возвышении + полиэтиленовые трубки + капельницы (стоят от 30 сом/штука). Вода течёт самотёком — электричество не нужно.",
                "Для томатов, перца и огурцов — идеально. Для зерновых (пшеница, кукуруза) капля нецелесообразна — они поливаются по бороздам.",
                "Проверяйте капельницы раз в неделю: они забиваются солями и частицами. Простая прочистка — игла или промывка водой под давлением.",
                "При капельном орошении удобрения можно добавлять прямо в воду (фертигация) — это в 2–3 раза эффективнее внесения в сухом виде.",
                "Начните с одной грядки томатов — это лучший способ попробовать систему без больших вложений.",
            ],
            mistakes: [
                { wrong: "Думать, что капля требует дорогого оборудования", right: "Простую систему можно собрать за 3–10 тыс сом" },
                { wrong: "Не проверять капельницы", right: "Еженедельный осмотр — 10 минут, которые спасают урожай" },
                { wrong: "Использовать каплю для зерновых", right: "Капля эффективна для овощей и бахчевых, не для зерна" },
                { wrong: "Ставить бак на уровне земли", right: "Бак должен быть выше поля на 1–2 м: создаёт давление без насоса" },
            ],
        },
    },
    {
        id: "potato_economics",
        label: "Картофель на 10 сотках: как не уйти в минус",
        icon: "🥔",
        content: {
            title: "Картофель на 10 сотках: экономика и практика",
            intro: [
                "Картофель — одна из самых популярных культур в Кыргызстане. В Нарыне, на Иссык-Куле и в Чуйской долине его сажает почти каждый фермер. Но многие не считают реальную экономику и удивляются, когда к концу сезона прибыль оказывается маленькой или нулевой.",
                "На 10 сотках при правильном уходе можно вырастить 2–3.5 тонны картофеля. При цене 25–40 сом/кг это 50 000–140 000 сом выручки. Но затраты тоже немаленькие: семенной картофель, удобрения, полив, окучивание и уборка.",
                "Главный способ уйти в плюс — правильный выбор сорта, своевременная посадка и грамотный полив. Половина фермеров теряет 20–30% урожая просто из-за несвоевременного полива в период клубнеобразования.",
            ],
            whyKG:
                "Картофель хорошо подходит для прохладного климата Нарына и Иссык-Куля. В Чуйской долине его выращивают массово, поэтому цена летом падает. Чтобы продать дороже — стремитесь к раннему урожаю (июль!) или ищите постоянного покупателя заранее.",
            tips: [
                "Берите семенной картофель районированных сортов: «Невский», «Инноватор», «Беллароза» хорошо себя зарекомендовали в Кыргызстане.",
                "Самая критичная фаза для полива — **цветение и налив клубней** (июль–август). В этот период нельзя допускать пересыхания почвы дольше 7–10 дней.",
                "Окучивайте картофель 2 раза за сезон: первый раз при высоте ботвы 15–20 см, второй через 2–3 недели. Это увеличивает количество клубней.",
                "Не сажайте картофель на одном месте несколько лет — накапливается фитофтора и нематода. Чередуйте с луком или зерновыми.",
                "Продавайте ранний урожай (июль) по цене 35–50 сом/кг, поздний осенью — 20–30 сом/кг. Разница существенная.",
            ],
            mistakes: [
                { wrong: "Покупать семена с рынка (мелкий старый клубень)", right: "Покупать сертифицированный семенной картофель" },
                { wrong: "Не поливать в июле в жару", right: "Июль–август — критический период, полив обязателен" },
                { wrong: "Не считать затраты заранее", right: "Записать все расходы до посева: семена, удобрения, вода, труд" },
                { wrong: "Продавать всё сразу осенью по низкой цене", right: "Хранить часть до зимы — цена вырастет на 30–50%" },
            ],
        },
    },
];

// ── Компоненты урока ──────────────────────────────────────────────────────────

function LessonView({
    topic,
    onBack,
}: {
    topic: LessonTopic;
    onBack: () => void;
}) {
    const { content } = topic;
    return (
        <div className="space-y-6 animate-fade-in">
            <button
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
                ← Назад к темам
            </button>

            <div className="flex items-center gap-3">
                <span className="text-3xl">{topic.icon}</span>
                <h2 className="text-xl font-bold">{content.title}</h2>
            </div>

            {/* Объяснение */}
            <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-semibold text-sm">Что это такое</span>
                </div>
                <div className="space-y-3">
                    {content.intro.map((p, i) => (
                        <p key={i} className="text-sm text-foreground/85 leading-relaxed">
                            {p}
                        </p>
                    ))}
                </div>
            </div>

            {/* Почему важно в КР */}
            <div className="bg-emerald-50/70 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                    <Globe className="w-4 h-4" />
                    <span className="font-semibold text-sm">Почему это важно в Кыргызстане</span>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{content.whyKG}</p>
            </div>

            {/* Советы */}
            <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 text-amber-600">
                    <Lightbulb className="w-4 h-4" />
                    <span className="font-semibold text-sm">Практические советы</span>
                </div>
                <div className="space-y-3">
                    {content.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {i + 1}
                            </div>
                            <p className="text-sm text-foreground/85 leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ошибки */}
            <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold text-sm">Типичные ошибки новичков</span>
                </div>
                <div className="space-y-3">
                    {content.mistakes.map((m, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm border rounded-xl overflow-hidden"
                        >
                            <div className="bg-red-50 dark:bg-red-900/10 px-4 py-3 flex items-start gap-2">
                                <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                                <span className="text-foreground/75">{m.wrong}</span>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 px-4 py-3 flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-foreground/85 font-medium">{m.right}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                ← Выбрать другую тему
            </button>
        </div>
    );
}

// ── Главный компонент ─────────────────────────────────────────────────────────

export function AgroLearningSection() {
    const [activeTopic, setActiveTopic] = useState<LessonTopic | null>(null);

    if (activeTopic) {
        return <LessonView topic={activeTopic} onBack={() => setActiveTopic(null)} />;
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-xl">AI-Обучение: агрономия для фермера</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Простые объяснения по реальным проблемам кыргызских фермеров — без сложных терминов.
                </p>
            </div>

            <div className="grid gap-3">
                {LESSONS.map((lesson) => (
                    <button
                        key={lesson.id}
                        onClick={() => setActiveTopic(lesson)}
                        className="w-full text-left bg-card border rounded-2xl px-5 py-4 hover:border-primary/50 hover:shadow-md transition-all duration-150 flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{lesson.icon}</span>
                            <div>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {lesson.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Практика · Ошибки · Советы для Кыргызстана
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </button>
                ))}
            </div>

            <div className="bg-muted/30 rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground">
                    Больше тем появится в следующих обновлениях. Хотите конкретную тему?{" "}
                    <span className="text-primary font-medium">Напишите нам в поддержку</span>.
                </p>
            </div>
        </div>
    );
}
