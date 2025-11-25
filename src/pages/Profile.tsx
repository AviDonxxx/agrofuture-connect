import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserHistory, HistoryItemType, HistoryItemStatus } from "@/hooks/useUserHistory";
import { History, ShoppingCart, ThumbsUp, Lightbulb, MessageSquare, Megaphone, UserPlus, Eye, Filter, Trash2, Wallet, Activity, Heart } from "lucide-react";

export default function Profile() {
    const { history, clearHistory, getStats } = useUserHistory();
    const stats = getStats();

    const [filterType, setFilterType] = useState<HistoryItemType | 'all'>('all');
    const [filterStatus, setFilterStatus] = useState<HistoryItemStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = history.filter(item => {
        if (filterType !== 'all' && item.type !== filterType) return false;
        if (filterStatus !== 'all' && item.status !== filterStatus) return false;
        if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const getIcon = (type: HistoryItemType) => {
        switch (type) {
            case 'purchase': return <ShoppingCart className="w-4 h-4 text-blue-500" />;
            case 'support': return <ThumbsUp className="w-4 h-4 text-green-500" />;
            case 'idea': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
            case 'message': return <MessageSquare className="w-4 h-4 text-purple-500" />;
            case 'ad': return <Megaphone className="w-4 h-4 text-orange-500" />;
            case 'participate': return <UserPlus className="w-4 h-4 text-pink-500" />;
            case 'view': return <Eye className="w-4 h-4 text-gray-400" />;
            default: return <History className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: HistoryItemStatus) => {
        switch (status) {
            case 'completed': return <Badge className="bg-green-500">Завершено</Badge>;
            case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-500">Ожидание</Badge>;
            case 'viewed': return <Badge variant="secondary">Просмотрено</Badge>;
            case 'rejected': return <Badge variant="destructive">Отклонено</Badge>;
            default: return null;
        }
    };

    const formatDate = (timestamp: number) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(timestamp));
    };

    return (
        <div className="container py-12 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Личный кабинет</h1>
                <Button variant="destructive" size="sm" onClick={clearHistory}>
                    <Trash2 className="w-4 h-4 mr-2" /> Очистить историю
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего потрачено</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString()} сом</div>
                        <p className="text-xs text-muted-foreground">На покупки и аренду</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Активность</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalActions}</div>
                        <p className="text-xs text-muted-foreground">Действий за все время</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Поддержка</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.supportCount}</div>
                        <p className="text-xs text-muted-foreground">Поддержанных проектов</p>
                    </CardContent>
                </Card>
            </div>

            {/* History Section */}
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>История активности</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <Input
                                placeholder="Поиск по названию..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={filterType} onValueChange={(val: any) => setFilterType(val)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Тип действия" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все типы</SelectItem>
                                <SelectItem value="purchase">Покупки</SelectItem>
                                <SelectItem value="support">Поддержка</SelectItem>
                                <SelectItem value="idea">Идеи</SelectItem>
                                <SelectItem value="message">Сообщения</SelectItem>
                                <SelectItem value="view">Просмотры</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={(val: any) => setFilterStatus(val)}>
                            <SelectTrigger className="w-[180px]">
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

                    <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                            {filteredHistory.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>История пуста</p>
                                </div>
                            ) : (
                                filteredHistory.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-background p-2 rounded-full border shadow-sm">
                                                {getIcon(item.type)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span>{formatDate(item.timestamp)}</span>
                                                    {item.details && <span>• {item.details}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {item.amount && (
                                                <span className="font-semibold">{item.amount}</span>
                                            )}
                                            {getStatusBadge(item.status)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
