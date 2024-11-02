import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go"


const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: "My Tasks",
        href: "",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: "Settings",
        href: "",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "Members",
        href: "",
        icon: UsersIcon,
        activeIcon: UsersIcon,
    },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
        {routes.map((item) => {
            
            const isActive = true;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
                <Link href={item.href} key={item.label}>
                    <div className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                        isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                    )}>
                        <Icon className=" size-5 text-neutral-500 ml-4" />
                        {item.label}
                    </div>
                </Link>
            )
        })}
    </ul>
  )
}
