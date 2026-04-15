"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Calendar, Tag } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function HasilBaca({ params }) {
  const [naskah, setNaskah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilSatuNaskah = async () => {
      try {
        // params.id didapat otomatis dari URL web kamu
        const docRef = doc(db, "naskah", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNaskah(docSnap.data());
        } else {
          alert("Naskah tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    ambilSatuNaskah();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!naskah) return <div className="p-10 text-center">Naskah tidak ditemukan.</div>;

  return (
    <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-slate-100 max-w-3xl mx-auto my-10">
      <Link href="/riwayat" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition mb-8 inline-block">
        <ArrowLeft size={18} /> Kembali ke Riwayat
      </Link>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-4">{naskah.judul}</h1>
      
      <div className="flex gap-4 mb-8 pb-8 border-b border-slate-100 text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} /> {naskah.tanggal}
        </div>
        <div className="flex items-center gap-1">
          <Tag size={14} /> {naskah.genre}
        </div>
      </div>
      
      {/* Konten Naskah */}
      <article className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
        {naskah.konten}
      </article>
    </div>
  );
}
