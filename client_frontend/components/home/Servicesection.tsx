// components/ServicesSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
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

    const services = [
        {
            id: 1,
            image: '/images/homepage-services-1.jpeg',
            title: 'Armed & Unarmed Security',
            description: 'Virginia Surveillance Force understands that We live in a world where the concerns for safety and security are escalating on a daily basis.',
        },
        {
            id: 2,
            image: '/images/homepage-services-2.jpeg',
            title: 'Office & Corporate Security',
            description: 'Virginia Surveillance Force uniformed and plain clothed officers are experts when it comes to protect office buildings and corporations.',
        },
        {
            id: 3,
            image: '/images/homepage-services-3.jpeg',
            title: 'Vehicle Patrol',
            description: 'Virginia Surveillance Force patrol program include a wide variety of techniques designed to provide effective deterrent agents.',
        }
    ];

    return (
        <div ref={sectionRef} className="sis-services-section section py-[80px] md:py-[100px] relative overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80 z-10" />
                <Image
                    src="/images/about-bg-section.webp"
                    alt="Background Pattern"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10">
                {/* Section Title Row */}
                <div className="flex flex-wrap -mx-[15px]">
                    <div className="w-full px-[15px]">
                        <div className="sisf-sis-section-title text-center sis-section-title mb-12 md:mb-16">
                            {/* Subtitle */}
                            <h5 className="sisf-m-subtitle inline-block text-sm md:text-base font-bold uppercase leading-6 tracking-normal mb-4 text-[#eab308] bg-[#FFD41D1A] px-4 py-2 rounded-[50px] heading-font">
                                OUR SERVICES
                            </h5>

                            {/* Main Title */}
                            <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10 text-[#002147]">
                                <span className="inline-block mr-2 heading-font">
                                    Our Professional
                                </span>
                                <span className="inline-block text-[#eab308] heading-font">
                                    Security Services
                                </span>
                            </h2>

                            {/* Description */}
                            <div className="sisf-m-text max-w-3xl mx-auto">
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans">
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
                            className="w-full lg:w-1/3 md:w-1/2 px-[15px] flex"
                        >
                            <div className="sisf-sis-e-service-list page mb-[30px] group w-full flex flex-col">
                                <div className="sisf-e-inner relative bg-[#002147] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col flex-1 h-full">

                                    {/* Service Image */}
                                    <div className="sisf-e-service-image relative overflow-hidden shrink-0">
                                        <Link href="/services" className="sisf-sis-page-link block">
                                            <figure className="sis-image-anime relative overflow-hidden m-0">
                                                <div className="relative overflow-hidden">
                                                    <Image
                                                        src={service.image}
                                                        alt={service.title}
                                                        width={400}
                                                        height={250}
                                                        sizes="(max-width: 640px) 340px, (max-width: 1024px) 300px, 400px"
                                                        className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                {/* Image Reveal Animation Overlay */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/20 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-700" />
                                                </div>
                                            </figure>
                                        </Link>
                                    </div>

                                    {/* Service Content */}
                                    <div className="sisf-e-content p-5 bg-[#002147] flex flex-col flex-1 justify-between">
                                        <div className="sisf-sis-e-title mb-2 min-h-[2.8rem] flex items-center">
                                            <h4 className="sisf-e-title text-white text-xl font-bold leading-tight line-clamp-2 m-0">
                                                <Link
                                                    href="/services"
                                                    className="text-white hover:text-[#eab308] transition-colors duration-200"
                                                >
                                                    {service.title}
                                                </Link>
                                            </h4>
                                        </div>
                                        <div className="sisf-e-text flex-1">
                                            <p className="text-gray-300 text-base mb-0 line-clamp-3 group-hover:text-white transition-colors duration-200 font-sans">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#eab308] rounded-2xl transition-colors duration-300 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View All Services Button */}
                    <div className="w-full px-[15px]">
                        <div className="sisf-m-button text-center pt-6">
                            <Link
                                href="/services"
                                className="sis-btn-default relative inline-flex items-center gap-2 text-base md:text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-8 md:px-10 py-3.5 md:py-4 border border-[#eab308] overflow-hidden group z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
                            >
                                <span className="relative z-20 flex items-center gap-2">
                                    View All Services
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <span className="absolute left-[-15px] bottom-[-2px] w-0 h-[106%] bg-[#002147] transform skew-[30deg] group-hover:w-[120%] transition-all duration-500 z-0" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;