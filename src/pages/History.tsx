import { useState } from "react";
import { useUserHistory, HistoryItemType, HistoryItemStatus } from "@/hooks/useUserHistory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  History,
  ShoppingCart,
  ThumbsUp,
  Lightbulb,
  MessageSquare,
  Megaphone,
  UserPlus,
  Eye,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

function getIcon(type: HistoryItemType) {
  switch (type) {
    case "course":
      return <GraduationCap className="w-5 h-5 text-violet-500" />;
    case "purchase":
      return <ShoppingCart className="w-5 h-5 text-blue-500" />;
    case "support":
      return <ThumbsUp className="w-5 h-5 text-green-500" />;
    case "idea":
      return <Lightbulb className="w-5 h-5 text-yellow-500" />;
    case "message":
      return <MessageSquare className="w-5 h-5 text-purple-500" />;
    case "ad":
      return <Megaphone className="w-5 h-5 text-orange-500" />;
    case "participate":
      return <UserPlus className="w-5 h-5 text-pink-500" />;
    case "view":
      return <Eye className="w-5 h-5 text-muted-foreground" />;
    default:
      return <History className="w-5 h-5 text-muted-foreground" />;
  }
}

function getStatusBadge(status: HistoryItemStatus) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500 hover:bg-green-600">Завершено</Badge>;
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700">
          Ожидание
        </Badge>
      );
    case "viewed":
      return <Badge variant="secondary">Просмотрено</Badge>;
    case "rejected":
      return <Badge variant="destructive">Отклонено</Badge>;
    default:
      return null;
  }
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export default function HistoryPage() {
  const { history } = useUserHistory();
  const [filterType, setFilterType] = useState<HistoryItemType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<HistoryItemStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = history.filter((item) => {
    if (filterType !== "all" && item.type !== filterType) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-16">
      <section className="bg-gradient-to-b from-slate-500/10 to-background py-12">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Курсы, покупки, поддержка
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">Моя активность</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Здесь отображается всё, что вы сделали: заявки на курсы, покупки, обращения в поддержку — с датой и временем.
          </p>
        </div>
      </section>

      <div className="container py-8 max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Input
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterType} onValueChange={(v: HistoryItemType | "all") => setFilterType(v)}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="course">Курсы</SelectItem>
              <SelectItem value="purchase">Покупки</SelectItem>
              <SelectItem value="support">Поддержка</SelectItem>
              <SelectItem value="idea">Идеи</SelectItem>
              <SelectItem value="message">Сообщения</SelectItem>
              <SelectItem value="view">Просмотры</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={(v: HistoryItemStatus | "all") => setFilterStatus(v)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="completed">Завершено</SelectItem>
              <SelectItem value="pending">Ожидание</SelectItem>
              <SelectItem value="viewed">Просмотрено</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">История пуста</p>
              <p className="text-sm mt-1">
                После заявок на курсы, покупок или обращений в поддержку здесь появятся записи с датой и временем.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatDate(item.timestamp)}
                    {item.details ? ` · ${item.details}` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {item.amount && (
                    <span className="font-semibold text-foreground whitespace-nowrap">{item.amount}</span>
                  )}
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
