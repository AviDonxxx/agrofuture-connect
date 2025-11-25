import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Clock, Users, Filter, Check, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserHistory } from "@/hooks/useUserHistory";
import { PostAdDialog } from "@/components/marketplace/PostAdDialog";
import { WriteSellerDialog } from "@/components/marketplace/WriteSellerDialog";

export default function Marketplace() {
    // Tab Persistence
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("marketplace_active_tab") || "equipment";
    });

    useEffect(() => {
        localStorage.setItem("marketplace_active_tab", activeTab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    // Action Persistence (Cart/Purchased Items)
    const [cartItems, setCartItems] = useState<string[]>(() => {
        const saved = localStorage.getItem("marketplace_cart_items");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("marketplace_cart_items", JSON.stringify(cartItems));
    }, [cartItems]);

    const { addHistoryItem } = useUserHistory();
    const [postAdOpen, setPostAdOpen] = useState(false);

    const handleAddToCart = (id: string, name: string, price: string) => {
        if (cartItems.includes(id)) {
            // Remove from cart
            setCartItems(prev => prev.filter(p => p !== id));
            toast.info("Удалено из корзины", { description: name });
        } else {
            // Add to cart
            setCartItems(prev => [...prev, id]);
            addHistoryItem({
                type: 'purchase',
                title: `Добавлено в корзину: ${name}`,
                amount: price,
                rawAmount: parseInt(price.replace(/\D/g, '')),
                details: "Ожидает оформления",
                status: 'pending'
            });
            toast.success("Добавлено в корзину", { description: name });
        }
    };

    const handleRent = (name: string, price: string) => {
        addHistoryItem({
            type: 'purchase',
            title: `Аренда: ${name}`,
            amount: price,
            rawAmount: parseInt(price.replace(/\D/g, '')),
            details: "Заявка на аренду отправлена",
            status: 'pending'
        });
        toast.success("Заявка на аренду отправлена", {
            description: "Менеджер свяжется с вами для подтверждения."
        });
    };

    const handleGroupBuy = (name: string, price: string) => {
        addHistoryItem({
            type: 'participate',
            title: `Групповая покупка: ${name}`,
            amount: price,
            rawAmount: parseInt(price.replace(/\D/g, '')),
            details: "Вы присоединились к группе",
            status: 'pending'
        });
        toast.success("Вы присоединились к группе!", {
            description: "Мы уведомим вас, когда соберется нужное количество участников."
        });
    };

    const handleView = (name: string, price: string) => {
        addHistoryItem({
            type: 'view',
            title: `Просмотр: ${name}`,
            amount: price,
            rawAmount: parseInt(price.replace(/\D/g, '')),
            details: "Просмотр карточки товара",
            status: 'viewed'
        });
    };

    const isInCart = (id: string) => cartItems.includes(id);

    return (
        <div className="container py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AgriTech Маркетплейс</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Магазин умного оборудования, аренда, групповые закупки и вторичный рынок.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button size="lg" onClick={() => setPostAdOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Подать объявление
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto p-1 bg-muted/50 rounded-xl">
                    {["equipment", "rent", "group", "used"].map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="py-3 text-base data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 rounded-lg"
                        >
                            {tab === "equipment" && "Умное оборудование"}
                            {tab === "rent" && "Аренда (Try & Buy)"}
                            {tab === "group" && "Групповая покупка"}
                            {tab === "used" && "Вторичный рынок"}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Zone A: Equipment */}
                    <TabsContent value="equipment" className="space-y-8 mt-0">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Каталог оборудования</h2>
                            <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Фильтры</Button>
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[
                                { id: "equipment-1", name: "Датчик влажности почвы Pro", price: "4,500 сом" },
                                { id: "equipment-2", name: "Метеостанция LoRaWAN", price: "12,000 сом" },
                                { id: "equipment-3", name: "Авто-полив контроллер", price: "8,500 сом" },
                                { id: "equipment-4", name: "GPS-трекер для скота", price: "3,200 сом" }
                            ].map((item) => (
                                <Card key={item.id} className={cn("group hover:shadow-lg transition-all duration-300", isInCart(item.id) ? "border-primary ring-1 ring-primary" : "")} onMouseEnter={() => handleView(item.name, item.price)}>
                                    <div className="aspect-square bg-muted relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-muted-foreground">
                                            Фото товара
                                        </div>
                                    </div>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-lg">{item.name}</CardTitle>
                                        <CardDescription>Точность 99%, LoRaWAN</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="font-bold text-xl">{item.price}</div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            className={cn("w-full transition-colors", isInCart(item.id) ? "bg-green-600 hover:bg-green-700" : "")}
                                            size="sm"
                                            onClick={() => handleAddToCart(item.id, item.name, item.price)}
                                        >
                                            {isInCart(item.id) ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" /> В корзине
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-4 h-4 mr-2" /> В корзину
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Zone B: Rent */}
                    <TabsContent value="rent" className="space-y-8 mt-0">
                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-primary" /> Не уверен? Арендуй на месяц!
                                </h3>
                                <p className="text-muted-foreground">Если купишь после аренды — стоимость аренды вычитается из цены.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card onMouseEnter={() => handleView('Система капельного орошения "AgriFlow Pro"', "3,500 сом/мес")}>
                                <CardHeader>
                                    <Badge className="w-fit mb-2" variant="secondary">Хит аренды</Badge>
                                    <CardTitle>Система капельного орошения "AgriFlow Pro"</CardTitle>
                                    <CardDescription>Полный комплект на 1 га</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                        <span className="text-muted-foreground">Цена покупки</span>
                                        <span className="font-bold line-through text-muted-foreground">45,000 сом</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                                        <span className="font-medium text-primary">Аренда</span>
                                        <span className="font-bold text-xl text-primary">3,500 сом/мес</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button className="w-full" onClick={() => handleRent('Система капельного орошения "AgriFlow Pro"', "3,500 сом/мес")}>
                                        Арендовать на 1 месяц
                                    </Button>
                                    <Button variant="outline" className="w-full">Забронировать демо (Бесплатно)</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Zone C: Group Buy */}
                    <TabsContent value="group" className="space-y-8 mt-0">
                        <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-800">
                                <Users className="w-6 h-6" /> Покупай с соседями — плати меньше!
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-orange-200 shadow-sm" onMouseEnter={() => handleView("Комплект капельного орошения (1 га)", "8,500 сом")}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge className="bg-orange-500 hover:bg-orange-600">Акция: -29%</Badge>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4 mr-1" /> 5 дней
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Комплект капельного орошения (1 га)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Участников</span>
                                            <span className="font-bold">7 из 10</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 w-[70%]" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-3 border rounded-lg">
                                            <div className="text-sm text-muted-foreground">Обычная цена</div>
                                            <div className="font-bold line-through text-muted-foreground">12,000 сом</div>
                                        </div>
                                        <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                            <div className="text-sm text-orange-800 font-medium">Цена в группе</div>
                                            <div className="font-bold text-xl text-orange-600">8,500 сом</div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full bg-orange-600 hover:bg-orange-700"
                                        onClick={() => handleGroupBuy("Комплект капельного орошения (1 га)", "8,500 сом")}
                                    >
                                        Я участвую!
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Zone D: Used */}
                    <TabsContent value="used" className="space-y-8 mt-0">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Вторичный рынок</h2>
                            <PostAdDialog />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card onMouseEnter={() => handleView("Датчики влажности (10 шт.)", "8,000 сом")}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge variant="outline">Б/У</Badge>
                                        <span className="text-sm text-muted-foreground">Талас, с. Кок-Ой</span>
                                    </div>
                                    <CardTitle className="mt-2">Датчики влажности (10 шт.)</CardTitle>
                                    <CardDescription>Продавец: Асан Т. (Рейтинг 4.9)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">8,000 сом</span>
                                        <span className="text-sm text-muted-foreground line-through">15,000 сом</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <WriteSellerDialog sellerName="Асан Т." productName="Датчики влажности (10 шт.)" />
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
