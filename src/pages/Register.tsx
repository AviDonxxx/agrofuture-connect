import { useSearchParams } from "react-router-dom";
import RegistrationForms from "@/components/RegistrationForms";
import { CheckCircle2, Users, Sprout, TrendingUp } from "lucide-react";

const perks = [
  { icon: Sprout, text: "AI-рекомендации по вашему участку" },
  { icon: Users, text: "Сообщество фермеров и специалистов" },
  { icon: TrendingUp, text: "Трекинг урожайности и расходов" },
  { icon: CheckCircle2, text: "Менторская поддержка команды" },
];

const Register = () => {
  const [params] = useSearchParams();
  const role = params.get("role") ?? undefined;

  return (
    <div className="pb-16 space-y-0">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-medium">
                Регистрация
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                Присоединяйтесь к AgroFarm
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Выберите свою роль и заполните форму — команда свяжется в течение
                24 часов для онбординга.
              </p>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.text}
                    className="bg-card border rounded-2xl p-4 text-center space-y-2 shadow-sm"
                  >
                    <div className="flex justify-center">
                      <div className="bg-primary/10 p-2.5 rounded-xl">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {perk.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              * Данные временно сохраняются в браузере (Local Storage). Для
              передачи команде — экспортируйте JSON или сделайте скриншот.
            </p>
          </div>
        </div>
      </section>

      {/* Forms */}
      <RegistrationForms highlightRole={role} />
    </div>
  );
};

export default Register;
