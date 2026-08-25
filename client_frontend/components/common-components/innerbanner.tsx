"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, breadcrumb }) => {
  const words = title.split(" ");
  let globalCharCount = 0;

  return (
    <div className="relative overflow-hidden w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
      {/* Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/breadcrum-image.png"
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Page Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center mt-12 sm:mt-16">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center mt-20 gap-2 mb-3 text-sm sm:text-base md:text-lg">
            <Link
              href="/"
              className="group text-gray-300 font-normal relative hover:text-white transition-colors duration-200"
            >
              <span className="relative after:content-[''] after:absolute after:w-0 after:h-px after:bg-yellow-400 after:left-0 after:right-0 after:bottom-[-2px] after:mx-auto after:transition-all after:duration-300 group-hover:after:w-full">
                Home
              </span>
            </Link>
            <span className="text-gray-400 flex items-center">
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span className="text-yellow-400 font-normal">
              {breadcrumb || title}
            </span>
          </div>

          {/* Animated Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] uppercase tracking-wide">
            {words.map((word, wordIdx) => (
              <div key={wordIdx} className="inline-block relative mr-3 last:mr-0">
                {word.split("").map((char, charIdx) => {
                  const currentIdx = globalCharCount++;
                  return (
                    <span
                      key={charIdx}
                      className="letter-animate inline-block relative opacity-0"
                      style={{
                        animationDelay: `${currentIdx * 40}ms`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;