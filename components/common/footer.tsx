import { Sparkles } from "lucide-react";

export default function Footer(){
    return(
        <footer className="border-t border-black/[0.08] bg-bg">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-10 text-center">
            <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
                        <Sparkles className="h-5 w-5"/>
                    </span>
                    <span>
                        <h1 className="font-display text-base font-semibold tracking-tight text-text">CopyAI Pro</h1>
                    </span>
            </span>
            <span className="text-sm font-body text-muted">AI‑powered marketing copy generation for modern businesses</span>
            <span className="text-xs font-body text-muted">© 2025 CopyAI Pro. All rights reserved.</span>
          </div>
        </footer>
    )
}