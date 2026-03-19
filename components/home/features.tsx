"use client";
import { CheckCircle, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function FeaturesSection(){
     useEffect(() => {
    AOS.init({ once: false, duration: 1000, easing: 'ease-in-out' });
  }, []);
    return(
        <section className="bg-bg">
          <div className="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-2 md:items-start md:py-24">
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Everything you need for <span className="text-primary">perfect copy</span>
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                Our AI understands your product, audience, and goals to generate copy that actually converts. No more writer&apos;s block or expensive copywriters.
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    AI-powered content generation
                  </span>
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Conversion-optimized copy
                  </span>
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Brand voice consistency
                  </span>
                </div>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Industry-specific templates
                  </span>
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Multiple format outputs
                  </span>
                  <span className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Lightning-fast results
                  </span>
                </div>
              </div>
            </div>

            <div data-aos="fade-right" className="md:mt-1">
              <Card className="border border-gray-400 bg-card shadow-none">
                <div className="flex flex-col gap-4 px-6 py-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-accent">AI‑Powered</h3>
                      <p className="text-sm text-muted-foreground">Trained on millions of high‑converting campaigns.</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-5">
                    <p className="text-sm italic leading-6 text-foreground/85">
                      “Transform your fitness journey with our revolutionary workout app. Get personalized training plans, track your progress, and achieve your goals faster than ever before.”
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
    )
}