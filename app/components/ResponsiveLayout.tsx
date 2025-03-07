'use client';

import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useState, useEffect } from 'react';
import { Header } from "@/app/components/Header";
import { InkText } from "@/app/components/Ink-text";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDesktop = width >= 900;

  if (isDesktop) {
    return (
      <div className="fixed inset-0 bg-[#F5F5F5] text-[#1A1A1A] min-h-screen flex flex-col justify-center p-20">
        <div className="max-w-2xl">
          <InkText
            text="SL"
            className="text-7xl italic mb-8 text-left"
            duration={2000}
            randomnessRange={500}
          />
          
          <InkText
            text="Shiyuan Li is a product designer driven by visual craft & storytelling."
            className="text-2xl font-light mb-8 text-left"
            duration={2500}
            baseDelay={300}
            randomnessRange={800}
          />

          <div className="h-px w-full bg-[#1A1A1A]/10 mb-8" />

          <div className="text-[#666666]">
            <InkText
              text="My 2025 portfolio desktop experience is under construction—while that's happening, you can view the mobile version on your phone, 
              or say hello @ lishiyua.dev@gmail.com."
              className="text-xl font-light text-left"
              duration={2800}
              baseDelay={600}
              randomnessRange={1000}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header siteName="SHIYUAN LI" />
      <main>
        {children}
      </main>
    </>
  );
}