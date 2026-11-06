import React, { useState, useEffect, useMemo } from 'react';
import { StudyItem, LibraryData, StudyType, UserAccount } from './types/library';
import {
  getStoredLibrary,
  saveLibrary,
  getCurrentUser,
  setCurrentUser,
  getStoredTheme,
  setStoredTheme,
  cleanPath
} from './utils/storage';
import { INITIAL_LIBRARY_DATA } from './data/initialData';
import { Header, AppViewMode } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { StudyCard, FolderCard } from './components/StudyCard';
import { ContextMenu, ContextMenuTarget } from './components/Modals/ContextMenu';
import { NewFolderModal } from './components/Modals/NewFolderModal';
import { MoveRenameModal } from './components/Modals/MoveRenameModal';
import { AddStudyModal } from './components/Modals/AddStudyModal';
import { StudyViewerModal } from './components/Viewers/StudyViewerModal';
import { ApostilaChapterView } from './components/Viewers/ApostilaChapterView';
import { BrandBookGuide } from './components/BrandBookGuide';
import { HomePage } from './components/HomePage';
import {
  Search,
  Plus,
  FolderPlus,
  Download,
  FolderOpen,
  AlertCircle,
  X,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserAccount>(() => getCurrentUser());
  const [library, setLibrary] = useState<LibraryData>(() => getStoredLibrary());
  const [currentMode, setCurrentMode] = useState<AppViewMode>('home');
  const [pastaAtual, setPastaAtual] = useState<string>(
    () => sessionStorage.getItem('bib_pastaAtual') || ''
  );
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StudyType | 'ALL'>('ALL');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [moveRenameTarget, setMoveRenameTarget] = useState<{
    path: string;
    type: 'item' | 'pasta';
  } | null>(null);
  const [contextMenuTarget, setContextMenuTarget] = useState<ContextMenuTarget | null>(null);
  const [viewingItem, setViewingItem] = useState<StudyItem | null>(null);

  // Status message
  const [statusAlert, setStatusAlert] = useState<{ text: string; isError?: boolean } | null>(null);

  // Drag-and-drop state
  const [draggedObject, setDraggedObject] = useState<{
    path: string;
    type: 'item' | 'pasta';
    item?: StudyItem;
  } | null>(null);

  useEffect(() => {
    setStoredTheme(theme);
  }, [theme]);

  useEffect(() => {
    sessionStorage.setItem('bib_pastaAtual', pastaAtual);
  }, [pastaAtual]);

  useEffect(() => {
    if (statusAlert) {
      const timer = setTimeout(() => setStatusAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusAlert]);

  const showStatus = (text: string, isError = false) => {
    setStatusAlert({ text, isError });
  };

  const handleLogout = () => {
    showStatus('Sessão ativa mantida como Dr. Alexandre Jaider.');
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigateFolder = (path: string) => {
    setPastaAtual(path);
    setSearchQuery('');
  };

  const allFolderPaths = useMemo(() => {
    const set = new Set<string>();
    library.disciplinas.forEach((d) => {
      if (d.nome) set.add(d.nome);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [library]);

  const totalStudiesCount = useMemo(() => {
    return library.disciplinas.reduce((acc, d) => acc + (d.itens?.length || 0), 0);
  }, [library]);

  const norm = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const { currentFiles, subfolders } = useMemo(() => {
    const d = library.disciplinas.find((x) => x.nome === pastaAtual) || { itens: [] };
    let files = d.itens || [];

    if (activeFilter !== 'ALL') {
      files = files.filter((i) => i.tipo === activeFilter);
    }

    const subs = library.disciplinas
      .filter((x) => {
        if (!x.nome || x.nome === pastaAtual) return false;
        if (pastaAtual === '') {
          return !x.nome.includes('/');
        } else {
          return x.nome.startsWith(pastaAtual + '/') && x.nome.lastIndexOf('/') === pastaAtual.length;
        }
      })
      .map((x) => ({
        fullPath: x.nome,
        name: x.nome.split('/').pop() || x.nome,
        itemCount: x.itens?.length || 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return { currentFiles: files, subfolders: subs };
  }, [library, pastaAtual, activeFilter]);

  const searchResults = useMemo(() => {
    const q = norm(searchQuery.trim());
    if (!q) return null;

    const results: { folderName: string; itens: StudyItem[] }[] = [];

    library.disciplinas.forEach((d) => {
      let filtered = (d.itens || []).filter((i) => {
        const text = norm(`${i.titulo} ${d.nome} ${i.tipo} ${i.descricao || ''}`);
        return text.includes(q);
      });

      if (activeFilter !== 'ALL') {
        filtered = filtered.filter((i) => i.tipo === activeFilter);
      }

      if (filtered.length > 0) {
        results.push({
          folderName: d.nome,
          itens: filtered,
        });
      }
    });

    return results;
  }, [library, searchQuery, activeFilter]);

  const handleCreateFolder = (newPath: string) => {
    const clean = cleanPath(newPath);
    if (!clean) return;

    if (library.disciplinas.some((d) => d.nome.toLowerCase() === clean.toLowerCase())) {
      showStatus(`A pasta "${clean}" já existe.`, true);
      return;
    }

    const updated: LibraryData = {
      disciplinas: [
        ...library.disciplinas,
        {
          nome: clean,
          itens: [],
        },
      ].sort((a, b) => a.nome.localeCompare(b.nome)),
    };

    saveLibrary(updated);
    setLibrary(updated);
    setPastaAtual(clean);
    showStatus(`Pasta "${clean}" criada com sucesso.`);
  };

  const handleAddStudy = (
    folder: string,
    newItem: StudyItem,
    replaceIfExists = false
  ): boolean => {
    const targetFolderClean = cleanPath(folder);
    const updatedDisciplinas = [...library.disciplinas];
    let disc = updatedDisciplinas.find((d) => d.nome === targetFolderClean);

    if (!disc) {
      disc = { nome: targetFolderClean, itens: [] };
      updatedDisciplinas.push(disc);
    }

    const existingIndex = disc.itens.findIndex(
      (i) => i.titulo.toLowerCase() === newItem.titulo.toLowerCase()
    );

    if (existingIndex >= 0 && !replaceIfExists) {
      return false;
    }

    if (existingIndex >= 0 && replaceIfExists) {
      disc.itens[existingIndex] = newItem;
    } else {
      disc.itens.push(newItem);
    }

    const updatedLib: LibraryData = {
      disciplinas: updatedDisciplinas.sort((a, b) => a.nome.localeCompare(b.nome)),
    };

    saveLibrary(updatedLib);
    setLibrary(updatedLib);
    showStatus(`"${newItem.titulo}" adicionado com sucesso.`);
    return true;
  };

  const handleDelete = (caminho: string, type: 'item' | 'pasta') => {
    const name = caminho.split('/').pop();
    const isConfirmed = window.confirm(
      `Tem certeza que deseja apagar "${name}" para sempre?\n\nEsta ação não poderá ser desfeita.`
    );
    if (!isConfirmed) return;

    const updatedDisciplinas = [...library.disciplinas];

    if (type === 'pasta') {
      const filtered = updatedDisciplinas.filter(
        (d) => d.nome !== caminho && !d.nome.startsWith(caminho + '/')
      );
      const updatedLib: LibraryData = { disciplinas: filtered };
      saveLibrary(updatedLib);
      setLibrary(updatedLib);

      if (pastaAtual === caminho || pastaAtual.startsWith(caminho + '/')) {
        setPastaAtual('');
      }
      showStatus(`Pasta "${name}" excluída.`);
    } else {
      let found = false;
      for (const d of updatedDisciplinas) {
        const idx = d.itens.findIndex((i) => i.caminho === caminho);
        if (idx >= 0) {
          d.itens.splice(idx, 1);
          found = true;
          break;
        }
      }

      if (found) {
        const updatedLib: LibraryData = { disciplinas: updatedDisciplinas };
        saveLibrary(updatedLib);
        setLibrary(updatedLib);
        showStatus(`Estudo "${name}" excluído.`);
      }
    }
  };

  const handleMoveRename = (origem: string, destinoPasta: string, novoNome: string) => {
    const destClean = cleanPath(destinoPasta);
    const updatedDisciplinas = [...library.disciplinas];
    const isFolder = library.disciplinas.some((d) => d.nome === origem);

    if (isFolder) {
      const newFolderPath = destClean ? `${destClean}/${novoNome}` : novoNome;
      if (updatedDisciplinas.some((d) => d.nome === newFolderPath)) {
        showStatus('Já existe uma pasta com esse nome no destino.', true);
        return;
      }

      updatedDisciplinas.forEach((d) => {
        if (d.nome === origem) {
          d.nome = newFolderPath;
        } else if (d.nome.startsWith(origem + '/')) {
          d.nome = newFolderPath + d.nome.substring(origem.length);
        }
      });

      const updatedLib = { disciplinas: updatedDisciplinas };
      saveLibrary(updatedLib);
      setLibrary(updatedLib);
      if (pastaAtual === origem) setPastaAtual(newFolderPath);
      showStatus(`Pasta alterada para "${novoNome}".`);
    } else {
      let sourceItem: StudyItem | null = null;

      for (const d of updatedDisciplinas) {
        const idx = d.itens.findIndex((i) => i.caminho === origem);
        if (idx >= 0) {
          sourceItem = d.itens.splice(idx, 1)[0];
          break;
        }
      }

      if (!sourceItem) {
        showStatus('Item não encontrado.', true);
        return;
      }

      let targetDisc = updatedDisciplinas.find((d) => d.nome === destClean);
      if (!targetDisc) {
        targetDisc = { nome: destClean, itens: [] };
        updatedDisciplinas.push(targetDisc);
      }

      sourceItem.titulo = novoNome;
      sourceItem.caminho = destClean ? `${destClean}/${novoNome}` : novoNome;
      targetDisc.itens.push(sourceItem);

      const updatedLib = {
        disciplinas: updatedDisciplinas.sort((a, b) => a.nome.localeCompare(b.nome)),
      };
      saveLibrary(updatedLib);
      setLibrary(updatedLib);
      showStatus(`"${novoNome}" salvo com sucesso.`);
    }
  };

  const handleCardDragStart = (e: React.DragEvent, item: StudyItem) => {
    setDraggedObject({ path: item.caminho, type: 'item', item });
    e.dataTransfer.setData('text/plain', item.caminho);
  };

  const handleFolderDragStart = (e: React.DragEvent, folderPath: string) => {
    setDraggedObject({ path: folderPath, type: 'pasta' });
    e.dataTransfer.setData('text/plain', folderPath);
  };

  const handleDropOnFolder = (e: React.DragEvent, targetFolder: string) => {
    e.preventDefault();
    if (!draggedObject) return;

    if (draggedObject.type === 'pasta') {
      if (
        draggedObject.path === targetFolder ||
        targetFolder.startsWith(draggedObject.path + '/')
      ) {
        showStatus('Não é possível mover uma pasta para dentro de si mesma.', true);
        return;
      }
      const folderName = draggedObject.path.split('/').pop() || '';
      handleMoveRename(draggedObject.path, targetFolder, folderName);
    } else if (draggedObject.item) {
      const itemName = draggedObject.item.titulo;
      handleMoveRename(draggedObject.path, targetFolder, itemName);
    }

    setDraggedObject(null);
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(library, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `apostila_estudos_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showStatus('Backup baixado com sucesso.');
  };

  // Find the canonical Chapter 7 data from library
  const chapter7Item = useMemo(() => {
    for (const d of library.disciplinas) {
      const found = d.itens.find((i) => i.id === 'apostila-cap-7');
      if (found?.capituloApostila) return found;
    }
    return INITIAL_LIBRARY_DATA.disciplinas[0].itens[0];
  }, [library]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFC] dark:bg-[#161618] text-[#1D1D1F] dark:text-[#F5F5F7] font-ler selection:bg-[#2B4F7E]/15 transition-colors">
      
      {/* Top Header com os 3 modos de visualização */}
      <Header
        user={user}
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        totalStudiesCount={totalStudiesCount}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        
        {/* Banner Alert */}
        {statusAlert && (
          <div
            className={`flex items-center justify-between p-3 rounded-md text-xs font-org animate-entra ${
              statusAlert.isError
                ? 'bg-[#FBEFEE] dark:bg-[#2D1A19] text-[#A8322D] dark:text-[#D2534D]'
                : 'bg-[#EDF6F0] dark:bg-[#15261D] text-[#3D7A5A] dark:text-[#52A078]'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusAlert.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusAlert(null)}
              className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* =========================================================
            MODO 0: HOME PAGE (Página Inicial com Design do Brand Book)
            Visão Geral, Hero Editorial, Acesso Rápido às Disciplinas
           ========================================================= */}
        {currentMode === 'home' && (
          <HomePage
            library={library}
            onOpenStudy={(item) => setViewingItem(item)}
            onNavigateToMode={(mode) => setCurrentMode(mode)}
            onNavigateFolder={(folder) => handleNavigateFolder(folder)}
          />
        )}

        {/* =========================================================
            MODO 1: APOSTILA MODELO V3.1 (Capítulo 7: Rastreamento HPV)
            Exatamente como nas páginas 4, 5, 6, 7, 8, 9, 10 do Brand Book!
           ========================================================= */}
        {currentMode === 'apostila' && (
          <div className="space-y-6 animate-entra">
            
            {/* Quick Context Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-semibold text-[#5B5F66] dark:text-[#9E9EA4] uppercase tracking-wider font-org block">
                  Apostila de Medicina · Modelo v3.1
                </span>
                <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-org">
                  Visualização em duas colunas, texto corrido protagonista, notas de margem e caixas didáticas.
                </p>
              </div>

              <div className="flex items-center gap-2 font-org">
                <button
                  type="button"
                  onClick={() => setCurrentMode('biblioteca')}
                  className="px-3 py-1.5 text-xs font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] bg-[#EEF3F9] dark:bg-[#192330] hover:bg-[#E2EDF8] rounded-[6px] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ver todas as pastas da biblioteca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* O Capítulo Interativo Oficial do Brand Book */}
            {chapter7Item.capituloApostila && (
              <ApostilaChapterView data={chapter7Item.capituloApostila} />
            )}

          </div>
        )}

        {/* =========================================================
            MODO 2: BIBLIOTECA DE PASTAS & ESTUDOS
            Hierarquia por matérias, drag-and-drop, filtros e busca
           ========================================================= */}
        {currentMode === 'biblioteca' && (
          <div className="space-y-6 animate-entra">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase tracking-wider block mb-1">
                  Organização Curricular
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-org tracking-[-0.022em] text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Biblioteca de Estudos
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-2 font-org">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] rounded-[6px] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar estudo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNewFolderOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] bg-[#EEF3F9] dark:bg-[#192330] hover:bg-[#E2EDF8] dark:hover:bg-[#203144] rounded-[6px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Nova Pasta</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] bg-[#F4F5F7] dark:bg-zinc-800 hover:bg-[#E8EAEE] rounded-[6px] transition-colors cursor-pointer whitespace-nowrap"
                  title="Exportar backup"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup</span>
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-[#5B5F66] absolute left-3 top-2.5" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque em todas as pastas e disciplinas..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm font-org bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 rounded-[6px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-[#5B5F66] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Breadcrumbs */}
            {!searchQuery && (
              <Breadcrumbs currentPath={pastaAtual} onNavigate={handleNavigateFolder} />
            )}

            {/* Grid de Pastas e Estudos */}
            {searchQuery ? (
              /* Resultados da busca */
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-[#5B5F66] font-org border-b border-[#D9DCE1] dark:border-zinc-800 pb-2">
                  <span>
                    Resultados da busca por: <strong>"{searchQuery}"</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[#2B4F7E] dark:text-[#4A7AB5] hover:underline"
                  >
                    Limpar busca
                  </button>
                </div>

                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((sec) => (
                    <section key={sec.folderName} className="space-y-3">
                      <div className="flex items-baseline gap-2 border-b border-[#D9DCE1] dark:border-zinc-800 pb-1">
                        <h2 className="text-sm font-semibold font-org text-[#2B4F7E] dark:text-[#4A7AB5] flex items-center gap-1.5">
                          <FolderOpen className="w-4 h-4" />
                          {sec.folderName === '' ? 'Raiz da Biblioteca' : sec.folderName}
                        </h2>
                        <span className="text-xs text-[#5B5F66] font-org tabular-nums">
                          {sec.itens.length} {sec.itens.length === 1 ? 'estudo' : 'estudos'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {sec.itens.map((item, idx) => (
                          <StudyCard
                            key={item.id}
                            item={item}
                            index={idx}
                            onOpen={(it) => setViewingItem(it)}
                            onOptions={(e, it) =>
                              setContextMenuTarget({
                                type: 'item',
                                caminho: it.caminho,
                                titulo: it.titulo,
                                x: e.clientX,
                                y: e.clientY,
                              })
                            }
                            onDragStart={handleCardDragStart}
                          />
                        ))}
                      </div>
                    </section>
                  ))
                ) : (
                  <div className="p-8 rounded-[6px] bg-[#F4F5F7] dark:bg-[#202124] text-center space-y-1">
                    <p className="text-sm text-[#1D1D1F] dark:text-[#F5F5F7] font-org">
                      Nada encontrado para <strong>"{searchQuery}"</strong>.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Visualização da Pasta Atual */
              <div className="space-y-6">
                {subfolders.length === 0 && currentFiles.length === 0 ? (
                  <div className="p-8 sm:p-12 rounded-[6px] bg-[#F4F5F7]/80 dark:bg-[#202124]/60 text-center space-y-3">
                    <div className="w-10 h-10 mx-auto rounded-[6px] bg-[#EEF3F9] dark:bg-[#192330] text-[#2B4F7E] dark:text-[#4A7AB5] flex items-center justify-center">
                      <FolderPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                        Esta pasta está vazia
                      </h3>
                      <p className="text-xs text-[#5B5F66] font-org mt-1 max-w-sm mx-auto">
                        Clique em <strong>Adicionar estudo</strong> para enviar arquivos.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {/* Subpastas */}
                    {subfolders.map((sf, idx) => (
                      <FolderCard
                        key={sf.fullPath}
                        name={sf.name}
                        fullPath={sf.fullPath}
                        itemCount={sf.itemCount}
                        index={idx}
                        onOpen={handleNavigateFolder}
                        onOptions={(e, path) =>
                          setContextMenuTarget({
                            type: 'pasta',
                            caminho: path,
                            titulo: sf.name,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onDragStart={handleFolderDragStart}
                        onDropOnFolder={handleDropOnFolder}
                      />
                    ))}

                    {/* Estudos da pasta */}
                    {currentFiles.map((item, idx) => (
                      <StudyCard
                        key={item.id}
                        item={item}
                        index={subfolders.length + idx}
                        onOpen={(it) => setViewingItem(it)}
                        onOptions={(e, it) =>
                          setContextMenuTarget({
                            type: 'item',
                            caminho: it.caminho,
                            titulo: it.titulo,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onDragStart={handleCardDragStart}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* =========================================================
            MODO 3: BRAND BOOK & GUIA VISUAL
            Cores, caixas didáticas, tipografia e regras de acabamento
           ========================================================= */}
        {currentMode === 'brandbook' && (
          <BrandBookGuide />
        )}

      </main>

      {/* Floating Context Menu */}
      <ContextMenu
        target={contextMenuTarget}
        onClose={() => setContextMenuTarget(null)}
        onOpen={(caminho, type) => {
          if (type === 'pasta') {
            handleNavigateFolder(caminho);
          } else {
            const found = library.disciplinas
              .flatMap((d) => d.itens)
              .find((i) => i.caminho === caminho);
            if (found) setViewingItem(found);
          }
        }}
        onMoveRename={(caminho, type) => {
          setMoveRenameTarget({ path: caminho, type });
        }}
        onDelete={(caminho, type) => {
          handleDelete(caminho, type);
        }}
      />

      {/* Modals */}
      <AddStudyModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        currentFolder={pastaAtual}
        allFolderPaths={allFolderPaths}
        onAddStudy={handleAddStudy}
      />

      <NewFolderModal
        isOpen={isNewFolderOpen}
        onClose={() => setIsNewFolderOpen(false)}
        currentPath={pastaAtual}
        allFolderPaths={allFolderPaths}
        onCreateFolder={handleCreateFolder}
      />

      <MoveRenameModal
        isOpen={Boolean(moveRenameTarget)}
        onClose={() => setMoveRenameTarget(null)}
        targetPath={moveRenameTarget?.path || ''}
        targetType={moveRenameTarget?.type || 'item'}
        allFolderPaths={allFolderPaths}
        onSave={handleMoveRename}
      />

      {/* Study Viewer Modal */}
      <StudyViewerModal
        item={viewingItem}
        onClose={() => setViewingItem(null)}
      />

    </div>
  );
}
