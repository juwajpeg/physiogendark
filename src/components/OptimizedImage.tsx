"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes = "100vw",
  ...props
}: OptimizedImageProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height" | "className" | "priority" | "quality" | "sizes">) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: "200px",
      });

      const element = document.getElementById(`image-${src.replace(/\W+/g, "-")}`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsInView(true);
    }
  }, [src]);

  // Determine final dimensions while maintaining aspect ratio if only one dimension provided
  const getFinalDimensions = () => {
    if (width && height) return { width, height };
    if (width && !height) return { width, height: width }; // Default to square
    if (!width && height) return { width: height, height }; // Default to square
    return { width: 100, height: 100 }; // Default dimensions
  };

  const { width: finalWidth, height: finalHeight } = getFinalDimensions();

  return (
    <div
      id={`image-${src.replace(/\W+/g, "-")}`}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: finalWidth / finalHeight }}
    >
      {(isInView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          quality={quality}
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
} 