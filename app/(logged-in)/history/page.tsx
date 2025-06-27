"use client"
import { auth } from '../../../lib/firebase/firebaseConfig';
import React, { useState, useEffect } from 'react';
import {getAllCopies,removeCopies,deleteCopyById} from '../../../lib/copies'
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeCheck, Calendar, Check, Copy, History, Sparkles, Speech, Tag,FilePlus, Target, Trash, Zap } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MotionDiv, MotionH1, MotionSection } from '../../../components/common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import {formatDistanceToNow} from 'date-fns'
import { toast } from "sonner"

export  default   function history(){
    const [user, loading, error] = useAuthState(auth);
    const [copied,setCopied]=useState(false);
    const [copies, setCopies] = useState<any[]>([]);
  
        async function fetchCopies() {
          try {
            if(user){
            const result = await getAllCopies(user.uid);
            console.log(result);
            setCopies(result);}
          } catch (e) {
            // handle error
          }
        }
        useEffect(() => {
            if (user) fetchCopies();
          }, [user]);
      async function deleteCopy(id:string){
        console.log("delete");
        await deleteCopyById(id);
        fetchCopies();
        toast.success("copy deleted")
      }
      function copyText(){
        const el=document.getElementById("TextToCopy");
        if(el){
            const text=el.innerText;
            navigator.clipboard.writeText(text);
            setCopied(true);
        }
      }
      async function removeAll(){
        try {
            if(user){
            await removeCopies(user.uid);
          }
          } catch (e) {
            console.log(e);
          }
        

      }
    

   
    return(
        <>
        <MotionSection
        variants={containerVariants}
        initial="hidden"
        animate="visible" className=" md:flex md:justify-between  mt-7  overflow-x-hidden">
          <div className="flex flex-col items-start justify-start ms-13 me-15">
          <MotionDiv
                variants={itemVariants} className=" flex rounded-3xl bg-gradient-to-r from-violet-100/30 via-blue-200/50 to-blue-300/50 px-4 p-2 ">
                        <History className="h-6 w-6 rounded-xl text-indigo-700 inline"/>
                        <p className=" ms-3 text-sm font-semibold text-indigo-700">Generation History</p>
            </MotionDiv>
            <MotionH1
                variants={itemVariants}
                className="font-bold md:text-3xl text-2xl my-5 text-center">Your Copy Generations</MotionH1>
            <p className="text-gray-700">View and manage all your generated marketing copy</p>
          </div>
          <div className="md:me-15">
            <Button className="rounded-lg sm:mt-10 sm:ms-10 p-3 cursor-pointer ms-10 mt-7" 
            onClick={removeAll}>
              <Trash className="inline me-2" />
             Clear All</Button>
          </div>
          </MotionSection>
          <div className="flex flex-col mt-7 md:mt-15 gap-8 ms-13 me-15">
            {copies && copies.length==0 &&
           <div className="flex flex-col items-center justify-center text-center px-4">
           <div className="bg-white rounded-full shadow-2xl p-12 mb-6">
             <FilePlus className="w-16 h-16 text-purple-600" />
           </div>
           <h2 className="text-2xl font-semibold text-purple-600 mb-2">
             No copies generated yet
           </h2>
           <p className="text-gray-500 mb-4">
             Start creating your first copy to see it appear here.
           </p>
           <div className="flex space-x-2">
             <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
             <span className="w-2 h-2 bg-purple-200 rounded-full animate-pulse [animation-delay:.2s]"></span>
             <span className="w-2 h-2 bg-purple-200 rounded-full animate-pulse [animation-delay:.4s]"></span>
           </div>
         </div>}
           { copies && copies.length>0 && (copies).map((copy:any,index)=>(
            
             <React.Fragment key={index}>
                <div  className="flex flex-col">
                    <h2
                    className="block w-fit font-bold text-xl underline bg-gradient-to-r from-blue-400 via-violet-400 to-purple-800 bg-clip-text text-transparent"
                    >{copy.productName}</h2>
                    <div className=" mt-8 flex flex-col md:flex  md:flex-row sm:gap-4 md:gap-8">
                         <span className="font-semibold"><Calendar className="inline me-1 w-4 h-4"/>
                         {formatDistanceToNow(
                            copy.createdAt?.toDate ? copy.createdAt.toDate() : new Date(),
                            { addSuffix: true }
                        )}
                        </span> 
                        <span className="font-semibold">
                            <Tag className="inline me-1 w-4 h-4"/>
                            {copy.category}</span>
                            <span className="font-semibold">
                            <Speech className="inline me-1 w-4 h-4"/>
                            {copy.tone}</span>
                            <span className="font-semibold">
                            {copy.copyType}</span>
                    </div>
                    <div className="rounded-lg flex flex-col items-start mt-7 p-4
                    bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)]">
                        <div className="flex justify-between w-full">
                        <h3 className="mb-4 font-semibold">Product Features:</h3>
                        <Trash
                        onClick={()=>deleteCopy(copy.id)}
                        className=" w-5 h-5  cursor-pointer"/></div>
                        <span>

                            {copy.features}</span>
                        <span className="text-sm text-gray-600 mt-5 w-full flex justify-between">
                            <span>Target: {copy.audience}</span>
                           
                        </span>
                    </div>
                    <div className="mt-7">
                        <h3 className="font-semibold">Generated Copy</h3>
                        <div id="TextToCopy" className="rounded-lg flex flex-col items-start mt-4 p-4
                    bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)]">
                       <span >
                        {copy.description}</span> 
                      
                       <ul>
                        {copy.headlines && copy.headlines.map((headline: string, index: number) => (
                            <li key={index}>{headline}</li>
                        ))}
                        </ul>
                        <span className="  w-full text-end flex justify-end items-end">
                            <span >
                                {copied ?
                                <Check  className="w-5 h-5"/> :  <Copy
                                onClick={copyText}
                                className="w-5 h-5 cursor-pointer"/>
                                }</span>
                               
                            </span>
                    </div>
                    </div>
                </div>
                {index !== copies.length - 1 && (
                <hr className="my-8 border-t border-gray-300" />
                )}
                </React.Fragment>

            ))}

          </div>
          </>
    )
}