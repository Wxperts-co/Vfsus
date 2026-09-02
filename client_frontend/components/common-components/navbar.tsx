// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, Clock, ChevronDown, ChevronRight, Target } from 'lucide-react';
import { useSettings } from '@/components/common-components/SettingsProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Services', href: '/services' },
    { name: 'Testimonials', href: '/testimonials' },
    {
      name: 'Menu List',
      href: '/menu',
      submenu: [
        { name: 'Why Choose Us?', href: '/menu/why-choose-us' },
        { name: 'How We Recruit?', href: '/menu/how-we-recruit' },
        { name: 'FAQs', href: '/menu/faqs' },
        { name: 'VSF Resource Library', href: '/menu/vsf-resource-library' },
        { name: 'VSF Three Divisions', href: '/menu/vsf-three-divisions' },
        { name: 'VSF Goes Nationwide!', href: '/menu/vsf-goes-nationwide' },
        { name: 'Employment', href: '/menu/employment' },
      ]
    },
    {
      name: 'Forms',
      href: '#',
      submenu: [
        { name: 'Service Request (For Existing Clients)', href: '/forms/service-request' },
        { name: 'Contracting Oppertunities', href: '/forms/contracting-opportunity' },
        { name: 'Employment Application', href: 'https://jetsign.com/f/u3s6PFUR', target: '_blank' },
      ]
    },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const settings = useSettings();

  const socialLinks = [
    { icon: "/images/facebook-img.png", href: settings.socialUrls.facebook, label: 'Facebook' },
    { icon: "/images/twitter-img.png", href: settings.socialUrls.twitter, label: 'Twitter' },
    { icon: "/images/linkedin-img.png", href: settings.socialUrls.linkedin, label: 'LinkedIn' },
    { icon: "/images/youtube-img.png", href: settings.socialUrls.youtube, label: 'YouTube' },
    { icon: "/images/tiktok-img.png", href: settings.socialUrls.tiktok, label: 'TikTok' },
    { icon: "/images/instagram-img.png", href: settings.socialUrls.instagram, label: 'Instagram' },
  ];

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileSubmenu = (itemName: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === itemName ? null : itemName);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-black/90 backdrop-blur-md py-0 lg:py-0.5 shadow-xl'
        : 'bg-black/50 backdrop-blur-sm py-0 lg:py-0.5'
        }`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
          {/* Top Row */}
          <div className="flex items-center justify-between py-0 border-b border-gray-700">
            {/* Left Side - Address & Phone */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              <div className="flex items-center space-x-1.5 xl:space-x-2">
                <MapPin className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-yellow-400" />
                <a
                  href={settings.mapLink}
                  target='_blank'
                  className="text-gray-300 text-[11px] xl:text-[12px] 2xl:text-[13px] hover:text-yellow-400 transition-colors"
                >
                  {settings.location}
                </a>
              </div>
              <div className="flex items-center space-x-1.5 xl:space-x-2">
                <Phone className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-yellow-400" />
                <a
                  href={`tel:${settings.contactNo.replace(/[^0-9]/g, "")}`}
                  className="text-gray-300 text-[11px] xl:text-[12px] 2xl:text-[13px] hover:text-yellow-400 transition-colors"
                >
                  {settings.contactNo}
                </a>
              </div>
            </div>

            {/* Logo + Brand String */}
            <div className="flex-1 lg:flex-none flex justify-center items-center py-1">
              <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group">
                <div className="relative flex-shrink-0">
                  {/* Desktop Logo */}
                  <div className="hidden lg:block relative w-[90px] xl:w-[105px] 2xl:w-[105px] h-auto">
                    <Image
                      src={settings.logoUrl}
                      alt="Company Logo"
                      width={220}
                      height={60}
                      className="object-contain w-full h-auto transition-transform duration-200 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Mobile Logo */}
                  <div className="lg:hidden relative w-[80px] sm:w-[95px] md:w-[105px] h-auto">
                    <Image
                      src={settings.logoUrl}
                      alt="Company Logo"
                      width={140}
                      height={38}
                      sizes="140px"
                      className="object-contain w-full h-auto"
                      priority
                    />
                  </div>
                </div>

                {/* Brand String vertically centered right of logo */}
                <span className="text-white font-extrabold uppercase tracking-wide heading-font leading-none text-base sm:text-lg lg:text-lg xl:text-xl 2xl:text-2xl whitespace-nowrap group-hover:text-yellow-400 transition-colors">
                  Virginia Surveillance Force
                </span>
              </Link>
            </div>

            {/* Right Side - Hours & Social */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              <div className="flex items-center space-x-1.5 xl:space-x-2">
                <Clock className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-yellow-400" />
                <span className="text-gray-300 text-[11px] xl:text-[12px] 2xl:text-[13px]">Mon - Fri: 9AM - 6PM</span>
              </div>

              <ul className="flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Image
                        src={social.icon}
                        alt={social.label}
                        width={24}
                        height={24}
                        className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 hover:scale-110 transition-transform duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Bottom Row - Navigation - Responsive for all screen sizes */}
          <div className="hidden lg:flex justify-center py-1 xl:py-1.5 2xl:py-2">
            <nav className="flex items-center gap-1 xl:gap-2.5 2xl:gap-4">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group" ref={mobileMenuRef}>
                  {item.submenu ? (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center px-2.5 xl:px-3.5 2xl:px-4 py-1 xl:py-1.5 text-gray-200 hover:text-yellow-400 transition-all duration-200 font-medium whitespace-nowrap
                        text-[15px] xl:text-[16px] 2xl:text-[16px] uppercase tracking-wider cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3 xl:h-3.5 xl:w-3.5" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-2.5 xl:px-3.5 2xl:px-4 py-1 xl:py-1.5 text-gray-200 hover:text-yellow-400 transition-all duration-200 font-medium whitespace-nowrap
                        text-[15px] xl:text-[16px] 2xl:text-[16px] uppercase tracking-wider"
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.submenu && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 top-full pt-2 transition-all duration-200 ${activeDropdown === item.name
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                      }`}>
                      <div className="bg-black/95 backdrop-blur-sm border border-yellow-500/20 rounded-lg shadow-2xl py-1.5 min-w-[300px] xl:min-w-[320px]">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            target={subItem.target}
                            rel={subItem.target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-2 xl:py-2.5 2xl:py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors duration-150
                              text-[12px] xl:text-[13px] 2xl:text-[14px]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Request A Quote Button */}
              <Link
                href="/request-quote"
                className="ml-2.5 xl:ml-4 2xl:ml-5 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold 
                  px-4 xl:px-5 2xl:px-6 py-1.5 xl:py-2 rounded-full whitespace-nowrap
                  text-[13px] xl:text-[14px] 2xl:text-[14px] uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                Request A Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setIsMenuOpen(false);
              setMobileOpenSubmenu(null);
            }}
          />

          <div className="absolute top-0 left-0 h-full w-full max-w-xs sm:max-w-sm overflow-hidden">
            <div className="relative h-full w-full bg-black/95 border-r border-yellow-500/20 shadow-2xl flex flex-col">
              {/* Fixed Header */}
              <div className="flex-shrink-0 p-4 sm:p-5 border-b border-yellow-500/20 bg-black/95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="relative w-[70px] h-auto">
                      <Image
                        src={settings.logoUrl}
                        alt="Company Logo"
                        width={140}
                        height={38}
                        sizes="140px"
                        className="object-contain w-full h-auto"
                      />
                    </div>
                    <span className="text-white font-bold uppercase tracking-wide heading-font text-xs sm:text-sm">
                      Virginia Surveillance Force
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileOpenSubmenu(null);
                    }}
                    className="text-gray-400 hover:text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
                  >
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-5">


                  {/* Mobile Menu Items */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <div key={item.name} className="border-b border-gray-800/30 last:border-0">
                        {item.submenu ? (
                          <div className="py-2 sm:py-3">
                            <button
                              onClick={() => toggleMobileSubmenu(item.name)}
                              className="flex items-center justify-between w-full text-left text-gray-300 hover:text-yellow-400 transition-colors text-sm sm:text-base font-medium"
                            >
                              <span>{item.name}</span>
                              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${mobileOpenSubmenu === item.name ? 'rotate-90' : ''
                                }`} />
                            </button>

                            <div className={`overflow-hidden transition-all duration-200 ${mobileOpenSubmenu === item.name ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                              }`}>
                              <div className="ml-3 sm:ml-4 space-y-1 pb-1">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    target={subItem.target}
                                    rel={subItem.target === '_blank' ? 'noopener noreferrer' : undefined}
                                    className="block py-1.5 sm:py-2 text-gray-400 hover:text-yellow-400 text-xs sm:text-sm transition-colors"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setMobileOpenSubmenu(null);
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="py-2 sm:py-3">
                            <Link
                              href={item.href}
                              className="flex items-center justify-between w-full text-gray-300 hover:text-yellow-400 transition-colors text-sm sm:text-base font-medium"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setMobileOpenSubmenu(null);
                              }}
                            >
                              {item.name}
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Request Quote Button */}
                  <div className="mt-6 sm:mt-8 pb-6">
                    <Link
                      href="/request-quote"
                      className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold 
                        px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider text-center transition-all duration-200"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenSubmenu(null);
                      }}
                    >
                      Request A Quote
                    </Link>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <a
                        href={settings.mapLink}
                        target='_blank'
                        className="text-gray-300 text-xs sm:text-sm hover:text-yellow-400"
                      >
                        {settings.location}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
                      <a
                        href={`tel:${settings.contactNo.replace(/[^0-9]/g, "")}`}
                        className="text-gray-300 text-xs sm:text-sm hover:text-yellow-400"
                      >
                        {settings.contactNo}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        Mon - Fri: 9:00 AM - 6:00 PM
                      </span>
                    </div>
                  </div>

                  {/* Mobile Social Links */}
                  <ul className="flex items-center gap-3 mt-4 flex-wrap">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          <Image
                            src={social.icon}
                            alt={social.label}
                            width={28}
                            height={28}
                            className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>


                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
