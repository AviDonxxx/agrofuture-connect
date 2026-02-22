import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const SYSTEM_PROMPT = `
Ты — ИИ-консультант AgroFarm для фермеров и студентов Кыргызстана.
Твоя задача — помогать с выбором культур, поливом и базовой экономикой небольших полей.
Отвечай кратко, структурировано по блокам: Ситуация, Рекомендации, Экономика, Практические шаги.
Не выдумывай точные цифры урожайности и дохода, давай только примерные оценки и всегда подчёркивай, что это не гарантия.
Говори простым языком, без сложных терминов.
`;

// Имитация ответа от backend/AI для демо-версии без ключа OpenAI
const getMockResponse = async (input: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Имитация задержки
  
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("картофел") || lowerInput.includes("картошка")) {
    return `### Ситуация
Вы интересуетесь выращиванием картофеля. В условиях Кыргызстана это отличная культура для средних и предгорных зон.

### Рекомендации
- Используйте семена сортов Пикассо или Невский.
- Оптимальный полив — умеренный, особенно в период цветения.

### Экономика
- Затраты зависят от стоимости семян и удобрений. 
- Примерно можно рассчитывать на хороший урожай, но точный доход зависит от рыночных цен осенью.

### Практические шаги
1. Подготовьте почву с осени или ранней весной.
2. Следите за влажностью, не допускайте застоя воды.
3. Проконсультируйтесь с местным агрономом по удобрениям.

*Важно: Это примерные оценки, реальные результаты могут отличаться.*`;
  }

  return `### Ситуация
Ваш вопрос принят. Я — агро-консультант AgroFarm.

### Рекомендации
- Для точного совета мне нужно знать ваш регион и площадь поля.
- Используйте современные методы полива (капельное орошение) для экономии ресурсов.

### Экономика
- Внедрение технологий AgroFarm помогает снизить риски, но точные цифры прибыли зависят от многих факторов.

### Практические шаги
1. Пройдите наш "Умный опрос" в разделе Советник.
2. Обратите внимание на графики влажности на ваших полях.

*Это автоматический ответ на базе обучающей модели AgroFarm.*`;
};

const AgroFarmChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Здравствуйте! Я ИИ-консультант AgroFarm. Чем могу помочь вам сегодня?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const messagesWithUser = [...messages, userMsg];
    setMessages(messagesWithUser);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesWithUser.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();

      if (response.ok && data.answer != null) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
        return;
      }
      if (data.useMock) {
        const answer = await getMockResponse(userMsg.content);
        setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
        return;
      }
      throw new Error(data.error || "Ошибка сервиса");
    } catch (err) {
      console.error("AI error:", err);
      const answer = await getMockResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto border border-border bg-card rounded-3xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border p-4 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-sm">AgroFarm AI</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Онлайн консультант</p>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={cn(
              "flex gap-3 max-w-[85%]",
              m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 shrink-0 rounded-full flex items-center justify-center border",
              m.role === "user" ? "bg-primary border-primary text-white" : "bg-card border-border text-primary"
            )}>
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
              m.role === "user" 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-card border border-border rounded-tl-none shadow-sm"
            )}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
            <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none text-sm text-muted-foreground">
              Обдумываю ответ...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ваш вопрос об урожае или поливе..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="w-full pl-4 pr-12 py-3 bg-muted/40 border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3">
          ИИ может ошибаться. Рекомендации AgroFarm не являются финансовой гарантией.
        </p>
      </div>
    </div>
  );
};

export default AgroFarmChat;
