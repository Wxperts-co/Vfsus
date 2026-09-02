// components/TestimonialsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { HomeTestimonialsSection } from '@/lib/page-home';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const fullDescriptionsMap: Record<string, string> = {
    "Lily Z.": "I initially hired VA. Surveillance Force during thanksgiving on a temporary basis, but the level of service quickly exceeded our expectations. The officers were professional, reliable, and consistently alert, with excellent communication and attention to detail. Their strong presence and proactive approach impressed our board so much that we decided to move forward with a permanent engagement. Highly recommended for dependable, high quality security services.",
    "Henry Anatsui": "We switched to Virginia Surveillance company after ongoing issues with our previous provider. The difference was immediate. Their officers are professional, alert, and highly disciplined. Management is responsive and actively involved. If you want security done right, this is the company to hire.",
    "Della Paul": "On July 4th, after residents had finished fireworks and gone to sleep, Virginia Surveillance Force officer noticed smoke on the rooftop around 1:40 AM. He promptly called the fire department and began alerting and evacuating residents. We sincerely appreciate his alertness and quick action in keeping everyone safe and preventing a fire.",
    "Omid Karimi": "The security team at the entrance struck an ideal balance between ensuring safety and providing warm hospitality. Their ability to maintain a secure environment while creating a welcoming atmosphere was truly appreciated. Thank you to Virginia Surveillance Force management team for the excellent service.",
    "Hermann E": "I have witnessed the security officers at the private school consistently professional, approachable, and welcoming. Dressed in an authoritative uniform, they greet every child and parent with a warm smile, creating a safe and reassuring environment from the moment you arrive. Their presence is truly valued, Thank you Virginia Surveillance for keeping our children safe and protected."
};

