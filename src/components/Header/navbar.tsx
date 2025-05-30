"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMode } from "@/store/Features/currentState/currentStateSlice";
import { RootState } from '@/store/store'
import Loader from "../Loader/loader";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { Icons } from "../icons";

const Navbar = () => {
  const { currentMode, isLoading } = useSelector((state: RootState) => state.currentState);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { data } = useSession()
  const { avatar = "" } = data?.user || {}
  const changeMode = (mode: string) => {
    dispatch(setCurrentMode(mode));
  };

  useEffect(() => {
    if (currentMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentMode]);

  return (
    <>
      {pathname === "/login" || pathname === "/register" || pathname === "/timer" ? (
        <></>
      ) : (
        <header className="sticky top-0 z-40 w-full border-b bg-primary flex flex-row items-center flex flex-row">
          <div className="container flex h-16 items-center justify-between py-2 md:py-4">
            <Link
              href="/"
              className="mr-4 flex items-center space-x-2"
              prefetch={false}
            >
              <span className="font-bold">DSAlgoVault</span>
            </Link>
            <nav className="hidden items-center justify-center space-x-4 md:flex">
              <NavigationMenu className="list-none">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-2 no-marker bg-transparent hover:scale-105 transform transition duration-300">
                    DSA cheat sheets
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none">
                    <div className="grid w-[200px] gap-0 bg-ternary">
                      <NavigationMenuLink
                        href="/dsa/apna-college"
                        className="text-sm text-foreground hover:bg-quaternary p-2 justify-items-center"
                      >
                        Apna College
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/dsa/arsh-goyal"
                        className="text-sm text-foreground hover:bg-quaternary p-2 justify-items-center"
                      >
                        Arsh Goyal
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/dsa/love-babbar"
                        className="text-sm text-foreground hover:bg-quaternary p-2 justify-items-center"
                      >
                        Love Babbar
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/dsa/striver"
                        className="text-sm text-foreground hover:bg-quaternary p-2 justify-items-center"
                      >
                        Striver
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
              <Link
                href="/timer"
                target="_blank"
                className="text-foreground hover:text-muted-foreground"
                prefetch={false}
              >
                <Icons.timer />
              </Link>
              {currentMode == "dark" ? (
                <Icons.lightMode
                  className="size-6 text-foreground hover:text-muted-foreground mx-2 cursor-pointer"
                  onClick={() => changeMode("light")}
                />
              ) : (
                <Icons.darkMode
                  className="size-6 text-foreground hover:text-muted-foreground mx-2 cursor-pointer"
                  onClick={() => changeMode("dark")}
                />
              )}
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="flex flex-col space-y-3 p-4">
                  <Collapsible className="group space-y-2">
                    <CollapsibleTrigger className="flex items-center justify-between">
                      <span>Sheets</span>
                      <ChevronRightIcon className="h-4 w-4 transition-transform transform group-data-[state=open]:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid gap-2 p-4">
                        <Link
                          href="/dsa/apna-college"
                          className="text-muted-foreground hover:text-foreground"
                          prefetch={false}
                        >
                          Apna College
                        </Link>
                        <Link
                          href="/dsa/fraz"
                          className="text-muted-foreground hover:text-foreground"
                          prefetch={false}
                        >
                          Fraz
                        </Link>
                        <Link
                          href="/dsa/love-babbar"
                          className="text-muted-foreground hover:text-foreground"
                          prefetch={false}
                        >
                          Love Babbar
                        </Link>
                        <StriverDropdown />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <div className="flex space-x-2 justify-center">
                    <Link href="/timer" prefetch={false}>
                      <Icons.timer className="cursor-pointer size-6" />
                    </Link>
                    {currentMode == "dark" ? (
                      <Icons.lightMode
                        className="size-6 text-foreground hover:text-muted-foreground mx-2 cursor-pointer"
                        onClick={() => changeMode("light")}
                      />
                    ) : (
                      <Icons.darkMode
                        className="size-6 text-foreground hover:text-muted-foreground mx-2 cursor-pointer"
                        onClick={() => changeMode("dark")}
                      />
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {data?.user &&
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="border-none bg-primary mr-6"
              >
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={`/avatars/Avatar${avatar}.svg`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="w-fit bg-secondary">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-ternary cursor-pointer">
                    <Link href="/my-sheet">My Sheet</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-ternary cursor-pointer">
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-ternary" />
                <DropdownMenuItem
                  className="hover:bg-ternary cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </header>
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Navbar;

const StriverDropdown = () => {

  const [state, setState] = useState(false);

  return (
    <Collapsible className="space-y-2" open={state}>
      <CollapsibleTrigger className="flex items-center justify-between"
        onClick={() => setState((prev) => !prev)}>
        <span>Striver</span>
        <ChevronRightIcon
          className={`h-4 w-4 transition-transform transform ${state ? "rotate-90" : ""
            }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid gap-2 p-4">
          <Link
            href="/dsa/striver/a2z"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            A2Z DSA
          </Link>
          <Link
            href="/dsa/striver/sde"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            SDE Sheet
          </Link>
          <Link
            href="/dsa/striver/s79"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            79 Sheet
          </Link>
          <Link
            href="/dsa/striver/b75"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Blind 75
          </Link>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
