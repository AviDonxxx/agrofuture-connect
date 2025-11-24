import Hero from "@/components/Hero";
import FarmHighlights from "@/components/FarmHighlights";
import StrategicNarrative from "@/components/StrategicNarrative";
import ProblemSolution from "@/components/ProblemSolution";
import Statistics from "@/components/Statistics";
import RoadmapPlan from "@/components/RoadmapPlan";
import InvestmentValue from "@/components/InvestmentValue";
import TechStackSection from "@/components/TechStackSection";
import Team from "@/components/Team";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FarmHighlights />
      <StrategicNarrative />
      <ProblemSolution />
      <Statistics />
      <RoadmapPlan />
      <InvestmentValue />
      <TechStackSection />
      <Team />
      <CallToAction />
    </div>
  );
};

export default Index;
