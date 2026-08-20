import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IB Program Cairo — International Baccalaureate Tutoring",
  description: "Expert IB tutoring in Cairo for MYP, DP, and DP English. In-center and online support for International Baccalaureate students at AEEG since 2011.",
  alternates: {
    canonical: "https://aeeg.com/ib",
    languages: {
      en: "https://aeeg.com/ib",
      ar: "https://aeeg.com/ar/ib",
    },
  },
}

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IB Program Tutoring",
  description: "Comprehensive support for IB MYP, DP, and DP English students with expert instruction and personalized guidance.",
  provider: {
    "@type": "EducationalOrganization",
    name: "American Egyptian Education Group (AEEG)",
    url: "https://aeeg.com",
  },
  url: "https://aeeg.com/ib",
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