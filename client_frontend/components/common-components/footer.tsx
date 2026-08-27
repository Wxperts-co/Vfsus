// components/Footer.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '@/components/common-components/SettingsProvider';

const currentYear = new Date().getFullYear();

const Footer = () => {
    const settings = useSettings();
    return (
        <footer className="main-footer bg-[#0b1120]">
            <div className="sisf-page-footer-inner-area relative pb-2 mb-3">
                {/* Top Area */}
                <div className="sisf-page-footer-top-area-inner bg-[#002147] pt-[70px]">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-0">
                            {/* Section Title */}
                            <h2 className="sisf-m-title text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                                <span className="text-[#eab308] heading-font">Ready to Secure </span>
                                <span className="text-white heading-font">What Matters Most?</span>
                            </h2>

                            <div className="sisf-m-text max-w-3xl mx-auto mb-6">
                                <p className="text-white text-base md:text-lg font-sans">
                                    Get professional, licensed, and trained security services for businesses, events, and
                                    residences — with rapid response and 24/7 availability.
                                </p>
                            </div>

                            <div className="button-group pt-2 flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/request-quote"
                                    className="sis-btn-default inline-flex items-center gap-2 bg-[#eab308] text-[#002147] px-7 py-3.5 rounded-full font-bold hover:bg-[#d9a507] transition-colors duration-200 shadow-lg"
                                >
                                    <span>Request a Quote</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="sis-btn-default inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-3.5 rounded-full font-bold hover:bg-white/20 transition-colors duration-200"
                                >
                                    <span>Contact Us</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Scroll Content - GPU Accelerated */}
                            <div className="sis-scroll-container mt-16 mb-8 overflow-hidden">
                                <div className="flex whitespace-nowrap animate-scroll">
                                    {[...Array(4)].map((_, idx) => (
                                        <div key={idx} className="sis-footer-content px-8">
                                            <span
                                                className="text-[40px] md:text-[50px] font-black uppercase font-heading leading-none text-transparent bg-clip-text heading-font"
                                                style={{
                                                    WebkitTextStroke: '1px rgba(255,255,255,0.4)',
                                                    color: 'rgba(239,238,238,0.2)',
                                                    textShadow: '0px 2px 12px rgba(6,53,52,0.1)'
                                                }}
                                            >
                                                Virginia Surveillance Force
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* E Footer Background */}
                <div className="sis-e-footer-background bg-[#eab308] mx-[10px] mb-[2px] mt-[10px] rounded-2xl">
                    {/* Middle Area */}
                    <div className="sisf-page-footer-middle-area px-4 pt-[50px] pb-6 border-b border-black/10">
                        <div className="container max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                                {/* Logo & Newsletter Column */}
                                <div className="lg:col-span-2">
                                    <div className="footer-logo mb-4">
                                        <Image
                                            src="/images/trust.gif"
                                            alt="VSF Trust Badge"
                                            width={100}
                                            height={85}
                                            loading="lazy"
                                            className="h-auto mx-auto lg:mx-0"
                                        />
                                    </div>
                                    <div className="sis-m-text">
                                        <p className="text-[#002147] text-sm font-bold font-sans">
                                            Dept. of Criminal Justice PSS # 11-2371<br />
                                            Metropolitan Police SOMB # SAB200504<br />
                                            Md. State Police # 106-3249
                                        </p>
                                    </div>

                                    <strong className="block text-base text-[#002147] mb-2 mt-3 font-sans">
                                        Total Visitors
                                    </strong>

                                    <div className="flex justify-start">
                                        <a
                                            href="https://www.clustrmaps.com/map/vsfus.com"
                                            title="Visitor Map for vsfus.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://www.clustrmaps.com/map_v2.png?u=gLr8&d=SF-5JEZtRjxsH38XGDoGr_6z41wKklRWMWGwygl6dQU"
                                                alt="Vsfus Cluster map"
                                                loading="lazy"
                                                decoding="async"
                                                width="160"
                                                height="100"
                                                className="max-w-full h-auto"
                                            />
                                        </a>
                                    </div>
                                </div>

                                {/* Services Column */}
                                <div className="lg:col-span-1">
                                    <div className="footer-links">
                                        <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-4 heading-font">Quick Links</h3>
                                        <ul className="list-disc pl-5 space-y-2 font-sans">
                                            <li>
                                                <Link href="https://www.activitysuite.com/login.aspx?T=AoWqDv4E4WGqBtHsEBEMrg==" className="text-[#002147] hover:underline font-medium" target="_blank" rel="noopener noreferrer">Client / Site Login</Link>
                                            </li>
                                            <li>
                                                <Link href="/pay-now" className="text-[#002147] hover:underline font-medium">Pay Now</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Quick Links Column */}
                                <div className="lg:col-span-1">
                                    <div className="footer-contact">
                                        <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-4 heading-font">
                                            Get In Touch
                                        </h3>

                                        <p className="text-[#002147] text-sm leading-relaxed mb-4 font-sans">
                                            <strong>Virginia Surveillance Force</strong><br />
                                            <strong>Address:</strong> {settings.location}<br />
                                            <strong>Tel:</strong> <a href={`tel:${settings.contactNo.replace(/[^0-9]/g, "")}`} className="hover:underline">{settings.contactNo}</a><br />
                                            <strong>Email:</strong> {settings.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Social Links Column */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-4 heading-font">
                                        Follow Us
                                    </h3>

                                    <ul className="flex items-center gap-4">
                                        {[
                                            { src: "/images/facebook-img.png", alt: "Facebook", href: settings.socialUrls.facebook },
                                            { src: "/images/twitter-img.png", alt: "Twitter", href: settings.socialUrls.twitter },
                                            { src: "/images/linkedin-img.png", alt: "LinkedIn", href: settings.socialUrls.linkedin },
                                            { src: "/images/youtube-img.png", alt: "YouTube", href: settings.socialUrls.youtube },
                                        ].map((s, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Image
                                                        src={s.src}
                                                        alt={s.alt}
                                                        width={32}
                                                        height={32}
                                                        loading="lazy"
                                                        className="w-8 h-8 hover:scale-110 transition-transform duration-200"
                                                    />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Area */}
                    <div className="sisf-page-footer-bottom-area py-4">
                        <p className="text-[#002147] text-xs sm:text-sm leading-relaxed text-center font-sans m-0">
                            © 1994–{currentYear} Virginia Surveillance Force. All Rights Reserved.
                            <br />
                            <a href="https://www.wxperts.co/website-development.php" target="_blank" rel="noopener noreferrer" className="hover:underline">Website Development</a> |{" "}
                            <a href="https://www.wxperts.co/" target="_blank" rel="noopener noreferrer" className="hover:underline">Hosting</a> |{" "}
                            <a href="https://www.wxperts.co/search-engine-optimization.php" target="_blank" rel="noopener noreferrer" className="hover:underline">SEO</a> |{" "}
                            <a href="https://www.wxperts.co/digital-marketing.php" target="_blank" rel="noopener noreferrer" className="hover:underline">Digital Marketing</a>
                            <br />
                            <a href="https://www.wxperts.co/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                                <Image
                                    src="/images/wxperts_powerdby.jpg"
                                    alt="WXperts"
                                    width={90}
                                    height={40}
                                    loading="lazy"
                                    className="mx-auto h-auto"
                                />
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Hardware-Accelerated Marquee */}
            <style jsx>{`
                @keyframes scrollFooter {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .animate-scroll {
                    animation: scrollFooter 25s linear infinite;
                    will-change: transform;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </footer>
    );
};

export default Footer;