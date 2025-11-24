import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const faqs = [
    {
        question: "Как зарегистрироваться на платформе?",
        answer: "Нажмите кнопку 'Регистрация' в верхнем меню, выберите вашу роль (Фермер, Разработчик, Инвестор) и заполните форму.",
    },
    {
        question: "Сколько стоит обучение?",
        answer: "У нас есть три тарифа: Базовый (15 000 ₽), Продвинутый (35 000 ₽) и Профессионал (60 000 ₽). Подробнее в разделе 'Обучение'.",
    },
    {
        question: "Как связаться с поддержкой?",
        answer: "Вы можете использовать чат с ИИ для быстрых ответов или написать живому оператору в разделе 'Тех-Поддержка'.",
    },
    {
        question: "Можно ли сменить тариф обучения?",
        answer: "Да, вы можете повысить уровень тарифа в любой момент, доплатив разницу в стоимости.",
    },
    {
        question: "Какие способы оплаты доступны?",
        answer: "Мы принимаем банковские карты, переводы и электронные кошельки.",
    },
    {
        question: "Есть ли мобильное приложение?",
        answer: "В данный момент мы разрабатываем мобильное приложение. Сейчас сайт полностью адаптирован для мобильных устройств.",
    },
];

export function KnowledgeBase() {
    return (
        <div className="h-[500px] flex flex-col">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Часто задаваемые вопросы</h3>
                <p className="text-sm text-muted-foreground">
                    Найдите ответы на популярные вопросы
                </p>
            </div>
            <ScrollArea className="flex-1 pr-4">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </div>
    );
}
