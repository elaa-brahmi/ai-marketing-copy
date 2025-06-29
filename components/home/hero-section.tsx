import { ArrowRight, Dot, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { MotionDiv, MotionH1, MotionH2, MotionSection,MotionSpan } from '../common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import Link from "next/link";

export default function HeroSection(){
    
    return(
       <MotionSection 
        variants={containerVariants}
        initial="hidden"
        animate="visible" className="bg-blue-100/40 w-full flex flex-col justify-center items-center mx-auto">
             <MotionDiv
                variants={itemVariants} className="flex rounded-3xl bg-gradient-to-r from-violet-100/50 via-violet-200/50 to-violet-300/50 px-4 p-2 m-4">
                <span className="h-8 w-8 rounded-xl  p-1">
                        <Sparkles className="h-6 w-6 text-indigo-700"/>
                    </span>
                    <span>
                        <p className=" ms-3 font-semibold text-indigo-700">AI-Powered Marketing Copy Generator</p>
                    </span>
            </MotionDiv>
            <div>
              <MotionH1
                variants={itemVariants} className="sm:leading-9 md:leading-15 md:text-6xl sm:text-4xl font-bold text-center">
                    Create Compelling<div className="w-100"></div>
                    <span className="my-10 text-violet-700">Marketing Copy</span><div className="w-100"></div>
                    in Seconds
                </MotionH1>
            </div>
           <MotionDiv
                variants={itemVariants} className="mt-6 mb-6 sm:mb-6 md:mb-6  mx-2 ">
                <span className="flex flex-col items-center md:text-1.5xl sm:text-xl  text-gray-700">
                    <span> Transform your product details into high-converting marketing copy with</span>
                    <span >our advanced AI. Perfect for ads, websites, emails, and social media </span>
                    <span >campaigns.</span> 
                </span>
            </MotionDiv>
            <div className="sm:mt-5 ">
                <Button
                className="flex items-center p-3  bg-white/70  font-semibold 
                rounded-full px-8 py-8 hover:shadow-lg ">
                    <Zap className="h-10 w-10 text-violet-700 animate-bounce"/>
                    <span className="text-violet-700 md:text-xl"><Link href="/generator">Start Generating Copy</Link></span>
                    <ArrowRight className="h-10 w-20 text-violet-700"/>
                </Button>
               
            </div>
            <MotionDiv
                 className="mt-7 pb-10 md:flex md:flex-row md:gap-10 sm:flex-col justify-between gap-1 items-center sm:gap-3 ">
                <span className="flex items-center gap-1 text-gray-700">
                    <Star className="w-4 h-4 text-blue-400" />
                    4.9/5 rating
                </span>
                <Dot className="w-9 h-9 text-gray-300" />
                <span className="flex items-center gap-1 text-gray-700">
                    <span>10k+</span> copies generated
                </span>
                <Dot className="w-9 h-9 text-gray-300" />

                <span className="flex items-center gap-1 text-gray-700">
                    <span>500+</span> happy marketers
                </span>


                
            </MotionDiv>

        </MotionSection>
    )
}