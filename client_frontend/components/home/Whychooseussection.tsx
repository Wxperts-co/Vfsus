// components/IndustriesSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { HomeWhyChooseSection } from '@/lib/page-home';

const IndustriesSection = ({ data }: { data?: HomeWhyChooseSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scoped Intersection Observer
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('aos-animate');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const industries = data?.industries || [
    {
      id: 1,
      icon: '/images/industry-icon1.svg',
      title: 'Corporate Offices',
      description: 'Executive protection and facility security',
      column: 1 as const
    },
    {
      id: 2,
      icon: '/images/industry-icon2.svg',
      title: 'Shopping Malls',
      description: 'Retail security and loss prevention',
      column: 1 as const
    },
    {
      id: 3,
      icon: '/images/industry-icon3.svg',
      title: 'Construction Sites',
      description: 'Asset protection and site monitoring',
      column: 2 as const
    },
    {
      id: 4,
      icon: '/images/industry-icon4.svg',
      title: 'Hotels & Resorts',
      description: 'Guest safety and property protection',
      column: 2 as const
    },
    {
      id: 5,
      icon: '/images/industry-icon5.svg',
      title: 'Hospitals',
      description: 'Healthcare facility security services',
      column: 3 as const
    },
    {
      id: 6,
      icon: '/images/industry-icon6.svg',
      title: 'Government Facilities',
      description: 'High-security government installations',
      column: 3 as const
    }
  ];

  const column1Industries = industries.filter(i => i.column === 1);
  const column2Industries = industries.filter(i => i.column === 2);
  const column3Industries = industries.filter(i => i.column === 3);

  return (
    <div ref={sectionRef} className="sis-industry-we-save-section bg-[#002147] pb-0 section py-[80px] md:py-[100px] relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/80 to-[#002147]/90 z-10" />
        <Image
          src={data?.backgroundImage && data.backgroundImage !== "/images/american-flag.jpg" ? data.backgroundImage : "/images/about-bg-section.webp"}
          alt="Background Pattern"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10">
        <div className="flex flex-wrap -mx-[15px]">
          
          {/* Left Column - Content (Col LG 7) */}
          <div className="w-full lg:w-7/12 px-[15px]">
            
            {/* Section Title */}
            <div className="sisf-sis-section-title sis-section-title mb-10">
              
              {/* Subtitle */}
              <h5 className="sisf-m-subtitle inline-block text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px] heading-font">
                {data?.subtitle || 'WHY CHOOSE US'}
              </h5>
              
              {/* Main Title */}
              <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-white">
                <span className="inline-block mr-2 heading-font">
                  {data?.titleLine1 || 'Protecting'}
                </span>
                <span className="inline-block text-[#eab308] heading-font">
                  {data?.titleLine2 || 'Diverse Sectors'}
                </span>
              </h2>
              
              {/* Description */}
              <div className="sisf-m-text max-w-2xl">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-sans">
                 {data?.description || "When selecting a security contractor, you're looking for a company that knows its business, has an established reputation and plays on your team. At Virginia Surveillance Force, we work closely with our clients to develop the correct security strategy for their organizations since 1994."}
                </p>
              </div>
            </div>

            {/* Industries Grid */}
            <div className="flex flex-wrap -mx-[15px]">
              
              {/* Column 1 */}
              <div className="w-full md:w-1/3 px-[15px]">
                {column1Industries.map((industry) => (
                  <div 
                    key={industry.id}
                    className="sis-industry-e-content mb-6 group"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[60px] h-[60px] min-w-[60px] flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={36}
                            height={36}
                            className="w-[36px] h-[36px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-lg font-bold group-hover:text-[#002147] transition-colors duration-300 m-0">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-sm group-hover:text-[#002147]/90 transition-colors duration-300 font-sans mb-0">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="w-full md:w-1/3 px-[15px]">
                {column2Industries.map((industry) => (
                  <div 
                    key={industry.id}
                    className="sis-industry-e-content mb-6 group"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[60px] h-[60px] min-w-[60px] flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={36}
                            height={36}
                            className="w-[36px] h-[36px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-lg font-bold group-hover:text-[#002147] transition-colors duration-300 m-0">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-sm group-hover:text-[#002147]/90 transition-colors duration-300 font-sans mb-0">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="w-full md:w-1/3 px-[15px]">
                {column3Industries.map((industry) => (
                  <div 
                    key={industry.id}
                    className="sis-industry-e-content mb-6 group"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[60px] h-[60px] min-w-[60px] flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={36}
                            height={36}
                            className="w-[36px] h-[36px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-lg font-bold group-hover:text-[#002147] transition-colors duration-300 m-0">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-sm group-hover:text-[#002147]/90 transition-colors duration-300 font-sans mb-0">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image (Col LG 5) */}
          <div className="w-full lg:w-5/12 px-[15px] mt-10 lg:mt-0 flex items-center">
            <div className="sis-we-save-industry-image w-full">
              <figure className="sis-reveal relative overflow-hidden group m-0">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image 
                    src={data?.rightImage || "/images/choose-section.jpg"}
                    alt="Industries We Serve"
                    width={600}
                    height={500}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/10 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-1000" />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;