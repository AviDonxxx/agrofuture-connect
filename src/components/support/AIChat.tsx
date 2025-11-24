import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send } from "lucide-react";

type Message = {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
};

export function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Здравствуйте! Я ИИ-помощник АгроПоле. Чем могу помочь?",
            sender: "ai",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getAIResponse(inputValue),
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };

    const getAIResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("цена") || lowerInput.includes("стоимость")) {
            return "Стоимость обучения зависит от выбранного тарифа: Базовый (15 000 ₽), Продвинутый (35 000 ₽) и Профессионал (60 000 ₽).";
        }
        if (lowerInput.includes("регистрация") || lowerInput.includes("аккаунт")) {
            return "Для регистрации перейдите в раздел 'Регистрация' в верхнем меню. Если у вас проблемы со входом, попробуйте сбросить пароль.";
        }
        if (lowerInput.includes("привет")) {
            return "Привет! Готов ответить на ваши вопросы по сервису АгроПоле.";
        }
        return "Я пока учусь и не могу точно ответить на этот вопрос. Попробуйте переформулировать или обратитесь к живому оператору.";
    };

    return (
        <div className="flex flex-col h-[500px]">
            <div className="bg-primary/10 p-4 rounded-t-lg flex items-center gap-3">
                <div className="bg-primary p-2 rounded-full">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold">ИИ-Помощник</h3>
                    <p className="text-xs text-muted-foreground">Всегда онлайн</p>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4 border-x">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-secondary" : "bg-primary/20"
                                    }`}
                            >
                                {msg.sender === "user" ? (
                                    <User className="w-4 h-4" />
                                ) : (
                                    <Bot className="w-4 h-4" />
                                )}
                            </div>
                            <div
                                className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.sender === "user"
                                        ? "bg-secondary text-secondary-foreground"
                                        : "bg-muted"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-x border-b rounded-b-lg bg-background flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Введите сообщение..."
                    className="flex-1"
                />
                <Button onClick={handleSend} size="icon">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
