
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { company } from "@/data/company";
import { heroBanners } from "@/data/hero-banners";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/effect-fade";

interface SlideContentProps {
  banner: (typeof heroBanners)[number];
  isActive: boolean;
  index: number;
}

function SlideContent({ banner, isActive, index }: SlideContentProps) {
  return (
    <div className="max-w-xl select-none rounded-xl border border-brand-border/60 bg-white/90 p-4 shadow-md backdrop-blur-md sm:max-w-2xl sm:p-6 lg:max-w-3xl lg:p-10 lg:shadow-xl min-h-[180px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[340px] flex flex-col justify-center">
      {/* Welcome pre-title */}
      {index === 0 && (
        <div
          className={cn(
            "mb-2 transition-all duration-700 ease-out",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isActive ? "100ms" : "0ms" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary sm:text-xs">
            Welcome to {company.name}
          </p>
        
        </div>
      )}

      {/* Title */}
      <h1
        className={cn(
          "text-base font-bold leading-snug text-brand-text sm:text-lg md:text-2xl lg:text-4xl lg:leading-tight transition-all duration-700 ease-out",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
      >
        {banner.title}
      </h1>

      {/* Subtitle / Description */}
      <p
        className={cn(
          "mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-xs md:mt-2 md:line-clamp-none md:text-sm lg:mt-3 lg:text-base transition-all duration-700 ease-out",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: isActive ? "320ms" : "0ms" }}
      >
        {banner.subtitle}
      </p>

      {/* CTA Buttons */}
      <div
        className={cn(
          "mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row md:mt-5 transition-all duration-700 ease-out",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: isActive ? "440ms" : "0ms" }}
      >
        <Link
          href="/#divisions"
          className={cn(
            buttonVariants({ size: "sm" }),
            "h-8 text-xs md:h-10 md:text-sm shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 group/btn"
          )}
        >
          Explore Solutions
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:ml-2 md:h-4 md:w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
        <Link
          href="/request-quotation"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "h-8 text-xs md:h-10 md:text-sm transition-all duration-300 active:scale-95 bg-white/50 backdrop-blur-sm"
          )}
        >
          Request Quotation
        </Link>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [realIndex, setRealIndex] = useState(0);

  return (
    <section className="relative bg-brand-light">
      <div className="hero-carousel relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[550px] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => {
            setRealIndex(swiper.realIndex);
          }}
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          className="h-full w-full"
        >

          {heroBanners.map((banner, index) => (
            <SwiperSlide key={banner.id} className="relative h-full overflow-hidden">
              <>
                {/* Background Image Container with Ken Burns transition */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      className={cn(
                        "object-cover object-center transition-transform duration-[6000ms] ease-out",
                        realIndex === index ? "scale-108" : "scale-100"
                      )}
                      sizes="100vw"
                      quality={85}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent md:from-white/85 md:via-white/35 md:to-transparent" />

                {/* Slide Content Box */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container-custom w-full py-3 sm:py-4 md:py-6">
                    <SlideContent
                      banner={banner}
                      isActive={realIndex === index}
                      index={index}
                    />
                  </div>
                </div>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="border-t border-brand-border bg-white">
        <div className="container-custom grid grid-cols-2 gap-3 py-3 md:grid-cols-4 md:gap-4 md:py-5">
          {company.stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-brand-primary md:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground md:text-xs lg:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



