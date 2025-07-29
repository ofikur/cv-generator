import { RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onResetToDefault: () => void;
  onResetToBlank: () => void;
}

export default function ResetModal({ isOpen, onClose, onResetToDefault, onResetToBlank }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-gray-800">Reset Data CV</h3>
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Anda yakin ingin melanjutkan? Data yang sudah diubah akan hilang.
        </p>
        
        <div className="space-y-3">
          <button onClick={onResetToDefault} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            <RefreshCw size={16} /> Kembalikan ke Contoh Awal
          </button>
          
          <button onClick={onResetToBlank} className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors" >
            <Trash2 size={16} /> Kosongkan Semua Data
          </button>
          
          <button onClick={onClose} className="w-full flex items-center justify-center gap-2 mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors">
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}