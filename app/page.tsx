import Image from "next/image";
import styles from "./page.module.css";
import { Features } from "tailwindcss";
import HeroSection from "@/components/home/hero-section";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import FeaturesSection from "@/components/home/features";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StartSection from "@/components/home/StartSection";

export default function Home() {
  return (
   <div>
    <div className="flex-col">
      <HeroSection/>
      <WhyChooseUsSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <StartSection/>

    </div>
   </div>
  );
}
