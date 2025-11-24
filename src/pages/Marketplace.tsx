import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Clock, Users, Repeat, Star, Filter } from "lucide-react";

export default function Marketplace() {
    return (
        <div className="container py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AgriTech Маркетплейс</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Магазин умного оборудования, аренда, групповые закупки и вторичный рынок.
                </p>
            </div>

            <Tabs defaultValue="equipment" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                    <TabsTrigger value="equipment">Умное оборудование</TabsTrigger>
                    <TabsTrigger value="rent">Аренда (Try & Buy)</TabsTrigger>
                    <TabsTrigger value="group">Групповая покупка</TabsTrigger>
                    <TabsTrigger value="used">Вторичный рынок</TabsTrigger>
                </TabsList>

                {/* Zone A: Equipment */}
                <TabsContent value="equipment" className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Каталог оборудования</h2>
                        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Фильтры</Button>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="group hover:shadow-lg transition-shadow">
                                <div className="aspect-square bg-muted relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-muted-foreground">
                                        Фото товара
                                    </div>
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-lg">Датчик влажности почвы Pro</CardTitle>
                                    <CardDescription>Точность 99%, LoRaWAN</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="font-bold text-xl">4,500 сом</div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full" size="sm">
                                        <ShoppingCart className="w-4 h-4 mr-2" /> В корзину
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Zone B: Rent */}
                <TabsContent value="rent" className="space-y-8">
                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Clock className="w-6 h-6 text-primary" /> Не уверен? Арендуй на месяц!
                            </h3>
                            <p className="text-muted-foreground">Если купишь после аренды — стоимость аренды вычитается из цены.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
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
                                <Button className="w-full">Арендовать на 1 месяц</Button>
                                <Button variant="outline" className="w-full">Забронировать демо (Бесплатно)</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* Zone C: Group Buy */}
                <TabsContent value="group" className="space-y-8">
                    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-orange-800">
                            <Users className="w-6 h-6" /> Покупай с соседями — плати меньше!
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-orange-200 shadow-sm">
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
                                <Button className="w-full bg-orange-600 hover:bg-orange-700">Я участвую!</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* Zone D: Used */}
                <TabsContent value="used" className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Вторичный рынок</h2>
                        <Button>Подать объявление</Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
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
                                <Button variant="outline" className="w-full">Написать продавцу</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
