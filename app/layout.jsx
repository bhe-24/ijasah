import Link from 'next/link';
import { BookOpen, Edit3, History } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <nav className="bg-slate-900 text-white p-4 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider">RUANG AKSARA</h1>
            <div className="flex gap-6">
              <Link href="/" className="flex items-center gap-2 hover:text-blue-400 transition">
                <BookOpen size={18} /> Dashboard
              </Link>
              <Link href="/tulis" className="flex items-center gap-2 hover:text-blue-400 transition">
                <Edit3 size={18} /> Tulis
              </Link>
              <Link href="/riwayat" className="flex items-center gap-2 hover:text-blue-400 transition">
                <History size={18} /> Riwayat
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6 mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
