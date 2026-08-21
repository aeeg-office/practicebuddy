-- Add missing architecture-required models
-- Schools, Classes, Subjects, SkillPrereqs, Standards, SkillMappings
-- LiveSessions, StudentLiveStates, GenerationMetadata, ValidationResults

-- Schools
CREATE TABLE IF NOT EXISTS "schools" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "schools_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "schools_tenant_id_name_key" UNIQUE ("tenant_id", "name")
);

-- Classes
CREATE TABLE IF NOT EXISTS "classes" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "school_id" TEXT,
    "name" TEXT NOT NULL,
    "subject" TEXT,
    "grade" TEXT,
    "teacher_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "classes_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "classes_tenant_id_name_key" UNIQUE ("tenant_id", "name")
);

-- Subjects
CREATE TABLE IF NOT EXISTS "subjects" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "subjects_tenant_id_code_key" UNIQUE ("tenant_id", "code")
);

-- Skill Prerequisites
CREATE TABLE IF NOT EXISTS "skill_prereqs" (
    "id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "prereq_skill_id" TEXT NOT NULL,
    CONSTRAINT "skill_prereqs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "skill_prereqs_skill_id_prereq_skill_id_key" UNIQUE ("skill_id", "prereq_skill_id")
);

-- Standards
CREATE TABLE IF NOT EXISTS "standards" (
    "id" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "standard_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grade_band" TEXT,
    "subject" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "standards_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "standards_framework_standard_id_key" UNIQUE ("framework", "standard_id")
);

-- Skill Mappings
CREATE TABLE IF NOT EXISTS "skill_mappings" (
    "id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "standard_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "skill_mappings_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "skill_mappings_skill_id_standard_id_key" UNIQUE ("skill_id", "standard_id")
);

-- Live Sessions
CREATE TABLE IF NOT EXISTS "live_sessions" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "class_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "source_skill_id" TEXT,
    "current_question_id" TEXT,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "live_sessions_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "live_sessions_tenant_id_status_idx" ON "live_sessions"("tenant_id", "status");

-- Student Live States
CREATE TABLE IF NOT EXISTS "student_live_states" (
    "id" TEXT NOT NULL,
    "live_session_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "current_question_id" TEXT,
    "response_status" TEXT NOT NULL DEFAULT 'awaiting',
    CONSTRAINT "student_live_states_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "student_live_states_live_session_id_student_id_key" UNIQUE ("live_session_id", "student_id")
);

-- Generation Metadata
CREATE TABLE IF NOT EXISTS "generation_metadata" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "question_id" TEXT,
    "job_id" TEXT,
    "model" TEXT NOT NULL,
    "prompt" TEXT,
    "temperature" DOUBLE PRECISION,
    "tokens_used" INTEGER,
    "cost" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'generated',
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "generation_metadata_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "generation_metadata_tenant_id_status_idx" ON "generation_metadata"("tenant_id", "status");

-- Validation Results
CREATE TABLE IF NOT EXISTS "validation_results" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "validator" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "checks" TEXT,
    "details" TEXT,
    "score" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "validation_results_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "validation_results_question_id_validator_idx" ON "validation_results"("question_id", "validator");

-- Add class_id to enrollments
ALTER TABLE "enrollments" ADD COLUMN IF NOT EXISTS "class_id" TEXT;

-- Add missing columns to student_attempts
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "micro_skill_id" TEXT;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "question_version_id" TEXT;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "snapshot_hash" TEXT;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "ip_address" TEXT;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "user_agent" TEXT;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "hints_used" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "student_attempts" ADD COLUMN IF NOT EXISTS "attempt_number" INTEGER NOT NULL DEFAULT 1;
CREATE INDEX IF NOT EXISTS "student_attempts_question_version_id_idx" ON "student_attempts"("question_version_id");

-- Add missing columns to user_skill_masteries
ALTER TABLE "user_skill_masteries" ADD COLUMN IF NOT EXISTS "micro_skill_id" TEXT;

-- Foreign keys
ALTER TABLE "classes" ADD CONSTRAINT "classes_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "skill_prereqs" ADD CONSTRAINT "skill_prereqs_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE;
ALTER TABLE "skill_prereqs" ADD CONSTRAINT "skill_prereqs_prereq_skill_id_fkey" FOREIGN KEY ("prereq_skill_id") REFERENCES "skills"("id") ON DELETE CASCADE;
ALTER TABLE "skill_mappings" ADD CONSTRAINT "skill_mappings_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE;
ALTER TABLE "skill_mappings" ADD CONSTRAINT "skill_mappings_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE CASCADE;
ALTER TABLE "student_live_states" ADD CONSTRAINT "student_live_states_live_session_id_fkey" FOREIGN KEY ("live_session_id") REFERENCES "live_sessions"("id") ON DELETE CASCADE;
ALTER TABLE "validation_results" ADD CONSTRAINT "validation_results_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE;
ALTER TABLE "generation_metadata" ADD CONSTRAINT "generation_metadata_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE SET NULL;
ALTER TABLE "generation_metadata" ADD CONSTRAINT "generation_metadata_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id");
ALTER TABLE "student_attempts" ADD CONSTRAINT "student_attempts_question_version_id_fkey" FOREIGN KEY ("question_version_id") REFERENCES "question_versions"("id");
ALTER TABLE "student_attempts" ADD CONSTRAINT "student_attempts_micro_skill_id_fkey" FOREIGN KEY ("micro_skill_id") REFERENCES "micro_skills"("id");
ALTER TABLE "user_skill_masteries" ADD CONSTRAINT "user_skill_masteries_micro_skill_id_fkey" FOREIGN KEY ("micro_skill_id") REFERENCES "micro_skills"("id");
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id");