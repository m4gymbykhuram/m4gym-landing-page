"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const gridItems = [
  { id: 1, title: "Unleash Power", subtitle: "Weight Zone", text: "Master the barbell. Forge elite strength.", imgUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" },
  { id: 2, title: "Speed Demon", subtitle: "Track & Sprint", text: "Explosive agility. Pure athletic performance.", imgUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200" },
  { id: 3, title: "Iron Core", subtitle: "Core Stability", text: "A foundation that cannot be broken.", imgUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200" },
  { id: 4, title: "Cardio King", subtitle: "HIIT Arena", text: "Push intervals. Boost metabolism. Outlast.", imgUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200" },
  { id: 5, title: "Mindfulness", subtitle: "Yoga Studio", text: "Balance strength with serenity. Deep focus.", imgUrl: "https://images.unsplash.com/photo-1599901860904-17e08c2d4681?q=80&w=1200" },
  { id: 6, title: "Shatter Limits", subtitle: "CrossFit Box", text: "WODs designed to test every dimension.", imgUrl: "https://images.unsplash.com/photo-1517838276518-2fe02a3a5f7c?q=80&w=1200" },
  { id: 7, title: "Punch Harder", subtitle: "Boxing Ring", text: "Refine technique. Build unstoppable confidence.", imgUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200" },
  { id: 8, title: "Fuel Growth", subtitle: "Nutrition Station", text: "Optimal recovery. Scientifically backed fueling.", imgUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200" },
  { id: 9, title: "Recovery Pro", subtitle: "Mobility Lab", text: "Active rest. Foam rolling. Injury prevention.", imgUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200" },
];

export default function GridExpansionScrollEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mainContainer = containerRef.current;
    if (!mainContainer) return;

const cards = gsap.utils.toArray<HTMLElement>(".grid-card");
const contentBlocks = gsap.utils.toArray<HTMLElement>(".content-block");;

    // Primary master timeline triggered by scrolling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer,
        start: "top top", // Pin when the section hits top of viewport
        pin: true,        // Pin the gallery in place
        scrub: 1,         // Smooth scrubbing
        // Adjust this height to control the overall speed of the animation sequence
        end: () => `+=${window.innerHeight * 10}`, 
        invalidateOnRefresh: true,
      },
    });

    // We build the sequence by looping through each card
    cards.forEach((card, index) => {
      const currentContent = contentBlocks[index];
      const nextCard = cards[index + 1];

      // Step 1: EXPAND - Current card scales from grid-slot to full screen
      tl.to(card, {
        scale: 1,
        // Make it the topmost layer when expanding
        zIndex: 10, 
        duration: 2, // Relative timeline duration
        ease: "power2.inOut",
      });

      // Step 2: REVEAL - Text content fades in over the image
      tl.to(currentContent, {
        opacity: 1,
        y: 0, // Animate up slightly
        duration: 1,
        ease: "power2.out",
      }, "-=0.5"); // Start slightly before expansion ends

      // Step 3: DISMISSAL - Content fades out and the card itself transitions
      // We keep the image expanded but make it fade out to show the *next* image 
      // (which we will simultaneously start expanding from the background)
      tl.to([currentContent, card], {
        opacity: 0,
        delay: 2, // How long to hold the card expanded
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          // After it's faded, reset it to scale-0 and low z-index for future iterations
          gsap.set(card, { scale: 0, zIndex: 1 });
        },
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white"
    >
      
      {/* 1. Base Grid Layer (Visible when nothing is expanding) */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-2">
        {gridItems.map((item) => (
          <div key={`bg-${item.id}`} className="relative h-full w-full bg-neutral-900 rounded-lg overflow-hidden">
            <img 
              src={item.imgUrl} 
              alt={item.subtitle} 
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
          </div>
        ))}
      </div>

      {/* 2. Expanding & Content Layer */}
      {gridItems.map((item) => (
        <React.Fragment key={item.id}>
          {/* A unique full-page image layer that will expand */}
          <div 
            className="grid-card absolute inset-0 z-1 origin-center opacity-0 overflow-hidden"
            style={{ 
              // We use CSS scale to make it start 'small' like a grid slot
              transform: "scale(0.33)", 
              backgroundImage: `url(${item.imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Corresponding content block for this image */}
          <div className="content-block absolute inset-0 z-20 flex h-full w-full flex-col items-start justify-end p-12 opacity-0 translate-y-8">
            <div className="max-w-3xl">
              <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-red-500">
                {item.subtitle}
              </span>
              <h2 className="mb-6 text-6xl font-black uppercase tracking-tighter md:text-8xl">
                {item.title}
              </h2>
              <p className="max-w-xl text-xl text-neutral-200 md:text-2xl">
                {item.text}
              </p>
            </div>
          </div>
        </React.Fragment>
      ))}

    </section>
  );
}