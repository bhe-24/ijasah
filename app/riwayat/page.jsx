import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function RiwayatTulisan() {
  const naskah = [
    { id: 1, judul: "SEMU - Prolog", tanggal: "12 Apr 2026", status: "Selesai", genre: "Psychological Drama" },
    { id: 2, judul: "UAP KESERAKAHAN - Bab 4", tanggal: "14 Apr 2026", status: "Draf", genre: "Distopia" },
    { id: 3, judul: "Sketsa Kota - Bagian 1", tanggal: "10 Apr 2026", status: "Selesai", genre: "Urban Slice-of-Life" },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Riwayat Tulisan</h2>
      
      <div className="space-y-4">
        {naskah.map((item) => (
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
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {item.status}
              </span>
              <Link href={`/hasil/${item.id}`} className="text-blue-600 hover:underline font-medium text-sm">
                Baca
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
