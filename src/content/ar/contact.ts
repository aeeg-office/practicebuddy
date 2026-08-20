export const content = {
  hero: {
    badge: "تواصل معنا",
    title: "اتصل بنا",
    description: "هل لديك سؤال عن برامجنا أو أسعارنا أو جداولنا؟ يسعدنا التواصل معك. تواصل معنا وسيرد فريقنا عليك خلال 24 ساعة.",
  },
  methods: [
    {
      title: "زرنا",
      details: ["التجمع الخامس، القاهرة الجديدة", "القاهرة، مصر"],
      action: { label: "أرسل موقعك", href: "https://wa.me/201060618899?text=Please%20send%20your%20location." },
    },
    {
      title: "اتصل بنا",
      details: ["+20 1060618899"],
      action: { label: "اتصل الآن", href: "tel:+201060618899" },
    },
    {
      title: "راسلنا عبر البريد الإلكتروني",
      details: ["info@americanegyptianedugroup.com"],
      action: { label: "أرسل بريداً إلكترونياً", href: "mailto:info@americanegyptianedugroup.com" },
    },
    {
      title: "WhatsApp",
      details: ["رد سريع خلال دقائق"],
      action: { label: "تحدث على WhatsApp", href: "https://wa.me/201060618899" },
    },
  ],
  form: {
    title: "أرسل لنا رسالة",
    description: "املأ النموذج أدناه وسنرد عليك قريباً.",
    fields: {
      name: { label: "الاسم الكامل", placeholder: "اسمك الكامل" },
      email: { label: "البريد الإلكتروني", placeholder: "your@email.com" },
      phone: { label: "رقم الهاتف", placeholder: "+20 10 1234 5678" },
      subject: { label: "الموضوع", placeholder: "اختر موضوعاً..." },
      message: { label: "الرسالة", placeholder: "كيف يمكننا مساعدتك؟" },
    },
    subjects: [
      "استفسار عام", "تحضير SAT", "تحضير ACT", "تحضير IELTS", "تحضير TOEFL",
      "تدريس اللغة الإنجليزية", "تدريس الرياضيات", "الأسعار والباقات", "حجز اختبار تشخيصي", "أخرى",
    ],
    submitButton: "أرسل الرسالة",
    successTitle: "تم إرسال الرسالة!",
    successDescription: "شكراً لتواصلك معنا! سيقوم فريقنا بمراجعة رسالتك والرد عليك خلال 24 ساعة. نتطلع لمساعدتك في تحقيق أهدافك.",
    sendAnother: "إرسال رسالة أخرى",
  },
  businessHours: {
    title: "ساعات العمل",
    days: [
      { day: "السبت", hours: "12:00 م – 9:00 م" },
      { day: "الأحد", hours: "3:00 م – 9:00 م" },
      { day: "الإثنين", hours: "3:00 م – 9:00 م" },
      { day: "الثلاثاء", hours: "3:00 م – 9:00 م" },
      { day: "الأربعاء", hours: "3:00 م – 9:00 م" },
      { day: "الخميس", hours: "مغلق" },
      { day: "الجمعة", hours: "مغلق" },
    ],
  },
  quickConnect: {
    title: "تواصل سريع",
    description: "تفضل المراسلة الفورية؟ تواصل معنا على WhatsApp للحصول على ردود سريعة.",
    whatsapp: { label: "WhatsApp", number: "+20 1060618899" },
  },
  map: {
    location: "التجمع الخامس، القاهرة الجديدة",
    city: "القاهرة، مصر",
  },
  cta: {
    title: "هل أنت مستعد لبدء رحلتك؟",
    description: "خذ الخطوة الأولى نحو درجتك المستهدفة. احجز اختبارك التشخيصي المجاني اليوم واكتشف كيف يمكن لـ AEEG مساعدتك في النجاح.",
    buttons: { primary: "احجز تشخيصاً مجانياً", secondary: "عرض الأسئلة الشائعة" },
  },
}