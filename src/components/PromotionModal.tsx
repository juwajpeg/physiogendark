"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromotionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PromotionModal({ isOpen = false, onClose }: PromotionModalProps) {
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 7000); // Show after 7 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  if (!modalVisible) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-500"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-11/12 max-w-md">
        <div 
          className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl animate-modal-appear"
        >
          {/* Modal Header with gradient border */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-5 border-b border-blue-500/20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 blur-lg"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-light text-white">Special Promotion</h3>
              <button 
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors duration-300 p-1 rounded-full hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Modal Body */}
          <div className="p-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-12 -top-12 w-24 h-24 bg-purple-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-lg rotate-3">
                  <Calendar className="h-8 w-8" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-4xl font-semibold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  10% OFF
                </div>
                <p className="text-gray-300 font-light leading-relaxed">
                  For a limited time, enjoy a special discount on all our services every Monday, Tuesday, and Wednesday.
                </p>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-5 border-t border-gray-700/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <a 
                  href="tel:03137818887" 
                  className="block"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'Contact',
                        event_label: 'Phone: 03137818887 (Modal)'
                      });
                    }
                  }}
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-lg">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              <Button 
                onClick={handleClose} 
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-5 py-2 rounded-xl transition-all duration-300 border border-gray-700"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 