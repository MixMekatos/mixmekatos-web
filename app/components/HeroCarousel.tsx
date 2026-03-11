"use client";

import Image from "next/image";
import { Carousel } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_SLIDES = [
  { src: "/layout/banner-example.jpg", alt: "MixMekatos - Prueba el mejor sabor" },
  { src: "/layout/banner-example.jpg", alt: "MixMekatos - Prueba el mejor sabor" },
  { src: "/layout/banner-example.jpg", alt: "MixMekatos - Prueba el mejor sabor" },
];

export default function HeroCarousel() {
  return (
    <div className="h-56 sm:h-64 md:h-80 xl:h-96 w-full overflow-hidden rounded-none">
      <Carousel
        slideInterval={3000}
        pauseOnHover
        leftControl={
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white transition hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-white/50 sm:h-12 sm:w-12">
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
          </span>
        }
        rightControl={
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white transition hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-white/50 sm:h-12 sm:w-12">
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
          </span>
        }
      >
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div key={i} className="relative h-full w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
