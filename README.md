# 📲 Notifikasi Otomatis WhatsApp  
### Pelatihan Komdig — MoRagister Nasional

Script ini digunakan untuk mengirim **notifikasi otomatis WhatsApp** kepada peserta Pelatihan Komdig – MoRagister Nasional yang mendaftar melalui Google Form.  
Sistem ini memastikan **pesan hanya terkirim ke peserta baru**, sehingga **tidak terjadi duplikasi**.

---

## 🚀 Fitur Utama
- ✅ Mengirim pesan WhatsApp otomatis ke peserta baru  
- ✅ Anti-duplikasi (pesan hanya terkirim sekali)  
- ✅ Template pesan mudah diedit  
- ✅ Menggunakan Google Apps Script (tanpa server)

---

## 📌 Cara Kerja
1. Peserta mengisi Google Form  
2. Data masuk ke Google Spreadsheet  
3. Script membaca baris terbaru  
4. Script mengirim pesan WhatsApp ke nomor peserta  
5. Script menandai data sebagai **"sudah"** agar tidak mengirim dua kali  

---

## 🧩 Contoh Script Notifikasi WhatsApp

> **Catatan:**  
> - Kolom nama berada di kolom ke-2  
> - Kolom nomor WhatsApp berada di kolom ke-3  
> - Kolom status berada di kolom ke-7  

```javascript
function kirimWA() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("KONFIRMASI");
  const lastRow = sheet.getLastRow();

  const nama = sheet.getRange(lastRow, 2).getValue();
  const nomor = sheet.getRange(lastRow, 3).getValue();
  const status = sheet.getRange(lastRow, 7).getValue();

  // Cek duplikasi
  if (status === "sudah") {
    Logger.log("Pesan sudah terkirim sebelumnya. Skip.");
    return;
  }

  // Teks pesan
  const pesan = 
`Assalamualaikum ${nama},

Terima kasih telah mendaftar *Pelatihan Komdig – MoRagister Nasional!* 🎉

Silakan bergabung ke grup WhatsApp resmi:
👉 https://chat.whatsapp.com/XXXXXXXXXXXX

Informasi lengkap pelatihan akan disampaikan dalam grup.
Terima kasih.`;

  // Kirim WA via URL API/link WA
  const url = "https://api.whatsapp.com/send?phone=" + nomor + "&text=" + encodeURIComponent(pesan);
  UrlFetchApp.fetch(url);

  // Tandai agar tidak terkirim dua kali
  sheet.getRange(lastRow, 7).setValue("sudah");

  Logger.log("Pesan WA terkirim ke: " + nomor);
}
