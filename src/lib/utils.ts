import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Defer non-critical JavaScript
export const deferLoadingScript = (scriptUrl: string, id: string) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.id = id;
    script.defer = true;
    script.async = true;
    
    // Add to DOM after page has fully loaded
    window.addEventListener('load', () => {
      document.body.appendChild(script);
    });
  }
};

// Lazy load images that are not in viewport
export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy-load");
            imgObserver.unobserve(lazyImage);
          }
        }
      });
    });
    
    // Register all images with class 'lazy-load'
    const lazyImages = document.querySelectorAll('img.lazy-load');
    lazyImages.forEach((img) => imgObserver.observe(img));
  }
};
