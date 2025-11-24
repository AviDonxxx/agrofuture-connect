import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Headset, User, Send } from "lucide-react";

type Message = {
    id: string;
    text: string;
    sender: "user" | "agent" | "system";
    timestamp: Date;
};

export function SupportAgentChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Поиск свободного оператора...",
            sender: "system",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate connection delay
        const timer = setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: "2",
                    text: "Оператор Алексей присоединился к чату.",
                    sender: "system",
                    timestamp: new Date(),
                },
                {
                    id: "3",
                    text: "Здравствуйте! Меня зовут Алексей. Чем я могу вам помочь?",
                    sender: "agent",
                    timestamp: new Date(),
                },
            ]);
            setIsConnected(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
    };

    return (
        <div className="flex flex-col h-[500px]">
            <div className="bg-primary/10 p-4 rounded-t-lg flex items-center gap-3">
                <div className="bg-primary p-2 rounded-full">
                    <Headset className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold">Поддержка</h3>
                    <p className="text-xs text-muted-foreground">
                        {isConnected ? "Алексей (онлайн)" : "Поиск оператора..."}
                    </p>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4 border-x">
                <div className="space-y-4">
                    {messages.map((msg) => {
                        if (msg.sender === "system") {
                            return (
                                <div key={msg.id} className="text-center text-xs text-muted-foreground my-2">
                                    {msg.text}
                                </div>
                            );
                        }
                        return (
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
                                        <Headset className="w-4 h-4" />
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
                        );
                    })}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-x border-b rounded-b-lg bg-background flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={isConnected ? "Напишите сообщение..." : "Подождите..."}
                    disabled={!isConnected}
                    className="flex-1"
                />
                <Button onClick={handleSend} size="icon" disabled={!isConnected}>
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
