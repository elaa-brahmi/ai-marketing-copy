'use client';

import { useEffect } from 'react';
import { animate, stagger } from 'motion';
import { useInView } from 'react-intersection-observer';

import { MotionH2, MotionSpan } from '../common/motion-wrapper';
import { containerVariants, itemVariants } from '@/utils/constants';
import { Card } from '../ui/card';
import { Rocket, Target, Users } from 'lucide-react';

export default function WhyChooseUsSection() {
  const { ref, inView } = useInView({
    triggerOnce:false,
    threshold: 0.8, // adjust how much should be visible to trigger
  });

  useEffect(() => {
    if (inView) {
      animate('.animated-card', { opacity: 1, y: [50, 0] }, { delay: stagger(0.1) });
    }
  }, [inView]);

  return (
    <div className="md:mx-10 my-5  sm:mt-7 md:mt-17 flex flex-col justify-center items-center ">
      <div>
        <MotionH2 variants={itemVariants} className="font-bold md:text-3xl">
          Why Choose Our AI Copy Generator?
        </MotionH2>
      </div>

      <div className="mt-3 md:mt-7 sm:mt-3">
        <MotionSpan variants={containerVariants} className="text-gray-600 md:text-xl sm:text-lg text-center">
          <p className="flex flex-col justify-center items-center">
            <span>Leverage the power of artificial intelligence to create marketing copy that</span>
            <span>converts.</span>
          </p>
        </MotionSpan>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-6 mt-7 md:mt-10"
      >
        {[
          {
            icon: <Target className="h-8 w-8 text-violet-700" />,
            title: 'Targeted Messaging',
            desc: 'Create compelling copy that resonates with your specific audience and drives conversions',
          },
          {
            icon: <Rocket className="h-8 w-8 text-violet-700 mb-4" />,
            title: 'Boost Sales',
            desc: 'Generate high-converting marketing copy that turns visitors into customers.',
          },
          {
            icon: <Users className="h-8 w-8 text-violet-700 mb-4" />,
            title: 'Multi-Platform',
            desc: 'Perfect for websites, ads, emails, social media, and more marketing channels.',
          },
        ].map((card, i) => (
          <Card
            key={i}
            className="animated-card border-none p-6 mx-5 bg-white/70 opacity-0 hover:shadow-xl hover:scale-105 transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center"
          >
            <span className=" rounded-xl bg-[linear-gradient(135deg,_#f0f4ff_0%,_#e0eaff_50%,_#c7d8ff_100%)] h-12 w-12 p-2 flex justify-center  mx-auto " >
              {card.icon}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-center">{card.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
