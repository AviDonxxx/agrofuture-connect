import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-field.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Умное сельское хозяйство в Кыргызстане"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Будущее сельского хозяйства Кыргызстана{" "}
            <span className="text-secondary">уже растёт</span> на наших полях
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            24 умных поля × AI-технологии = экономия 40% воды + рост урожая на 30%
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              asChild
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/results">
                Увидеть результаты
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary-dark text-lg px-8 py-6"
            >
              <Link to="/register">Присоединиться к проекту</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full" />
        </div>
      </div>

      {/* Farmland Stripes */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[1]">
        <div
          className="h-full w-full opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, rgba(193,147,74,0.95) 0px, rgba(193,147,74,0.95) 24px, rgba(116,78,40,0.95) 24px, rgba(116,78,40,0.95) 48px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 40%)",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
