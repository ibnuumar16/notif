# 📲 Notifikasi WhatsApp & Email Otomatis - KOMDIGI MORAGISTER
### (Google Form → Google Apps Script)

Script ini digunakan untuk mengirim **notifikasi WhatsApp dan Email secara otomatis** setiap kali ada peserta baru yang mengisi Google Form.  
Sangat cocok untuk acara seminar, workshop, pelatihan, maupun pendaftaran umum.

---

## 🚀 Fitur Utama
- 🟢 Notifikasi WhatsApp otomatis untuk peserta baru  
- 🟢 Notifikasi Email otomatis  
- 🟢 Menggunakan Google Apps Script (tanpa server, gratis)  
- 🟢 Mudah digunakan dan bisa langsung dipasang di Google Spreadsheet  

---

## 🧩 Script Lengkap

> Sesuaikan nama kolom Form Anda: **Nama**, **Email**, dan **Nomor Whatsapp**.

```javascript
function kirimnotif(e) {
  const apiUrl = "https://gateway.baitulabidindarussalam.ponpes.id/send-message";

  const apiKey = "API_KEY_ANDA";
  const nomorpengirim = "628XXXXXXXXXXX"; // Format internasional
  const linkgroup = "https://chat.whatsapp.com/XXXXXXXXXXXXXXXX"; // Link grup WA

  // Ambil data dari Google Form
  const nama = e.namedValues["Nama"][0];
  const email = e.namedValues["Email"][0];
  const nomor = e.namedValues["Nomor Whatsapp"][0];

  // Template pesan
  const isipesan =
`Assalamu'alaikum ${nama},

Terima kasih telah mendaftar acara ini.

Silakan bergabung ke WhatsApp Group resmi melalui link berikut:
${linkgroup}

Di grup akan disampaikan informasi penting, jadwal, dan materi acara.
Sampai bertemu, insyaAllah!`;

  // =====================
  // 1) KIRIM WHATSAPP
  // =====================
  const payload = {
    api_key: apiKey,
    sender: nomorpengirim,
    number: nomor,
    message: isipesan
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(apiUrl, options);
  Logger.log("WA Response: " + response.getContentText());

  // =====================
  // 2) KIRIM EMAIL
  // =====================
  MailApp.sendEmail({
    to: email,
    subject: "Informasi Grup WhatsApp Acara",
    body: isipesan
  });

  Logger.log("Email terkirim ke: " + email);
}
