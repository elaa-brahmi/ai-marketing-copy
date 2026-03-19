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
    <section className="bg-bg">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
            Loved by marketers worldwide
          </h2>
          <p className="mt-3 text-base font-body text-muted sm:mt-4 sm:text-lg">
            Real teams use CopyAI Pro to ship crisp, on-brand copy faster.
          </p>
        </div>
        <div ref={ref} className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          <Card  className="animated-card border border-gray-400 bg-surface px-6 py-7 opacity-0 shadow-none transition-colors duration-200 hover:border-black/[0.12]">
               <span className="flex" >
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />

               </span>
                <p className="mt-4 text-sm font-body leading-relaxed text-text">
                   <span className="italic">"This AI copy generator transformed our marketing campaigns. We saw a 40% increase in conversions!"</span>
                </p>
                <span className="mt-5 block leading-5">
                <h4 className="text-sm font-semibold text-text">Sarah Chen</h4>
                <span className="text-xs font-body text-muted">Marketing Director</span></span>
                
               </Card>
                <Card  className="animated-card border border-gray-300 bg-card px-6 py-7 opacity-0 shadow-none transition-colors duration-200 hover:border-border">
               <span className="flex" >
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />

               </span>
                <p className="mt-4 text-sm font-body leading-relaxed text-text">
                   <span className="italic">"Amazing tool! It saves me hours of writing and the quality is consistently excellent."</span>
                </p>
                <span className="mt-5 block leading-5">
                <h4 className="text-sm font-semibold text-text">Mike Rodriguez</h4>
                <span className="text-xs font-body text-muted">E-commerce Owner</span></span>
                
               </Card>
                <Card  className="animated-card border border-gray-300 bg-card px-6 py-7 opacity-0 shadow-none transition-colors duration-200 hover:border-border">
               <span className="flex" >
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />
               <Star className="h-4 w-4 text-accent" fill="currentColor" />

               </span>
                <p className="mt-4 text-sm font-body leading-relaxed text-text">
                   <span className="italic">"Game-changer for small businesses. Professional copy without the agency costs."</span>
                </p>
                <span className="mt-5 block leading-5">
                <h4 className="text-sm font-semibold text-text">Emma Thompson</h4>
                <span className="text-xs font-body text-muted">Startup Founder</span></span>
              </Card>
        </div>
      </div>
    </section>
  )
}