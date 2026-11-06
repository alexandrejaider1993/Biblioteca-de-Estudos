import React, { useState, useEffect } from 'react';
import { StudyItem } from '../../types/library';
import { ApostilaChapterView } from './ApostilaChapterView';
import {
  X,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Layers,
  FileText,
  Presentation,
  Table,
  Globe,
  BookOpen
} from 'lucide-react';

interface StudyViewerModalProps {
  item: StudyItem | null;
  onClose: () => void;
}

export const StudyViewerModal: React.FC<StudyViewerModalProps> = ({ item, onClose }) => {
  // Anki Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardScores, setCardScores] = useState<{ [id: string]: 'easy' | 'good' | 'hard' }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // PDF & Slides state
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Table filter state
  const [tableSearch, setTableSearch] = useState('');

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCardScores({});
    setIsCompleted(false);
    setCurrentPage(0);
    setZoomLevel(100);
    setTableSearch('');
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (item?.tipo === 'Anki') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }
      if (item?.tipo === 'Slides' || item?.tipo === 'PDF') {
        if (e.key === 'ArrowRight') {
          handleNextPage();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, isFlipped, currentCardIndex, currentPage]);

  if (!item) return null;

  // Flashcards handling
  const flashcards = item.flashcards || [
    {
      id: 'default-1',
      front: item.titulo,
      back: item.descricao || 'Conteúdo do estudo médico para memorização ativa.',
      notes: 'Deck básico gerado para repetição espaçada.'
    }
  ];

  const handleRateCard = (rating: 'easy' | 'good' | 'hard') => {
    const currentCard = flashcards[currentCardIndex];
    setCardScores((prev) => ({ ...prev, [currentCard.id]: rating }));

    if (currentCardIndex + 1 < flashcards.length) {
      setIsFlipped(false);
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartAnki = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCardScores({});
    setIsCompleted(false);
  };

  // Slides & PDF pagination
  const pdfPages = item.pdfPages || [
    {
      page: 1,
      title: item.titulo,
      text: item.descricao || 'Conteúdo do documento.'
    }
  ];

  const slides = item.slides || [
    {
      title: item.titulo,
      bullets: [item.descricao || 'Tópico principal do slide.'],
      notes: 'Anotações da apresentação médica.'
    }
  ];

  const totalPages = item.tipo === 'PDF' ? pdfPages.length : item.tipo === 'Slides' ? slides.length : 1;

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FDFDFC] dark:bg-[#161618] text-[#1D1D1F] dark:text-[#F5F5F7] overflow-hidden font-org">
      
      {/* Top Bar minimalista */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-[#D9DCE1] dark:border-zinc-800 bg-[#FFFFFF] dark:bg-[#1A1A1E] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Voltar para a biblioteca"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
              {item.titulo}
            </h1>
            <p className="text-[11px] text-[#5B5F66] dark:text-[#9E9EA4] truncate">
              {item.caminho} · {item.tipo} · {item.data}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {item.tipo === 'PDF' && !item.capituloApostila && (
            <div className="hidden sm:flex items-center gap-1 bg-[#F4F5F7] dark:bg-zinc-800 rounded-md p-1 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition-colors"
                title="Reduzir zoom"
              >
                <ZoomOut className="w-3.5 h-3.5 text-[#5B5F66]" />
              </button>
              <span className="px-1.5 font-org text-[11px] tabular-nums text-[#5B5F66]">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition-colors"
                title="Aumentar zoom"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#5B5F66]" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Fechar leitor (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
        <div className="w-full max-w-4xl mx-auto pb-24">
          
          {/* =========================================
              APOSTILA DE MEDICINA (Brand Book v3.1)
             ========================================= */}
          {item.capituloApostila ? (
            <ApostilaChapterView data={item.capituloApostila} />
          ) : (
            <>
              {/* =========================================
                  ANKI FLASHCARDS (Linfa #3D7A5A / #EDF6F0)
                 ========================================= */}
              {item.tipo === 'Anki' && (
                <div className="flex flex-col items-center max-w-2xl mx-auto py-4">
                  {!isCompleted ? (
                    <div className="w-full space-y-6">
                      <div className="flex items-center justify-between text-xs text-[#5B5F66] font-org">
                        <span>
                          Card <strong>{currentCardIndex + 1}</strong> de {flashcards.length}
                        </span>
                        <span>Pressione <strong>Espaço</strong> para virar</span>
                      </div>

                      <div className="w-full h-1 bg-[#D9DCE1] dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#3D7A5A] transition-all duration-300 rounded-full"
                          style={{
                            width: `${((currentCardIndex) / flashcards.length) * 100}%`
                          }}
                        />
                      </div>

                      {/* Card com cantos de 3mm-4mm e fundo sem contorno pesado */}
                      <div
                        onClick={() => setIsFlipped((prev) => !prev)}
                        className="w-full min-h-[300px] sm:min-h-[340px] p-8 rounded-lg bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer flex flex-col justify-between select-none group"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#5B5F66] mb-6 pb-2 border-b border-[#D9DCE1]/60 dark:border-zinc-800">
                            <span className="font-semibold text-[#3D7A5A] dark:text-[#52A078] uppercase tracking-wider text-[11px] font-org">
                              {isFlipped ? 'Resposta' : 'Pergunta'}
                            </span>
                            <span className="text-[11px] text-[#5B5F66] font-org">
                              Clique para virar ⤾
                            </span>
                          </div>

                          <div className="font-ler text-lg sm:text-2xl leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-pre-wrap">
                            {isFlipped
                              ? flashcards[currentCardIndex].back
                              : flashcards[currentCardIndex].front}
                          </div>

                          {isFlipped && flashcards[currentCardIndex].notes && (
                            <div className="mt-6 p-3 bg-[#EDF6F0] dark:bg-[#15261D] rounded-md text-xs font-org text-[#3D7A5A] dark:text-[#52A078]">
                              <strong className="block mb-0.5">Nota clínica:</strong>
                              {flashcards[currentCardIndex].notes}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 text-center text-xs text-[#5B5F66] font-org">
                          {!isFlipped ? 'Espaço ou clique para revelar' : 'Autoavaliação de retenção'}
                        </div>
                      </div>

                      {isFlipped && (
                        <div className="grid grid-cols-3 gap-3 animate-entra pt-2">
                          <button
                            type="button"
                            onClick={() => handleRateCard('hard')}
                            className="py-3 px-4 rounded-md bg-[#FBEFEE] dark:bg-[#2D1A19] text-[#A8322D] dark:text-[#D2534D] font-semibold text-xs sm:text-sm hover:brightness-95 transition-all cursor-pointer font-org flex flex-col items-center gap-0.5"
                          >
                            <span>Errei</span>
                            <span className="text-[10px] font-normal opacity-80">&lt; 1 min</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRateCard('good')}
                            className="py-3 px-4 rounded-md bg-[#EEF3F9] dark:bg-[#192330] text-[#2B4F7E] dark:text-[#4A7AB5] font-semibold text-xs sm:text-sm hover:brightness-95 transition-all cursor-pointer font-org flex flex-col items-center gap-0.5"
                          >
                            <span>Bom</span>
                            <span className="text-[10px] font-normal opacity-80">1 dia</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRateCard('easy')}
                            className="py-3 px-4 rounded-md bg-[#EDF6F0] dark:bg-[#15261D] text-[#3D7A5A] dark:text-[#52A078] font-semibold text-xs sm:text-sm hover:brightness-95 transition-all cursor-pointer font-org flex flex-col items-center gap-0.5"
                          >
                            <span>Fácil</span>
                            <span className="text-[10px] font-normal opacity-80">4 dias</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-md p-8 rounded-lg bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 shadow-lg text-center space-y-4 animate-entra">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#EDF6F0] dark:bg-[#15261D] text-[#3D7A5A] dark:text-[#52A078] flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                        Revisão Concluída!
                      </h3>
                      <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-org">
                        Todos os {flashcards.length} cards revisados com recuperação ativa.
                      </p>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D9DCE1] dark:border-zinc-800 text-xs font-org">
                        <div>
                          <span className="text-[#3D7A5A] font-bold block text-lg">
                            {Object.values(cardScores).filter((s) => s === 'easy').length}
                          </span>
                          <span className="text-[#5B5F66] text-[11px]">Fácil</span>
                        </div>
                        <div>
                          <span className="text-[#2B4F7E] font-bold block text-lg">
                            {Object.values(cardScores).filter((s) => s === 'good').length}
                          </span>
                          <span className="text-[#5B5F66] text-[11px]">Bom</span>
                        </div>
                        <div>
                          <span className="text-[#A8322D] font-bold block text-lg">
                            {Object.values(cardScores).filter((s) => s === 'hard').length}
                          </span>
                          <span className="text-[#5B5F66] text-[11px]">Errei</span>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center pt-2">
                        <button
                          type="button"
                          onClick={handleRestartAnki}
                          className="px-4 py-2 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 font-org"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Revisar Novamente
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] rounded-md transition-colors cursor-pointer shadow-xs font-org"
                        >
                          Voltar à Biblioteca
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =========================================
                  PDF / APOSTILA (Artéria #A8322D / #FBEFEE)
                 ========================================= */}
              {item.tipo === 'PDF' && (
                <div className="space-y-6">
                  <div
                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                    className="w-full bg-white dark:bg-[#1E1E22] rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-md p-8 sm:p-12 transition-transform duration-150"
                  >
                    <div className="pb-4 mb-6 border-b border-[#D9DCE1] dark:border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] uppercase tracking-widest block mb-0.5 font-org">
                          Apostila Médica · Página {currentPage + 1} de {pdfPages.length}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {pdfPages[currentPage]?.title || item.titulo}
                        </h2>
                      </div>
                      <span className="text-xs text-[#5B5F66] font-org tabular-nums">
                        Documento oficial
                      </span>
                    </div>

                    <div className="texto-apostila text-[#1D1D1F] dark:text-[#F5F5F7] space-y-4">
                      {pdfPages[currentPage]?.text}
                    </div>
                  </div>

                  {pdfPages.length > 1 && (
                    <div className="flex items-center justify-between bg-white dark:bg-[#1E1E22] p-2.5 rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-2xs font-org">
                      <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={handlePrevPage}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Página Anterior
                      </button>

                      <span className="text-xs text-[#5B5F66] tabular-nums">
                        Página {currentPage + 1} de {pdfPages.length}
                      </span>

                      <button
                        type="button"
                        disabled={currentPage === pdfPages.length - 1}
                        onClick={handleNextPage}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                      >
                        Próxima Página <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* =========================================
                  SLIDES (Professora #C2410C / #FFF3EB)
                 ========================================= */}
              {item.tipo === 'Slides' && (
                <div className="space-y-6">
                  <div className="w-full aspect-[16/9] min-h-[360px] bg-white dark:bg-[#1E1E22] rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-md p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C2410C]" />

                    <div>
                      <div className="flex items-center justify-between text-xs text-[#C2410C] dark:text-[#EA642C] font-semibold mb-4 font-org">
                        <span>Apresentação de Aula</span>
                        <span className="tabular-nums">Lâmina {currentPage + 1} de {slides.length}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">
                        {slides[currentPage]?.title}
                      </h2>

                      <ul className="space-y-2.5 font-ler text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {slides[currentPage]?.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] shrink-0 mt-2.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {slides[currentPage]?.notes && (
                      <div className="mt-4 p-3 bg-[#FFF3EB] dark:bg-[#2C1E14] rounded-md text-xs text-[#C2410C] dark:text-[#EA642C] font-org">
                        <strong>Fala da professora:</strong> {slides[currentPage].notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between bg-white dark:bg-[#1E1E22] p-2.5 rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-2xs font-org">
                    <button
                      type="button"
                      disabled={currentPage === 0}
                      onClick={handlePrevPage}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Slide Anterior (←)
                    </button>

                    <div className="flex items-center gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentPage(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            i === currentPage
                              ? 'w-5 bg-[#C2410C]'
                              : 'bg-zinc-300 dark:bg-zinc-700'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage === slides.length - 1}
                      onClick={handleNextPage}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                    >
                      Próximo Slide (→) <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================
                  PLANILHAS (Tabelas do Brand Book)
                 ========================================= */}
              {item.tipo === 'Planilha' && (
                <div className="bg-white dark:bg-[#1E1E22] rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-md p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9DCE1] dark:border-zinc-800">
                    <div>
                      <h2 className="text-lg font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.titulo}
                      </h2>
                      <p className="text-xs text-[#5B5F66] font-org">
                        Título da tabela em Inter Semibold 8 pt; cabeçalho com fio escuro de 0,9 pt.
                      </p>
                    </div>

                    <input
                      type="search"
                      placeholder="Filtrar dados..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-[#F4F5F7] dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-[#5B5F66] w-full sm:w-64"
                    />
                  </div>

                  {item.tabelaColunas && item.tabelaLinhas ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-org">
                        <thead>
                          <tr className="border-b border-[#1D1D1F] dark:border-zinc-300 text-[#1D1D1F] dark:text-[#F5F5F7]">
                            {item.tabelaColunas.map((col, idx) => (
                              <th
                                key={col}
                                className={`py-2 px-3 font-semibold ${
                                  idx === 0 ? 'w-1/3' : ''
                                }`}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D9DCE1] dark:divide-zinc-800 font-ler">
                          {item.tabelaLinhas
                            .filter((row) =>
                              tableSearch
                                ? Object.values(row).some((val) =>
                                    String(val).toLowerCase().includes(tableSearch.toLowerCase())
                                  )
                                : true
                            )
                            .map((row, idx) => (
                              <tr
                                key={idx}
                                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
                              >
                                {item.tabelaColunas!.map((col, cIdx) => (
                                  <td
                                    key={col}
                                    className={`py-2 px-3 text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums ${
                                      cIdx === 0 ? 'font-semibold font-org' : ''
                                    }`}
                                  >
                                    {String(row[col] ?? '')}
                                  </td>
                                ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              )}

              {/* =========================================
                  WORD (Livro-texto / #F6F2EA)
                 ========================================= */}
              {item.tipo === 'Word' && (
                <div className="bg-white dark:bg-[#1E1E22] rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-md p-8 sm:p-12 space-y-6">
                  <div className="pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
                    <span className="text-[11px] font-semibold text-[#6B5A3E] dark:text-[#D2BEA0] uppercase tracking-widest block mb-0.5 font-org">
                      Livro-Texto Clínico
                    </span>
                    <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {item.titulo}
                    </h2>
                  </div>

                  <div className="texto-apostila text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-pre-wrap">
                    {item.docText || item.descricao}
                  </div>
                </div>
              )}

              {/* =========================================
                  SITE INTERATIVO (Veia / #EEF3F9)
                 ========================================= */}
              {item.tipo === 'Site' && (
                <div className="bg-white dark:bg-[#1E1E22] rounded-lg border border-[#D9DCE1] dark:border-zinc-800 shadow-md p-6 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
                    <div>
                      <span className="text-[11px] font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] uppercase tracking-wider block font-org">
                        Módulo Interativo Web
                      </span>
                      <h2 className="text-xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.titulo}
                      </h2>
                    </div>
                  </div>

                  <div
                    className="prose dark:prose-invert max-w-none text-[#1D1D1F] dark:text-[#F5F5F7]"
                    dangerouslySetInnerHTML={{
                      __html: item.conteudoHtml || `<p>${item.descricao || 'Conteúdo do site interativo.'}</p>`
                    }}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Botão Fixo de Retorno (.bib-volta) estilizado com o azul veia #2B4F7E */}
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'fixed',
          left: '24px',
          bottom: '24px',
          zIndex: 2147483647,
          font: '600 14px/1 Inter, Arial, sans-serif',
          color: '#fff',
          backgroundColor: '#2B4F7E',
          border: '2px solid #fff',
          borderRadius: '12px',
          padding: '12px 18px',
          boxShadow: '0 6px 16px rgba(0,0,0,.25)',
          cursor: 'pointer',
          transition: 'transform 0.15s',
        }}
        className="hover:scale-105 active:scale-95 flex items-center gap-2 select-none"
      >
        <span>← Fechar Estudo e Voltar</span>
      </button>

    </div>
  );
};
