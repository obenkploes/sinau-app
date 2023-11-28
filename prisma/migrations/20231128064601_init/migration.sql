-- CreateTable
CREATE TABLE "Kelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_kelas" TEXT NOT NULL,
    "tingkat" TEXT NOT NULL,
    "jurusan_id" INTEGER NOT NULL,
    CONSTRAINT "Kelas_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_jurusan" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL
);
