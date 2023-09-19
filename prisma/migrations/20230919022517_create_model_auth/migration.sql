-- CreateTable
CREATE TABLE "authenticate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "authenticate_email_key" ON "authenticate"("email");
