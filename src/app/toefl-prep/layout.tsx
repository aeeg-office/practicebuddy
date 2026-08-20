import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TOEFL Prep Cairo — iBT Preparation Courses",
  description: "Prepare for the TOEFL iBT with AEEG expert instructors in Cairo. Comprehensive reading, listening, speaking, and writing preparation.",
  alternates: {
    canonical: "https://aeeg.com/toefl-prep",
    languages: {
      en: "https://aeeg.com/toefl-prep",
      ar: "https://aeeg.com/ar/toefl-prep",
    },
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What is the TOEFL exam?","acceptedAnswer":{"@type":"Answer","text":"The TOEFL measures your ability to use and understand English at the university level. Accepted by over 11,000 universities in more than 150 countries."}},
    {"@type":"Question","name":"How is the TOEFL structured?","acceptedAnswer":{"@type":"Answer","text":"Four sections: Reading 54-72 min, Listening 41-57 min, Speaking 17 min, and Writing 50 min. Total time approximately 3 hours, scored out of 120."}},
    {"@type":"Question","name":"What score do I need for university?","acceptedAnswer":{"@type":"Answer","text":"Top-tier universities typically require 90-100+. Competitive programs ask for 80-100. Some schools have minimum section scores."}},
    {"@type":"Question","name":"How long does TOEFL prep take?","acceptedAnswer":{"@type":"Answer","text":"We recommend 8-12 weeks of consistent study. Our diagnostic assessment will determine the right timeline for you."}},
    {"@type":"Question","name":"What makes AEEG TOEFL prep different?","acceptedAnswer":{"@type":"Answer","text":"Personalized instruction from American-educated teachers, regular practice tests with detailed analysis, and targeted feedback on speaking and writing tasks."}},
    {"@type":"Question","name":"Does AEEG offer online and in-center TOEFL prep?","acceptedAnswer":{"@type":"Answer","text":"Yes! Both In-Center Private and Online Private options are available with expert-led instruction and comprehensive materials."}}
  ],
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "TOEFL iBT Preparation Course",
  description: "Comprehensive TOEFL iBT preparation covering all four sections with personalized feedback and expert instruction.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/toefl-prep",
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
