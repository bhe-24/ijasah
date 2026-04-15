import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HasilBaca({ params }) {
  // Dalam aslinya, ID ini dipakai untuk ambil data dari database. 
  // Karena ini versi simple, kita pakai teks statis.
  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
      <Link href="/riwayat" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition mb-8 inline-block">
        <ArrowLeft size={18} /> Kembali ke Riwayat
      </Link>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-2">SEMU - Prolog</h1>
      <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100">Selesai pada 12 Apr 2026</p>
      
      <article className="prose prose-slate prose-lg max-w-none text-slate-700 leading-loose">
        <p>
          Lampu neon berkedip dua kali sebelum akhirnya mati total, menyisakan kegelapan yang tak asing di sudut jalan ini. 
          Ia menarik napas panjang, mencoba membedakan mana realita dan mana sekadar pantulan dari apa yang otaknya proyeksikan.
        </p>
        <p>
          "Semuanya terasa semu belakangan ini," bisiknya pada udara kosong.
        </p>
        <p>
          Langkah kaki terdengar dari kejauhan, teratur namun berat. Ada sesuatu di balik tembok beton sana yang menunggu untuk diungkap, tapi ia belum siap membalik halamannya hari ini.
        </p>
      </article>
    </div>
  );
}
