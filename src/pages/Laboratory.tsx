import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, Beaker, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";

export default function Laboratory() {
    return (
        <div className="container py-12 space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Лаборатория технологий</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Marketplace инноваций: предлагайте идеи, следите за тестами и выбирайте проверенные решения.
                </p>
            </div>

            <Tabs defaultValue="ideas" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="ideas">Идеи на рассмотрении</TabsTrigger>
                    <TabsTrigger value="testing">Технологии в тесте</TabsTrigger>
                    <TabsTrigger value="proven">Проверенные решения</TabsTrigger>
                </TabsList>

                {/* Zone A: Ideas */}
                <TabsContent value="ideas" className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Идеи на рассмотрении</h2>
                            <p className="text-muted-foreground">Голосуйте за технологии, которые хотите увидеть на полях.</p>
                        </div>
                        <Button>Предложить идею</Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
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
                                        <span className="font-bold">247</span>
                                    </div>
                                    <Progress value={65} />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <p>Нужно для теста: $2,000</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button className="w-full" variant="outline">Читать подробнее</Button>
                                <Button className="w-full"><ThumbsUp className="w-4 h-4 mr-2" /> Поддержать проект</Button>
                            </CardFooter>
                        </Card>
                        {/* Placeholder for more cards */}
                        <Card className="opacity-60 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
                                <div className="bg-muted p-4 rounded-full mb-4">
                                    <Beaker className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-semibold mb-2">Ваша идея здесь</h3>
                                <p className="text-sm text-muted-foreground mb-4">Предложите технологию и получите грант на тестирование</p>
                                <Button variant="outline">Подать заявку</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Zone B: Testing */}
                <TabsContent value="testing" className="space-y-8">
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
                <TabsContent value="proven" className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Проверенные решения</h2>
                            <p className="text-muted-foreground">Каталог технологий, доказавших свою эффективность.</p>
                        </div>
                        <Button variant="outline">Фильтры</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="border-green-500 text-green-600">Рекомендовано</Badge>
                                    <div className="flex items-center text-yellow-500">
                                        <span className="font-bold mr-1">4.8</span>
                                        <StarIcon className="w-4 h-4 fill-current" />
                                    </div>
                                </div>
                                <CardTitle>Капельное орошение с AI-контроллером v2.3</CardTitle>
                                <CardDescription>Автоматическая оптимизация полива на основе влажности почвы.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Экономия воды</div>
                                        <div className="font-semibold text-green-600">38%</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Рост урожая</div>
                                        <div className="font-semibold text-green-600">+27%</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Окупаемость</div>
                                        <div className="font-semibold">1.8 года</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Стоимость</div>
                                        <div className="font-semibold">$1,200 / га</div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-2">
                                <Button variant="outline">Скачать отчет</Button>
                                <Button>Купить</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
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
