import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Sprout, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-secondary/20 p-1.5 rounded-lg">
                <Sprout className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-xl font-bold text-secondary">AgroFarm</span>
            </div>
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              Будущее умного сельского хозяйства в Кыргызстане. Объединяем традиции и инновации для устойчивого развития фермерских хозяйств.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <span>🌱 ЗЕМЛЯ · AI · ФЕРМЕРЫ</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {[
                { label: "Главная", to: "/" },
                { label: "Наши поля", to: "/fields" },
                { label: "AI Консультант", to: "/agro-advisor" },
                { label: "Обучение", to: "/learning" },
                { label: "Результаты", to: "/results" },
                { label: "Тех-Поддержка", to: "/support" },
                { label: "Регистрация", to: "/register" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-primary-foreground/75 hover:text-secondary transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@agrofarm.kg"
                className="flex items-center gap-3 text-primary-foreground/75 hover:text-secondary transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                info@agrofarm.kg
              </a>
              <a
                href="tel:+996555123456"
                className="flex items-center gap-3 text-primary-foreground/75 hover:text-secondary transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                +996 555 123 456
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/75">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                Бишкек, Кыргызстан
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-primary-foreground/20">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-secondary/90 transition-colors"
              >
                Подать заявку
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/50 text-sm">
            © 2025 AgroFarm. Все права защищены.
          </p>
          <p className="text-primary-foreground/40 text-xs">
            AI · Агрономия · Кыргызстан
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
