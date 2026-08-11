"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const gymCards = [
  { id: 1, title: "Raw Power", subtitle: "Heavy Lifting", imgUrl: "/images/HeavyLiftingRawPower.jpg" },
  { id: 2, title: "Cardio Burn", subtitle: "Endurance", imgUrl: "/images/EnduranceCardio.jpg" },
  { id: 3, title: "Functional", subtitle: "HIIT Zone", imgUrl: "/images/HIIT-Zone.jpg" },
  { id: 4, title: "Recovery", subtitle: "Mobility", imgUrl: "/images/MobilityRecovery.jpg" },
  { id: 5, title: "Combat", subtitle: "Boxing Ring", imgUrl: "/images/Boxing-Ring-Combat.jpg" },
  { id: 6, title: "Iron Core", subtitle: "Abs & Core", imgUrl: "/images/Abs-Core.jpg" },
];

export default function HorizontalCardGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => track.scrollWidth - section.offsetWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="hidden relative md:flex h-screen w-full items-center overflow-hidden bg-neutral-950"
      style={{ contain: "layout paint" }}
    >
      <div
        ref={trackRef}
        className="flex gap-8"
        style={{ willChange: "transform" }}
      >
        {/* Leading spacer — breathing room before card 1 */}
        <div className="shrink-0 w-[10vw]" aria-hidden="true" />

        {gymCards.map((card, i) => (
          <div
            key={card.id}
            className="group relative h-[400px] w-[400px] shrink-0 overflow-hidden rounded-2xl bg-neutral-800"
          >
            <Image
              src={card.imgUrl}
              alt={`${card.title} - ${card.subtitle}`}
              fill
              sizes="400px"
              quality={80}
              priority={i < 2}
              loading={i < 2 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col justify-end p-8">
              <span className="mb-1 text-sm font-bold uppercase tracking-widest text-red-500">
                {card.subtitle}
              </span>
              <h3 className="text-3xl font-black uppercase text-white">
                {card.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Trailing spacer — small, matches the card gap so the last card
            ends flush-ish instead of leaving 10vw of dead space */}
        <div className="shrink-0 w-4 md:w-8" aria-hidden="true" />
      </div>
    </section>
  );
}