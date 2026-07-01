// components/IndustriesSection.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { HomeWhyChooseSection } from '@/lib/page-home';

const IndustriesSection = ({ data }: { data?: HomeWhyChooseSection }) => {
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.aos-init').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const industries = data?.industries || [
    // Column 1
    {
      id: 1,
      icon: '/images/industry-icon1.svg',
      title: 'Corporate Offices',
      description: 'Executive protection and facility security',
      delay: '100',
      column: 1 as const
    },
    {
      id: 2,
      icon: '/images/industry-icon2.svg',
      title: 'Shopping Malls',
      description: 'Retail security and loss prevention',
      delay: '200',
      column: 1 as const
    },
    // Column 2
    {
      id: 3,
      icon: '/images/industry-icon3.svg',
      title: 'Construction Sites',
      description: 'Asset protection and site monitoring',
      delay: '300',
      column: 2 as const
    },
    {
      id: 4,
      icon: '/images/industry-icon4.svg',
      title: 'Hotels & Resorts',
      description: 'Guest safety and property protection',
      delay: '400',
      column: 2 as const
    },
    // Column 3
    {
      id: 5,
      icon: '/images/industry-icon5.svg',
      title: 'Hospitals',
      description: 'Healthcare facility security services',
      delay: '500',
      column: 3 as const
    },
    {
      id: 6,
      icon: '/images/industry-icon6.svg',
      title: 'Government Facilities',
      description: 'High-security government installations',
      delay: '600',
      column: 3 as const
    }
  ];

  // Group industries by column
  const column1Industries = industries.filter(i => i.column === 1);
  const column2Industries = industries.filter(i => i.column === 2);
  const column3Industries = industries.filter(i => i.column === 3);

  return (
    <div className="sis-industry-we-save-section sis-comman-background bg-[#002147] br-radius pb-0 section py-[80px] md:py-[100px] relative overflow-hidden">
      
      {/* American Flag Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/80 to-[#002147]/90 z-10" />
        <Image
          src={data?.backgroundImage || "/images/american-flag.jpg"}
          alt="Background"
          fill
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
              
              {/* Subtitle with Character Animation */}
              <h5 className="sisf-m-subtitle inline-block font-['Montserrat',sans-serif] text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px]">
                <span className="inline-block relative">
                  {(data?.subtitle || 'WHY CHOOSE US').split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block relative animate-char-fade-up"
                      style={{ 
                        animationDelay: `${index * 0.03}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h5>
              
              {/* Main Title with Character Animation */}
              <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-white">
                <span className="inline-block mr-2">
                  {(data?.titleLine1 || 'Protecting').split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block relative animate-char-fade-up hover:text-[#eab308] transition-colors duration-300 heading-font"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span className="inline-block text-[#eab308]">
                  {(data?.titleLine2 || 'Diverse Sectors').split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block relative animate-char-fade-up hover:text-white transition-colors duration-300 heading-font"
                      style={{ animationDelay: `${(index + 9) * 0.03}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h2>
              
              {/* Description */}
              <div className="sisf-m-text max-w-2xl">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
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
                    className="sis-industry-e-content aos-init mb-6 group"
                    data-aos="fade-up"
                    data-aos-delay={industry.delay}
                    data-aos-duration="1200"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-400 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[70px] h-[70px] min-w-[70px] flex items-center justify-center rounded-full group-hover:bg-white transition-all duration-400">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={40}
                            height={40}
                            className="w-[40px] h-[40px] object-contain transition-all duration-400 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-1xl font-bold group-hover:text-[#002147] transition-colors duration-400">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-base group-hover:text-[#002147]/80 transition-colors duration-400">
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
                    className="sis-industry-e-content aos-init mb-6 group"
                    data-aos="fade-up"
                    data-aos-delay={industry.delay}
                    data-aos-duration="1200"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-400 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[70px] h-[70px] min-w-[70px] flex items-center justify-center rounded-full  group-hover:bg-white transition-all duration-400">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={40}
                            height={40}
                            className="w-[40px] h-[40px] object-contain transition-all duration-400 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-1xl font-bold group-hover:text-[#002147] transition-colors duration-400">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-base group-hover:text-[#002147]/80 transition-colors duration-400">
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
                    className="sis-industry-e-content aos-init mb-6 group"
                    data-aos="fade-up"
                    data-aos-delay={industry.delay}
                    data-aos-duration="1200"
                  >
                    <div className="sisf-e-inner bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:bg-[#eab308] transition-all duration-400 hover:scale-105 hover:shadow-xl">
                      <div className="sis-e-icon mb-3 w-[70px] h-[70px] min-w-[70px] flex items-center justify-center rounded-full group-hover:bg-white transition-all duration-400">
                        <figure className="m-0">
                          <Image 
                            src={industry.icon}
                            alt={industry.title}
                            width={40}
                            height={40}
                            className="w-[40px] h-[40px] object-contain transition-all duration-400 group-hover:brightness-0 group-hover:invert-0"
                          />
                        </figure>
                      </div>
                      <div className="sis-e-icon-content">
                        <div className="sis-e-icon-title mb-2">
                          <h4 className="text-white text-1xl font-bold group-hover:text-[#002147] transition-colors duration-400">
                            {industry.title}
                          </h4>
                        </div>
                        <div className="sis-m-text">
                          <p className="text-gray-300 text-base group-hover:text-[#002147]/80 transition-colors duration-400">
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
              <figure className="sis-reveal relative overflow-hidden group">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image 
                    src={data?.rightImage || "/images/choose-section.jpg"}
                    alt="Industries We Serve"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/10 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-1000" />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes charFadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spinImg {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-char-fade-up {
          animation: charFadeUp 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1) forwards;
          opacity: 0;
        }
        
        .animate-spin-img {
          animation: spinImg 15s linear infinite;
        }
        
        .aos-init {
          opacity: 0;
          transform: translateY(20px);
          transition-property: opacity, transform;
          transition-duration: 1200ms;
          transition-timing-function: ease-out;
        }
        
        .aos-init.aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .duration-400 {
          transition-duration: 400ms;
        }
      `}</style>
    </div>
  );
};

export default IndustriesSection;