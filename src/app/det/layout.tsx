import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Duolingo English Test Prep — DET Preparation Cairo",
  description: "Prepare for the Duolingo English Test (DET) with AEEG in Cairo. Expert strategies, practice tests, and personalized preparation for a high DET score.",
  alternates: {
    canonical: "https://aeeg.com/det",
    languages: {
      en: "https://aeeg.com/det",
      ar: "https://aeeg.com/ar/det",
    },
  },
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Duolingo English Test (DET) Preparation Course",
  description: "Comprehensive DET preparation covering all question types with expert strategies and personalized feedback.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/det",
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