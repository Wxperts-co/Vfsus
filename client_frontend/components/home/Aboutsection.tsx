// components/AboutSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from "lucide-react";
import { HomeAboutSection } from '@/lib/page-home';

const AboutSection = ({ data }: { data?: HomeAboutSection }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Counter animation function
    const animateCounter = (element: HTMLElement, target: number) => {
        let current = 0;
        const increment = target / 50; // Smooth animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }, 20);
    };

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');

                        // Animate counters when section is visible
                        if (entry.target.classList.contains('sis-about-counter')) {
                            const counterSpans = entry.target.querySelectorAll('.counter');
                            counterSpans.forEach((span, index) => {
                                const targetValues = [150, 98, 500];
                                animateCounter(span as HTMLElement, targetValues[index]);
                            });
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Video popup functionality
    const openVideoPopup = (e: React.MouseEvent, videoUrl: string) => {
        e.preventDefault();
        // Create modal for video
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center';
        modal.innerHTML = `
      <div class="relative w-full max-w-4xl mx-4">
        <button class="absolute -top-10 right-0 text-white text-2xl hover:text-yellow-500">&times;</button>
        <video src="${videoUrl}" controls autoplay class="w-full"></video>
      </div>
    `;

        modal.querySelector('button')?.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        document.body.appendChild(modal);
    };

    return (
        <div
            ref={sectionRef}
            className="sis-about-us-section relative py-[100px] px-0 pb-[70px] overflow-hidden"
        >
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

            {/* Top Right Image with AOS */}
            <div
                className="sisf-sis-top-right-image absolute right-0 top-0 w-[150px] z-20 opacity-0 translate-x-[100px] transition-all duration-1200 ease-out aos-init"
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-duration="1200"
            >
                <figure className="m-0">
                    <Image
                        src="/images/security-logo.svg"
                        alt="Row"
                        width={150}
                        height={150}
                        className="max-w-full h-auto"
                    />
                </figure>
            </div>

            <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10">
                <div className="row flex flex-wrap -mx-[15px]">

                    {/* Left Column - Col LG 6 */}
                    <div className="col-lg-6 w-full lg:w-1/2 px-[15px]">

                        {/* Inner Image with Video Button */}
                        <div className="sisf-sis-about-inner-image relative mb-8">
                            {/* Video Section */}
                            <figure className="sis-image-anime sis-reveal relative overflow-hidden w-full group rounded-[20px]">
                                <div className="relative overflow-hidden w-full rounded-[20px]">
                                    <div className="relative w-[87%] aspect-video rounded-[20px] overflow-hidden">
                                        {data?.videoUrl && (data.videoUrl.startsWith('/uploads/') || data.videoUrl.split('?')[0].toLowerCase().endsWith('.mp4') || data.videoUrl.split('?')[0].toLowerCase().endsWith('.webm') || data.videoUrl.split('?')[0].toLowerCase().endsWith('.ogg')) ? (
                                            <video
                                                src={data.videoUrl}
                                                controls
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full rounded-[20px] object-cover"
                                            />
                                        ) : (
                                            <iframe
                                                src={data?.videoUrl || "https://fast.wistia.net/embed/iframe/bukr8v224n"}
                                                allow="autoplay; fullscreen"
                                                allowFullScreen
                                                className="w-full h-full rounded-[20px]"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Optional Hover Overlay Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/20 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-700" />
                                </div>
                            </figure>
                        </div>

                        <div className="sisf-sis-section-title sis-section-title mb-12">
                            <div className="sisf-m-text">
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-sans">
                                    {data?.description || "Welcome to the American based firm working throughout the Washington DC DMV area. We provide Special Police, Concierge, Courier, Fire Watch, Armed & Unarmed officers, Vehicle Patrol, Investigative and Protective Services. Regardless of the type of service you need, you're looking for peace of mind. You want an authoritative presence that provides you with ultimate security. We believe in investing in our people, so they, in turn, invest in you. Whether you are a small or large business or government entity, whether your needs are immediate or long-term, we have the solutions to your security & business problems. We provide the peace of mind you are looking for."}
                                </p>
                            </div>
                        </div>

                        <div className="sis-about-counter">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                {(data?.counters || [
                                    { number: 150, symbol: "+", label: "Certified & Trained Guards" },
                                    { number: 98, symbol: "%", label: "Client Retention Rate" },
                                    { number: 500, symbol: "+", label: "Security Assignments Completed" }
                                ]).map((counter, idx) => (
                                    <div
                                        key={idx}
                                        className="counter-item"
                                        data-aos="fade-up"
                                        data-aos-delay={(idx + 1) * 100}
                                        data-aos-duration="1200"
                                    >
                                        <div className="counter-title">
                                            <h2 className="flex items-center justify-center text-4xl font-bold text-primary text-[#eab308] text-5xl">
                                                <span className="counter">{counter.number}</span>
                                                <span className="ml-1">{counter.symbol}</span>
                                            </h2>
                                        </div>
                                        <div className="counter-content mt-2">
                                            <span className="text-gray-900 font-medium">
                                                {counter.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="sisf-m-button pt-4 leading-none">
                            <Link
                                href={data?.buttonLink || "/about-us"}
                                className="sis-btn-default relative inline-block text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-7 py-3 border border-[#eab308] overflow-hidden group z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
                            >
                                <span className="relative z-20 flex items-center">
                                    {data?.buttonText || "Read More"}
                                    <i className="fa-solid fa-arrow-right ml-2.5 text-base transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
                                </span>
                                <span className="absolute left-[-15px] bottom-[-2px] w-0 h-[106%] bg-[#002147] transform skew-[30deg] group-hover:w-[120%] transition-all duration-300 z-0" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Col LG 6 */}
                    <div className="col-lg-6 w-full lg:w-1/2 px-[15px] mt-10 lg:mt-0">

                        {/* Section Title with Character Animation */}
                        <div className="sisf-sis-section-title sis-section-title mb-10 p-8 ">


                            <h2 className="sisf-m-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[58px] mb-5 relative z-10">
                                {/* Line 1 */}
                                <span className="block text-[#eab308] heading-font">
                                    {data?.titleLine1 || "Delivering Protection"}
                                </span>

                                {/* Line 2 */}
                                <span className="block text-[#002147] lg:text-3xl heading-font">
                                    {data?.titleLine2 || "That Builds Trust & Peace of Mind"}
                                </span>
                            </h2>

                        </div>

                        {/* Right Side Image */}
                        <div className="sis-about-image-right shadow-xl rounded-[20px]">
                            <figure className="sis-image-anime sis-reveal relative overflow-hidden w-full group rounded-[20px]">
                                <div className="relative overflow-hidden w-full rounded-[20px]">
                                    <Image
                                        src={data?.image || "/images/about-section-2.jpg"}
                                        alt="Row"
                                        width={600}
                                        height={400}
                                        className="w-full radius h-auto object-cover origin-left rounded-[20px] transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                {/* Image Reveal Animation Overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/30 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-700" />
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional CSS Animations */}
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.2);
            opacity: 0;
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
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .scale-60 {
          scale: 0.6;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .aos-init {
          opacity: 0;
          transform: translateY(20px) translateX(0);
          transition-property: opacity, transform;
        }
        
        .aos-init.aos-animate {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
        
        [data-aos="fade-left"].aos-init {
          transform: translateX(100px);
        }
        
        [data-aos="fade-left"].aos-init.aos-animate {
          transform: translateX(0);
        }
        
        [data-aos="fade-up"].aos-init {
          transform: translateY(20px);
        }
        
        [data-aos="fade-up"].aos-init.aos-animate {
          transform: translateY(0);
        }
        
        .duration-1200 {
          transition-duration: 1200ms;
        }
      `}</style>
        </div>
    );
};

export default AboutSection;