"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { howItWorksSteps } from "@/lib/how-it-works-data";
import TitleWithLines from "../TitleWithLines";
import AnimatedHeading from "./AnimatedHeading";
import { fadeUp } from "@/lib/motion-variants";
import { ScrollTrigger } from "@/lib/gsap"; // use the shared registered instance, not a fresh import

function StepBlock({
  step,
  isActive,
  index,
  blockRef,
}: {
  step: (typeof howItWorksSteps)[number];
  isActive: boolean;
  index: number;
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={blockRef}
      className="flex flex-col justify-center py-8 md:min-h-[50vh] lg:py-10"
    >
      <div className="mb-6 md:hidden">
        <DeviceMockup activeStep={index} compact />
      </div>

      <h3
        className={`font-archivo text-2xl md:text-4xl lg:text-5xl uppercase mb-4 transition-colors duration-500 ${
          isActive ? "text-white" : "text-white/30"
        }`}
      >
        {step.number} . {step.title}
      </h3>
      <span
        className={`block h-px w-full mb-4 transition-colors duration-500 ${
          isActive ? "bg-white/30" : "bg-white/10"
        }`}
      />
      <p
        className={`font-archivo md:text-md text-xl transition-colors duration-500 ${
          isActive ? "text-white/60" : "text-white/25"
        }`}
      >
        {step.description}
      </p>
    </div>
  );
}

function DeviceMockup({
  activeStep,
  compact = false,
}: {
  activeStep: number;
  compact?: boolean;
}) {
  const activeImage = howItWorksSteps[activeStep].image;

  return (
    <div
      className={`relative w-full max-w-lg rounded-3xl border border-white/10 bg-bg-card overflow-hidden ${
        compact ? "h-82 sm:h-96" : "lg:h-130 xl:h-150"
      }`}
    >
      {!compact && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center font-archivo font-bold text-sm text-black z-10"
            style={{ background: "#DFFF3D" }}
          >
            {activeStep + 1}
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div
        className="relative h-full rounded-xl overflow-hidden"
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`Step ${activeStep + 1} preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-cover block"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickyEl = stickyRef.current;
    const containerEl = containerRef.current;
    if (!stickyEl || !containerEl) return;

    const triggers: ScrollTrigger[] = [];

    // Pin the mockup for the duration of the container
    triggers.push(
      ScrollTrigger.create({
        trigger: containerEl,
        start: "top top+=96",
        end: "bottom bottom",
        pin: stickyEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      }),
    );

    // One ScrollTrigger per step block, using onToggle instead of a raw
    // scroll listener + getBoundingClientRect loop. GSAP's ScrollTrigger
    // batches its scroll reads internally and shares the same ticker
    // driving the pin above and the ScrollSmoother wrapping the page, so
    // this replaces a manual reflow-per-scroll-tick with one engine doing
    // the work it's already optimized for.
    howItWorksSteps.forEach((_, index) => {
      const el = blockRefs.current[index];
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveStep(index);
          },
        }),
      );
    });

    // Images and late-loading fonts can shift block heights after this
    // effect runs — refresh once things settle, same pattern used for
    // the ScrollSmoother wrapper.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh);
    }
    const settleTimer = setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(settleTimer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="relative bg-[#0A0A0B] py-10 lg:pt-28 px-4 md:px-8"
      style={{ backgroundImage: "url('/assets/works-section-bg.png')" }}
    >
      <div className="max-w-7xl flex flex-col items-center mx-auto text-center md:mb-16">
        <TitleWithLines title="How It Works" variants={fadeUp} />
        <AnimatedHeading
          text="Get Started In 3 Simple Steps"
          className="text-3xl sm:text-4xl xl:text-[44px] mt-2"
        />
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          {howItWorksSteps.map((step, index) => (
            <StepBlock
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              blockRef={(el) => {
                blockRefs.current[index] = el;
              }}
            />
          ))}

          <div className="hidden lg:h-[20vh]" aria-hidden="true" />
        </div>

        <div className="hidden md:block relative">
          <div ref={stickyRef} className="flex justify-end">
            <DeviceMockup activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}