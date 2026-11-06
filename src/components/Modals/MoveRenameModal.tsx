import React, { useState, useEffect } from 'react';
import { X, FolderInput } from 'lucide-react';

interface MoveRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPath: string;
  targetType: 'item' | 'pasta';
  allFolderPaths: string[];
  onSave: (origem: string, destinoPasta: string, novoNome: string) => void;
}

export const MoveRenameModal: React.FC<MoveRenameModalProps> = ({
  isOpen,
  onClose,
  targetPath,
  targetType,
  allFolderPaths,
  onSave,
}) => {
  const [destFolder, setDestFolder] = useState('');
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && targetPath) {
      const parts = targetPath.split('/');
      const name = parts.pop() || '';
      const parentFolder = parts.join('/');
      setItemName(name);
      setDestFolder(parentFolder);
      setError('');
    }
  }, [isOpen, targetPath]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = itemName.trim();
    if (!cleanName) {
      setError('Informe um nome válido.');
      return;
    }

    onSave(targetPath, destFolder.trim(), cleanName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-2xs font-org">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1E22] rounded-lg shadow-xl border border-[#D9DCE1] dark:border-zinc-800 p-6 animate-entra">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#F3EFFA] dark:bg-[#221D2C] text-[#5B4B8A] dark:text-[#7D6DB5] rounded-md">
              <FolderInput className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Mover ou Renomear
              </h2>
              <p className="text-[11px] text-[#5B5F66] dark:text-[#9E9EA4] truncate max-w-[260px]">
                {targetType === 'pasta' ? 'Pasta: ' : 'Estudo: '} {targetPath}
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
            <label htmlFor="destFolder" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
              Pasta de Destino (em branco para raiz)
            </label>
            <input
              id="destFolder"
              type="text"
              list="folderList"
              value={destFolder}
              onChange={(e) => setDestFolder(e.target.value)}
              placeholder="Deixe em branco para raiz da biblioteca"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
            />
            <datalist id="folderList">
              <option value="">Raiz da Biblioteca</option>
              {allFolderPaths.filter(Boolean).map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="itemName" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
              Nome do Item
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                if (error) setError('');
              }}
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
