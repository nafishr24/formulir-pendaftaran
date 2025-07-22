import React from 'react';

export default function TombolKontrol({ onTambah, onSubmit }) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <button
        type="button"
        onClick={onTambah}
        className="flex-1 bg-teal-800 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 
                  active:bg-teal-950 transition-colors shadow-md"
      >
        + Tambah Peserta
      </button>
      <button
        type="submit"
        className="flex-1 bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-600 
                  active:bg-amber-700 transition-colors shadow-md"
      >
        Daftarkan Peserta
      </button>
    </div>
  );
}