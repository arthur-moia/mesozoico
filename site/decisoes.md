# MESOZOICO v2 · Etapa 1 · Decisões

Prévia: https://claude.ai/artifact/2c7Knftt9ud3DMDxNmjoEW
Arquivos: `index.html` (abre direto no navegador) e `assets/eoraptor.webp` (o PNG enviado, convertido sem recorte).

## Visual
- Direção escura de documentário: tipografia enorme em Manrope, texto em DM Sans, uma figura central por cena. Paleta de basalto, osso e ocre, tirada dos arenitos vermelhos de Ischigualasto.
- Abertura: título MESOZOICO na frente da silhueta escura do Eoraptor, que é o destino da etapa (composição inspirada na GetLayers, sem copiar estrutura nem textos).
- Transição Starfield: partículas em WebGL puro (sem biblioteca), cerca de 2,6 s, com contador de 0 a 251,9 milhões de anos. A luz passa de fria a ocre. O ponteiro desloca levemente o ponto de fuga, e um clique ou tecla encurta a transição. A volta ao presente é mais curta.
- Passagem entre capítulos (do Triássico Inferior ao Carniano): uma cortina com o número correndo de 251,9 a 231, inspirada na referência do Instagram.
- Ruixen UI: adaptei duas ideias em CSS puro, a revelação de palavras ("Scroll Text Rise") e o botão com brilho na borda. Não instalei os componentes, que dependem de React, Tailwind e shadcn.
- Linha do tempo em escala real (de 251,9 milhões de anos até hoje), com as três paradas clicáveis e a marca da extinção K–Pg.
- Navegação: rolagem, setas, PageUp/PageDown, espaço, Home/End, deslizar no celular e botões visíveis. Com `prefers-reduced-motion`, todas as passagens viram troca direta. Sem WebGL, a passagem é direta e um aviso explica o motivo.
- Paisagem de Ischigualasto desenhada em canvas: planície de rios ao entardecer, solo nu da estação seca com gretas, cavalinhas e samambaias perto da água, árvores de copa larga e coníferas. Não há grama, flores, vulcão nem outros animais. É uma ilustração provisória, à espera de uma imagem profissional.

## Ciência (o que aparece na tela e como foi conferido)
- Início do Triássico: 251,902 ± 0,024 milhões de anos, pela carta ICS v2026/06 (lida).
- "A extinção mais severa que conhecemos": resumo de Burgess, Bowring e Shen 2014, PNAS, DOI 10.1073/pnas.1317692111.
- Cerca de 19 milhões de anos até os primeiros dinossauros: 251,9 menos 233,23 ± 0,73 milhões de anos (Santa Maria, Brasil; idade máxima de deposição). Fonte: Langer, Ramezani e Da Rosa 2018, Gondwana Research, DOI 10.1016/j.gr.2018.01.005, resumo lido. Aparece marcado como estimativa.
- Nyasasaurus: aparece com "?", como hipótese.
- Eoraptor: cerca de 1 m e dentição heterodonte pelo resumo de Sereno e colegas 1993, Nature, DOI 10.1038/361064a0. A mudança de terópode (1993) para sauropodomorfo (2013) foi conferida pelo resumo de 1993 e pelo título de Sereno, Martínez e Alcober 2013. A dieta onívora está marcada como hipótese. Usei "cerca de 231 milhões de anos" por causa da base da formação (cerca de 231,4).
- Paisagem: resumo de Colombi e Parrish 2008, PALAIOS, DOI 10.2110/palo.2007.p07-101r (sistema fluvial, estação seca, plantas lenhosas baixas e árvores). Dicroidium continua vindo de síntese.
- Retirei da tela "dinossauros eram minoria no vale" e as massas (10 kg), porque não consegui conferir na fonte primária. O PMC e o Europe PMC bloquearam o acesso.
- O botão "Fontes e certezas" lista, para cada cena, a marca (fato, estimativa, hipótese ou incerto) e a fonte com o link.

## Pendências para você decidir
- Na imagem do Eoraptor, os braços parecem longos demais: as mãos quase tocam o chão. Pelas sínteses de Sereno e colegas 2013, os braços tinham cerca de metade do comprimento das pernas, com três dedos grandes com garras e dois reduzidos. Mantive a imagem, como você pediu, e registrei a ressalva na aba de fontes.
- A paisagem é provisória e precisa de uma imagem profissional de Ischigualasto no Carniano.

---

## Revisão 1 (11/10/2026)
Pedido: corrigir a direção visual das três cenas, mantendo as interações e a transição Starfield.

- **Abertura.** O Eoraptor aparece em cor, iluminado e grande. O título MESOZOICO ficou menor e em cor sólida, sem o gradiente metálico. Saíram as partículas de fundo, que agora só aparecem na transição, e também os textos "Etapa 1 · protótipo" e "Fim da etapa 1". Nesta cena, o único botão principal é "Iniciar expedição": o botão do rodapé fica oculto aqui.
- **Triássico Inferior.** O número 251,9 deixou de ser o assunto da cena. No lugar, há uma escala cronoestratigráfica em proporção real, de 252 a 230 milhões de anos, com as idades nas cores oficiais da ICS. Nela aparecem a extinção, a abundância do Lystrosaurus, a diversificação de 1 a 3 milhões de anos, o retorno de ecossistemas estáveis em 8 a 9 milhões de anos, o Nyasasaurus marcado com "?" e os primeiros dinossauros. A cena também ganhou quatro fatos curtos, cada um com sua marca. Novas fontes: Chen e Benton 2012 (DOI 10.1038/ngeo1475) e Botha 2020 (DOI 10.7717/peerj.10408); li os resumos dos dois.
- **Eoraptor.** A paisagem desenhada saiu. A cena agora é uma prancha editorial, com o animal sob luz de estúdio e uma ficha de leitura rápida (tamanho, dentes, parentesco e local, cada item com sua marca). A legenda "Reconstrução" ficou maior e com fundo próprio.
- **Rodapé.** "Cenozoico" agora aparece numa linha só; no celular, as eras aparecem abreviadas (Tri., Jur., Cret., Cen.). As legendas ganharam mais contraste.

**Nenhuma imagem nova entrou nesta revisão.** Neste ambiente, o acesso a Wikimedia Commons, Flickr, Unsplash, NASA, USGS, PeerJ e PLOS está bloqueado, então não consegui baixar nem conferir autor e licença de fotos. Candidatas para a próxima rodada:
- Uma foto atual de Ischigualasto, de preferência da Cancha de Bochas, identificada como foto atual.
- Uma foto de fóssil de Lystrosaurus. As figuras de Botha 2020, na PeerJ, têm licença CC BY 4.0.
- Um mapa da Pangeia em domínio público, como os do USGS.

---

## Revisão 2 (11/10/2026)
Pedido: revisão profunda da direção de arte das três cenas, preservando a transição Starfield, a navegação, o painel "Fontes e certezas" e a imagem do Eoraptor. A versão da revisão 1 está guardada em `anteriores/index-revisao-1.html`.

