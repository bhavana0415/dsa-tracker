"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
    }
]

const Header = () => {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger style={{backgroundColor: "rgb(7, 15, 43)"}} className="text-white">DSA Cheat Sheets</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul style={{backgroundColor: "rgb(146, 144, 195)"}} className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] xs:w-[300px]">
                                {components.map((component) => (
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <a href={component.href} className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none text-center">{component.title}</div>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={`text-white ${navigationMenuTriggerStyle()}`} style={{backgroundColor: "rgb(7, 15, 43)"}} >
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={`text-white ${navigationMenuTriggerStyle()}`} style={{backgroundColor: "rgb(7, 15, 43)"}} >
                                Timer
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default Header;

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"