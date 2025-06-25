"use client"
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import * as React from "react"
import { cn } from "@/utils/utils";
import { auth } from '../../lib/firebase/firebaseConfig';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react";
import {signOut} from '../../lib/firebase/auth'
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
export default function Header(){
    const [position, setPosition] = React.useState("bottom")
    const [opened, setMenu] = React.useState(false)
    const [selected, setSelected] = React.useState("Home");
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
      await signOut();
      window.location.href="/sign-up";
    };
    const userName = user?.displayName || user?.email?.split('@')[0] || "User";
    const userEmail = user?.email || "";
    const userAvatar = user?.photoURL || "";
 
    const pathname = usePathname();
    const hideHeader = pathname === "/sign-in" || pathname === "/sign-up";
    if (hideHeader) return null; // Don't render the header at all
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
                <div className="hidden md:flex md:py-auto md:gap-3 me-10 pt-2">
                    <Button
                        value={selected}
                        onClick={setSelected.bind(null, "Home")}
                        onSelect={e => e.preventDefault()}
                        className={cn("rounded-xl p-5 text-sm border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="Home" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
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
                        className={cn(" rounded-xl p-5 text-sm border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="Generator" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
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
                        className={cn(" rounded-xl text-sm p-5 border-none text-gray-500 hover:transition-colors hover:shadow hover:text-indigo-700 hover:bg-violet-200",selected=="History" && "transition-colors shadow text-indigo-700 bg-violet-200" )}
                        >
                            <Link
                            href="/history"
                            >
                            History
                            </Link>
                        </Button>

                   
                            { user && 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex  items-center cursor-pointer space-x-3 rounded-full p-1 transition-colors hover:bg-accent focus:outline-none ">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        }



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
                        <DropdownMenuContent className={cn("w-full min-w-screen transition-all duration-500 ease-in-out me-7",
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
                            className={cn("block mx-3 cursor-pointer py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200",position=="Home" && "transition-colors shadow text-indigo-700 bg-violet-200")}>Home</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Generator"
                            onSelect={e => e.preventDefault()}
                            className={cn("block  mx-3 cursor-pointer  py-2 mb-1 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200 ",position=="Generator" && "shadow transition-colors text-indigo-700 bg-violet-200")}>Generator</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="History"
                            onSelect={e => e.preventDefault()}
                              className={cn("block  mx-3 py-2 cursor-pointer rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200",position=="History" && "shadow transition-colors text-indigo-700 bg-violet-200")}>History</DropdownMenuRadioItem>
                               { user && <DropdownMenuRadioItem value="logout"
                            onSelect={e => e.preventDefault()}
                            onClick={handleLogout}
                              className={cn("block cursor-pointer  mx-3 py-2 rounded-md text-base font-medium hover:transition-colors hover:duration-200 hover:text-indigo-700 hover:bg-violet-200",position=="logout" && "shadow transition-colors text-indigo-700 bg-violet-200")}>log out</DropdownMenuRadioItem>
                               }
                            </DropdownMenuRadioGroup>


                          
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </>
    )
}