-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_kelas" TEXT NOT NULL,
    "tingkat" TEXT NOT NULL,
    "jurusan_id" INTEGER NOT NULL,
    CONSTRAINT "Kelas_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Kelas" ("id", "jurusan_id", "kode_kelas", "tingkat") SELECT "id", "jurusan_id", "kode_kelas", "tingkat" FROM "Kelas";
DROP TABLE "Kelas";
ALTER TABLE "new_Kelas" RENAME TO "Kelas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
