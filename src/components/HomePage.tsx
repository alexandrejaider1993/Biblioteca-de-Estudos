import React from 'react';
import { StudyItem, LibraryData } from '../types/library';
import {
  BookOpen,
  Folder,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  FileText,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  ChevronRight,
  BookmarkCheck,
  Stethoscope
} from 'lucide-react';

interface HomePageProps {
  library: LibraryData;
  onOpenStudy: (item: StudyItem) => void;
  onNavigateToMode: (mode: 'apostila' | 'biblioteca' | 'brandbook') => void;
  onNavigateFolder: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  library,
  onOpenStudy,
  onNavigateToMode,
  onNavigateFolder,
}) => {
  // Find Chapter 7
  const chapter7 = React.useMemo(() => {
    for (const d of library.disciplinas) {
      const found = d.itens.find((i) => i.id === 'apostila-cap-7');
      if (found) return found;
    }
    return library.disciplinas[0]?.itens[0] || null;
  }, [library]);

  // Aggregate stats
  const totalDisciplinas = library.disciplinas.length;
  const totalEstudos = library.disciplinas.reduce((acc, d) => acc + (d.itens?.length || 0), 0);

  // Recent / Featured materials
  const recentStudies = React.useMemo(() => {
    const all: { item: StudyItem; folder: string }[] = [];
    library.disciplinas.forEach((d) => {
      (d.itens || []).forEach((item) => {
        all.push({ item, folder: d.nome });
      });
    });
    return all.slice(0, 4);
  }, [library]);

  // Core disciplines cards
  const disciplinesOverview = [
    {
      nome: 'Ginecologia & Obstetrícia',
      pasta: 'Ginecologia e Obstetrícia',
      foco: 'Rastreamento de Ca Colo de Útero, Pré-Natal de Alto Risco, DHEG',
      cor: '#2B4F7E',
      corBg: '#EEF3F9',
      darkBg: '#192330',
      tag: 'Capítulo 7 Ativo',
      count: library.disciplinas.find((d) => d.nome.includes('Ginecologia'))?.itens.length || 3,
    },
    {
      nome: 'Cardiologia & Emergência',
      pasta: 'Cardiologia',
      foco: 'Interpretação do ECG em 12 derivações, Síndromes Coronarianas, ACLS',
      cor: '#A8322D',
      corBg: '#FBEFEE',
      darkBg: '#2D1A19',
      tag: 'Alta Frequência',
      count: 2,
    },
    {
      nome: 'Cirurgia Geral & Trauma',
      pasta: 'Cirurgia Geral',
      foco: 'Protocolo ATLS 10ª ed., Abdome Agudo Obstrutivo vs Inflamatório',
      cor: '#9A7609',
      corBg: '#FAF4E7',
      darkBg: '#2B2312',
      tag: 'Condutas Práticas',
      count: 2,
    },
    {
      nome: 'Pediatria & Neonatologia',
      pasta: 'Pediatria',
      foco: 'Reanimação Neonatal em Sala de Parto, Marcos do Desenvolvimento PBE',
      cor: '#3D7A5A',
      corBg: '#EDF6F0',
      darkBg: '#15261D',
      tag: 'Diretrizes SBP',
      count: 1,
    },
  ];

  const seisCores = [
    {
      funcao: 'Atenção e Estrutura',
      nome: 'Azul clássico',
      hex: '#2B4F7E',
      bgLight: '#EEF3F9',
      desc: 'Conceitos fundamentais, definições-chave e ancoragem estrutural.',
    },
    {
      funcao: 'Urgência e Risco',
      nome: 'Terracota',
      hex: '#A8322D',
      bgLight: '#FBEFEE',
      desc: 'Contraindicações absolutas, sinais de gravidade e erros que reprovam.',
    },
    {
      funcao: 'Conduta e Algoritmo',
      nome: 'Âmbar fechado',
      hex: '#9A7609',
      bgLight: '#FAF4E7',
      desc: 'Passo a passo terapêutico, intervalos de rastreio e critérios de biópsia.',
    },
    {
      funcao: 'Fisiopatologia',
      nome: 'Verde sábia',
      hex: '#3D7A5A',
      bgLight: '#EDF6F0',
      desc: 'Mecanismo biológico, histologia e carcinogênese.',
    },
    {
      funcao: 'Revisão Ativa',
      nome: 'Púrpura',
      hex: '#5B4B8A',
      bgLight: '#F4F0F9',
      desc: 'Mnemônicos mnemônicos comprovados, resumos em 30 segundos.',
    },
    {
      funcao: 'Caiu em Prova',
      nome: 'Laranja queimado',
      hex: '#C2410C',
      bgLight: '#FDF2ED',
      desc: 'Pegadinhas recorrentes do ENARE, Revalida, USP e SMS-SP.',
    },
  ];

  return (
    <div className="space-y-12 animate-entra max-w-[1240px] mx-auto py-2">
      
      {/* 1. HERO EDITORIAL COM DESIGN BRAND BOOK */}
      <section className="relative rounded-[8px] bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 p-6 sm:p-10 shadow-2xs overflow-hidden">
        {/* Subtle decorative geometric background accents (pure CSS, no AI slop) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B4F7E]/5 dark:bg-[#4A7AB5]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-org text-[#5B5F66] dark:text-[#9E9EA4]">
            <span className="font-semibold text-[#2B4F7E] dark:text-[#90B5E0] uppercase tracking-wider">
              Portal Acadêmico
            </span>
            <span aria-hidden="true">·</span>
            <span>Dr. Alexandre Jaider</span>
            <span aria-hidden="true">·</span>
            <span>Modelo v3.1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-[-0.025em] leading-[1.15]">
            Excelência médica através de leitura atenta e rigor metodológico.
          </h1>

          <p className="text-base sm:text-lg font-ler text-[#5B5F66] dark:text-[#9E9EA4] leading-relaxed max-w-2xl">
            Apostilas didáticas com layout em duas colunas, notas de margem no formato Cornell, categorização cromática por função cognitiva e biblioteca integrada de evidências.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3 font-org">
            <button
              type="button"
              onClick={() => onNavigateToMode('apostila')}
              className="px-4 py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] transition-colors flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>Estudar Capítulo 7 (Apostila Modelo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateToMode('biblioteca')}
              className="px-4 py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold text-[#2B4F7E] dark:text-[#90B5E0] bg-[#EEF3F9] dark:bg-[#192330] hover:bg-[#E2EDF8] dark:hover:bg-[#223347] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Folder className="w-4 h-4" />
              <span>Navegar na Biblioteca ({totalEstudos} estudos)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToMode('brandbook')}
              className="px-3.5 py-2.5 rounded-[6px] text-xs sm:text-sm font-medium text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Regras do Brand Book</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Strip no rodapé da caixa */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-[#D9DCE1] dark:border-zinc-800 font-org">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4] block">
              Disciplinas
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">
              {totalDisciplinas}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4] block">
              Materiais Ativos
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">
              {totalEstudos}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4] block">
              Padrão Editorial
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#2B4F7E] dark:text-[#90B5E0]">
              v3.1 Oficial
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4] block">
              Revisão Ativa
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#3D7A5A] dark:text-[#52A078] flex items-center gap-1">
              Cornell <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
        </div>
      </section>

      {/* 2. DESTAQUE DO CAPÍTULO PRINCIPAL (PÁG 4 DO BRAND BOOK) */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase tracking-wider block">
              Apostila Ativa em Andamento
            </span>
            <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              Capítulo 7: Rastreamento: citologia e DNA-HPV
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToMode('apostila')}
            className="text-xs font-semibold text-[#2B4F7E] dark:text-[#90B5E0] hover:underline flex items-center gap-1 font-org cursor-pointer"
          >
            <span>Ver leitura completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-[8px] bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800">
          {/* Coluna 1: Visão do Estudo */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-org text-[#5B5F66]">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#EEF3F9] dark:bg-[#192330] text-[#2B4F7E] dark:text-[#90B5E0] font-semibold">
                Ginecologia e Obstetrícia
              </span>
              <span>·</span>
              <span>Diretrizes MS 2024 / ASCCP 2019</span>
              <span>·</span>
              <span>18 min de leitura</span>
            </div>

            <p className="text-sm sm:text-base font-ler text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
              O câncer de colo de útero permanece como a terceira neoplasia maligna mais incidente na população feminina brasileira. O rastreamento bem executado identifica as alterações antes da evolução para carcinoma invasor.
            </p>

            {/* Caixa Didática inline de demonstração (Âmbar/Conduta) */}
            <div className="p-3.5 rounded-[6px] bg-[#FAF4E7] dark:bg-[#2B2312] border-none space-y-1">
              <span className="text-xs font-semibold text-[#9A7609] dark:text-[#E5B540] font-org block">
                Conduta imediata · Diretriz Oficial
              </span>
              <p className="text-xs font-ler text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
                Mulher assintomática de 25 a 64 anos com 2 exames citológicos anuais consecutivos normais: o intervalo passa a ser <strong>trienal</strong>. Não realizar colposcopia em citologia com ASC-US na primeira coleta!
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2 font-org">
              <button
                type="button"
                onClick={() => onNavigateToMode('apostila')}
                className="px-4 py-2 rounded-[6px] text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Continuar Leitura</span>
              </button>

              {chapter7 && (
                <button
                  type="button"
                  onClick={() => onOpenStudy(chapter7)}
                  className="px-3 py-2 rounded-[6px] text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir em Janela Focada</span>
                </button>
              )}
            </div>
          </div>

          {/* Coluna 2: Sumário de Recursos do Capítulo */}
          <div className="lg:col-span-4 bg-[#F4F5F7] dark:bg-zinc-800/60 rounded-[6px] p-4 flex flex-col justify-between space-y-3 font-org">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4]">
              Metodologia de Revisão
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <BookmarkCheck className="w-4 h-4 text-[#2B4F7E] dark:text-[#90B5E0] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block">Notas de Margem</strong>
                  <span className="text-[#5B5F66] dark:text-[#9E9EA4]">Conceito de zona de transformação, coilocitose e oncoproteínas E6/E7.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block">Teste Você (4 Questões)</strong>
                  <span className="text-[#5B5F66] dark:text-[#9E9EA4]">Questões autênticas de bancas de residência com gabarito justificado.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3D7A5A] dark:text-[#6BC998] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block">Resumo Cornell</strong>
                  <span className="text-[#5B5F66] dark:text-[#9E9EA4]">Quadro final com síntese de 3 minutos para fixação no dia da prova.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9DCE1] dark:border-zinc-700 text-[11px] text-[#5B5F66]">
              Formatado conforme página 4 a 10 do Brand Book v3.1.
            </div>
          </div>
        </div>
      </section>

      {/* 3. DISCIPLINAS MÉDICAS CURRICULARES */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase tracking-wider block">
            Biblioteca de Conteúdo
          </span>
          <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Disciplinas & Eixos de Estudo
          </h2>
          <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-org mt-1">
            Organização estruturada por matérias com suporte a PDFs, flashcards Anki e links de calculadoras clínicas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {disciplinesOverview.map((d) => (
            <div
              key={d.nome}
              onClick={() => {
                onNavigateFolder(d.pasta);
                onNavigateToMode('biblioteca');
              }}
              className="p-5 rounded-[8px] bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 hover:border-[#2B4F7E] dark:hover:border-[#4A7AB5] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: d.cor }}
                    className="text-[11px] font-bold uppercase tracking-wider font-org"
                  >
                    {d.tag}
                  </span>
                  <span className="text-xs text-[#5B5F66] font-org tabular-nums">
                    {d.count} {d.count === 1 ? 'estudo' : 'estudos'}
                  </span>
                </div>

                <h3 className="text-base font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#2B4F7E] dark:group-hover:text-[#90B5E0] transition-colors">
                  {d.nome}
                </h3>

                <p className="text-xs font-ler text-[#5B5F66] dark:text-[#9E9EA4] leading-relaxed">
                  {d.foco}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D9DCE1]/60 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-[#2B4F7E] dark:text-[#90B5E0] font-org">
                <span>Abrir pasta</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OS 6 CÓDIGOS CROMÁTICOS (PÁGINA 1 E 3 DO BRAND BOOK) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase tracking-wider block">
            Linguagem Visual Cognitiva
          </span>
          <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            As 6 cores da apostila e seus papéis
          </h2>
          <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-org mt-1">
            Cada cor cumpre uma função no aprendizado. As caixas não têm contorno: o fundo sozinho faz o trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {seisCores.map((c) => (
            <div
              key={c.nome}
              style={{ borderLeftColor: c.hex }}
              className="p-4 rounded-[6px] bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: c.hex }}
                  className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                />
                <span className="text-xs font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {c.funcao}
                </span>
                <span className="text-[10px] text-[#5B5F66] font-mono ml-auto">
                  {c.hex}
                </span>
              </div>
              <p className="text-xs font-ler text-[#5B5F66] dark:text-[#9E9EA4] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MATERIAIS RECENTES & ACESSO RÁPIDO */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase tracking-wider block">
              Materiais Prontos para Estudo
            </span>
            <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              Acesso Direto aos Recursos
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToMode('biblioteca')}
            className="text-xs font-semibold text-[#2B4F7E] dark:text-[#90B5E0] hover:underline flex items-center gap-1 font-org cursor-pointer"
          >
            <span>Ver biblioteca completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {recentStudies.map(({ item, folder }) => (
            <div
              key={item.id}
              onClick={() => onOpenStudy(item)}
              className="p-4 rounded-[6px] bg-white dark:bg-[#1E1E22] border border-[#D9DCE1] dark:border-zinc-800 hover:border-[#2B4F7E] dark:hover:border-[#4A7AB5] hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-[#5B5F66] font-org">
                  <span className="font-semibold text-[#2B4F7E] dark:text-[#90B5E0] uppercase truncate">
                    {folder || 'Biblioteca'}
                  </span>
                  <span>·</span>
                  <span className="capitalize">{item.tipo}</span>
                </div>
                <h4 className="text-sm font-semibold font-org text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#2B4F7E] dark:group-hover:text-[#90B5E0] transition-colors truncate">
                  {item.titulo}
                </h4>
                {item.descricao && (
                  <p className="text-xs font-ler text-[#5B5F66] dark:text-[#9E9EA4] truncate">
                    {item.descricao}
                  </p>
                )}
              </div>

              <div className="shrink-0 p-2 rounded-[4px] bg-[#F4F5F7] dark:bg-zinc-800 text-[#5B5F66] group-hover:bg-[#EEF3F9] group-hover:text-[#2B4F7E] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALLOUT DO BRAND BOOK & PADRÃO EDITORIAL */}
      <section className="p-6 rounded-[8px] bg-[#EEF3F9] dark:bg-[#192330] border border-[#D9DCE1] dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-org">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#2B4F7E] dark:text-[#90B5E0]">
            Quer consultar o manual tipográfico e a grade oficial?
          </h3>
          <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-ler">
            Veja as 12 páginas detalhadas com as margens de 32 mm, entrelinhas, estilo de caixas e regras de acabamento da apostila.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToMode('brandbook')}
          className="px-4 py-2 rounded-[6px] text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] transition-colors cursor-pointer shrink-0 shadow-2xs whitespace-nowrap"
        >
          Abrir Guia do Brand Book
        </button>
      </section>

    </div>
  );
};
