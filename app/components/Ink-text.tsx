"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface InkTextProps {
  text: string
  className?: string
  baseDelay?: number
  duration?: number
  color?: string
  randomnessRange?: number
  fontFamily?: string
}

export function InkText({
  text,
  className,
  baseDelay = 0,
  duration = 2000,
  color = "currentColor",
  randomnessRange = 1000,
  fontFamily,
}: InkTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const words = useMemo(() => text.split(" "), [text])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("ink-text-container relative", className)}
      style={{
        color,
        fontFamily: fontFamily || "inherit",
      }}
    >
      <div className="ink-text relative text-left">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="ink-char relative inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  filter: `blur(${isVisible ? 0 : 2}px)`,
                  transform: `scale(${isVisible ? 1 : 1.05})`,
                  transition: `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1), 
                              filter ${duration}ms cubic-bezier(0.19, 1, 0.22, 1), 
                              transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1)`,
                  transitionDelay: `${baseDelay + Math.floor(Math.random() * randomnessRange)}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}