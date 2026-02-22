import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";
import { UserActivity } from "@/components/UserActivity";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Главная", to: "/" },
  { label: "Наши поля", to: "/fields" },
  { label: "🌱 AI Консультант", to: "/agro-advisor" },
  { label: "Обучение", to: "/learning" },
  { label: "Результаты", to: "/results" },
  { label: "Регистрация", to: "/register" },
  { label: "Моя активность", to: "/history" },
  { label: "Тех-Поддержка", to: "/support" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[10000] bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Логотип */}
        <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-3 py-2 rounded-full transition-all duration-150 whitespace-nowrap",
                location.pathname === item.to
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/profile">
            <Button variant="outline" size="icon" className="relative">
              <UserActivity />
            </Button>
          </Link>
          <Button asChild size="sm" className="px-5 font-semibold">
            <Link to="/register">Подать заявку</Link>
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-md px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-xl text-sm transition-all",
                location.pathname === item.to
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex-1">
              <Button variant="outline" className="w-full">Профиль</Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
              <Button className="w-full">Подать заявку</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
