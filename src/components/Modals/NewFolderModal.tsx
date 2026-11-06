import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';

interface NewFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  allFolderPaths: string[];
  onCreateFolder: (folderPath: string) => void;
}

export const NewFolderModal: React.FC<NewFolderModalProps> = ({
  isOpen,
  onClose,
  currentPath,
  allFolderPaths,
  onCreateFolder,
}) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = folderName.trim();
    if (!trimmed) {
      setError('Informe o nome da pasta.');
      return;
    }

    const targetPath = currentPath ? `${currentPath}/${trimmed}` : trimmed;
    onCreateFolder(targetPath);
    setFolderName('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-2xs font-org">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1E22] rounded-lg shadow-xl border border-[#D9DCE1] dark:border-zinc-800 p-6 animate-entra">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#EEF3F9] dark:bg-[#192330] text-[#2B4F7E] dark:text-[#4A7AB5] rounded-md">
              <FolderPlus className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Criar Nova Pasta
              </h2>
              <p className="text-[11px] text-[#5B5F66] dark:text-[#9E9EA4]">
                {currentPath ? `Dentro de: ${currentPath}` : 'Na raiz da biblioteca'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="folderInput" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
              Nome da Pasta (use / para criar subpastas automaticamente)
            </label>
            <input
              id="folderInput"
              type="text"
              autoFocus
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ex: Semestre 1/Anatomia Humana"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-[#A8322D] dark:text-[#D2534D] bg-[#FBEFEE] dark:bg-[#2D1A19] p-2 rounded-md">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D9DCE1] dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Criar Pasta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
