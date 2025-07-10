# Google Tag Manager Setup Guide

## Overview
This website is now configured with Google Tag Manager (GTM) to track Google Ads results and Google Analytics 4.

## Setup Instructions

### 1. Get Your GTM Container ID
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account or select existing account
3. Create a new container for your website
4. Copy your GTM Container ID (format: GTM-XXXXXXX)

### 2. Update the GTM ID
Replace `GTM-XXXXXXX` in `src/app/layout.tsx` with your actual GTM Container ID:

```tsx
<GoogleTagManager gtmId="GTM-XXXXXXX" />
```

### 3. Configure GTM Tags

#### Google Analytics 4 Setup
1. In GTM, go to **Tags** → **New**
2. Choose **Google Analytics: GA4 Configuration**
3. Enter your GA4 Measurement ID (format: G-XXXXXXXXXX)
4. Set trigger to **All Pages**
5. Save and publish

#### Google Ads Setup
1. In GTM, go to **Tags** → **New**
2. Choose **Google Ads: Conversion Tracking**
3. Enter your Google Ads Conversion ID and Conversion Label
4. Set trigger to **All Pages** or specific events
5. Save and publish

### 4. Custom Events Tracking

The website is configured to track these custom events:

#### Button Clicks
- Schedule Assessment buttons
- Contact section buttons
- Navigation buttons

#### Phone Number Clicks
- Header phone number
- Mobile menu phone number
- Contact section phone numbers

#### Email Clicks
- Contact section email addresses

#### Scroll Depth
- Tracks when users scroll 25%, 50%, 75%, 100%

### 5. Data Layer Events

The following events are automatically pushed to the data layer:

```javascript
// Button clicks
{
  event: 'button_click',
  button_name: 'Schedule Clinical Assessment',
  button_location: 'hero-section'
}

// Phone clicks
{
  event: 'phone_click',
  phone_number: '+92 313 7818887',
  location: 'header'
}

// Email clicks
{
  event: 'email_click',
  email: 'clinical@physiogen.fit',
  location: 'Clinical Inquiries'
}

// Scroll depth
{
  event: 'scroll_depth',
  scroll_percentage: 50
}
```

### 6. Testing

1. Use GTM Preview mode to test your setup
2. Check that events are firing correctly
3. Verify data is appearing in Google Analytics 4
4. Test Google Ads conversion tracking

### 7. Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env.local` file:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

2. Update `layout.tsx`:
```tsx
<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
```

## Available Tracking Functions

```typescript
import { 
  trackButtonClick, 
  trackPhoneClick, 
  trackEmailClick, 
  trackScrollDepth,
  trackEvent 
} from '@/lib/gtm'

// Track custom events
trackEvent('custom_event', { parameter: 'value' })

// Track button clicks
trackButtonClick('button_name', 'location')

// Track phone clicks
trackPhoneClick('phone_number', 'location')

// Track email clicks
trackEmailClick('email', 'location')
```

## Troubleshooting

1. **GTM not loading**: Check your GTM ID is correct
2. **Events not firing**: Use GTM Preview mode to debug
3. **Data not in GA4**: Verify GA4 configuration in GTM
4. **Ads not tracking**: Check Google Ads conversion setup

## Support

For GTM-specific issues, refer to:
- [Google Tag Manager Help](https://support.google.com/tagmanager/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Google Ads Help](https://support.google.com/google-ads/) 