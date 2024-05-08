"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MyTimer } from "../Timer";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <h1 className="bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        ¿Estas listo para llevar tu
        <br className="hidden md:block" /> inmobiliaria al siguiente nivel?
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Obtén acceso a las estrategias, prácticas de venta y las mejores
        <br className="hidden md:block" /> técnicas de negociación de un experto
        para escalar tu negocio.
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-pretty text-muted-foreground">
          Aprovecha la oferta durante los siguientes:
        </p>
        <MyTimer expiryTimestamp={time} autoStart={true} />
        <p>minutos</p>
      </div>
      <button className="m-4 animate-buttonheartbeat rounded-full bg-indigo-500 px-6 py-3 text-md font-semibold text-white">
        ¡Adquiere el Curso Ahora!
      </button>
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      >
        <div
          className={`rounded-xl border border-black/10 bg-black bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-four),var(--color-four),transparent_40%)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <Image
            src="/hero-4.jpg"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="relative w-full h-full rounded-[inherit] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