**O que une as três cenas**
- O tempo aparece sempre como faixas horizontais empilhadas, com a mais antiga embaixo, como nas rochas: no título da abertura, na coluna do Triássico, na marca do topo (uma colunazinha com as proporções dos três períodos) e na linha do tempo do rodapé.
- Paleta de rocha, osso e sedimento: rocha #1a1612, osso #ece3d1 e sedimento #8f8373. Cada período tem uma cor de material, a mesma no título, na marca e no rodapé: Triássico ferro #a14d2f, Jurássico areia #9f8056, Cretáceo giz #d2c6b2 e Cenozoico solo #453b33. As cores oficiais da ICS ficaram só numa faixa estreita na borda da coluna, então o roxo não domina.
- Uma única luz quente (#e8a869), usada para o espécime e para o "você está aqui", na coluna e no rodapé.
- Papéis tipográficos fixos: Manrope 800 para nomes e títulos, Manrope 200 para medidas e contagens (19, ≈1 m, ≈231), Manrope 600 para a frase principal de cada cena e DM Sans para texto e rótulos.
- As marcas de certeza viraram símbolos que não dependem só da cor: ● fato, ◐ estimativa, ○ hipótese e ◌ incerto. As cores (malaquita, ocre, azurita e cinza) foram conferidas para daltonismo.
- Movimento só onde ajuda a ler, feito em CSS, sem instalar componentes da Ruixen UI (que dependem de React e Tailwind): as faixas do título se depositam de baixo para cima, a coluna se deposita antes de as medidas aparecerem e as linhas de chamada da prancha surgem depois do animal. Com movimento reduzido, tudo aparece pronto.

**Abertura.** O título MESOZOICO foi cortado em três faixas, com altura proporcional à duração de cada período (Cretáceo 77,1, Jurássico 58,3 e Triássico 50,5 milhões de anos). O Eoraptor fica de pé sobre o título, com os pés na faixa do Triássico, e a luz quente atrás dele clareia as letras mais próximas. Uma legenda ao lado dá as datas de cada faixa. Continua um único botão, "Iniciar expedição", que agora diz quanto tempo vai recuar. Testei três composições antes de escolher esta.

**Triássico Inferior.** A escala de 252 a 230 milhões de anos virou uma coluna de rocha em escala, com uma faixa por milhão de anos. O trecho escuro é o tempo sem dinossauros conhecidos. A camada clara começa em 233,23 milhões de anos, com um degradê para a margem de ± 0,73. Colchetes medem 1 a 3, 8 a 9 e 19 milhões de anos desde a extinção. Na tela ficaram a extinção, o Lystrosaurus, as duas etapas da recuperação, os 19 milhões de anos e os primeiros dinossauros inequívocos (Santa Maria e Ischigualasto); as explicações e as fontes ficaram no painel. O Nyasasaurus aparece na coluna como "Nyasasaurus?", com o círculo aberto de hipótese, e leva ao painel. Nenhuma paisagem foi desenhada.

**Eoraptor.** A cena virou a Prancha I, com três níveis de leitura: o nome e uma frase ("Um metro de dinossauro e nenhum consenso sobre onde encaixá-lo"), três dados com marca (cerca de 1 m, fato; cerca de 231 milhões de anos, estimativa; Formação Ischigualasto, Argentina, fato) e uma faixa de evidências em três colunas: o que os ossos mostram, o que se deduz e o que ninguém sabe. Duas chamadas apontam para o animal: os dentes de mais de um tipo (fato) e as listras e a cor (incerto). A ressalva "Reconstrução em vida. Só o esqueleto é evidência. Cor, padrão e pele são suposições." fica junto aos pés do animal.

**Ciência nova nesta revisão**
- Holótipo PVSJ 512, do Museo de Ciencias Naturales da Universidad Nacional de San Juan: ficha do Digimorph, Universidade do Texas em Austin (lida).
- Proporção dos braços: pelo resumo de Sereno e colegas 1993 (lido), os braços têm menos da metade do comprimento das pernas. O dado não entrou na prancha porque contradiz a ilustração; ficou registrado no painel.
- Nyasasaurus (Nesbitt e colegas 2013, Biology Letters): o acesso ao resumo foi recusado nesta etapa. Ele segue marcado como hipótese, e a fonte aparece como "não lida".

**Testes.** Telas de 390×844, 768×1024, 1024×768, 1280×720, 1280×800, 1440×900 e 1920×1080. Navegação por botões, teclado, roda do mouse, toque e endereço de cada cena, com e sem movimento reduzido e sem WebGL, sem erros de script. Em telas em pé e no celular, cada cena vira uma coluna só.

**Nenhuma imagem nova entrou.** A página da GetLayers (Marcus Vane) e o post do TikTok não abriram neste ambiente: a GetLayers devolveu só o índice da biblioteca, e o TikTok bloqueia leitura automática. Da Ruixen UI, li só a lista de componentes. Segui a intenção descrita no pedido: composição forte, tipografia grande e o assunto em relação direta com o título.

## Pendências para você decidir (revisão 2)
- Os braços da ilustração continuam parecendo longos demais para o que o resumo de 1993 descreve. A imagem foi mantida, com a ressalva no painel.
- Fotos profissionais (Ischigualasto, fóssil de Lystrosaurus) entram quando você enviar os arquivos.

---

## Revisão 2.1 (11/10/2026)
Pedido: editar a revisão 2, sem mudar a direção de arte, para que cada cena tenha uma ideia principal legível em poucos segundos e o aprofundamento continue disponível sem disputar atenção. A versão da revisão 2 está guardada em `anteriores/index-revisao-2.html`. As capturas desta versão, em 1440×900, estão em `capturas/` (`abertura.png`, `triassico.png` e `eoraptor.png`).

**O que ficou na leitura inicial**
- **Abertura:** o título em faixas, o Eoraptor, uma frase ("Do presente ao Triássico, e de volta até as aves da sua janela."), o botão "Iniciar expedição" e a etiqueta "Eoraptor lunensis" com a marca "Reconstrução em vida".
- **Triássico Inferior:** "Um mundo que acabou de quase acabar.", um fato sobre a extinção, "Você está aqui: 251,9 milhões de anos atrás" e a coluna com três marcos: a extinção, os 19 milhões de anos de rocha sem nenhum dinossauro conhecido e as rochas de cerca de 233 milhões de anos com os dinossauros mais antigos que conhecemos. Logo abaixo vem "Essa é a idade das rochas, não a da origem do grupo.", e o botão "Próxima parada: Eoraptor" leva à cena seguinte.
- **Eoraptor:** Prancha I, o nome, uma frase ("Não é o primeiro dinossauro: é um dos mais antigos que conhecemos bem, o que não é a mesma coisa.") e três dados: ≈230 milhões de anos (aproximado), ≈1 m e Formação Ischigualasto, Argentina. A ressalva sobre a reconstrução aparece uma vez, junto aos pés. A figura ocupa a altura toda da tela útil.

**O que saiu da leitura inicial e onde ficou**

| Cena | O que saiu | Onde ficou |
|---|---|---|
| Abertura | Legenda lateral com as datas dos três períodos | Ao passar o cursor ou tocar no título, cada faixa mostra o período e as datas. Também em "Fontes e certezas". |
| Abertura | Explicação sobre a espessura das faixas | "Fontes e certezas" |
| Abertura | "A natureza não deixou anotações…" | Abertura do painel "Fontes e certezas" |
| Abertura | Destino repetido: segunda linha do botão ("251,9 milhões de anos para trás"), idade e local na etiqueta, "Você o encontra no fim deste trecho" | O destino aparece uma vez, na frase acima do botão. Idade e local ficam na prancha. O rodapé não mostra "você está aqui" na abertura. |
| Abertura | Dica de navegação ("role, use as setas…") | Saiu. Depois da primeira passagem, os botões Voltar e Avançar ficam no rodapé. |
| Triássico | Régua numerada e as idades da ICS (Induano a Carniano), com nome e cor | "Mostrar detalhes da coluna" e "Fontes e certezas" |
| Triássico | Nyasasaurus | "Mostrar detalhes da coluna" (círculo aberto de hipótese, que leva à fonte) e "Fontes e certezas" |
| Triássico | Colchetes de 1 a 3 e de 8 a 9 milhões de anos (recuperação) | "Mostrar detalhes da coluna" e "Fontes e certezas" |
| Triássico | Datação de Santa Maria e de Ischigualasto | "Mostrar detalhes da coluna" e "Fontes e certezas" |
| Triássico | Lystrosaurus e "na Pangeia" | "Fontes e certezas" |
| Eoraptor | Faixa "o que os ossos mostram / o que se deduz / o que ninguém sabe" | "Mostrar evidências e incertezas". A chamada "a", dos dentes, aparece junto. |
| Eoraptor | Cabeçalho "Triássico Superior, Carniano" e "Sereno e colegas, 1993" | O período fica no rodapé. Os autores ficam nas evidências e no painel. |
| Eoraptor | Frase "Um metro de dinossauro e nenhum consenso sobre onde encaixá-lo." | O debate sobre a classificação está em "o que ninguém sabe". |
| Eoraptor | Chamada "b" (listras e cor) | Saiu. A ressalva sobre cor e pele fica uma vez, junto aos pés, e também no painel. |

A ressalva sobre os braços continua no painel científico.

**A idade do Eoraptor: de "≈231" para "≈230 (aproximado)"**
- O valor anterior vinha da idade da base da formação, não do exemplar. Nenhuma fonte lida dá uma data medida para o espécime.
- Alcober e Martínez 2010, ZooKeys 63, DOI 10.3897/zookeys.63.550 (lido): cinzas vulcânicas 20 m acima da base da Formação Ischigualasto deram 231,4 ± 0,3 milhões de anos (40Ar/39Ar). Eoraptor e Herrerasaurus vêm do mesmo nível, em La Gallinita, na parte mais baixa do Membro Cancha de Bochas, cerca de 40 m acima da base. O artigo não dá uma idade em milhões de anos para o Eoraptor.
- Martínez e colegas 2011, Science 331, DOI 10.1126/science.1198467 (resumo lido pelo OpenAlex, porque o site da Science não abriu): fala em "cerca de 230 milhões de anos", no Carniano médio, para os primeiros dinossauros de Ischigualasto.
- Desojo e colegas 2020, Scientific Reports 10:12782 (lido): em outra área da formação, em La Rioja, datações U-Pb deram cerca de 230,2 para a base e de 229,2 a 226,9 para os níveis com fósseis.
- Na tela, a idade aparece como "≈230 milhões de anos atrás (aproximado)", marcada como estimativa. A linha do tempo e a passagem entre capítulos usam o mesmo valor: a cortina agora corre de 251,9 a 230. Em "Fontes e certezas", o item da idade explica a limitação: o exemplar não tem datação própria, e o número é uma aproximação feita a partir das camadas próximas. Nas evidências, "o que ninguém sabe" inclui "A idade exata".
- O PubMed recusou as consultas por limite de acesso (HTTP 429), então não li as páginas de lá.

**Composição e telas**
- O Eoraptor ganhou espaço: a figura ocupa a altura útil da tela e fica parada quando a ficha de evidências rola, com a legenda à direita das garras.
- No celular em pé, cada cena continua numa coluna só. Nos detalhes da coluna, os nomes das idades ficam de lado, dentro da coluna, como nas colunas impressas. O nome do Nyasasaurus fica na faixa de texto, ligado ao círculo por um pontilhado; ali a chamada dos 8 a 9 milhões de anos sai do começo do intervalo, para não cair na mesma altura.
- No celular deitado, a frase da abertura sobe para o canto livre do topo, o botão fica numa linha só e a etiqueta do animal fica entre a mandíbula e o título.
- Em notebooks com a tela baixa, como 1280×600 ou 1366×650 com a barra do navegador, a abertura e a coluna cabem sem rolar. Quando falta altura, os controles da coluna sobem para o lado dela. As margens laterais passam a respeitar o recorte da câmera no celular deitado; isso não foi testado num aparelho real.
- Com movimento reduzido, as lentes e a gaveta trocam na hora; só a troca de cena tem um esmaecer curto.

**Testes.** Navegação por botões, teclado, roda do mouse, toque e endereço de cada cena, com e sem movimento reduzido e sem WebGL, sem erros de script. Lentes: abrir, fechar, Esc devolve o foco, sair da cena volta à leitura principal e o toque no Nyasasaurus abre a fonte dele. Abertura sem sobreposição e sem rolagem em 32 tamanhos, de 360×740 e 640×360 a 2560×1440. Prancha com a figura parada e a legenda livre das garras em 9 tamanhos de computador.

**Limitação conhecida.** Em janelas muito baixas, com menos de cerca de 600 px de altura no total (960×540, por exemplo), a cena do Triássico rola um pouco para mostrar o 19 e a extinção. Nenhum texto fica sobre outro.

**Nenhuma imagem nova entrou.**

## Pendências para você decidir (revisão 2.1)
- Os braços da ilustração continuam longos demais para o que o resumo de 1993 descreve. A ressalva segue no painel.
- Fotos (Ischigualasto, fóssil de Lystrosaurus) e novas imagens entram depois que você aprovar a composição.
- O resumo de Nesbitt e colegas 2013 (Nyasasaurus) continua sem leitura, porque o site da Royal Society recusou o acesso. Ele segue marcado como hipótese.

## Revisão 2.2: abertura com a fotografia (11/10/2026)

Só a abertura mudou. As cenas do Triássico Inferior e do Eoraptor estão iguais às da revisão 2.1 (capturas comparadas pixel a pixel). A versão anterior está em `anteriores/index-revisao-2-1.html`, com as capturas `anteriores/abertura-revisao-2-1.png` e `anteriores/abertura-celular-revisao-2-1.png`.

**O que saiu.** O Eoraptor e a etiqueta "Eoraptor lunensis / Reconstrução em vida" saíram da abertura. Ele aparece só na cena própria. O item "imagem" de "Fontes e certezas" da abertura foi trocado pelo item "foto".

**Composição.**
- No computador, a foto vira uma placa grande à direita, com borda seca à esquerda, sangrando para cima e para a direita. Os dedos ficam inteiros acima do rodapé. A frase e o botão ficam na coluna escura à esquerda.
- O título atravessa a borda da placa sobre a rocha sem osso, no canto de baixo à esquerda da foto. Quando a tela deixa, a borda cai no vão entre MESO e ZOICO: "meso" fica na rocha escura e "zoico" sobre a peça.
- No celular em pé, a placa ocupa o alto da tela, de borda a borda, do antebraço ao último dedo. A borda de baixo cai entre a faixa do Cretáceo e a do Jurássico do título. A frase e o botão ficam perto do polegar.
- O contorno dos ossos foi medido na própria foto. Em 28 tamanhos testados, de 360×740 a 2560×1080, nenhum texto fica sobre osso e os dedos ficam inteiros acima do rodapé. Também não há rolagem na abertura nem botão encostado no título ou no rodapé.

**A peça não é identificada na página.** A espécie e se a peça é original ou réplica não foram confirmadas, então a página não atribui a ela nenhuma informação científica. A legenda diz "◌ Peça não identificada" e abre o item "foto", que explica: não sabemos a espécie, a idade nem se é o fóssil original ou uma réplica; ela está ali como imagem, não como evidência. O texto alternativo só descreve o que se vê.

**Crédito e licença: a confirmar.** O arquivo se chama `pexels-zfxmql-34696990.jpg`, e o nome sugere o banco Pexels. Os metadados não trazem autor. Antes de publicar, falta confirmar a autoria e a licença.

**Edição da foto.** A foto está em preto e branco. Recebeu um tom quente discreto, da rocha ao osso, e meios-tons mais claros para os ossos aparecerem em tela de celular. Não houve retoque, espelhamento nem montagem. Há três tamanhos em WebP: `assets/fossil-1024.webp`, `assets/fossil-1600.webp` e `assets/fossil-2560.webp`. O navegador escolhe pelo tamanho da tela.

**Mantido.** Continuam iguais a transição Starfield, a navegação, a linha do tempo, o movimento reduzido e as datas ao passar o cursor ou tocar no título.

**Testes.** Navegação com e sem movimento reduzido, sem WebGL e por toque, todas sem erros. As 19 verificações das lentes passaram e o toque no Nyasasaurus funciona. A legenda abre "Fontes e certezas" no item da foto.

## Revisão 2.3: foto cobrindo a abertura (11/10/2026)

Arthur não aprovou a composição da revisão 2.2: a foto ficava como uma placa à direita, separada de uma coluna marrom. Só a abertura mudou de novo. A versão 6 (revisão 2.2) está em `anteriores/index-revisao-2-2.html`, com as capturas `anteriores/abertura-revisao-2-2.png` e `anteriores/abertura-celular-revisao-2-2.png`.

**Composição.**
- A foto cobre a abertura inteira, de ponta a ponta e de cima até o rodapé, em todos os tamanhos. Não há borda de placa, divisão vertical nem painel opaco. O rodapé passa por cima da foto.
- Título, frase e botão ficam sobre a própria foto. No computador, eles ficam na rocha sem osso do canto de baixo à esquerda. A página escolhe a menor ampliação em que o texto cabe ali sem tocar osso e os dedos aparecem inteiros acima do rodapé.
- O contraste vem de um escurecimento gradual e transparente: uma elipse que nasce no canto de baixo à esquerda e some antes dos ossos. O resto da foto não é escurecido.
- No celular em pé, há um recorte próprio da mesma foto: costelas no alto e o membro no meio, com título, frase e botão embaixo, perto do polegar. Ali o escurecimento sobe do rodapé até um pouco acima do título. Parte dos dedos fica sob o texto, como Arthur permitiu. No celular deitado, os dedos podem ficar cortados embaixo.

**O que saiu.** A etiqueta "Peça não identificada" saiu da abertura, e o texto alternativo deixou de dizer isso.

**Crédito e licença.** A foto é de Alex Bian, publicada no Pexels (https://www.pexels.com/photo/close-up-of-fossilized-dinosaur-bones-34696990/), usada pela licença do Pexels (https://www.pexels.com/license/). O item "foto" de "Fontes e certezas" da abertura dá o crédito, com os dois links. Ele diz que a espécie não foi identificada e que não sabemos se a peça é original ou réplica, sem atribuir nada à peça. A pendência de autoria e licença da revisão 2.2 está resolvida.

**Arquivos.** Entrou um quarto tamanho, `assets/fossil-3600.webp`, porque a foto agora aparece mais ampliada em telas grandes. O navegador escolhe o arquivo pela largura real em que a foto aparece.

**Paleta.** Não foi revisada. Essa é a próxima tarefa.

**Testes.**
- Em 28 tamanhos, de 360×740 a 2560×1080, a foto cobre a cena inteira e a abertura não rola. O botão não encosta no título nem no rodapé, e a etiqueta não aparece.
- Nas telas deitadas, nenhum texto fica sobre osso. A partir de 1024×768, os dedos aparecem inteiros acima do rodapé.
- A navegação passou sem erros com e sem movimento reduzido, sem WebGL e por toque. As lentes e o toque no Nyasasaurus funcionam.
- As cenas do Triássico Inferior e do Eoraptor estão iguais às da revisão 2.1, comparadas pixel a pixel.

## Revisão 3: "xisto azulado" nas três cenas (11/10/2026)

A versão 7 (revisão 2.3) está em `anteriores/index-revisao-2-3.html`, com as capturas `anteriores/*-revisao-2-3.png`. As fotos do fóssil continuam em `assets/` e o crédito continua registrado acima (Alex Bian, Pexels, licença do Pexels). Como a foto saiu da página, o item "foto" saiu de "Fontes e certezas"; nenhuma outra fonte, dado ou marca de certeza mudou.

**Duas direções para a abertura.**
- A, "vitrine vazia": uma vitrine de museu iluminada, com o suporte do exemplar vazio; o título passa na frente do pedestal. A pergunta é "o que estava aqui?", e a resposta chega na cena do Eoraptor, que aparece numa vitrine igual.
- B, "instrumento em repouso": um contador enorme parado em "hoje", o mesmo que corre na transição Starfield.
- Escolhida: A. Ela desperta curiosidade sem mostrar dinossauro, não acrescenta texto nem dado, não repete a coluna do Triássico e liga a primeira cena à terceira. A B mostrava o destino da viagem como número antes da hora e parecia painel de instrumentos.

```
computador                                   celular
  frase                    ┌─tampa─┐           ┌─tampa─┐
  [Iniciar expedição]      │ vidro │           │       │
                           │   ∪   │           │   ∪   │
  MESOZOICO ════════════╪══pedestal═╪          MESOZOICO
                                               frase
                                               [Iniciar expedição]
```

**Paleta "xisto azulado".** Paredes em azul petróleo (#10303a, com #0b1e25 perto do chão e #173e49 nas superfícies), texto em papel (#ecebe4) e dois cinzas azulados (#b3c4c6, #849ca1). A única cor quente é o ocre #e4a95e, só no "você está aqui", no pino da linha do tempo, no foco do teclado e nos links. Os períodos viraram tons da mesma pedra, o mais antigo mais escuro: Cretáceo #e6e4dc, Jurássico #b9c8c9, Triássico #8aa2a6, Cenozoico #4f6c73 (título, marca e rodapé). As marcas de certeza foram clareadas para a parede azul, com contraste entre 5,7 e 6,4 sobre ela; forma e palavra continuam as mesmas. As cores oficiais da ICS seguem só na régua dos detalhes da coluna. Saíram o ruído de "grão de rocha", os brilhos do pino, do ponto "você está aqui" e do botão, e o degradê metálico das letras.

**Tipografia.** Manrope e DM Sans continuam. Manrope 800 nos nomes (título, "Eoraptor", títulos de cena), Manrope 200 nas medidas (19, ≈230, contadores), Manrope 600 nas frases principais; DM Sans no texto e nas legendas, sem caixa alta.

**Cenas.**
- Abertura: vitrine vazia com tampa, lâmpada, reflexo no vidro, suporte vazio e pedestal; o título MESOZOICO, em três faixas lisas na espessura real dos períodos, atravessa o pedestal pela frente. As datas continuam ao passar o cursor ou tocar no título.
- Triássico Inferior: a mesma coluna e os mesmos textos, em pedra azulada. A coluna se deposita a partir do "você está aqui" e o 19 conta junto (0 a 19) até as rochas com os dinossauros mais antigos conhecidos; só então a frase de cima e a legenda do 19 aparecem, juntas.
- Eoraptor: o animal fica de pé no pedestal de uma vitrine que ocupa a maior parte da tela. A etiqueta fica à esquerda, na altura do pedestal: nome, nome científico, a frase, ≈230 (estimativa), ≈1 m e Argentina, Formação Ischigualasto. A ressalva da reconstrução fica na frente do pedestal, junto das patas. "Prancha I" saiu. Evidências e incertezas continuam no mesmo botão.

**Movimento.** Cada cena tem um momento só. Abertura: a luz da vitrine acende e as faixas do título se depositam de baixo para cima; frase e botão entram juntos. Triássico: a coluna cresce com o contador (cerca de 2 s) e o texto entra depois, num grupo. Eoraptor: o animal aparece de baixo para cima a partir do pedestal enquanto a vitrine acende; a etiqueta entra inteira. Starfield: 2,4 s na ida (antes 2,6) e 1,3 s na volta (antes 1,5); o contador chega ao número final antes e fica parado um instante antes da troca; estrelas do branco frio ao ocre. Passagem entre as cenas triássicas: cortina mais curta (0,5 s), contagem mais longa e suave (1,1 s) e uma pausa de 0,3 s no número final. Com movimento reduzido, tudo aparece no estado final.

**GSAP e ScrollTrigger.** Não foram usados. As cenas não rolam: a roda do mouse troca de cena, e um ScrollTrigger brigaria com essa navegação. O momento que ele resolveria (revelar a duração da coluna) foi feito com 40 linhas de JavaScript comum. No celular, onde a cena rola, a coluna começa a crescer quando metade dela aparece na tela.

**Referências.** Elektra (Awwwards), Dinosaur Gallery (Behance), History Virtual Museum (Webflow), Timeline Animation (Webflow), 21st.dev e GSAP só puderam ser lidos como texto; o navegador deste ambiente não conseguiu abrir nenhum desses sites para ver imagens ou vídeos. Dribbble não abriu nem como texto.

**Testes.** Navegação com e sem movimento reduzido, sem WebGL e por toque, sem erros. As lentes e o toque no Nyasasaurus funcionam. Na abertura, em 13 tamanhos de 360×740 a 2560×1080, nada rola, a frase não encosta no título e o botão e o título ficam acima do rodapé.

## Revisão 4: direção B, "Gesso, argila e basalto" (11/10/2026)

Arthur recusou a revisão 3 (azul petróleo nas três cenas, vitrine vazia, Triássico só recolorido). Ela está em `anteriores/index-revisao-3.html`, com capturas. Antes de mexer na prévia, duas propostas estáticas ficaram em `propostas-revisao-4/` (A "Calcário e grafite" e B "Gesso, argila e basalto"). Arthur escolheu a B.

**Cores.** Cada cena tem seu chão: gesso #ebeae5 na abertura, argila #cfc8ba no Triássico, basalto #1c2122 no Eoraptor, com o nicho em #d3d0c7. Tinta #181b1c; um só acento, cobalto #233fae (#9aabff no basalto), para o "você está aqui", o alfinete e o cone. As marcas de certeza mantêm forma e cor, mas a palavra ao lado usa a tinta da cena, para ter contraste em qualquer chão. As cores oficiais da ICS ficam só na tira de idades dos detalhes.

**Números com corpo.** Manrope 800 no 19 e nas datas da linha do tempo; 700 em ≈230, ≈1 m, Argentina e nos números do Starfield e da passagem (antes 200). A linha do tempo do rodapé passou a mostrar os limites: 251,9, 201,4, 143,1, 66,0 e hoje, em escala.

**Cenas.**
- Abertura: título no alto à esquerda, a frase grande no centro e a fotografia da parede de ossos do Dinosaur National Monument, com visitantes, encostada no canto. A foto é cena de museu, não evidência do Triássico; isso está em "Fontes e certezas".
- Triássico Inferior: a coluna virou régua horizontal, uma faixa por milhão de anos, da extinção (251,9) à direita; a parte clara começa nas rochas com os dinossauros mais antigos conhecidos (≈233). O 19, a legenda dele e a frase das rochas se apoiam na cota. Um cone liga a régua ao trecho do rodapé que ela amplia. Os detalhes (idades ICS, intervalos de recuperação, datações, Nyasasaurus) continuam no mesmo botão, agora "Mostrar detalhes".
- Eoraptor: placa escura à esquerda (≈230, nome, frase, Argentina com uma foto pequena de Ischigualasto hoje, ≈1 m) e o animal num nicho claro em arco à direita. O botão redondo das evidências fica na borda do nicho, num vão sem texto; em telas baixas vira pílula embaixo da frase.

**Movimento (um por cena).** Abertura: a foto se descobre de cima para baixo. Triássico: o trecho marcado no rodapé se ergue e se estica até virar a régua; a cota, o 19 e os textos entram no fim, e o cone aparece. No celular a régua cresce a partir do "você está aqui" quando aparece na tela. Eoraptor: o nicho se abre da direita para a esquerda e o botão aparece depois. Starfield e passagem continuam iguais. Com movimento reduzido, tudo já está no lugar.

**Correções em relação às maquetes.** A maquete B dizia 145 no início do Cretáceo; a página usa 143,1 (ICS 2026/06). As idades dos andares na tira dos detalhes vêm da mesma tabela ICS de antes.

**Fotos.** Vêm do pacote do site antigo: a parede de ossos (atribuída ao NPS) e Ischigualasto (sem autor). Autor e licença das duas ainda estão a confirmar e aparecem assim em "Fontes e certezas". A foto de fóssil de Alex Bian não está na página.

**Testes.** Navegação com e sem movimento reduzido, sem WebGL e por toque, sem erros; detalhes, Nyasasaurus e evidências funcionam. Nada rola em 1024×700, 1280×720, 1366×768, 1440×900 e 1920×1080 (só a lista de evidências aberta em 1024×700 rola 30 px); em celular as cenas rolam, e em celular deitado (640×360, 844×390) o Triássico e o Eoraptor rolam um pouco, sem texto sobre texto.

## Revisão 4.1: ajustes na abertura, no Triássico e no botão de evidências (11/10/2026)

A revisão 4 está em `anteriores/index-revisao-4.html`, com capturas. O antes e depois da abertura está em `capturas/abertura-antes-depois.png`. Identidade, fatos, marcas de certeza, navegação, Starfield e passagem não mudaram.

**Abertura.** A frase saiu do centro e foi para uma coluna à esquerda (cerca de 40 % da largura), alinhada à esquerda, abaixo do título. A fotografia ficou bem maior, à direita, do pé do título até o chão da cena, com o enquadramento puxado para os visitantes. Nada se cruza: frase e botão na coluna da esquerda, foto na da direita. O título e o movimento da foto (descobrir de cima para baixo) continuam.

**Triássico.** Leitura principal reduzida a uma ideia: "≈19 milhões de anos entre o início do Triássico e as rochas com os dinossauros inequívocos mais antigos que conhecemos". Ficaram o título, a extinção numa frase logo abaixo dele, o ≈19 em Manrope 800 e uma única faixa lisa de 251,9 a ≈233, com os dois extremos rotulados embaixo. A ressalva ("a idade das rochas, não a da origem do grupo"), a piada e a próxima parada passaram para junto do ≈19. Saíram da leitura principal o cone azul, as linhas verticais longas (cota e limite), as faixas de 1 milhão de anos, a parte clara depois de 233 e a segunda chamada solta à direita. A régua listrada, as idades ICS, a recuperação, o Nyasasaurus e a datação seguem em "Mostrar detalhes"; "Cada faixa é 1 milhão de anos" só aparece lá. O retângulo do rodapé agora marca só 251,9 a ≈233 (até 229,6 nos detalhes), e a faixa continua crescendo a partir dele.

**Eoraptor.** O botão redondo saiu da divisa. "Mostrar evidências e incertezas" virou um controle discreto, sublinhado, logo abaixo da frase na coluna escura; com as evidências abertas, vira "Voltar ao resumo" no mesmo lugar. Nicho, animal e a ressalva da reconstrução continuam.

**Referências.** Kimi e Lumora foram citados sem link nem imagem, e não foi possível vê-los; os ajustes seguem a descrição de Arthur.

**Fotos.** As duas fotografias continuam sem autor e licença confirmados.

## Revisão 4.2: estudos de movimento (11/10/2026)

A revisão 4.1, aprovada, está em `anteriores/index-revisao-4-1.html`, com capturas `anteriores/*-revisao-4-1.png`. Na prévia, o seletor de estudo na abertura tem o link "4.1 aprovada". Abertura e Triássico não mudaram. Gravações e capturas desta rodada estão em `estudos-movimento/`.

**Transição de "Iniciar expedição": A (atual) e B (alternativa).**
- A referência (getlayers.ai/layer/starfield-close) não abriu neste ambiente: o proxy recusa o site e o navegador de testes não a carrega. A leitura em texto só trouxe a categoria ("Galaxy & Space", "3D Scenes"), a etiqueta "threejs · particles" e a indicação de que é gratuita. Não houve acesso à imagem, ao vídeo nem ao prompt. A B é uma interpretação do nome e dessa etiqueta, não uma cópia do Starfield Close.
- B: cerca de 420 partículas perto da câmera, como discos macios (grandes e desfocados nas bordas, pequenos e nítidos ao fundo), sem rastros. O centro fica livre para o contador e o campo para de vez quando o número chega. Contador, destino (251,9), cores e duração (2,4 s na ida, 1,3 s na volta) são os mesmos da A.
- A continua sendo a transição padrão. B só roda quando escolhida no seletor de estudo (prévia) ou com `?transicao=b` no arquivo local. Com movimento reduzido, as duas viram troca direta, como antes.
- Gravações em 1280×720: `transicao-A-atual.mp4` e `transicao-B-alternativa.mp4` (Chromium sem placa de vídeo, 25 quadros por segundo; no navegador real fica mais fluido).

**Eoraptor: esqueleto → reconstrução.**
- `assets/eoraptor-esqueleto.png` é o arquivo enviado por Arthur, sem mudanças. A página usa `assets/eoraptor-esqueleto.webp`: o halo vermelho e amarelo do recorte (pixels quase transparentes com cor saturada) foi removido e os pixels de borda receberam a cor do osso vizinho. Nenhum osso foi deformado. O alinhamento usa só escala (98 %) e deslocamento (4 px, 8 px) na mesma tela de 1448 × 1086 da reconstrução, escolhidos para casar crânio, dorso e chão.
- Na primeira entrada na cena, o esqueleto aparece com o nicho e a reconstrução surge por cima 3,8 s depois (1,5 s de dissolução, com os ossos ainda visíveis no meio). A cena não avança; nome, dados e controles não se mexem. Depois, "Ver esqueleto" e "Ver reconstrução" alternam a figura por mouse, teclado ou toque. Ao voltar à cena, aparece a última versão escolhida, sem nova espera (vale durante a visita; recarregar a página recomeça). Com movimento reduzido, a reconstrução aparece direto e a troca é instantânea.
- Legendas: "Representação esquelética provisória · Ilustração, não fóssil. Origem e licença a confirmar." e "Reconstrução em vida · Só o esqueleto é evidência. Cor, padrão e pele são suposições." Em "Fontes e certezas", o item novo "figesq" registra que é ilustração, que a pose difere e que autor, origem e licença estão a confirmar. A ressalva dos braços agora vale para as duas figuras.
- O enquadramento passou a considerar a cauda do esqueleto (até 4,5 % da largura), para ela não encostar no arco do nicho; o animal ficou um pouco menor.
- Encaixe: crânio, pescoço, linha do dorso, quadril e chão coincidem bem. Divergem a cauda (arco largo para trás no esqueleto, curta e erguida na reconstrução), as pernas (passadas diferentes) e os braços (posição diferente; longos demais nas duas). Interpretação artística: as duas imagens inteiras; o esqueleto não segue o holótipo osso por osso, e pele, cor, listras e volume muscular são escolhas do ilustrador.
- Gravações: `eoraptor-passagem-automatica.mp4` e `eoraptor-alternancia-manual.mp4`. Capturas no mesmo enquadramento: `eoraptor-esqueleto.png` e `eoraptor-reconstrucao.png` (1440×900), versões de celular (390×844) e `eoraptor-sobreposicao.png` (esqueleto sobre a reconstrução a 42 %).

**Fotos.** A parede de ossos e Ischigualasto continuam sem autor e licença confirmados.

## Revisão 4.3: transição de partículas próximas e varredura no Eoraptor (11/10/2026)

A revisão 4.2 (transição A, seletor de estudo e dissolução no Eoraptor) está em `anteriores/index-revisao-4-2.html`; a 4.1 aprovada continua em `anteriores/index-revisao-4-1.html`.

**Transição de "Iniciar expedição".** A interpretação B virou a única transição: partículas próximas e desfocadas, sem rastros, centro livre para o contador, parada quando o número chega. Ela é uma interpretação própria; a referência citada não pôde ser consultada e o nome dela não aparece na página nem no código. O seletor A/B saiu da interface. Contador, destino, duração e a troca direta com movimento reduzido não mudaram.

**Eoraptor: varredura.** Substitui a dissolução da 4.2, adaptando o `specimenWipe` do site antigo (`js/site.js`): lá, uma linha fina e clara percorria a extensão visível do animal, com a reconstrução recortada à esquerda da linha e o esqueleto à direita, e a linha surgia e sumia nas pontas. Aqui:
- A linha (1,5 px, na tinta escura da cena, com as pontas esmaecidas, porque o nicho é claro) atravessa só a área do animal, de 4 % a 96 % da largura da figura e do focinho às patas na altura.
- Primeira entrada: o esqueleto fica à vista com o nicho e, 3,8 s depois da chegada, a linha passa da esquerda para a direita em 1,5 s. Atrás dela aparece a reconstrução; à frente continua o esqueleto. A linha some ao terminar.
- "Ver esqueleto" leva a linha da direita para a esquerda; "Ver reconstrução", da esquerda para a direita. Uma troca no meio da passagem inverte a linha a partir de onde ela está.
- Nome, dados, nicho, rodapé e cena ficam parados. Ao sair no meio da passagem, a versão escolhida fica completa; ao voltar, aparece a última versão escolhida, sem espera. Com movimento reduzido, a troca é instantânea e a linha não aparece.
- Legendas, o item "figesq" (pose, anatomia, origem e licença a confirmar) e a ressalva dos braços continuam iguais.

**Gravações.** `estudos-movimento/eoraptor-varredura-automatica.mp4` (chegada pela passagem do Triássico e varredura automática) e `estudos-movimento/eoraptor-varredura-manual.mp4` (trocas por clique e teclado, uma inversão no meio da passagem, saída e volta mantendo o esqueleto). 1280×720, Chromium sem placa de vídeo.

**Fotos.** A parede de ossos e Ischigualasto continuam sem autor e licença confirmados.

## Revisão 4.4: botão da abertura e linha do Triássico (11/10/2026)

A revisão 4.3 está em `anteriores/index-revisao-4-3.html`. Só dois ajustes; Eoraptor, cores e fatos não mudaram.
- **Abertura:** a seta saiu de "Iniciar expedição". Texto, cor, forma e ação do botão são os mesmos; o texto ficou centralizado (padding simétrico; no celular o botão largo também centraliza).
- **Triássico:** a faixa grossa virou uma linha de progresso fina (3 px, com um remate curto na ponta direita), do ponto "você está aqui" na ponta esquerda até ≈233. "Você está aqui: 251,9 milhões de anos atrás" e "≈233 milhões de anos atrás" ficam logo abaixo das extremidades. O crescimento da esquerda para a direita a partir do trecho marcado no rodapé continua. Sem listras, cone, parágrafos ou decoração. Nos detalhes, a régua de 1 milhão de anos não mudou. Captura: `capturas/triassico.png` (e `triassico-celular.png`).

## Etapa 2 · cena 1: o mundo ao redor do Eoraptor (11/10/2026)

Pedido de Arthur: ampliar o contexto do Eoraptor com uma peça fóssil real e pouco texto, preservando a etapa 1 e parando após esta cena. Base usada: ZIP `MESOZOICO-v2-pacote-2026-10-11.zip`, revisão 4.4. O site editável está agora em `site/`, com `index.html`, `assets/`, este histórico e as capturas. Nenhum código do site antigo foi importado.

### Composição e interação

A quarta cena, `#ischigualasto`, vem imediatamente depois da prancha do Eoraptor. À esquerda, o crânio parcial ocupa a maior área; à direita, uma coluna curta com a frase “Nas rochas de Ischigualasto, o Eoraptor era parte de uma fauna muito maior”, marcada como Fato, e “Mostrar detalhes”. No celular, a fotografia e sua identificação vêm antes do texto. A cena usa o chão #d3d0c7, tinta #181b1c, Manrope forte, DM Sans e o acento cobalto já aprovados. Não há nicho, reconstrução, paisagem inventada, cartões ou novos elementos de chamada sobre a peça. As chamadas anatômicas impressas na figura científica foram conservadas.

Uma revelação de 650 ms combina opacidade com deslocamento vertical de 14 px apenas na peça. Com movimento reduzido, não há animação. Ao abrir os detalhes, a peça permanece visível no computador enquanto o texto pode rolar; no celular, tudo segue no fluxo. O controle tem aria-expanded/aria-controls; Esc fecha e devolve o foco. A leitura principal é restaurada quando se troca de cena.

A idade da parada é 230 Ma, compartilhada com o Eoraptor. Entre essas duas cenas, usa-se a troca direta existente, sem contador de avanço temporal. A cortina entre tempos diferentes, a transição B de partículas, a navegação e o painel de fontes permanecem. Um ponto temporal compartilhado na linha do tempo abre duas escolhas acessíveis por clique, toque e Tab: Eoraptor e seu contexto. Isso evita dois botões sobrepostos ou um deslocamento falso no tempo. A nova cena é o fim provisório da navegação.

### Conteúdo e fontes consultadas

A leitura aprofundada trata dos grupos registrados, das três biozonas sucessivas, do alcance do censo e da interpretação ambiental. Não há percentuais em destaque ou convertidos em abundância dos animais vivos. O texto distingue o conjunto fóssil de uma comunidade num instante.

- Martínez, Apaldetti, Alcober, Colombi, Sereno, Fernandez, Santi Malnis, Correa e Abelin (2013), *Vertebrate succession in the Ischigualasto Formation*, JVP Memoir 12, pp. 10–30; DOI 10.1080/02724634.2013.818546. Consultados métodos, composição das biozonas, tabela 2 e ocorrências. O censo tem 848 exemplares de 26 táxons dos afloramentos do sul. As biozonas Scaphonyx–Exaeretodon–Herrerasaurus, Exaeretodon e Jachaleria são sucessivas. O nome histórico Scaphonyx permanece apenas no nome da biozona. Fonte: https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/13-JVP-Martinez_et_al-Vert._Succ.pdf
- Martínez e Alcober (2009), *A Basal Sauropodomorph ...*, PLOS ONE 4(2):e4397; DOI 10.1371/journal.pone.0004397. O endereço PMC fornecido apresentou verificação de acesso; o mesmo artigo foi consultado diretamente no editor: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0004397 . As seções Type Locality e Horizon and Age situam Panphagia em Valle Pintado, a 40 m da base. O artigo usa uma idade antiga, não adotada na cena. A localização e os membros citados para Eoraptor seguem o levantamento de 2013; não se equiparam automaticamente Valle Pintado, Cancha de Bochas e Cerro Las Lajas.
- Colombi e Parrish (2008), *Late Triassic environmental evolution in Southwestern Pangea: Plant taphonomy of the Ischigualasto Formation*, PALAIOS 23:778–795; DOI 10.2110/palo.2007.p07-101r. Consultados o registro institucional e o resumo/conclusões do texto indexado; não foi obtido o PDF integral pelo repositório. A síntese na tela limita-se a rios, planícies de inundação, clima sazonal e mudanças de vegetação/umidade, apresentada como interpretação. Fonte institucional: https://repositoriosdigitales.sicyt.gob.ar/vufind/Record/CONICETDig_b5904915d4a8f281b77d8c793afc6f1c

### Peça, crédito, licença e alterações

Imagem escolhida: figura 7g de Desojo e colaboradores (2020), *The Late Triassic Ischigualasto Formation at Cerro Las Lajas (La Rioja, Argentina): fossil tetrapods, high-resolution chronostratigraphy, and faunal correlations*, Scientific Reports 10:12782; DOI https://doi.org/10.1038/s41598-020-67854-1 . A legenda da figura identifica CRILAR-Pv 585, referido como Hyperodapedon sp. nov., crânio parcial em vista lateral esquerda. A interface usa Hyperodapedon sp., sem inventar um nome de espécie.

Autores: Julia B. Desojo, Lucas E. Fiorelli, Martín D. Ezcurra, Agustín G. Martinelli, Jahandar Ramezani, Átila A. S. Da Rosa, M. Belén von Baczko, M. Jimena Trotteyn, Felipe C. Montefeltro, Miguel Ezpeleta e Max C. Langer. Origem do arquivo: https://commons.wikimedia.org/wiki/File:Cerro_Las_Lajas_Hyperodapedon.png . Licença confirmada na ficha: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . Crédito e links estão no painel “Fontes e certezas”, além do crédito breve na legenda.

O original de 2007 × 2332 px permanece em `assets/hyperodapedon-figura-7-original.png`. A derivação `hyperodapedon-crilar-pv585.webp` usa um recorte de 1050 × 750 px, iniciado em x=0, y=710. Máscaras brancas excluem somente fragmentos gráficos dos painéis vizinhos no fundo branco; as chamadas do painel g permanecem. Conversão para WebP, qualidade 95. Sem espelhamento, deformação, geração ou retoque dos ossos. A integração visual usa mix-blend-mode:multiply sobre o chão: isso modifica a aparência tonal na tela, não o arquivo original disponível ao leitor. A barra de escala da figura composta foi deixada no original, sem inventar uma escala isolada para este recorte. O procedimento reproduzível está em `tools/recortar.cjs`, no workspace.

A legenda principal diz que Cerro Las Lajas, La Rioja, é outra exposição da Formação Ischigualasto. A data da navegação contextualiza o Eoraptor; não data o crânio exibido, e a cena não afirma que ele veio da mesma camada nem demonstra coexistência exata.

A fotografia atual de Cancha de Bochas, de Perrito666, foi avaliada na ficha do Commons, com CC BY-SA 3.0 confirmada, mas não incorporada: não era necessária para esta composição. Não foi usada como paisagem triássica. Ficha: https://commons.wikimedia.org/wiki/File:Valle_de_ichigualasto,_cancha_de_bochas.jpg

### Verificação e capturas

Verificação no Edge em modo headless, por arquivo local: sem erros de JavaScript. Conferidos abertura de detalhes, Esc e foco, painel de fontes, ida e volta do Eoraptor, preservação da escolha esquelética, ponto temporal compartilhado, Home/End e transição B. Em contexto móvel, conferidos toque, movimento reduzido e navegação com WebGL desativado. O layout foi inspecionado em 1440×900, 1280×720, 768×1024, 390×844, 360×740 e 844×390; não houve rolagem horizontal na nova cena. O comportamento de toque foi emulado, não testado em aparelho físico.

Comparação adicional em 1440×900, com movimento reduzido: os primeiros 790 px de altura das três cenas originais são idênticos, pixel a pixel, ao HTML 4.4 extraído do ZIP. O rodapé muda apenas o necessário para disponibilizar a quarta cena e a escolha no ponto temporal compartilhado. Registros: `capturas/etapa-2/verificacao.json` e `comparacao-etapa-1.json`.

Capturas finais: `ischigualasto-desktop.png`, `ischigualasto-celular.png`, versões com detalhes abertos e `ischigualasto-fontes.png`, em `capturas/etapa-2/`.

### Pendências

Aguardando a avaliação de Arthur desta primeira cena da etapa 2. Nenhuma próxima cena foi iniciada. A origem/licença das imagens da etapa 1, a ressalva dos braços nas duas figuras do Eoraptor e o problema já registrado do rodapé no Triássico no celular continuam pendentes. A nova imagem tem licença verificada. As fontes tipográficas continuam remotas, conforme a base 4.4. Não houve publicação nem push no GitHub.

## Revisão da cena “O mundo ao redor do Eoraptor” · 11/10/2026

Esta revisão substitui a decisão anterior de usar a figura anatômica como foco inicial. As três cenas aprovadas, os controles, a linha do tempo e as transições continuam na mesma implementação. Nenhuma cena seguinte foi iniciada.

### Leitura inicial e composição

Título: “Vizinhos bem diferentes.” Texto: “As rochas de Ischigualasto guardam fósseis do Eoraptor e de animais bem diferentes dele, como os rincossauros, que comiam plantas.” A frase descreve o registro fóssil; não afirma que todos os exemplares vieram da mesma camada ou conviveram no mesmo instante.

A reconstrução inteira aparece grande sobre o chão de gesso, com uma coluna curta de texto no computador. No celular, imagem, identificação, mensagem e botão aparecem nessa ordem. Não há nicho, ficha, cartões, abreviações anatômicas nem legenda extensa na leitura inicial. A legenda identifica a imagem como reconstrução e nomeia o artista. O rótulo da nova cena no rodapé agora diz apenas “Ischigualasto”; o marcador interno continua compartilhado com o Eoraptor, sem salto temporal adicional.

Mantida uma única revelação curta de 650 ms, por opacidade e deslocamento de 14 px, aplicada apenas à imagem principal. Com movimento reduzido, ela aparece imediatamente. A imagem nova é PNG e o movimento usa CSS; a cena não depende de WebGL. A figura científica foi transferida para “Mostrar detalhes”, com identificação, procedência e explicação das letras. O texto de frequência continua restrito à amostra de fósseis estudada, sem porcentagens nem equivalência com a quantidade de animais vivos.

### Imagem escolhida e licença

Petr Menshikov, **Hyperodapedon sanjuanensis**, reconstrução digital em vida, obra de 17/06/2023. Arquivo original de 1618 × 770 disponível no [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hyperodapedon_sanjuanensis.png), publicado pelo usuário Sittaco em 18/06/2023. Autoria, identificação e licença **CC BY-SA 4.0** conferidas na ficha e no histórico do arquivo. A data é a da ilustração, não a idade de um fóssil. A procedência do arquivo é artística; ele não é uma fotografia de exemplar coletado em Ischigualasto nem uma reconstrução vinculada a um número de coleção.

O PNG foi mantido integralmente em `assets/hyperodapedon-menshikov.png`, sem recorte, retoque, espelhamento ou deformação. Exibição com redimensionamento proporcional e CSS multiply para integrar o branco ao fundo; esse modo de mistura altera os tons apresentados. A apresentação adaptada da imagem permanece sob [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Nenhuma imagem foi gerada por IA nesta revisão.

A espécie está documentada na Formação Ischigualasto; a referência adicional é [Gentil e Ezcurra (2018), Ameghiniana 55(2):137–149](https://ri.conicet.gov.ar/bitstream/handle/11336/98098/CONICET_Digital_Nro.fd99851d-01dc-4fed-b425-38c3113bd4d3_P.pdf?isAllowed=y&sequence=5), com resumo e identificação da origem consultados. Rincossauros são caracterizados como quadrúpedes robustos e herbívoros. A reconstrução não documenta a cor, o padrão da pele ou tecidos moles do animal fossilizado; são escolhas do artista. Ela não foi apresentada como reconstituição do crânio fotografado nos detalhes.

### Fotografia mantida nos detalhes

CRILAR-Pv 585, referido como *Hyperodapedon* sp. nov. na legenda da figura 7g de Desojo e colaboradores (2020): crânio parcial em vista lateral esquerda, de **Cerro Las Lajas, La Rioja**, outra exposição da Formação Ischigualasto. Não foi atribuído a *H. sanjuanensis*, à camada do Eoraptor anterior nem ao exemplar que teria servido de base para a ilustração.

Crédito completo: Julia B. Desojo, Lucas E. Fiorelli, Martín D. Ezcurra, Agustín G. Martinelli, Jahandar Ramezani, Átila A. S. Da Rosa, M. Belén von Baczko, M. Jimena Trotteyn, Felipe C. Montefeltro, Miguel Ezpeleta e Max C. Langer. [Artigo](https://doi.org/10.1038/s41598-020-67854-1), [arquivo no Commons](https://commons.wikimedia.org/wiki/File:Cerro_Las_Lajas_Hyperodapedon.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Mantido o recorte do painel g e a conversão PNG → WebP, excluindo fragmentos gráficos dos painéis vizinhos no fundo branco, sem retocar os ossos. Letras e linhas originais foram preservadas. A escala não está no recorte; o link para a figura completa com escala continua disponível. CSS multiply altera a apresentação tonal. Todos esses créditos e ressalvas estão tanto nos detalhes quanto em “Fontes e certezas”.

### Candidatas não adotadas

O esqueleto de Michigan, fotografado por Daderot e disponibilizado em domínio público, tem uma etiqueta que indica procedência brasileira. A montagem de Tübingen, fotografada por Ghedoghedo sob CC BY-SA 3.0, não teve sua localidade de coleta vinculada documentalmente à foto. Nenhuma dessas imagens foi apresentada como peça de Ischigualasto. A reconstrução de Nobu Tamura, CC BY-SA 4.0 e identificada como *H. sanjuanensis*, tem somente 600 × 450 pixels e uma figura humana sobreposta; foi preterida na composição. Referências e avaliação das candidatas em `pesquisa-imagens/candidatas.md`, no workspace de trabalho.

### Capturas e pendências desta revisão

Capturas no Edge em 1440 × 900, 390 × 844 e 360 × 740, em `capturas/revisao-cena-1/`. Inspeção visual da leitura inicial, dos detalhes e da fotografia: animal inteiro e reconhecível, texto e botão visíveis na primeira tela móvel; sem rolagem horizontal nas dimensões capturadas. As capturas foram feitas com movimento reduzido para registrar a composição estática. Não foi repetida a bateria funcional da versão anterior nem feito teste em aparelho físico nesta revisão.

Pendência: avaliação visual desta revisão pelo usuário. As pendências anteriores das imagens e do rodapé da etapa 1 continuam registradas no histórico. Nenhuma publicação ou envio externo realizado.

### Ajuste de identificação e frequência · 11/10/2026

Alterada apenas a cena de Ischigualasto. Junto à imagem, identificação destacada: “Hyperodapedon · rincossauro, não dinossauro”; nome científico completo e indicação de reconstrução em vida na legenda secundária. Título: “O vizinho mais frequente nos fósseis”. A frase curta restringe a comparação à amostra estudada das camadas mais antigas.

Conferida a tabela 2 de Martínez e colaboradores (2013): na primeira biozona, 456 exemplares do rincossauro chamado Scaphonyx sanjuanensis no artigo e 10 de Eoraptor lunensis. A discussão o identifica como o táxon mais frequente dessa amostra. Os detalhes explicam que Eoraptor é outro animal, um dinossauro, e que a frequência dos fósseis não equivale à quantidade de animais vivos. O apêndice 2 mantém Scaphonyx e discute a combinação com Hyperodapedon; essa diferença de nomenclatura ficou registrada nos detalhes e nas fontes.

Imagem atual preservada: PNG lateral completo de Petr Menshikov, sem recorte, espelhamento ou retoque; redimensionamento proporcional e mistura multiply na tela, conforme crédito anterior. A ficha da variante “(2, flipped)” indicada pelo usuário também declara CC BY-SA 4.0, mas essa variante não substituiu a imagem atual. Links para ambas as fichas e para a licença em “Fontes e certezas”. Créditos dos detalhes mantêm CC BY-SA 4.0 e agora dizem expressamente que cor e pele não são conhecidas pelo fóssil mostrado.

As três cenas aprovadas e toda a navegação foram preservadas. Sem novos controles, gráficos ou percentuais na leitura principal. Capturas atualizadas em `capturas/revisao-cena-1/`.

## Fim do Triássico · maquete A implementada · 11/10/2026

O usuário escolheu **A · As rochas que ficaram** e autorizou sua integração à prévia principal. A cena vem depois de Ischigualasto, no limite Triássico–Jurássico. Mantidas as três cenas da etapa 1 e a cena aprovada de Ischigualasto, incluindo suas imagens, textos e detalhes.

### Leitura e navegação

Fundo de basalto, tipografia aprovada e frase “O Triássico começou depois de uma extinção. Terminou com outra.”. A leitura principal acrescenta somente “Uma nova crise atingiu a vida em terra e no mar.”, a referência de 201,4 milhões de anos e a identificação da fotografia. “≈29 milhões de anos depois de Ischigualasto” e “De ≈230 a 201,4 milhões de anos atrás” tornam explícito o intervalo aproximado entre as cenas; 28,6 milhões foi arredondado e a idade de partida já é aproximada.

A nova parada usa a escala existente, em 201,4 Ma, com o rótulo “Início do Jurássico”. O ponto de 230 Ma continua compartilhado pelo Eoraptor e por Ischigualasto. Ajustada sua condição de destaque para não permanecer ativo na nova parada. Mantidos os controles, os gestos, o painel de fontes e as transições existentes. Não foi criada outra cena posterior.

### Fotografia e movimento

Fotografia atual de Five Islands Provincial Park, Nova Escócia, Canadá: North Mountain Basalt, do início do Jurássico, sobre a Formação Blomidon, com rochas depositadas entre o fim do Triássico e o começo do Jurássico. North Mountain integra a CAMP. A imagem não é uma vista de Ischigualasto nem uma representação da crise ou de uma erupção.

Legenda inicial adotada: “Paisagem atual de Five Islands, Nova Escócia; basalto do início do Jurássico sobre rochas depositadas entre o fim do Triássico e o começo do Jurássico.” Não há linha, seta ou marca atribuindo ao contato visível o limite exato de 201,4 Ma.

Crédito legível junto da imagem: **Michael C. Rygel via Wikimedia Commons · CC BY-SA 3.0**, com links para a [ficha original](https://commons.wikimedia.org/wiki/File:Five-Islands.jpg) e a [licença](https://creativecommons.org/licenses/by-sa/3.0/). Autor, origem própria e licença foram conferidos na rodada de maquetes. O original JPEG de 2272 × 1704 está preservado em `assets/five-islands.jpg`, sem espelhamento, retoque ou filtro. A exibição usa recorte de enquadramento por CSS, diferente no computador e no celular, sem deformação; essa apresentação adaptada mantém CC BY-SA 3.0. O original completo pode ser aberto nos detalhes. A ficha e os metadados contêm datas divergentes, por isso não foi atribuída uma data exata à tomada fotográfica.

Apenas a fotografia faz uma entrada suave por opacidade em 600 ms, sem deslocamento, zoom, deposição, erupção ou desaparecimento de organismos. Com movimento reduzido, a nova cena e a fotografia aparecem diretamente. O efeito usa CSS e não depende de WebGL.

### Ciência nos detalhes e nas fontes

“Mostrar detalhes” separa o registro da crise biológica, a proximidade temporal com os pulsos da CAMP e as hipóteses sobre os mecanismos. Perdas de diversidade em terra e no mar são apresentadas como registro da crise; as datações e correlações sustentam a associação temporal com o magmatismo. Aquecimento, acidificação e resfriamentos breves por aerossóis são tratados como mecanismos investigados, com contribuições ainda discutidas.

**201,4 ± 0,2 Ma**, conforme a carta ICS 2026/06, refere-se ao limite formal entre os períodos. Não corresponde a um instante único em que todos os organismos desapareceram, à idade de todos os derrames ou ao contato fotografado. A crise antecede o limite formal.

Fontes já reunidas em `LEITURA-E-FONTES.md`, incorporadas também a “Fontes e certezas”: [ICS 2026/06](https://stratigraphy.org/ICSchart/ChronostratChart2026-06.pdf); Blackburn e colaboradores (2013), Science 340:941–945, [DOI 10.1126/science.1234204](https://doi.org/10.1126/science.1234204); [Davies e colaboradores (2017)](https://www.nature.com/articles/ncomms15596), Nature Communications 8:15596; [Capriolo e colaboradores (2020)](https://www.nature.com/articles/s41467-020-15325-6), Nature Communications 11:1670; [Kent e colaboradores (2024)](https://doi.org/10.1073/pnas.2415486121), PNAS 121:e2415486121. Nenhuma figura científica foi reutilizada.

### Capturas e pendências

Inspeção visual em Edge, nas dimensões 1440 × 900, 390 × 844 e 360 × 740, com movimento reduzido. Capturas em `capturas/fim-triassico/`, incluindo leitura inicial, detalhes e painel de fontes. Legenda e crédito fora da imagem, com 14 e 13 px no celular, respectivamente. Sem rolagem horizontal nas dimensões capturadas; em telas mais baixas, a cena permite rolar até o crédito e os detalhes. O cabeçalho recebe fundo escuro apenas nesta cena para manter os controles legíveis durante a rolagem.

Não foi executada bateria de testes funcionais nesta rodada nem teste em aparelho físico. Pendente a avaliação visual do usuário. As pendências anteriores da etapa 1 continuam registradas no histórico. Nenhuma publicação ou envio ao GitHub foi feito.

## Bloco do Jurássico · 11/10/2026

A cena do fim do Triássico foi aprovada pelo usuário. Autorizada a pesquisa, a escolha editorial e a implementação de até três cenas seguintes na prévia principal, sem pedidos intermediários de aprovação. Implementadas três cenas, encerrando a rodada no Jurássico Superior.

### Sequência escolhida

1. **Depois da crise, os rastros continuam.** Jurássico Inicial, contexto aproximado de ≈201 Ma, atual Utah. Frase central: sobrevivência e expansão são etapas distintas. Uma pegada fóssil de Eubrontes na Formação Moenave permite mostrar presença de dinossauros sem inventar a espécie produtora. Texto principal: “Dinossauros atravessaram a extinção. Sua expansão envolveu mudanças no clima, na distribuição e nos próprios animais.” Fundo de gesso, título central no computador, vestígio vertical isolado com espaço ao redor; a escala vermelha do arquivo de origem fica fora do enquadramento inicial e disponível no original ligado nos detalhes.
2. **Os grandes saurópodes ganham espaço.** Jurássico Inicial, ≈179 Ma, Patagônia. Frase central: uma etapa posterior da mudança entre os herbívoros, numa linhagem que já existia no Triássico. A foto de montagem reconstruída de Bagualia no MEF concentra cabeça, pescoço e tronco. Texto principal: “Seus parentes já existiam no Triássico. Agora, pescoços longos e dentes robustos ganham destaque entre os herbívoros da Patagônia.” Composição escura, texto à esquerda e fotografia alta à direita; sem nicho, ficha de espécie, medida gigante ou reconstrução em vida inventada.
3. **As rochas guardaram mais que dinossauros.** Jurássico Superior, ≈150 Ma, atual Utah. Frase central: ossos e plantas permitem investigar um ecossistema e o processo que preservou seus restos. Fotografia integral de tronco e ossos na Carnegie Quarry, Formação Morrison. Texto principal: “Um tronco entre ossos conta parte da história de um ambiente com rios, plantas e grandes herbívoros.” Fundo de argila, título em cima, imagem em proporção 4:3 e mensagem curta ao lado. Não repete a faixa fotográfica horizontal do fim do Triássico.

As três cenas foram escolhidas porque acrescentam presença após a crise, transformação dos herbívoros e contexto de ecossistema. Não foi inserida uma passagem adicional pelo Jurássico Médio que repetisse a segunda ideia. Utah e Patagônia aparecem identificados e separados no tempo; não foram reunidos como vizinhança nem como sequência de ancestrais diretos.

### Fontes, diferenças de interpretação e imagens

Pesquisa, referências completas, créditos e licenças estão em **`JURASSICO-FONTES.md`** e no painel “Fontes e certezas” das respectivas cenas. Principais fontes primárias: Milner e colaboradores (2009), DOI 10.1371/journal.pone.0004591; Dunne e colaboradores (2023), DOI 10.1016/j.cub.2022.11.064; Griffin e Nesbitt (2020/2019), DOI 10.1002/ar.24130; Pol e colaboradores (2020), DOI 10.1098/rspb.2020.2310; Apaldetti e colaboradores (2018), DOI 10.1038/s41559-018-0599-y; Carpenter (2013), Annals of Carnegie Museum 81(3):153–232.

Olsen e colaboradores (2002) foram consultados para registrar a diferença entre o aumento rápido de tamanho inferido do registro regional de pegadas e a interpretação posterior de um processo prolongado. O bloco não apresenta a extinção como causa única, imediata ou suficiente. A relação de clima e expansão geográfica dos sauropodomorfos em Dunne é inferida de fósseis e modelos; não é uma rota demonstrada pela pegada de terópode exibida.

O nível de Bagualia foi situado em 179,17 ± 0,12 Ma; a cena arredonda e distingue esse contexto da CAMP e da crise do fim do Triássico, cerca de 22 milhões de anos antes. O registro inclui linhagens de sauropodomorfos gigantes já no Triássico. Alimentação com plantas fibrosas, mudanças ambientais e sucesso dos eusaurópodes são tratados com a cautela interpretativa do estudo, sem proclamar Bagualia o primeiro gigante. A idade de ≈150 Ma é uma contextualização do depósito de Utah: a data de 148,98 ± 0,12 citada por Carpenter para cinza abaixo do nível não foi aplicada a cada fóssil nem recalibrada por conta própria. Aproximadamente 29 milhões de anos separam as duas últimas cenas.

Imagens com dados conferidos nas fichas de origem:

- **Mark A. Wilson (Wilson44691)**, [Eubrontes01.JPG](https://commons.wikimedia.org/wiki/File:Eubrontes01.JPG), fotografia própria, 19/07/2008, domínio público por declaração do autor. Formação Moenave, St. George Dinosaur Discovery Site, Utah. Original 1000 × 1450 preservado; enquadramento CSS retira a faixa superior vermelha de escala, sem retocar o vestígio, espelhar ou filtrar. Número de catálogo e horizonte individual não constam da ficha; a foto não foi atribuída à trilha numerada descrita no artigo. A classificação e a idade são contextualizadas nos detalhes.
- **Rique**, [MEF Bagualia.jpg](https://commons.wikimedia.org/wiki/File:MEF_Bagualia.jpg), fotografia própria, 05/02/2025, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Identificação corroborada pela página institucional do MEF, que descreve a peça como réplica. Original 2388 × 2890 preservado; corte CSS em cabeça, pescoço e tronco, sem espelhamento, filtro ou retoque. Não é um esqueleto original completo, e a postura não é observação direta do animal vivo. Mural e cenário ao fundo da fotografia completa não foram usados como evidência de coexistência.
- **James St. John**, [Fossil log & dinosaur bones… 6](https://commons.wikimedia.org/wiki/File:Fossil_log_%26_dinosaur_bones_(Morrison_Formation,_Upper_Jurassic;_Carnegie_Quarry,_Dinosaur_National_Monument,_Utah,_USA)_6_(48724236123).jpg), [origem no Flickr](https://www.flickr.com/photos/jsjgeology/48724236123/), 09/06/2012, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Licença também registrada pela revisão Flickr do Commons. Original 4000 × 3000 preservado e exibido proporcionalmente, sem recorte final, espelhamento, filtro ou retoque. Tronco e ossos no depósito da Carnegie Quarry; nenhuma espécie foi atribuída a um osso apenas pela aparência. Marcas claras são parte da fotografia original.

Todos os créditos ficam junto das peças com links; procedência, alterações e ressalvas também constam dos detalhes e das fontes. Nenhuma imagem gerada por IA foi usada. Não foram reutilizadas figuras anatômicas de artigos na leitura principal.

### Movimento e integração

Um movimento curto por cena: opacidade do vestígio (650 ms); entrada da montagem com opacidade e deslocamento de 12 px (700 ms); pequeno afastamento de 2,5% para observar madeira e ossos em conjunto (800 ms), terminando no enquadramento integral. A entrada espera 450 ms pela liberação da cortina já existente. Nada simula escavação, migração, crescimento, erupção ou deposição. Movimento reduzido apresenta tudo diretamente; os efeitos novos são CSS, sem dependência de WebGL.

Navegação anterior mantida. As duas paradas do Jurássico Inicial compartilham um seletor, ancorado em ≈179 Ma, para evitar alvos sobrepostos entre ≈201 e 201,4 na escala da viagem. O alfinete continua nas posições temporais reais, e o menu identifica as duas idades aproximadas. ≈150 Ma recebe parada direta. O botão Avançar da cena aprovada do fim do Triássico agora segue para o bloco novo; a última cena mostra “Continua em breve”. Fontes, lentes, teclado, voltar e gestos usam a implementação existente.

### Inspeção visual e pendências

Capturas em Edge com movimento reduzido, em 1440 × 900, 390 × 844 e 360 × 740, incluindo as leituras iniciais, detalhes e fontes; arquivos em `capturas/jurassico/`. Nos celulares, título, peça, crédito, mensagem e lente são empilhados. Créditos em 13 px e identificação em 14 px, fora das imagens. Ajustados altura da peça e espaços em telas mais baixas. Sem rolagem horizontal nas dimensões capturadas. O depósito da terceira cena foi reduzido no computador para manter sua legenda e crédito acima da navegação.

As seções das cinco cenas anteriores e seus estilos foram preservados; alterações compartilhadas se restringem à inclusão das novas paradas, do seletor e das lentes, ao painel de fontes e à descrição geral do documento. Não houve bateria de testes funcionais nem inspeção em aparelho físico nesta rodada. Pendente avaliação do bloco pelo usuário, sobretudo reconhecimento da pegada, identificação da montagem como reconstrução e leitura do tronco entre os ossos. As pendências históricas da etapa 1 permanecem registradas. Nenhuma publicação ou envio ao GitHub. Não se avançou para o Cretáceo.


Revisão final da cronologia: Suarez e colaboradores (2025), [A revised chronostratigraphy of the Triassic-Jurassic Moenave Formation, western USA](https://doi.org/10.1130/B37784.1), GSA Bulletin 137:5009–5027. Resumo e conclusões lidos na [cópia depositada pelo coautor Andrew Milner](https://www.researchgate.net/publication/392578912_A_revised_chronostratigraphy_of_the_Triassic-Jurassic_Moenave_Formation_western_USA_Implications_for_timing_of_continental_climate_change). O Membro Whitmore Point é situado no começo do Jurássico; as idades de zircões são máximas de deposição e não uma datação da pegada. Adotado ≈201 Ma como posição contextual, substituindo o ≈198 Ma histórico do estudo de 2009. Suarez, Knobbe, Crowley, Kirkland e Milner (2017), [EPSL 475:83–93](https://scholarworks.boisestate.edu/geo_facpubs/376/), já indicavam a revisão por zircões detríticos. A ficha da foto não informa o horizonte individual, e essa incerteza permanece nos detalhes e no painel de fontes.


## Revisão das três cenas do Jurássico · 12/10/2026

Escopo: só as cenas `jurassico-rastros`, `jurassico-gigantes` e `jurassico-mundo`. Cenas anteriores, sequência, navegação e fontes verificadas ficaram como estavam; não há cena do Cretáceo. Capturas antes e depois em `capturas/revisao/` (Chromium com fontes substitutas, porque o Google Fonts não carrega no ambiente de teste; movimento reduzido).

### Pegada
- Busca de fotos melhores do mesmo sítio (St. George Dinosaur Discovery Site, Moenave): `Gigandipus.JPG` (mesmo autor e data, domínio público) mostra o pé inteiro, mas corta um dedo no quadro e não ficou mais legível no tamanho da cena. Descartadas: `Dinosaur track.jpg` (Tuba City, Arizona, outro sítio e outro intervalo da formação), `Eubrontes resting trace.png` (figura de artigo com esquema, CC BY 2.5, conta outra história), `Dinosaur tracks - Grallator.jpg` (laje de museu, marcas minúsculas, CC BY-SA 2.0) e a vista geral do sítio (marcas pequenas demais).
- **Foto mantida** (Mark A. Wilson, Eubrontes01.JPG), mesmo recorte.
- **Contorno opcional**, ligado por padrão, com botão "Contorno dos dedos". Desenhado por cima da foto só nas bordas visíveis dos três dedos; o topo dos dedos e o calcanhar ficaram sem traço, para não completar rocha ambígua e não inventar dedos. A foto original e o recorte não foram alterados.
- **Texto principal**: separa o que a foto mostra (três dedos, um terópode passou por ali no Jurássico Inicial) do que vem de muitos estudos (sobrevivência e expansão dos dinossauros). Não atribui a pegada a uma espécie nem usa a foto como prova de migração. Detalhes reorganizados em "O que a foto mostra" e "O que vem de outros estudos".

### Bagualia
- Quatro enquadramentos comparados: recorte anterior, foto inteira e dois recortes intermediários. **Foto inteira escolhida**: o pedestal e as quatro pernas mostram que é uma montagem de museu; o pescoço e a cabeça continuam em destaque. A iluminação da sala e o painel ao fundo continuam na foto (sem filtro ou retoque); a identificação "Montagem reconstruída" foi mantida.
- Título agora "Na Patagônia, os saurópodes ganham espaço" e o item do menu "Saurópodes na Patagônia", para não sugerir que a mudança foi simultânea em todos os continentes. Texto principal só descreve o que se vê. Dentes e alimentação passaram para a seção de hipótese, com a fonte, rotulados como interpretação. Detalhes dizem que o registro é regional.

### Tronco e ossos
- Oito fotos da mesma série de James St. John comparadas (nº 1 a 8). **Mantida a nº 6**: tronco inteiro, nítido e largo no quadro e ossos bem separados da rocha. As nº 1 a 3 mostram mais vértebras, mas com o tronco menor e mais sombras; as nº 7 e 8 são faixas recortadas.
- Composição própria: faixa panorâmica recortada por CSS do mesmo arquivo, texto e controles em coluna ao lado (as outras duas cenas usam título centralizado ou texto à esquerda). Dois marcadores, "1 Tronco" e "2 Osso", que ampliam a região por clique ou toque e voltam com "Voltar à vista inteira" ou Esc. Botão "Marcações" desliga tudo; o link "original sem marcações" abre o arquivo inteiro.
- Nenhuma espécie atribuída a osso. O texto do marcador 2 diz que a foto não permite dizer qual animal ou parte do esqueleto.
- Texto inicial curto; os detalhes explicam que o depósito reúne restos acumulados ao longo de episódios, não uma foto de todos os organismos vivos juntos.

### Limites declarados
- O osso marcado (2) só é reconhecido como osso pelo rótulo; sem ele, o objeto parece um bloco de rocha para quem não conhece o material. O tronco (1) é reconhecível sem ajuda.
- No celular de 360 × 740 a Bagualia ficou menor e o botão "Mostrar detalhes" fica abaixo da dobra (a cena rola).
- Não houve teste em aparelho físico nem teste funcional completo; verificados: sem rolagem horizontal em 1440, 1920, 768, 390 e 360 de largura, zoom por clique/toque, desligar marcações e contorno.


## Revisão de design das três cenas do Jurássico · 12/10/2026

Escopo: só composição, proporção, espaçamento e hierarquia tipográfica de `jurassico-rastros`, `jurassico-gigantes` e `jurassico-mundo`. Fotos, contorno, marcadores, controles, interação, datas, fatos, navegação e cenas anteriores não foram alterados. Nenhum ornamento, efeito ou componente novo. Capturas de antes (revisão anterior) e depois em `capturas/revisao-design/` (Chromium, fontes substitutas, movimento reduzido; 1440×900, 390×844 e 360×740).

### Linguagem comum às três cenas (só o que mudou)
- Botões secundários ("Mostrar detalhes", "Contorno dos dedos", "Marcações", "Voltar à vista inteira") passaram a compartilhar uma mesma regra: mesma altura mínima, mesmo preenchimento, mesmo corpo de texto e cor de texto plena.
- Legenda e crédito: mesma distância da imagem (14 px) e mesmo espaçamento entre as duas linhas nas três cenas. Distância entre texto e botão de detalhes ajustada para 24 px.
- A identidade de cada cena (fundo, posição do título e do texto) foi mantida.

### Pegada
- Texto principal dividido em dois níveis visuais, sem mudar as palavras: a frase sobre o que a foto mostra ficou em peso médio e cor plena; a ressalva sobre estudos ficou em corpo menor e cor mais suave, em linha própria.
- Medida do texto mais curta (26 em), entrelinha menor, colunas e espaço entre elas ajustados; foto um pouco maior no computador.
- "Mostrar detalhes" e "Contorno dos dedos" agora ficam juntos, abaixo do texto, e não separados por quebra de linha solta.
- Celular: foto no tamanho que deixa os dois controles acima da barra inferior. Em 360×740 a foto é pequena (≈118 px de largura); foi o preço de manter os dois controles visíveis.

### Bagualia
- A foto atual foi mantida: não há outra fotografia da mesma montagem no Commons com identificação e licença confirmadas. Enquadramento alterado de 2388 px para 2158 px de largura (recorte à esquerda), que retira o painel informativo e o fragmento da cauda e aumenta o corpo, com as quatro pernas e o pedestal visíveis. A foto em si não foi editada.
- O que não mudou: a sala de museu (caixa iluminada com outro fóssil, vigas do teto) segue competindo com o esqueleto; um recorte retangular não a remove sem cortar as pernas.
- Texto principal encurtado: "Pescoço longo, tronco largo e quatro pernas: a montagem de Bagualia, saurópode da Patagônia de cerca de 179 milhões de anos atrás." A descrição do esqueleto montado passou para os detalhes, rotulada como fato.
- Altura da imagem um pouco maior no computador; menor no celular de 360×740.

### Tronco e ossos
- Foto, marcadores e interação mantidos. Texto à direita alinhado com o topo da foto; espaço entre texto, botão e área de leitura dos marcadores reorganizado, com um fio fino separando a área dos marcadores no computador. O fio não aparece no celular.
- Altura mínima da área de leitura e distância do botão "Marcações" ajustadas; no celular, a imagem ficou do mesmo tamanho.

### Limites
- Fontes substitutas e nenhum aparelho físico. Em 360×740 as legendas das cenas 2 e 3 ficam próximas da barra inferior, e, com zoom ativo no celular, o crédito da foto do tronco encosta nela.
- Não se avançou para o Cretáceo.


### Ajuste final: celulares estreitos (360×740 e 390×844)
- **Foto da pegada**: voltou ao tamanho de antes da compactação (largura até 232 px, 60 % da tela) em todos os celulares. Foi desfeita a redução para ≈118 px e removidos os ajustes que comprimiam textos, botões e margens só para caber em 740 px de altura. Também voltaram ao tamanho anterior a foto da Bagualia (até 220 px) e os títulos.
- **Rolagem dentro da cena**: a cena já tinha rolagem vertical; agora o conteúdo simplesmente rola quando não cabe, com a barra de navegação inferior fixa. Toque ou roda do mouse rolam a cena antes de trocar de cena, como já era.
- **Espaço no fim**: o preenchimento inferior das cenas Jurássicas em tela estreita subiu de 24 para 40 px, além da reserva da barra inferior. Medido com a cena rolada até o fim: o último botão, legenda ou crédito termina de ≈52 px (390×844) e ≈52 px (360×740) acima da barra, nas três cenas e com o zoom do tronco aberto.
- Só regras de celular foram mexidas. Computador, fotos, textos científicos, marcações e interações ficaram como estavam; nenhuma busca de fotos foi reaberta.
- Capturas finais (topo e fim de cada cena, e tronco com zoom): `capturas/revisao-design/celular-final/`.
- Limite: com 360×740 a cena da pegada exige rolar cerca de 215 px para chegar aos controles; no topo, o texto e os botões ficam parcialmente sob a barra até rolar.


## Integração de Sophie no principal · 12/10/2026

O principal foi atualizado a partir de `maquetes/pranchas-2026-10-12/referencia/MESOZOICO`, extração do ZIP MESOZOICO-design-jurassico-v2_2 fornecido pelo usuário. O `site/index.html` anterior era mais antigo. Esta escolha preserva as últimas revisões aprovadas de pegada, enquadramento de Bagualia, depósito com zoom e espaçamento móvel. Backup completo antes da atualização: `maquetes/backup-site-antes-sophie-2026-10-12/`. As sete primeiras seções de cena foram comparadas com a referência: conteúdo integral preservado. Estilos da referência permanecem, com novas regras restritas à Sophie e ao seletor compartilhado.

Sophie foi inserida entre Bagualia e tronco/ossos. Identidade, superfície mineral, mensagem, imagens integrais, multiply, espelhamento uniforme da fotografia e controles vêm da maquete aprovada `maquetes/sophie-arte-2026-10-12/proposta.html`. O palco desktop mantém 620 px, como a maquete aprovada, para conservar o animal dominante. A cena rola para alcançar controles e créditos acima da navegação fixa. No móvel a peça precede a mensagem, com rolagem interna. Links e texto de avaliação isolada foram retirados. “Fontes e certezas” abre as fontes específicas de Sophie no painel compartilhado; evidências e créditos completos também abrem dentro da cena.

Ambas as cenas finais mantêm `age:150`. Um seletor no mesmo ponto da linha apresenta “Stegosaurus · Sophie · ≈150 Ma” e “Tronco e ossos · Utah · ≈150 Ma”. Avançar/Voltar e teclado percorrem Bagualia → Sophie → depósito. A passagem entre Sophie e Utah é direta, sem contador que invente diferença de idade. A parada é contexto aproximado, não datação do indivíduo nem equivalência entre camadas. A frase antiga que ligava diretamente Bagualia ao depósito foi ajustada: Sophie vem do Wyoming; o depósito Carnegie é de Utah, outro local e outro conjunto de restos.

A primeira visita sem preferência mostra o esqueleto por 3 segundos depois da decodificação e da liberação da cortina de entrada, seguida de linha e máscara de 1,8 segundo. Manual cancela o temporizador e guarda a escolha na sessão; revisitas e recarga respeitam a última escolha. Ao sair da cena, temporizadores são cancelados. Movimento reduzido abre em vida, sem varredura, e permite escolhas instantâneas. Nenhuma passagem de representação avança a cena.

### Evidência, fontes e licenças

Maidment, Brassey e Barrett (2015), [PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0138352): NHMUK PV R36730, Stegosaurus stenops, Red Canyon Ranch Quarry perto de Shell, Wyoming, Formação Morrison; maturidade incompleta, partes completadas e limites de correlação estratigráfica. Tafonomia de água parada é interpretação sustentada pelos sedimentos, moluscos e articulação. [Hayashi et al. (2012)](https://doi.org/10.1111/j.1475-4983.2011.01122.x) sustenta a discussão de funções das placas; não se atribui função única.

[Foto Maidment/NHM](https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_mounted_skeleton.jpg), CC BY 4.0; [reconstrução Fred Wierum, 2022](https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_Life_Reconstruction.png), CC BY-SA 4.0. A apresentação da ilustração mantém CC BY-SA 4.0. Os dois arquivos finais são idênticos aos originais aprovados, conferidos byte a byte. Não foram usadas saídas imagegen rejeitadas. Multiply modifica tons percebidos, sem alterar arquivos nem criar transparência. Foto espelhada somente por CSS; poses e perspectiva continuam distintas. A linha é passagem entre representações, sem registro anatômico ponto a ponto. Cor e tecidos moles continuam identificados como propostas. Créditos curtos junto à peça; autoria, licenças, alterações e originais nos detalhes. Pesquisa anterior preservada em `SOPHIE-FONTES.md` como registro histórico da maquete.

### Verificação solicitada e limites

Edge em 1440×900, 390×844 e 360×740, diretamente no arquivo offline. Capturas da sequência pegada, Bagualia, Sophie e depósito, no topo e no fim, em `capturas/sophie-integrada/`. Verificados seletor compartilhado, navegação até Utah e retorno, esqueleto inicial, varredura automática, escolha manual, persistência, movimento reduzido e ausência de avanço automático e rolagem horizontal. Resultados em `verificacao.json` e `verificacao-final.json`. A rodada final confirma palco de 620 px no computador e 210 px no móvel, cancelamento manual antes da passagem, percurso Bagualia → Sophie → Utah → Sophie e vista adicional de 1440×1200. Sem erros de JavaScript registrados. Nenhum aparelho físico. A captura inicial por servidor sandbox não foi usada: Edge fora do sandbox não o alcançou; o resultado final foi conferido offline. As pendências históricas de autoria/licença dos materiais antigos permanecem no documento; esta integração não as resolve. Nenhuma publicação.

O Cretáceo permanece sem cena implementada. A proposta fundamentada está em `PLANO-CRETACEO.md`.



## Sophie · ajuste de posicionamento e passagem · 12/10/2026

Escopo: só a cena `jurassico-sophie` (HTML, CSS e script próprios). As demais cenas ficaram idênticas (conferido por comparação de capturas em 1440 e 390 de largura, com diferença de no máximo 1 pixel de renderização do marcador da linha do tempo). Imagens, créditos, licenças e conteúdo científico não foram trocados.

### Composição
- **Altura real em vez de palco fixo**: o palco de 620 px foi substituído por um bloco de primeira tela com a altura disponível entre a barra superior e a linha do tempo (mínimo de 500 px). Título, metadados, palco e botões dividem essa altura; o palco ocupa o que sobra e o animal é encaixado nele pela altura. Em 1440×900 e 1920×900: animal inteiro, com patas e chão, num quadro de 521 px de altura (do topo das placas ao chão, ≈460 px; no desenho anterior, cortado pelas patas, o quadro tinha 620 px); botões "Esqueleto / Em vida" a 13 px da linha do tempo. Em 1366×768: quadro de 402 px.
- **Reorganização antes de reduzir**: nome e eyebrow à esquerda; data (≈150), espécie, local e número de catálogo numa coluna à direita; o título passou de até 135 px para um tamanho que acompanha a altura da janela (até 12,4 vh); a frase "As placas ficaram…" saiu de cima da cauda e foi para o canto superior direito, onde as duas imagens têm espaço livre. Legenda e botões numa só linha.
- **Rolagem**: Em telas baixas e no celular a cena rola, com reserva de 32 px depois do último texto, mais a reserva da linha do tempo. No celular o palco segue a proporção das imagens (largura total) e os controles vêm abaixo, sem altura fixa.

### Alinhamento das imagens
- As duas imagens passaram a compartilhar um quadro de proporção fixa (3440 × 1570 unidades da ilustração); a foto ocupa 75 % da largura, em escala uniforme (≈1,32 vez a escala da ilustração, sem esticar) e posicionada para coincidir chão, apoio das patas traseiras, quadril e dorso. A cabeça coincide em direção e posição horizontal.
- Diferenças que continuam: o pescoço do esqueleto está mais baixo e a cabeça mais abaixo que na ilustração; a cauda do esqueleto é elevada e a da ilustração, baixa; o esqueleto é de um animal subadulto e as placas e espinhos têm outra distribuição; a perspectiva e o apoio das quatro patas diferem; o esqueleto tem partes completadas. A ressalva "poses e perspectivas diferentes" permanece na legenda e foi ampliada nos detalhes.

### Passagem
- A transição agora é uma única variável de progresso (0 a 1) que controla, no mesmo quadro de animação, a máscara da ilustração (lado esquerdo da linha), a máscara da foto (lado direito) e a posição da linha. Como as duas máscaras são complementares, não há trecho com as duas imagens sobrepostas, nem troca de visibilidade no começo ou no fim. A linha surge e some nos primeiros e últimos 5 % do percurso.
- Só o animal se move: título, textos, botões, créditos e linha do tempo não têm animação.
- Automática: esqueleto visível por cerca de 3 s na primeira entrada (≈2,8 s depois do fim da transição de cena), depois a passagem de 1,7 s. Manual: os dois botões animam nos dois sentidos, com a mesma curva; clicar durante a passagem inverte o movimento a partir do ponto atual, sem salto. A escolha manual é guardada na sessão e aplicada sem animação ao voltar à cena. Com movimento reduzido: mostra a reconstrução direto e os botões trocam sem animação.
- Medidas: 1440×900, pegando o valor da variável a cada quadro: 0 durante a espera, de 0,006 a 1,000 durante a passagem, linha com opacidade 0 em ambas as pontas; interrupção a meio caminho retoma do valor atual.

### Verificação e limites
- 1920×900, 1440×900, 1366×768, 390×844 e 360×740 em Chromium (fontes substitutas; o Google Fonts não carrega no ambiente de teste), sem rolagem horizontal. Capturas e vídeo em `capturas/sophie-ajuste/` (antes e depois, esqueleto e em vida, topo e fim da cena).
- Em 360×740 e em 390×844 a cena rola; no topo, legenda e créditos ficam sob a linha do tempo até rolar. O quadro do animal tem ≈164 px de altura em 360 e ≈178 px em 390, pela largura da tela.
- Quando a linha atravessa o canto direito, passa por trás do texto "As placas ficaram…" (o texto não se move).
- Nenhum aparelho físico. Sem publicação. Cretáceo não implementado.

## Sophie · correção da faixa branca e posição do esqueleto · 12/10/2026

Esta seção substitui as medidas e a descrição de composição dos registros anteriores de Sophie. Base efetiva: `MESOZOICO-v3-sophie-completo.zip (arquivo recebido)`, extraída isoladamente antes de editar; SHA-256 do index dessa base: `df7f82ca76e388b7ad26d5b083d271d4891d49ddcbd8f7599c9f0054ea60614f`. O principal anterior foi guardado em `backups/main-antes-sophie-v3-2026-10-12.zip` no workspace. O principal final deriva da v3 recebida, com alterações limitadas ao CSS de Sophie. Arquivos de imagens, conteúdo científico, créditos, navegação e scripts foram preservados.

O branco é uma borda da composição CSS, não uma linha desenhada no arquivo nem a linha vertical da passagem. As imagens têm posição superior negativa e ultrapassam o fundo do palco com `isolation:isolate`; o trecho que fica sem fundo para multiply mostra o branco original. O recorte no limite superior ainda produzia um filete em coordenadas fracionárias no celular (390×844: linha y228, RGB 221/216/197 sobre fundo 216/211/189). A correção estende o fundo mineral do mesmo palco isolado por um pseudo-elemento e amplia os limites superior/inferior das duas máscaras. As máscaras continuam complementares na horizontal e a linha móvel segue o mesmo progresso. Nenhum pixel dos arquivos foi alterado, nenhum osso foi apagado e a sombra e assinatura da reconstrução permanecem.

O esqueleto passou de left 22,093% para 10,093% do quadro: deslocamento à esquerda de 12% da largura (≈137 px em 1440×900, 46,8 px em 390 e 43,2 px em 360). Escala 75,058%, top −2,548% e proporção original permanecem. A reconstrução mantém left −0,872%, top −5,096%, width 101,744%, escala, apoio e posição aprovados. Dorso, quadril e chão orientam a composição; poses e perspectivas diferentes impedem correspondência anatômica exata.

A passagem conserva o controle único por requestAnimationFrame da v3: cerca de 3 segundos de espera, duração de 1,7 segundo, linha fina, máscaras complementares e reversão desde o progresso atual. Eoraptor foi consultado como referência de ritmo e acabamento; não se alterou seu fundo ou nicho. Escolha manual persistente na sessão, movimento reduzido e ausência de avanço automático preservados.

Evidências atuais em `capturas/sophie-ajuste-v3/`: pares antes/depois com a mesma largura (1440×900, 390×844 e DPR 1,25/2), estados finais em 1440×1200 e 360×740, passagem intermediária, créditos e vídeo WebM real de 14,64 s, reproduzido no Edge (1440×900). `verificacao.json` registra progresso por quadro, primeira mudança após a espera, linha invisível nas pontas, reversão manual, persistência, movimento reduzido, ausência de rolagem horizontal e erros de página. `preservacao.json` compara reconstrução, cenas e arquivos. Depois da correção, a faixa no celular tem exatamente a cor do fundo em todas as linhas y219–231; no desktop, o trecho y193–209 em x900 também. Os estados e a passagem foram inspecionados visualmente. Sem aparelho físico, sem publicação e sem novo servidor. Cretáceo permanece somente no plano.

## Utahraptor · primeira cena integrada do Cretáceo Inferior · 13/10/2026

A cena aprovada de Utahraptor foi acrescentada depois de “Tronco e ossos”, como próxima parada da navegação principal. As cenas anteriores e seus recursos não foram modificados. A régua coloca esta parada em torno de 130 Ma somente como posição contextual dentro do Cretáceo Inferior; a montagem fotografada e os moldes não receberam data individual. A passagem entre cenas indica explicitamente que a posição é aproximada.

A montagem de moldes fotografada por Jaren Wilkey / BYU aparece como recorte transparente sobre o fundo mineral. O recorte foi produzido com remoção de fundo assistida por IA; pode alterar contornos finos e serve apenas à apresentação. A fotografia original permanece local e acessível nos créditos para inspeção. A reconstrução de Fred Wierum é o arquivo integral. As duas imagens têm CC BY-SA 4.0; o recorte é apresentado sob a mesma licença, com autoria, alteração e links declarados. As fichas individuais do Wikimedia Commons foram consultadas em 13/10/2026.

O controle “Montagem / Em vida” usa uma saída de 220 ms e entrada de 280 ms, sem sobreposição ou alinhamento anatômico. Movimento reduzido troca imediatamente. A ampliação da garra foi retirada, pois aumentaria um recorte cujos detalhes finos podem ter mudado. Os rótulos distinguem montagem de moldes, penas inferidas e escolhas artísticas. O texto principal não atribui função certa à garra, penas fossilizadas a Utahraptor nem idade precisa ao exemplar.

A integração foi preparada como alteração local de `index.html`, documentação e três arquivos em `assets/cretaceo/`. Nenhuma publicação foi feita. A prévia renderizada ainda não foi inspecionada no navegador integrado, que bloqueia abertura de `file://`.


## 13/10/2026 · revisão integral e entrega por GitHub

Percorridas as dez cenas do principal, inclusive Utahraptor, em 1440×900, 390×844 e 360×740, estados alternativos, detalhes, fontes, marcações, ampliações e passagens. Corrigidos excesso horizontal de Sophie, rolagem pelo teclado, foco do painel de fontes, Escape nos detalhes nativos e resposta a links de cena. Fontes DM Sans e Manrope agora locais, com SIL OFL e créditos. Conteúdo científico, originais das imagens e composições aprovadas preservados.

A fotografia da abertura está íntegra e carregou em HTTP nos três tamanhos; a falha por arquivo relatada não foi reproduzida nesse contexto. A prévia passa a ter servidor HTTP documentado para reproduzir a hospedagem. Pendências antigas de autoria/licença continuam explícitas.

Git existente auditado sem apagar objetos nem reinicializar. Pacotes, backups, maquetes e evidências temporárias ignorados. Novas entregas somente por GitHub; nenhum ZIP novo. Relatório por cena e limites em REVISAO-2026-10-13.md.

## 13/10/2026 · correção de escopo: Eoraptor restaurado; passagem do Utahraptor

A instrução foi corrigida pelo usuário: o animal a revisar era Utahraptor. Examinados o diff e o histórico, o commit `b0c9330` continha somente a edição equivocada do Eoraptor. Foi revertido por `d909331`, sem reset nem reescrita de histórico: imagem esquelética anterior, HTML, CSS, passagem, créditos e altura móvel restaurados; retirados o esquema gerado, EORAPTOR-FONTES.md, a ferramenta específica e sua exceção no .gitignore. O estado resultante foi comparado a `75ab939`, anterior ao pedido equivocado, sem diferenças nos arquivos restaurados. Alterações independentes da revisão integral e as demais cenas permanecem.

No Utahraptor, inspecionados a fotografia original de Jaren Wilkey / BYU, o recorte transparente existente e a reconstrução de Fred Wierum. O recorte foi mantido para apresentação, sem novo retoque, deformação, espelhamento, completamento ou geração. A remoção de fundo anterior, assistida por IA, pode ter alterado detalhes finos; a ressalva e a fotografia integral continuam acessíveis. A cena identifica montagem de moldes, não esqueleto original completo. As fichas originais do Wikimedia Commons foram novamente consultadas: [fotografia BYU](https://commons.wikimedia.org/wiki/File:BYU_Utahraptor_skeletal_mount.jpg), Jaren Wilkey, 26/01/2018, licença CC BY-SA 4.0 com confirmação VRT; [reconstrução](https://commons.wikimedia.org/wiki/File:Utahraptor_Restoration.png), Fred Wierum, 2017, CC BY-SA 4.0. Créditos, licença, adaptação e links originais preservados. Nenhum recurso externo novo foi incorporado.

Escolhido desaparecimento gradual com sobreposição de até 480 ms. As poses, orientações e perspectivas diferentes não sustentam varredura anatômica; não se procurou alinhar ossos e corpo. Antes, a saída de 220 ms precedia a entrada, e a instrumentação registrou quadros com ambas as representações invisíveis. Agora as duas camadas permanecem montadas, a decodificação é aguardada e as opacidades são complementares, controladas pelo mesmo progresso. Cliques rápidos invertem a partir do estado presente; nenhum pedido antigo conclui por cima do mais recente. O multiply que integra o fundo branco da ilustração foi levado da imagem à camada externa, mantendo a composição com o fundo mineral durante toda a variação de opacidade. Não se substitui nem retoca a ilustração original. O rótulo permanece fora das camadas animadas, sem duplicação de legendas na sobreposição.

Não havia passagem automática do Utahraptor e nenhuma foi criada. Troca imediata com movimento reduzido, controle por toque e teclado, estado ao retornar, textos científicos, detalhes, créditos, navegação e distinção entre ossos conhecidos, penas inferidas e escolhas artísticas mantidos.

Conferência reproduzível em `tools/conferir-utahraptor.cjs`: 1440×900, 390×844 e 360×740; dois estados, troca, três séries de reversões rápidas, Enter/Espaço/Tab, toque, detalhes, painel de fontes, retorno pela navegação e movimento reduzido. Antes, soma mínima das opacidades visíveis = 0 nos três formatos; depois, ≈1, sem quadro vazio. Palco, figuras, título e controles conservam geometria durante a passagem. Capturas e vídeos antes/depois em `auditoria/utahraptor-passagem/`, fora do commit. Inspeção no Edge com emulação de tela, sem aparelho físico. Nenhuma outra cena recebeu mudanças além da reversão solicitada do Eoraptor. Entrega por GitHub, sem ZIP.

## 13/10/2026 · Utahraptor: substituição efetiva do esqueleto

O recorte oblíquo da BYU foi substituído na cena por `assets/cretaceo/utahraptor-esqueleto-ilustrado.png`, ilustração original assistida por IA em vista lateral à esquerda. Pesquisadas montagens abertas de Zach Tirrell e Etemenanki3, além de desenhos/modelos; não foi confirmada alternativa com combinação suficiente de pose, documentação e direitos. Não se usou outro táxon. A fotografia integral BYU continua como evidência complementar nos detalhes, com crédito e licença. A nova imagem não é identificada como foto, fóssil, molde ou esqueleto de um indivíduo inteiro.

Base: Kirkland, Burge e Gaston (1993, resumo consultado), Kirkland e Madsen (2007), registros institucionais do Utah Geological Survey; Fowler et al. (2011) para comparação declarada do pé e limites comportamentais. Ilustração revista manualmente quanto à anatomia geral; primeiro esboço descartado e articulação dos membros revista. Coluna e cauda completas, caixa torácica, lados ausentes, partes cranianas, articulações e pose são completamentos ou interpretações, sem mapa validado osso a osso. Origem assistida por IA declarada; direitos eventualmente existentes sobre a contribuição dedicados por CC0. Fontes, candidatas, autoria, condições, conferência e limitações em [UTAHRAPTOR-ESQUELETO.md](UTAHRAPTOR-ESQUELETO.md).

Escalas proporcionais e posições próprias para os dois estados aproximam presença e apoio sem encaixe falso; palco mais baixo no celular acomoda as duas imagens horizontais. Legendas, botão “Esqueleto”, créditos e detalhes atualizados para identificar corretamente a nova peça. Os graus de certeza continuam separados; a referência à montagem no texto de ossos conhecidos foi ajustada porque ela deixou de ser a imagem principal. Reconstrução em vida e seu arquivo integral preservados, assim como a sobreposição gradual aprovada de 480 ms, controles, toque, teclado, movimento reduzido e navegação. Nenhuma passagem automática criada. Eoraptor e demais cenas intactos.

## Yutyrannus · 13/10/2026 · registro do patch inicial, superado pela revisão abaixo

Nova cena depois do Utahraptor, `#cretaceo-yutyrannus`, ≈125 Ma (contexto da Formação Yixian). Base científica: Xu e colegas (2012), Nature 484:92–95, texto lido. Detalhes em `YUTYRANNUS-FONTES.md`.

- **Ideia principal:** penas num predador de nove metros; os filamentos estão na rocha, a cor não.
- **Imagens:** fichas do Wikimedia Commons inacessíveis neste ambiente; sem licença conferida na origem, nenhuma imagem externa entrou. Esqueleto e animal em vida são ilustração original vetorial do MESOZOICO, gerada por código e conferida à mão, sem IA generativa, CC0. As duas camadas saem da mesma geometria e da mesma pose.
- **Composição:** chão escuro e frio (#141a1f), nome grande, três números (≈125 Ma, ≈9 m, fêmur 85 cm), animal na largura toda com régua de 0 a 9 m e pessoa de 1,75 m sob a cauda; a frase principal ocupa o espaço sob a cauda no computador.
- **Passagem:** linha do focinho à cauda (adaptada da do Eoraptor), automática uma vez, depois manual e reversível; instantânea com movimento reduzido.
- **Evidência no desenho:** marcas 1, 2 e 3 indicam onde cada exemplar preservou filamentos e abrem a fonte.
- **Linha do tempo:** Utahraptor e Yutyrannus ficaram a poucos pixels no celular; dividem uma parada com menu. A cena do Utahraptor não mudou; no rodapé dela, "Continua em breve" vira "Avançar".

## Yutyrannus · 14/10/2026 · primeira proposta de novas imagens, vida rejeitada

Patch anexado aplicado e conferido na base `f109862`, branch local `codex/yutyrannus-imagens`. As duas imagens vetoriais iniciais foram substituídas por arquivos novos: `yutyrannus-esqueleto-revisado.png` (2172×724, ilustração original MESOZOICO com assistência de IA, CC0 para eventuais direitos do projeto) e `yutyrannus-vida-totaldino.png` (2800×1000, TotalDino, 2024, CC BY 4.0). A obra de TotalDino permanece integral; só espelhamento horizontal por CSS e redimensionamento proporcional, declarados junto da imagem. Crédito e links para origem e licença visíveis; créditos completos nos detalhes e em [YUTYRANNUS-FONTES.md](YUTYRANNUS-FONTES.md).

Pesquisados Tom Parker, TotalDino, Alopesc, Pilsator e fotografias de ★Kumiko★ e Laika ac, com fichas originais verificadas. Não se encontrou esqueleto lateral aberto adequado à composição: as fotografias mostram placas oblíquas ou réplicas em poses suspensas e sobrepostas. A opção original foi orientada pelas medidas e fotografias do suplemento de Xu et al. (2012), sem reproduzir figuras protegidas. Primeiras versões rejeitadas; crista e articulações revistas e fundo isolado. Inspeção manual de crânio, braços, mãos/dedos, cintura, pernas/pés, costelas e cauda. Esta inspeção não é validação por osteólogo, não há inventário validado osso a osso e as proporções aparentes não reproduzem exatamente a tabela de medidas. Elementos encobertos, articulação, extensão e contagem de séries são interpretativos. Não identificar a imagem como foto, molde ou um indivíduo completo preservado.

A linha de varredura foi substituída por sobreposição gradual de 900 ms, porque as poses e perspectivas diferem. Sem deformação; imagens com enquadramentos independentes, sempre montadas e decodificadas. Mantidos 3,2 s iniciais, passagem automática única, alternância manual reversível, última escolha e movimento reduzido. Nenhum avanço automático. Escala humana deslocada sob a cauda; régua e pessoa continuam como contexto aproximado, não como medidas da ilustração. Marcadores atualizados por representação indicam regiões equivalentes, reunindo achados de três indivíduos; não são locais mapeados de um único esqueleto.

O suplemento também exige duas ressalvas: a procedência foi informada pelo comerciante, sem pedreira exata registrada, e o osso junto aos filamentos do braço de ELDM V1001 é provavelmente um úmero. Detalhes atualizados. ≈125 Ma permanece contexto regional, não datação de um indivíduo; início do Cretáceo mantido em 143,1 Ma. Cores, faixas e cobertura completa são propostas do artista; hipótese de caça coletiva presente na ficha da obra não foi incorporada.

Entrega local com antes/depois e vídeo em `auditoria/yutyrannus-revisao/`. Cenas aprovadas anteriores preservadas. A opção em vida de TotalDino foi rejeitada visualmente pelo usuário; não foi publicada e foi retirada da cena.

## Yutyrannus · 14/10/2026 · revisão após a rejeição de TotalDino

A reconstrução em vida passa a ser `assets/cretaceo/yutyrannus-vida-original.png`, 2172×724, ilustração original MESOZOICO com assistência de IA; eventuais direitos dedicados por CC0 1.0. O esqueleto original revisado permanece como proposta, sem aprovação presumida. Ambas as obras são orientadas pelo suplemento de Xu et al. (2012), nunca identificadas como fósseis fotografados. A opção de TotalDino saiu dos recursos do site e permanece apenas na comparação local, com sua autoria e licença registradas na pesquisa.

Na nova peça, cabeça, mãos, braços, cintura, pernas e pés foram inspecionados, com corpo e cauda inteiros. Cobertura tem variação de forma e comprimento, preservando a leitura dos volumes; cor, densidade, partes expostas, margens labiais e pose continuam interpretativas. Não foi apresentada como reconstrução osteométrica nem como validação por especialista. Fundo isolado com ferramenta de imagem e extremidades novamente conferidas. Sem espelhamento, deformação ou retoque para encaixar as duas representações.

Mantida sobreposição de 900 ms, 3,2 s iniciais e controles; posição e escala próprias para o novo estado em vida, com marcadores reposicionados. Pessoa de 1,75 m deslocada para o espaço livre diante dos braços, sob a cabeça: a nova cauda encobria a cabeça da escala na posição anterior. Créditos atualizados para duas ilustrações originais assistidas por IA, com fonte e limites nos detalhes. Antes/depois, tentativa rejeitada e vídeo reunidos em `auditoria/yutyrannus-revisao/`. **Proposta local aguardando validação explícita antes de commit, PR ou publicação.**

## Yutyrannus · 14/10/2026 · linha móvel na revisão local

Pedido do usuário: manter imagens, composição e dados, acrescentando linha móvel que revele a outra representação nos dois sentidos. Implementada varredura reversível de 1,2 s com máscaras complementares em camadas fixas. Não há desaparecimento da figura inteira antes da entrada da outra. A linha acompanha somente a altura do animal em cada coluna, calculada pela união do alfa das duas imagens nos enquadramentos já existentes; não atravessa escala humana, textos, navegação ou régua temporal. Some ao terminar ou com movimento reduzido.

Marcadores fixados em regiões comuns às duas representações. Legenda única e estável identifica ambas como ilustrações interpretativas com poses diferentes; título, números, pessoa, régua, mensagem, crédito e controles não se movem na troca. Nenhum arquivo de imagem alterado ou deformado; fontes, licenças e dados preservados. Mantidos 3,2 s iniciais, entrada automática única, última escolha, toque, teclado e reversão de uma troca ainda em andamento. Movimento reduzido troca diretamente, sem linha.

Conferência e capturas em 1440×900, 390×844 e 360×740, com dois sentidos e trocas rápidas repetidas. Arquivos de avaliação em `auditoria/yutyrannus-linha/`. Proposta continua local, aguardando validação explícita; sem commit, PR ou publicação.

## Yutyrannus · 14/10/2026 · validação e publicação autorizadas

O usuário validou explicitamente a revisão com linha reversível apresentada em `auditoria/yutyrannus-linha/AVALIAR.html` e autorizou commit, abertura e integração do PR e publicação no GitHub Pages. A versão aprovada foi mantida, sem nova revisão de design. Incluídos cena, imagens originais, créditos, fontes e passagem; capturas, auditoria, maquetes, arquivos temporários, imagens rejeitadas e ZIPs ficam fora da entrega. Eoraptor, Utahraptor e demais cenas aprovadas preservados. Conferência local repetida em 1440×900, 390×844 e 360×740, com dois sentidos, trocas rápidas, toque/teclado e movimento reduzido. Permanecem os limites científicos registrados; a aprovação visual não é validação osteológica.

## Psittacosaurus · 14/10/2026 · integração local para avaliação

Preparada sobre a publicação `48437a4`, na branch local `codex/psittacosaurus-integracao`. **Ainda não validada nem publicada.** Nova cena depois de Yutyrannus: “A pele também deixou pistas.” A sequência passa dos filamentos para pele escamosa, resíduos e pesquisa sobre pigmentação. Mantida a identificação conservadora *Psittacosaurus* sp., SMF R 4970, Cretáceo Inferior; a procedência estratigráfica individual é incompleta. Não se atribui ≈126 Ma ou outra data exata ao indivíduo.

Reaproveitada a fotografia real e o modelo de pesquisa da maquete de 12/10, com fichas originais reconferidas. Arquivos integrais copiados sem alteração e verificados por SHA-1. Fotografia de Vinther et al., figura 1A/B de 2016, e figura S16 do modelo pintado por Robert Nicholls, creditada à equipe completa do estudo: ambas CC BY 4.0. Origem, licença, autoria e adaptações constam junto da imagem, nos detalhes, em “Fontes e certezas” e em [PSITTACOSAURUS-FONTES.md](PSITTACOSAURUS-FONTES.md). O painel B é um desenho interpretativo; não aparece como fotografia. A escala original permanece acessível na figura integral.

Composição própria: título narrativo, fotografia ampla e leitura curta lateral no computador; no celular, título e identidade, controles, região do fóssil e explicações em rolagem vertical. Tipografia Manrope/DM Sans e cores do site atual. Crédito curto acima da imagem. Um botão e um ponto indicado na pele junto à coxa fazem a aproximação manual do mesmo JPEG, sem criar detalhes; retorno por botão ou Escape. A aproximação excede a resolução nativa em parte da apresentação no computador e não é instrumento de medição. O enquadramento inicial móvel recorta extremidades; a figura completa segue acessível. As margens brancas do painel A ficam ocultas por CSS, sem edição dos pixels.

O modelo aparece somente em vista separada, integral e explicitamente identificada como modelo de pesquisa de 2016. Sem varredura, sobreposição ou alinhamento anatômico com a fotografia achatada. Título, contexto e abas mantêm posição. Não há alternância nem avanço automáticos. Toque, clique, teclado (setas/Home/End nas abas; Enter/espaço nos botões), retenção de seleção/zoom durante a sessão e movimento reduzido sem animação de aproximação.

Separados os vestígios observados, as medições e interpretações por fotografia/fluorescência/microscopia e a hipótese de camuflagem sob luz difusa. O teste usou um modelo cinza; a imagem mostra o modelo pintado. Tons exatos não são uma paleta demonstrada. O modelo completa regiões não expostas, assume simetria em parte do padrão e usa detalhes cranianos de outro exemplar; não redefine a espécie de SMF R 4970. Bell et al. (2022) revisam aspectos do tegumento; não se apresenta o modelo de 2016 como incorporação automática dessas revisões.

Incluídos a nova parada, o item no menu do Cretáceo Inferior e as fontes. Para não inventar datas diferentes, compartilha a âncora regional aproximada de Yutyrannus na régua, sem exibir número como idade individual. A ordem de visita não ordena exemplares por datação. Mantido o início do Cretáceo em 143,1 Ma. O menu fecha também ao escolher a cena já ativa, evitando cobrir seus controles. Nenhum conteúdo das onze cenas anteriores ou arquivo de imagem aprovado foi alterado.

Conferência no Edge em 1440×900, 390×844 e 360×740: estados geral, pele e modelo, retorno, trocas repetidas, toque emulado/clique, teclado, fontes, detalhes, créditos até o fim, navegação de/para Yutyrannus, menu e movimento reduzido; sem rolagem horizontal. Capturas antes/depois e registro ficam em `auditoria/psittacosaurus-integracao/`, fora do Git. Ferramenta reproduzível: `tools/conferir-psittacosaurus.cjs`. Pendência: avaliação visual do usuário antes de commit ou publicação.

## Psittacosaurus · 14/10/2026 · revisão pontual do modelo, ainda local

A pedido do usuário, revisada somente a apresentação do estado “Modelo de pesquisa”. A fotografia do fóssil, aproximação da pele, textos científicos, controles e lógica de interação permanecem como na integração local anterior. Cenas aprovadas preservadas. Nenhum commit ou publicação autorizado nesta rodada.

O modelo passa a ocupar uma área maior no computador, com painel próprio de proporção 1,8:1; no celular, 1,6:1 e enquadramento proporcional específico. O recorte de apresentação por CSS elimina margens e parte do pedestal. Uma máscara exclui somente o quadro inserido da cabeça e sua moldura, preservando a figura principal e a base abaixo do quadro. Não há retoque, deformação, espelhamento, geração de partes ou edição de pixels. O arquivo PNG integral permanece idêntico ao original sob CC BY 4.0; autoria de Vinther e colaboradores e modelo de Robert Nicholls mantidos. Adaptação declarada na legenda, créditos completos, fontes e [PSITTACOSAURUS-FONTES.md](PSITTACOSAURUS-FONTES.md).

O detalhe da cabeça foi transferido para a figura S16 integral dentro de “Mostrar detalhes”, identificado como outra vista do **modelo de pesquisa**, não como fotografia de fóssil ou do animal vivo. A legenda principal também oferece link direto ao original completo. Legenda e nota do modelo em 13 px; crédito curto sobre a peça. Mantida rolagem vertical para ver o modelo inteiro e os créditos, sem diminuir a peça para caber na primeira tela. O estado do fóssil não recebeu ajustes tipográficos ou de enquadramento.

Conferidos 1440×900, 390×844 e 360×740: alternância manual nos dois sentidos, trocas repetidas, aproximação/retorno do fóssil, toque emulado/clique, teclado, movimento reduzido, legenda e créditos do modelo acima da navegação após rolagem, figura integral e navegação da cena. Sem rolagem horizontal ou erros de página. Antes/depois e capturas em `auditoria/psittacosaurus-modelo/`, fora do Git. Pendência: validação visual do usuário antes de publicar.


## Psittacosaurus · 14/10/2026 · validação e publicação autorizadas

O usuário validou explicitamente a integração local, incluindo a revisão do modelo de pesquisa em `auditoria/psittacosaurus-modelo/AVALIAR.html`, e autorizou commit, PR, integração e publicação. Preservada a versão aprovada sem nova revisão de design: fóssil, aproximação manual, modelo recortado, figura integral nos detalhes e por link direto, créditos, fontes e interações. O HTML foi guardado como snapshot de aprovação antes da entrega; somente documentos de estado receberam esta atualização. Onze cenas anteriores e 29 arquivos de assets preservados. Conferência local repetida em 1440×900, 390×844 e 360×740. Entrega contém apenas site, duas imagens integrais licenciadas e documentação do produto; ferramentas locais, auditoria, capturas, maquetes, temporários e ZIPs excluídos. A validação visual não altera os limites científicos registrados.
