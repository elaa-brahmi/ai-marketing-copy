"use client"
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import * as React from "react"
import { cn } from "@/lib/utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../lib/firebase/firebaseConfig';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useEffect } from 'react';
import {signOut} from '../../lib/firebase/auth'
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Header(){
    const [position, setPosition] = React.useState("bottom")
    const [opened, setMenu] = React.useState(false)
    const [selected, setSelected] = React.useState("Home");
    let authenticated=false;
    
    const router = useRouter();

    const handleLogout = async () => {
      await signOut();
      router.push("/sign-up");
      location.reload();
    };
   /*  useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authenticated=true;
             
              console.log(user);
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } 
          });
         
    }, []) */
    if(auth.currentUser){
        console.log("current user ",auth.currentUser);
        authenticated=true;
    }
    return(
        <>
            <div className="flex justify-between sticky top-0  bg-white/70
            z-50 pt-3  backdrop-blur h-18 px-3">
                <span className="flex items-start gap-2 py-2 mx-10">
                    <span className="md:h-9 md:w-9 sm:h-6 sm:w-6 rounded-xl bg-gradient-to-br from-violet-900 via-violet-500 to-rose-200 p-1">
                        <Sparkles className="md:h-7 md:w-7 sm:w-4 sm:h-4 text-white"/>
                    </span>
                    <span>
                        <h1 className="md:text-3xl bg-gradient-to-r from-violet-700 via-blue-300 to-violet-700 font-bold bg-clip-text text-transparent">CopyAI Pro</h1>
                    </span>
                </span>
                <div className="hidden md:flex md:py-auto md:gap-3 me-10">
                    <Button
                        value={selected}
                        onClick={setSelected.bind(null, "Home")}
                        onSelect={e => e.preventDefault()}
                        className={cn("rounded-xl p-7 text-xl border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="Home" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
                        >
                             <Link
                            href="/"
                            >
                            Home
                            </Link>
                            
                        </Button>
                        <Button
                        value={selected}
                        
                        onClick={setSelected.bind(null, "Generator")}
                        onSelect={e => e.preventDefault()}
                        className={cn(" rounded-xl p-7 text-xl border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="Generator" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
                        >
                            <Link
                            href="/generator"
                            >
                            Generator
                            </Link>
                        </Button>
                        <Button
                        value={selected}
                        onClick={setSelected.bind(null, "History")}
                        onSelect={e => e.preventDefault()}
                        className={cn(" rounded-xl text-xl p-7 border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="History" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
                        >
                            <Link
                            href="/history"
                            >
                            History
                            </Link>
                        </Button>

                    { authenticated && 
                        <Button
                        onClick={handleLogout}
                        className={cn(" rounded-xl text-xl p-7 border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="History" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
                        >
                            log out
                        </Button>}


                </div>
                <div className="flex md:hidden mx-3 mt-3">
                    <DropdownMenu
                    open={opened} onOpenChange={setMenu}  
                   >
                        <DropdownMenuTrigger asChild>
                            <Button
                            className={cn(" hover:bg-violet-300 hover:cursor-pointer")}
                            > {opened? "X" : "☰"} </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={cn("w-full transition-all duration-500 ease-in-out me-7",
                            "overflow-hidden bg-white/10 backdrop-blur z-50",
                            opened ? "opacity-100 " : "opacity-0")}>
                            <DropdownMenuSeparator />
                            <hr className={cn("w-full text-gray-300 pb-2  ",opened ? "block" : "hidden")}></hr>
                            <DropdownMenuRadioGroup value={position}
                            onValueChange={setPosition}
                            onSelect={e => e.preventDefault()}
                            className="flex-1 justify-center items-center">
                            <DropdownMenuRadioItem
                            value="Home"
                            onSelect={e => e.preventDefault()}
                            className={cn("block mx-3 py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200",position=="Home" && "transition-colors shadow text-indigo-700 bg-violet-200")}>Home</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Generator"
                            onSelect={e => e.preventDefault()}
                            className={cn("block  mx-3  py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200 ",position=="Generator" && "shadow transition-colors text-indigo-700 bg-violet-200")}>Generator</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="History"
                            onSelect={e => e.preventDefault()}
                              className={cn("block  mx-3 py-2 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200",position=="History" && "shadow transition-colors text-indigo-700 bg-violet-200")}>History</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </>
    )
}