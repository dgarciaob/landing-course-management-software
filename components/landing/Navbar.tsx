"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import { Menu } from "lucide-react";
import "@/components/css/Navbar.css";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const date = new Date();
  const [topOfPage, setTopOfPage] = useState(true);
  let year = date.getFullYear();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setTopOfPage(false);
    } else {
      setTopOfPage(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <React.Fragment>
      <nav
        className={cn(
          "animate-navbar-slide-down transition border-transparent duration-500 ease-in-out md:flex md:flex-row md:justify-between px-4 py-5 sm:px-6 md:px-8 lg:px-20 fixed w-full z-50 hidden",
          {
            "border-b": !topOfPage,
            "border-black/10": !topOfPage,
            "backdrop-blur-md": !topOfPage,
          }
        )}
      >
        <div className="flex flex-row space-x-2 items-center">
          <Link href="/">
            <Rocket size={24} color="#050250" />
          </Link>
          <Link href="/" className={cn("font-bold text-xl navtext")}>
            JC Guzman
          </Link>
        </div>
        <div className="font-semibold space-x-8 flex flex-row items-center">
          <Link
            href="/#cursos"
            className="hover:font-bold transition-all duration-300 hover:scale-105 scroll-smooth navtext"
          >
            Cursos
          </Link>
          <Link
            href="/consultoria"
            className="hover:font-bold transition-all duration-300 hover:scale-105 scroll-smooth navtext"
          >
            Consultoria
          </Link>
        </div>
        <div className="flex flex-row space-x-5 items-center">
          <Link href="/sign-up">
            <Button variant="default" onClick={() => router.push("/sign-up")}>
              Regístrate
            </Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="secondary" onClick={() => router.push("/sign-in")}>
              Inicia Sesión
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={cn(
          "md:hidden z-50 animate-navbar-slide-down transition border-transparent duration-500 ease-in-out fixed w-full p-4 flex justify-between",
          {
            "border-b": !topOfPage,
            "border-black/10": !topOfPage,
            "backdrop-blur-md": !topOfPage,
          }
        )}
      >
        <Link href={"/"} className="flex items-center">
          <Rocket size={24} color="#00a8f0" />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Menu className="w-8 h-8" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] bg-[#F6F5FF]">
            <div className="flex flex-row space-x-2 mb-20">
              <Rocket size={24} color="#00a8f0" />

              <p className="font-bold tracking-tight">JC Guzman</p>
            </div>

            <div className="flex flex-col space-y-8">
              <Link
                href="#cursos"
                className="text-primary hover:text-[#00a8f0] hover:font-bold transition-all duration-300 scroll-smooth"
              >
                Cursos
              </Link>
              <Link
                href="/consultoria"
                className="text-primary hover:text-[#00a8f0] hover:font-bold transition-all duration-300"
              >
                Consultoria
              </Link>
            </div>

            <div className="tracking-light font-medium absolute bottom-8">
              Copyright © Juan Carlos Guzman {year}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
