import React from 'react';

export default function InputLevelSD({ value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Level SD
        <span className="text-red-400 ml-1">*</span>
      </label>
      <select
        required
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="" disabled className="text-gray-400 italic">
          Pilih Level
        </option>
        <option value="Level 1 - Kelas 1 dan Kelas 2">Level 1 - Kelas 1 dan Kelas 2</option>
        <option value="Level 2 - Kelas 3 dan Kelas 4">Level 2 - Kelas 3 dan Kelas 4</option>
        <option value="Level 3 - Kelas 5 dan Kelas 6">Level 3 - Kelas 5 dan Kelas 6</option>
      </select>
    </div>
  );
}