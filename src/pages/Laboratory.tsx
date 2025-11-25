import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, Beaker, CheckCircle2, Clock, TrendingUp, Users, Check, Filter, ShoppingCart, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitIdeaDialog } from "@/components/laboratory/SubmitIdeaDialog";

import { useUserHistory } from "@/hooks/useUserHistory";
import { toast } from "sonner";

// Mock Data for Proven Solutions
interface Solution {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    rating: number;
    status: "recommended" | "tested" | "new";
    type: "irrigation" | "monitoring" | "automation";
    stats: {
        water?: string;
        yield?: string;
        roi?: string;
    };
}

const SOLUTIONS: Solution[] = [
    {
        id: "sol-1",
        title: "Капельное орошение с AI-контроллером v2.3",
        description: "Автоматическая оптимизация полива на основе влажности почвы.",
        price: 1200,
        unit: "/ га",
        rating: 4.8,
        status: "recommended",
        type: "irrigation",
        stats: { water: "38%", yield: "+27%", roi: "1.8 года" }
    },
    {
        id: "sol-2",
        title: "Дрон-мониторинг полей (Подписка)",
        description: "Еженедельный облет и анализ NDVI индексов.",
        price: 200,
        unit: "/ мес",
        rating: 4.5,
        status: "tested",
        type: "monitoring",
        stats: { yield: "+15%", roi: "6 мес" }
    },
    {
        id: "sol-3",
        title: "Умная теплица 'GreenBox'",
        description: "Полная автоматизация климата для закрытого грунта.",
        price: 5000,
        unit: "/ комплект",
        rating: 4.9,
        status: "new",
        type: "automation",
        stats: { yield: "+40%", roi: "2.5 года" }
    },
    {
        id: "sol-4",
        title: "Датчики влажности почвы (LoRaWAN)",
        description: "Сет из 5 датчиков с дальностью до 10 км.",
        price: 450,
        unit: "/ сет",
        rating: 4.7,
        status: "tested",
        type: "monitoring",
        stats: { water: "20%", roi: "1 год" }
    }
];

