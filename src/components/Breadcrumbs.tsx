import React from 'react';
import { Folder, ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, onNavigate }) => {
  const parts = currentPath ? currentPath.split('/').filter(Boolean) : [];

  return (
    <nav className="flex items-center gap-1.5 text-xs font-org text-[#5B5F66] dark:text-[#9E9EA4] flex-wrap py-2 border-b border-[#D9DCE1] dark:border-zinc-800">
      <button
        type="button"
        onClick={() => onNavigate('')}
        className={`flex items-center gap-1.5 transition-colors cursor-pointer hover:text-[#2B4F7E] dark:hover:text-[#4A7AB5] ${
          parts.length === 0
            ? 'font-semibold text-[#2B4F7E] dark:text-[#4A7AB5]'
            : 'text-[#5B5F66] dark:text-[#9E9EA4]'
        }`}
      >
        <Folder className="w-3.5 h-3.5 text-[#2B4F7E] dark:text-[#4A7AB5]" />
        <span>Biblioteca</span>
      </button>

      {parts.map((part, index) => {
        const pathUpToThis = parts.slice(0, index + 1).join('/');
        const isLast = index === parts.length - 1;

        return (
          <React.Fragment key={pathUpToThis}>
            <span className="text-[#D9DCE1] dark:text-zinc-600 font-semibold select-none">›</span>
            {isLast ? (
              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate max-w-[220px] sm:max-w-none">
                {part}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(pathUpToThis)}
                className="hover:text-[#2B4F7E] dark:hover:text-[#4A7AB5] text-[#5B5F66] dark:text-[#9E9EA4] transition-colors cursor-pointer truncate max-w-[160px] sm:max-w-none"
              >
                {part}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
