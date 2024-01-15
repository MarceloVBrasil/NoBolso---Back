-- CreateTable
CREATE TABLE
    `User` (
        `id` VARCHAR(191) NOT NULL,
        `nome` VARCHAR(191) NOT NULL,
        `email` VARCHAR(191) NOT NULL,
        `senha` VARCHAR(191) NOT NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,

UNIQUE INDEX `User_email_key`(`email`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE
    `Category` (
        `id` VARCHAR(191) NOT NULL,
        `nome` VARCHAR(191) NOT NULL,
        `tipo` VARCHAR(191) NOT NULL,
        `meta` DOUBLE NOT NULL,
        `userId` VARCHAR(191) NOT NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,

UNIQUE INDEX `Category_nome_key`(`nome`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE
    `Expense` (
        `id` VARCHAR(191) NOT NULL,
        `total` DOUBLE NOT NULL,
        `data` DATETIME(3) NOT NULL,
        `userId` VARCHAR(191) NOT NULL,
        `categoryId` VARCHAR(191) NOT NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,

PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE
    `Revenue` (
        `id` VARCHAR(191) NOT NULL,
        `total` DOUBLE NOT NULL,
        `data` DATETIME(3) NOT NULL,
        `userId` VARCHAR(191) NOT NULL,
        `categoryId` VARCHAR(191) NOT NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,

PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category`
ADD
    CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense`
ADD
    CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense`
ADD
    CONSTRAINT `Expense_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revenue`
ADD
    CONSTRAINT `Revenue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revenue`
ADD
    CONSTRAINT `Revenue_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;