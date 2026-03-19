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
import { IconFidgetSpinner } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react";
import {signOut} from '../../lib/firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const Header = () => {
    const [position, setPosition] = React.useState("bottom")
    const [opened, setMenu] = React.useState(false)
    const [user, loading, error] = useAuthState(auth);
    const pathname = usePathname();
    const hideHeader = pathname === "/sign-in" || pathname === "/sign-up";
    

    
    if(loading){
      return (<IconFidgetSpinner className="animate-spin w-8 h-8 mt-10 mx-auto" />);
    }
    
    if (hideHeader) return null;
    const handleLogout = async () => {
      await signOut();
      window.location.href="/sign-up";
    };
    const userName = user?.displayName || user?.email?.split('@')[0] || "User";
    const userEmail = user?.email || "";
    const userAvatar = user?.photoURL || "";

    return (
        <>
            <div className="sticky top-0 z-50 border-b border-black/[0.08] bg-bg">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
                <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
                        <Sparkles className="h-5 w-5" />
                    </span>
                    <span>
                        <h1 className="font-display text-lg font-semibold tracking-tight text-text">
                          CopyAI Pro
                        </h1>
                    </span>
                </span>
                <div className="hidden items-center gap-3 md:flex">
                    <Button
                        variant="ghost"
                        className={cn(
                          "h-9 rounded-md px-3 text-sm font-medium font-body text-muted hover:text-text",
                          pathname === "/" && "bg-black/[0.04] text-text"
                        )}
                        >
                             <Link href="/">Home</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                          "h-9 rounded-md px-3 text-sm font-medium font-body text-muted hover:text-text",
                          pathname === "/generator" && "bg-black/[0.04] text-text"
                        )}
                        >
                            <Link href="/generator">Generator</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                          "h-9 rounded-md px-3 text-sm font-medium font-body text-muted hover:text-text",
                          pathname === "/history" && "bg-black/[0.04] text-text"
                        )}
                        >
                            <Link href="/history">History</Link>
                    </Button>
                    { user && 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1 text-sm font-body transition-colors hover:bg-black/[0.04] focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-black/[0.06] text-text">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none text-text">{userName}</p>
                <p className="text-xs text-muted">{userEmail}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 border border-black/[0.08] bg-surface shadow-none" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-text">{userName}</p>
                <p className="text-xs leading-none text-muted">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
           
           
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-xs text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        }
                </div>
                <div className="flex md:hidden">
                    <DropdownMenu
                    open={opened} onOpenChange={setMenu}  
                   >
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="outline"
                            className={cn("h-9 px-3 rounded-md border border-black/[0.08] bg-surface text-sm font-medium font-body text-text")}
                            > {opened? "X" : "☰"} </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={cn(
                            "w-full min-w-screen me-7 overflow-hidden border border-black/[0.08] bg-surface shadow-none",
                            opened ? "opacity-100 " : "opacity-0")}> 
                            <DropdownMenuSeparator />
                            <hr className={cn("w-full pb-2 text-black/[0.08]",opened ? "block" : "hidden")}></hr>
                            <DropdownMenuRadioGroup value={position}
                            onValueChange={setPosition}
                            className="flex-1 justify-center items-center">
                            <DropdownMenuRadioItem
                            value="Home"
                            className={cn("mb-1 block mx-3 cursor-pointer rounded-md py-2 text-base font-medium font-body text-muted hover:bg-black/[0.04] hover:text-text",pathname==="/" && "bg-black/[0.04] text-text")}
                            ><Link href="/">Home</Link>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Generator"
                            className={cn("mb-1 block mx-3 cursor-pointer rounded-md py-2 text-base font-medium font-body text-muted hover:bg-black/[0.04] hover:text-text",pathname==="/generator" && "bg-black/[0.04] text-text")}
                            ><Link href="/generator">Generator</Link></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="History"
                              className={cn("block mx-3 cursor-pointer rounded-md py-2 text-base font-medium font-body text-muted hover:bg-black/[0.04] hover:text-text",pathname==="/history" && "bg-black/[0.04] text-text")}
                            ><Link href="/history">History</Link></DropdownMenuRadioItem>
                               { user && <DropdownMenuRadioItem value="logout"
                            onClick={handleLogout}
                              className={cn("block mx-3 cursor-pointer rounded-md py-2 text-base font-medium font-body text-muted hover:bg-black/[0.04] hover:text-text",position=="logout" && "bg-black/[0.04] text-text")}>log out</DropdownMenuRadioItem>
                               }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div></div>
        </>
    )
}
export default React.memo(Header);