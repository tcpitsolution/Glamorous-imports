export const business = {
  name: 'Glamorous Imports',
  tagline: 'For Modern Home Decoration',
  phone: '+592 703 9729',
  phoneDigits: '5927039729',
  address: '1404 Block 8, Covent Garden EBD, Georgetown, Guyana',
  facebook: 'https://www.facebook.com/profile.php?id=61577003283120',
  tiktok: 'https://www.tiktok.com/@glamorousimports',
  instagram: '',
  googleReviewsUrl: '',
  canonicalUrl: '',
  emailjs: { serviceId: '', templateId: '', publicKey: '' }
}
export const whatsappUrl = (message = 'Hello Glamorous Imports! I would like to learn more about your modern home decoration services.') =>
  `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`
