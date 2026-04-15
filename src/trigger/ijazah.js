import { task } from "@trigger.dev/sdk/v3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // Untuk Cloudflare R2
// Import library PDF generator (contoh: pdf-lib) atau konektor Baileys milikmu

export const generateIjazahTask = task({
  id: "generate-ijazah",
  maxRetries: 3,
  run: async (payload, { ctx }) => {
    const { nama, nomorWa, nilaiAkhir } = payload;

    console.log(`[1] Memulai proses untuk ${nama}`);

    // --- INTEGRASI OLLAMA ---
    // Meminta AI membuatkan pesan personal berdasarkan nilai/data
    const ollamaRes = await fetch("http://URL_OLLAMA_KAMU/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3", 
        prompt: `Buat 2 kalimat apresiasi kelulusan untuk siswa bernama ${nama} dengan nilai ${nilaiAkhir}.`,
        stream: false
      })
    });
    const ollamaData = await ollamaRes.json();
    const pesanPersonal = ollamaData.response;

    console.log(`[2] Pesan AI selesai: ${pesanPersonal}`);

    // --- GENERATE PDF (SIMULASI) ---
    // Di sini kamu pakai library seperti 'pdf-lib' untuk menempel teks ke template ijazah Cendekia Aksara.
    // Tambahkan variabel nama Kepala Operasional: Mukhamad Bayu Aji Tolafudin di ttd.
    const pdfBuffer = Buffer.from("Ini adalah simulasi file PDF Ijazah..."); 
    const fileName = `Ijazah-${nama.replace(/\s+/g, '-')}.pdf`;

    console.log(`[3] PDF berhasil dibuat`);

    // --- UPLOAD KE CLOUDFLARE R2 ---
    const s3 = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT, // Misal: https://<account_id>.r2.cloudflarestorage.com
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
      },
    });

    await s3.send(new PutObjectCommand({
      Bucket: "cendekia-ijazah",
      Key: fileName,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    }));
    
    const r2Url = `https://cdn.domain-kamu.com/${fileName}`; // URL Publik R2
    console.log(`[4] PDF diunggah ke R2: ${r2Url}`);

    // --- KIRIM VIA BAILEYS (WHATSAPP) ---
    // Panggil API endpoint bot Baileys kamu yang nyala di server terpisah
    await fetch("http://URL_SERVER_BAILEYS_KAMU/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: nomorWa,
        message: `Selamat ${nama}!\n\n${pesanPersonal}\n\nSilakan unduh dokumen ijazah dan surat kelulusanmu di sini: ${r2Url}`
      })
    });

    console.log(`[5] WhatsApp terkirim ke ${nomorWa}`);

    return { success: true, fileUrl: r2Url };
  },
});
