import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academic English Cairo — Writing & Communication Skills",
  description: "Improve your Academic English skills in Cairo. Writing, reading, grammar, vocabulary, and communication courses at AEEG for university and professional success.",
  alternates: {
    canonical: "https://aeeg.com/academic-english",
    languages: {
      en: "https://aeeg.com/academic-english",
      ar: "https://aeeg.com/ar/academic-english",
    },
  },
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Academic English Program",
  description: "Build university-level English skills in academic writing, reading, grammar, vocabulary, and communication.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/academic-english",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  )
}