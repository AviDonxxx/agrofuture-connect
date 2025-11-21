import { Button } from "@/components/ui/button";
import { Sprout, Code2, GraduationCap, TrendingUp } from "lucide-react";

const actions = [
  {
    icon: Sprout,
    title: "Я фермер",
    description: "хочу участвовать",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: Code2,
    title: "Я разработчик",
    description: "хочу создавать решения",
    gradient: "from-secondary to-accent",
  },
  {
    icon: GraduationCap,
    title: "Я студент",
    description: "хочу учиться",
    gradient: "from-primary-light to-primary",
  },
  {
    icon: TrendingUp,
    title: "Я инвестор",
    description: "хочу поддержать",
    gradient: "from-accent to-secondary",
  },
];

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Стань частью революции в сельском хозяйстве
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выбери свой путь и начни менять будущее уже сегодня
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex-col py-8 px-6 border-2 hover:border-primary group transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-lg font-bold text-foreground mb-1">
                  {action.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {action.description}
                </div>
              </Button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Не уверены, с чего начать? Свяжитесь с нами
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Написать нам
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
