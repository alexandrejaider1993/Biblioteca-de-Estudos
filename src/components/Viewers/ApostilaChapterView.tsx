import React, { useState } from 'react';
import { StudyChapterData, DidacticBox } from '../../types/library';
import { Check, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface ApostilaChapterViewProps {
  data: StudyChapterData;
}

export const ApostilaChapterView: React.FC<ApostilaChapterViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<number>(data.numeroCapitulo);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: string }>({});
  const [showGabarito, setShowGabarito] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, letter: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const renderDidacticBox = (box: DidacticBox, idx: number) => {
    switch (box.tipo) {
      case 'conceito':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#EEF3F9] dark:bg-[#192330] my-3">
            <span className="text-[12px] font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] block mb-1 font-org">
              {box.rotulo || 'Conceito-chave'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      case 'clinica':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#FBEFEE] dark:bg-[#2D1A19] my-3">
            <span className="text-[12px] font-semibold text-[#A8322D] dark:text-[#D2534D] block mb-1 font-org">
              {box.rotulo || 'Correlação clínica'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      case 'prova':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#FBF4DC] dark:bg-[#2D2615] my-3">
            <span className="text-[12px] font-semibold text-[#9A7609] dark:text-[#C8A02A] block mb-1 font-org">
              {box.rotulo || 'Ponto de prova'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      case 'sintese':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#EDF6F0] dark:bg-[#15261D] my-3">
            <span className="text-[12px] font-semibold text-[#3D7A5A] dark:text-[#52A078] block mb-1 font-org">
              {box.rotulo || 'Síntese'}
            </span>
            <div className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler whitespace-pre-line">
              {box.conteudo}
            </div>
          </div>
        );

      case 'professora':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#FFF3EB] dark:bg-[#2C1E14] my-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-[#C2410C] dark:text-[#EA642C] font-org">
                {box.rotulo || 'Destaque da professora'}
              </span>
              {box.enfaseForte && (
                <span className="text-[10px] font-bold tracking-wider uppercase text-white bg-[#C2410C] px-1.5 py-0.5 rounded-sm font-org">
                  ÊNFASE FORTE
                </span>
              )}
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler italic">
              {box.conteudo}
            </p>
            {box.contexto && (
              <p className="text-[11.5px] text-[#5B5F66] dark:text-[#9E9EA4] mt-1 font-org">
                {box.contexto}
              </p>
            )}
          </div>
        );

      case 'livro':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#F6F2EA] dark:bg-[#26231C] my-3">
            <span className="text-[12px] font-semibold text-[#6B5A3E] dark:text-[#D2BEA0] block mb-1 font-org">
              {box.rotulo || 'Aprofunde no livro'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      case 'atencao':
        return (
          <div key={idx} className="p-4 rounded-md bg-[#F4F5F7] dark:bg-[#202124] my-3">
            <span className="text-[12px] font-semibold text-[#4A4E55] dark:text-[#B3B7BD] block mb-1 font-org">
              {box.rotulo || 'Atenção'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      case 'caiu-em-prova':
        return (
          <div
            key={idx}
            className="p-4 rounded-md bg-[#F3EFFA] dark:bg-[#221D2C] border border-[#ECE7F6] dark:border-[#382F48] my-3"
          >
            <span className="text-[12px] font-semibold text-[#5B4B8A] dark:text-[#7D6DB5] block mb-1 font-org">
              {box.rotulo || 'Caiu em prova'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
              {box.conteudo}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#1A1A1D] rounded-xl shadow-lg border border-[#D9DCE1] dark:border-zinc-800 p-6 sm:p-10 font-ler space-y-10">
      
      {/* ====================================================
          1. ABERTURA DE CAPÍTULO (Faixa Azul Veia & Abas)
          Regra: Cantos de 4mm, fundo azul veia #2B4F7E, texto branco
         ==================================================== */}
      <div className="relative rounded-[8px] bg-[#2B4F7E] dark:bg-[#1C3658] text-white p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start overflow-hidden">
        
        {/* Left column: Number + Chapter Header */}
        <div className="space-y-4 max-w-xl">
          <div className="flex items-start gap-5">
            <span className="text-5xl sm:text-6xl font-light font-org leading-none text-white/95">
              {data.numeroCapitulo}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 font-org block mb-1">
                Capítulo {data.numeroCapitulo}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-org text-white tracking-[-0.022em]">
                {data.tituloCapitulo}
              </h1>
              {/* Barra de assinatura: 14mm por 1.2mm, branca, abaixo do título */}
              <div className="w-14 h-[2px] bg-white mt-3 rounded-full" />
            </div>
          </div>

          {/* Subtópicos no capítulo */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-white/80 font-org block mb-1.5">
              Neste capítulo
            </span>
            <ul className="text-xs text-white/90 font-org space-y-1">
              {data.subtopicos.map((sub) => (
                <li key={sub.numero}>
                  <strong className="text-white">{sub.numero}</strong> {sub.titulo}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Metadados & Abas Laterais */}
        <div className="flex flex-col justify-between items-end gap-4 w-full md:w-auto">
          {/* Metadados da aula e provas antigas */}
          <div className="text-right text-xs font-org space-y-2 bg-white/10 dark:bg-black/20 p-3 rounded-md backdrop-blur-xs w-full md:w-auto">
            {data.aulaOrigem && (
              <div>
                <span className="text-[11px] font-semibold text-white/70 block">Aula de origem</span>
                <span className="text-white">{data.aulaOrigem}</span>
              </div>
            )}
            {data.provasAntigas && (
              <div>
                <span className="text-[11px] font-semibold text-white/70 block">Nas provas antigas</span>
                <span className="text-white">{data.provasAntigas}</span>
              </div>
            )}
          </div>

          {/* Abas Laterais Numeradas (Pág. 6) */}
          <div className="flex items-center gap-1 font-org">
            {[1, 2, 3, 4, 5, 6, data.numeroCapitulo, 8].map((num) => {
              const isActive = num === data.numeroCapitulo;
              return (
                <div
                  key={num}
                  className={`w-6 h-6 rounded text-[11px] font-semibold flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white text-[#2B4F7E] font-bold shadow-xs'
                      : 'bg-white/20 text-white/70'
                  }`}
                >
                  {num}
                </div>
              );
            })}
            <div className="w-6 h-6 rounded text-[11px] font-semibold flex items-center justify-center bg-white/20 text-white/70">
              Q
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. CORPO DO CAPÍTULO & COLUNA LATERAL DE NOTAS
          Regra: Coluna principal com parágrafos justificados
          e coluna estreita à direita com notas de margem
         ==================================================== */}
      <div className="space-y-8">
        {data.secoes.map((secao) => (
          <div key={secao.numero} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Coluna Principal (9 de 12 colunas) */}
            <div className="lg:col-span-9 space-y-4">
              <h2 className="text-base font-semibold font-org text-[#1D1D1F] dark:text-[#F5F5F7] flex items-baseline gap-2 border-b border-[#D9DCE1] dark:border-zinc-800 pb-1">
                <span className="text-[#2B4F7E] dark:text-[#4A7AB5]">{secao.numero}</span>
                <span>{secao.titulo}</span>
              </h2>

              {secao.paragrafos.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="texto-apostila text-[#1D1D1F] dark:text-[#F5F5F7]"
                >
                  {p}
                </p>
              ))}

              {/* Caixas didáticas do subtópico */}
              {secao.caixas && secao.caixas.map((box, bIdx) => renderDidacticBox(box, bIdx))}
            </div>

            {/* Coluna Estreita de Notas de Margem (3 de 12 colunas) */}
            <div className="lg:col-span-3 space-y-3">
              {secao.notaMargem && (
                <div className="nota-margem bg-[#F4F5F7]/70 dark:bg-zinc-800/40 p-3 rounded border-l-2 border-[#2B4F7E] dark:border-[#4A7AB5]">
                  <span
                    className={`font-semibold block mb-0.5 ${
                      secao.notaMargem.tipo === 'livro'
                        ? 'text-[#6B5A3E] dark:text-[#D2BEA0]'
                        : 'text-[#2B4F7E] dark:text-[#4A7AB5]'
                    }`}
                  >
                    {secao.notaMargem.titulo}
                  </span>
                  <p className="text-[11.5px] leading-relaxed text-[#5B5F66] dark:text-[#9E9EA4]">
                    {secao.notaMargem.texto}
                  </p>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* ====================================================
          3. TESTE VOCÊ (Pág. 9 do Brand Book)
          Tudo o que é avaliação usa o roxo #5B4B8A
         ==================================================== */}
      {data.testeVoce && (
        <div className="pt-6 border-t border-[#D9DCE1] dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#5B4B8A] dark:text-[#7D6DB5] font-org uppercase tracking-wider block mb-0.5">
                Avaliação Clínica
              </span>
              <h2 className="text-xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
                {data.testeVoce.titulo}
              </h2>
            </div>
            <span className="text-xs text-[#5B5F66] font-org">
              Tudo o que é avaliação usa o roxo
            </span>
          </div>

          <div className="space-y-4">
            {data.testeVoce.questoes.map((q) => {
              const selected = selectedAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="rounded-lg border border-[#ECE7F6] dark:border-[#382F48] bg-white dark:bg-[#1E1E22] overflow-hidden shadow-xs"
                >
                  {/* Cabeçalho roxo claro #ECE7F6 */}
                  <div className="px-4 py-2.5 bg-[#ECE7F6] dark:bg-[#2B2438] text-[#5B4B8A] dark:text-[#7D6DB5] text-xs font-semibold font-org flex items-center justify-between">
                    <span>Questão {q.id} · Teste você</span>
                    <span className="font-normal text-[11px]">Gabarito ao final</span>
                  </div>

                  {/* Enunciado */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <p className="text-sm font-ler text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
                      {q.enunciado}
                    </p>

                    {/* Alternativas A, B, C, D */}
                    <div className="space-y-2 font-org text-xs">
                      {q.alternativas.map((alt) => {
                        const isChosen = selected === alt.letra;
                        return (
                          <button
                            key={alt.letra}
                            type="button"
                            onClick={() => handleSelectOption(q.id, alt.letra)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-md text-left transition-colors cursor-pointer ${
                              isChosen
                                ? 'bg-[#ECE7F6] dark:bg-[#342A45] text-[#5B4B8A] dark:text-[#9A8AC9] font-medium'
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[#1D1D1F] dark:text-[#F5F5F7]'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                isChosen
                                  ? 'bg-[#5B4B8A] text-white'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                              }`}
                            >
                              {alt.letra}
                            </span>
                            <span className="pt-0.5 leading-snug">{alt.texto}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão de Conferir Gabarito */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#5B5F66] font-org">
              A resposta nunca aparece junto da pergunta (Pág. 9).
            </span>
            <button
              type="button"
              onClick={() => setShowGabarito((prev) => !prev)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#5B4B8A] hover:bg-[#4E3F78] rounded-md transition-colors cursor-pointer font-org shadow-xs"
            >
              {showGabarito ? 'Ocultar Gabarito do Teste' : 'Conferir Gabarito do Teste'}
            </button>
          </div>

          {/* Tabela de Gabarito do Teste (Pág. 9 do Brand Book) */}
          {showGabarito && (
            <div className="mt-4 p-5 rounded-lg bg-[#F3EFFA] dark:bg-[#221D2C] border border-[#ECE7F6] dark:border-[#382F48] animate-entra space-y-3">
              <h3 className="text-sm font-semibold font-org text-[#5B4B8A] dark:text-[#7D6DB5]">
                Gabarito do Teste você
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-org">
                  <thead>
                    <tr className="border-b border-[#D9DCE1] dark:border-zinc-700 text-[#5B5F66]">
                      <th className="py-2 px-3 font-semibold w-20">Questão</th>
                      <th className="py-2 px-3 font-semibold w-24">Correta</th>
                      <th className="py-2 px-3 font-semibold">Explicação Justificada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9DCE1]/60 dark:divide-zinc-800 font-ler">
                    {data.testeVoce.questoes.map((q) => (
                      <tr key={q.id}>
                        <td className="py-2.5 px-3 font-semibold font-org text-[#5B4B8A]">
                          {q.id}
                        </td>
                        <td className="py-2.5 px-3 font-bold font-org text-[#5B4B8A]">
                          {q.correta}
                        </td>
                        <td className="py-2.5 px-3 text-[#1D1D1F] dark:text-[#F5F5F7] text-justify leading-relaxed">
                          {q.explicacao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================
          4. FERRAMENTAS DE REVISÃO (Pág. 10 do Brand Book)
          Todas em verde linfa #3D7A5A, fundo #EDF6F0
         ==================================================== */}
      <div className="pt-8 border-t border-[#D9DCE1] dark:border-zinc-800 space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#3D7A5A] dark:text-[#52A078] font-org uppercase tracking-wider block mb-0.5">
            Ferramentas de Revisão
          </span>
          <h2 className="text-xl font-bold font-org text-[#1D1D1F] dark:text-[#F5F5F7]">
            Quatro formas de checar o aprendizado
          </h2>
          <p className="text-xs text-[#5B5F66] font-org mt-1">
            Todas em verde linfa, sem substituir o texto descritivo.
          </p>
        </div>

        {/* 1. Método de tópicos */}
        {data.topicosRevisao && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold font-org text-[#3D7A5A] dark:text-[#52A078]">
              Método de tópicos
            </h3>
            <div className="space-y-3">
              {data.topicosRevisao.map((top) => (
                <div key={top.numero} className="p-3.5 rounded-md bg-[#EDF6F0] dark:bg-[#15261D] space-y-1">
                  <div className="text-xs font-semibold font-org text-[#3D7A5A] dark:text-[#52A078]">
                    {top.numero}. {top.titulo}
                  </div>
                  <p className="text-xs italic text-[#1D1D1F] dark:text-[#F5F5F7] font-ler">
                    "{top.fraseResumo}"
                  </p>
                  <p className="text-xs text-[#5B5F66] dark:text-[#9E9EA4] font-ler text-justify pt-1">
                    {top.explicacao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Resumo Cornell */}
        {data.cornell && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold font-org text-[#3D7A5A] dark:text-[#52A078]">
              Resumo Cornell
            </h3>
            <div className="rounded-lg border border-[#D9DCE1] dark:border-zinc-800 bg-[#FFFFFF] dark:bg-[#1E1E22] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs font-org">
                <thead>
                  <tr className="bg-[#EDF6F0] dark:bg-[#15261D] text-[#3D7A5A] dark:text-[#52A078] border-b border-[#D9DCE1] dark:border-zinc-800">
                    <th className="py-2.5 px-4 font-semibold w-1/3">Pistas e perguntas</th>
                    <th className="py-2.5 px-4 font-semibold">Anotações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9DCE1] dark:divide-zinc-800 font-ler">
                  {data.cornell.itens.map((c, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                      <td className="py-2.5 px-4 font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] align-top">
                        {c.pista}
                      </td>
                      <td className="py-2.5 px-4 text-[#1D1D1F] dark:text-[#F5F5F7] align-top">
                        {c.anotacao}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Caixa de Resumo no Rodapé do Cornell */}
              <div className="p-4 bg-[#EDF6F0]/60 dark:bg-[#15261D]/60 border-t border-[#D9DCE1] dark:border-zinc-800">
                <span className="text-[11px] font-semibold text-[#3D7A5A] dark:text-[#52A078] font-org uppercase tracking-wider block mb-1">
                  Resumo do Capítulo
                </span>
                <p className="text-xs leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7] font-ler text-justify">
                  {data.cornell.resumoFinal}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Quadro Comparativo */}
        {data.quadroComparativo && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold font-org text-[#3D7A5A] dark:text-[#52A078]">
              Quadro comparativo
            </h3>
            <div className="rounded-lg border border-[#D9DCE1] dark:border-zinc-800 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs font-org">
                <thead>
                  <tr className="border-b border-[#1D1D1F] dark:border-zinc-400 text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {data.quadroComparativo.colunas.map((col, idx) => (
                      <th
                        key={col}
                        className={`py-2 px-3 font-semibold ${
                          idx === 0 ? 'bg-zinc-100 dark:bg-zinc-800 w-1/4' : ''
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9DCE1] dark:divide-zinc-800 font-ler">
                  {data.quadroComparativo.linhas.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {data.quadroComparativo!.colunas.map((col, cIdx) => (
                        <td
                          key={col}
                          className={`py-2 px-3 text-[#1D1D1F] dark:text-[#F5F5F7] ${
                            cIdx === 0
                              ? 'font-semibold font-org bg-zinc-50 dark:bg-zinc-800/40'
                              : ''
                          }`}
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
