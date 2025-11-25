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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useUserHistory } from "@/hooks/useUserHistory";

interface SubmitIdeaDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function SubmitIdeaDialog({ trigger, open: openProp, onOpenChange: onOpenChangeProp }: SubmitIdeaDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : internalOpen;
    const setOpen = isControlled ? (onOpenChangeProp || (() => { })) : setInternalOpen;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        contact: ""
    });

    const { addHistoryItem } = useUserHistory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setOpen(false);

            addHistoryItem({
                type: 'idea',
                title: `Идея: ${formData.title}`,
                details: formData.category,
                status: 'pending'
            });

            toast.success("Заявка успешно отправлена!", {
                description: "Мы рассмотрим вашу идею и свяжемся с вами в ближайшее время."
            });
            setFormData({ title: "", description: "", category: "", contact: "" });
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Предложить идею</DialogTitle>
                        <DialogDescription>
                            Опишите вашу технологию или идею. Лучшие проекты получат финансирование и площадку для тестов.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Название проекта</Label>
                            <Input
                                id="title"
                                placeholder="Например: Умная теплица v2"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Категория</Label>
                            <Select
                                required
                                value={formData.category}
                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="iot">IoT и Датчики</SelectItem>
                                    <SelectItem value="automation">Автоматизация</SelectItem>
                                    <SelectItem value="biotech">Биотехнологии</SelectItem>
                                    <SelectItem value="software">ПО и AI</SelectItem>
                                    <SelectItem value="other">Другое</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Описание</Label>
                            <Textarea
                                id="description"
                                placeholder="Кратко опишите суть технологии и её пользу..."
                                required
                                className="min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contact">Контакты (Телефон / Telegram)</Label>
                            <Input
                                id="contact"
                                placeholder="+996 555 000 000"
                                required
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Отправка...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Отправить заявку
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
