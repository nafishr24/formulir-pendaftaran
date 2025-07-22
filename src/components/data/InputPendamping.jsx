import React from 'react';

export default function InputPendamping({ 
  nama, 
  onNamaChange, 
  wa, 
  onWaChange, 
  waError 
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-white font-medium">
          Nama Pembimbing<span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="text"
          required
          value={nama}
          onChange={onNamaChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Nama lengkap pembimbing"
        />
      </div>

      <div>
        <label className="block mb-2 text-white font-medium">
          Nomor WA Pembimbing<span className="text-red-400 ml-1">*</span>
        </label>
        <div className="flex items-center">
          <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-r-0 border-gray-300">+62</span>
          <input
            type="tel"
            required
            value={wa}
            onChange={onWaChange}
            className="flex-1 border border-gray-300 rounded-r px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="81234567890"
            maxLength="15"
          />
        </div>
        {waError && (
          <p className="mt-1 text-red-200 text-sm">{waError}</p>
        )}
        <p className="text-xs text-gray-200 mt-1">Contoh: 81234567890 (tanpa +62)</p>
      </div>
    </div>
  );
}