'use client';

import { useState, useEffect } from 'react';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import ResetModal from '@/components/ResetModal';
import { FileText, Edit, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import quickcvLogo from '../img/quickcv-logo.png';

export interface Education { school: string; degree: string; year: string; }
export interface Experience { company: string; position: string; duration: string; description: string; }
export interface CVData { name: string; title: string; email: string; phone: string; address: string; summary: string; education: Education[]; experience: Experience[]; skills: string; }
const initialCvData: CVData = { name: 'MOH. OFIKURRAHMAN', title: 'Front-End Web Developer & Mahasiswa Teknik Informatika', email: 'ofikurxyz@gmail.com', phone: '0812-3456-7890', address: 'Pamekasan, Madura, Indonesia', summary: 'Mahasiswa Teknik Informatika yang bersemangat dalam mengembangkan aplikasi web dari hulu ke hilir. Terampil dalam ekosistem JavaScript modern seperti React, Next.js, dan Node.js. Mencari kesempatan untuk berkontribusi dalam proyek-proyek yang menantang dan inovatif.', education: [ { school: 'Universitas Islam Madura', degree: 'S1 Teknik Informatika', year: '2021 - Sekarang' }, { school: 'SMK Negeri 2 Pamekasan', degree: 'Teknik Jaringan Komputer', year: '2018 - 2021' }, ], experience: [ {  company: 'Proyek Pribadi',  position: 'Full-Stack Developer',  duration: '2023 - Sekarang',  description: '- Merancang dan mengembangkan aplikasi CV Builder ini menggunakan Next.js, Tailwind CSS, dan Puppeteer.\n- Mengimplementasikan fitur real-time preview dan generate PDF di sisi server.'  }, ], skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Tailwind CSS, HTML5, CSS3, Git, Vercel, Python' };
const blankCvData: CVData = { name: '', title: '', email: '', phone: '', address: '', summary: '', education: [], experience: [], skills: '' };

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(initialCvData);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => { try { const savedData = localStorage.getItem('cvData'); if (savedData) { setCvData(JSON.parse(savedData)); } } catch (error) { console.error("Gagal memuat data dari Local Storage:", error); } }, []);
  useEffect(() => { try { localStorage.setItem('cvData', JSON.stringify(cvData)); } catch (error) { console.error("Gagal menyimpan data ke Local Storage:", error); } }, [cvData]);

  const handleDownloadPdf = async () => { setLoading(true); try { const response = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cvData), }); if (!response.ok) throw new Error('Gagal membuat PDF'); const blob = await response.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `CV_${cvData.name.replace(/\s/g, '_')}.pdf`; document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url); } catch (error) { console.error(error); alert('Maaf, terjadi kesalahan saat membuat PDF.'); } finally { setLoading(false); } };

  const handleResetToDefault = () => { setCvData(initialCvData); setIsResetModalOpen(false); };
  const handleResetToBlank = () => { setCvData(blankCvData); setIsResetModalOpen(false); };

  return (
    <div className="bg-gray-100 font-sans">
      <ResetModal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} onResetToDefault={handleResetToDefault} onResetToBlank={handleResetToBlank} />

      <main className="hidden md:flex min-h-screen">
        <div className="w-full md:w-2/5 lg:w-1/3 p-8 bg-white overflow-y-auto h-screen border-r">
          <div className='text-center mb-6'>
            <div className="flex justify-center mb-4">
              <Image src={quickcvLogo} alt="QuickCV Logo" width={80} height={80} className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">QuickCV</h1>
            <p className="text-gray-500">Membuat CV Profesional dengan Mudah dan Cepat</p>
          </div>
          <CVForm cvData={cvData} setCvData={setCvData} />
          <div className="space-y-2 mt-6">
            <button onClick={() => setIsResetModalOpen(true)} className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300">
              <RefreshCw size={16} /> Reset Data
            </button>
            <button onClick={handleDownloadPdf} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400">
              {loading ? 'Sedang Membuat PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 bg-gray-200 flex items-start justify-center overflow-y-auto h-screen">
          <div className="transform scale-[0.8] lg:scale-[0.85] origin-top">
            <CVPreview data={cvData} />
          </div>
        </div>
      </main>

      <main className="md:hidden min-h-screen flex flex-col">
        <div className="p-4 bg-white border-b">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <Image src={quickcvLogo} alt="QuickCV Logo" width={50} height={50} className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">QuickCV</h1>
          </div>
           <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
                <button onClick={() => setActiveView('form')} className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-colors ${activeView === 'form' ? 'bg-red-500 text-white' : 'text-gray-600'}`}>
                    <Edit size={16}/> Formulir
                </button>
                <button onClick={() => setActiveView('preview')} className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-colors ${activeView === 'preview' ? 'bg-red-500 text-white' : 'text-gray-600'}`}>
                    <FileText size={16}/> Pratinjau
                </button>
           </div>
        </div>

        <div className={`flex-grow ${activeView === 'preview' ? 'overflow-hidden bg-gray-200 flex items-center justify-center' : 'overflow-y-auto bg-white'}`}>
            {activeView === 'form' ? (
                <div className="p-4 sm:p-6">
                    <CVForm cvData={cvData} setCvData={setCvData} />
                </div>
            ) : (

                <div style={{ zoom: 0.45 }} className="mx-auto">
                    <CVPreview data={cvData} />
                </div>
            )}
        </div>

        <div className="p-4 bg-white border-t sticky bottom-0 space-y-2">
             <button onClick={() => setIsResetModalOpen(true)} className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300">
               <RefreshCw size={16} /> Reset Data
             </button>
             <button onClick={handleDownloadPdf} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400">
              {loading ? 'Sedang Membuat PDF...' : 'Download PDF'}
            </button>
        </div>
      </main>
    </div>
  );
}
