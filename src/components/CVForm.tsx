import { CVData, Education, Experience } from '@/app/page';
import { User, Briefcase, GraduationCap, Sparkles, PlusCircle, XCircle } from 'lucide-react';

interface Props {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const FormSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
      {icon}
      <h3 className="font-bold text-lg text-gray-700">{title}</h3>
    </div>
    <div className="p-4 space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ name, value, onChange, placeholder, label }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm p-2.5 border text-gray-900 placeholder:text-gray-400"
    />
  </div>
);

export default function CVForm({ cvData, setCvData }: Props) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = <T extends Education | Experience>(
    index: number, 
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: 'education' | 'experience'
  ) => {
    const { name, value } = e.target;
    const list = [...cvData[section]];
    list[index] = { ...list[index], [name]: value };
    setCvData(prev => ({ ...prev, [section]: list }));
  };
  
  const addSectionItem = (section: 'education' | 'experience') => {
    if (section === 'education') {
      setCvData(prev => ({ ...prev, education: [...prev.education, { school: '', degree: '', year: '' }] }));
    } else {
      setCvData(prev => ({ ...prev, experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }] }));
    }
  };

  const removeSectionItem = (index: number, section: 'education' | 'experience') => {
    const list = [...cvData[section]];
    list.splice(index, 1);
    setCvData(prev => ({ ...prev, [section]: list }));
  };

  return (
    <form className="space-y-5">
      <FormSection icon={<User className="text-red-500" />} title="Data Pribadi">
        <InputField label="Nama Lengkap" name="name" value={cvData.name} onChange={handlePersonalInfoChange} placeholder="cth: John Doe" />
        <InputField label="Jabatan/Gelar" name="title" value={cvData.title} onChange={handlePersonalInfoChange} placeholder="cth: Front-End Web Developer" />
        <InputField label="Email" name="email" value={cvData.email} onChange={handlePersonalInfoChange} placeholder="cth: johndoe@example.com" />
        <InputField label="Telepon" name="phone" value={cvData.phone} onChange={handlePersonalInfoChange} placeholder="cth: 0812-3456-7890" />
        <InputField label="Alamat" name="address" value={cvData.address} onChange={handlePersonalInfoChange} placeholder="cth: Teyvat" />
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Ringkasan</label>
          <textarea name="summary" value={cvData.summary} onChange={handlePersonalInfoChange} rows={5} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm p-2.5 border text-gray-900 placeholder:text-gray-400" placeholder="Ceritakan tentang dirimu..."/>
        </div>
      </FormSection>

      <FormSection icon={<Briefcase className="text-red-500" />} title="Pengalaman Kerja">
        {cvData.experience.map((exp, index) => (
          <div key={index} className="p-3 border rounded-lg space-y-3 bg-gray-50 relative">
             <button type="button" onClick={() => removeSectionItem(index, 'experience')} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><XCircle size={20} /></button>
             <InputField label="Posisi" name="position" value={exp.position} onChange={(e: any) => handleDynamicChange(index, e, 'experience')} />
             <InputField label="Perusahaan" name="company" value={exp.company} onChange={(e: any) => handleDynamicChange(index, e, 'experience')} />
             <InputField label="Durasi" name="duration" value={exp.duration} onChange={(e: any) => handleDynamicChange(index, e, 'experience')} placeholder="cth: 2023 - Sekarang"/>
             <textarea name="description" value={exp.description} onChange={(e: any) => handleDynamicChange(index, e, 'experience')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm p-2.5 border text-sm text-gray-900 placeholder:text-gray-400" placeholder="Deskripsi pekerjaan..."/>
          </div>
        ))}
        <button type="button" onClick={() => addSectionItem('experience')} className="w-full flex items-center justify-center gap-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-md transition-colors">
          <PlusCircle size={16} /> Tambah Pengalaman
        </button>
      </FormSection>

      <FormSection icon={<GraduationCap className="text-red-500" />} title="Pendidikan">
        {cvData.education.map((edu, index) => (
          <div key={index} className="p-3 border rounded-lg space-y-3 bg-gray-50 relative">
            <button type="button" onClick={() => removeSectionItem(index, 'education')} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><XCircle size={20} /></button>
            <InputField label="Nama Sekolah/Universitas" name="school" value={edu.school} onChange={(e: any) => handleDynamicChange(index, e, 'education')} />
            <InputField label="Gelar/Jurusan" name="degree" value={edu.degree} onChange={(e: any) => handleDynamicChange(index, e, 'education')} />
            <InputField label="Tahun" name="year" value={edu.year} onChange={(e: any) => handleDynamicChange(index, e, 'education')} placeholder="cth: 2021 - 2025" />
          </div>
        ))}
        <button type="button" onClick={() => addSectionItem('education')} className="w-full flex items-center justify-center gap-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-md transition-colors">
          <PlusCircle size={16} /> Tambah Pendidikan
        </button>
      </FormSection>

       <FormSection icon={<Sparkles className="text-red-500" />} title="Keterampilan">
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sebutkan Keterampilan (pisahkan dengan koma)</label>
            <textarea name="skills" value={cvData.skills} onChange={handlePersonalInfoChange} rows={3} className="w-full rounded-md border-gray-300 shadow-sm p-2.5 border text-sm text-gray-900 placeholder:text-gray-400" placeholder="cth: JavaScript, Excel Expert, Tidur Siang..."/>
        </div>
      </FormSection>
    </form>
  );
}