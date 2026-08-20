export const content = {
  dashboard: {
    greeting: "Welcome,",
    userName: "Parent",
    subtitle: "Stay updated on your children's progress",
    portalName: "Practice Buddy",
    portalSubtitle: "Parent Portal",
  },
  sidebar: {
    logo: "PB",
    brand: "Practice Buddy",
    subtitle: "Parent Portal",
    navigation: [
      { label: "Dashboard", href: "/parent", active: true },
      { label: "My Children", href: "/parent/children" },
      { label: "Schedule", href: "/parent/schedule" },
      { label: "Progress Reports", href: "/parent/reports" },
      { label: "Payments", href: "/parent/payments" },
      { label: "Messages", href: "/parent/messages", badge: "2" },
      { label: "Settings", href: "/parent/settings" },
    ],
    footer: {
      whatsapp: "WhatsApp Support",
      logout: "Log Out",
    },
  },
  topBar: {
    userName: "Sarah Parent",
    userRole: "Parent Account",
  },
  stats: [
    { label: "Linked Students", value: 2 },
    { label: "Average Progress", value: "82%" },
    { label: "Upcoming Sessions", value: 5 },
    { label: "New Messages", value: 4 },
  ],
  children: [
    {
      name: "Mariam",
      grade: "Grade 11",
      track: "SAT Track",
      scores: [
        { subject: "SAT Math", score: 85, maxScore: 100 },
        { subject: "SAT Reading", score: 72, maxScore: 100 },
        { subject: "ACT English", score: 78, maxScore: 100 },
      ],
      upcomingSessions: [
        { date: "Mon, Mar 24", time: "10:00 AM", subject: "SAT Math Intensive", teacher: "Dr. Ahmed Khalil", type: "Online" },
        { date: "Wed, Mar 26", time: "2:00 PM", subject: "ACT English Prep", teacher: "Ms. Sara Mansour", type: "In-Center" },
        { date: "Fri, Mar 28", time: "11:00 AM", subject: "SAT Reading", teacher: "Dr. Ahmed Khalil", type: "Online" },
      ],
      attendanceRate: 94,
      sessionsAttended: 47,
      totalSessions: 50,
      teacherComment: "Mariam is doing exceptionally well in SAT Math. She has shown great improvement in problem-solving skills. Continue encouraging her timed practice sessions.",
      teacherRecommendation: "Focus on SAT Reading vocabulary drills and timed essay writing practice.",
    },
    {
      name: "Youssef",
      grade: "Grade 9",
      track: "IGCSE Prep",
      scores: [
        { subject: "Algebra I", score: 91, maxScore: 100 },
        { subject: "English Lang", score: 88, maxScore: 100 },
        { subject: "Science", score: 76, maxScore: 100 },
      ],
      upcomingSessions: [
        { date: "Tue, Mar 25", time: "4:00 PM", subject: "Algebra I", teacher: "Mr. Karim Adel", type: "Online" },
        { date: "Thu, Mar 27", time: "3:00 PM", subject: "English Grammar", teacher: "Ms. Nour El-Din", type: "Online" },
      ],
      attendanceRate: 98,
      sessionsAttended: 49,
      totalSessions: 50,
      teacherComment: "Youssef excels in Algebra and shows strong analytical thinking. He participates actively in class discussions.",
      teacherRecommendation: "Additional practice in Science practical applications would help balance his skill set.",
    },
  ],
  quickActions: {
    title: "Quick Actions",
    items: [
      { label: "View Progress Reports", icon: "Eye" },
      { label: "View Schedule", icon: "Calendar" },
      { label: "Make a Payment", icon: "CreditCard" },
      { label: "Message Teacher", icon: "MessageSquare" },
      { label: "All Children", icon: "Users" },
    ],
  },
  paymentSummary: {
    title: "Payment Summary",
    subtitle: "Recent & upcoming",
    viewAll: "View All",
    recent: [
      { date: "Mar 1, 2025", description: "SAT Prep - Mariam (Monthly)", amount: 320, status: "Completed" },
      { date: "Feb 15, 2025", description: "Algebra I - Youssef (Monthly)", amount: 280, status: "Completed" },
      { date: "Feb 1, 2025", description: "SAT Prep - Mariam (Monthly)", amount: 320, status: "Completed" },
    ],
    nextPayment: {
      description: "March Tutoring (Both Children)",
      dueDate: "Apr 5, 2025",
      amount: 600,
      button: "Pay Now",
    },
  },
  teacherComments: {
    title: "Recent Comments",
    items: [
      { child: "Mariam", teacher: "Dr. Ahmed Khalil", comment: "Great progress in SAT Math. Keep practicing!", date: "2 days ago", avatar: "AK" },
      { child: "Youssef", teacher: "Mr. Karim Adel", comment: "Excellent work on Algebra this week.", date: "5 days ago", avatar: "KA" },
    ],
    viewAll: "View All Messages",
  },
  tipCard: {
    title: "Parent Tip",
    subtitle: "Maximize your child's success",
    description: "Regular communication with teachers helps track your child's progress. Enable notifications for real-time updates on scores and attendance.",
    button: "Enable Notifications",
  },
  whatsappSupport: {
    title: "WhatsApp Support",
    description: "Chat with our support team",
  },
  overallStats: [
    { label: "Linked Children", value: 2 },
    { label: "Avg. Score", value: "82%" },
    { label: "Avg. Attendance", value: "96%" },
    { label: "Monthly Spend", value: "$600" },
  ],
}
