import React from 'react';

export default function InputNama({ value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Nama Siswa
        <span className="text-red-400 ml-1">*</span>
      </label>
      <input
        type="text"
        required
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Masukkan nama lengkap siswa"
      />
    </div>
  );
}