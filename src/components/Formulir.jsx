import React, { useState, useEffect } from 'react';
import Data from './Data';

export default function Formulir() {
  // State untuk data peserta (array)
  const [pesertaList, setPesertaList] = useState([{}]);
  const [errorsArr, setErrorsArr] = useState(['']);
  const [kelasArr, setKelasArr] = useState(['']);
  const [sekolahArr, setSekolahArr] = useState(['']);
  const [namaArr, setNamaArr] = useState(['']);
  const [tglLahirArr, setTglLahirArr] = useState(['']);
  const [nisnArr, setNisnArr] = useState(['']);
  const [daftarSekolah, setDaftarSekolah] = useState([]);
  const [sekolahSuggestions, setSekolahSuggestions] = useState([]);
  
  
  // State untuk data umum
  const [rayon, setRayon] = useState('');
  const [pembimbing, setPembimbing] = useState('');
  const [waPembimbing, setWaPembimbing] = useState('');
  const [waError, setWaError] = useState('');
  
  // State untuk UI
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Saat komponen pertama kali dimuat, coba ambil data dari localStorage
  useEffect(() => {
    const savedSekolah = localStorage.getItem('daftarSekolah');
    if (savedSekolah) {
      setDaftarSekolah(JSON.parse(savedSekolah));
    }
  }, []);


  // Handler untuk nomor WA Pembimbing
  const handleWaChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Hanya angka
    setWaPembimbing(value);
    
    // Validasi minimal 10 digit
    if (value && value.length < 10) {
      setWaError('Nomor WA minimal 10 digit');
    } else {
      setWaError('');
    }
  };

  // Handler untuk perubahan input kelas
  const handleKelasChange = (idx) => (e) => {
    const val = e.target.value;
    const newErrors = [...errorsArr];
    const newKelas = [...kelasArr];
    
    if (val !== '' && !/^\d+$/.test(val)) {
      newErrors[idx] = 'Harap masukkan angka antara 1-12';
    } else if (val !== '' && (parseInt(val) < 1 || parseInt(val) > 12)) {
      newErrors[idx] = 'Kelas harus antara 1-12';
    } else {
      newErrors[idx] = '';
      newKelas[idx] = val;
    }
    
    setErrorsArr(newErrors);
    setKelasArr(newKelas);
  };
  
  const getAllSekolahUsed = () => {
    const allSekolah = [...daftarSekolah]; // Ambil dari localStorage
    // Tambahkan sekolah yang sudah diisi di form (termasuk yang belum disimpan ke localStorage)
    sekolahArr.forEach(sekolah => {
        if (sekolah && !allSekolah.includes(sekolah)) {
        allSekolah.push(sekolah);
        }
    });
    return allSekolah;
    };

  // Handler untuk perubahan input sekolah
  const handleSekolahChange = (idx) => (e) => {
    const value = e.target.value;
    const newSekolah = [...sekolahArr];
    newSekolah[idx] = value;
    setSekolahArr(newSekolah);

    // Generate suggestions dari semua sekolah yang pernah diisi
    if (value.length > 1) { // Bisa diubah jadi 1 atau 2 karakter minimal
        const allSekolah = getAllSekolahUsed();
        const filtered = allSekolah.filter(sekolah => 
        sekolah.toLowerCase().includes(value.toLowerCase())
        );
        setSekolahSuggestions(filtered);
    } else {
        setSekolahSuggestions([]);
    }
    };

  // Handler ketika sekolah dipilih dari suggestion
  const handleSelectSekolah = (idx) => (sekolah) => {
    const newSekolah = [...sekolahArr];
    newSekolah[idx] = sekolah;
    setSekolahArr(newSekolah);
    setSekolahSuggestions([]);

    // Tambahkan ke daftar sekolah jika belum ada
    if (!daftarSekolah.includes(sekolah)) {
      const updatedDaftar = [...daftarSekolah, sekolah];
      setDaftarSekolah(updatedDaftar);
      localStorage.setItem('daftarSekolah', JSON.stringify(updatedDaftar));
    }
  };

  const handleNamaChange = (idx) => (e) => {
    const newNama = [...namaArr];
    newNama[idx] = e.target.value;
    setNamaArr(newNama);
  };

  const handleTglLahirChange = (idx) => (e) => {
    const newTglLahir = [...tglLahirArr];
    newTglLahir[idx] = e.target.value;
    setTglLahirArr(newTglLahir);
  };

  const handleNisnChange = (idx) => (e) => {
    const newNisn = [...nisnArr];
    newNisn[idx] = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNisnArr(newNisn);
  };

  // Tambah peserta baru
  const handleTambah = () => {
    const newList = [...pesertaList, {}];
    setPesertaList([...pesertaList, {}]);
    setErrorsArr([...errorsArr, '']);
    setKelasArr([...kelasArr, '']);
    setSekolahArr([...sekolahArr, '']);
    setNamaArr([...namaArr, '']);
    setTglLahirArr([...tglLahirArr, '']);
    setNisnArr([...nisnArr, '']);
    const allSekolah = getAllSekolahUsed();
    setSekolahSuggestions(allSekolah);
  };

  // Hapus peserta
  const handleHapus = (idx) => {
    if (pesertaList.length <= 1) {
      alert('Minimal harus ada 1 peserta');
      return;
    }
    
    const newPesertaList = pesertaList.filter((_, i) => i !== idx);
    const newErrorsArr = errorsArr.filter((_, i) => i !== idx);
    const newKelasArr = kelasArr.filter((_, i) => i !== idx);
    const newSekolahArr = sekolahArr.filter((_, i) => i !== idx);
    const newNamaArr = namaArr.filter((_, i) => i !== idx);
    const newTglLahirArr = tglLahirArr.filter((_, i) => i !== idx);
    const newNisnArr = nisnArr.filter((_, i) => i !== idx);
    
    setPesertaList(newPesertaList);
    setErrorsArr(newErrorsArr);
    setKelasArr(newKelasArr);
    setSekolahArr(newSekolahArr);
    setNamaArr(newNamaArr);
    setTglLahirArr(newTglLahirArr);
    setNisnArr(newNisnArr);
  };

  // Validasi sebelum submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi data wajib
    const hasError = errorsArr.some((err) => err !== '');
    const hasEmptyKelas = kelasArr.some((k) => k === '');
    const hasEmptyNama = namaArr.some((n) => !n || n.trim() === '');
    const hasEmptySekolah = sekolahArr.some((s) => !s || s.trim() === '');
    const hasEmptyRayon = !rayon;
    const hasEmptyPembimbing = !pembimbing || pembimbing.trim() === '';
    const hasWaError = !waPembimbing || waPembimbing.length < 10;
    
    if (hasError || hasEmptyKelas || hasEmptyNama || hasEmptySekolah || 
        hasEmptyRayon || hasEmptyPembimbing || hasWaError) {
      alert('Periksa kembali data peserta!\nPastikan semua field wajib (*) terisi dengan benar.\nNomor WA harus minimal 10 digit.');
      return;
    }
    
    setShowConfirmation(true);
  };

  // Konfirmasi submit - Tambahkan WA ke data yang dikirim
  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    setSubmitStatus('loading');
    
    setTimeout(() => {
      try {
        console.log('Data yang dikirim:', {
          rayon,
          pembimbing,
          wa_pembimbing: waPembimbing,
          peserta: pesertaList.map((_, idx) => ({
            nama: namaArr[idx],
            kelas: kelasArr[idx],
            sekolah: sekolahArr[idx],
            tglLahir: tglLahirArr[idx],
            nisn: nisnArr[idx]
          }))
        });
        
        setSubmitStatus('success');
        setTimeout(() => {
          // Reset form
          setPesertaList([{}]);
          setErrorsArr(['']);
          setKelasArr(['']);
          setSekolahArr(['']);
          setNamaArr(['']);
          setTglLahirArr(['']);
          setNisnArr(['']);
          setRayon('');
          setPembimbing('');
          setWaPembimbing('');
          setSubmitStatus(null);
        }, 3000);
      } catch (error) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 3000);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-2xl bg-teal-600 text-gray-900 shadow-xl rounded-lg p-6 my-8"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          FORMULIR PENDAFTARAN LOMBA MATEMATIKA
        </h1>

        {/* Data Umum */}
        <div className="space-y-4 mb-8 p-4 bg-teal-700 rounded-lg">
          <div>
            <label className="block mb-2 text-white font-medium">
              Rayon<span className="text-red-400 ml-1">*</span>
            </label>
            <select
              required
              value={rayon}
              onChange={(e) => setRayon(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Pilih Rayon</option>
              <option value="Rayon 1 (Jakarta Pusat)">Rayon 1 - Jakarta Pusat</option>
              <option value="Rayon 2 (Jakarta Barat)">Rayon 2 - Jakarta Barat</option>
              <option value="Rayon 3 (Jakarta Timur)">Rayon 3 - Jakarta Timur</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-white font-medium">
              Nama Pembimbing<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              required
              value={pembimbing}
              onChange={(e) => setPembimbing(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-teal-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nama lengkap pembimbing"
            />
          </div>

          {/* Tambahan Field Nomor WA Pembimbing */}
          <div>
            <label className="block mb-2 text-white font-medium">
              Nomor WA Pembimbing<span className="text-red-400 ml-1">*</span>
            </label>
            <div className="flex items-center">
              <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-r-0 border-gray-300">+62</span>
              <input
                type="tel"
                required
                value={waPembimbing}
                onChange={handleWaChange}
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
        
        {/* Data Peserta */}
        {pesertaList.map((_, idx) => (
          <div key={idx} className="mb-6 p-4 bg-teal-700 rounded-lg relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-white">
                Peserta {idx + 1}
              </h2>
              {pesertaList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleHapus(idx)}
                  className="w-7 h-7 flex items-center justify-center rounded-full 
                            bg-red-500 text-white hover:bg-red-600 
                            active:bg-red-700 active:scale-90 transition-all duration-200"
                  title="Hapus peserta"
                  aria-label="Hapus peserta"
                >
                  ×
                </button>
              )}
            </div>
            
            <Data
                kelas={kelasArr[idx]}
                errors={{ kelas: errorsArr[idx] }}
                onKelasChange={handleKelasChange(idx)}
                onNamaChange={handleNamaChange(idx)}
                onSekolahChange={handleSekolahChange(idx)}
                onSelectSekolah={handleSelectSekolah(idx)}
                onTglLahirChange={handleTglLahirChange(idx)}
                onNisnChange={handleNisnChange(idx)}
                nama={namaArr[idx]}
                sekolah={sekolahArr[idx]}
                tglLahir={tglLahirArr[idx]}
                nisn={nisnArr[idx]}
                sekolahSuggestions={sekolahSuggestions}
                isSekolahFocused={true}
            />
          </div>
        ))}

        {/* Tombol Aksi */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleTambah}
            className="flex-1 bg-teal-800 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 
                      active:bg-teal-950 transition-colors shadow-md"
          >
            + Tambah Peserta
          </button>
          <button
            type="submit"
            className="flex-1 bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-600 
                      active:bg-amber-700 transition-colors shadow-md"
          >
            Daftarkan Peserta
          </button>
        </div>
      </form>

      {/* Popup Konfirmasi */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-teal-600 border-b pb-2">
                Konfirmasi Pendaftaran
              </h2>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Rayon:</h3>
                    <p className="text-gray-900">{rayon}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Pembimbing:</h3>
                    <p className="text-gray-900">{pembimbing}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Nomor WA:</h3>
                    <p className="text-gray-900">+62{waPembimbing}</p>
                  </div>
                </div>
              
              <h3 className="font-semibold text-gray-700 mb-2">Data Peserta:</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {pesertaList.map((_, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-teal-600 mb-2">Peserta {idx + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-sm text-gray-500">Nama:</span>
                        <p>{namaArr[idx]}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Kelas:</span>
                        <p>{kelasArr[idx]}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Asal Sekolah:</span>
                        <p>{sekolahArr[idx]}</p>
                      </div>
                      {tglLahirArr[idx] && (
                        <div>
                          <span className="text-sm text-gray-500">Tanggal Lahir:</span>
                          <p>{new Date(tglLahirArr[idx]).toLocaleDateString('id-ID')}</p>
                        </div>
                      )}
                      {nisnArr[idx] && (
                        <div>
                          <span className="text-sm text-gray-500">NISN:</span>
                          <p>{nisnArr[idx]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 
                          active:bg-gray-500 transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                          active:bg-teal-800 transition-colors"
              >
                Konfirmasi Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifikasi Status */}
      {submitStatus && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className={`px-6 py-3 rounded-lg shadow-xl text-white font-medium flex items-center ${
            submitStatus === 'success' ? 'bg-green-500' : 
            submitStatus === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}>
            {submitStatus === 'success' ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Pendaftaran berhasil dikirim!
              </>
            ) : submitStatus === 'error' ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Gagal mengirim pendaftaran
              </>
            ) : (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim data...
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}