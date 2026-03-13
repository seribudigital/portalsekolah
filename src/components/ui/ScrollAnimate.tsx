"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimateProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-in" | "slide-up";
    delay?: number;
    duration?: string;
}

export function ScrollAnimate({ children, className, animation = "slide-up", delay = 0, duration = "duration-700" }: ScrollAnimateProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const baseClasses = `transition-all ${duration} ease-out will-change-transform opacity-0`;

    // Default initial states
    let initialTransform = "";
    if (animation === "slide-up") initialTransform = "translate-y-8";

    const isVisibleClasses = isVisible
        ? "opacity-100 translate-y-0"
        : `opacity-0 ${initialTransform}`;

    return (
        <div
            ref={ref}
            className={cn(baseClasses, isVisibleClasses, className)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
