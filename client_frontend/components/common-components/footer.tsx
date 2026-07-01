// components/Footer.tsx
'use client';
import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useSettings } from '@/components/common-components/SettingsProvider';
const currentYear = new Date().getFullYear();


const Footer = () => {
    const settings = useSettings();
    return (
        <footer className="main-footer">
            <div className="sisf-page-footer-inner-area br-radius sis-comman-background relative pb-2 mb-3">
                {/* Top Area */}
                <div className="sisf-page-footer-top-area-inner bg-[#002147] pt-[70px]">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {/* Section Title */}
                                <div className="sisf-sis-section-title text-center mb-0 sis-section-title">
                                    <h2 className="sisf-m-title text-white sis-text-anime-style-3 text-4xl md:text-5xl lg:text-6xl font-extrabold">
                                        <span className="sisf-e-colored">
                                            <span className="inline-block relative">
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">R</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">e</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">a</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">d</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">y</span>
                                            </span>{' '}
                                            <span className="inline-block relative">
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">t</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">o</span>
                                            </span>{' '}
                                            <span className="inline-block relative">
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">S</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">e</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">c</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">u</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">r</span>
                                                <span className="inline-block relative opacity-100 translate-y-0 heading-font">e</span>
                                            </span>
                                        </span>{' '}
                                        <span className="inline-block relative">
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">W</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">h</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">a</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">t</span>
                                        </span>
                                        <br />
                                        <span className="inline-block relative">
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">M</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">a</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">t</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">t</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">e</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">r</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">s</span>
                                        </span>{' '}
                                        <span className="inline-block relative">
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">M</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">o</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">s</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">t</span>
                                            <span className="inline-block relative opacity-100 translate-y-0 heading-font">?</span>
                                        </span>
                                    </h2>

                                    <div className="sisf-m-text aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
                                        <p className="text-white text-lg">
                                            Get professional, licensed, and trained security services for businesses, events, and<br />
                                            residences — with rapid response and 24/7 availability.
                                        </p>
                                    </div>

                                    <div className="button-group pt-4 flex items-center justify-center gap-4">
                                        <div className="sisf-m-button aos-init aos-animate" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                                            <Link href="/request-quote" className="sis-btn-default inline-flex items-center gap-2 bg-[#eab308] text-[#002147] px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                                                Request a Quote
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                        <div className="sisf-m-button aos-init aos-animate" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1200">
                                            <Link href="/contact-us" className="sis-btn-default btn-dark inline-flex items-center gap-2 bg-[#eab308] text-[#002147] px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                                                Contact Us
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Scroll Content */}
                                <div className="sis-scroll-container mt-20 mb-10 aos-init aos-animate overflow-hidden" data-aos="fade-up" data-aos-delay="700" data-aos-duration="1200">
                                    <div className="flex whitespace-nowrap animate-scroll">
                                        <div className="sis-scroll-content flex">
                                            <div className="sis-footer-content pr-10">
                                                <span className="text-[50px] font-black uppercase font-heading leading-none text-transparent bg-clip-text heading-font"
                                                    style={{
                                                        WebkitTextStroke: '1px white',
                                                        maskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        WebkitMaskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        color: '#efeeee',
                                                        textShadow: '0px 2px 12px rgba(6,53,52,0.1)'
                                                    }}>
                                                    Virginia Surveillance Force
                                                </span>
                                            </div>
                                            <div className="sis-footer-content pr-10">
                                                <span className="text-[50px] font-black uppercase font-heading leading-none text-transparent bg-clip-text heading-font"
                                                    style={{
                                                        WebkitTextStroke: '1px white',
                                                        maskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        WebkitMaskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        color: '#efeeee',
                                                        textShadow: '0px 2px 12px rgba(6,53,52,0.1)'
                                                    }}>
                                                    Virginia Surveillance Force
                                                </span>
                                            </div>
                                        </div>
                                        <div className="sis-scroll-content flex ms-4">
                                            <div className="sis-footer-content pr-10">
                                                <span className="text-[50px] font-black uppercase font-heading leading-none text-transparent bg-clip-text heading-font"
                                                    style={{
                                                        WebkitTextStroke: '1px white',
                                                        maskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        WebkitMaskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        color: '#efeeee',
                                                        textShadow: '0px 2px 12px rgba(6,53,52,0.1)'
                                                    }}>
                                                    Virginia Surveillance Force
                                                </span>
                                            </div>
                                            <div className="sis-footer-content pr-10">
                                                <span className="text-[50px] font-black uppercase font-heading leading-none text-transparent bg-clip-text heading-font"
                                                    style={{
                                                        WebkitTextStroke: '1px white',
                                                        maskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        WebkitMaskImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) -9.11%, rgba(19,61,60,0) 126.82%)',
                                                        color: '#efeeee',
                                                        textShadow: '0px 2px 12px rgba(6,53,52,0.1)'
                                                    }}>
                                                    Virginia Surveillance Force
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* E Footer Background */}
                <div className="sis-e-footer-background radius bg-[#eab308] mx-[10px] mb-[2px] mt-[10px] rounded-2xl">
                    {/* Middle Area */}
                    <div className="sisf-page-footer-middle-area px-4 pt-[70px] pb-6 border-b border-black/10 -mt-10">
                        <div className="container max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                                {/* Logo & Newsletter Column */}
                                <div className="lg:col-span-2">
                                    <div className="footer-logo mb-4">
                                        <Image
                                            src="/images/trust.gif"
                                            alt="ROW"
                                            width={100}
                                            height={85}
                                            className="h-auto mx-auto lg:mx-0"
                                        />
                                    </div>
                                    <div className="sis-m-text">
                                        <p className="text-[#002147] text-sm font-bold">
                                            Dept. of Criminal Justice PSS # 11-2371<br />
                                            Metropolitan Police SOMB # SAB200504<br />
                                            Md. State Police # 106-3249
                                        </p>
                                    </div>



                                    <strong className="block text-base text-[#002147] mb-2 mt-2">
                                        Total Visitors
                                    </strong>


                                    <div className="flex justify-left lg:justify-left">
                                        <a
                                            href="https://www.clustrmaps.com/map/vsfus.com"
                                            title="Visitor Map for vsfus.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://www.clustrmaps.com/map_v2.png?u=gLr8&d=SF-5JEZtRjxsH38XGDoGr_6z41wKklRWMWGwygl6dQU"
                                                alt="Vsfus Cluster map"
                                                className="max-w-full h-auto"
                                            />
                                        </a>

                                    </div>

                                </div>

                                {/* Services Column */}
                                <div className="lg:col-span-1">
                                    <div className="footer-links">
                                        <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-6">Quick Links</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li className="hover:pl-4 transition-all duration-300">
                                                <Link href="https://www.activitysuite.com/login.aspx?T=AoWqDv4E4WGqBtHsEBEMrg==" className="text-[#002147] hover:text-[#002147]/80" target="_blank">Client / Site Login</Link>
                                            </li>
                                            <li className="hover:pl-4 transition-all duration-300">
                                                <Link href="/pay-now" className="text-[#002147] hover:text-[#002147]/80">Pay Now</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Quick Links Column */}
                                <div className="lg:col-span-1">
                                    <div className="footer-contact">
                                        <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-6">
                                            Get In Touch
                                        </h3>

                                        <p className="text-[#002147] text-sm leading-relaxed mb-4">
                                            <strong>Virginia Surveillance Force</strong><br />

                                            <strong>Address:</strong> {settings.location}<br />
                                            <strong>Tel:</strong> <a href={`tel:${settings.contactNo.replace(/[^0-9]/g, "")}`} className="hover:underline">{settings.contactNo}</a><br />
                                            <strong>Email:</strong> {settings.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Social Links Column */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-[#002147] text-2xl font-extrabold font-heading mb-6 pl-0 lg:pl-4 text-left lg:text-left">
                                        Follow Us
                                    </h3>

                                    <ul className="flex justify-start lg:justify-center gap-6">
                                        <li>
                                            <a
                                                href={settings.socialUrls.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="/images/facebook-img.png"
                                                    alt="Facebook"
                                                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href={settings.socialUrls.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="/images/twitter-img.png"
                                                    alt="Twitter"
                                                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href={settings.socialUrls.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="/images/linkedin-img.png"
                                                    alt="LinkedIn"
                                                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href={settings.socialUrls.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src="/images/youtube-img.png"
                                                    alt="YouTube"
                                                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>





                            </div>
                        </div>
                    </div>

                    {/* Bottom Area */}
                    <div className="sisf-page-footer-bottom-area">
                        <p className="text-[#002147] text-sm font-small leading-relaxed text-center">

                            © 1994–{currentYear} Virginia Surveillance Force. All Rights Reserved.
                            <br />

                            <a
                                href="https://www.wxperts.co/website-development.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Website Development
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://www.wxperts.co/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Hosting
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://www.wxperts.co/search-engine-optimization.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                SEO
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://www.wxperts.co/digital-marketing.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Digital Marketing
                            </a>

                            <br />

                            <a
                                href="https://www.wxperts.co/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3"
                            >
                                <Image
                                    src="/images/wxperts_powerdby.jpg"
                                    alt="WXperts"
                                    width={90}
                                    height={40}
                                    className="mx-auto"
                                />
                            </a>

                        </p>
                    </div>
                </div>
            </div>

            {/* Add custom animations */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </footer>
    );
};

export default Footer;