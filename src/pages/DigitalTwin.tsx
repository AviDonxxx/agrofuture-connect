import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Droplets, Sun, ArrowRight, Check, Play, BarChart3 } from "lucide-react";

export default function DigitalTwin() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <div className="container py-12 max-w-5xl">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Цифровой двойник фермы</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Виртуальная песочница: симулируйте внедрение технологий на своём поле без риска.
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
                    <div className={`w-20 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
                    <div className={`w-20 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>3</div>
                </div>
            </div>

            {/* Step 1: Data Input */}
            {step === 1 && (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Шаг 1: Создание цифрового двойника</CardTitle>
                        <CardDescription>Введите данные о вашем поле для точной симуляции.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Где ваше поле?</Label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-2" /> Выбрать на карте
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Площадь (га)</Label>
                                <Input type="number" placeholder="10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Культура</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите культуру" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wheat">Пшеница</SelectItem>
                                        <SelectItem value="corn">Кукуруза</SelectItem>
                                        <SelectItem value="potato">Картофель</SelectItem>
                                        <SelectItem value="apple">Яблоки</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Источник воды</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите источник" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="river">Река / Канал</SelectItem>
                                    <SelectItem value="well">Скважина</SelectItem>
                                    <SelectItem value="rain">Только осадки</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Бюджет на технологии (сом)</Label>
                            <Input type="number" placeholder="100000" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={loading}>
                            {loading ? "Анализируем данные..." : "Создать двойника и получить рекомендации"}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Step 2: AI Recommendations */}
            {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl text-center">
                        <h2 className="text-2xl font-bold mb-2">Анализ завершен!</h2>
                        <p className="text-muted-foreground">
                            Для вашего поля в Таласской области (12 га, пшеница) мы рекомендуем 3 технологии:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-2 border-primary relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-bl-lg">
                                #1 Выбор AI
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl">Капельное орошение + Солнечные панели</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Экономия воды</span>
                                    <span className="font-bold text-green-600">42%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Окупаемость</span>
                                    <span className="font-bold">2.1 года</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="text-sm text-muted-foreground">Инвестиции</div>
                                    <div className="text-2xl font-bold">156,000 сом</div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => setStep(3)}>Симулировать этот вариант</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Датчики влажности + SMS</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Экономия воды</span>
                                    <span className="font-bold text-green-600">28%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Окупаемость</span>
                                    <span className="font-bold">1.3 года</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="text-sm text-muted-foreground">Инвестиции</div>
                                    <div className="text-2xl font-bold">48,000 сом</div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={() => setStep(3)}>Симулировать</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Дрон-мониторинг</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Экономия</span>
                                    <span className="font-bold text-green-600">~15,000/год</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Тип</span>
                                    <span className="font-bold">Аренда</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="text-sm text-muted-foreground">Стоимость</div>
                                    <div className="text-2xl font-bold">12,000 сом/год</div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={() => setStep(3)}>Симулировать</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}

            {/* Step 3: Simulation */}
            {step === 3 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Симуляция: Капельное орошение + Солнечные панели</h2>
                        <Button variant="outline" onClick={() => setStep(2)}>Назад к выбору</Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Mock 3D View */}
                            <div className="aspect-video bg-gradient-to-br from-green-800 to-green-600 rounded-xl relative overflow-hidden shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-f8196812c850?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700" />
                                <div className="relative z-10 text-center text-white p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/20">
                                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                                    <h3 className="text-2xl font-bold mb-2">3D-Симуляция активна</h3>
                                    <p>Нажмите для управления временем</p>
                                </div>

                                {/* HUD Overlay */}
                                <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs font-mono">
                                    <div>Влажность: 65%</div>
                                    <div>Температура: 24°C</div>
                                    <div>Рост: День 45</div>
                                </div>
                            </div>

                            <div className="bg-card border rounded-xl p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" /> Прогноз показателей
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Расход воды (с технологией vs без)</span>
                                            <span className="text-green-600 font-bold">-42%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[58%]" />
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden opacity-50">
                                            <div className="h-full bg-red-500 w-full" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Прогнозируемый доход</span>
                                            <span className="text-green-600 font-bold">+27%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[85%]" />
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden opacity-50">
                                            <div className="h-full bg-blue-300 w-[65%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Управление симуляцией</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Скорость времени</Label>
                                        <Slider defaultValue={[1]} max={5} step={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Сценарий погоды</Label>
                                        <Select defaultValue="normal">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Нормальный год</SelectItem>
                                                <SelectItem value="drought">Засуха (2021)</SelectItem>
                                                <SelectItem value="rain">Дождливый сезон</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="w-full">Сравнить сценарии</Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Поделиться результатом</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Отправьте ссылку соседям или агроному для консультации.
                                    </p>
                                    <Button variant="outline" className="w-full">Копировать ссылку</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
