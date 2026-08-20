import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ACT Prep Cairo — Expert Tutoring & Courses",
  description: "Prepare for the ACT with AEEG expert instructors in Cairo. In-center and online ACT prep with proven score improvement. Free diagnostic test available.",
  alternates: {
    canonical: "https://aeeg.com/act-prep",
    languages: {
      en: "https://aeeg.com/act-prep",
      ar: "https://aeeg.com/ar/act-prep",
    },
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What is the ACT test?","acceptedAnswer":{"@type":"Answer","text":"The ACT is a standardized test used for college admissions in the United States. It assesses high school students readiness for college-level work and covers four subject areas: English, Mathematics, Reading, and Science, with an optional Writing section."}},
    {"@type":"Question","name":"How is the ACT scored?","acceptedAnswer":{"@type":"Answer","text":"Each section of the ACT is scored on a scale of 1-36. Your composite score is the average of your four section scores, also on a 1-36 scale. The optional Writing section is scored separately on a scale of 2-12."}},
    {"@type":"Question","name":"What is the difference between the ACT and SAT?","acceptedAnswer":{"@type":"Answer","text":"The ACT includes a Science section which the SAT does not, and its Math section covers more advanced topics including trigonometry. Both tests are widely accepted by colleges. AEEG offers prep for both tests."}},
    {"@type":"Question","name":"How long is the ACT test?","acceptedAnswer":{"@type":"Answer","text":"The ACT without the Writing section takes 2 hours and 55 minutes. With the optional Writing section, it takes 3 hours and 35 minutes. The test includes breaks between sections."}},
    {"@type":"Question","name":"When should I start preparing for the ACT?","acceptedAnswer":{"@type":"Answer","text":"We recommend starting 3-6 months before your target test date. Early preparation allows for comprehensive content review and ample time for practice tests."}},
    {"@type":"Question","name":"Does AEEG offer both in-center and online ACT prep?","acceptedAnswer":{"@type":"Answer","text":"Yes! AEEG offers Online Tutoring, In-Center Private Tutoring, and Online Private Tutoring programs for the ACT. All programs follow the same rigorous curriculum."}}
  ],
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "ACT Test Preparation Course",
  description: "Comprehensive ACT preparation covering English, Math, Reading, and Science sections with expert instruction and personalized support.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/act-prep",
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
