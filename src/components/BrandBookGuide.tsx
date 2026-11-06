import React from 'react';
import { Check, X as XIcon, Palette, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const BrandBookGuide: React.FC = () => {
  const cores = [
    {
      nome: 'Veia',
      hex: '#2B4F7E',
      fundo: '#EEF3F9',
      papel: 'Conceito-chave, faixa do capítulo, numeração, links de figura.',
      analogia: 'Padrão dos atlas: azul (veia)',
    },
    {
      nome: 'Artéria',
      hex: '#A8322D',
      fundo: '#FBEFEE',
      papel: 'Correlação clínica, sinais no paciente, condutas.',
      analogia: 'Padrão dos atlas: vermelho (artéria)',
    },
    {
      nome: 'Nervo',
      hex: '#9A7609',
      fundo: '#FBF4DC',
      papel: 'Ponto de prova, parâmetros laboratoriais, pegadinhas.',
      analogia: 'Padrão dos atlas: amarelo (nervo)',
    },
    {
      nome: 'Linfa',
      hex: '#3D7A5A',
      fundo: '#EDF6F0',
      papel: 'Síntese, resumo Cornell e todas as ferramentas de revisão.',
      analogia: 'Padrão dos atlas: verde (linfa)',
    },
    {
      nome: 'Prova',
      hex: '#5B4B8A',
      fundo: '#F3EFFA',
      fio: '#ECE7F6',
      papel: 'Caiu em prova, Teste você, gabaritos e autoavaliação.',
      analogia: 'Roxo marca tudo o que é prova',
    },
    {
      nome: 'Professora',
      hex: '#C2410C',
      fundo: '#FFF3EB',
      papel: 'Destaque da professora, falas em aula e notas de slides.',
      analogia: 'Laranja reservado para a voz docente',
    },
  ];

  const caixasAmostra = [
    {
      tipo: 'Conceito-chave',
      corTexto: '#2B4F7E',
      bg: '#EEF3F9',
      texto: 'Definição curta do termo que sustenta o capítulo, com a origem da palavra quando ajuda a memorizar.',
    },
    {
      tipo: 'Correlação clínica',
      corTexto: '#A8322D',
      bg: '#FBEFEE',
      texto: 'Onde o conceito aparece no paciente: sintoma, achado de exame, conduta.',
    },
    {
      tipo: 'Ponto de prova',
      corTexto: '#9A7609',
      bg: '#FBF4DC',
      texto: 'O que as provas antigas cobram sobre o tema e como o enunciado costuma ser montado.',
    },
    {
      tipo: 'Síntese',
      corTexto: '#3D7A5A',
      bg: '#EDF6F0',
      texto: 'Rótulo: um conceito por linha.\nOutro rótulo: sem juntar vários conceitos num parágrafo.',
    },
    {
      tipo: 'Destaque da professora',
      corTexto: '#C2410C',
      bg: '#FFF3EB',
      tag: 'ÊNFASE FORTE',
      texto: '“Prestem atenção nesse ponto.” Fala entre aspas e uma linha de contexto.',
    },
    {
      tipo: 'Aprofunde no livro Robbins, cap. 18',
      corTexto: '#6B5A3E',
      bg: '#F6F2EA',
      texto: 'Complemento do livro-texto, com capítulo e figura citados.',
    },
    {
      tipo: 'Atenção',
      corTexto: '#4A4E55',
      bg: '#F4F5F7',
      texto: 'Quando aula, slide e livro divergem, diz em qual se basear.',
    },
    {
      tipo: 'Caiu em prova 2025/2, questão 11',
      corTexto: '#5B4B8A',
      bg: '#F3EFFA',
      borda: '#ECE7F6',
      texto: 'Questão real, na íntegra, sem resposta (a resposta nunca aparece junto da pergunta).',
    },
  ];

  return (
    <div className="space-y-12 animate-entra font-ler max-w-4xl mx-auto py-4">
      
      {/* Capa / Cabeçalho do Brand Book */}
      <div className="border-b border-[#D9DCE1] dark:border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5F66] dark:text-[#9E9EA4] font-org block">
            Sistema visual · Apostilas de Medicina
          </span>
          <img
            src="/assets/aistudio/logo_transparente.png?v=transp4"
            alt="estuda Jaider"
            className="h-3.5 sm:h-4 w-auto object-contain dark:invert select-none opacity-90"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7] tracking-[-0.022em]">
          Brand book da apostila
        </h1>
        <p className="text-base text-[#5B5F66] dark:text-[#9E9EA4] max-w-2xl leading-relaxed">
          Cores, tipografia, grade, componentes e regras de acabamento do modelo v3.1, reunidos para análise e decisão de ajustes.
        </p>

        {/* Demonstração do Logo com Fundo Transparente sobre diferentes superfícies */}
        <div className="p-4 rounded-lg bg-[#F4F5F7] dark:bg-zinc-800/80 border border-[#D9DCE1] dark:border-zinc-700/60 space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] font-org">
              Logo com fundo transparente (Sem artefato quadriculado)
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#3D7A5A]/15 text-[#3D7A5A] dark:text-[#6BC998]">
              Alfa 100% Nativo · Reduzido em 75%
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3 rounded-md bg-white border border-[#D9DCE1] flex flex-col items-center justify-center gap-1.5 shadow-2xs">
              <img src="/assets/aistudio/logo_transparente.png?v=transp4" alt="Logo fundo branco" className="h-4 w-auto object-contain select-none" />
              <span className="text-[10px] text-[#5B5F66] font-org">Fundo Branco (#FFFFFF)</span>
            </div>
            <div className="p-3 rounded-md bg-[#FDFDFC] border border-[#E5E7EB] flex flex-col items-center justify-center gap-1.5 shadow-2xs">
              <img src="/assets/aistudio/logo_transparente.png?v=transp4" alt="Logo fundo creme" className="h-4 w-auto object-contain select-none" />
              <span className="text-[10px] text-[#5B5F66] font-org">Fundo Creme (#FDFDFC)</span>
            </div>
            <div className="p-3 rounded-md bg-[#2B4F7E] flex flex-col items-center justify-center gap-1.5 shadow-2xs">
              <img src="/assets/aistudio/logo_transparente_white.png?v=transp4" alt="Logo fundo azul institucional" className="h-4 w-auto object-contain select-none" />
              <span className="text-[10px] text-white/80 font-org">Fundo Azul (#2B4F7E)</span>
            </div>
            <div className="p-3 rounded-md bg-[#161618] border border-zinc-700 flex flex-col items-center justify-center gap-1.5 shadow-2xs">
              <img src="/assets/aistudio/logo_transparente_white.png?v=transp4" alt="Logo fundo escuro" className="h-4 w-auto object-contain select-none" />
              <span className="text-[10px] text-zinc-400 font-org">Fundo Noturno (#161618)</span>
            </div>
          </div>
        </div>

        {/* As 6 faixas de cores do Brand Book (Pág. 1) */}
        <div className="grid grid-cols-6 gap-2 pt-4 max-w-md">
          {cores.map((c) => (
            <div
              key={c.nome}
              style={{ backgroundColor: c.hex }}
              className="h-14 sm:h-16 rounded-[6px] shadow-xs flex flex-col justify-end p-1.5 transition-transform hover:scale-105"
              title={`${c.nome} (${c.hex})`}
            />
          ))}
        </div>
      </div>

      {/* Visão Geral (Pág. 2) */}
      <section className="space-y-4">
        <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase">
          Visão geral
        </span>
        <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
          A ideia do sistema
        </h2>
        <div className="p-5 rounded-lg bg-[#EEF3F9] dark:bg-[#192330] border-l-3 border-[#2B4F7E] dark:border-[#4A7AB5]">
          <p className="text-base sm:text-lg font-medium text-[#2B4F7E] dark:text-[#90B5E0] leading-relaxed">
            “Uma apostila de estudo que se lê como um livro-texto limpo e se parece com um atlas: pouco ruído, muita informação, cor com significado.”
          </p>
        </div>
        <p className="texto-apostila text-[#1D1D1F] dark:text-[#F5F5F7]">
          O visual é minimalista, inspirado na Apple, e adaptado ao contexto médico. Isso significa fundo branco, hierarquia tipográfica clara, cantos arredondados discretos e nenhum ornamento sem função. O texto corrido é o protagonista: a explicação em prosa vem sempre primeiro, e tabelas, fluxogramas e ferramentas de revisão entram depois como apoio, sem substituí-la.
        </p>
      </section>

      {/* Paleta e Significado (Pág. 3) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase">
            1 · Cores
          </span>
          <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
            Paleta e significado
          </h2>
          <p className="text-xs text-[#5B5F66] font-org mt-1">
            Seis famílias de cor, cada uma com tom forte (texto e rótulo) e tom de fundo (caixa).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {cores.map((c) => (
            <div
              key={c.nome}
              style={{ backgroundColor: c.fundo }}
              className="p-4 rounded-[6px] flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{ color: c.hex }}
                    className="font-bold text-sm font-org"
                  >
                    {c.nome} · {c.hex}
                  </span>
                  <span
                    style={{ backgroundColor: c.hex }}
                    className="w-3 h-3 rounded-full"
                  />
                </div>
                <p className="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] font-ler leading-relaxed">
                  {c.papel}
                </p>
              </div>
              <span className="text-[11px] text-[#5B5F66] font-org mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                {c.analogia}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-[6px] bg-[#F4F5F7] dark:bg-zinc-800 text-xs font-org text-[#5B5F66] dark:text-[#9E9EA4] leading-relaxed">
          <strong>Regra de acabamento:</strong> As caixas não têm contorno: a cor de fundo sozinha faz o trabalho. Apenas <em>Caiu em prova</em>, <em>Teste você</em> e as tabelas de gabarito e de Cornell usam um fio fino, porque são áreas de resposta ou de autoavaliação.
        </div>
      </section>

      {/* Caixas Didáticas Amostra (Pág. 7) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase">
            5 · Caixas didáticas
          </span>
          <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
            Um tipo de informação, uma cor
          </h2>
          <p className="text-xs text-[#5B5F66] font-org mt-1">
            Rótulo em Inter Semibold 8,6 pt, texto em 9,8 pt, cantos de 3 mm, sem contorno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {caixasAmostra.map((box, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: box.bg,
                borderColor: box.borda || 'transparent',
                borderWidth: box.borda ? '1px' : '0px',
              }}
              className="p-4 rounded-[6px] space-y-1"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ color: box.corTexto }}
                  className="text-xs font-semibold font-org"
                >
                  {box.tipo}
                </span>
                {box.tag && (
                  <span className="text-[10px] font-bold text-white bg-[#C2410C] px-1.5 py-0.5 rounded-xs font-org">
                    {box.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] font-ler leading-relaxed whitespace-pre-line">
                {box.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Faça e Não Faça (Pág. 11) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] font-org uppercase">
            9 · Uso e Diretrizes
          </span>
          <h2 className="text-2xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
            Faça e não faça
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Faça */}
          <div className="p-5 rounded-[6px] bg-[#EDF6F0] dark:bg-[#15261D] space-y-3">
            <h3 className="font-semibold text-sm font-org text-[#3D7A5A] dark:text-[#52A078] flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Faça
            </h3>
            <ul className="text-xs font-ler text-[#1D1D1F] dark:text-[#F5F5F7] space-y-2">
              <li>• Explique o mecanismo antes do nome, em português natural e tom de professor.</li>
              <li>• Use a cor da caixa para o tipo de informação que ela carrega.</li>
              <li>• Legende toda figura com título, explicação e fonte.</li>
              <li>• Mantenha uma ideia por linha dentro de caixas paralelas.</li>
              <li>• Ponha o gabarito do teste no fim do capítulo, em tabela justificada.</li>
            </ul>
          </div>

          {/* Não faça */}
          <div className="p-5 rounded-[6px] bg-[#FBEFEE] dark:bg-[#2D1A19] space-y-3">
            <h3 className="font-semibold text-sm font-org text-[#A8322D] dark:text-[#D2534D] flex items-center gap-1.5">
              <XIcon className="w-4 h-4" /> Não faça
            </h3>
            <ul className="text-xs font-ler text-[#1D1D1F] dark:text-[#F5F5F7] space-y-2">
              <li>• Não use travessão nem frases enfeitadas.</li>
              <li>• Não use a mesma cor para dois tipos de caixa.</li>
              <li>• Não dê a resposta junto da questão "Caiu em prova".</li>
              <li>• Não coloque cabeçalho de página nem abas fora da primeira página do capítulo.</li>
              <li>• Não deixe o recuo largo à direita em páginas sem coluna de notas.</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};
