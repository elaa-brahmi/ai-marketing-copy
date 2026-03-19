"use client"
import { auth } from '../../../lib/firebase/firebaseConfig';
import React, { useEffect, useState } from 'react';
import {getAllCopies,removeCopies,deleteCopyById} from '../../../lib/copies'
import { useAuthState } from "react-firebase-hooks/auth";
import { Calendar, Check, Copy, History, Speech, Tag,FilePlus, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MotionDiv, MotionH1, MotionSection } from '../../../components/common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import {formatDistanceToNow} from 'date-fns'
import { toast } from "sonner"

export  default   function history(){
    const [user] = useAuthState(auth);
    const [copied,setCopied]=useState(false);
    const [copies, setCopies] = useState<any[]>([]);
    useEffect(() => {
    if (user) {
      fetchCopies();
    }
  }, [user]);
    async function fetchCopies() {
      try {
        if(user){
          const result = await getAllCopies(user.uid);
          setCopies(result);}
        } catch (e) {
          setCopies([])
        }
    }
    async function deleteCopy(id:string){
        await deleteCopyById(id);
        fetchCopies();
        toast.success("copy deleted")
    }
     const copyText = () => {
      const el=document.getElementById("TextToCopy");
      if(el){
      navigator.clipboard.writeText(el?.innerText)
      
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
      
        .catch(err => console.error("Failed to copy:", err));
      }
  };
      async function removeAll(){
        try {
            if(user){
            await removeCopies(user.uid);
            fetchCopies();

          }
          } catch (e) {
          }
        

      }
    

   
    return(
        <>
        <MotionSection
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-bg"
        >
          <div className="mx-auto flex max-w-4xl items-start justify-between px-6 pt-16">
            <div className="flex flex-col items-start justify-start">
              <MotionDiv
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-4 py-1.5 text-xs font-body font-medium text-muted"
              >
                <History className="h-4 w-4 text-accent" />
                <p className="text-xs font-medium text-text">Generation history</p>
              </MotionDiv>
              <MotionH1
                variants={itemVariants}
                className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl"
              >
                Your copy generations
              </MotionH1>
              <p className="mt-3 max-w-md text-sm font-body text-muted">
                View and manage all your generated marketing copy.
              </p>
            </div>
            <div className="hidden md:block">
              <Button
                className="h-auto rounded-md border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body font-medium text-text transition-colors duration-150 hover:bg-black/[0.04]"
                onClick={removeAll}
              >
                <Trash className="mr-2 h-4 w-4" />
                Clear all
              </Button>
            </div>
          </div>
        </MotionSection>
        <div className="bg-bg">
          <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-8 px-6 pb-16">
            {copies && copies.length==0 &&
           <div className="flex flex-col items-center justify-center px-4 text-center">
           <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-black/[0.08] bg-surface">
             <FilePlus className="h-8 w-8 text-accent" />
           </div>
           <h2 className="mb-2 font-display text-2xl font-semibold text-text">
             No copies generated yet
           </h2>
           <p className="mb-4 text-sm font-body text-muted">
             Start creating your first copy to see it appear here.
           </p>
           <div className="flex space-x-2">
             <span className="h-2 w-2 rounded-full bg-black/[0.12] animate-pulse"></span>
             <span className="h-2 w-2 rounded-full bg-black/[0.08] animate-pulse [animation-delay:.2s]"></span>
             <span className="h-2 w-2 rounded-full bg-black/[0.06] animate-pulse [animation-delay:.4s]"></span>
           </div>
         </div>}
           { copies && copies.length>0 && (copies).map((copy:any,index)=>(
            
             <React.Fragment key={index}>
                <div  className="flex flex-col rounded-lg border border-black/[0.08] bg-surface p-6">
                    <h2
                    className="block w-fit font-display text-xl font-semibold text-text"
                    >{copy.productName}</h2>
                    <div className="mt-4 flex flex-col md:flex-row sm:gap-4 md:gap-6 text-sm font-body text-muted">
                         <span className="flex items-center gap-1.5">
                         <Calendar className="h-4 w-4 text-accent"/>
                         {formatDistanceToNow(
                            copy.createdAt?.toDate ? copy.createdAt.toDate() : new Date(),
                            { addSuffix: true }
                        )}
                        </span> 
                        <span className="flex items-center gap-1.5">
                            <Tag className="h-4 w-4 text-accent"/>
                            {copy.category}</span>
                            <span className="flex items-center gap-1.5">
                            <Speech className="h-4 w-4 text-accent"/>
                            {copy.tone}</span>
                            <span className="font-semibold">
                            {copy.copyType}</span>
                    </div>
                    <div className="mt-6 flex flex-col items-start rounded-lg border border-black/[0.08] bg-surface p-4">
                        <div className="flex justify-between w-full">
                        <h3 className="mb-2 text-sm font-semibold text-text">Product features</h3>
                        <Trash
                        onClick={()=>deleteCopy(copy.id)}
                        className=" w-4 h-4 text-muted cursor-pointer"/></div>
                        <span className="text-sm font-body text-text">
                            {copy.features}</span>
                        <span className="mt-4 flex w-full justify-between text-sm font-body text-muted">
                            <span>Target: {copy.audience}</span>
                           
                        </span>
                    </div>
                    <div className="mt-7">
                        <h3 className="text-sm font-semibold text-text">Generated copy</h3>
                        <div id="TextToCopy" className="mt-3 flex flex-col items-start rounded-lg border border-black/[0.08] bg-surface p-4">
                       <span className="max-w-prose text-sm font-body leading-relaxed text-text">
                        {copy.description}</span> 
                       <ul className="mt-3 list-disc list-inside text-sm font-body text-text">
                        {copy.headlines && copy.headlines.map((headline: string, index: number) => (
                            <li key={index}>{headline}</li>
                        ))}
                        </ul>
                        <span className="mt-3 flex w-full items-end justify-end">
                            <span >
                                {copied ?
                                <Check  className="w-5 h-5 text-accent"/> :  <Copy
                                onClick={copyText}
                                className="w-5 h-5 cursor-pointer text-muted hover:text-text"/>
                                }</span>
                               
                            </span>
                    </div>
                    </div>
                </div>
                {index !== copies.length - 1 && (
                <hr className="my-6 border-t border-black/[0.06]" />
                )}
                </React.Fragment>

            ))}
          </div>
        </div>
          </>
    )
}