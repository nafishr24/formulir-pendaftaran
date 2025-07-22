import React, { useState, useRef, useEffect } from 'react';

export default function InputSekolah({ 
  value, 
  onChange, 
  onSelect, 
  suggestions,
  isFocused
}) {
  const sekolahRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sekolahRef.current && !sekolahRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sekolahRef} className="relative">
      <label className="block mb-1 text-white font-medium">
        Asal Sekolah<span className="text-red-400 ml-1">*</span>
      </label>
      <input
        type="text"
        required
        value={value || ''}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Masukkan asal sekolah"
      />
      
      {(isActive && isFocused) && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
              onClick={() => {
                onSelect(item);
                setIsActive(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}