import React, { useState, useRef } from 'react';
import { StudyItem, StudyType } from '../../types/library';
import { X, Upload, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

interface AddStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFolder: string;
  allFolderPaths: string[];
  onAddStudy: (folder: string, item: StudyItem, replaceIfExists?: boolean) => boolean;
}

export const AddStudyModal: React.FC<AddStudyModalProps> = ({
  isOpen,
  onClose,
  currentFolder,
  allFolderPaths,
  onAddStudy,
}) => {
  const [targetFolder, setTargetFolder] = useState(currentFolder);
  const [title, setTitle] = useState('');
  const [studyType, setStudyType] = useState<StudyType>('PDF');
  const [description, setDescription] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [error, setError] = useState('');
  const [conflictPrompt, setConflictPrompt] = useState(false);
  const [stagedItem, setStagedItem] = useState<StudyItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTargetFolder(currentFolder);
      setError('');
      setConflictPrompt(false);
      setStagedItem(null);
    }
  }, [isOpen, currentFolder]);

  if (!isOpen) return null;

  const detectTypeFromExtension = (filename: string): StudyType => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'PDF';
      case 'pptx':
      case 'ppt':
        return 'Slides';
      case 'docx':
      case 'doc':
        return 'Word';
      case 'xlsx':
      case 'xls':
      case 'csv':
        return 'Planilha';
      case 'apkg':
        return 'Anki';
      case 'html':
      case 'zip':
        return 'Site';
      default:
        return 'PDF';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const detected = detectTypeFromExtension(file.name);
    const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    
    setSelectedFileName(file.name);
    setSelectedFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
    setTitle(rawName);
    setStudyType(detected);
    setError('');

    if (file.type.includes('text') || file.name.endsWith('.html') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setContentBody(evt.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const detected = detectTypeFromExtension(file.name);
      const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      
      setSelectedFileName(file.name);
      setSelectedFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
      setTitle(rawName);
      setStudyType(detected);
      setError('');
    }
  };

  const buildItem = (): StudyItem => {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const item: StudyItem = {
      id: 'study_' + Math.random().toString(36).substring(2, 9),
      titulo: title.trim(),
      tipo: studyType,
      caminho: targetFolder ? `${targetFolder}/${title.trim()}` : title.trim(),
      data: today,
      tamanho: selectedFileSize || '1.8 MB',
      descricao: description.trim() || `Material de estudo médico sobre ${title.trim()}`,
    };

    if (studyType === 'Anki') {
      item.flashcards = [
        {
          id: '1',
          front: `Conceito fundamental: ${title.trim()}`,
          back: contentBody.trim() || 'Definição essencial e raciocínio fisiopatológico.',
          notes: 'Flashcard adicionado ao deck de repetição espaçada.'
        },
        {
          id: '2',
          front: `Correlação clínica e conduta diagnóstica em ${title.trim()}`,
          back: 'Avaliar estabilidade, solicitar exames direcionados e instituir terapêutica precoce.',
          notes: 'Revisão ativa.'
        }
      ];
    } else if (studyType === 'PDF') {
      item.pdfPages = [
        {
          page: 1,
          title: title.trim(),
          text: contentBody.trim() || 'Documento clínico importado para a biblioteca de estudos.\n\nConteúdo disponível para leitura e estudo no leitor interativo.'
        }
      ];
    } else if (studyType === 'Slides') {
      item.slides = [
        {
          title: title.trim(),
          bullets: [
            'Visão geral da aula e conceitos centrais',
            'Fisiopatologia e correlações clínicas aplicadas',
            'Pontos de prova e conclusões terapêuticas'
          ],
          notes: contentBody.trim() || 'Destaques da professora.'
        }
      ];
    } else if (studyType === 'Word') {
      item.docText = contentBody.trim() || `LIVRO-TEXTO / RESUMO CLÍNICO: ${title.toUpperCase()}\n\n1. Definição e Conceito-Chave\n2. Fisiopatologia e Mecanismos\n3. Manifestações Clínicas e Exame Físico\n4. Diagnóstico e Conduta`;
    } else if (studyType === 'Planilha') {
      item.tabelaColunas = ['Parâmetro', 'Valor / Referência', 'Unidade', 'Interpretação'];
      item.tabelaLinhas = [
        { 'Parâmetro': title.trim(), 'Valor / Referência': 'Dentro do padrão', 'Unidade': 'mg/dL', 'Interpretação': 'Fisiológico' }
      ];
    } else if (studyType === 'Site') {
      item.conteudoHtml = `<div class="p-6 space-y-4"><h3 class="text-xl font-bold">${title}</h3><p>${contentBody || 'Módulo interativo de aprendizado prático.'}</p></div>`;
    }

    return item;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Informe o título do estudo.');
      return;
    }

    const item = buildItem();
    const success = onAddStudy(targetFolder, item, false);

    if (!success) {
      setStagedItem(item);
      setConflictPrompt(true);
      return;
    }

    onClose();
  };

  const handleConfirmReplace = () => {
    if (stagedItem) {
      onAddStudy(targetFolder, stagedItem, true);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-2xs font-org overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-[#1E1E22] rounded-lg shadow-xl border border-[#D9DCE1] dark:border-zinc-800 p-6 animate-entra my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9DCE1] dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#EEF3F9] dark:bg-[#192330] text-[#2B4F7E] dark:text-[#4A7AB5] rounded-md">
              <Plus className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Adicionar Estudo
              </h2>
              <p className="text-[11px] text-[#5B5F66] dark:text-[#9E9EA4]">
                Adicione arquivos ZIP, PDF, Slides, Word, Planilhas ou Anki APKG
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

        {/* Conflict Prompt */}
        {conflictPrompt ? (
          <div className="my-5 p-4 rounded-md bg-[#FBF4DC] dark:bg-[#2D2615] border border-[#D9DCE1] dark:border-zinc-700 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 text-[#9A7609] dark:text-[#C8A02A] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-[#9A7609] dark:text-[#C8A02A]">
                  Estudo já existente
                </h3>
                <p className="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] mt-1">
                  Já existe um estudo com o nome <strong>"{title}"</strong> nesta pasta. Deseja substituir o arquivo existente?
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConflictPrompt(false)}
                className="px-3 py-1.5 text-xs font-semibold text-[#5B5F66] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReplace}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#9A7609] hover:bg-[#856507] rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Substituir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* File Drag & Drop or Selection Box */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[#D9DCE1] dark:border-zinc-700 hover:border-[#2B4F7E] dark:hover:border-[#4A7AB5] rounded-md p-4 text-center cursor-pointer transition-colors bg-[#F4F5F7]/50 dark:bg-zinc-800/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.pptx,.ppt,.docx,.doc,.xlsx,.xls,.apkg,.zip,.html,.txt"
                onChange={handleFileSelect}
              />
              <Upload className="w-5 h-5 mx-auto text-[#2B4F7E] dark:text-[#4A7AB5] mb-1.5 opacity-80" />
              {selectedFileName ? (
                <div className="text-xs">
                  <span className="font-semibold text-[#3D7A5A] dark:text-[#52A078] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {selectedFileName}
                  </span>
                  <span className="text-[#5B5F66] text-[11px] mt-0.5 block">{selectedFileSize} · Clique para trocar</span>
                </div>
              ) : (
                <div className="text-xs text-[#5B5F66] dark:text-[#9E9EA4]">
                  <span className="font-semibold text-[#2B4F7E] dark:text-[#4A7AB5]">
                    Clique para escolher um arquivo
                  </span>{' '}
                  ou arraste para cá
                  <p className="text-[11px] text-[#5B5F66] mt-0.5">PDF, PPTX, DOCX, XLSX, APKG ou ZIP</p>
                </div>
              )}
            </div>

            {/* Target Folder */}
            <div>
              <label htmlFor="targetFolderInput" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                Salvar na Pasta (deixe em branco para raiz)
              </label>
              <input
                id="targetFolderInput"
                type="text"
                list="foldersDataList"
                value={targetFolder}
                onChange={(e) => setTargetFolder(e.target.value)}
                placeholder="Em branco: salvo na raiz da biblioteca"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
              />
              <datalist id="foldersDataList">
                <option value="">Raiz da Biblioteca</option>
                {allFolderPaths.filter(Boolean).map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </div>

            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label htmlFor="studyTitle" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Título do Estudo
                </label>
                <input
                  id="studyTitle"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Fisiologia Renal e Homeostase"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="studyTypeSelect" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Tipo / Família
                </label>
                <select
                  id="studyTypeSelect"
                  value={studyType}
                  onChange={(e) => setStudyType(e.target.value as StudyType)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors cursor-pointer"
                >
                  <option value="PDF">Apostila / PDF</option>
                  <option value="Anki">Flashcards Anki</option>
                  <option value="Slides">Slides de Aula</option>
                  <option value="Word">Livro / Resumo</option>
                  <option value="Planilha">Planilha / Tabela</option>
                  <option value="Site">Módulo Interativo</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="studyDesc" className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                Descrição ou Notas Clínicas (opcional)
              </label>
              <textarea
                id="studyDesc"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve resumo dos tópicos abordados..."
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-[#A8322D] dark:text-[#D2534D] bg-[#FBEFEE] dark:bg-[#2D1A19] p-2 rounded-md">
                {error}
              </p>
            )}

            {/* Footer buttons */}
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
                Adicionar Estudo
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
