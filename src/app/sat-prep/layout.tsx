import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital SAT Practice — Skill Practice & Test Simulation",
  description: "Master the Digital SAT with targeted skill practice and realistic full-length test simulations. Practice by official domain with two-attempt learning and detailed explanations.",
  alternates: {
    canonical: "https://lumaani.com/sat-prep",
    languages: {
      en: "https://lumaani.com/sat-prep",
      ar: "https://lumaani.com/ar/sat-prep",
    },
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What is the difference between Skill Practice and Test Simulation?","acceptedAnswer":{"@type":"Answer","text":"Skill Practice is learning-oriented with two attempts, hints, and explanations. Test Simulation is assessment-oriented with one scored response per question and post-test analysis."}},
    {"@type":"Question","name":"Is Lumaani affiliated with College Board?","acceptedAnswer":{"@type":"Answer","text":"No. Lumaani is an independent platform. Our SAT content follows the official skill taxonomy but uses original practice questions."}},
    {"@type":"Question","name":"Can I use a calculator during SAT Math practice?","acceptedAnswer":{"@type":"Answer","text":"Yes. For Math skill practice and test simulation where calculators are permitted, you can use the integrated Desmos calculator or your own device."}},
    {"@type":"Question","name":"How is my progress tracked?","acceptedAnswer":{"@type":"Answer","text":"Every practice session is saved server-side. Mastery is derived from actual attempt data — first-attempt accuracy, second-attempt recovery, difficulty, and recency."}}
  ],
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Digital SAT Practice Platform",
  description: "Comprehensive SAT practice covering Reading & Writing and Math with skill-based practice and full-length test simulations.",
  provider: {
    "@type": "Organization",
    name: "Lumaani",
    url: "https://lumaani.com",
  },
  url: "https://lumaani.com/sat-prep",
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