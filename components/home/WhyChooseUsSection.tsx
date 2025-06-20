import { MotionDiv, MotionH1, MotionH2, MotionSection,MotionSpan } from '../common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import { Card } from '../ui/card'
import { Rocket, Target, Users } from 'lucide-react'

export default function WhyChooseUsSection(){
    return(
        <div className="mt-5 sm:mt-7 md:mt-17 flex flex-col justify-center items-center mx-auto">
            <div>
                <MotionH2
                variants={itemVariants}
                className="font-bold md:text-3xl ">
                    Why Choose Our AI Copy Generator?
                </MotionH2>
            </div>
            <div className="mt-3 md:mt-7 sm:mt-3">
                <MotionSpan variants={itemVariants}
                className="text-gray-600 md:text-xl sm:text-lg text-center">
                    <p className="flex flex-col justify-center items-center">
                        <span>Leverage the power of artificial intelligence to create marketing copy that</span>
                        <span>converts.</span>
                    </p>
                </MotionSpan>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-6 mt-7 md:mt-10 ">
                <Card className="border-none p-6 mx-5 bg-white/70  hover:shadow-xl hover:scale-105
                 transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
                    <span className="rounded-xl bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)] h-12 w-12 p-2 flex 
                    justify-center align-items mx-auto text-center">
                        <Target className="h-8 w-8 text-violet-700 " />
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-gray-800 mb-2">Targeted Messaging </h3>
                    <p className="text-gray-600 text-center">Create compelling copy that resonates with your specific audience and drives conversions</p>
                </Card>
                <Card className="border-none p-6 mx-5 ease-in-out bg-white/70  hover:shadow-xl 
                hover:scale-105 transition-shadow duration-300 flex flex-col items-center justify-center">
                      <span className="rounded-xl bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)] h-12 w-12 p-2 flex 
                    justify-center align-items mx-auto text-center">
                    <Rocket className="h-8 w-8 text-violet-700 mb-4" /> </span>
                    <h3 className="mt-1 text-lg font-semibold text-gray-800 mb-2">Boost Sales </h3>
                    <p className="text-gray-600 text-center">Generate high-converting marketing copy that turns visitors into customers.</p>
 
                </Card>
                <Card className="border-none p-6 mx-5 ease-in-out bg-white/70  hover:shadow-xl hover:scale-105
                 transition-shadow duration-300 flex flex-col items-center justify-center">
                      <span className="rounded-xl bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)] h-12 w-12 p-2 flex 
                    justify-center align-items mx-auto text-center">
                    <Users className="h-8 w-8 text-violet-700 mb-4" /></span>
                    <h3 className="mt-1 text-lg font-semibold text-gray-800 mb-2">Multi-Platform </h3>
                    <p className="text-gray-600 text-center">Perfect for websites, ads, emails, social media, and more marketing channels.</p>
 
                </Card>

            </div>


        </div>
    )
}