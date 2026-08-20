export const content = {
  dashboard: {
    greeting: "أهلاً بك،",
    userName: "ولي الأمر",
    subtitle: "تابع تقدّم أبنائك باستمرار",
    portalName: "Practice Buddy",
    portalSubtitle: "بوابة أولياء الأمور",
  },
  sidebar: {
    logo: "PB",
    brand: "Practice Buddy",
    subtitle: "بوابة أولياء الأمور",
    navigation: [
      { label: "لوحة التحكم", href: "/parent", active: true },
      { label: "أبنائي", href: "/parent/children" },
      { label: "الجدول", href: "/parent/schedule" },
      { label: "تقارير التقدّم", href: "/parent/reports" },
      { label: "المدفوعات", href: "/parent/payments" },
      { label: "الرسائل", href: "/parent/messages", badge: "2" },
      { label: "الإعدادات", href: "/parent/settings" },
    ],
    footer: {
      whatsapp: "دعم WhatsApp",
      logout: "تسجيل الخروج",
    },
  },
  topBar: {
    userName: "سارة ولي الأمر",
    userRole: "حساب ولي أمر",
  },
  stats: [
    { label: "الطلاب المرتبطون", value: 2 },
    { label: "متوسط التقدّم", value: "82%" },
    { label: "الحصص القادمة", value: 5 },
    { label: "رسائل جديدة", value: 4 },
  ],
  children: [
    {
      name: "مريم",
      grade: "الصف الحادي عشر",
      track: "مسار SAT",
      scores: [
        { subject: "SAT Math", score: 85, maxScore: 100 },
        { subject: "SAT Reading", score: 72, maxScore: 100 },
        { subject: "ACT English", score: 78, maxScore: 100 },
      ],
      upcomingSessions: [
        { date: "الإثنين، 24 مارس", time: "10:00 صباحاً", subject: "SAT Math Intensive", teacher: "د. أحمد خليل", type: "Online" },
        { date: "الأربعاء، 26 مارس", time: "2:00 مساءً", subject: "ACT English Prep", teacher: "أ. سارة منصور", type: "In-Center" },
        { date: "الجمعة، 28 مارس", time: "11:00 صباحاً", subject: "SAT Reading", teacher: "د. أحمد خليل", type: "Online" },
      ],
      attendanceRate: 94,
      sessionsAttended: 47,
      totalSessions: 50,
      teacherComment: "مريم تؤدي أداءً استثنائياً في SAT Math. لقد أظهرت تحسناً كبيراً في مهارات حل المشكلات. استمر في تشجيعها على جلسات التدريب الموقّت.",
      teacherRecommendation: "ركّز على تمارين مفردات SAT Reading وممارسة الكتابة المقالية الموقّتة.",
    },
    {
      name: "يوسف",
      grade: "الصف التاسع",
      track: "تحضير IGCSE",
      scores: [
        { subject: "Algebra I", score: 91, maxScore: 100 },
        { subject: "English Lang", score: 88, maxScore: 100 },
        { subject: "Science", score: 76, maxScore: 100 },
      ],
      upcomingSessions: [
        { date: "الثلاثاء، 25 مارس", time: "4:00 مساءً", subject: "Algebra I", teacher: "أ. كريم عادل", type: "Online" },
        { date: "الخميس، 27 مارس", time: "3:00 مساءً", subject: "English Grammar", teacher: "أ. نور الدين", type: "Online" },
      ],
      attendanceRate: 98,
      sessionsAttended: 49,
      totalSessions: 50,
      teacherComment: "يوسف يتفوّق في Algebra ويظهر تفكيراً تحليلياً قوياً. يشارك بنشاط في المناقشات الصفية.",
      teacherRecommendation: "ممارسة إضافية في التطبيقات العملية لمادة Science ستساعد في تحقيق التوازن لمهاراته.",
    },
  ],
  quickActions: {
    title: "إجراءات سريعة",
    items: [
      { label: "عرض تقارير التقدّم", icon: "Eye" },
      { label: "عرض الجدول", icon: "Calendar" },
      { label: "إجراء دفعة", icon: "CreditCard" },
      { label: "مراسلة المدرّس", icon: "MessageSquare" },
      { label: "جميع الأبناء", icon: "Users" },
    ],
  },
  paymentSummary: {
    title: "ملخص المدفوعات",
    subtitle: "أحدث المدفوعات والمدفوعات القادمة",
    viewAll: "عرض الكل",
    recent: [
      { date: "1 مارس 2025", description: "تحضير SAT - مريم (شهري)", amount: 320, status: "Completed" },
      { date: "15 فبراير 2025", description: "Algebra I - يوسف (شهري)", amount: 280, status: "Completed" },
      { date: "1 فبراير 2025", description: "تحضير SAT - مريم (شهري)", amount: 320, status: "Completed" },
    ],
    nextPayment: {
      description: "الدروس الخصوصية لشهر مارس (كلا الطفلين)",
      dueDate: "5 أبريل 2025",
      amount: 600,
      button: "ادفع الآن",
    },
  },
  teacherComments: {
    title: "أحدث التعليقات",
    items: [
      { child: "مريم", teacher: "د. أحمد خليل", comment: "تقدّم رائع في SAT Math. استمر في الممارسة!", date: "منذ يومين", avatar: "AK" },
      { child: "يوسف", teacher: "أ. كريم عادل", comment: "عمل ممتاز في Algebra هذا الأسبوع.", date: "منذ 5 أيام", avatar: "KA" },
    ],
    viewAll: "عرض جميع الرسائل",
  },
  tipCard: {
    title: "نصيحة لولي الأمر",
    subtitle: "عظّم من نجاح ابنك",
    description: "التواصل المنتظم مع المدرّسين يساعد في متابعة تقدّم ابنك. فعّل الإشعارات للحصول على تحديثات فورية حول الدرجات والحضور.",
    button: "تفعيل الإشعارات",
  },
  whatsappSupport: {
    title: "دعم WhatsApp",
    description: "تحدّث مع فريق الدعم لدينا",
  },
  overallStats: [
    { label: "الأبناء المرتبطون", value: 2 },
    { label: "متوسط الدرجات", value: "82%" },
    { label: "متوسط الحضور", value: "96%" },
    { label: "الإنفاق الشهري", value: "600$" },
  ],
}