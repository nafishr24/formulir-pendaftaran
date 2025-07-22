import React from 'react';

export default function InputNISN({ value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        NISN
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="10 digit NISN (opsional)"
        maxLength="10"
        pattern="\d*"
      />
      <p className="text-xs text-gray-200 mt-1">*Harap masukkan 10 digit angka NISN</p>
    </div>
  );
}