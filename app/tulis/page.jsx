"use client";
import { useState } from 'react';
import { Save } from 'lucide-react';

export default function RuangTulis() {
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');

  const simpanTulisan = () => {
    alert(`Naskah "${judul}" berhasil disimpan sementara!`);
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
          className="bg-slate-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
        >
          <Save size={18} /> Simpan
        </button>
      </div>
      
      <textarea 
        placeholder="Lyra menatap layar berkedip di depannya. Sistem menunjukkan Elian baru saja mengakses data terlarang itu..."
        className="flex-1 w-full resize-none outline-none text-lg text-slate-700 leading-relaxed placeholder:text-slate-300"
        value={konten}
        onChange={(e) => setKonten(e.target.value)}
      ></textarea>
    </div>
  );
}
