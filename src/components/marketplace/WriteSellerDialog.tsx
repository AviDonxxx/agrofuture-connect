import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { useUserHistory } from "@/hooks/useUserHistory";

interface WriteSellerDialogProps {
    sellerName: string;
    productName: string;
    trigger?: React.ReactNode;
}

export function WriteSellerDialog({ sellerName, productName, trigger }: WriteSellerDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { addHistoryItem } = useUserHistory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            toast.error("Введите сообщение");
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setOpen(false);

            // Log to history
            addHistoryItem({
                type: 'message',
                title: `Сообщение для ${sellerName}`,
                details: `По товару: ${productName}`,
                status: 'completed'
            });

            toast.success("Сообщение отправлено", {
                description: `Продавец ${sellerName} получит ваше уведомление.`
            });

            setMessage("");
        }, 1000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline" className="w-full">Написать продавцу</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Написать продавцу</DialogTitle>
                    <DialogDescription>
                        Отправьте сообщение {sellerName} по поводу "{productName}".
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="message">Ваше сообщение</Label>
                        <Textarea
                            id="message"
                            placeholder="Здравствуйте, товар еще в наличии? Возможен ли торг?"
                            className="min-h-[100px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                            Отправить
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
