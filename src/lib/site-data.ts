// Shared site content: nav, contact, clinic info

export const NAV_ITEMS = [
  { label: "Clinical Services", href: "#clinical-services", section: true },
  { label: "Treatment Protocol", href: "#treatment-protocol", section: true },
  { label: "Clinical Team", href: "#clinical-team", section: true },
  { label: "Case Studies", href: "/clinical-case-studies" },
  { label: "Location", href: "#location", section: true },
  { label: "Consultation", href: "#consultation", section: true },
] as const

export const PHONE = "+92 313 7818887"
export const PHONE_TEL = "tel:00923137818887"
export const EMAIL = "contact@physiogen.fit"
export const ADDRESS = "35, Iqbal, Block Commercial FF Bahria Town"
export const ADDRESS_FULL = "35, Iqbal, Block Commercial FF Bahria Town, Lahore, Punjab, Pakistan"
export const MAPS_URL = "https://maps.app.goo.gl/5rAeDDyEprsv5TUs8"
export const WHATSAPP_URL = "https://wa.me/923137818887"

export const CONTACT_ITEMS = [
  { label: "Address", value: ADDRESS, subtext: "Lahore, Punjab, Pakistan", href: MAPS_URL },
  { label: "Phone", value: PHONE, subtext: "24/7 Clinical Support", href: PHONE_TEL },
  { label: "Email", value: EMAIL, subtext: "Clinical Inquiries & Appointments", href: `mailto:${EMAIL}` },
] as const
