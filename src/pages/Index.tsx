import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Statistics from "@/components/Statistics";
import Team from "@/components/Team";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSolution />
      <Statistics />
      <Team />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
