
import { ArrowRight, Dot, Sparkle, Star, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function StartSection(){
    return(
        <div className="px-5 leading-10 py-10 md:leading-25 flex flex-col justify-center items-center mt-10 w-full 
        bg-gradient-to-r from-blue-200 via-purple-300 to-purple-500 transition-all duration-500">
            <div>
                <h1 className="md:text-3xl font-bold text-white">Ready to Transform Your Marketing?</h1>
            </div>
            <div className="text-white">Join thousands of marketers who are already creating better copy with AI.
            </div>
            <div><div className="sm:mt-5 ">
                <Button
                className="flex items-center p-3  bg-white  font-semibold 
                rounded-xl px-8 py-8 hover:shadow-lg ">
                    <Zap className="h-12 w-12 text-violet-700"/>
                    <span className="ms-2 text-violet-700 md:text-xl"><Link href="/generator">Generate Your First Copy Now</Link></span>
                    <ArrowRight className="ms-2 h-10 w-20 text-violet-700"/>
                </Button>
               
            </div></div>

        </div>
    )
}