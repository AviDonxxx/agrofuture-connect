import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(9, "Введите номер телефона"),
  password: z.string().min(8, "Пароль минимум 8 символов"),
  focus: z.string().min(5, "Расскажите больше о себе"),
});

type FormValues = z.infer<typeof formSchema>;

const roleConfigs = [
  {
    id: "farmer",
    title: "Фермер",
    description: "Получайте AI-рекомендации и оборудование для точного земледелия.",
    focusLabel: "Что выращиваете и какие площади?",
    focusPlaceholder: "Например: 12 га пшеницы и 4 га картофеля в Чуйской области...",
  },
  {
    id: "developer",
    title: "Разработчик",
    description: "Создавайте модели, телеметрию и цифровые сервисы для агро-команд.",
    focusLabel: "На чём специализируетесь?",
    focusPlaceholder: "Пример: Python, edge AI, IoT, React, data science...",
  },
  {
    id: "sponsor",
    title: "Спонсор",
    description: "Инвестируйте в поля, оборудование и обучение фермеров.",
    focusLabel: "Какую поддержку готовы предоставить?",
    focusPlaceholder: "Финансирование, поставки оборудования, менторство...",
  },
];

type RoleId = (typeof roleConfigs)[number]["id"];

interface RegistrationFormsProps {
  highlightRole?: string | null;
}

const RegistrationForms = ({ highlightRole }: RegistrationFormsProps = {}) => {
  return (
    <section className="py-16" id="registration">
      <div className="container mx-auto px-4 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm uppercase tracking-widest text-secondary">Регистрация</p>
          <h2 className="text-4xl font-bold">Присоединяйтесь к экосистеме</h2>
          <p className="text-muted-foreground text-lg">
            Заполните форму — команда АгроПоле свяжется в течение 24 часов, чтобы провести онбординг и подобрать программу поддержки.
          </p>
          <p className="text-sm text-muted-foreground">
            *Все поля временно сохраняются в Local Storage — так вы можете продолжить заполнение позже или экспортировать заявку.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roleConfigs.map((config) => (
            <RoleForm key={config.id} config={config} isHighlighted={highlightRole === config.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoleForm = ({
  config,
  isHighlighted,
}: {
  config: (typeof roleConfigs)[number];
  isHighlighted?: boolean;
}) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      focus: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setSubmitted(true);
    toast({
      title: `${config.title}: заявка отправлена`,
      description: `${values.fullName}, команда свяжется с вами по адресу ${values.email}`,
    });
    persistRegistration(config.id, values);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      className={`rounded-3xl border bg-card p-6 shadow-lg space-y-4 transition-all ${
        isHighlighted ? "border-primary ring-4 ring-primary/20" : "border-border"
      }`}
    >
      <div>
        <h3 className="text-2xl font-semibold">{config.title}</h3>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Полное имя</FormLabel>
                <FormControl>
                  <Input placeholder="Айзада Мырзакматова" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+996 555 123 456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="минимум 8 символов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.focusLabel}</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder={config.focusPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {submitted ? "Отправлено" : "Отправить заявку"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForms;

const persistRegistration = (roleId: RoleId, values: FormValues) => {
  if (typeof window === "undefined") return;
  try {
    const key = `agropole_${roleId}_registrations`;
    const payload = {
      ...values,
      role: roleId,
      submittedAt: new Date().toISOString(),
    };
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    current.push(payload);
    window.localStorage.setItem(key, JSON.stringify(current));
  } catch (error) {
    console.error("Не удалось сохранить данные регистрации", error);
  }
};

