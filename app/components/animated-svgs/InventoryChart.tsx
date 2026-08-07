"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

interface InventoryChartProps {
  /**
   * Replays the complete animation continuously.
   * @default false
   */
  loop?: boolean;

  /**
   * SVG/container width.
   * @default "100%"
   */
  width?: string | number;

  /**
   * SVG/container height.
   * @default "100%"
   */
  height?: string | number;
}

export default function InventoryChart({
  loop = false,
  width = "100%",
  height = "100%",
}: InventoryChartProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const container = root.current;

      if (!container) return;

      const inventory = container.querySelector<SVGPathElement>(
        ".inventory-line"
      );

      const stock = container.querySelector<SVGPathElement>(".stock-line");

      const pointGroup =
        container.querySelector<SVGGElement>(".point-group");

      const bar = container.querySelector<SVGRectElement>(
        ".highlight-bar"
      );

      const tooltip =
        container.querySelector<SVGGElement>(".tooltip");

      if (!inventory || !stock || !pointGroup || !bar || !tooltip) {
        return;
      }

      const inventoryLength = inventory.getTotalLength();
      const stockLength = stock.getTotalLength();

      /*
       * -----------------------------------------
       * INITIAL STATES
       * -----------------------------------------
       */

      gsap.set(inventory, {
        strokeDasharray: inventoryLength,
        strokeDashoffset: inventoryLength,
      });

      gsap.set(stock, {
        strokeDasharray: stockLength,
        strokeDashoffset: stockLength,
      });

      gsap.set(pointGroup, {
        opacity: 0,
        scale: 1,
        transformOrigin: "center center",
      });

      gsap.set(bar, {
        scaleY: 0,
        transformOrigin: "50% 100%",
      });

      gsap.set(tooltip, {
        opacity: 0,
        y: 8,
        scale: 0.94,
        transformOrigin: "center center",
      });

      /*
       * -----------------------------------------
       * MAIN TIMELINE
       * -----------------------------------------
       */

      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 0.8 : 0,

        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: !loop,
        },
      });

      /*
       * 1. Stock line
       */
      tl.to(stock, {
        strokeDashoffset: 0,
        duration: 1.7,
        ease: "power2.out",
      });

      /*
       * 2. Inventory line
       */
      tl.to(
        inventory,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
        },
        "-=1.25"
      );

      /*
       * 3. Gradient bar
       */
      tl.to(
        bar,
        {
          scaleY: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.35"
      );

      /*
       * 4. Show point
       */
      tl.to(
        pointGroup,
        {
          opacity: 1,
          duration: 0.15,
        },
        "-=0.45"
      );

      /*
       * 5. Move point along inventory curve
       */
      tl.to(
        pointGroup,
        {
          motionPath: {
            path: inventory,
            start: 0,
            end: 0.472,
            autoRotate: false,
          },
          duration: 1.65,
          ease: "power2.out",
        },
        "-=0.15"
      );

      /*
       * 6. Tooltip
       */
      tl.to(
        tooltip,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.2"
      );

      /*
       * 7. Subtle point pulse
       *
       * IMPORTANT:
       * This is finite.
       *
       * If this had repeat: -1, the main
       * timeline could never reach its repeat.
       */
      tl.to(
        pointGroup,
        {
          scale: 1.06,
          duration: 0.45,
          repeat: 1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "+=0.3"
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, [loop]);

  return (
    <div
      ref={root}
      style={{
        width,
        height,
      }}
    >
      <svg
        viewBox="0 0 804 303"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Inventory and Stock chart"
        className="block"
      >
        <defs>
          <linearGradient
            id="inventoryBarGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#d8f000"
            />

            <stop
              offset="45%"
              stopColor="#9cad00"
            />

            <stop
              offset="100%"
              stopColor="#242600"
            />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect
          x="0.5"
          y="0.5"
          width="803"
          height="302"
          rx="18"
          fill="#191919"
          stroke="#303030"
        />

        {/* Y-axis labels */}
        <g
          fill="#f5f5f5"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="18"
        >
          <text x="48" y="50">
            50
          </text>

          <text x="48" y="88">
            50
          </text>

          <text x="48" y="126">
            50
          </text>

          <text x="48" y="164">
            50
          </text>

          <text x="48" y="202">
            50
          </text>

          <text x="48" y="240">
            50
          </text>
        </g>

        {/* Stock line */}
        <path
          className="stock-line"
          d="
            M105 186
            C145 213 184 237 217 226
            C253 214 256 154 292 146
            C329 137 345 180 366 202
            C391 228 418 218 446 192
            C478 162 519 120 548 125
            C586 131 594 204 623 215
            C651 226 682 188 708 163
            C726 146 743 132 755 119
          "
          fill="none"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Inventory line */}
        <path
          className="inventory-line"
          d="
            M89 241
            C119 216 146 188 174 177
            C204 165 224 181 248 191
            C275 202 299 203 319 192
            C344 178 357 148 382 140
            C405 132 420 145 437 168
            C454 192 471 207 498 212
            C529 217 554 207 580 191
            C608 174 633 162 658 163
            C683 164 700 173 721 169
            C738 166 748 154 756 140
          "
          fill="none"
          stroke="#d7ef00"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Highlight */}
        <g className="highlight">
          {/* Gradient bar */}
          <rect
            className="highlight-bar"
            x="385"
            y="145"
            width="31"
            height="119"
            rx="10"
            fill="url(#inventoryBarGradient)"
            opacity="0.9"
          />

          {/* Animated point */}
          <g
            className="point-group"
            transform="translate(400.5 147)"
          >
            <circle
              cx="0"
              cy="0"
              r="13.5"
              fill="#191919"
              stroke="#d7ef00"
              strokeWidth="3"
            />

            <circle
              cx="0"
              cy="0"
              r="5"
              fill="#d7ef00"
            />
          </g>
        </g>

        {/* Tooltip */}
        <g className="tooltip">
          <rect
            x="340"
            y="38"
            width="124"
            height="83"
            rx="14"
            fill="#050505"
          />

          {/* Inventory */}
          <circle
            cx="357"
            cy="63"
            r="6"
            fill="#d7ef00"
          />

          <text
            x="369"
            y="69"
            fill="#888"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="18"
          >
            Inventory
          </text>

          {/* Stock */}
          <circle
            cx="357"
            cy="96"
            r="6"
            fill="#777"
          />

          <text
            x="369"
            y="102"
            fill="#777"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="18"
          >
            Stock
          </text>
        </g>
      </svg>
    </div>
  );
}