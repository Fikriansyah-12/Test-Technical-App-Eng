# Technical Test App Eng - Fikri Ansyah

Repository ini berisi source code untuk technical test posisi **Application Engineering / App Eng**:

- **Backend**: NestJS + TypeScript + PostgreSQL + Prisma
- **Frontend**: Next.js + TypeScript + Ant Design

## BACKEND NEST JS

## Buat .env di folder Backend & koneksi PostgreSQL
- **DATABASE_URL**="postgresql://postgres:password@localhost:5432/technical_test_db?schema=public"

# JWT secret untuk sign token
JWT_SECRET="jwtsecrettechnicaltest"

# Project Setup
cd backend
npm install

# Generate Prisma Client
npx prisma generate

# (opsional) jalankan migrasi kalau diperlukan
npx prisma migrate dev --name init

# Jalankan NestJS
npm run start:dev

----------------------------------------

## FRONT END NEXT JS

# Buat .env di folder Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1


# Project Setup
cd frontend
npm install

# Jalankan NextJs
npm run dev

------------
## Jawaban Nomor 3

3. Soal 3 – Raw SQL Query (tanpa ORM) + Manipulasi ID

Pada soal nomor 3, saya diminta untuk membuat raw SQL (bukan Prisma/ORM) berdasarkan tabel users dan company, serta melakukan manipulasi ID pada kondisi tertentu.

##Tabel users
INSERT INTO users (id, nama, email, telp) VALUES
('12qwer',  'Imron', NULL, '081234567890'),
('321rewq', 'Juli', 'Sammy@mail.com', '0987654321'),
('12qjk', 'Gajah Mada', NULL, NULL);

##Tabel company
INSERT INTO company (id, user_id, company_code, company_name) VALUES
('trew098',    '12qwer',  'SPI', 'Samudera'),
('poiuyt1234', '321rewq', 'PIC', 'Samudera'),
('typ12',  NULL,      NULL,  'Samudera');

##CASE WHEN digunakan untuk override nilai ID ketika rule tertentu terpenuhi agar hasil view nya
mirip dengan soal yang ada pada table company dan user
SELECT
  CASE
    WHEN company_name = 'Samudera' AND user_id IS NULL
    THEN NULL
    ELSE id
  END AS id,
  company_name,
  user_id,
  company_code
FROM company;

-- SELECT
--   CASE WHEN nama = 'Gajah Mada' THEN NULL ELSE id END    AS id,
--   nama,
--   email,
--   telp
-- FROM users;

#Jawaban Raw Sql
SELECT
  u.id           AS user_id,
  c.id           AS company_id,
  u.nama,
  u.email,
  u.telp,
  c.company_code,
  c.company_name
FROM users u
JOIN company c ON c.user_id = u.id
ORDER BY u.id;

