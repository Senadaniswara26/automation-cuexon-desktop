# Boilerplate Automation Testing

Boilerplate pengujian UI dan API dengan Playwright Test, TypeScript strict, Gherkin melalui `playwright-bdd`, serta Allure. Contoh UI memakai SauceDemo; contoh API memakai DummyJSON.

## Persiapan

Persyaratan: Node.js 20 atau lebih baru dan npm.

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
Copy-Item src/data/accounts/accounts.example.json src/data/accounts/accounts.json
```

File `accounts.json` lokal sudah di-ignore Git. Isikan kredensial untuk environment dan role yang akan dipakai. Template staging menggunakan akun demo publik SauceDemo (`standard_user` / `secret_sauce`), sehingga contoh UI bisa langsung dijalankan. Nilai default `.env` juga memakai URL demo; `TEST_ENV` default-nya `staging`.

## Menjalankan Test

```powershell
npm test
npm run test:ui
npm run test:api
npm run test:tag -- --grep "@smoke"
```

Project `ui` menjalankan Chromium. Project `api` hanya memakai `APIRequestContext` dan tidak membutuhkan browser. Untuk mode headed, ubah `HEADLESS=false` di `.env`.

### Registrasi Purpos

Form pendaftaran Mie SS Pasuruan dapat diuji secara terpisah:

```powershell
Copy-Item src/data/test-data/registration.example.json src/data/test-data/registration.json
npm run test:registration
```

Isi data pribadi di `registration.json`, yang sudah di-ignore Git. Perintah khusus ini mengirim form ke situs publik dan dapat membuat akun sungguhan; gunakan email yang belum terdaftar dan jalankan hanya saat memang siap membuat akun. Project registrasi tidak dimuat oleh `npm test` biasa.

Untuk menyiapkan autentikasi atau data sebelum langkah UI, gunakan step API sebagai precondition:

```gherkin
Given I authenticate via API as "user" with password "password"
When I open the application
Then I should see the dashboard
```

Step ini memakai `apiClient` dan menyimpan token untuk request API berikutnya dalam skenario yang sama. Token tidak otomatis menjadi sesi browser; implementasikan session bridge (misalnya cookie atau local storage) sesuai mekanisme aplikasi sebelum membuka UI jika diperlukan. Atur `API_BASE_URL` ke backend aplikasi dan sesuaikan endpoint/schema. Demo di boilerplate sengaja memakai dua layanan publik terpisah: DummyJSON untuk API dan SauceDemo untuk UI; token DummyJSON tidak mengautentikasi sesi SauceDemo.

## Allure

Hasil ditulis ke `reports/allure-results`. Buat dan buka report setelah test dijalankan:

```powershell
npm run allure:generate
npm run allure:open
```

Perintah Allure memerlukan Java dan Allure Commandline tersedia di `PATH`.

## Konvensi

- Feature ditaruh di `src/features/ui` atau `src/features/api`; beri tag domain `@ui` atau `@api` dan tag tujuan seperti `@smoke` atau `@regression`.
- Step definition memakai akhiran `.steps.ts`, dipisah menurut domain. Step UI tidak membuat locator; semua locator dan action berada di page object.
- Page object memakai nama PascalCase (`LoginPage`) dan semua page object mewarisi `BasePage`. Locator didefinisikan sebagai method/arrow function pada file page object yang sama.
- API client dipisah per resource; kontrak request/response berada di `src/api/schemas`.
- Akun dipilih dengan `getAccount(role)` berdasarkan `TEST_ENV`. Jangan commit `accounts.json` atau menaruh kredensial rahasia di feature, source, maupun `.env.example`.
- Jalankan `npm run lint` untuk ESLint dan `npm run format` untuk Prettier.

## Struktur Utama

```text
src/
  features/{ui,api}/
  steps/{ui,api}/
  pages/
  api/{clients,schemas}/
  data/{accounts,test-data}/
  utils/
  types/
reports/
```
