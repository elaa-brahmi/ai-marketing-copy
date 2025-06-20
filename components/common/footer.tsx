import { Sparkles } from "lucide-react";

export default function Footer(){
    return(
        <div className="px-5 mt-10 py-10 bg-blue-100/40 w-full flex flex-col 
        md:leading-15 items-center justify-center">
            <span className="flex items-start gap-2 ">
                    <span className="md:h-9 md:w-9 sm:h-6 sm:w-6 rounded-xl bg-gradient-to-br from-violet-900 via-violet-500 to-rose-200 p-1">
                        <Sparkles className="md:h-7 md:w-7 sm:w-4 sm:h-4 text-white"/>
                    </span>
                    <span>
                        <h1 className="md:text-2xl text-purple-700 font-semibold ">CopyAI Pro</h1>
                    </span>
            </span>
            <span className="text-gray-500">AI-powered marketing copy generation for modern businesses</span>
            <span  className="text-gray-700 text-sm">© 2025 CopyAI Pro. All rights reserved.</span>
        </div>
    )
}