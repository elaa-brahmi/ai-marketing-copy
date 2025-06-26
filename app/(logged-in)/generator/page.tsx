"use client"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase/firebaseConfig';
import React, { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import { ArrowRight, BadgeCheck, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MotionDiv, MotionH1, MotionSection } from '../../../components/common/motion-wrapper'
import {containerVariants, itemVariants} from '@/utils/constants'
import { IconFidgetSpinner } from "@tabler/icons-react";
import { cn } from "@/utils/utils";
import {saveCopy} from '../../../lib/copies'
export default function Generator(){
  const [output, setOutput] = useState<{description: string, headlines: string[]}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCopyType, setSelectedCopyType] = useState("general-marketing");
  const [generated,setGenerated]=useState(false);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [lastFormData, setLastFormData] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) redirect("/sign-in");
    });
    return () => unsubscribe();
  }, []);

  const copyTypeOptions = [
    { label: "General Marketing", value: "general-marketing", icon: "🎯" },
    { label: "Website Copy", value: "website-copy", icon: "🌐" },
    { label: "Social Media", value: "social-media", icon: "💬" },
    { label: "Email Campaign", value: "email-campaign", icon: "✉️" },
    { label: "Advertisement", value: "advertisement", icon: "📈" },
  ];
  async function chooseSelection(){
    if (!lastFormData) return;
    const selected = output[selectedVersion];
    const toSave = {
      ...lastFormData,
      description: selected.description,
      headlines: selected.headlines,
    };
    await saveCopy(toSave);
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

    return(
        <>
        <MotionSection
        variants={containerVariants}
        initial="hidden"
        animate="visible" className=" md:flex md:justify-between  mt-7  overflow-x-hidden">
          <div className="flex flex-col items-start justify-start ms-10">
          <MotionDiv
                variants={itemVariants} className=" flex rounded-3xl bg-gradient-to-r from-violet-100/30 via-blue-200/50 to-blue-300/50 px-4 p-2 ">
                        <Sparkles className="h-6 w-6 rounded-xl text-indigo-700 inline"/>
                        <p className=" ms-3 text-sm font-semibold text-indigo-700">AI Marketing Copy Generator</p>
            </MotionDiv>
            <MotionH1
                variants={itemVariants}
                className="font-bold md:text-3xl text-2xl my-5 text-center"> Create Compelling Marketing Copy</MotionH1>
            <p className="text-gray-700">Fill in your product details and let AI create high-converting marketing copy for you</p>
          </div>
          <div className="md:me-15">
            <Button className="rounded-lg sm:mt-10 sm:ms-10 p-3 cursor-pointer" >
              <BadgeCheck className="inline me-2" />
              View History</Button>
          </div>
        </MotionSection>
        <div className="flex flex-col md:flex-row ms-10 mt-10 gap-4 sm:gap-7">
          <div className="p-5 pe-10  rounded-2xl w-full flex flex-col">
            <h2 className="font-semibold text-xl">
            <Zap className="h-6 w-6 text-blue-800 animate-bounce inline me-2"/>
              Product Information
            </h2>
            <form onSubmit={handleForm}>
            <div className="rounded-lg w-full mx-5 mt-5">
              <h3 className="text-sm font-semibold text-gray-700">Product Name *</h3>
              <input
              className="w-full me-5 mb-5 mt-3 p-4 bg-violet-200/20 rounded-2xl focus:outline-none
              focus:ring-1 focus:ring-blue-300"
              type="text"
              minLength={5}
              name="productName"
              placeholder="eg . FitTracker Pro"
              required
              />
            </div>
            <div className="rounded-lg w-full mx-5">
              <h3 className="text-sm font-semibold text-gray-700">Product Category *</h3>
              <select name="category" id="category" className="w-full rounded-2xl focus:outline-none
              focus:ring-1 focus:ring-blue-300 me-5 bg-violet-200/20 mb-5 mt-3 p-4">
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
            <div className="rounded-lg w-full mx-5">
              <h3 className="text-sm font-semibold text-gray-700">Product Features & Benefits *</h3>
              <textarea
              name="features"
               className="w-full rounded-2xl focus:outline-none
              focus:ring-1 focus:ring-blue-300 me-5 bg-violet-200/20 mb-5 mt-3 p-4">
              </textarea>
            </div>
            <div className="rounded-lg w-full mx-5">
              <h3 className="text-sm font-semibold text-gray-700">Target Audience (Optional)</h3>
              <input
              name="audience"
              className="w-full me-5 mb-5 mt-3 p-4 bg-violet-200/20 rounded-2xl focus:outline-none
              focus:ring-1 focus:ring-blue-300"
              type="text" minLength={5}
              placeholder="eg . Fitness enthousiasts"
              required
              />
            </div>
            <div className="rounded-lg w-full mx-5">
              <h3 className="text-sm font-semibold text-gray-700">Tone of Voice</h3>
              <select name="tone" id="tone" className="w-full rounded-2xl focus:outline-none
              focus:ring-1 focus:ring-blue-300 me-5 bg-violet-200/20 mb-5 mt-3 p-4">
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="exciting">Exciting</option>
                <option value="luxurious">Luxurious</option>
                <option value="playful">Playful</option>
                <option value="authoritative">Authoritative</option>
              </select>
            </div>
            <div className="rounded-lg w-full mx-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Copy Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {copyTypeOptions.map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer transition-all hover:border-blue-500 ${
                      selectedCopyType === item.value
                        ? "bg-purple-50 border-purple-600"
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
                    <div>{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
              <Button
                className="cursor-pointer mt-7 w-full flex items-center p-3 bg-violet-200/20  font-semibold
                rounded-xl px-8 py-8 hover:shadow-lg ">
                    <Sparkles className="h-12 w-12 text-blue-800"/>
                    <span className="ms-2 text-blue-800 md:text-xl">Generate Marketing Copy</span>
                    <ArrowRight className="ms-2 h-10 w-20 text-blue-800"/>
                </Button>
            </div>
            </form>
          </div>
          <div className="pe-10 rounded-lg w-full mx-5 mt-5">
            <h2 className="font-semibold text-xl"><Target className="inline me-2 text-blue-800 "/>Generated Copy
            </h2>
              <div className="flex flex-col items-center mt-4">
                { loading ? (
                    <IconFidgetSpinner className="animate-spin h-12 w-12 mt-5 text-blue-800"/>
                ) : error ? (
                    <p className="text-lg text-red-500">{error}</p>
                ) : generated ? (
                    output.length > 0 ? (
                        <div className="w-full text-left prose dark:prose-invert">
                          <Button
                            onClick={chooseSelection} className="cursor-pointer">save version</Button>
                        
                            {output.map((gen, index) => (
                                <label key={index} className={`block cursor-pointer mt-6 border rounded-lg 
                                p-4 transition-all ${selectedVersion === index ? 
                                "border-purple-600 bg-violet-200/20 shadow-md" :
                                "border-gray-200 hover:border-gray-400"}`}>
                                    <input 
                                        type="radio"
                                        name="generated_copy_version"
                                        className="hidden"
                                        checked={selectedVersion === index}
                                        onChange={() => setSelectedVersion(index)}
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">Description</h3>
                                        <p className="mt-1 text-sm">{gen.description}</p>
                                        <h3 className="font-bold text-lg mt-4">Headlines</h3>
                                        <ul className="list-disc list-inside mt-1">
                                            {gen.headlines.map((headline, hIndex) => (
                                                <li key={hIndex} className="text-sm">{headline}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </label>
                            ))}
                            </div>
                    ) : (
                         <p className="text-lg text-gray-700">No results found. Please try different inputs.</p>
                    )
                ) : (
                    <>
                        <span className="rounded-4xl shadow-xl bg-gradient-to-br from-blue-100 via-blue-400/80
                            to-blue-400/70 h-14 w-14 p-2 flex justify-center items-center
                            mx-auto text-center">
                          <Sparkles className="h-12 w-12 text-white " />
                       </span>
                        <p className="text-lg text-gray-700 mt-4">Fill in the form to generate your marketing copy</p>
                    </>
                )}
                </div>
              </div>
        </div>
        </>
    )
}