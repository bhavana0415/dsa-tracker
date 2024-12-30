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
import TimerIcon from "@mui/icons-material/Timer";
import { useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMode } from "@/store/Features/currentState/currentStateSlice";

const Navbar = () => {
  const currentMode = useSelector((state) => state.currentState.currentMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentMode]);

  const changeMode = () => {
    dispatch(setCurrentMode(currentMode == "dark" ? "light" : "dark"));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary">
      <div className="container flex h-16 items-center justify-between py-2 md:py-4">
        <Link
          href="#"
          className="mr-4 flex items-center space-x-2"
          prefetch={false}
        >
          <span className="font-bold">AlgoVault</span>
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
                    href="/dsa/fraz"
                    className="text-sm text-foreground hover:bg-quaternary p-2 justify-items-center"
                  >
                    Fraz
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
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <TimerIcon />
          </Link>
          <button onClick={changeMode}>
            {currentMode == "dark" ? (
              <LightModeIcon className="text-foreground mx-2" />
            ) : (
              <DarkModeIcon className="text-foreground" />
            )}
          </button>
          {/* <Link
            href="/goal"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Goal
          </Link> */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            <div className="flex flex-col space-y-3 p-6">
              <Collapsible className="group space-y-2">
                <CollapsibleTrigger className="flex items-center justify-between">
                  <span>Features</span>
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
                    <Link
                      href="/dsa/striver"
                      className="text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      Striver
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Link
                href="/timer"
                className="font-bold flex justify-center items-center"
                prefetch={false}
              >
                <TimerIcon />
              </Link>
              {/* <Link href="/goal" className="text-muted-foreground" prefetch={false}>
                Goal
              </Link> */}
              <button onClick={changeMode}>
                {currentMode == "dark" ? (
                  <LightModeIcon className="text-foreground mx-2" />
                ) : (
                  <DarkModeIcon className="text-foreground" />
                )}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
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

function MenuIcon(props) {
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
