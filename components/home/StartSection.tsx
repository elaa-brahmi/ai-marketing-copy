
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function StartSection(){
    return(
        <section className="bg-bg">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <div className="rounded-lg border border-black/[0.08] bg-surface px-6 py-10 text-center sm:px-10">
              <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">Ready to transform your marketing?</h2>
              <p className="mt-3 text-base font-body text-muted sm:mt-4 sm:text-lg">
                Join thousands of marketers who are already creating better copy with AI.
              </p>
              <div className="mt-8 flex justify-center">
                <Button className="h-auto rounded-md bg-accent px-5 py-2.5 text-sm font-body font-medium text-white transition-colors duration-150 hover:bg-accent-hover">
                  <Zap className="size-4" />
                  <span><Link href="/generator">Generate your first copy</Link></span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
    )
}