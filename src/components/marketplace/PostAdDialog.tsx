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
import { Loader2, Megaphone } from "lucide-react";
import { toast } from "sonner";
import { useUserHistory } from "@/hooks/useUserHistory";

interface PostAdDialogProps {
    trigger?: React.ReactNode;
}

export function PostAdDialog({ trigger }: PostAdDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { addHistoryItem } = useUserHistory();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        description: "",
        contact: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.price || !formData.contact) {
            toast.error("Заполните обязательные поля");
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setOpen(false);

            // Log to history
            addHistoryItem({
                type: 'ad',
                title: `Объявление: ${formData.title}`,
                amount: `${formData.price} сом`,
                rawAmount: parseInt(formData.price),
                details: formData.category,
                status: 'completed'
            });

            toast.success("Объявление опубликовано", {
                description: "Ваше объявление теперь видно всем пользователям."
            });

            setFormData({ title: "", category: "", price: "", description: "", contact: "" });
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button><Megaphone className="w-4 h-4 mr-2" /> Подать объявление</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Подать объявление</DialogTitle>
                    <DialogDescription>
                        Продайте излишки урожая или старое оборудование.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Название товара <span className="text-red-500">*</span></Label>
                        <Input
                            id="title"
                            placeholder="Например: Трактор МТЗ-80"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Категория <span className="text-red-500">*</span></Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="equipment">Оборудование</SelectItem>
                                    <SelectItem value="harvest">Урожай</SelectItem>
                                    <SelectItem value="seeds">Семена / Удобрения</SelectItem>
                                    <SelectItem value="services">Услуги</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Цена (сом) <span className="text-red-500">*</span></Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                            id="description"
                            placeholder="Состояние, характеристики, местоположение..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact">Контакты <span className="text-red-500">*</span></Label>
                        <Input
                            id="contact"
                            placeholder="+996 555 00 00 00"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Опубликовать
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
