import prisma from '@/lib/prisma'

export const FEATURE_FLAGS = {
  PRACTICE_PLATFORM: { key: 'practice_platform', label: 'Practice Platform', description: 'Full access to practice question bank and drill modules', isActive: true },
  MOCK_EXAMS: { key: 'mock_exams', label: 'Mock Exams', description: 'Timed mock examination simulations', isActive: false },
  AI_TUTOR: { key: 'ai_tutor', label: 'AI Tutor', description: 'AI-powered tutoring assistant', isActive: false },
  WRITING_ASSESSMENT: { key: 'writing_assessment', label: 'Writing Assessment', description: 'AI-driven essay evaluation', isActive: false },
  SPEAKING_ASSESSMENT: { key: 'speaking_assessment', label: 'Speaking Assessment', description: 'AI-driven speaking practice', isActive: false },
  LISTENING_ASSESSMENT: { key: 'listening_assessment', label: 'Listening Assessment', description: 'AI-driven listening exercises', isActive: false },
  ADVANCED_ANALYTICS: { key: 'advanced_analytics', label: 'Advanced Analytics', description: 'Detailed performance tracking', isActive: false },
  TEACHER_DASHBOARD: { key: 'teacher_dashboard', label: 'Teacher Dashboard', description: 'Class management and student progress', isActive: false },
  PARENT_PORTAL: { key: 'parent_portal', label: 'Parent Portal', description: 'Parent access to student reports', isActive: false },
  SCHOOL_PORTAL: { key: 'school_portal', label: 'School Portal', description: 'Multi-classroom administration dashboard', isActive: false },
  API_ACCESS: { key: 'api_access', label: 'API Access', description: 'Programmatic API access', isActive: false },
  CUSTOM_CONTENT: { key: 'custom_content', label: 'Custom Content', description: 'Create and upload custom materials', isActive: false },
} as const

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS

export async function seedDefaultFlags(): Promise<void> {
  const flags = Object.values(FEATURE_FLAGS)
  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: { label: flag.label, description: flag.description, isActive: flag.isActive },
      create: { key: flag.key, label: flag.label, description: flag.description, isActive: flag.isActive },
    })
  }
}