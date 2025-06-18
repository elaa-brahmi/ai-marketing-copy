import Image from "next/image";
import styles from "./page.module.css";
import { Features } from "tailwindcss";
import HeroSection from "@/components/home/hero-section";

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
