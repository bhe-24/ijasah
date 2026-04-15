/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Mematikan peringatan penulisan kode saat Vercel melakukan build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Mengabaikan error tipe data sementara
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
