"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import Image from "@/components/shared/SafeImage";

interface Logo3DProps {
  scrolled: boolean;
}

export function Logo3D({ scrolled }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width for performance-conscious mobile mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Spring configs — softer/lazier than a tilt effect since layers should
  // feel like they have weight and drift into place rather than snap.
  const springConfig = { stiffness: 90, damping: 18, mass: 0.7 };
  const parallaxSpringConfig = { stiffness: 70, damping: 16, mass: 0.9 };

  // ---------------------------------------------------------------------
  // Idle float — a continuous, gentle bob/drift so the logo feels alive
  // even with zero interaction. This is the core "floating" ingredient.
  // ---------------------------------------------------------------------
  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);

  useEffect(() => {
    const yControls = animate(floatY, [0, -6, 0, 4, 0], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const rotateControls = animate(floatRotate, [0, 1.2, 0, -1.2, 0], {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => {
      yControls.stop();
      rotateControls.stop();
    };
  }, [floatY, floatRotate]);

  // ---------------------------------------------------------------------
  // Scroll-driven depth: instead of rotating back, the logo sinks
  // slightly and the layers separate further apart in Z, so depth reads
  // as "things spreading apart" rather than "things turning."
  // ---------------------------------------------------------------------
  const { scrollY } = useScroll();
  const scrollLimit = 120;

  const rawScale = useTransform(scrollY, [0, scrollLimit], [1, 0.86]);
  const scale = useSpring(rawScale, springConfig);

  const rawScrollSink = useTransform(scrollY, [0, scrollLimit], [0, isMobile ? 6 : 10]);
  const scrollSink = useSpring(rawScrollSink, springConfig);

  const rawLayerSeparation = useTransform(
    scrollY,
    [0, scrollLimit],
    [1, isMobile ? 1.15 : 1.35]
  );
  const layerSeparation = useSpring(rawLayerSeparation, springConfig);

  // ---------------------------------------------------------------------
  // Mouse-driven parallax: each layer moves by a different fraction of
  // cursor offset. Far layers move least, near layers move most — the
  // classic parallax-diorama depth cue, no rotation involved.
  // ---------------------------------------------------------------------
  const mouseXRaw = useMotionValue(0); // -0.5 to 0.5, normalized
  const mouseYRaw = useMotionValue(0);
  const pointerX = useMotionValue(0); // absolute px, for the shine
  const pointerY = useMotionValue(0);
  const hoverIntensity = useMotionValue(0); // 0 -> 1 on hover

  const mouseX = useSpring(mouseXRaw, parallaxSpringConfig);
  const mouseY = useSpring(mouseYRaw, parallaxSpringConfig);
  const intensity = useSpring(hoverIntensity, parallaxSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseXRaw.set(normX);
    mouseYRaw.set(normY);
    hoverIntensity.set(1);

    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseXRaw.set(0);
    mouseYRaw.set(0);
    hoverIntensity.set(0);
  };

  // Depth multipliers per layer — farthest layers travel the least.
  const BACKPLATE_DEPTH = 6; // px of travel at full tilt
  const SHADOW_DEPTH = 10;
  const LOGO_DEPTH = 14;
  const SHINE_FOLLOW = 1; // shine tracks pointer almost directly

  const backplateX = useTransform(mouseX, (v) => v * BACKPLATE_DEPTH);
  const backplateY = useTransform(mouseY, (v) => v * BACKPLATE_DEPTH);

  const shadowX = useTransform(mouseX, (v) => -v * SHADOW_DEPTH);
  const shadowY = useTransform(mouseY, (v) => -v * SHADOW_DEPTH * 0.6);

  const logoParallaxX = useTransform(mouseX, (v) => v * LOGO_DEPTH);
  const logoParallaxY = useTransform(mouseY, (v) => v * LOGO_DEPTH);

  const glowOpacity = useTransform(intensity, [0, 1], [0, 0.65]);
  const shadowOpacity = useTransform(intensity, [0, 1], [0.12, 0.3]);
  const backplateOpacity = useTransform(
    scrollY,
    [0, scrollLimit],
    [0.04, 0.14]
  );

  const shineBackground = useMotionTemplate`radial-gradient(
    circle 90px at ${pointerX}px ${pointerY}px,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.08) 45%,
    rgba(255, 255, 255, 0) 100%
  )`;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center select-none"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scroll-Reactive Depth Stage: scale + sink replace the old rotation */}
      <motion.div
        style={{
          scale,
          y: scrollSink,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Idle Float Stage: continuous gentle bob/drift, always running */}
        <motion.div
          style={{
            y: floatY,
            rotate: floatRotate,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Backplate glow — farthest layer, smallest parallax travel,
              scales its separation distance with scroll depth */}
          <motion.div
            style={{
              x: useTransform(
                [backplateX, layerSeparation] as any,
                ([x, sep]: number[]) => x * sep
              ),
              y: useTransform(
                [backplateY, layerSeparation] as any,
                ([y, sep]: number[]) => y * sep
              ),
              opacity: backplateOpacity,
            }}
            className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg blur-[8px] pointer-events-none"
          />

          {/* Floating cast shadow — sits "below" the logo in depth, drifts
              opposite the cursor and separates further on scroll */}
          <motion.div
            style={{
              x: useTransform(
                [shadowX, layerSeparation] as any,
                ([x, sep]: number[]) => x * sep
              ),
              y: useTransform(
                [shadowY, layerSeparation] as any,
                ([y, sep]: number[]) => y * sep + 6
              ),
              opacity: shadowOpacity,
            }}
            className="absolute inset-0 bg-brand-primary/40 rounded-lg blur-lg pointer-events-none w-[88%] h-[78%] mx-auto"
          />

          {/* Logo — nearest layer, largest parallax travel */}
          <motion.div
            style={{
              x: logoParallaxX,
              y: logoParallaxY,
            }}
            className="relative z-10 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Miraco Biocare Logo"
              width={180}
              height={60}
              className={`w-auto object-contain logo-img transition-all duration-300 ${
                scrolled ? "h-8 md:h-10" : "h-10 md:h-14"
              }`}
              priority
            />

            {/* Specular shine, pinned to the logo layer, tracks pointer */}
            <motion.div
              style={{
                background: shineBackground,
                opacity: glowOpacity,
                mixBlendMode: "overlay",
              }}
              className="absolute inset-0 pointer-events-none rounded-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}