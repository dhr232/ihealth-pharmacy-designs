-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "keyTakeaways" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "layoutVariant" TEXT NOT NULL DEFAULT 'standard',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "themeUsed" TEXT;
