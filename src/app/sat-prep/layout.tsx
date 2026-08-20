import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital SAT Prep Cairo — Expert Tutoring",
  description: "Prepare for the Digital SAT with AEEG expert instructors in Cairo. Proven strategies, adaptive practice, and personalized score improvement plans.",
  alternates: {
    canonical: "https://aeeg.com/sat-prep",
    languages: {
      en: "https://aeeg.com/sat-prep",
      ar: "https://aeeg.com/ar/sat-prep",
    },
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"How long is the SAT prep course at AEEG?","acceptedAnswer":{"@type":"Answer","text":"Our SAT prep programs range from 8 to 16 weeks depending on the format and intensity. We offer flexible scheduling to accommodate your timeline."}},
    {"@type":"Question","name":"What score improvement can I expect?","acceptedAnswer":{"@type":"Answer","text":"On average, our students see a 150-250 point improvement on the SAT after completing our program. Results vary based on starting point and commitment level."}},
    {"@type":"Question","name":"Are your tutors certified and experienced?","acceptedAnswer":{"@type":"Answer","text":"All AEEG tutors are American-educated professionals with years of experience in test preparation. They are native English speakers who hold degrees from top U.S. universities."}},
    {"@type":"Question","name":"Do you offer both in-person and online SAT prep?","acceptedAnswer":{"@type":"Answer","text":"We offer Online Group Tutoring, In-Center Private Tutoring, and Online Private Tutoring. All formats follow the same rigorous curriculum."}},
    {"@type":"Question","name":"What materials are included in the program?","acceptedAnswer":{"@type":"Answer","text":"All materials are included: official College Board practice tests, AEEG proprietary strategy guides, online practice platform access, and personalized progress tracking."}},
    {"@type":"Question","name":"How do I get started with AEEG SAT prep?","acceptedAnswer":{"@type":"Answer","text":"Take our free SAT diagnostic test, then schedule a free consultation with our academic advisors to find the best program for your goals."}}
  ],
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Digital SAT Preparation Course",
  description: "Comprehensive SAT preparation covering Evidence-Based Reading and Writing and Math with adaptive practice and expert instruction.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/sat-prep",
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
