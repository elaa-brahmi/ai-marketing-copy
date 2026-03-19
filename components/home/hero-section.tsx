import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { MotionDiv, MotionH1, MotionSection } from '../common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import Link from "next/link";

export default function HeroSection(){
    
    return(
       <MotionSection 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-bg"
      >
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-16 md:pb-24 md:pt-20">
            <MotionDiv
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-4 py-1.5 text-xs font-medium font-body text-muted"
            >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
                        <Sparkles className="h-4 w-4"/>
                    </span>
                    <span>
                        <p className="font-medium text-text">AI‑powered marketing copy generator</p>
                    </span>
            </MotionDiv>
            <div className="mt-8">
              <MotionH1
                variants={itemVariants}
                className="max-w-3xl text-balance text-center font-display text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl md:text-5xl"
              >
                    Create compelling <span className="text-accent">marketing copy</span> in seconds
                </MotionH1>
            </div>
           <MotionDiv
                variants={itemVariants}
                className="mt-4 max-w-xl text-center text-base font-body text-muted md:text-lg"
            >
                Transform your product details into high‑converting copy for ads, landing pages, emails, and social campaigns.
            </MotionDiv>
            <div className="mt-8 flex gap-3">
                <Button className="bg-accent hover:bg-accent-hover text-white font-body font-medium text-sm py-2.5 px-5 rounded-md h-auto">
                  <Zap className="size-4" />
                  <span><Link href="/generator">Start generating copy</Link></span>
                  <ArrowRight className="size-4" />
                </Button>
            </div>
            <MotionDiv
                 className="mt-10 flex flex-col items-center gap-2 text-xs font-body text-muted sm:flex-row sm:gap-6 "
            >
                <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-text">4.9/5</span> rating
                </span>
                <span className="hidden text-muted sm:block">•</span>
                <span className="inline-flex items-center gap-2">
                    <span className="text-text">10k+</span> copies generated
                </span>
                <span className="hidden text-muted sm:block">•</span>
                <span className="inline-flex items-center gap-2">
                    <span className="text-text">500+</span> marketers
                </span>
            </MotionDiv>

          </div>
        </MotionSection>
    )
}