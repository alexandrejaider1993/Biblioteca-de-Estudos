import React from 'react';
import { UserAccount, StudyType } from '../types/library';
import { Sun, Moon, BookOpen, Folder, Palette, LogOut, Home } from 'lucide-react';

export type AppViewMode = 'home' | 'apostila' | 'biblioteca' | 'brandbook';

interface HeaderProps {
  user: UserAccount;
  currentMode: AppViewMode;
  onSelectMode: (mode: AppViewMode) => void;
  activeFilter: StudyType | 'ALL';
  onSelectFilter: (filter: StudyType | 'ALL') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  totalStudiesCount: number;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentMode,
  onSelectMode,
  activeFilter,
  onSelectFilter,
  theme,
  onToggleTheme,
  totalStudiesCount,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D9DCE1] dark:border-zinc-800 bg-[#FFFFFF]/95 dark:bg-[#161618]/95 backdrop-blur-md px-4 sm:px-8 py-2.5 transition-colors">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Brand wordmark reduzido em 75% para perfil discreto e editorial */}
        <button
          type="button"
          onClick={() => onSelectMode('home')}
          className="flex items-center gap-2.5 shrink-0 hover:opacity-85 transition-opacity cursor-pointer text-left"
          title="Ir para a Página Inicial"
        >
          <img
            src="/assets/aistudio/logo_transparente.png?v=transp4"
            alt="estuda Jaider"
            className="h-3.5 sm:h-4 w-auto object-contain dark:invert transition-all select-none"
          />
          <span className="hidden md:inline-block text-[10.5px] text-[#5B5F66] dark:text-[#9E9EA4] font-org border-l border-[#D9DCE1] dark:border-zinc-800 pl-2.5 py-0.5">
            Medicina · v3.1
          </span>
        </button>

        {/* Zone 2: Navigation mode tabs (Início / Apostila v3.1 / Biblioteca / Guia Visual) */}
        <nav className="flex items-center gap-1 p-1 bg-[#F4F5F7] dark:bg-zinc-800/80 rounded-[6px] text-xs font-org">
          <button
            type="button"
            onClick={() => onSelectMode('home')}
            className={`px-3 py-1.5 rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentMode === 'home'
                ? 'bg-white dark:bg-zinc-700 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold shadow-xs'
                : 'text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#2B4F7E] dark:text-[#90B5E0]" />
            <span>Início</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('apostila')}
            className={`px-3 py-1.5 rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentMode === 'apostila'
                ? 'bg-white dark:bg-zinc-700 text-[#2B4F7E] dark:text-[#90B5E0] font-semibold shadow-xs'
                : 'text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2B4F7E] dark:text-[#90B5E0]" />
            <span>Apostila v3.1</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('biblioteca')}
            className={`px-3 py-1.5 rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentMode === 'biblioteca'
                ? 'bg-white dark:bg-zinc-700 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold shadow-xs'
                : 'text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-[#A8322D]" />
            <span>Biblioteca de Pastas</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('brandbook')}
            className={`hidden sm:flex px-3 py-1.5 rounded-[4px] transition-all cursor-pointer items-center gap-1.5 whitespace-nowrap ${
              currentMode === 'brandbook'
                ? 'bg-white dark:bg-zinc-700 text-[#3D7A5A] dark:text-[#52A078] font-semibold shadow-xs'
                : 'text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#3D7A5A]" />
            <span>Brand Book & Regras</span>
          </button>
        </nav>

        {/* Zone 3: Actions - Theme toggle, User badge & Logout */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 text-[#5B5F66] hover:text-[#1D1D1F] dark:text-[#9E9EA4] dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F5F7] dark:bg-zinc-800 rounded-md text-xs font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A5A]"></span>
            <span className="font-medium truncate max-w-[130px]">{user.nome}</span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#A8322D] hover:bg-[#FBEFEE] dark:hover:bg-rose-950/30 rounded-md transition-colors cursor-pointer font-org"
            title="Encerrar sessão"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>

      </div>
    </header>
  );
};
