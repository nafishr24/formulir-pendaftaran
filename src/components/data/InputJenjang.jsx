export default function InputJenjang({ value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Jenjang
        <span className="text-red-400 ml-1">*</span>
      </label>
      <select
        required
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="" disabled className="text-gray-400 italic">
          Pilih Jenjang
        </option>
        <option value="SD">SD</option>
        <option value="SMP">SMP</option>
        <option value="SMA">SMA</option>
      </select>
    </div>
  );
}