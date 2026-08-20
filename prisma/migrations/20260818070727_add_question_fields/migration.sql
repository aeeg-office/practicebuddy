-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "calculatorAllowed" BOOLEAN DEFAULT false,
ADD COLUMN     "estimatedTime" INTEGER,
ADD COLUMN     "figureUrl" TEXT,
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "rightsStatus" TEXT NOT NULL DEFAULT 'original',
ADD COLUMN     "source" TEXT,
ADD COLUMN     "strategy" TEXT;
