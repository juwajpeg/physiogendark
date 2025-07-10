declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

// Initialize data layer
export const initDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }
}

// Push to data layer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pushToDataLayer = (data: any) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }
}

// Track page views
export const trackPageView = (url: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_location: url,
    page_title: document.title,
  })
}

// Track custom events
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  pushToDataLayer({
    event: eventName,
    ...parameters,
  })
}

// Track form submissions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
  })
}

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string, location?: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    location: location,
  })
}

// Track email clicks
export const trackEmailClick = (email: string, location?: string) => {
  trackEvent('email_click', {
    email: email,
    location: location,
  })
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_percentage: depth,
  })
}

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent('time_on_page', {
    time_seconds: timeInSeconds,
  })
} 