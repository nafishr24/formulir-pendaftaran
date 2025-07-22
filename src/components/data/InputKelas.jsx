import React from 'react';

export default function InputKelas({ value, error, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Kelas
        <span className="text-red-400 ml-1">*</span>
      </label>
      <input
        type="text"
        required
        value={value || ''}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Masukkan kelas (1-12)"
        maxLength="2"
      />
      {error && (
        <p className="mt-1 text-red-200 text-sm">{error}</p>
      )}
    </div>
  );
}