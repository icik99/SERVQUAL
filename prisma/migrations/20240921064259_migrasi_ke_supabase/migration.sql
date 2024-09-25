-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "respondent" (
    "id" VARCHAR(100) NOT NULL,
    "nama" VARCHAR(100),
    "jenisKelamin" "Gender" NOT NULL DEFAULT 'MALE',
    "pendidikan" VARCHAR(100) NOT NULL,
    "usia" VARCHAR(100) NOT NULL,

    CONSTRAINT "respondent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey" (
    "id" VARCHAR(100) NOT NULL,
    "respondentId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result" (
    "id" VARCHAR(100) NOT NULL,
    "surveyId" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expectation" (
    "id" VARCHAR(100) NOT NULL,
    "resultId" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,

    CONSTRAINT "expectation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perception" (
    "id" VARCHAR(100) NOT NULL,
    "resultId" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,

    CONSTRAINT "perception_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survey_respondentId_key" ON "survey"("respondentId");

-- AddForeignKey
ALTER TABLE "survey" ADD CONSTRAINT "survey_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "respondent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expectation" ADD CONSTRAINT "expectation_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perception" ADD CONSTRAINT "perception_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
