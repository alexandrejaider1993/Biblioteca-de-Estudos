export type StudyType = 'Site' | 'PDF' | 'Slides' | 'Word' | 'Planilha' | 'Anki';

export interface DidacticBox {
  tipo:
    | 'conceito'
    | 'clinica'
    | 'prova'
    | 'sintese'
    | 'professora'
    | 'livro'
    | 'atencao'
    | 'caiu-em-prova';
  titulo?: string;
  rotulo?: string;
  conteudo: string;
  enfaseForte?: boolean;
  citacao?: string;
  contexto?: string;
}

export interface MarginNote {
  titulo: string;
  texto: string;
  tipo?: 'padrao' | 'livro';
}

export interface ChapterSection {
  numero: string; // e.g. "7.1"
  titulo: string;
  paragrafos: string[];
  notaMargem?: MarginNote;
  caixas?: DidacticBox[];
}

export interface CornellItem {
  pista: string;
  anotacao: string;
}

export interface TestQuestion {
  id: number;
  enunciado: string;
  alternativas: { letra: string; texto: string }[];
  correta: string;
  explicacao: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  notes?: string;
  difficulty?: 'easy' | 'good' | 'hard';
}

export interface SlideContent {
  title: string;
  bullets: string[];
  notes?: string;
  diagramTitle?: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface StudyChapterData {
  numeroCapitulo: number;
  tituloCapitulo: string;
  aulaOrigem?: string;
  provasAntigas?: string;
  subtopicos: { numero: string; titulo: string }[];
  secoes: ChapterSection[];
  topicosRevisao?: { numero: number; titulo: string; fraseResumo: string; explicacao: string }[];
  cornell?: {
    itens: CornellItem[];
    resumoFinal: string;
  };
  quadroComparativo?: {
    colunas: string[];
    linhas: { [key: string]: string }[];
  };
  testeVoce?: {
    titulo: string;
    questoes: TestQuestion[];
  };
}

export interface StudyItem {
  id: string;
  titulo: string;
  tipo: StudyType;
  caminho: string;
  data: string;
  descricao?: string;
  tamanho?: string;
  capituloApostila?: StudyChapterData;
  conteudoHtml?: string;
  pdfPages?: { page: number; title: string; text: string }[];
  slides?: SlideContent[];
  flashcards?: Flashcard[];
  tabelaColunas?: string[];
  tabelaLinhas?: TableRow[];
  docText?: string;
}

export interface DisciplineFolder {
  nome: string;
  itens: StudyItem[];
}

export interface LibraryData {
  disciplinas: DisciplineFolder[];
}

export interface UserAccount {
  nome: string;
  senhaHash: string;
  email?: string;
  dataCriacao: string;
}