const TestimonialsSection = ({ data }: { data?: HomeTestimonialsSection }) => {
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

    const rawTestimonials = data?.testimonials && data.testimonials.length > 0
        ? data.testimonials
        : [
            {
                id: 1,
                description: fullDescriptionsMap["Lily Z."],
                rating: 5,
                name: "Lily Z.",
            },
            {
                id: 2,
                description: fullDescriptionsMap["Henry Anatsui"],
                rating: 5,
                name: "Henry Anatsui",
            },
            {
                id: 3,
                description: fullDescriptionsMap["Della Paul"],
                rating: 5,
                name: "Della Paul",
            },
            {
                id: 4,
                description: fullDescriptionsMap["Omid Karimi"],
                rating: 5,
                name: "Omid Karimi",
            },
            {
                id: 5,
                description: fullDescriptionsMap["Hermann E"],
                rating: 5,
                name: "Hermann E",
            }
        ];

    // Ensure full text is displayed even if truncated data exists in DB
    const testimonials = rawTestimonials.map((t) => {
        const fullNameKey = Object.keys(fullDescriptionsMap).find(
            (k) => k.toLowerCase() === t.name?.trim().toLowerCase()
        );
        if (fullNameKey && t.description?.includes("...")) {
            return { ...t, description: fullDescriptionsMap[fullNameKey] };
        }
        return t;
    });

    const logoSlides = (data?.logoSlides || [
        { id: 1, image: "/images/client-1111.jpg", alt: "Client Logo 1" },
        { id: 4, image: "/images/client-4.jpg", alt: "Client Logo 4" },
        { id: 5, image: "/images/client-5.jpg", alt: "Client Logo 5" },
        { id: 6, image: "/images/client-6.jpg", alt: "Client Logo 6" },
        { id: 7, image: "/images/client-7.jpg", alt: "Client Logo 7" },
        { id: 8, image: "/images/client-8.jpg", alt: "Client Logo 8" },
        { id: 9, image: "/images/client-9.jpg", alt: "Client Logo 9" },
        { id: 10, image: "/images/client-10.jpg", alt: "Client Logo 10" },
        { id: 11, image: "/images/client-11.jpg", alt: "Client Logo 11" },
        { id: 12, image: "/images/client-12.jpg", alt: "Client Logo 12" },
        { id: 13, image: "/images/client-13.jpg", alt: "Client Logo 13" },
        { id: 14, image: "/images/client-14.jpg", alt: "Client Logo 14" },
        { id: 15, image: "/images/client-15.jpg", alt: "Client Logo 15" },
        { id: 16, image: "/images/client-16.jpg", alt: "Client Logo 16" },
        { id: 20, image: "/images/client-20.png", alt: "Client Logo 20" },
        { id: 21, image: "/images/client-21.png", alt: "Client Logo 21" },
        { id: 22, image: "/images/client-22.png", alt: "Client Logo 22" },
        { id: 23, image: "/images/client-23.png", alt: "Client Logo 23" },
        { id: 24, image: "/images/client-24.png", alt: "Client Logo 24" },
        { id: 25, image: "/images/client-25.png", alt: "Client Logo 25" }
    ]).filter((slide) => slide.image && slide.image !== "/images/client-2.jpg" && slide.image !== "/images/client-3.jpg");

    return (
        <section
            ref={sectionRef}
            className="sis-testimonial-section relative py-14 sm:py-20 lg:py-24 overflow-hidden"
            aria-label="Client Testimonials and Google Reviews"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={data?.backgroundImage || "/images/about-bg-section.webp"}
                    alt="Testimonials Background"
                    fill
                    sizes="100vw"
                    priority={false}
                    className="object-cover object-center"
                />
                {/* Balanced overlay so the background flag is visible while maintaining contrast */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(11, 17, 32, 0.4) 0%, rgba(11, 17, 32, 0.25) 50%, rgba(11, 17, 32, 0.5) 100%)'
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="sis-testimonial-part relative z-20">
                <div className="container max-w-[1360px] mx-auto px-4 sm:px-6">

                    {/* Section Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
                            <span
                                className="heading-font font-bold"
                                style={{
                                    color: '#002147',
                                    textShadow: '0 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.6)'
                                }}
                            >
                                {data?.titlePart1 || "Our"}{' '}
                            </span>
                            <span
                                className="heading-font font-bold"
                                style={{
                                    color: '#eab308',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                                }}
                            >
                                {data?.titlePart2 || "Happy Customers"}
                            </span>
                        </h2>
                    </div>

                    {/* Google Reviews Graphic / Badge */}
                    <div className="flex justify-center items-center mb-8 sm:mb-10">
                        <div
                            className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl transition-transform duration-300 hover:scale-105"
                            style={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                                border: '1px solid rgba(255, 255, 255, 0.9)'
                            }}
                        >
                            <Image
                                src={data?.googleReviewLogo || "/images/google-review-logo.png"}
                                alt="Google Reviews and 5 Star Rating"
                                width={175}
                                height={65}
                                className="w-auto h-auto max-h-[48px] sm:max-h-[58px] object-contain"
                            />
                        </div>
                    </div>

                    {/* Testimonials Slider */}
                    <div className="relative">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop
                            autoplay={{ delay: 5500, disableOnInteraction: false }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 26 },
                            }}
                            className="testimonial-swiper"
                        >
                            {testimonials.map((testimonial) => (
                                <SwiperSlide key={testimonial.id} className="h-auto">
                                    <div
                                        className="p-6 sm:p-7 rounded-2xl h-[340px] sm:h-[355px] lg:h-[365px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]"
                                        style={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.88)',
                                            backdropFilter: 'blur(16px)',
                                            WebkitBackdropFilter: 'blur(16px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.45)'
                                        }}
                                    >
                                        {/* Card Top: Stars & Quote Icon */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                                    <span key={i} className="text-[#eab308] text-lg leading-none select-none">
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-[#eab308] text-3xl font-serif leading-none select-none opacity-90">
                                                ❝
                                            </span>
                                        </div>

                                        {/* Card Body: Review Description */}
                                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-3">
                                            <p className="text-white text-[14.5px] sm:text-[15.5px] leading-[1.65] font-sans m-0 font-normal">
                                                “{testimonial.description}”
                                            </p>
                                        </div>

                                        {/* Card Footer: Reviewer Info */}
                                        <div
                                            className="flex items-center justify-between pt-3.5 mt-auto"
                                            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.18)' }}
                                        >
                                            <div>
                                                <h4 className="text-white font-bold text-[15px] sm:text-base m-0 tracking-wide">
                                                    {testimonial.name}
                                                </h4>
                                                <span className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 font-medium">
                                                    <svg className="w-3.5 h-3.5 text-emerald-400 inline" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified Review
                                                </span>
                                            </div>
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#eab308]"
                                                style={{
                                                    backgroundColor: 'rgba(234, 179, 8, 0.15)',
                                                    border: '1px solid rgba(234, 179, 8, 0.4)'
                                                }}
                                            >
                                                {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : 'V'}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Client Logos Slider */}
                    <div
                        className="mt-12 sm:mt-16 py-6 px-4 sm:px-6 rounded-2xl"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.75)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <p className="text-center text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-widest mb-4">
                            Trusted By Leading Businesses & Communities
                        </p>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={2}
                            loop
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                                480: { slidesPerView: 3, spaceBetween: 20 },
                                640: { slidesPerView: 4, spaceBetween: 24 },
                                768: { slidesPerView: 5, spaceBetween: 24 },
                                1024: { slidesPerView: 6, spaceBetween: 30 },
                            }}
                            className="logo-swiper"
                        >
                            {logoSlides.map((logo) => (
                                <SwiperSlide key={logo.id} className="flex items-center justify-center">
                                    <div className="w-full flex items-center justify-center h-14">
                                        <Image
                                            src={logo.image}
                                            alt={logo.alt}
                                            width={140}
                                            height={55}
                                            sizes="(max-width: 768px) 30vw, 15vw"
                                            className="mx-auto max-h-[46px] object-contain opacity-85 hover:opacity-100 transition-opacity duration-300 filter drop-shadow"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </div>

            <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(234, 179, 8, 0.6);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(234, 179, 8, 0.9);
            }
            :global(.testimonial-swiper) {
                padding-bottom: 48px !important;
            }
            :global(.testimonial-swiper .swiper-pagination) {
                bottom: 6px !important;
            }
            :global(.testimonial-swiper .swiper-pagination-bullet) {
                background: rgba(255, 255, 255, 0.6) !important;
                width: 9px !important;
                height: 9px !important;
                transition: all 0.3s ease !important;
            }
            :global(.testimonial-swiper .swiper-pagination-bullet-active) {
                background: #eab308 !important;
                width: 24px !important;
                border-radius: 6px !important;
            }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;