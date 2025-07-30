// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'GTM-NJ34DT9G');
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent('click', 'Contact', `Phone: ${phoneNumber}`);
};

// Track appointment bookings
export const trackAppointmentClick = (service?: string) => {
  trackEvent('click', 'Appointment', service || 'General');
};

// Track service page visits
export const trackServiceView = (serviceName: string) => {
  trackEvent('view', 'Service', serviceName);
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('submit', 'Form', formName);
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GTM-NJ34DT9G', {
      page_path: url
    });
  }
}; 