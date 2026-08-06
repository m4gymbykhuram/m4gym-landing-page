import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollExpandProps {
  src?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;

  startWidth?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;

  scrollDistance?: number;
  smoothing?: number;
  overlayScrim?: number;

  useWindowScroll?: boolean;
  enabled?: boolean;

  children?: ReactNode;
  className?: string;
  style?: CSSProperties;

  [key: string]: unknown;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const ScrollExpand = ({
  src = '',
  alt = '',
  title = '',
  scrollHint = '',

  startWidth = 42,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.25,

  scrollDistance = 1,
  smoothing = 0.8,
  overlayScrim = 0.45,

  useWindowScroll = true,
  enabled = true,

  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startMarkerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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
    const track = trackRef.current;
    const startMarker = startMarkerRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;

    if (
      !root ||
      !track ||
      !startMarker ||
      !stage ||
      !frame ||
      !image ||
      !enabled
    ) {
      return;
    }

    const context = gsap.context(() => {
      const updateLayout = () => {
        const viewportHeight = useWindowScroll
          ? window.innerHeight
          : root.clientHeight;

        if (viewportHeight <= 0) return;

        stage.style.height = `${viewportHeight}px`;

        const totalHeight =
          viewportHeight * (1 + Math.max(0, scrollDistance));

        track.style.height = `${totalHeight}px`;
      };

      updateLayout();

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

      const timeline = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: startMarker,
          scroller: useWindowScroll ? window : root,

          // Start when the marker becomes visible.
          start: 'top bottom',

          // Continue the animation for the configured scroll distance.
          end: () =>
            `+=${window.innerHeight * Math.max(scrollDistance, 0.1)}`,

          scrub: smoothing > 0 ? smoothing : true,
          invalidateOnRefresh: true,
        },
      });

      // Expand from both left and right sides.
      timeline
        .fromTo(
          frame,
          {
            clipPath: initialClipPath,
          },
          {
            clipPath: finalClipPath,
            duration: 1,
            immediateRender: false,
          },
          0
        )
        .fromTo(
          image,
          {
            scale: mediaZoom,
          },
          {
            scale: 1,
            duration: 1,
            immediateRender: false,
          },
          0
        );

      if (scrimRef.current) {
        timeline.to(
          scrimRef.current,
          {
            opacity: overlayScrim,
            duration: 0.8,
          },
          0.2
        );
      }

      if (titleRef.current) {
        timeline.to(
          titleRef.current,
          {
            opacity: 0,
            y: -28,
            scale: 1.06,
            duration: 0.4,
          },
          0.35
        );
      }

      if (hintRef.current) {
        timeline.to(
          hintRef.current,
          {
            opacity: 0,
            y: 8,
            duration: 0.15,
          },
          0
        );
      }

      if (overlayRef.current) {
        timeline.to(
          overlayRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          0.7
        );
      }

      const handleResize = () => {
        updateLayout();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, root);

    return () => {
      context.revert();
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
        'relative m-0 h-full w-full p-0',
        !useWindowScroll &&
          'overflow-x-hidden overflow-y-auto overscroll-contain',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...rest}
    >
      <div
        ref={trackRef}
        className="relative m-0 w-full p-0"
      >
        {/* ScrollTrigger watches this marker. */}
        <div
          ref={startMarkerRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-full"
        />

        <div
          ref={stageRef}
          className="sticky top-0 m-0 w-full overflow-hidden p-0"
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
    </div>
  );
};

export default ScrollExpand;