import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
    variable: "--font-eb-garamond",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Doqs - Inteligência Jurídica em Escala",
    description: "Plataforma de inteligência jurídica operada por IA para análise documental e automação de workflows.",
    icons: {
        icon: "/luka-lex-icon.svg?v=4",
        apple: "/luka-lex-icon.svg?v=4",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${ebGaramond.variable} font-sans antialiased overflow-x-hidden`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
