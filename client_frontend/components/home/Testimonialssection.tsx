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

    const testimonials = data?.testimonials || [
        {
            id: 1,
            description: "I initially hired VA. Surveillance Force during thanksgiving on a temporary basis, but the level of service quickly exceeded our expectations. The officers were professional, reliable, and consistently alert, with excellent communication and attention to detail. Their strong presence and proactive approach impressed our board so much that we decided to move forward with a permanent engagement. Highly recommended for dependable, high quality security services.",
            rating: 5,
            name: "Lily Z.",
        },
        {
            id: 2,
            description: "We switched to Virginia Surveillance company after ongoing issues with our previous provider. The difference was immediate. Their officers are professional, alert, and highly disciplined. Management is responsive and actively involved. If you want security done right, this is the company to hire.",
            rating: 5,
            name: "Henry Anatsui",
        },
        {
            id: 3,
            description: "On July 4th, after residents had finished fireworks and gone to sleep, Virginia Surveillance Force officer noticed smoke on the rooftop around 1:40 AM. He promptly called the fire department and began alerting and evacuating residents. We sincerely appreciate his alertness and quick action in keeping everyone safe and preventing a fire.",
            rating: 5,
            name: "Della Paul",
        },
        {
            id: 4,
            description: "The security team at the entrance struck an ideal balance between ensuring safety and providing warm hospitality. Their ability to maintain a secure environment while creating a welcoming atmosphere was truly appreciated. Thank you to Virginia Surveillance Force management team for the excellent service.",
            rating: 5,
            name: "Omid Karimi",
        },
        {
            id: 5,
            description: "I have witnessed the security officers at the private school consistently professional, approachable, and welcoming. Dressed in an authoritative uniform, they greet every child and parent with a warm smile, creating a safe and reassuring environment from the moment you arrive. Their presence is truly valued, Thank you Virginia Surveillance for keeping our children safe and protected.",
            rating: 5,
            name: "Hermann E",
        }
    ];

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
        { id: 16, image: "/images/client-16.jpg", alt: "Client Logo 16" }
    ]).filter((slide) => slide.image !== "/images/client-2.jpg" && slide.image !== "/images/client-3.jpg");

    return (
        <div
            ref={sectionRef}
            className="sis-testimonial-section relative section py-[80px] md:py-[100px] overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={data?.backgroundImage || "/images/about-bg-section.webp"}
                    alt="Testimonials Background"
                    fill
                    sizes="100vw"
                    priority={false}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="sis-testimonial-part relative z-20 pt-[20px]">
                <div className="container max-w-[1400px] mx-auto px-[15px]">

                    {/* Section Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] text-[#eab308] max-w-4xl mx-auto">
                            <span className="text-[#002147] heading-font">{data?.titlePart1 || "Our"} </span> {data?.titlePart2 || "Happy Customers"}
                        </h2>
                    </div>

                    {/* Rating Section */}
                    <div className="flex items-center justify-center gap-6 mb-10">
                        <figure className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl m-0">
                            <Image
                                src={data?.googleReviewLogo || "/images/google-review-logo.png"}
                                alt="Google Ratings"
                                width={180}
                                height={90}
                                className="w-auto h-auto max-h-[70px] object-contain"
                            />
                        </figure>
                    </div>

                    {/* Testimonials Slider */}
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="testimonial-swiper pb-12"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="p-6 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl h-[360px] flex flex-col hover:border-[#eab308] transition-colors duration-300">
                                    <div className="flex-1 overflow-y-auto custom-scrollbar mb-4">
                                        <p className="text-white text-base leading-relaxed font-sans m-0">
                                            “{testimonial.description}”
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-auto">
                                        <p className="text-white font-semibold m-0">
                                            {testimonial.name}
                                        </p>
                                        <span className="text-[#eab308] text-3xl opacity-100 leading-none">
                                            ❝
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Logo Slider */}
                    <div className="mt-14 bg-white/5 backdrop-blur-md py-6 px-4 rounded-3xl">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={2}
                            loop
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                                480: { slidesPerView: 3 },
                                640: { slidesPerView: 4 },
                                768: { slidesPerView: 5 },
                                1024: { slidesPerView: 6 },
                            }}
                            className="logo-swiper"
                        >
                            {logoSlides.map((logo) => (
                                <SwiperSlide key={logo.id} className="flex items-center justify-center">
                                    <Image
                                        src={logo.image}
                                        alt={logo.alt}
                                        width={140}
                                        height={55}
                                        sizes="(max-width: 768px) 30vw, 15vw"
                                        className="mx-auto max-h-[50px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                                    />
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
                background: rgba(234, 179, 8, 0.5);
                border-radius: 10px;
            }
            .testimonial-swiper {
                padding-bottom: 45px !important;
            }
            :global(.testimonial-swiper .swiper-pagination-bullet) {
                background: rgba(255, 255, 255, 0.5) !important;
                opacity: 1 !important;
            }
            :global(.testimonial-swiper .swiper-pagination-bullet-active) {
                background: #eab308 !important;
            }
            `}</style>
        </div>
    );
};

export default TestimonialsSection;