"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Loader2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function RiwayatTulisan() {
  const [naskah, setNaskah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk menarik data dari Firebase saat halaman dibuka
    const ambilDataDariFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "naskah"));
        const dataAsli = querySnapshot.docs.map(doc => ({
          id: doc.id, // ID unik dari Firebase
          ...doc.data() // Isi naskahmu (judul, konten, dll)
        }));
        setNaskah(dataAsli);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal memuat riwayat naskah.");
      } finally {
        setLoading(false);
      }
    };

    ambilDataDariFirebase();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Riwayat Tulisan</h2>
      
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center p-8 text-slate-500">
            <Loader2 className="animate-spin mr-2" /> Memuat naskahmu...
          </div>
        ) : naskah.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-slate-300 rounded-xl text-slate-500">
            Belum ada naskah yang disimpan. Yuk mulai menulis!
          </div>
        ) : (
          naskah.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{item.judul}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span>{item.tanggal}</span>
                    <span>•</span>
                    <span>{item.genre}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                  {item.status}
                </span>
                {/* Tombol baca ini nanti akan kita arahkan ke halaman hasil yang betulan */}
                <Link href={`/hasil/${item.id}`} className="text-blue-600 hover:underline font-medium text-sm">
                  Baca
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
