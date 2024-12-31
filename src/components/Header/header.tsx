"use client";

import * as React from "react";
import avt from "./../../../public/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentMode } from "@/store/Features/currentState/currentStateSlice";

const components: { title: string; href: string }[] = [
  {
    title: "Apna College Cheat Sheet",
    href: "/dsa/apna-college",
  },
  {
    title: "Fraz Cheat Sheet",
    href: "/dsa/fraz",
  },
  {
    title: "Love Babbar Cheat Sheet",
    href: "/dsa/love-babbar",
  },
  {
    title: "Striver Cheat Sheet",
    href: "/dsa/striver",
  },
];

const Header = () => {
  const currentMode = useSelector((state) => state.currentState.currentMode);
  const dispatch = useDispatch();

  React.useEffect(() => {
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
    <>
      <header className="w-full h-fit text-slate-700 fixed top-0 z-50 flex flex-col lg:flex-row shadow-b bg-secondary border-b-2 border-slate-500">
        <a
          href="/"
          className="flex items-center whitespace-nowrap text-2xl font-black justify-center m-4"
        >
          <p className="font-customFont italic text-foreground">DSAlgoVault</p>
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-4 right-4 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="py-0 peer-checked:h-auto flex h-0 w-full flex-col items-center overflow-hidden transition-all duration-300 lg:ml-24 lg:h-auto lg:flex-row justify-center bg-secondary"
        >
          <ul className="flex w-full items-center m-2 flex-col lg:flex-row justify-center">
            {components.map((item, index) => (
              <li
                key={index}
                className="my-4 lg:my-0 mx-2 justify-center items-center"
              >
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <Avatar>
            <AvatarImage src={avt.src} />
            <AvatarFallback>
              <Image src={avt} alt="Fallback Avatar" width={100} height={100} />
            </AvatarFallback>
          </Avatar>
        </nav>
        <button onClick={changeMode}>
          {currentMode ? (
            <LightModeIcon className="text-foreground mx-2" />
          ) : (
            <DarkModeIcon className="text-foreground" />
          )}
        </button>
      </header>
    </>
  );
};

export default Header;
