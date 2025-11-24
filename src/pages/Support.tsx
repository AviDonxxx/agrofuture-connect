import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bot, Headset, HelpCircle, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AIChat } from "@/components/support/AIChat";
import { SupportAgentChat } from "@/components/support/SupportAgentChat";
import { KnowledgeBase } from "@/components/support/KnowledgeBase";
import { AskQuestion } from "@/components/support/AskQuestion";

export default function Support() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
          Тех-Поддержка для пользователей и клиентов
        </h1>
        <p className="mx-auto max-w-[800px] text-lg text-muted-foreground mb-8">
          Добро пожаловать в раздел поддержки! Здесь вы можете получить помощь по любым вопросам, связанным с нашим сервисом. Вам ответят как опытные специалисты из отдела поддержки, так и интеллектуальная система (ИИ) — выберите удобный для вас способ общения.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Как мы можем помочь вам?</h2>
        <p className="text-center text-muted-foreground mb-2">Задайте свой вопрос — мы рассмотрим его и постараемся быстро помочь!</p>
        <p className="text-center text-muted-foreground mb-2">Выберите, с кем хотите общаться: чат с живым специалистом или разговор с ИИ-помощником.</p>
        <p className="text-center text-muted-foreground mb-8">Здесь всегда можно найти инструкции, советы и ответы на частые вопросы.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Чат с ИИ-помощником</CardTitle>
                  <CardDescription>Мгновенные ответы от интеллектуальной системы</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Начать чат</Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
              <AIChat />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Headset className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Чат с сотрудником поддержки</CardTitle>
                  <CardDescription>Общение с живым специалистом</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Написать в поддержку
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
              <SupportAgentChat />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>База знаний (FAQ)</CardTitle>
                  <CardDescription>Инструкции и ответы на вопросы</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Открыть базу знаний
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <KnowledgeBase />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Задать вопрос</CardTitle>
                  <CardDescription>Отправьте нам сообщение</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Написать сообщение
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AskQuestion />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-8 mb-16">
        <h3 className="text-xl font-semibold mb-6 text-center">Возможности поддержки:</h3>
        <ul className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center md:text-left">
          <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full min-w-10 min-h-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Оперативная помощь по техническим вопросам.</span>
          </li>
          <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full min-w-10 min-h-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Решение проблем с регистрацией, входом в аккаунт, оплатой, функционалом сайта.</span>
          </li>
          <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full min-w-10 min-h-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Обратная связь и предложения по улучшению сервиса.</span>
          </li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Часто задаваемые вопросы</h2>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="general">Общие вопросы</TabsTrigger>
            <TabsTrigger value="account">Аккаунт</TabsTrigger>
            <TabsTrigger value="payment">Оплата</TabsTrigger>
            <TabsTrigger value="technical">Технические вопросы</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Как начать пользоваться сервисом?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Для начала работы зарегистрируйтесь на нашем сайте, подтвердите email и выберите подходящий тарифный план. После этого вы получите доступ ко всем функциям платформы.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Как восстановить доступ к аккаунту?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  На странице входа нажмите "Забыли пароль?" и следуйте инструкциям. На вашу почту придет письмо со ссылкой для сброса пароля.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Мы заботимся о вашем комфорте — наша команда и ИИ всегда на связи!</h2>
      </div>
    </div>
  );
}
