"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function EditNaskah({ params }) {
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ambilData = async () => {
      const docRef = doc(db, "naskah", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setJudul(docSnap.data().judul);
        setKonten(docSnap.data().konten);
      }
      setLoading(false);
    };
    ambilData();
  }, [params.id]);

  const updateTulisan = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "naskah", params.id);
      await updateDoc(docRef, {
        judul: judul,
        konten: konten,
        tanggalUpdate: new Date().toLocaleDateString('id-ID')
      });
      alert("Naskah berhasil diperbarui!");
      router.push('/riwayat'); // Kembali ke riwayat setelah sukses
    } catch (error) {
      alert("Gagal memperbarui naskah.");
    }
    setIsSaving(false);
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="text-slate-500 flex items-center gap-2 hover:text-slate-800">
          <ArrowLeft size={18} /> Kembali
        </button>
        <button 
          onClick={updateTulisan}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Save size={18} /> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
      
      <input 
        type="text" 
        className="text-3xl font-bold text-slate-800 outline-none w-full mb-4"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />
      
      <textarea 
        className="flex-1 w-full resize-none outline-none text-lg text-slate-700 leading-relaxed"
        value={konten}
        onChange={(e) => setKonten(e.target.value)}
      ></textarea>
    </div>
  );
}
