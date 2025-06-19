"use client"
import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import * as React from "react"
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { set } from "react-hook-form";
export default function Header(){
    const [position, setPosition] = React.useState("bottom")
    const [opened, setMenu] = React.useState(false)
    const [selected, setSelected] = React.useState("Home");
    return(
        <>
            <div className="flex  justify-between mt-4 sticky top-0  bg-white/70 z-50 backdrop-blur h-40 mx-3">
                <span className="flex items-start gap-2 py-2 mx-10  ">
                    <span className="h-9 w-9 rounded-xl bg-gradient-to-b from-violet-400 to-violet-700 p-1">
                        <Sparkle className="h-7 w-7 text-white"/>
                    </span>
                    <span>
                        <h1 className="text-3xl bg-gradient-to-r from-violet-700 via-blue-300 to-violet-700 font-bold bg-clip-text text-transparent">CopyAI Pro</h1>
                    </span>
                </span>
                <div className="hidden md:flex md:gap-3 me-7">
                    <Button
                        value={selected}
                        onClick={setSelected.bind(null, "Home")}
                        onSelect={e => e.preventDefault()}
                        className={cn("rounded-xl p-7 text-xl border-none text-gray-500 hover:transition-colors hover:shadow hover:text-blue-700/90 hover:bg-violet-200",selected=="Home" && "transition-colors shadow text-blue-700/90 bg-violet-200" )}
                        >
                            Home
                        </Button>
                        <Button
                        value={selected}
                        onClick={setSelected.bind(null, "Generator")}
                        onSelect={e => e.preventDefault()}
                        className={cn(" rounded-xl p-7 text-xl border-none text-gray-500 hover:transition-colors hover:shadow hover:text-blue-700/90 hover:bg-violet-200",selected=="Generator" && "transition-colors shadow text-blue-700/90 bg-violet-200" )}
                        >
                            Generator
                        </Button>
                        <Button
                        value={selected}
                        onClick={setSelected.bind(null, "History")}
                        onSelect={e => e.preventDefault()}
                        className={cn(" rounded-xl text-xl p-7 border-none text-gray-500 hover:transition-colors hover:shadow hover:text-blue-700/90 hover:bg-violet-200",selected=="History" && "transition-colors shadow text-blue-700/90 bg-violet-200" )}
                        >
                            History
                        </Button>
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
                            className={cn("block mx-3 py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-blue-700/90 hover:bg-violet-200",position=="Home" && "transition-colors shadow text-blue-700/90 bg-violet-200")}>Home</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Generator"
                            onSelect={e => e.preventDefault()}
                            className={cn("block  mx-3  py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-blue-700/90 hover:bg-violet-200 ",position=="Generator" && "shadow transition-colors text-blue-700/90 bg-violet-200")}>Generator</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="History"
                            onSelect={e => e.preventDefault()}
                              className={cn("block  mx-3 py-2 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-blue-700/90 hover:bg-violet-200",position=="History" && "shadow transition-colors text-blue-700/90 bg-violet-200")}>History</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </>
    )
}