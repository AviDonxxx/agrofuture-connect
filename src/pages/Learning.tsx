import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Award } from "lucide-react";
import { useUserHistory } from "@/hooks/useUserHistory";
import { toast } from "sonner";

const programs = [
  {
    title: "AgroAI Camp",
    duration: "4 недели",
    description: "Интенсив по Edge AI, сенсорам и построению цифровых двойников полей.",
    result: "MVP для конкретного поля и менторская поддержка.",
  },
  {
    title: "Школа фермеров",
    duration: "6 недель",
    description: "Практика по умному орошению, настройке датчиков и анализу почвы.",
    result: "Сертификат и доступ к субсидированному оборудованию.",
  },
  {
    title: "Инвест-клуб",
    duration: "3 недели",
    description: "F2F-встречи с агро-стартапами, туры на поля и юридическая поддержка.",
    result: "Портфель проектов и прозрачные метрики KPI.",
  },
];

const pricing = [
  {
    title: "Базовый",
    price: "15 000 ₽",
    duration: "4 недели",
    description: "Основы цифрового земледелия и введение в технологии.",
    features: [
      "Доступ к онлайн-лекциям",
      "Базовые материалы и чек-листы",
      "Тестирование после каждого модуля",
      "Сертификат участника"
    ],
    icon: Star,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    buttonVariant: "outline" as const
  },
  {
    title: "Продвинутый",
    price: "35 000 ₽",
    duration: "8 недель",
    description: "Углубленное изучение с практическими заданиями.",
    features: [
      "Все из тарифа Базовый",
      "Практические задания с проверкой",
      "Доступ к закрытому чату с экспертами",
      "Групповые воркшопы",
      "Удостоверение о повышении квалификации"
    ],
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
    popular: true,
    buttonVariant: "default" as const
  },
  {
    title: "Профессионал",
    price: "60 000 ₽",
    duration: "12 недель",
    description: "Полное погружение и индивидуальное менторство.",
    features: [
      "Все из тарифа Продвинутый",
      "Индивидуальные консультации (4 часа)",
      "Разбор вашего кейса/поля",
      "Помощь в настройке оборудования",
      "Приоритетная поддержка 24/7",
      "Диплом о профессиональной переподготовке"
    ],
    icon: Award,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    buttonVariant: "outline" as const
  }
];

const Learning = () => {
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>("Продвинутый");
  const { addHistoryItem } = useUserHistory();

  const handleParticipate = (plan: string, price: string) => {
    addHistoryItem({
      type: 'participate',
      title: `Курс: ${plan}`,
      amount: price,
      rawAmount: parseInt(price.replace(/\D/g, '')),
      details: "Заявка на обучение",
      status: 'pending'
    });
    toast.success("Вы записались на курс!", {
      description: `Тариф "${plan}" выбран. Менеджер свяжется с вами.`
    });
  };

  return (
    <div className="space-y-12 pb-16">
      <section className="bg-gradient-to-b from-primary/15 to-background py-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-secondary uppercase tracking-[0.4em] text-sm">Обучение</p>
          <h1 className="text-4xl md:text-5xl font-bold">Учимся и создаём вместе</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Академия АгроПоле объединяет фермеров, инженеров и инвесторов: вебинары, офлайн-полевые школы, акселератор агро-стартапов.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-bold text-center">Программы 2025</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.title} className="rounded-3xl border border-border bg-card p-6 shadow space-y-2">
              <p className="text-sm uppercase text-muted-foreground tracking-wide">{program.duration}</p>
              <h3 className="text-2xl font-semibold">{program.title}</h3>
              <p className="text-muted-foreground">{program.description}</p>
              <p className="text-sm font-medium text-primary">{program.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Стоимость обучения</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий формат обучения в зависимости от ваших целей и уровня подготовки.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricing.map((plan) => {
            const isSelected = selectedPlan === plan.title;
            return (
              <Card
                key={plan.title}
                className={`relative flex flex-col cursor-pointer transition-all duration-300 ${isSelected
                  ? 'border-primary shadow-xl scale-105 z-10 ring-2 ring-primary/20'
                  : 'hover:shadow-lg hover:-translate-y-1'
                  }`}
                onClick={() => setSelectedPlan(plan.title)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Популярный выбор
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${plan.bgColor} flex items-center justify-center mb-4`}>
                    <plan.icon className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl flex justify-between items-center">
                    {plan.title}
                    {isSelected && <Check className="w-6 h-6 text-primary" />}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ {plan.duration}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isSelected ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleParticipate(plan.title, plan.price);
                    }}
                  >
                    {isSelected ? "Выбран" : "Выбрать тариф"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Learning;
