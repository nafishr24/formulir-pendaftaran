import React, { useState, useEffect } from 'react';
import InputRayon from './data/InputRayon';
import InputPendamping from './data/InputPendamping';
import TombolKontrol from './data/TombolKontrol';
import InputNama from './data/InputNama';
import InputKelas from './data/InputKelas';
import InputSekolah from './data/InputSekolah';
import InputTglLahir from './data/InputTglLahir';
import InputNISN from './data/InputNISN';
import Modal from './ui/Modal';

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
  const [alertModal, setAlertModal] = useState({ open: false, message: '' });

  useEffect(() => {
    const savedSekolah = localStorage.getItem('daftarSekolah');
    if (savedSekolah) {
      setDaftarSekolah(JSON.parse(savedSekolah));
    }
  }, []);

  const handleWaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setWaPembimbing(value);
    
    if (value && value.length < 10) {
      setWaError('Nomor WA minimal 10 digit');
    } else {
      setWaError('');
    }
  };

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
    const allSekolah = [...daftarSekolah];
    sekolahArr.forEach(sekolah => {
      if (sekolah && !allSekolah.includes(sekolah)) {
        allSekolah.push(sekolah);
      }
    });
    return allSekolah;
  };

  const handleSekolahChange = (idx) => (e) => {
    const value = e.target.value;
    const newSekolah = [...sekolahArr];
    newSekolah[idx] = value;
    setSekolahArr(newSekolah);

    if (value.length >= 1) {
      const allSekolah = getAllSekolahUsed();
      const filtered = allSekolah.filter(sekolah => 
        sekolah.toLowerCase().includes(value.toLowerCase())
      );
      setSekolahSuggestions(filtered);
    } else {
      setSekolahSuggestions([]);
    }
  };

  const handleSelectSekolah = (idx) => (sekolah) => {
    const newSekolah = [...sekolahArr];
    newSekolah[idx] = sekolah;
    setSekolahArr(newSekolah);
    setSekolahSuggestions([]);

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

  const handleTambah = () => {
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

  const handleHapus = (idx) => {
    if (pesertaList.length <= 1) {
      setAlertModal({ open: true, message: 'Minimal harus ada 1 peserta' });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const hasError = errorsArr.some((err) => err !== '');
    const hasEmptyKelas = kelasArr.some((k) => k === '');
    const hasEmptyNama = namaArr.some((n) => !n || n.trim() === '');
    const hasEmptySekolah = sekolahArr.some((s) => !s || s.trim() === '');
    const hasEmptyRayon = !rayon;
    const hasEmptyPembimbing = !pembimbing || pembimbing.trim() === '';
    const hasWaError = !waPembimbing || waPembimbing.length < 10;
    
    if (hasError || hasEmptyKelas || hasEmptyNama || hasEmptySekolah || 
        hasEmptyRayon || hasEmptyPembimbing || hasWaError) {
      setAlertModal({ 
        open: true, 
        message: `Periksa kembali data peserta!
         Pastikan semua field wajib 
         (*) 
         terisi dengan benar.`
      });
      return;
    }
    
    setShowConfirmation(true);
  };

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
          <InputRayon value={rayon} onChange={(e) => setRayon(e.target.value)} />
          <InputPendamping 
            nama={pembimbing} 
            onNamaChange={(e) => setPembimbing(e.target.value)}
            wa={waPembimbing}
            onWaChange={handleWaChange}
            waError={waError}
          />
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
            
            <div className="space-y-4">
              <InputNama value={namaArr[idx]} onChange={handleNamaChange(idx)} />
              <InputKelas 
                value={kelasArr[idx]} 
                error={errorsArr[idx]} 
                onChange={handleKelasChange(idx)} 
              />
              <InputSekolah
                value={sekolahArr[idx]}
                onChange={handleSekolahChange(idx)}
                onSelect={handleSelectSekolah(idx)}
                suggestions={sekolahSuggestions}
                isFocused={true}
              />
              <InputTglLahir value={tglLahirArr[idx]} onChange={handleTglLahirChange(idx)} />
              <InputNISN value={nisnArr[idx]} onChange={handleNisnChange(idx)} />
            </div>
          </div>
        ))}

        <TombolKontrol onTambah={handleTambah} />
      </form>

      <Modal
        isOpen={alertModal.open}
        onClose={() => setAlertModal({ ...alertModal, open: false })}
        title="Pemberitahuan"
        actions={[
          <button
            key="ok"
            onClick={() => setAlertModal({ ...alertModal, open: false })}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            OK
          </button>,
        ]}
      >
        <div className="text-gray-700 whitespace-pre-line">
          Periksa kembali data peserta!
          {'\n'}Pastikan semua field wajib (<span className="text-red-500">*</span>) terisi dengan benar.
        </div>
      </Modal>


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