-- CreateTable
CREATE TABLE `Respondent` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `jenisKelamin` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `pendidikan` VARCHAR(100) NOT NULL,
    `usia` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Survey` (
    `id` VARCHAR(100) NOT NULL,
    `respondentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Survey_respondentId_key`(`respondentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expectation` (
    `id` VARCHAR(100) NOT NULL,
    `surveyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpectationAnswer` (
    `id` VARCHAR(100) NOT NULL,
    `dimension` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perception` (
    `id` VARCHAR(100) NOT NULL,
    `surveyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerceptionAnswer` (
    `id` VARCHAR(100) NOT NULL,
    `dimension` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Survey` ADD CONSTRAINT `Survey_respondentId_fkey` FOREIGN KEY (`respondentId`) REFERENCES `Respondent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expectation` ADD CONSTRAINT `Expectation_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpectationAnswer` ADD CONSTRAINT `ExpectationAnswer_id_fkey` FOREIGN KEY (`id`) REFERENCES `Expectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perception` ADD CONSTRAINT `Perception_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerceptionAnswer` ADD CONSTRAINT `PerceptionAnswer_id_fkey` FOREIGN KEY (`id`) REFERENCES `Perception`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
