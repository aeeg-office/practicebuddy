-- Create RITBand table
CREATE TABLE IF NOT EXISTS "rit_bands" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "minScore" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rit_bands_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "rit_bands_tenantId_code_key" UNIQUE ("tenantId", "code")
);

-- Create RITSkillMapping table
CREATE TABLE IF NOT EXISTS "rit_skill_mappings" (
    "id" TEXT NOT NULL,
    "ritBandId" TEXT NOT NULL,
    "microSkillId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rit_skill_mappings_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "rit_skill_mappings_ritBandId_microSkillId_key" UNIQUE ("ritBandId", "microSkillId")
);

-- Indexes
CREATE INDEX IF NOT EXISTS "rit_skill_mappings_programId_ritBandId_idx" ON "rit_skill_mappings"("programId", "ritBandId");

-- Foreign keys
ALTER TABLE "rit_bands" ADD CONSTRAINT "rit_bands_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "rit_skill_mappings" ADD CONSTRAINT "rit_skill_mappings_ritBandId_fkey" FOREIGN KEY ("ritBandId") REFERENCES "rit_bands"("id") ON DELETE CASCADE;
ALTER TABLE "rit_skill_mappings" ADD CONSTRAINT "rit_skill_mappings_microSkillId_fkey" FOREIGN KEY ("microSkillId") REFERENCES "micro_skills"("id") ON DELETE CASCADE;
ALTER TABLE "rit_skill_mappings" ADD CONSTRAINT "rit_skill_mappings_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE;