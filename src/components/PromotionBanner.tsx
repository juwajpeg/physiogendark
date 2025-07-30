"use client";

import { useState } from "react";
import { Calendar, X } from "lucide-react";

interface PromotionBannerProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export default function PromotionBanner({ isVisible = true, onClose }: PromotionBannerProps) {
  const [bannerVisible, setBannerVisible] = useState(isVisible);
  
  const handleClose = () => {
    setBannerVisible(false);
    if (onClose) onClose();
  };
  
  if (!bannerVisible) return null;
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out translate-y-0"
    >
      <div className="bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-gray-900/95 backdrop-blur-md border-t border-blue-500/20 shadow-lg py-3 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-full">
                <Calendar className="h-5 w-5 text-blue-300" />
              </div>
              <div className="pr-6">
                <p className="text-sm sm:text-base font-light text-gray-100">
                  <span className="text-blue-300 font-medium">Limited Offer:</span>{" "}
                  <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                    10% off all services
                  </span>{" "}
                  <span className="hidden sm:inline text-gray-300">|</span>{" "}
                  <span className="hidden sm:inline text-blue-200">Monday through Wednesday</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="tel:03137818887" 
                className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-white transition-all duration-300 hidden sm:block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({
                      event: 'phone_click',
                      phone_number: '03137818887',
                      location: 'Banner'
                    });
                  }
                }}
              >
                Book Now
              </a>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors duration-300 p-1 rounded-full hover:bg-gray-800/50"
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -top-10 inset-x-0 h-10 bg-gradient-to-b from-transparent to-blue-500/5 pointer-events-none"></div>
    </div>
  );
} 