export default function InputKelas({ value, error, onChange, jenjang, levelSD }) {
  let placeholder = "Masukkan kelas";

  if (jenjang === "SD") {
    if (levelSD.includes("Level 1")) {
      placeholder = "Masukkan kelas (1 atau 2)";
    } else if (levelSD.includes("Level 2")) {
      placeholder = "Masukkan kelas (3 atau 4)";
    } else if (levelSD.includes("Level 3")) {
      placeholder = "Masukkan kelas (5 atau 6)";
    } else {
      placeholder = "Masukkan kelas (1-6 sesuai level)";
    }
  } else if (jenjang === "SMP") {
    placeholder = "Masukkan kelas (7-9)";
  } else if (jenjang === "SMA") {
    placeholder = "Masukkan kelas (10-12)";
  }

  return (
    <div>
      <label className="block mb-1 text-white font-medium">
        Kelas
        <span className="text-red-400 ml-1">*</span>
      </label>
      <input
        type="text"
        required
        value={value || ""}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        maxLength="2"
      />
      {error && <p className="mt-1 text-red-200 text-sm">{error}</p>}
    </div>
  );
}
