import Link from 'next/link';
import { PenTool, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800">Selamat datang kembali!</h2>
        <p className="text-slate-500 mt-2">Lanjutkan progres naskahmu hari ini.</p>
        
        <div className="mt-6 flex gap-4">
          <div className="bg-blue-50 p-6 rounded-xl flex-1 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900">Total Karya</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">12</p>
            <p className="text-sm text-blue-600/70 mt-1">Bab diselesaikan</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl flex-1 border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-900">Kata Ditulis</h3>
            <p className="text-4xl font-bold text-emerald-600 mt-2">45.2K</p>
            <p className="text-sm text-emerald-600/70 mt-1">Bulan ini</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="text-slate-400" /> Terakhir Dikerjakan
        </h3>
        <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-400 transition">
          <h4 className="font-bold text-lg text-slate-800">UAP KESERAKAHAN - Bab 4</h4>
          <p className="text-slate-600 text-sm mt-1 line-clamp-2">
            Asap tebal masih mengepul dari cerobong pabrik di ujung kota, menyamarkan realita distopia yang harus dihadapi para pekerja...
          </p>
          <Link href="/tulis" className="text-blue-600 text-sm font-medium mt-3 inline-block">
            Lanjutkan Menulis &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
