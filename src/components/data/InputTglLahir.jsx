import React from 'react';

export default function InputTglLahir({ value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Tanggal Lahir
      </label>
      <input
        type="date"
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
        max={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
}