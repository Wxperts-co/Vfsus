// components/AboutSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from "lucide-react";
import { HomeAboutSection } from '@/lib/page-home';

const AboutSection = ({ data }: { data?: HomeAboutSection }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const animatedRef = useRef(false);
    const [showPlayer, setShowPlayer] = useState(false);

    // Smooth counter animation using requestAnimationFrame
    const animateCounter = (element: HTMLElement, target: number) => {
        const duration = 1000;
        const startTime = performance.now();

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);
            element.textContent = currentVal.toString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toString();
            }
        };

        requestAnimationFrame(update);
    };

    // Intersection Observer for animations
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animatedRef.current) {
                    animatedRef.current = true;
                    node.classList.add('aos-animate');

                    const counterSpans = node.querySelectorAll('.counter');
                    const targetValues = [150, 98, 500];
                    counterSpans.forEach((span, index) => {
                        const target = targetValues[index] || 100;
                        animateCounter(span as HTMLElement, target);
                    });
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const videoUrl = data?.videoUrl || "https://fast.wistia.net/embed/iframe/bukr8v224n";
    const isDirectVideo = videoUrl.startsWith('/uploads/') || 
                          videoUrl.split('?')[0].toLowerCase().endsWith('.mp4') || 
                          videoUrl.split('?')[0].toLowerCase().endsWith('.webm') || 
                          videoUrl.split('?')[0].toLowerCase().endsWith('.ogg');

    return (
        <div
            ref={sectionRef}
            className="sis-about-us-section relative py-[80px] md:py-[100px] px-0 pb-[70px] overflow-hidden"
        >
            {/* American Flag Background */}
            <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80 z-10" />
                <Image
                    src="/images/about-bg-section.webp"
                    alt="American Flag"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container max-w-[1400px] mx-auto px-[15px] relative z-10">
                <div className="row flex flex-wrap -mx-[15px]">

                    {/* Left Column - Col LG 6 */}
                    <div className="col-lg-6 w-full lg:w-1/2 px-[15px]">

                        {/* Video Section with Facade Pattern for Zero Initial CPU / Network Penalty */}
                        <div className="sisf-sis-about-inner-image relative mb-8">
                            <figure className="sis-image-anime sis-reveal relative overflow-hidden w-full group rounded-[20px] m-0">
                                <div className="relative overflow-hidden w-full rounded-[20px]">
                                    <div className="relative w-[87%] aspect-video rounded-[20px] overflow-hidden bg-[#0b1120] shadow-2xl">
                                        {!showPlayer ? (
                                            /* High-performance Video Facade */
                                            <div 
                                                onClick={() => setShowPlayer(true)}
                                                className="relative w-full h-full cursor-pointer group/facade overflow-hidden"
                                                role="button"
                                                tabIndex={0}
                                                aria-label="Watch Video"
                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPlayer(true); }}
                                            >
                                                <Image
                                                    src="/images/about-section-1.webp"
                                                    alt="Watch About Us Video"
                                                    fill
                                                    sizes="(max-width: 768px) 340px, 500px"
                                                    className="object-cover transition-transform duration-500 group-hover/facade:scale-105 opacity-90"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover/facade:bg-black/20 transition-colors" />
                                                
                                                {/* Play Button */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#eab308] text-[#002147] flex items-center justify-center shadow-2xl transform group-hover/facade:scale-110 transition-transform duration-300">
                                                        <Play className="w-6 h-6 md:w-7 md:h-7 fill-[#002147] ml-1" />
                                                    </div>
                                                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                                                        Watch Video
                                                    </span>
                                                </div>
                                            </div>
                                        ) : isDirectVideo ? (
                                            <video
                                                src={videoUrl}
                                                controls
                                                autoPlay
                                                playsInline
                                                className="w-full h-full rounded-[20px] object-cover"
                                            />
                                        ) : (
                                            <iframe
                                                src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoPlay=true`}
                                                allow="autoplay; fullscreen"
                                                allowFullScreen
                                                title="VSF About Us Video"
                                                className="w-full h-full rounded-[20px] border-none"
                                            />
                                        )}
                                    </div>
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

                        <div className="sisf-m-button pt-6 leading-none">
                            <Link
                                href={data?.buttonLink || "/about-us"}
                                aria-label="Read More About Virginia Surveillance Force"
                                className="sis-btn-default relative inline-flex items-center gap-2 text-lg font-extrabold leading-6 bg-[#eab308] text-[#002147] rounded-[50px] px-7 py-3 border border-[#eab308] overflow-hidden group z-10 transition-all duration-300 hover:text-white shadow-lg hover:shadow-yellow-500/30"
                            >
                                <span className="relative z-20 flex items-center gap-2">
                                    {data?.buttonText || "Read More"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <span className="absolute left-[-15px] bottom-[-2px] w-0 h-[106%] bg-[#002147] transform skew-[30deg] group-hover:w-[120%] transition-all duration-300 z-0" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Col LG 6 */}
                    <div className="col-lg-6 w-full lg:w-1/2 px-[15px] mt-10 lg:mt-0">

                        {/* Section Title */}
                        <div className="sisf-sis-section-title sis-section-title mb-10 p-8">
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
                            <figure className="sis-image-anime sis-reveal relative overflow-hidden w-full group rounded-[20px] m-0">
                                <div className="relative overflow-hidden w-full rounded-[20px]">
                                    <Image
                                        src={data?.image || "/images/about-section-2.webp"}
                                        alt="Virginia Surveillance Force Security Officers"
                                        width={500}
                                        height={350}
                                        sizes="(max-width: 768px) 360px, 600px"
                                        className="w-full h-auto object-cover origin-left rounded-[20px] transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                {/* Image Reveal Animation Overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute w-[200%] h-0 left-1/2 top-1/2 bg-white/30 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:h-[200%] transition-all duration-700" />
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;