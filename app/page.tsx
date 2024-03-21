import Link from "next/link";
import Image from "next/image";
import InfoButton from "@/components/landing/InfoButton";
import MaxWidthWrapper from "@/components/landing/MaxWidthWrapper";
import React, { useEffect, useState } from "react";
import { Check, Menu, Rocket } from "lucide-react";
import { learnings } from "@/constants/learnings";
import "@/components/css/Hero.css";
import "@/components/css/Navbar.css";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton, auth } from "@clerk/nextjs";

export default function Home() {
  const date = new Date();
  let year = date.getFullYear();

  const { userId } = auth();

  return (
    <main className="relative">
      <React.Fragment>
        <nav className="animate-navbar-slide-down transition border-transparent duration-500 ease-in-out md:flex md:flex-row md:justify-between px-4 py-5 sm:px-6 md:px-8 lg:px-20 w-full z-50 hidden">
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
          {userId ? (
            <div className="flex flex-row space-x-5 items-center">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex flex-row space-x-5 items-center">
              <Link href="/sign-up">
                <Button variant="default">Regístrate</Button>
              </Link>

              <Link href="/sign-in">
                <Button variant="secondary">Inicia Sesión</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navbar */}
        <nav className="md:hidden z-50 animate-navbar-slide-down transition border-transparent duration-500 ease-in-out fixed w-full p-4 flex justify-between">
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

      {/* Hero Section */}
      <section className="h-auto w-auto background-gradient rounded-3xl mx-8 px-16 py-20 overflow-hidden relative mt-5">
        <div className="animate-hero-slide-up">
          <h1 className="text-2xl font-semibold text-[#050250] lg:text-6xl max-w-3xl">
            Domina el Mercado Inmobiliario con nuestra guía experta
          </h1>
          <p className="mt-10 max-w-3xl lg:text-xl font-medium">
            Obtén acceso a las estrategias, prácticas de venta y las mejores
            técnicas de negociación de un experto para escalar tu negocio.
          </p>
          <div className="md:flex md:flex-row md:space-x-6 mt-24">
            <button className="bg-[#050250] px-8 py-4 rounded-full text-white font-bold hover:scale-105 hover:bg-[#050250]/80 transition-all duration-300">
              Agenda una Cita
            </button>
            <InfoButton />
          </div>
        </div>

        <Image
          src="/imgEjemplo.png"
          alt="Juan Carlos Guzman"
          width="1000"
          height="1000"
          className="w-80 absolute bottom-0 right-10 z-40 animate-hero-slide-up transition-all duration-300 ease-in-out"
        />
        <div className="bg-[#050250] absolute -bottom-40 -right-8 h-[26rem] w-[26rem] rounded-full animate-circle-grow" />
      </section>

      {/* Problem Section */}
      <section className="h-auto w-auto lg:mt-60 rounded-b-3xl">
        <MaxWidthWrapper className="flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-4">
            <h2 className="text-center text-xl lg:text-5xl max-w-3xl text-[#050250] font-bold">
              ¿Qué aprenderás en esta guía?
            </h2>
            <p className="text-center text-lg lg:text-2xl max-w-2xl text-muted-foreground font-medium">
              Aprende de un referente <strong>nacional</strong> del rubro
            </p>
          </div>

          <div className="flex flex-col lg:flex lg:flex-row lg:space-x-32 items-center mt-24">
            <Image
              src="/hero-4.jpg"
              alt="Team Picture"
              width="1000"
              height="1000"
              className="object-contain w-1/2 h-full rounded-3xl"
            />
            <div className="flex flex-col space-y-8 w-1/2">
              {learnings.map((learning, id) => {
                return (
                  <React.Fragment key={id}>
                    <div className="flex flex-row space-x-4 items-center">
                      <div className="flex justify-center items-center h-6 w-6 rounded-full bg-[#050250]">
                        <Check size={16} color="white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#050250]">
                        {learning.title}
                      </h3>
                    </div>
                    <p className="text-base text-pretty font-medium">
                      {learning.description}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="h-auto w-auto lg:mt-60 rounded-b-[5rem] bg-muted pb-20">
        <MaxWidthWrapper className="flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-4">
            <h2 className="text-center text-xl lg:text-5xl max-w-4xl text-[#050250] font-bold mt-20">
              Dictada por un referente Nacional
            </h2>
            <p className="text-center text-lg lg:text-2xl max-w-3xl text-muted-foreground font-medium">
              Mira un preview de lo que aprenderás
            </p>
          </div>

          <div className="flex flex-col lg:flex lg:flex-row lg:space-x-32 items-center mt-24">
            <div className="flex flex-col space-y-8 w-1/2">
              {learnings.map((learning, id) => {
                return (
                  <React.Fragment key={id}>
                    <div className="flex flex-row space-x-4 items-center">
                      <div className="flex justify-center items-center h-6 w-6 rounded-full bg-[#050250]">
                        <Check size={16} color="white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#050250]">
                        {learning.title}
                      </h3>
                    </div>
                    <p className="text-base text-pretty font-medium">
                      {learning.description}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
            <Image
              src="/hero-4.jpg"
              alt="Team Picture"
              width="1000"
              height="1000"
              className="object-contain w-1/2 h-full rounded-3xl"
            />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* CTA Section */}

      <section className="h-auto w-auto lg:mt-32 rounded-b-3xl flex flex-col lg:flex lg:flex-row lg:justify-around lg:items-center">
        <h3 className="text-center text-xl lg:text-4xl max-w-2xl text-[#050250] font-bold">
          Comienza tu cambio y separa una cita con Juan Carlos
        </h3>
        <button className="bg-[#050250] px-8 py-4 rounded-full max-h-14 text-white font-bold hover:scale-105 hover:bg-[#050250]/80 transition-all duration-300">
          Agenda una Cita
        </button>
      </section>

      <div className="mt-20"></div>
    </main>
  );
}
