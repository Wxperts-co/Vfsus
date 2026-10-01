"use client";

import React from "react";
import Image from "next/image";

interface PageBannerProps {
  title: string;
  breadcrumb?: string;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  headingTag: Heading = "h1",
}) => {
  return (
    <div className="relative overflow-hidden w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
      {/* Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/breadcrum-img.jpg"
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Page Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 sm:pt-20 lg:pt-24 z-10">
        <div className="container mx-auto px-4 text-center">
          {/* Title */}
          <Heading className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase tracking-wide heading-font animate-fade-down">
            {title}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;