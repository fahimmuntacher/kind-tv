import PageLayouts from "./layouts/PageLayouts";
import HeroBanner from "./components/HeroBanner";
import Features from "./components/Features";
import ManagementTools from "./components/ManagementTools";
import ForParents from "./components/ForParents";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <PageLayouts>
     <HeroBanner></HeroBanner>
     <Features></Features>
     <ManagementTools></ManagementTools>
     <ForParents></ForParents>
     <HowItWorks></HowItWorks>
     <PricingSection></PricingSection>
     <CTA></CTA>
    </PageLayouts>
  );
}
