// CRAVE IT DESIGN 03 — SITE CONTENT & RESTAURANT METADATA
// Sourced authentically from verified menu: Rolls, Momos, Chinese, Rice & Noodles (57 Dishes)

export const SITE_CONFIG = {
  brandName: "CRAVE IT",
  brandSubtitle: "Futuristic Food Editorial",
  editorialTagline: "FUTURE LOOKS GOOD ON YOUR PLATE.",
  heroHeadlineMain: "TOMORROW",
  heroHeadlineTop: "CRAVE",
  heroSupportingCopy: "BIG CRAVINGS. FUTURE-READY FLAVOURS.",
  heroBodyCopy: "From flaky hand-rolled kathi rolls and steamed momos to fiery wok Chinese and high-flame noodles, discover food worth obsessing over. Hand-crafted street culinary art meets futuristic editorial energy.",
  heroSubject: {
    title: "Crispy Neon Glazed Drumstick",
    image: "/images/food/hero-neon-drumstick.png",
    fallbackImage: "/images/food/chicken-drumstick.png",
    alt: "Futuristic neon glazed roasted chicken drumstick with rich fiery glaze and sesame seeds"
  },
  contact: {
    restaurantName: "CRAVE IT Kitchen",
    parentBrand: "CRAVE IT",
    address: "Power House Chauraha, opposite Shakuntalam Hotel, Sector G, LDA Colony, Lucknow, Uttar Pradesh 226012",
    phone: "+91 99191 21513",
    email: "craveit.editorial@gmail.com",
    openingHours: "Mon - Sun: 6:00 AM - 11:30 PM",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Power+House+Chauraha+opposite+Shakuntalam+Hotel+Sector+G+LDA+Colony+Lucknow",
    socials: {
      instagram: "https://instagram.com/craveit_editorial",
      facebook: "https://facebook.com/craveitkitchen",
      whatsapp: "https://wa.me/919919121513"
    }
  },
  combos: [
    {
      id: "crave-roll-momos-combo",
      name: "Chicken Kathi Roll + Steamed Momos Combo",
      tagline: "The Ultimate Street Duo",
      description: "Signature flaky Chicken Kathi Roll paired with hot steamed chicken dumplings and spicy red garlic dip. Freshly rolled and steamed to order.",
      price: 240,
      specialPrice: 199,
      specialOfferDays: "Mondays & Thursdays",
      isSpecialDayOffer: true,
      originalPrice: 240,
      badge: "VERIFIED BESTSELLER",
      image: "/images/food/chicken-roll.png",
      serves: "Serves 1",
      verified: true
    }
  ],
  brandStory: {
    heading: "MADE FOR THE HUNGRY HEARTS.",
    subheading: "Where Hand-Tossed Rolls Meet High-Fashion Modernism",
    paragraphs: [
      "Born in the culinary heart of Lucknow at LDA Colony, CRAVE IT is not just dinner—it is an unapologetic sensory statement. We took the sacred science of hand-rolled kathi rolls, bamboo-steamed momos, and wok-fired street gastronomy, and fused it with the daring aesthetics of futuristic editorial design.",
      "Every spice blend is roasted and ground in-house. Flaky parathas are tossed on hot iron tawas, momos are freshly folded and steamed, and high-heat woks sear rich garlic, chillies, and tender proteins to golden perfection.",
      "No shortcuts. No synthetic additives. Just fresh cuts, authentic spices, and deep craveable flavour calibrated for the modern palate."
    ],
    stats: [
      { label: "Signature Recipes", value: "57" },
      { label: "Core Categories", value: "4 Corridors" },
      { label: "Daily Flavour Lovers", value: "1,200+" },
      { label: "Operational Hours", value: "6 AM – 11:30 PM" }
    ]
  },
  navLinks: [
    { id: "home", label: "HOME", href: "#/" },
    { id: "menu", label: "OUR MENU", href: "#/menu" },
    { id: "combos", label: "COMBOS", href: "#/combos" },
    { id: "about", label: "ABOUT", href: "#/about" },
    { id: "contact", label: "CONTACT", href: "#/contact" }
  ]
};

export default SITE_CONFIG;
