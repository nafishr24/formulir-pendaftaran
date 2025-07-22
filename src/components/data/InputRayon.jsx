import React from 'react';

export default function InputRayon({ value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-white font-medium">
        Rayon<span className="text-red-400 ml-1">*</span>
      </label>
      <select
        required
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {value === '' && (
          <option value="" disabled hidden className="text-gray-400 italic">
            Pilih Rayon
          </option>
        )}
        <option value="Rayon 1 (Universitas Madura)">Rayon 1 (Universitas Madura)</option>
        <option value="Rayon 2 (SMKN 2 Sampang)">Rayon 2 (SMKN 2 Sampang)</option>
        <option value="Rayon 3 (SMAN 1 Sumenep)">Rayon 3 (SMAN 1 Sumenep)</option>
        <option value="Rayon 4 (SMAN 1 Bangkalan)">Rayon 4 (SMAN 1 Bangkalan)</option>
      </select>
    </div>
  );
}