-- CreateTable
CREATE TABLE `respondent` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `jenisKelamin` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `pendidikan` VARCHAR(100) NOT NULL,
    `usia` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `survey` (
    `id` VARCHAR(100) NOT NULL,
    `respondentId` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `survey_respondentId_key`(`respondentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result` (
    `id` VARCHAR(100) NOT NULL,
    `surveyId` VARCHAR(191) NOT NULL,
    `dimension` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expectation` (
    `id` VARCHAR(100) NOT NULL,
    `resultId` VARCHAR(191) NOT NULL,
    `answer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perception` (
    `id` VARCHAR(100) NOT NULL,
    `resultId` VARCHAR(191) NOT NULL,
    `answer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `survey` ADD CONSTRAINT `survey_respondentId_fkey` FOREIGN KEY (`respondentId`) REFERENCES `respondent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expectation` ADD CONSTRAINT `expectation_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `result`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perception` ADD CONSTRAINT `perception_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `result`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
