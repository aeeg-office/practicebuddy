import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IGCSE Tutoring Cairo — Cambridge IGCSE English",
  description: "Expert IGCSE English tutoring in Cairo. Prepare for Cambridge IGCSE English as a First and Second Language with experienced instructors at AEEG.",
  alternates: {
    canonical: "https://aeeg.com/igcse",
    languages: {
      en: "https://aeeg.com/igcse",
      ar: "https://aeeg.com/ar/igcse",
    },
  },
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IGCSE English Preparation Course",
  description: "Comprehensive Cambridge IGCSE English preparation for First Language and Second Language students.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/igcse",
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