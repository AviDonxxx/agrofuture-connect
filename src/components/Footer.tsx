import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">АгроПоле-242</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Будущее умного сельского хозяйства в Кыргызстане. Объединяем традиции и инновации для устойчивого развития.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  О проекте
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Наши поля
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Результаты
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Присоединиться
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:info@agropole242.kg" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  info@agropole242.kg
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+996555123456" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  +996 555 123 456
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  Бишкек, Кыргызстан
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 АгроПоле-242. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
