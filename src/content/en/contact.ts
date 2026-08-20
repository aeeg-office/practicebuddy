export const content = {
  hero: {
    badge: "Get in Touch",
    title: "Contact Us",
    description: "Have a question about our programs, pricing, or schedule? We'd love to hear from you. Reach out and our team will get back to you within 24 hours.",
  },
  methods: [
    {
      title: "Visit Us",
      details: ["5th Settlement, New Cairo", "Cairo, Egypt"],
      action: { label: "Send Location", href: "https://wa.me/201060618899?text=Please%20send%20your%20location." },
    },
    {
      title: "Call Us",
      details: ["+20 1060618899"],
      action: { label: "Call Now", href: "tel:+201060618899" },
    },
    {
      title: "Email Us",
      details: ["info@americanegyptianedugroup.com"],
      action: { label: "Send Email", href: "mailto:info@americanegyptianedugroup.com" },
    },
    {
      title: "WhatsApp",
      details: ["Quick replies within minutes"],
      action: { label: "Chat on WhatsApp", href: "https://wa.me/201060618899" },
    },
  ],
  form: {
    title: "Send Us a Message",
    description: "Fill out the form below and we'll get back to you promptly.",
    fields: {
      name: { label: "Full Name", placeholder: "Your full name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      phone: { label: "Phone Number", placeholder: "+20 10 1234 5678" },
      subject: { label: "Subject", placeholder: "Select a subject..." },
      message: { label: "Message", placeholder: "How can we help you?" },
    },
    subjects: [
      "General Inquiry", "SAT Prep", "ACT Prep", "IELTS Prep", "TOEFL Prep",
      "English Tutoring", "Math Tutoring", "Pricing & Packages", "Schedule a Diagnostic", "Other",
    ],
    submitButton: "Send Message",
    successTitle: "Message Sent!",
    successDescription: "Thank you for reaching out! Our team will review your message and get back to you within 24 hours. We look forward to helping you achieve your goals.",
    sendAnother: "Send Another Message",
  },
  businessHours: {
    title: "Business Hours",
    days: [
      { day: "Saturday", hours: "12:00 PM – 9:00 PM" },
      { day: "Sunday", hours: "3:00 PM – 9:00 PM" },
      { day: "Monday", hours: "3:00 PM – 9:00 PM" },
      { day: "Tuesday", hours: "3:00 PM – 9:00 PM" },
      { day: "Wednesday", hours: "3:00 PM – 9:00 PM" },
      { day: "Thursday", hours: "Closed" },
      { day: "Friday", hours: "Closed" },
    ],
  },
  quickConnect: {
    title: "Quick Connect",
    description: "Prefer instant messaging? Reach us on WhatsApp for quick responses.",
    whatsapp: { label: "WhatsApp", number: "+20 1060618899" },
  },
  map: {
    location: "5th Settlement, New Cairo",
    city: "Cairo, Egypt",
  },
  cta: {
    title: "Ready to Start Your Journey?",
    description: "Take the first step toward your target score. Book your free diagnostic test today and discover how AEEG can help you succeed.",
    buttons: { primary: "Book a Free Diagnostic", secondary: "View FAQs" },
  },
}