"use client"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase/firebaseConfig';
import React, { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import { ArrowRight, Dot, Sparkle, Star, Zap } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MotionDiv, MotionH1, MotionH2, MotionSection,MotionSpan } from '../../../components/common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
export default function Generator(){
    return(
        <>
        <MotionSection 
        variants={containerVariants}
        initial="hidden"
        animate="visible" className="flex flex-col mt-7">
          <div className="flex flex-col items-center justify-center mx-auto">
          <MotionDiv
                variants={itemVariants} className="flex rounded-3xl bg-gradient-to-r from-violet-100/50 via-violet-200/50 to-violet-300/50 px-4 p-2 m-4">
                <span className="h-8 w-8 rounded-xl  p-1">
                        <Sparkle className="h-6 w-6 text-indigo-700"/>
                    </span>
                    <span>
                        <p className=" ms-3 font-semibold text-indigo-700"> <MotionDiv
                variants={itemVariants} className="flex rounded-3xl bg-gradient-to-r from-violet-100/50 via-violet-200/50 to-violet-300/50 px-4 p-2 m-4">
                <span className="h-8 w-8 rounded-xl  p-1">
                        <Sparkle className="h-6 w-6 text-indigo-700"/>
                    </span>
                    <span>
                        <p className=" ms-3 font-semibold text-indigo-700">AI-Powered Marketing Copy Generator</p>
                    </span>
            </MotionDiv></p>
                    </span>
            </MotionDiv>
            <MotionH1
                variants={itemVariants}> Create Compelling Marketing Copy</MotionH1>
            <p>Fill in your product details and let AI create high-converting marketing copy for you</p>

          </div>
          <div></div>
        </MotionSection>
        </>
    )
}