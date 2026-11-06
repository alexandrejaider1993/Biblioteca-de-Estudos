import { LibraryData } from '../types/library';

export const INITIAL_LIBRARY_DATA: LibraryData = {
  disciplinas: [
    {
      nome: "",
      itens: [
        {
          id: "apostila-cap-7",
          titulo: "Capítulo 7: Rastreamento — Citologia e DNA-HPV",
          tipo: "PDF",
          caminho: "Capítulo 7: Rastreamento — Citologia e DNA-HPV.pdf",
          data: "06/11/2026",
          tamanho: "3.2 MB",
          descricao: "Apostila de Medicina v3.1 seguindo o Brand Book oficial: zona de transformação, caixas didáticas, notas de margem e resumo Cornell.",
          capituloApostila: {
            numeroCapitulo: 7,
            tituloCapitulo: "Rastreamento: citologia e DNA-HPV",
            aulaOrigem: "21/10/2026 · Slides 19 a 22",
            provasAntigas: "2022/2, questões 12 e 13",
            subtopicos: [
              { numero: "7.1", titulo: "Colpocitologia oncótica e zona de transformação" },
              { numero: "7.2", titulo: "Teste molecular de DNA-HPV e tipagem" },
              { numero: "7.3", titulo: "Condutas diagnósticas e diretrizes após o resultado" }
            ],
            secoes: [
              {
                numero: "7.1",
                titulo: "Zona de transformação",
                paragrafos: [
                  "A zona de transformação é o epitélio metaplásico que substitui o colunar. Por ser imaturo, é o alvo preferencial do HPV, e por isso a colpocitologia concentra a coleta nessa faixa.",
                  "Paciente de 28 anos, sem queixas, procura a unidade básica de saúde para consulta de rotina e realização do exame preventivo periódico."
                ],
                notaMargem: {
                  titulo: "Metaplasia",
                  texto: "Do grego meta, mudança, e plasia, formação: troca fisiológica de um tipo de epitélio maduro por outro."
                },
                caixas: [
                  {
                    tipo: "conceito",
                    rotulo: "Conceito-chave",
                    conteudo: "Zona de Transformação (ZT): área da ectocérvix onde o epitélio colunar evertido sofre metaplasia escamosa fisiológica. Constitui a topografia primordial de infecção pelo HPV e desenvolvimento de neoplasias intraepiteliais cervicais (NIC)."
                  },
                  {
                    tipo: "clinica",
                    rotulo: "Correlação clínica",
                    conteudo: "À colposcopia com teste do ácido acético a 5%, as áreas de epitélio metaplásico atípico exibem acetobranquidão com pontilhado basófilo ou mosaico grosseiro, orientando o ponto exato da biópsia dirigida."
                  },
                  {
                    tipo: "professora",
                    rotulo: "Destaque da professora",
                    enfaseForte: true,
                    conteudo: "“Prestem atenção nesse ponto: o rastreamento citopatológico no Brasil NÃO deve ser iniciado antes dos 25 anos em mulheres imunocompetentes, mesmo em caso de sexarca precoce, devido à alta prevalência de infecções transitórias autolimitadas.”",
                    contexto: "Aula de Propedêutica Ginecológica · Slide 20"
                  }
                ]
              },
              {
                numero: "7.2",
                titulo: "Teste de DNA-HPV e sensibilidade diagnóstica",
                paragrafos: [
                  "A introdução dos testes moleculares de captura híbrida ou PCR para genotipagem de HPV de alto risco oncogênico (subtipos 16 e 18) revolucionou as estratégias populacionais de triagem.",
                  "Enquanto a citologia convencional apresenta sensibilidade aproximada de 50-60%, a detecção de DNA-HPV alcança sensibilidade superior a 90%, conferindo alto valor preditivo negativo que autoriza o espaçamento seguro dos intervalos de rastreio."
                ],
                notaMargem: {
                  titulo: "No livro Robbins",
                  texto: "Capítulo 18: Oncogênese viral e inativação de p53 e Rb pelas oncoproteínas virais E6 e E7.",
                  tipo: "livro"
                },
                caixas: [
                  {
                    tipo: "prova",
                    rotulo: "Ponto de prova",
                    conteudo: "As bancas de residência médica cobram recorrentemente a idade de início do rastreio (25 a 64 anos) e a periodicidade: dois exames anuais consecutivos negativos permitem espaçar o preventivo para cada 3 anos."
                  },
                  {
                    tipo: "caiu-em-prova",
                    rotulo: "Caiu em prova 2025/2, questão 11",
                    conteudo: "Mulher de 32 anos recebe laudo citopatológico com atipias de significado indeterminado em células escamosas, possivelmente não neoplásicas (ASC-US). De acordo com as diretrizes do Ministério da Saúde, a conduta recomendada é repetir o exame citopatológico em 6 meses."
                  },
                  {
                    tipo: "sintese",
                    rotulo: "Síntese",
                    conteudo: "• Idade do rastreio: 25 aos 64 anos de idade.\n• Frequência convencional: trienal (após 2 anuais normais).\n• Intervalo com DNA-HPV negativo: 5 anos.\n• Encaminhamento imediato para colposcopia: lesões de alto grau (HSIL) e atipias de células glandulares (AGC)."
                  }
                ]
              }
            ],
            topicosRevisao: [
              {
                numero: 1,
                titulo: "Rastreamento do câncer de colo",
                fraseResumo: "Identificação precoce de lesões intraepiteliais precursoras antes da invasão estromal.",
                explicacao: "O câncer de colo uterino tem evolução lenta e progressiva ao longo de uma a duas décadas, tornando o rastreio sistemático altamente custo-efetivo para redução de mortalidade."
              },
              {
                numero: 2,
                titulo: "Citologia vs DNA-HPV",
                fraseResumo: "Citologia avalia o fenótipo celular; biologia molecular avalia o genoma viral.",
                explicacao: "O teste de DNA-HPV permite estender o intervalo de segurança para 5 anos em pacientes negativas, enquanto o achado citológico de ASC-H ou HSIL demanda investigação colposcópica mandatória."
              }
            ],
            cornell: {
              itens: [
                {
                  pista: "Qual o intervalo após DNA-HPV não detectado?",
                  anotacao: "Cinco anos em mulher imunocompetente."
                },
                {
                  pista: "O que a citologia procura?",
                  anotacao: "Atipia nuclear em célula superficial e intermediária (coilocitose, hipercromasia, aumento da relação núcleo/citoplasma)."
                },
                {
                  pista: "Qual a idade de início e término do rastreamento?",
                  anotacao: "Início aos 25 anos de idade e encerramento aos 64 anos (desde que haja pelo menos dois exames negativos consecutivos nos últimos 5 anos)."
                },
                {
                  pista: "Qual conduta em laudo de HSIL?",
                  anotacao: "Encaminhamento direto para colposcopia com biópsia dirigida se houver lesão suspeita."
                }
              ],
              resumoFinal: "O rastreamento do câncer do colo do útero fundamenta-se na colheita adequada da junção escamocolunar. O exame é indicado dos 25 aos 64 anos, com intervalo trienal após dois exames anuais negativos. A incorporação do teste de DNA-HPV possibilita intervalos ampliados de 5 anos com elevadíssima segurança diagnóstica."
            },
            quadroComparativo: {
              colunas: ["Critério", "Citologia Convencional", "Teste de DNA-HPV"],
              linhas: [
                { "Critério": "Detecta", "Citologia Convencional": "Alteração celular / coilocitose", "Teste de DNA-HPV": "DNA do vírus de alto risco" },
                { "Critério": "Intervalo normal", "Citologia Convencional": "3 anos (após 2 anuais)", "Teste de DNA-HPV": "5 anos" },
                { "Critério": "Sensibilidade", "Citologia Convencional": "50% a 60%", "Teste de DNA-HPV": "> 90%" },
                { "Critério": "Especificidade", "Citologia Convencional": "Elevada (> 90%)", "Teste de DNA-HPV": "Moderada (infecções transitórias)" }
              ]
            },
            testeVoce: {
              titulo: "Teste você 1 · Vulva e Colo",
              questoes: [
                {
                  id: 1,
                  enunciado: "Qual afirmação sobre o cancro duro está correta?",
                  alternativas: [
                    { letra: "A", texto: "É confirmado obrigatoriamente por biópsia da lesão vulvar." },
                    { letra: "B", texto: "Desaparece sozinho em poucas semanas, mesmo sem tratamento." },
                    { letra: "C", texto: "É causado pelos subtipos de HPV 6 e 11." },
                    { letra: "D", texto: "Apresenta dor intensa e secreção purulenta à palpação." }
                  ],
                  correta: "B",
                  explicacao: "O cancro duro da sífilis primária é uma úlcera tipicamente indolor, de bordas endurecidas e fundo limpo que cicatriza espontaneamente em 2 a 6 semanas, passando com frequência despercebida pela paciente. O HPV 6 e 11 causam condilomas acuminados."
                },
                {
                  id: 2,
                  enunciado: "Em mulher de 28 anos com citopatológico evidenciando Atipias de Significado Indeterminado em Células Escamosas, Possivelmente Não Neoplásicas (ASC-US), a conduta preconizada é:",
                  alternativas: [
                    { letra: "A", texto: "Encaminhar imediatamente para colposcopia com biópsia." },
                    { letra: "B", texto: "Realizar conização com cirurgia de alta frequência (CAF)." },
                    { letra: "C", texto: "Repetir o exame citopatológico em 6 meses." },
                    { letra: "D", texto: "Prescrever estrogênio tópico por 14 dias e repetir em 3 meses." }
                  ],
                  correta: "C",
                  explicacao: "Para mulheres com 25 a 29 anos com resultado de ASC-US, a conduta recomendada pelo Ministério da Saúde é a repetição da citologia em 6 meses na unidade básica de saúde. Se aos 30 anos ou mais, a repetição é feita em 6 meses (se persistir ASC-US em 2 exames consecutivos, aí sim encaminha-se à colposcopia)."
                }
              ]
            }
          }
        },
        {
          id: "root-1",
          titulo: "Guia de Estudos e Cronograma de Medicina",
          tipo: "PDF",
          caminho: "Guia de Estudos e Cronograma de Medicina.pdf",
          data: "06/11/2026",
          tamanho: "1.8 MB",
          descricao: "Manual de orientação para estudos de medicina, métodos de repetição espaçada e ciclo de estudos.",
          pdfPages: [
            {
              page: 1,
              title: "1. Introdução à Metodologia de Estudo Ativo",
              text: "A formação médica exige a assimilação de um volume extenso de informações clínicas e conceituais. Estudos contemporâneos em neurociência da aprendizagem comprovam que a repetição espaçada (Spaced Repetition System - SRS) combinada com a recuperação ativa (Active Recall) atinge taxas de retenção a longo prazo até 300% superiores ao método de leitura passiva e sublinhado.\n\nPrincipais pilares:\n1. Recuperação Ativa: teste-se antes de reler o conteúdo;\n2. Repetição Espaçada: revise nos intervalos calculados (1d, 3d, 7d, 21d, 60d);\n3. Aplicação Clínica: resolva questões contextualizadas de casos clínicos."
            },
            {
              page: 2,
              title: "2. Organização das Disciplinas do Ciclo Básico e Clínico",
              text: "O currículo médico estrutura-se em:\n- Ciclo Básico (1º ao 4º semestre): Anatomia, Fisiologia, Bioquímica, Histologia, Farmacologia e Patologia;\n- Ciclo Clínico (5º ao 8º semestre): Semiologia, Propedêutica, Clínica Médica, Cirurgia, Ginecologia e Obstetrícia, Pediatria;\n- Internato (9º ao 12º semestre): Prática hospitalar supervisionada em regime de imersão integral.\n\nUtilize as pastas da biblioteca para arquivar resumos por matéria e manter seus decks de flashcards atualizados semanalmente."
            }
          ]
        },
        {
          id: "root-2",
          titulo: "Valores de Referência Laboratoriais Gerais",
          tipo: "Planilha",
          caminho: "Valores de Referência Laboratoriais Gerais.xlsx",
          data: "05/11/2026",
          tamanho: "420 KB",
          descricao: "Tabela de parâmetros bioquímicos, hemograma, eletrólitos e gasometria arterial.",
          tabelaColunas: ["Exame", "Valor de Referência", "Unidade", "Interpretação Clínica"],
          tabelaLinhas: [
            { "Exame": "Hemoglobina (Homens)", "Valor de Referência": "13.5 - 17.5", "Unidade": "g/dL", "Interpretação Clínica": "< 13.5: Anemia | > 17.5: Poliglobulia" },
            { "Exame": "Hemoglobina (Mulheres)", "Valor de Referência": "12.0 - 15.5", "Unidade": "g/dL", "Interpretação Clínica": "< 12.0: Anemia" },
            { "Exame": "Leucócitos Totais", "Valor de Referência": "4.000 - 10.000", "Unidade": "/mm³", "Interpretação Clínica": "> 10k: Leucocitose (infecciosa/inflamatória)" },
            { "Exame": "Plaquetas", "Valor de Referência": "150.000 - 450.000", "Unidade": "/mm³", "Interpretação Clínica": "< 150k: Trombocitopenia" },
            { "Exame": "Creatinina Sérica", "Valor de Referência": "0.7 - 1.2", "Unidade": "mg/dL", "Interpretação Clínica": "Avaliação de taxa de filtração glomerular" },
            { "Exame": "Potássio (K+)", "Valor de Referência": "3.5 - 5.0", "Unidade": "mEq/L", "Interpretação Clínica": "< 3.5: Hipocalemia (onda U) | > 5.0: Hipercalemia (T apiculada)" },
            { "Exame": "Sódio (Na+)", "Valor de Referência": "135 - 145", "Unidade": "mEq/L", "Interpretação Clínica": "Osmolaridade plasmática e volemia" },
            { "Exame": "Glicemia de Jejum", "Valor de Referência": "70 - 99", "Unidade": "mg/dL", "Interpretação Clínica": "100-125: Pré-diabetes | ≥ 126: Diabetes" }
          ]
        }
      ]
    },
    {
      nome: "Semestre 1/Anatomia Humana",
      itens: [
        {
          id: "anat-1",
          titulo: "Atlas Interativo do Sistema Cardiovascular",
          tipo: "Site",
          caminho: "Semestre 1/Anatomia Humana/Atlas_Cardiovascular/index.html",
          data: "04/11/2026",
          tamanho: "8.4 MB",
          descricao: "Estudo tridimensional interativo das câmaras cardíacas, grandes vasos e sistema condutor.",
          conteudoHtml: `
            <div class="space-y-6">
              <div class="bg-[#EEF3F9] dark:bg-[#192330] p-6 rounded-lg">
                <span class="text-xs font-semibold text-[#2B4F7E] dark:text-[#4A7AB5] uppercase tracking-wider block mb-1">Conceito Anatômico</span>
                <h3 class="text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Morfologia Cardíaca Interna e Externa</h3>
                <p class="text-sm text-[#5B5F66] dark:text-[#9E9EA4] leading-relaxed text-justify">
                  O coração é um órgão muscular oco localizado no mediastino médio, envolvido pelo saco pericárdico. Possui quatro câmaras: dois átrios e dois ventrículos, separados pelos septos interatrial e interventricular.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-[#FBEFEE] dark:bg-[#2D1A19] rounded-lg">
                  <span class="text-xs font-semibold text-[#A8322D] dark:text-[#D2534D] block mb-1">Circulação Coronariana</span>
                  <ul class="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] space-y-1.5">
                    <li>• <strong>Artéria Coronária Esquerda (ACE):</strong> origina o Ramo Interventricular Anterior (DA) e o Ramo Circunflexo (Cx).</li>
                    <li>• <strong>Artéria Coronária Direita (ACD):</strong> emite o Ramo Marginal Direito e o Ramo Interventricular Posterior (em 85% dos corações - dominância direita).</li>
                  </ul>
                </div>
                <div class="p-4 bg-[#EDF6F0] dark:bg-[#15261D] rounded-lg">
                  <span class="text-xs font-semibold text-[#3D7A5A] dark:text-[#52A078] block mb-1">Sistema Elétrico de Condução</span>
                  <ul class="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] space-y-1.5">
                    <li>• <strong>Nó Sinoatrial (SA):</strong> marcapasso fisiológico no átrio direito, próximo à desembocadura da VCS.</li>
                    <li>• <strong>Nó Atrioventricular (AV):</strong> retardo fisiológico da condução no trígono fibroso.</li>
                    <li>• <strong>Feixe de His e Fibras de Purkinje:</strong> condução rápida pelas paredes ventriculares.</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "anat-2",
          titulo: "Flashcards Anki - Miologia e Inervações",
          tipo: "Anki",
          caminho: "Semestre 1/Anatomia Humana/Flashcards_Miologia.apkg",
          data: "03/11/2026",
          tamanho: "1.2 MB",
          descricao: "Deck com 6 flashcards de alta repetição para fixação de músculos do membro superior e plexo braquial.",
          flashcards: [
            {
              id: "fc-1",
              front: "Qual músculo é o principal abdutor do braço nos primeiros 15 graus?",
              back: "Músculo Supraespinhal (inervado pelo Nervo Supraescapular - C5, C6). O músculo Deltóide assume a abdução dos 15 aos 90 graus.",
              notes: "Lesão do supraespinhal é a causa mais comum de ruptura do manguito rotador."
            },
            {
              id: "fc-2",
              front: "Quais são os 4 músculos que compõem o Manguito Rotador?",
              back: "1. Supraespinhal\n2. Infraespinhal\n3. Redondo Menor\n4. Subescapular\n(Mnemônico: S.I.R.S.)",
              notes: "O subescapular é o único que realiza rotação medial; os demais fazem abdução ou rotação lateral."
            },
            {
              id: "fc-3",
              front: "Qual nervo inerva o músculo Diafragma e qual a sua raiz medular?",
              back: "Nervo Frênico (raízes C3, C4, C5: 'C3, C4, C5 keep the diaphragm alive').",
              notes: "Trauma cervical alto acima de C3 causa parada respiratória imediata."
            },
            {
              id: "fc-4",
              front: "Qual a tríade do Canal Femoral (limites)?",
              back: "Lateral: Veia Femoral\nMedial: Ligamento Lacunar\nAnterior: Ligamento Inguinal\nPosterior: Músculo Pectíneo / Ligamento Pectíneo.",
              notes: "Local de ocorrência de hérnias femorais, mais frequentes no sexo feminino."
            },
            {
              id: "fc-5",
              front: "Qual nervo é comprimido na Síndrome do Túnel do Carpo?",
              back: "Nervo Mediano, comprimido sob o Retináculo dos Flexores no punho.",
              notes: "Sintomas: parestesia no 1º, 2º, 3º e metade lateral do 4º quirodáctilos."
            },
            {
              id: "fc-6",
              front: "Quais ramos emergem diretamente do Arco Aórtico (em padrão anatômico clássico)?",
              back: "1. Tronco Braquiocefálico\n2. Artéria Carótida Comum Esquerda\n3. Artéria Subclávia Esquerda",
              notes: "O Tronco Braquiocefálico se divide subsequentemente em Carótida Comum Direita e Subclávia Direita."
            }
          ]
        },
        {
          id: "anat-3",
          titulo: "Slides - Anatomia Seccional do Encéfalo",
          tipo: "Slides",
          caminho: "Semestre 1/Anatomia Humana/Anatomia_Seccional_Encefalo.pptx",
          data: "01/11/2026",
          tamanho: "6.1 MB",
          descricao: "Apresentação com lâminas didáticas de neuroanatomia para correlação tomográfica e por ressonância.",
          slides: [
            {
              title: "1. Meninges e Espaços Meníngeos",
              bullets: [
                "Dura-máter: camada externa espessa e fibrosa aderida à calvária",
                "Aracnóide-máter: camada intermediária avascular em teia de aranha",
                "Pia-máter: íntima aderência ao parênquima cerebral nos giros e sulcos",
                "Hemorragia Epidural: sangue arterial (artéria meníngea média), formato biconvexo",
                "Hemorragia Subdural: sangue venoso (veias pontes), formato em crescente"
              ],
              notes: "Atenção ao risco de herniação uncal nas lesões expansivas supratentoriais."
            },
            {
              title: "2. Córtex Motor e Sensitivo Primário",
              bullets: [
                "Giro Pré-Central (Área 4 de Brodmann): córtex motor primário",
                "Sulco Central de Rolando: marco divisório entre lobos frontal e parietal",
                "Giro Pós-Central (Áreas 3, 1, 2): córtex somatossensorial primário",
                "Homúnculo de Penfield: representação somatotópica desproporcional (mãos e lábios dominantes)"
              ],
              notes: "Artéria Cerebral Média irriga a convexidade lateral (membros superiores e face); Artéria Cerebral Anterior irriga a face medial (membros inferiores)."
            },
            {
              title: "3. Sistema Ventricular e Circulação Liquórica",
              bullets: [
                "Produção: Plexos Coróides nos ventrículos laterais, 3º e 4º ventrículos (~500 mL/dia)",
                "Trajeto: Ventrículos Laterais → Forame de Monro → 3º Ventrículo → Aqueduto Cerebral de Sylvius → 4º Ventrículo",
                "Saída: Forames de Luschka (laterais) e Magendie (mediano) para o espaço subaracnóideo",
                "Reabsorção: Granulações aracnóideas de Pacchioni para o Seio Sagital Superior"
              ],
              notes: "Obstrução no aqueduto de Sylvius é causa frequente de hidrocefalia não-comunicante."
            }
          ]
        }
      ]
    },
    {
      nome: "Semestre 2/Fisiologia Humana",
      itens: [
        {
          id: "fisio-1",
          titulo: "Fisiologia Renal e Equilíbrio Ácido-Básico",
          tipo: "PDF",
          caminho: "Semestre 2/Fisiologia Humana/Fisiologia_Renal_Acido_Basico.pdf",
          data: "02/11/2026",
          tamanho: "3.5 MB",
          descricao: "Mecanismo contracorrente, regulação do bicarbonato, secreção de H+ e equilíbrio hidroeletrolítico.",
          pdfPages: [
            {
              page: 1,
              title: "Mecanismo Tubular de Reabsorção e Secreção",
              text: "O néfron filtra cerca de 180 litros de fluido por dia, dos quais mais de 99% são reabsorvidos ao longo dos segmentos tubulares.\n\n1. Túbulo Contorcido Proximal (TCP): responsável pela reabsorção isosmótica de 65% da água e do sódio filtrados, além de 100% da glicose e aminoácidos via cotransporte Na+/Glicose (SGLT2), e 80-90% do bicarbonato filtrado (via anidrase carbônica).\n2. Alça de Henle: ramo descendente delgado é permeável à água e impermeável a solutos; ramo ascendente espesso é impermeável à água e expressa o cotransportador Na+-K+-2Cl- (NKCC2), sítio de ação dos diuréticos de alça (Furosemida).\n3. Túbulo Distal e Coletor: regulação fina por Aldosterona (aumenta canais ENaC e reabsorção de Na+ em troca de K+/H+) e Hormônio Antidiurético / Vasopressina (ADH, inserção de canais de Aquaporina-2)."
            },
            {
              page: 2,
              title: "Interpretação da Gasometria Arterial",
              text: "Passo a passo sistemático para análise ácido-básica:\n\n1. Analisar o pH (Normal: 7.35 - 7.45):\n   - pH < 7.35: Acidemia\n   - pH > 7.45: Alcalemia\n\n2. Avaliar o componente respiratório (PaCO2: 35 - 45 mmHg) e metabólico (HCO3-: 22 - 26 mEq/L):\n   - Acidose Metabólica: HCO3- baixo e pH baixo;\n   - Acidose Respiratória: PaCO2 alto e pH baixo;\n   - Alcalose Metabólica: HCO3- alto e pH alto;\n   - Alcalose Respiratória: PaCO2 baixo e pH alto.\n\n3. Calcular o Ânion Gap na acidose metabólica:\n   AG = Na+ - (Cl- + HCO3-) [Normal: 8 a 12 mEq/L].\n   - AG elevado indica acúmulo de ácidos não mensuráveis (Cetoacidose, Uremia, Salicilatos, Lactato)."
            }
          ]
        }
      ]
    },
    {
      nome: "Semestre 3/Farmacologia Médica",
      itens: [
        {
          id: "farm-1",
          titulo: "Guia Prático de Antibioticoterapia e Espectro",
          tipo: "Word",
          caminho: "Semestre 3/Farmacologia Médica/Guia_Antibioticoterapia.docx",
          data: "05/11/2026",
          tamanho: "2.4 MB",
          descricao: "Resumo clínico estruturado sobre classes de antibióticos, mecanismos de ação, indicações e toxicidades.",
          docText: `CLASSE DOS BETALACTÂMICOS
- Penicilinas Naturais (Penicilina G Cristalina, Benzatina): ativas contra Streptococcus pyogenes, Treponema pallidum (sífilis), Actinomyces.
- Aminopenicilinas (Amoxicilina, Ampicilina): ampliam espectro para bastonetes Gram-negativos (E. coli, Proteus mirabilis) e Enterococcus faecalis.
- Penicilinas Antiestafilocócicas (Oxacilina): escolha para Staphylococcus aureus sensível à meticilina (MSSA).
- Inibidores de Betalactamase (Clavulanato, Sulbactam, Tazobactam): restauram eficácia contra bactérias produtoras de betalactamase.
- Cefalosporinas:
  * 1ª Geração (Cefazolina, Cefalexina): excelente cobertura contra cocos Gram-positivos e profilaxia cirúrgica.
  * 3ª Geração (Ceftriaxona, Cefotaxima): alta penetração liquórica, ativa contra Gram-negativos e Streptococcus pneumoniae.
  * 4ª Geração (Cefepima): antipseudomonas e Gram-negativos resistentes.
- Carbapenêmicos (Meropenem, Imipenem): antibióticos de reserva para infecções graves multirresistentes por bacilos Gram-negativos produtores de ESBL.`
        },
        {
          id: "farm-2",
          titulo: "Flashcards Anki - Classes de Anti-hipertensivos",
          tipo: "Anki",
          caminho: "Semestre 3/Farmacologia Médica/Flashcards_Antihipertensivos.apkg",
          data: "04/11/2026",
          tamanho: "980 KB",
          descricao: "Deck de perguntas e respostas sobre IECA, BRA, Diuréticos Tiazídicos e Bloqueadores de Canal de Cálcio.",
          flashcards: [
            {
              id: "fc-farm-1",
              front: "Por que os IECAs (ex: Enalapril, Captopril) podem causar tosse seca persistente e qual a alternativa terapêutica?",
              back: "Porque a ECA também degrada a Bradicinina; sua inibição acumula bradicinina e substância P nas vias aéreas. A alternativa é trocar por um BRA (Bloqueador de Receptor de Angiotensina II, como Losartana ou Valsartana).",
              notes: "Angioedema também é mediado por bradicinina e contraindica reexposição a IECAs."
            },
            {
              id: "fc-farm-2",
              front: "Qual o mecanismo de ação dos Diuréticos Tiazídicos (ex: Hidroclorotiazida) e seus principais efeitos metabólicos colaterais?",
              back: "Inibem o cotransportador Na+/Cl- no túbulo contorcido distal.\nEfeitos colaterais (os 4 HIPO e 3 HIPER):\n- Hipocalemia, Hiponatremia, Hipomagnesemia, Hipovolemia;\n- Hiperuricemia (risco de crise de gota), Hiperglicemia, Hiperlipidemia.",
              notes: "Primeira linha no tratamento de hipertensão primária não complicada."
            }
          ]
        }
      ]
    }
  ]
};