export default function Laboratory() {
    // Tab Persistence
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("laboratory_active_tab") || "ideas";
    });

    useEffect(() => {
        localStorage.setItem("laboratory_active_tab", activeTab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    // Action Persistence (Supported Projects)
    const [supportedProjects, setSupportedProjects] = useState<string[]>(() => {
        const saved = localStorage.getItem("laboratory_supported_projects");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("laboratory_supported_projects", JSON.stringify(supportedProjects));
    }, [supportedProjects]);

    const { addHistoryItem } = useUserHistory();
    const [ideaDialogOpen, setIdeaDialogOpen] = useState(false);

    const toggleSupport = (id: string, name: string) => {
        if (supportedProjects.includes(id)) {
            setSupportedProjects(prev => prev.filter(p => p !== id));
            toast.info("Вы отозвали поддержку", { description: name });
        } else {
            setSupportedProjects(prev => [...prev, id]);
            addHistoryItem({
                type: 'support',
                title: `Поддержан проект: ${name}`,
                details: "Ваш голос учтен",
                status: 'completed'
            });
            toast.success("Спасибо за поддержку!", { description: `Вы проголосовали за ${name}` });
        }
    };

    const isSupported = (id: string) => supportedProjects.includes(id);

    // Filters State
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
        maxPrice: 10000
    });

    const filteredSolutions = SOLUTIONS.filter(sol => {
        if (filters.status !== "all" && sol.status !== filters.status) return false;
        if (filters.type !== "all" && sol.type !== filters.type) return false;
        if (sol.price > filters.maxPrice) return false;
        return true;
    });

    const handleAddToCart = (sol: Solution) => {
        addHistoryItem({
            type: 'purchase',
            title: `Добавлено в корзину: ${sol.title}`,
            amount: `${sol.price} сом`,
            rawAmount: sol.price,
            details: "Из каталога проверенных решений",
            status: 'pending'
        });
        toast.success("Добавлено в корзину", { description: sol.title });
    };

    const handleView = (title: string, price: number) => {
        addHistoryItem({
            type: 'view',
            title: `Просмотр: ${title}`,
            amount: `${price} сом`,
            rawAmount: price,
            details: "Просмотр решения",
            status: 'viewed'
        });
    };

    return (
        <div className="container py-12 space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Лаборатория технологий</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Marketplace инноваций: предлагайте идеи, следите за тестами и выбирайте проверенные решения.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button size="lg" onClick={() => setIdeaDialogOpen(true)}>
                        <Lightbulb className="w-4 h-4 mr-2" /> Предложить идею
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-muted/50 rounded-xl">
                    {["ideas", "testing", "proven"].map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="py-3 text-base data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 rounded-lg"
                        >
                            {tab === "ideas" && "Идеи на рассмотрении"}
                            {tab === "testing" && "Технологии в тесте"}
                            {tab === "proven" && "Проверенные решения"}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Zone A: Ideas */}
                    <TabsContent value="ideas" className="space-y-8 mt-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">Идеи на рассмотрении</h2>
                                <p className="text-muted-foreground">Голосуйте за технологии, которые хотите увидеть на полях.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className={cn("transition-all duration-300", isSupported("bio-sensor") ? "border-primary ring-1 ring-primary shadow-md" : "")}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary">На голосовании</Badge>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4 mr-1" /> 12 дней
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Биосенсор болезней растений</CardTitle>
                                    <CardDescription>Автор: Бекжан Алиев, студент КРСУ</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm">Определяет болезни за 3 дня до видимых симптомов с помощью ИК-спектроскопии.</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Собрано голосов</span>
                                            <span className="font-bold">{247 + (isSupported("bio-sensor") ? 1 : 0)}</span>
                                        </div>
                                        <Progress value={65} className="h-2" />
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <p>Нужно для теста: $2,000</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button className="w-full" variant="outline">Читать подробнее</Button>
                                    <Button
                                        className={cn("w-full transition-colors", isSupported("bio-sensor") ? "bg-green-600 hover:bg-green-700" : "")}
                                        onClick={() => toggleSupport("bio-sensor", "Биосенсор болезней растений")}
                                    >
                                        {isSupported("bio-sensor") ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" /> Вы поддержали
                                            </>
                                        ) : (
                                            <>
                                                <ThumbsUp className="w-4 h-4 mr-2" /> Поддержать проект
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                            {/* Placeholder for more cards */}
                            <Card className="opacity-60 border-dashed hover:opacity-100 transition-opacity cursor-pointer">
                                <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
                                    <div className="bg-muted p-4 rounded-full mb-4">
                                        <Beaker className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Ваша идея здесь</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Предложите технологию и получите грант на тестирование</p>
                                    <SubmitIdeaDialog trigger={<Button variant="outline">Подать заявку</Button>} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Zone B: Testing */}
                    <TabsContent value="testing" className="space-y-8 mt-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">Технологии в тесте</h2>
                                <p className="text-muted-foreground">Следите за реальными испытаниями в режиме реального времени.</p>
                            </div>
                            <Button variant="outline">Смотреть live-трансляции</Button>
                        </div>

                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-green-500 hover:bg-green-600">Активный тест</Badge>
                                        <span className="text-sm text-muted-foreground">Поле #7, Чуйская область</span>
                                    </div>
                                    <Button variant="ghost" size="sm">Подписаться</Button>
                                </div>
                                <CardTitle className="mt-2 text-2xl">AI-прогноз заморозков за 48 часов</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Старт теста</span>
                                        <span className="font-medium">15 марта 2026</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">До завершения</span>
                                        <span className="font-medium">47 дней</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>

                                <div className="space-y-4 col-span-2">
                                    <h4 className="font-semibold mb-2">Промежуточные результаты:</h4>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="bg-background p-4 rounded-lg border">
                                            <div className="text-sm text-muted-foreground mb-1">Точность</div>
                                            <div className="text-2xl font-bold text-primary">89%</div>
                                            <div className="text-xs text-muted-foreground">Цель: 85%</div>
                                        </div>
                                        <div className="bg-background p-4 rounded-lg border">
                                            <div className="text-sm text-muted-foreground mb-1">Ложные тревоги</div>
                                            <div className="text-2xl font-bold text-orange-500">8.7%</div>
                                            <div className="text-xs text-muted-foreground">2 из 23</div>
                                        </div>
                                        <div className="bg-background p-4 rounded-lg border">
                                            <div className="text-sm text-muted-foreground mb-1">Сэкономлено</div>
                                            <div className="text-2xl font-bold text-green-600">~$1,200</div>
                                            <div className="text-xs text-muted-foreground">На урожае</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Zone C: Proven */}
                    <TabsContent value="proven" className="space-y-8 mt-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">Проверенные решения</h2>
                                <p className="text-muted-foreground">Каталог технологий, доказавших свою эффективность.</p>
                            </div>
                            <Button
                                variant={showFilters ? "secondary" : "outline"}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="w-4 h-4 mr-2" /> Фильтры
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="bg-muted/50 p-4 rounded-lg grid md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Статус</label>
                                    <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Все статусы" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Все</SelectItem>
                                            <SelectItem value="recommended">Рекомендовано</SelectItem>
                                            <SelectItem value="tested">Протестировано</SelectItem>
                                            <SelectItem value="new">Новое</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Тип решения</label>
                                    <Select value={filters.type} onValueChange={(val) => setFilters({ ...filters, type: val })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Все типы" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Все</SelectItem>
                                            <SelectItem value="irrigation">Орошение</SelectItem>
                                            <SelectItem value="monitoring">Мониторинг</SelectItem>
                                            <SelectItem value="automation">Автоматизация</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Макс. цена: ${filters.maxPrice}</label>
                                    <Input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="100"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredSolutions.map((sol) => (
                                <Card key={sol.id} className="flex flex-col" onMouseEnter={() => handleView(sol.title, sol.price)}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className={cn(
                                                sol.status === "recommended" ? "border-green-500 text-green-600" :
                                                    sol.status === "new" ? "border-blue-500 text-blue-600" :
                                                        "border-orange-500 text-orange-600"
                                            )}>
                                                {sol.status === "recommended" ? "Рекомендовано" : sol.status === "new" ? "Новинка" : "Протестировано"}
                                            </Badge>
                                            <div className="flex items-center text-yellow-500">
                                                <span className="font-bold mr-1">{sol.rating}</span>
                                                <StarIcon className="w-4 h-4 fill-current" />
                                            </div>
                                        </div>
                                        <CardTitle>{sol.title}</CardTitle>
                                        <CardDescription>{sol.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {sol.stats.water && (
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Экономия воды</div>
                                                    <div className="font-semibold text-green-600">{sol.stats.water}</div>
                                                </div>
                                            )}
                                            {sol.stats.yield && (
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Рост урожая</div>
                                                    <div className="font-semibold text-green-600">{sol.stats.yield}</div>
                                                </div>
                                            )}
                                            {sol.stats.roi && (
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Окупаемость</div>
                                                    <div className="font-semibold">{sol.stats.roi}</div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm text-muted-foreground">Стоимость</div>
                                                <div className="font-semibold">${sol.price} {sol.unit}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2 gap-2">
                                        <Button variant="outline">Скачать отчет</Button>
                                        <Button onClick={() => handleAddToCart(sol)}>
                                            <ShoppingCart className="w-4 h-4 mr-2" /> Купить
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            <SubmitIdeaDialog open={ideaDialogOpen} onOpenChange={setIdeaDialogOpen} />
        </div>
    );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
