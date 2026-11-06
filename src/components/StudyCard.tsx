import React from 'react';
import { StudyItem, StudyType } from '../types/library';
import {
  Globe,
  FileText,
  Presentation,
  Layers,
  FileSpreadsheet,
  Folder,
  MoreVertical,
  BookOpen
} from 'lucide-react';

interface StudyCardProps {
  item: StudyItem;
  index: number;
  onOpen: (item: StudyItem) => void;
  onOptions: (e: React.MouseEvent, item: StudyItem) => void;
  onDragStart: (e: React.DragEvent, item: StudyItem) => void;
}

interface FolderCardProps {
  name: string;
  fullPath: string;
  itemCount: number;
  index: number;
  onOpen: (path: string) => void;
  onOptions: (e: React.MouseEvent, folderPath: string) => void;
  onDragStart: (e: React.DragEvent, folderPath: string) => void;
  onDropOnFolder: (e: React.DragEvent, targetFolder: string) => void;
}

/**
 * Cores Oficiais do Brand Book da Apostila (pág. 3):
 * As caixas não têm contorno: a cor de fundo sozinha faz o trabalho.
 * Cantos discretos de 3mm a 4mm (rounded-lg).
 */
const getTypeStyle = (type: StudyType) => {
  switch (type) {
    case 'Site':
      // Conceito-chave / Veia
      return {
        bg: 'bg-[#EEF3F9] dark:bg-[#192330] hover:bg-[#E4ECF6] dark:hover:bg-[#1E2B3D]',
        accent: 'text-[#2B4F7E] dark:text-[#4A7AB5]',
        label: 'Conceito & Interativo',
      };
    case 'PDF':
      // Correlação clínica / Artéria
      return {
        bg: 'bg-[#FBEFEE] dark:bg-[#2D1A19] hover:bg-[#F6E5E3] dark:hover:bg-[#36201E]',
        accent: 'text-[#A8322D] dark:text-[#D2534D]',
        label: 'Apostila & Atlas',
      };
    case 'Slides':
      // Destaque da Professora / Aula
      return {
        bg: 'bg-[#FFF3EB] dark:bg-[#2C1E14] hover:bg-[#FCE9DC] dark:hover:bg-[#37261A]',
        accent: 'text-[#C2410C] dark:text-[#EA642C]',
        label: 'Aula & Slides',
      };
    case 'Anki':
      // Síntese e Revisão / Linfa
      return {
        bg: 'bg-[#EDF6F0] dark:bg-[#15261D] hover:bg-[#E2EFE7] dark:hover:bg-[#1C3227]',
        accent: 'text-[#3D7A5A] dark:text-[#52A078]',
        label: 'Síntese & Anki',
      };
    case 'Word':
      // Aprofunde no Livro / Prosa
      return {
        bg: 'bg-[#F6F2EA] dark:bg-[#26231C] hover:bg-[#ECE7DC] dark:hover:bg-[#302D24]',
        accent: 'text-[#6B5A3E] dark:text-[#D2BEA0]',
        label: 'Livro & Resumo',
      };
    case 'Planilha':
      // Ponto de prova / Nervo
      return {
        bg: 'bg-[#FBF4DC] dark:bg-[#2D2615] hover:bg-[#F5EBCB] dark:hover:bg-[#38301B]',
        accent: 'text-[#9A7609] dark:text-[#C8A02A]',
        label: 'Tabelas & Prova',
      };
    default:
      return {
        bg: 'bg-[#F4F5F7] dark:bg-[#202124] hover:bg-[#E8EAEE] dark:hover:bg-[#28292D]',
        accent: 'text-[#4A4E55] dark:text-[#B3B7BD]',
        label: 'Documento',
      };
  }
};

