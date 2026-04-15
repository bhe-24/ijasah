"use client";
import { useState } from 'react';
import { Save } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Memanggil kunci Firebase tadi

export default function RuangTulis() {
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const simpanTulisan = async () => {
    // Cegah simpan kalau judul atau isi kosong
    if (!judul || !konten) {
      alert('Judul dan isi naskah tidak boleh kosong ya!');
      return;
    }

    setIsSaving(true);
    try {
      // Perintah mengirim data ke koleksi bernama "naskah" di Firebase
      await addDoc(collection(db, "naskah"), {
        judul: judul,
        konten: konten,
        tanggal: new Date().toLocaleDateString('id-ID'),
        status: "Draf",
        genre: "Umum"
      });
      
      alert(`Naskah "${judul}" berhasil disimpan ke Database!`);
      setJudul(''); // Kosongkan judul setelah simpan
      setKonten(''); // Kosongkan isi setelah simpan
    } catch (error) {
      console.error("Error: ", error);
      alert("Gagal menyimpan naskah. Cek koneksi internetmu.");
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text" 
          placeholder="Judul Bab / Cerita..." 
          className="text-3xl font-bold text-slate-800 outline-none w-full placeholder:text-slate-300"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
        <button 
          onClick={simpanTulisan}
          disabled={isSaving}
          className={`${isSaving ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'} text-white px-6 py-2 rounded-lg flex items-center gap-2 transition`}
        >
          <Save size={18} /> {isSaving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
      
      <textarea 
        placeholder="Mulai mengetik naskahmu di sini..."
        className="flex-1 w-full resize-none outline-none text-lg text-slate-700 leading-relaxed placeholder:text-slate-300"
        value={konten}
        onChange={(e) => setKonten(e.target.value)}
      ></textarea>
    </div>
  );
}
