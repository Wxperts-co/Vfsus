// components/FeaturesSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
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

  const features = [
    {
      icon: '/images/features-icon1.svg',
      title: '24/7 Security Monitoring',
      description: 'Continuous monitoring and rapid response to ensure round-the-clock protection.',
    },
    {
      icon: '/images/features-icon2.svg',
      title: 'Trained & Certified Officers',
      description: 'All personnel are professionally trained, licensed, and background-verified.',
    },
    {
      icon: '/images/features-icon3.svg',
      title: 'Rapid Emergency Response',
      description: 'Quick deployment teams ready to act during critical situations.',
    },
    {
      icon: '/images/features-icon4.svg',
      title: 'Advanced Surveillance Systems',
      description: 'Modern CCTV and monitoring technologies for proactive threat prevention.',
    }
  ];

  return (
    <div ref={sectionRef} className="sis-our-features-section bg-[#002147] pb-0 section relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/80 to-[#002147]/90 z-10" />
        <Image
          src="/images/about-bg-section.webp"
          alt="Background Pattern"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10 py-[80px] md:py-[100px]">
        {/* Header Row */}
        <div className="flex flex-wrap items-center -mx-[15px] mb-12">
          <div className="w-full lg:w-10/12 px-[15px]">
            {/* Section Title */}
            <div className="sisf-sis-section-title sis-section-title mb-8">
              {/* Subtitle */}
              <h5 className="sisf-m-subtitle inline-block text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px] heading-font">
                OUR FEATURES
              </h5>

              {/* Main Title */}
              <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-white">
                <span className="block text-[#eab308] mb-2 heading-font">
                  Core Security
                </span>
                <span className="block text-white heading-font">
                  Features That Set Us Apart
                </span>
              </h2>

              {/* Description */}
              <div className="sisf-m-text max-w-2xl">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Explore our professional security capabilities designed to deliver safety,
                  rapid response, and complete peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="w-full lg:w-2/12 px-[15px] text-left lg:text-right">
            <div className="sisf-m-button pt-4 lg:pt-0 leading-none">
              <Link
                href="/about-us"
                aria-label="Read More About Our Security Features"
                className="sis-btn-default relative inline-flex items-center gap-2 text-base md:text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-6 md:px-7 py-3 md:py-3.5 border border-[#eab308] overflow-hidden group z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
              >
                <span className="relative z-20 flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute left-[-15px] bottom-[-2px] w-0 h-[106%] bg-[#002147] transform skew-[30deg] group-hover:w-[120%] transition-all duration-500 z-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="flex flex-wrap items-center -mx-[15px]">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 px-[15px] mb-10 lg:mb-0">
            <div className="sis-features-image-left">
              <figure className="sis-reveal relative overflow-hidden rounded-2xl group">
                <div className="relative overflow-hidden w-full rounded-2xl">
                  <Image
                    src="/images/feature-section-1.webp"
                    alt="Security Features"
                    width={500}
                    height={400}
                    sizes="(max-width: 768px) 360px, 500px"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Overlay Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/10 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-1000" />
                </div>
              </figure>
            </div>
          </div>

          {/* Right Column - Features List */}
          <div className="w-full lg:w-1/2 px-[15px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="sisf-sis-icon-with-text--hover other features sisf--bottom mb-6 last:mb-0"
              >
                <div className="sisf-e-inner relative bg-transparent p-6 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 group hover:border-[#eab308] hover:shadow-xl">

                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 w-full h-0 bg-[#eab308] group-hover:h-full transition-all duration-300 ease-in-out z-0" />

                  {/* Icon and Title */}
                  <div className="relative z-10 flex items-center gap-3 mb-2">
                    <div className="sisf-sis-icon-image w-[50px] h-[50px] min-w-[50px] bg-[#002147] rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#002147] transition-colors duration-300">
                      <figure className="m-0">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={30}
                          height={30}
                          className="w-auto h-auto"
                        />
                      </figure>
                    </div>
                    <div className="sisf-sis-e-title">
                      <h4 className="sisf-e-title text-white text-xl md:text-2xl font-bold group-hover:text-[#002147] transition-colors duration-300">
                        {feature.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sisf-e-content relative z-10">
                    <div className="sisf-sis-description">
                      <p className="text-gray-300 text-base md:text-lg mb-0 group-hover:text-[#002147] transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;