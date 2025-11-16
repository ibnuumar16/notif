function kirimnotif(e) {
  const apiUrl = "https://gateway.baitulabidindarussalam.ponpes.id/send-message";

  const apiKey = "API-KEY";
  const nomorpengirim = "NOMOR HP TERDAFTAR"; // 628xxx
  const linkgroup = "https://chat.whatsapp.com/XXXXXXXXXXXXXXXX"; // Link grup WA

  // Ambil data dari Google Form
  const nama = e.namedValues["Nama"][0];  
  const nomor = e.namedValues["Nomor Whatsapp"][0]; 
  const email = e.namedValues["Email"][0];

  // Pesan ajakan gabung grup
  const isipesan =
    `Assalamu'alaikum ${nama},

Terima kasih telah mendaftar seminar.

Silakan bergabung ke WhatsApp Group resmi acara melalui link berikut:
${linkgroup}

Di grup ini akan disampaikan informasi penting, jadwal, dan materi.

Sampai bertemu di acara, insyaAllah!`;

  // Payload ke API WhatsApp
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

  // Eksekusi
  const response = UrlFetchApp.fetch(apiUrl, options);
  Logger.log(response.getContentText());

  MailApp.sendEmail({
    to: email,
    subject: "Informasi Grup WhatsApp Seminar",
    body: isipesan
  });
  
  Logger.log("Email terkirim ke: " + email);
}
