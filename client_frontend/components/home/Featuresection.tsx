// components/FeaturesSection.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturesSection = () => {
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

  const features = [
    {
      icon: '/images/features-icon1.svg',
      title: '24/7 Security Monitoring',
      description: 'Continuous monitoring and rapid response to ensure round-the-clock protection.',
      delay: '100'
    },
    {
      icon: '/images/features-icon2.svg',
      title: 'Trained & Certified Guards',
      description: 'All personnel are professionally trained, licensed, and background-verified.',
      delay: '200'
    },
    {
      icon: '/images/features-icon3.svg',
      title: 'Rapid Emergency Response',
      description: 'Quick deployment teams ready to act during critical situations.',
      delay: '300'
    },
    {
      icon: '/images/features-icon4.svg',
      title: 'Advanced Surveillance Systems',
      description: 'Modern CCTV and monitoring technologies for proactive threat prevention.',
      delay: '400'
    }
  ];

  return (
    <div className="sis-our-features-section br-radius bg-[#002147] pb-0 section relative overflow-hidden">
      {/* American Flag Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/80 to-[#002147]/90 z-10" />
        <Image
          src="/images/american-flag.jpg"
          alt="American Flag"
          fill
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
              {/* Subtitle with Character Animation */}
              <h5 className="sisf-m-subtitle white sisf-e-colored heading-font inline-block text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px]">
                <span className="inline-block relative">
                  {'OUR FEATURES'.split('').map((char, index) => (
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
              <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-white ">
                <span className="block text-[#eab308] mb-2">
                  {'Core Security'.split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block relative animate-char-fade-up hover:scale-110 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span className="block text-white">
                  {'Features That Set Us Apart'.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block mr-2 overflow-hidden">
                      <span 
                        className="inline-block animate-word-slide-up" 
                        style={{ animationDelay: `${wordIndex * 0.1 + 0.8}s` }}
                      >
                        {word.split('').map((char, charIndex) => (
                          <span 
                            key={`${wordIndex}-${charIndex}`} 
                            className="inline-block hover:text-[#eab308] transition-colors duration-300"
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
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
                className="sis-btn-default relative inline-block text-base md:text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-6 md:px-7 py-3 md:py-3.5 border border-[#eab308] overflow-hidden group z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
              >
                <span className="relative z-20 flex items-center">
                  Read More 
                  <i className="fa-solid fa-arrow-right ml-2 md:ml-2.5 text-sm md:text-base transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
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
                    src="/images/feature-section.jpg"
                    alt="Security Features"
                    width={600}
                    height={500}
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
                className="sisf-sis-icon-with-text--hover other features sisf--bottom aos-init mb-6 last:mb-0"
                data-aos="fade-up"
                data-aos-delay={feature.delay}
                data-aos-duration="1200"
              >
                <div className="sisf-e-inner relative bg-transparent p-6 border border-white/10 rounded-2xl overflow-hidden transition-all duration-600 group hover:border-[#eab308] hover:shadow-xl">
                  
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 w-full h-0 bg-[#eab308] group-hover:h-full transition-all duration-600 ease-in-out z-0" />
                  
                  {/* Icon and Title */}
                  <div className="relative z-10 flex items-center gap-3 mb-2">
                    <div className="sisf-sis-icon-image w-[50px] h-[50px] min-w-[50px] bg-[#002147] rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#002147] transition-all duration-400">
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
                      <h4 className="sisf-e-title text-white text-xl md:text-2xl font-bold group-hover:text-[#002147] transition-all duration-600">
                        {feature.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sisf-e-content relative z-10">
                    <div className="sisf-sis-description">
                      <p className="text-gray-300 text-base md:text-lg mb-0 group-hover:text-[#002147] transition-all duration-600">
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
        
        @keyframes wordSlideUp {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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
        
        .animate-word-slide-up {
          animation: wordSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1) forwards;
          opacity: 0;
          display: inline-block;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
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
        
        .duration-600 {
          transition-duration: 600ms;
        }
        
        .duration-400 {
          transition-duration: 400ms;
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;