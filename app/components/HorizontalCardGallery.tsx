"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const gymCards = [
  {
    id: 1,
    title: "Raw Power",
    subtitle: "Heavy Lifting",
    imgUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cardio Burn",
    subtitle: "Endurance",
    imgUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Functional",
    subtitle: "HIIT Zone",
    imgUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Recovery",
    subtitle: "Mobility",
    imgUrl: "https://images.unsplash.com/photo-1599901860904-17e08c2d4681?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Combat",
    subtitle: "Boxing Ring",
    imgUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Iron Core",
    subtitle: "Abs & Core",
    imgUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
];

export default function HorizontalCardGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate how far the track needs to move to the left
    // (Total width of the track) minus (the width of the viewport)
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1, // Smooth scrubbing
        // The scrolling duration feels natural when it matches the distance
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true, // Recalculates on window resize
      },
    });
  }, { scope: sectionRef });

  return (
    // We give the section a comfortable height (e.g., 100vh) so it pins nicely in the center of the screen
    <section 
      ref={sectionRef} 
      className="hidden relative md:flex h-screen w-full items-center overflow-hidden bg-neutral-950"
    >
      
      {/* The Track that moves left. It's wider than the screen. */}
      <div 
        ref={trackRef} 
        className="flex gap-8 px-[10vw]" // Adds padding so the first/last cards have breathing room
      >
        {gymCards.map((card) => (
          <div 
            key={card.id} 
            // Fixed dimensions as requested: 400px by 400px
            className="group relative h-[400px] w-[400px] shrink-0 overflow-hidden rounded-2xl bg-neutral-800"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${card.imgUrl})` }}
            />
            
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Card Content */}
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
      </div>
    </section>
  );
}