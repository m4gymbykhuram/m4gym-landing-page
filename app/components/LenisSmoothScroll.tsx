"use client"

import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

type LenisSmoothScrollProps = {
  children: React.ReactNode;
};

const DESKTOP_QUERY =
  "(min-width: 768px) and (pointer: fine)";

const LenisSmoothScroll = ({
  children,
}: LenisSmoothScrollProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Native scrolling on mobile and touch devices
  if (!isDesktop) {
    return <>{children}</>;
  }

  // Lenis only runs on desktop devices
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisSmoothScroll;