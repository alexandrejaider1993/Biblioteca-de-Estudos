import React, { useEffect, useRef } from 'react';
import { ExternalLink, FolderInput, Trash2, FolderOpen } from 'lucide-react';

export interface ContextMenuTarget {
  type: 'item' | 'pasta';
  caminho: string;
  titulo?: string;
  x: number;
  y: number;
}

interface ContextMenuProps {
  target: ContextMenuTarget | null;
  onClose: () => void;
  onOpen: (caminho: string, type: 'item' | 'pasta') => void;
  onMoveRename: (caminho: string, type: 'item' | 'pasta') => void;
  onDelete: (caminho: string, type: 'item' | 'pasta') => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  target,
  onClose,
  onOpen,
  onMoveRename,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (target) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [target, onClose]);

  if (!target) return null;

  // Ensure menu stays within viewport
  const menuWidth = 190;
  const menuHeight = 135;
  const safeX = Math.min(target.x, window.innerWidth - menuWidth - 12);
  const safeY = Math.min(target.y, window.innerHeight - menuHeight - 12);

  return (
    <div
      ref={menuRef}
      style={{ top: `${Math.max(12, safeY)}px`, left: `${Math.max(12, safeX)}px` }}
      className="fixed z-50 w-[190px] bg-white dark:bg-[#1E1E22] rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-1.5 flex flex-col gap-0.5 animate-entra font-org"
    >
      <button
        type="button"
        onClick={() => {
          onOpen(target.caminho, target.type);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-left cursor-pointer"
      >
        {target.type === 'pasta' ? (
          <FolderOpen className="w-3.5 h-3.5 text-[#2B4F7E] dark:text-blue-400" />
        ) : (
          <ExternalLink className="w-3.5 h-3.5 text-[#2B4F7E] dark:text-blue-400" />
        )}
        <span>{target.type === 'pasta' ? 'Abrir Pasta' : 'Abrir Estudo'}</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onMoveRename(target.caminho, target.type);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-left cursor-pointer"
      >
        <FolderInput className="w-3.5 h-3.5 text-zinc-500" />
        <span>Mover / Renomear</span>
      </button>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />

      <button
        type="button"
        onClick={() => {
          onDelete(target.caminho, target.type);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-left cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Excluir</span>
      </button>
    </div>
  );
};
