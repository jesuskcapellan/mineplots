import { Button } from "@/components/ui/button";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Blocks } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container-wrapper">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link
                            className="mr-4 flex items-center gap-2 lg:mr-6"
                            href="/"
                        >
                            <Blocks />
                            <span className="hidden font-bold lg:inline-block">
                                Mineplots
                            </span>
                        </Link>
                        <nav className="flex items-center gap-4 text-sm xl:gap-6"></nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
                        <nav className="flex items-center gap-2">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>
                                    <Button variant="outline">Log in</Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button>Sign up</Button>
                                </SignUpButton>
                            </SignedOut>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