const getTypeIcon = (type: StudyType, accentClass: string) => {
  switch (type) {
    case 'Site':
      return <Globe className={`w-4 h-4 ${accentClass} shrink-0`} />;
    case 'PDF':
      return <BookOpen className={`w-4 h-4 ${accentClass} shrink-0`} />;
    case 'Slides':
      return <Presentation className={`w-4 h-4 ${accentClass} shrink-0`} />;
    case 'Anki':
      return <Layers className={`w-4 h-4 ${accentClass} shrink-0`} />;
    case 'Word':
      return <FileText className={`w-4 h-4 ${accentClass} shrink-0`} />;
    case 'Planilha':
      return <FileSpreadsheet className={`w-4 h-4 ${accentClass} shrink-0`} />;
  }
};

export const StudyCard: React.FC<StudyCardProps> = ({
  item,
  index,
  onOpen,
  onOptions,
  onDragStart,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const style = getTypeStyle(item.tipo);

  return (
    <div
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, item);
      }}
      onDragEnd={() => setIsDragging(false)}
      onClick={() => onOpen(item)}
      style={{ animationDelay: `${index * 0.02}s` }}
      className={`group relative p-4 rounded-lg transition-all duration-150 cursor-pointer animate-entra flex flex-col justify-between select-none ${
        style.bg
      } ${
        isDragging
          ? 'opacity-40 scale-95'
          : 'hover:-translate-y-0.5 hover:shadow-xs'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            {getTypeIcon(item.tipo, style.accent)}
            <span className="font-semibold text-[14.5px] leading-snug font-org text-zinc-900 dark:text-zinc-100 break-words group-hover:opacity-90 transition-opacity">
              {item.titulo}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOptions(e, item);
            }}
            className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Opções do estudo"
            aria-label="Opções"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {item.descricao && (
          <p className="text-[12.5px] leading-relaxed text-[#5B5F66] dark:text-[#9E9EA4] line-clamp-2 mb-3 font-ler">
            {item.descricao}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-[11.5px] font-org text-[#5B5F66] dark:text-[#9E9EA4] pt-2 border-t border-black/5 dark:border-white/5">
        <span className={`font-semibold ${style.accent}`}>
          {style.label}
        </span>
        <div className="flex items-center gap-2">
          {item.tamanho && (
            <span className="tabular-nums opacity-80">{item.tamanho}</span>
          )}
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{item.data}</span>
        </div>
      </div>
    </div>
  );
};

export const FolderCard: React.FC<FolderCardProps> = ({
  name,
  fullPath,
  itemCount,
  index,
  onOpen,
  onOptions,
  onDragStart,
  onDropOnFolder,
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, fullPath);
      }}
      onDragEnd={() => setIsDragging(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        onDropOnFolder(e, fullPath);
      }}
      onClick={() => onOpen(fullPath)}
      style={{ animationDelay: `${index * 0.02}s` }}
      className={`group relative p-4 rounded-lg bg-[#E8F0FE] dark:bg-[#1A283C] hover:bg-[#DEEBFC] dark:hover:bg-[#20324B] text-[#2B4F7E] dark:text-[#4A7AB5] transition-all duration-150 cursor-pointer animate-entra flex flex-col justify-between select-none ${
        isDragging ? 'opacity-40 scale-95' : 'hover:-translate-y-0.5 hover:shadow-xs'
      } ${
        isDragOver
          ? 'ring-2 ring-[#2B4F7E] dark:ring-[#4A7AB5] scale-[1.02] bg-blue-100 dark:bg-blue-950'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Folder className="w-4.5 h-4.5 text-[#2B4F7E] dark:text-[#4A7AB5] fill-[#2B4F7E]/10 dark:fill-[#4A7AB5]/15 shrink-0" />
          <span className="font-semibold text-[14.5px] font-org text-zinc-900 dark:text-zinc-100 break-words group-hover:text-[#2B4F7E] dark:group-hover:text-[#4A7AB5] transition-colors">
            {name}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOptions(e, fullPath);
          }}
          className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title="Opções da pasta"
          aria-label="Opções"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11.5px] text-[#5B5F66] dark:text-[#9E9EA4] font-org pt-2 border-t border-black/5 dark:border-white/5">
        <span className="font-semibold text-[#2B4F7E] dark:text-[#4A7AB5]">Pasta</span>
        <span className="tabular-nums">
          {itemCount} {itemCount === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  );
};
