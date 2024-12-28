import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mineplots",
    description: "Discover the best builds from players around the globe!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body
                    className={`min-h-svh bg-background font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <div className="relative flex min-h-svh flex-col bg-background">
                        <div className="border-grid flex flex-1 flex-col">
                            {children}
                        </div>
                    </div>
                </body>
            </ClerkProvider>
        </html>
    );
}
