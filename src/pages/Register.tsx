import { useSearchParams } from "react-router-dom";
import RegistrationForms from "@/components/RegistrationForms";

const Register = () => {
  const [params] = useSearchParams();
  const role = params.get("role") ?? undefined;

  return (
    <div className="pb-16 space-y-12">
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-secondary-foreground">Регистрация</p>
          <h1 className="text-4xl md:text-5xl font-bold">Подать заявку и сохранить профиль</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Форма отправляет данные в локальное хранилище браузера. Так вы можете вернуться, отредактировать и экспортировать профиль перед официальной подачей.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Данные шифруются только на стороне пользователя. Для передачи команде АгроПоле экспортируйте JSON или поделитесь скриншотом. Это быстрый способ протестировать заявку без сервера.
          </p>
        </div>
      </section>

      <RegistrationForms highlightRole={role} />
    </div>
  );
};

export default Register;

