import { CheckCircle, Sparkles } from "lucide-react";
import { Card } from "../ui/card";

export default function FeaturesSection(){
    return(
        <div className=" bg-blue-100/40">
        <div className=" md:mx-10 md:mt-15 md:pt-15 md:pb-15 sm:pt-5  
        sm:mt-8 md:flex md:flex-row md:justify-between md:items-start
        md-gap-8 sm:flex sm:flex-col sm:items-center sm:gap-4 ">
                <div className="ms-5  md:ms-5 flex flex-col justify-start md:items-start gap-4">
                    <h2 className="md:text-3xl text-start font-bold">Everything You Need for 
                        <span
                        className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent">
                       { ' '} Perfect Copy</span>
                    </h2>
                    <p className="md:mt-8 md:text-xl text-gray-600">Our AI understands your product, audience, and goals to generate copy that<br/> actually converts. No more writer's block or expensive copywriters.</p>
                    <div className="md:mt-8 md:flex sm:flex-col items-start gap-4 md:flex-row md:items-between md:justify-start md:gap-8">
                        <div className="flex flex-col gap-4"> 
                            <span>
                                <CheckCircle className="inline mr-2 text-green-500" />
                                AI-powered content generation
                            </span>
                            <span>
                                
                                <CheckCircle className="inline mr-2 text-green-500" />
                                Conversion-optimized copy</span>
                            <span className="sm:mb-4">
                                
                                <CheckCircle className="inline mr-2 text-green-500" />
                                Brand voice consistency</span>
                        </div>
                        <div className="flex flex-col gap-4"> 
                            <span>
                                
                                <CheckCircle className="inline mr-2 text-green-500" />
                                Industry-specific templates</span>
                            <span>
                                
                                <CheckCircle className="inline mr-2 text-green-500" />
                                Multiple format outputs</span>
                            <span>
                                
                                <CheckCircle className="inline mr-2 text-green-500" />
                                Lightning-fast results</span>
                        </div>  
                </div>
            </div>
            <div className="mt-4">
               <Card className=" border-none p-6 mx-5 bg-white/70  hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
               <span className="rounded-4xl shadow-xl bg-gradient-to-br from-violet-900 via-violet-500
                to-rose-200 h-14 w-14 p-2 flex justify-center items-center 
                mx-auto text-center">
               <Sparkles className="h-12 w-12 text-white" />
               </span>
                <h3 className="text-xl font-semibold  text-violet-500">AI-Powered</h3>
                <p className=" text-gray-600 flex flex-col items-center justify-center">
                   <span> Advanced language models trained on millions of high-converting marketing </span>
                    <span>campaigns</span>
                </p>
                <div className=" sm:p-4 md:p-6 rounded-xl bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)]">
                    <p className="text-sm  flex flex-col items-center justify-center italic text-gray-700">
                       <span> "Transform your fitness journey with our revolutionary workout app. 
                        Get personalized </span>
                       <span> training plans, track your progress, and achieve
                         your goals faster than ever before."</span>
                    </p>
                </div>
                
               </Card>
            </div>

        </div></div>
    )
}