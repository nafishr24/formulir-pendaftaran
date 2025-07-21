import React, { useState, useRef, useEffect } from 'react';

export default function Data({ 
  kelas, 
  errors, 
  onKelasChange,
  onNamaChange,
  onSekolahChange,
  onSelectSekolah,
  onTglLahirChange,
  onNisnChange,
  nama,
  sekolah,
  tglLahir,
  nisn,
  sekolahSuggestions,
  isSekolahFocused
}) {
  const sekolahRef = useRef(null);
  const [isSekolahActive, setIsSekolahActive] = useState(false);

  // Handle click outside untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sekolahRef.current && !sekolahRef.current.contains(event.target)) {
        setIsSekolahActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Nama Siswa */}
      <div>
        <label className="block mb-1 text-white font-medium">
          Nama Siswa
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="text"
          required
          value={nama || ''}
          onChange={onNamaChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Masukkan nama lengkap siswa"
        />
      </div>

      {/* Kelas */}
      <div>
        <label className="block mb-1 text-white font-medium">
          Kelas
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="text"
          required
          value={kelas || ''}
          onChange={onKelasChange}
          className={`w-full border rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  errors.kelas ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Masukkan kelas (1-12)"
          maxLength="2"
        />
        {errors.kelas && (
          <p className="mt-1 text-red-200 text-sm">{errors.kelas}</p>
        )}
      </div>

      {/* Asal Sekolah */}
      <div ref={sekolahRef} className="relative">
                <label className="block mb-1 text-white font-medium">
                Asal Sekolah<span className="text-red-400 ml-1">*</span>
                </label>
                <input
                type="text"
                required
                value={sekolah || ''}
                onChange={onSekolahChange}
                onFocus={() => setIsSekolahActive(true)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Masukkan asal sekolah"
                />
                
                {/* Dropdown Suggestions */}
                {(isSekolahActive && isSekolahFocused) && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {sekolahSuggestions.map((sekolahItem, index) => (
                    <div
                        key={index}
                        className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                        onClick={() => {
                        onSelectSekolah(sekolahItem);
                        setIsSekolahActive(false);
                        }}
                    >
                        {sekolahItem}
                    </div>
                    ))}
                </div>
                )}
      </div>

      {/* Tanggal Lahir */}
      <div>
        <label className="block mb-1 text-white font-medium">
          Tanggal Lahir
        </label>
        <input
          type="date"
          value={tglLahir || ''}
          onChange={onTglLahirChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          max={new Date().toISOString().split('T')[0]} // Tidak boleh lebih dari hari ini
        />
      </div>

      {/* NISN */}
      <div>
        <label className="block mb-1 text-white font-medium">
          NISN
        </label>
        <input
          type="text"
          value={nisn || ''}
          onChange={onNisnChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="10 digit NISN (opsional)"
          maxLength="10"
          pattern="\d*"
        />
        <p className="text-xs text-gray-200 mt-1">*Harap masukkan 10 digit angka NISN</p>
      </div>
    </div>
  );
}
