'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName = 'Shiyuan' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const socialLinksRef = useRef<HTMLParagraphElement[]>([]);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    // Split text into spans for animation
    if (headerTextRef.current) {
      const text = headerTextRef.current.innerText;
      const splitText = text
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
        .join("");
      headerTextRef.current.innerHTML = splitText;
    }

    // Initialize GSAP states
    gsap.set(menuRef.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      pointerEvents: "none"
    });
    
    gsap.set(linksRef.current, { y: 30, opacity: 0 });
    gsap.set(socialLinksRef.current, { y: 30, opacity: 0 });
    
    if (videoWrapperRef.current) {
      gsap.set(videoWrapperRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
      });
    }
    
    if (headerTextRef.current) {
      const spans = headerTextRef.current.querySelectorAll('span');
      gsap.set(spans, {
        y: 500,
        rotateY: 90,
        scale: 0.75
      });
    }
  }, []);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden';
      // Get current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Enable scrolling on unmount
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isAnimating) return;
    
    setIsMenuOpen(!isMenuOpen);
    setIsAnimating(true);

    if (!isMenuOpen) {
      // Opening animation
      gsap.to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "all";
          }
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      gsap.to(linksRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(socialLinksRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        delay: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });

      if (videoWrapperRef.current) {
        gsap.to(videoWrapperRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1,
          delay: 0.2,
        });
      }

      if (headerTextRef.current) {
        const spans = headerTextRef.current.querySelectorAll('span');
        gsap.to(spans, {
          rotateY: 0,
          stagger: 0.03,
          delay: 0.3,
          duration: 1,
          ease: "power4.out",
        });

        gsap.to(spans, {
          y: 0,
          scale: 1,
          stagger: 0.03,
          delay: 0.2,
          duration: 1,
          ease: "power4.out",
        });
      }
    } else {
      // Closing animation
      gsap.to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "none";
            gsap.set(menuRef.current, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
          }

          gsap.set(linksRef.current, { y: 30, opacity: 0 });
          gsap.set(socialLinksRef.current, { y: 30, opacity: 0 });
          
          if (videoWrapperRef.current) {
            gsap.set(videoWrapperRef.current, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
          }
          
          if (headerTextRef.current) {
            const spans = headerTextRef.current.querySelectorAll('span');
            gsap.set(spans, {
              y: 500,
              rotateY: 90,
              scale: 0.75,
            });
          }

          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <>
      {/* Main Logo - Remove fixed class since it's handled in CSS */}
      <div className="logo">
        <Link href="/" className="text-white font-light uppercase text-[60px] font-geist-sans hover:opacity-80 transition-opacity">
          {siteName}
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <div 
        className={`menu-toggle ${isMenuOpen ? 'opened' : 'closed'}`}
        onClick={toggleMenu}
      >
        <div className="menu-copy">
          <p>Menu</p>
        </div>
        <div className="menu-toggle-icon">
          <div className="hamburger">
            <div className="menu-bar" data-position="top"></div>
            <div className="menu-bar" data-position="bottom"></div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="menu" ref={menuRef}>
        <div className="col col-1">
          <div className="menu-logo">
            <Link href="/" className="text-white font-light uppercase text-[60px] font-geist-sans hover:opacity-80 transition-opacity">
              {siteName}
            </Link>
          </div>
          <div className="links ml-2 mt-20">
            <div className="link" ref={(el) => {
              if (el) linksRef.current.push(el);
            }}>
              <Link href="/projects" className="text-white font-light text-[48px] tracking-[-1.5px] font-geist-sans hover:opacity-80 transition-opacity">
                Projects
              </Link>
            </div>
            <div className="link" ref={(el) => {
              if (el) linksRef.current.push(el);
            }}>
              <Link href="/expertise" className="text-white font-light text-[48px] tracking-[-1.5px] font-geist-sans hover:opacity-80 transition-opacity">
                Expertise
              </Link>
            </div>
            <div className="link" ref={(el) => {
              if (el) linksRef.current.push(el);
            }}>
              <Link href="/agency" className="text-white font-light text-[48px] tracking-[-1.5px] font-geist-sans hover:opacity-80 transition-opacity">
                Agency
              </Link>
            </div>
            <div className="link" ref={(el) => {
              if (el) linksRef.current.push(el);
            }}>
              <Link href="/contact" className="text-white font-light text-[48px] tracking-[-1.5px] font-geist-sans hover:opacity-80 transition-opacity">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="col col-2 mt-20 mr-5">
          <div className="socials">
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              Shiyuan Li
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              5 Science Park
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              New Haven, CT
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="mailto:contact@example.com" className="hover:opacity-70 transition-opacity">
                lishiyua.dev@gmail.com
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="mailto:job@example.com" className="hover:opacity-70 transition-opacity">
                job@example.com
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="https://instagram.com" target="_blank" className="hover:opacity-70 transition-opacity">
                Instagram
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="https://linkedin.com" target="_blank" className="hover:opacity-70 transition-opacity">
                LinkedIn
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="https://twitter.com" target="_blank" className="hover:opacity-70 transition-opacity">
                Twitter
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              <Link href="https://facebook.com" target="_blank" className="hover:opacity-70 transition-opacity">
                Facebook
              </Link>
            </p>
            <p ref={(el) => {
              if (el) socialLinksRef.current.push(el);
            }} className="text-white uppercase font-geist-mono text-xs font-normal">
              203 747 2490
            </p>
          </div>
          <div className="header">
            <h1 ref={headerTextRef} className="text-white uppercase mb-20 mr-10 font-geist-sans text-[500px] font-light leading-none">
            李诗源
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}