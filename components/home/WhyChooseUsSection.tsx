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
    <section className="bg-bg">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <MotionH2
            variants={itemVariants}
            className="font-display text-2xl font-semibold text-text sm:text-3xl"
          >
            Why choose our AI copy generator?
          </MotionH2>

          <MotionSpan
            variants={containerVariants}
            className="mt-3 block text-base font-body text-muted sm:mt-4 sm:text-lg"
          >
            Leverage the power of artificial intelligence to create marketing copy that converts.
          </MotionSpan>
        </div>

        <div
          ref={ref}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: <Target className="h-5 w-5 text-white" />,
              title: 'Targeted messaging',
              desc: 'Create compelling copy that resonates with your specific audience and drives conversions.',
            },
            {
              icon: <Rocket className="h-5 w-5 text-white" />,
              title: 'Boost sales',
              desc: 'Generate high-converting marketing copy that turns visitors into customers.',
            },
            {
              icon: <Users className="h-5 w-5 text-white" />,
              title: 'Multi-platform',
              desc: 'Perfect for websites, ads, emails, social media, and more marketing channels.',
            },
          ].map((card, i) => (
            <Card
              key={i}
              className="animated-card flex flex-col items-center justify-center border border-black/[0.08] bg-surface px-6 py-7 opacity-0 shadow-none transition-colors duration-200 ease-out hover:border-black/[0.12]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-white">
                {card.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-text">{card.title}</h3>
              <p className="mt-2 text-center text-sm font-body leading-relaxed text-muted">{card.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
