import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IELTS Prep Cairo — Academic Training Courses",
  description: "Prepare for IELTS Academic with AEEG expert instructors in Cairo. Comprehensive listening, reading, writing, and speaking preparation.",
  alternates: {
    canonical: "https://aeeg.com/ielts-prep",
    languages: {
      en: "https://aeeg.com/ielts-prep",
      ar: "https://aeeg.com/ar/ielts-prep",
    },
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What is the IELTS exam and why is it important?","acceptedAnswer":{"@type":"Answer","text":"IELTS is the world leading English proficiency test for higher education, migration, and professional registration. Accepted by over 11,000 organizations globally."}},
    {"@type":"Question","name":"Which IELTS module should I take?","acceptedAnswer":{"@type":"Answer","text":"Choose Academic for university or professional registration. Choose General Training for migration or secondary education. Take our free diagnostic to determine the right path."}},
    {"@type":"Question","name":"How is the IELTS scored?","acceptedAnswer":{"@type":"Answer","text":"IELTS uses a 9-band scoring system. Each section receives a band score from 1 to 9. Your overall band score is the average of four section scores."}},
    {"@type":"Question","name":"How long does the IELTS test take?","acceptedAnswer":{"@type":"Answer","text":"Approximately 2 hours and 45 minutes: Listening 30 min, Reading 60 min, Writing 60 min, and Speaking 11-14 min often scheduled separately."}},
    {"@type":"Question","name":"When should I start preparing for the IELTS?","acceptedAnswer":{"@type":"Answer","text":"We recommend 2-4 months before your test date. Students with a strong foundation can achieve their target in 4-6 weeks of focused preparation."}},
    {"@type":"Question","name":"Does AEEG offer online and in-center IELTS prep?","acceptedAnswer":{"@type":"Answer","text":"Yes! AEEG offers In-Center Private and Online Private tutoring. Both include expert instruction, comprehensive materials, and personalized feedback."}}
  ],
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IELTS Preparation Course",
  description: "Comprehensive IELTS Academic and General Training preparation covering all four sections with expert instruction.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/ielts-prep",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(courseSchema)}}
      />
      {children}
    </>
  )
}
