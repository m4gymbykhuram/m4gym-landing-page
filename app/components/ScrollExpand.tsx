"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface ScrollExpandProps {
  src?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  maxHeight?: number;
  startWidth?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;

  /**
   * How much scrolling is required for the expansion.
   *
   * 0.6 = 60% of viewport height
   * 0.8 = 80% of viewport height
   * 1   = 100% of viewport height
   */
  scrollDistance?: number;

  smoothing?: number;
  overlayScrim?: number;

  useWindowScroll?: boolean;
  enabled?: boolean;

  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const ScrollExpand = ({
  src = "",
  alt = "",
  title = "",
  scrollHint = "",

  startWidth = 42,
  maxHeight = 500,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.2,

  // Smaller value = shorter section
  scrollDistance = 0.65,

  smoothing = 0.8,
  overlayScrim = 0.45,

  useWindowScroll = true,
  enabled = true,

  children,
  className = "",
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasExpandedRef = useRef(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const initialWidth = clamp(startWidth, 1, 100);
  const initialSideInset = (100 - initialWidth) / 2;

  const initialClipPath = `inset(
    0% ${initialSideInset}% 0% ${initialSideInset}%
    round ${startRadius}px
  )`;

  const finalClipPath = `inset(
    0% 0% 0% 0%
    round ${endRadius}px
  )`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;

    if (!root || !stage || !frame || !image || !enabled) {
      return;
    }

    const ctx = gsap.context(() => {
      const getViewportHeight = () => {
        return useWindowScroll ? window.innerHeight : root.clientHeight;
      };

      /**
       * The section only needs enough height for:
       *
       * 1. The viewport-sized pinned stage
       * 2. The expansion scroll distance
       *
       * Example:
       * viewport = 900px
       * scrollDistance = 0.65
       *
       * section height = 900 + 585 = 1485px
       *
       * This is considerably shorter than the previous 1800px.
       */

      const updateLayout = () => {
        const viewportHeight = getViewportHeight();

        if (viewportHeight <= 0) return;

        // Never allow the visible ScrollExpand stage
        // to become taller than 500px.
        const stageHeight = Math.min(viewportHeight, maxHeight);

        const animationDistance = stageHeight * Math.max(scrollDistance, 0.1);

        root.style.height = `${stageHeight + animationDistance}px`;
        stage.style.height = `${stageHeight}px`;
      };
      updateLayout();

      // Initial state
      gsap.set(frame, {
        clipPath: initialClipPath,
      });

      gsap.set(image, {
        scale: mediaZoom,
      });

      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }

      if (hintRef.current) {
        gsap.set(hintRef.current, {
          opacity: 1,
          y: 0,
        });
      }

      if (scrimRef.current) {
        gsap.set(scrimRef.current, {
          opacity: 0,
        });
      }

      if (overlayRef.current) {
        gsap.set(overlayRef.current, {
          opacity: 0,
          y: 18,
        });
      }

      /**
       * IMPORTANT:
       *
       * The animation starts when the section reaches
       * the top of the viewport.
       *
       * Previously:
       * start: 'top bottom'
       *
       * That caused the animation to start too early.
       */
      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          trigger: root,
          scroller: useWindowScroll ? window : root,

          start: "top 100px",

          end: () => {
            const viewportHeight = getViewportHeight();

            return `+=${viewportHeight * Math.max(scrollDistance, 0.1)}`;
          },

          scrub: smoothing > 0 ? smoothing : true,

          pin: stage,
          pinSpacing: false,

          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (self.progress >= 0.999) {
              hasExpandedRef.current = true;
            }
          },
        },
      });

      timeline.eventCallback("onComplete", () => {
        hasExpandedRef.current = true;

        gsap.set(frame, {
          clipPath: finalClipPath,
        });

        gsap.set(image, {
          scale: 1,
        });

        if (scrimRef.current) {
          gsap.set(scrimRef.current, {
            opacity: overlayScrim,
          });
        }

        if (titleRef.current) {
          gsap.set(titleRef.current, {
            opacity: 0,
            y: -28,
            scale: 1.06,
          });
        }

        if (hintRef.current) {
          gsap.set(hintRef.current, {
            opacity: 0,
            y: 8,
          });
        }

        if (overlayRef.current) {
          gsap.set(overlayRef.current, {
            opacity: 1,
            y: 0,
          });
        }
      });

      // -----------------------------------------
      // IMAGE EXPANSION
      // -----------------------------------------

      timeline.fromTo(
        frame,
        {
          clipPath: initialClipPath,
        },
        {
          clipPath: finalClipPath,
          duration: 1,
          immediateRender: false,
        },
        0,
      );

      // -----------------------------------------
      // IMAGE ZOOM
      // -----------------------------------------

      timeline.fromTo(
        image,
        {
          scale: mediaZoom,
        },
        {
          scale: 1,
          duration: 1,
          immediateRender: false,
        },
        0,
      );

      // -----------------------------------------
      // SCRIM
      // -----------------------------------------

      if (scrimRef.current) {
        timeline.to(
          scrimRef.current,
          {
            opacity: overlayScrim,
            duration: 0.8,
          },
          0.15,
        );
      }

      // -----------------------------------------
      // TITLE
      // -----------------------------------------

      if (titleRef.current) {
        timeline.to(
          titleRef.current,
          {
            opacity: 0,
            y: -28,
            scale: 1.06,
            duration: 0.4,
          },
          0.35,
        );
      }

      // -----------------------------------------
      // SCROLL HINT
      // -----------------------------------------

      if (hintRef.current) {
        timeline.to(
          hintRef.current,
          {
            opacity: 0,
            y: 8,
            duration: 0.15,
          },
          0,
        );
      }

      // -----------------------------------------
      // CONTENT OVERLAY
      // -----------------------------------------

      if (overlayRef.current) {
        timeline.to(
          overlayRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          0.7,
        );
      }

      // -----------------------------------------
      // RESIZE
      // -----------------------------------------

      const handleResize = () => {
        updateLayout();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      // -----------------------------------------
      // LOAD REFRESH
      // -----------------------------------------

      const handleLoadRefresh = () => {
        updateLayout();
        ScrollTrigger.refresh();
      };

      window.addEventListener("load", handleLoadRefresh);

      const settleTimer = window.setTimeout(handleLoadRefresh, 300);

      if (!image.complete) {
        image.addEventListener("load", handleLoadRefresh, { once: true });
      }

      return () => {
        window.removeEventListener("resize", handleResize);

        window.removeEventListener("load", handleLoadRefresh);

        window.clearTimeout(settleTimer);

        image.removeEventListener("load", handleLoadRefresh);
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, [
    enabled,
    useWindowScroll,
    initialClipPath,
    finalClipPath,
    mediaZoom,
    scrollDistance,
    smoothing,
    overlayScrim,
  ]);

  return (
    <div
      ref={rootRef}
      className={[
        "relative m-0 w-full p-0",
        !useWindowScroll &&
          "overflow-x-hidden overflow-y-auto overscroll-contain",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      <div
        ref={stageRef}
        className="relative top-0 m-0 w-full overflow-hidden p-0"
      >
        <div
          ref={frameRef}
          style={{
            clipPath: initialClipPath,
          }}
          className="absolute inset-0 m-0 overflow-hidden p-0 [will-change:clip-path]"
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            draggable={false}
            className="absolute inset-0 block h-full w-full origin-center select-none object-cover [will-change:transform]"
          />

          <div
            ref={scrimRef}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35"
          />

          {children && (
            <div
              ref={overlayRef}
              className="absolute inset-0 flex items-center justify-center p-0 text-center"
            >
              {children}
            </div>
          )}
        </div>

        {title && (
          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-5xl font-bold leading-none tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-7xl"
          >
            {title}
          </div>
        )}

        {scrollHint && (
          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-sm tracking-wide text-white/60"
          >
            {scrollHint}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollExpand;
