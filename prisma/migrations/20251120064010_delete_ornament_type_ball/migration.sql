/*
  Warnings:

  - The values [BALL] on the enum `OrnamentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrnamentType_new" AS ENUM ('GIFT', 'RIBBON', 'SNOW', 'HEART', 'DOLL');
ALTER TABLE "Ornament" ALTER COLUMN "type" TYPE "OrnamentType_new" USING ("type"::text::"OrnamentType_new");
ALTER TYPE "OrnamentType" RENAME TO "OrnamentType_old";
ALTER TYPE "OrnamentType_new" RENAME TO "OrnamentType";
DROP TYPE "public"."OrnamentType_old";
COMMIT;
