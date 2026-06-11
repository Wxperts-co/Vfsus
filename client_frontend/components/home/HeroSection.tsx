// components/HeroSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/bg-video-flag.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Overlay – Centered for both desktop and mobile */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-23 sm:py-0">
        <div className="w-full max-w-4xl text-center">
          
          {/* Badge */}
          <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8">
            <span className="text-yellow-400 text-xs sm:text-sm heading-font  uppercase tracking-widest">
              Trusted Security Since 1994
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Secure A Safer <span className="text-yellow-400 block sm:inline heading-font">Tomorrow Today</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white max-w-md sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Our professionals are available to you 24 hours a day, 7 days a week.
          </p>

          {/* CTA Button */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/request-quote"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-yellow-500/30 transform hover:-translate-y-1 "
            >
              Get Free Quote
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl sm:max-w-full mx-auto">
            {[
              ['32+', 'Years Experience'],
              ['500+', 'Clients Protected'],
              ['24/7', 'Support'],
              ['100%', 'Satisfaction'],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">
                  {value}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm md:text-base">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 ">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-yellow-400 rounded-full mt-2" />
          </div>
        </div>
      </div>

      {/* Scrolling Text Banner - All CSS included inline */}
      <style jsx>{`
        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-x {
          animation: scrollX 75s linear infinite;
        }
      `}</style>

      <div className="bg-[#eab308] py-3 sm:py-4 w-full overflow-hidden flex items-center whitespace-nowrap relative z-20 -mt-11 sm:-mt-12 md:-mt-14">
        
        {/* First Row */}
        <div className="flex-shrink-0 flex items-center gap-4 sm:gap-6 animate-scroll-x">
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center">
                <h4 className="leading-none flex items-center">
                  <span className="heading-font font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-[#002147]">
                    Ensuring Safety & Security
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pl-3 sm:pl-4 text-[#002147]">★</span>
                </h4>
              </div>
              <div className="flex items-center">
                <h4 className="leading-none flex items-center">
                  <span className="heading-font font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-[#002147]">
                    Emergency (24/7) Response
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pl-3 sm:pl-4 text-[#002147]">★</span>
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Duplicate for seamless loop */}
        <div className="flex-shrink-0 flex items-center gap-4 sm:gap-6 ml-4 animate-scroll-x">
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center">
                <h4 className="leading-none flex items-center">
                  <span className="heading-font font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-[#002147]">
                    Ensuring Safety & Security
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pl-3 sm:pl-4 text-[#002147]">★</span>
                </h4>
              </div>
              <div className="flex items-center">
                <h4 className="leading-none flex items-center">
                  <span className="heading-font font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-[#002147]">
                    Emergency (24/7) Response
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pl-3 sm:pl-4 text-[#002147]">★</span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;