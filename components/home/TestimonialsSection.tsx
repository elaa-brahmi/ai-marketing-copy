"use client";
import { Star } from "lucide-react";
import { Card } from "../ui/card";

import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { animate, stagger } from 'motion';

export default function TestimonialsSection(){
    const { ref, inView } = useInView({
    triggerOnce:false,
    threshold: 0.8, // adjust how much should be visible to trigger
  });

  useEffect(() => {
    if (inView) {
      animate('.animated-card', { opacity: 1, y: [30, 0] }, { delay: stagger(0.1) });
    }
  }, [inView]);
    return(
        <div className=" md:mx-10 flex flex-col justify-center items-center mt-10 ">
            <div>
                <h2
                className="font-bold md:text-3xl text-center"
                >Loved by Marketers Worldwide</h2>
            </div>
            <div ref={ref} className="md:mt-15 grid sm:grid-cols-1 md:grid-cols-3 md:gap-6 gap-3 ">
                <Card  className="animated-card border-none p-6 mx-5 bg-white/70  hover:shadow-xl transition-shadow duration-300 
                ease-in-out flex flex-col items-start justify-center md:leading-6 sm:leading-4">
               <span className="flex" >
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />

               </span>
                <p className="mb-2 text-gray-670 flex flex-col items-start justify-start">
                   <span className="italic">"This AI copy generator transformed our marketing campaigns. We saw a 40% increase in conversions!"</span>
                </p>
                <span className="leading-5">
                <h4 className="font-bold">Sarah Chen</h4>
                <span>Marketing Director</span></span>
                
               </Card>
                <Card  className="animated-card border-none p-6 mx-5 bg-white/70  hover:shadow-xl transition-shadow duration-300 
                ease-in-out flex flex-col items-start justify-center md:leading-6 sm:leading-4 ">
               <span className="flex" >
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />

               </span>
                <p className="mb-2 text-gray-670 flex flex-col items-start justify-start">
                   <span className="italic">"Amazing tool! It saves me hours of writing and the quality is consistently excellent."</span>
                </p>
                <span className="leading-5">
                <h4 className="font-bold">Mike Rodriguez</h4>
                <span>E-commerce Owner</span></span>
                
               </Card>
                <Card  className="animated-card border-none p-6 mx-5 bg-white/70  hover:shadow-xl transition-shadow duration-300 
                ease-in-out flex flex-col items-start justify-center md:leading-6 sm:leading-4">
               <span className="flex" >
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />
               <Star className="h-4 w-4 text-green-500" fill="#22c55e" />

               </span>
                <p className="mb-2 text-gray-670 flex flex-col items-start justify-start">
                   <span className="italic">"Game-changer for small businesses. Professional copy without the agency costs."</span>
                </p>
                <span className="leading-5">
                <h4 className="font-bold">Emma Thompson</h4>
                <span>Startup Founder</span></span>
                
               </Card>
                
            </div>
        </div>
    )
}