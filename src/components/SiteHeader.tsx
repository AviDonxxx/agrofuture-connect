import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";
import { UserActivity } from "@/components/UserActivity";

const navItems = [
  { label: "Главная", to: "/" },
  { label: "Наши поля", to: "/fields" },
  { label: "Лаборатория", to: "/laboratory" },
  { label: "Двойник", to: "/digital-twin" },
  { label: "Маркетплейс", to: "/marketplace" },
  { label: "Обучение", to: "/learning" },
  { label: "Результаты", to: "/results" },
  { label: "Тех-Поддержка", to: "/support" },
  { label: "Регистрация", to: "/register" },
];

const SiteHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-[10000] bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
        <Link to="/" className="shrink-0">
          <BrandLogo />
        </Link>

        <nav className="flex-1 flex flex-wrap items-center gap-4 text-sm md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-3 py-2 rounded-full transition-colors",
                location.pathname === item.to
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="outline" size="icon" className="relative">
              <UserActivity />
            </Button>
          </Link>
          <Button asChild size="lg" className="px-6">
            <Link to="/register">Подать заявку</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
