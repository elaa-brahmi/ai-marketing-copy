"use client"
import React, { useState } from 'react';
import { ArrowRight, BadgeCheck, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MotionDiv, MotionH1, MotionSection } from '../../../components/common/motion-wrapper'
import { containerVariants, itemVariants } from '@/utils/constants'
import { IconFidgetSpinner } from "@tabler/icons-react";
import { saveCopy } from '../../../lib/copies'
import Link from "next/link";
import { toast } from "sonner"

export default function Generator() {
  const [output, setOutput] = useState<{ description: string, headlines: string[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCopyType, setSelectedCopyType] = useState("general-marketing");
  const [generated, setGenerated] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [lastFormData, setLastFormData] = useState<any>(null);

  const copyTypeOptions = [
    { label: "General Marketing", value: "general-marketing", icon: "🎯" },
    { label: "Website Copy", value: "website-copy", icon: "🌐" },
    { label: "Social Media", value: "social-media", icon: "💬" },
    { label: "Email Campaign", value: "email-campaign", icon: "✉️" },
    { label: "Advertisement", value: "advertisement", icon: "📈" },
  ];
  async function chooseSelection() {
    if (!lastFormData) return;
    const selected = output[selectedVersion];
    const toSave = {
      ...lastFormData,
      description: selected.description,
      headlines: selected.headlines,
    };
    await saveCopy(toSave);
    toast.success("copy saved!")
  }

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGenerated(false);
    try {
      const formData = new FormData(e.currentTarget);
      const featuresRaw = formData.get("features");
      let features: string[] = [];
      if (typeof featuresRaw === "string") {
        features = featuresRaw
          .split(/\n|,/)
          .map((f) => f.trim())
          .filter((f) => f.length > 0);
      }
      const data = {
        productName: formData.get("productName"),
        category: formData.get("category"),
        features,
        audience: formData.get("audience"),
        tone: formData.get("tone"),
        copyType: formData.get("copyType"),
      };
      setLastFormData(data);

      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Unknown error");
      setOutput(json.output);
      setGenerated(true);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
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
              <Sparkles className="h-4 w-4 text-accent" />
              <p className="text-xs font-medium text-text">
                AI marketing copy generator
              </p>
            </MotionDiv>
            <MotionH1
              variants={itemVariants}
              className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl"
            >
              Create compelling marketing copy
            </MotionH1>
            <p className="mt-3 max-w-md text-sm font-body text-muted">
              Fill in your product details and let AI create high‑converting marketing
              copy for you.
            </p>
          </div>
          <div className="hidden md:block">
            <Button className="h-auto rounded-md border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body font-medium text-text transition-colors duration-150 hover:bg-black/[0.04]">
              <BadgeCheck className="mr-2 h-4 w-4" />
              <Link href="/history">View history</Link>
            </Button>
          </div>
        </div>
      </MotionSection>
      <div className="bg-bg">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-16 pt-10 md:flex-row">
          <div className="flex w-full flex-col rounded-lg border border-black/[0.08] bg-surface p-6">
            <h2 className="flex items-center text-xl font-semibold text-text">
              <Zap className="mr-2 h-5 w-5 text-accent" />
              Product information
            </h2>
            <form onSubmit={handleForm} className="mt-6 space-y-5">
              <div className="w-full">
                <h3 className="mb-1.5 block text-sm font-body font-medium text-text">
                  Product name *
                </h3>
                <input
                  className="w-full rounded-lg border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  type="text"
                  minLength={5}
                  name="productName"
                  placeholder="e.g. FitTracker Pro"
                  required
                />
              </div>
              <div className="w-full">
                <h3 className="mb-1.5 block text-sm font-body font-medium text-text">
                  Product category *
                </h3>
                <select
                  name="category"
                  id="category"
                  className="w-full rounded-lg border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="technology-software">Technology & Software</option>
                  <option value="health-fitness">Health & Fitness</option>
                  <option value="fashion-apparel">Fashion & Apparel</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="education-training">Education & Training</option>
                  <option value="finance-insurance">Finance & Insurance</option>
                  <option value="travel-tourism">Travel & Tourism</option>
                  <option value="home-garden">Home & Garden</option>
                  <option value="beauty-cosmetics">Beauty & Cosmetics</option>
                  <option value="entertainment-media">Entertainment & Media</option>
                  <option value="business-services">Business Services</option>
                  <option>other</option>
                </select>
              </div>
              <div className="w-full">
                <h3 className="mb-1.5 block text-sm font-body font-medium text-text">
                  Product features & benefits *
                </h3>
                <textarea
                  name="features"
                  className="w-full rounded-lg border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="List key features or benefits, separated by commas or new lines"
                />
              </div>
              <div className="w-full">
                <h3 className="mb-1.5 block text-sm font-body font-medium text-text">
                  Target audience (optional)
                </h3>
                <input
                  name="audience"
                  className="w-full rounded-lg border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  type="text"
                  placeholder="e.g. Fitness enthusiasts"
                  required
                />
              </div>
              <div className="w-full">
                <h3 className="mb-1.5 block text-sm font-body font-medium text-text">
                  Tone of voice
                </h3>
                <select
                  name="tone"
                  id="tone"
                  className="w-full rounded-lg border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="exciting">Exciting</option>
                  <option value="luxurious">Luxurious</option>
                  <option value="playful">Playful</option>
                  <option value="authoritative">Authoritative</option>
                </select>
              </div>
              <div className="w-full">
                <h3 className="mb-2 block text-sm font-body font-medium text-text">
                  Copy type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {copyTypeOptions.map((item) => (
                    <label
                      key={item.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border border-black/[0.08] bg-surface p-3 text-sm font-body transition-colors hover:bg-black/[0.02] ${selectedCopyType === item.value
                          ? "border-accent bg-accent text-white hover:bg-accent-hover"
                          : ""
                        } ${item.value === "advertisement" ? "col-span-2" : ""}`}
                    >
                      <input
                        type="radio"
                        name="copyType"
                        value={item.value}
                        className="hidden"
                        checked={selectedCopyType === item.value}
                        onChange={() => setSelectedCopyType(item.value)}
                      />
                      <div className="text-base">{item.icon}</div>
                      <span
                        className={
                          selectedCopyType === item.value
                            ? "font-medium text-white"
                            : "font-medium text-text"
                        }
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <Button
                className="mt-6 flex h-auto w-full items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-body font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
              >
                <Sparkles className="h-5 w-5 text-white" />
                <span className="ml-2 md:text-sm">Generate marketing copy</span>
                <ArrowRight className="ml-2 h-4 w-4 text-white" />
              </Button>
            </form>
          </div>
          <div className="w-full rounded-lg border border-black/[0.08] bg-surface p-6">
            <h2 className="flex items-center text-xl font-semibold text-text">
              <Target className="mr-2 h-5 w-5 text-accent" />
              Generated copy
            </h2>
            <div className="mt-4 flex flex-col items-center">
              {loading ? (
                <IconFidgetSpinner className="mt-5 h-10 w-10 animate-spin text-accent" />
              ) : error ? (
                <p className="text-sm font-body text-red-600">{error}</p>
              ) : generated ? (
                output.length > 0 ? (
                  <div className="mt-2 w-full text-left">
                    <Button
                      onClick={chooseSelection}
                      className="mb-4 h-auto rounded-md border border-black/[0.08] bg-surface px-4 py-2 text-xs font-body font-medium text-text transition-colors duration-150 hover:bg-black/[0.02]"
                    >
                      save version
                    </Button>
                    {output.map((gen, index) => (
                      <label
                        key={index}
                        className={`mt-4 block cursor-pointer rounded-lg border p-4 transition-colors ${selectedVersion === index
                            ? "border-accent bg-accent/5"
                            : "border-black/[0.08] hover:border-black/[0.16]"
                          }`}
                      >
                        <input
                          type="radio"
                          name="generated_copy_version"
                          className="hidden"
                          checked={selectedVersion === index}
                          onChange={() => setSelectedVersion(index)}
                        />
                        <div className="max-w-prose text-sm font-body leading-relaxed text-text">
                          <h3 className="text-sm font-semibold text-text">
                            Description
                          </h3>
                          <p className="mt-1 text-sm">{gen.description}</p>
                          <h3 className="mt-4 text-sm font-semibold text-text">
                            Headlines
                          </h3>
                          <ul className="mt-1 list-disc list-inside">
                            {gen.headlines.map((headline, hIndex) => (
                              <li key={hIndex} className="text-sm">
                                {headline}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-body text-muted">
                    No results found. Please try different inputs.
                  </p>
                )
              ) : (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </span>
                  <p className="mt-4 text-sm font-body text-muted">
                    Fill in the form to generate your marketing copy.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}