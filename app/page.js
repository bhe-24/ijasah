"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // File config firebase kamu

export default function CendekiaGenerator() {
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSiswa = async () => {
      // Sesuaikan 'data_siswa' dengan nama koleksi di Firebase kamu yang lama
      const querySnapshot = await getDocs(collection(db, "data_siswa"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSiswa(data);
    };
    fetchSiswa();
  }, []);

  const handleGenerate = async (dataSiswa) => {
    setLoading(true);
    try {
      // Mengirim perintah ke backend kita
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataSiswa),
      });
      const result = await res.json();
      alert(`Proses dimulai! ID Job: ${result.jobId}`);
    } catch (error) {
      alert("Gagal memulai proses.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Panel Kelulusan Cendekia Aksara</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NIM / ID</th>
            <th className="border p-2">Nama Siswa</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s) => (
            <tr key={s.id} className="text-center">
              <td className="border p-2">{s.nim || s.id}</td>
              <td className="border p-2">{s.nama}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleGenerate(s)}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Generate Ijazah & Kirim WA"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
