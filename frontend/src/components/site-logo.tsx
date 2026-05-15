import Link from "next/link";
import { LukaIcon } from "@/components/chat/luka-icon";

interface SiteLogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    animate?: boolean;
    asLink?: boolean;
    invert?: boolean;
}

export function SiteLogo({
    size = "md",
    className = "",
    animate = false,
    asLink = false,
    invert = false,
}: SiteLogoProps) {
    const landingHref =
        process.env.NODE_ENV === "production"
            ? "https://doqs.com.br"
            : "http://localhost:3000";
    const sizeClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
    };

    const iconSizes = {
        sm: 20,
        md: 22,
        lg: 32,
        xl: 48,
    };

    const logo = (
        <h1
            className={`flex items-center gap-1.5 ${sizeClasses[size]} font-light font-serif ${
                invert ? "text-white" : "text-slate-900"
            } ${animate ? "sidebar-fade-in" : ""} ${className}`}
        >
            <LukaIcon 
                size={iconSizes[size]} 
                spin={animate} 
                variant={invert ? "white" : "emerald"} 
            />
            <span className="tracking-tight">
                <span className="font-serif text-xl text-slate-900 font-medium">Doqs</span>
            </span>
        </h1>
    );

    if (asLink) {
        return (
            <Link
                href={landingHref}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                {logo}
            </Link>
        );
    }

    return logo;
}
