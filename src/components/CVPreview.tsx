import { CVData } from '@/app/page';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  data: CVData;
}

export default function CVPreview({ data }: Props) {
  return (
    <div id="cv-preview" className="w-[210mm] h-[297mm] bg-white text-gray-800 flex font-sans">
      
      <div className="w-[35%] bg-blue-900 text-white p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold leading-tight break-words">{data.name}</h1>
          <p className="text-lg text-blue-300 font-medium mt-2">{data.title}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300 border-b border-blue-300 pb-2">Kontak</h2>
          <div className="flex items-center gap-3 text-sm"> <Mail size={14} /> <span>{data.email}</span></div>
          <div className="flex items-center gap-3 text-sm"> <Phone size={14} /> <span>{data.phone}</span></div>
          <div className="flex items-center gap-3 text-sm"> <MapPin size={14} /> <span>{data.address}</span></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300 border-b border-blue-300 pb-2">Keterampilan</h2>
          <ul className="flex flex-wrap gap-2">
            {data.skills.split(',').map((skill, index) => (
              skill.trim() && <li key={index} className="bg-blue-200 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">{skill.trim()}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-[65%] p-8 overflow-y-auto space-y-8">
        <div className="section">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-900 border-b border-blue-900 pb-2 mb-4">Ringkasan Profil</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>

        <div className="section">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-900 border-b border-blue-900 pb-2 mb-4">Pengalaman Kerja</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold text-blue-900">{exp.position}</h3>
                <span className="text-xs font-medium text-gray-500">{exp.duration}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">{exp.company}</h4>
              <ul className="text-sm list-disc list-outside pl-5 space-y-1">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace('-', '').trim()}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="section">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-900 border-b border-blue-900 pb-2 mb-4">Pendidikan</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-blue-900">{edu.school}</h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
              <p className="text-sm font-medium text-gray-500 whitespace-nowrap pl-4">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}