"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  type Swiper as SwiperType,
} from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { company } from "@/data/company";
import { heroBanners } from "@/data/hero-banners";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative bg-brand-light">
      <div className="hero-carousel relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[550px]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
            bulletClass: "hero-pagination-bullet",
            bulletActiveClass: "hero-pagination-bullet-active",
          }}
          navigation={{
            prevEl: ".hero-nav-prev",
            nextEl: ".hero-nav-next",
          }}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation;
            if (nav && typeof nav !== "boolean") {
              nav.prevEl = ".hero-nav-prev";
              nav.nextEl = ".hero-nav-next";
            }
            const pag = swiper.params.pagination;
            if (pag && typeof pag !== "boolean") {
              pag.el = ".hero-pagination";
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full w-full"
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={banner.id} className="relative h-full">
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom w-full py-3 sm:py-4 md:py-6">
                  <div className="max-w-xl rounded-lg border border-brand-border/60 bg-white/80 p-3 shadow-sm backdrop-blur-sm sm:max-w-2xl sm:p-5 sm:shadow-md md:p-6 lg:max-w-3xl lg:p-8 lg:shadow-lg">
                    {index === 0 && (
                      <>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary sm:text-xs">
                          Welcome to {company.name}
                        </p>
                        <p className="mt-1 text-xs font-medium text-brand-primary sm:text-sm md:text-base">
                          {company.welcomeTagline}
                        </p>
                      </>
                    )}
                    <h1 className="text-base font-bold leading-snug text-brand-text sm:text-lg md:text-2xl lg:text-4xl lg:leading-tight">
                      {banner.title}
                    </h1>
                    <p className="mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-xs md:mt-2 md:line-clamp-none md:text-sm lg:mt-3 lg:text-base">
                      {banner.subtitle}
                    </p>
                    <div className="mt-2.5 flex flex-col gap-2 sm:mt-4 sm:flex-row md:mt-5">
                      <Link
                        href="/#divisions"
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "h-8 text-xs md:h-10 md:text-sm"
                        )}
                      >
                        Explore Solutions
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:ml-2 md:h-4 md:w-4" />
                      </Link>
                      <Link
                        href="/request-quotation"
                        className={cn(
                          buttonVariants({ size: "sm", variant: "outline" }),
                          "h-8 text-xs md:h-10 md:text-sm"
                        )}
                      >
                        Request Quotation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous slide"
          className={cn(
            "hero-nav-prev absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-brand-border bg-white/95 text-brand-text shadow-md backdrop-blur-sm transition-all",
            "hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-lg active:scale-95",
            "md:left-4 md:h-10 md:w-10 lg:left-6 lg:h-11 lg:w-11"
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className={cn(
            "hero-nav-next absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-brand-border bg-white/95 text-brand-text shadow-md backdrop-blur-sm transition-all",
            "hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-lg active:scale-95",
            "md:right-4 md:h-10 md:w-10 lg:right-6 lg:h-11 lg:w-11"
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        <div className="hero-pagination absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5 sm:bottom-3 md:bottom-5" />
      </div>

      <div className="border-t border-brand-border bg-white">
        <div className="container-custom grid grid-cols-2 gap-3 py-3 md:grid-cols-4 md:gap-4 md:py-5">
          {company.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="text-center"
            >
              <p className="text-lg font-bold text-brand-primary md:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground md:text-xs lg:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
