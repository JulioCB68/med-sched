-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Date" DATETIME NOT NULL,
    "doctor" TEXT NOT NULL,
    "patient" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reason" TEXT DEFAULT 'Default Reason',
    "rg" TEXT DEFAULT '00000000000',
    "cpf" TEXT DEFAULT '000000000',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Appointments" ("Date", "cpf", "createdAt", "doctor", "id", "patient", "reason", "rg", "status", "updatedAt", "userId") SELECT "Date", "cpf", "createdAt", "doctor", "id", "patient", "reason", "rg", "status", "updatedAt", "userId" FROM "Appointments";
DROP TABLE "Appointments";
ALTER TABLE "new_Appointments" RENAME TO "Appointments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
