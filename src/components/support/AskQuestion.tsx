import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2 } from "lucide-react";

type SentMessage = {
    id: string;
    subject: string;
    text: string;
    timestamp: Date;
};

export function AskQuestion() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);

    const handleSend = () => {
        if (!subject.trim() || !message.trim()) return;

        const newMessage: SentMessage = {
            id: Date.now().toString(),
            subject,
            text: message,
            timestamp: new Date(),
        };

        setSentMessages((prev) => [newMessage, ...prev]);
        setSubject("");
        setMessage("");
    };

    return (
        <div className="h-[500px] flex flex-col gap-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Тема вопроса</Label>
                    <Input
                        id="subject"
                        placeholder="Например: Проблема с оплатой"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                        id="message"
                        placeholder="Опишите вашу проблему подробно..."
                        className="h-32 resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <Button onClick={handleSend} className="w-full">
                    Отправить вопрос
                </Button>
            </div>

            {sentMessages.length > 0 && (
                <div className="flex-1 flex flex-col min-h-0">
                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                        Отправленные сообщения
                    </h4>
                    <ScrollArea className="flex-1 border rounded-md p-4 bg-muted/30">
                        <div className="space-y-3">
                            {sentMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="bg-background border rounded-lg p-3 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <span className="font-medium text-sm">{msg.subject}</span>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {msg.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {msg.text}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Отправлено</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
}
