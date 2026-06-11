// components/ServicesSection.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ServicesSection = () => {
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

    const services = [
        {
            id: 1,
            image: '/images/homepage-service-1.jpg',
            title: 'Permanent or Temporary Security',
            description: 'Virginia Surveillance Force understands that We live in a world where the concerns for safety and security are escalating on a daily basis.',
            delay: '100'
        },
        {
            id: 2,
            image: '/images/homepage-service-2.jpg',
            title: 'Office & Corporate Security',
            description: 'Virginia Surveillance Force uniformed and plain clothed officers are experts when it comes to protect office buildings and corporations. ',
            delay: '300'
        },
        {
            id: 3,
            image: '/images/homepage-service-3.jpg',
            title: 'Vehicle Patrol',
            description: 'Virginia Surveillance Force patrol program include a wide variety of techniques designed to provide effective deterrent agents.',
            delay: '500'
        }
    ];

    return (
        <div className="sis-services-section section py-[80px] md:py-[100px] relative overflow-hidden bg-white">

            {/* American Flag Background */}
            <div className="absolute inset-0 z-0 opacity-100">
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80 z-10" />
                <Image
                    src="/images/about-bg-section.webp"
                    alt="American Flag"
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10">
                {/* Section Title Row */}
                <div className="flex flex-wrap -mx-[15px]">
                    <div className="w-full px-[15px]">
                        {/* Section Title */}
                        <div className="sisf-sis-section-title text-center sis-section-title mb-12 md:mb-16">

                            {/* Subtitle with Character Animation */}
                            <h5 className="sisf-m-subtitle inline-block font-['Montserrat',sans-serif] text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px]">
                                <span className="inline-block relative">
                                    {'OUR SERVICES'.split('').map((char, index) => (
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
                            <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-[#002147]">
                                <span className="inline-block mr-2">
                                    {'Our'.split('').map((char, index) => (
                                        <span
                                            key={index}
                                            className="inline-block relative animate-char-fade-up hover:text-[#eab308] transition-colors duration-300 heading-font"
                                            style={{ animationDelay: `${index * 0.03}s` }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                                <span className="inline-block mr-2">
                                    {'Professional'.split('').map((char, index) => (
                                        <span
                                            key={index}
                                            className="inline-block relative animate-char-fade-up hover:text-[#eab308] transition-colors duration-300 heading-font"
                                            style={{ animationDelay: `${(index + 3) * 0.03}s` }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                                <span className="inline-block text-[#eab308]">
                                    {'Security Services'.split('').map((char, index) => (
                                        <span
                                            key={index}
                                            className="inline-block relative animate-char-fade-up hover:text-[#002147] transition-colors duration-300 heading-font"
                                            style={{ animationDelay: `${(index + 14) * 0.03}s` }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            </h2>

                            {/* Description */}
                            <div className="sisf-m-text max-w-3xl mx-auto">
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    We provide reliable, trained, and licensed security solutions tailored to protect
                                    people, property, and assets across multiple industries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="flex flex-wrap -mx-[15px]">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="w-full lg:w-1/3 md:w-1/2 px-[15px]"
                        >
                            <div
                                className="sisf-sis-e-service-list page aos-init mb-[30px] group"
                                data-aos="fade-up"
                                data-aos-delay={service.delay}
                                data-aos-duration="1300"
                            >
                                <div className="sisf-e-inner relative bg-[#002147] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                                    {/* Service Image */}
                                    <div className="sisf-e-service-image relative overflow-hidden">
                                        <Link href="/service-single" className="sisf-sis-page-link block">
                                            <figure className="sis-image-anime relative overflow-hidden">
                                                <div className="relative overflow-hidden">
                                                    <Image
                                                        src={service.image}
                                                        alt={service.title}
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                                {/* Image Reveal Animation Overlay */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/20 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-1000" />
                                                </div>
                                            </figure>
                                        </Link>

                                       
                                    </div>

                                    {/* Service Content */}
                                    <div className="sisf-e-content p-5 bg-[#002147]">
                                        <div className="sisf-sis-e-title mb-2">
                                            <h4 className="sisf-e-title text-white text-xl md:text-1xl font-bold leading-tight">
                                                <Link
                                                    href="/service-single"
                                                    className="text-white hover:text-[#eab308] transition-colors duration-400"
                                                >
                                                    {service.title}
                                                </Link>
                                            </h4>
                                        </div>
                                        <div className="sisf-e-text">
                                            <p className="text-gray-300 text-base mb-0 line-clamp-3 group-hover:text-white transition-colors duration-400">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#eab308] rounded-2xl transition-all duration-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View All Services Button */}
                    <div className="w-full px-[15px]">
                        <div
                            className="sisf-m-button text-center pt-8 aos-init"
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1300"
                        >
                            <Link
                                href="/services"
                                className="sis-btn-default relative inline-block text-base md:text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-8 md:px-10 py-3.5 md:py-4 border border-[#eab308] overflow-hidden group/btn z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
                            >
                                <span className="relative z-20 flex items-center">
                                    View All Services
                                    <i className="fa-solid fa-arrow-right ml-2.5 text-sm md:text-base transform -rotate-45 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300"></i>
                                </span>
                                <span className="absolute left-[-15px] bottom-[-2px] w-0 h-[106%] bg-[#002147] transform skew-[30deg] group-hover/btn:w-[120%] transition-all duration-500 z-0" />
                            </Link>
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
        
        .aos-init {
          opacity: 0;
          transform: translateY(20px);
          transition-property: opacity, transform;
          transition-duration: 1300ms;
          transition-timing-function: ease-out;
        }
        
        .aos-init.aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .duration-400 {
          transition-duration: 400ms;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
        </div>
    );
};

export default ServicesSection;