import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Sprout, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50/30 to-background px-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <Sprout className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-8xl font-black text-muted-foreground/30">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Страница не найдена</h2>
          <p className="text-muted-foreground leading-relaxed">
            Кажется, это поле ещё не засеяно. Страница не существует или была перемещена.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              На главную
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2" onClick={() => history.back()}>
            <span className="cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Назад
            </span>
          </Button>
        </div>

        <div className="pt-4">
          <p className="text-xs text-muted-foreground">AgroFarm · Кыргызстан</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
