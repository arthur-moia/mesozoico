# Sophie — direção de arte isolada

12/10/2026. Maquete local em `maquetes/sophie-arte-2026-10-12`. A versão anterior, o site principal e a referência foram preservados. Skills imagegen e Sites lidas e aplicadas ao fluxo local. Nenhuma publicação.

## Recortes tentados e decisão

Foram tentadas duas extrações pela ferramenta integrada imagegen, em arquivos novos. Ambas pediram transparência verdadeira, sem novas partes e com preservação integral de anatomia, orientação, textura e proporção. As saídas estão em `assets/sophie-pintura-tentativa-ia.png` e `assets/sophie-esqueleto-tentativa-ia.png`, exclusivamente para registro; não são carregadas pela maquete.

**As duas saídas foram rejeitadas.** Na pintura, a textura e a cor mudaram e a assinatura desapareceu. No esqueleto, a textura ganhou brilho e detalhes mudaram. Não há garantia de preservação anatômica exata; não foram usadas como evidência científica nem como imagem final. A pintura resultante mudou de 3500×1690 para 1804×872; o esqueleto também mudou de resolução. Foi realizada inspeção visual frente aos originais.

A solução final usa os dois arquivos originais integrais. O branco é integrado ao fundo mineral por `mix-blend-mode:multiply` no navegador. Essa composição altera a cor percebida do original, sobretudo nas áreas claras. **Não é um recorte transparente** e não produz arquivo com anatomia redesenhada. Sombra, assinatura, placas, espinhos e membros permanecem no arquivo, com proporção original. A fotografia foi mantida como fotografia e espelhada uniformemente por CSS para orientar a cabeça à direita. Poses, perspectiva e posição da cauda continuam diferentes; a linha é passagem de representação, sem correspondência anatômica ponto a ponto.

Uma máscara alfa determinística chegou a ser produzida para inspeção intermediária, mas foi removida e não foi adotada: o fluxo final segue a regra de usar imagegen para edição de raster. Nenhum derivado dessa máscara ficou no resultado.

## Prompts das tentativas

Pintura — ferramenta integrada, transparência solicitada:

> Use case: background-extraction. Edit target: the local Fred Wierum Stegosaurus reconstruction (first referenced image). Remove ONLY the opaque white background to genuine transparency. Preserve the entire original animal exactly, including every plate, all four tail spikes, legs, original shadow/support on ground and artist signature. Do not redraw, reconstruct, add or infer any anatomy. Preserve image dimensions, orientation, colors and texture. Output must be a faithful cutout, no new parts.

Esqueleto — ferramenta integrada, transparência solicitada:

> Use case: background-extraction. Edit target: Maidment/NHM mounted skeleton photograph. Remove ONLY white background to genuine transparency, including white between ribs and vertebrae. Preserve every original bone, tiny plate, spike, jaw, tooth, limb, mount/support, proportions, orientation and texture. Do not add or reconstruct anatomy, do not synthesize missing parts. Keep full original framing. This is scientific documentation, exact unchanged anatomy is mandatory.

## Licenças e condições

[Stegosaurus stenops Life Reconstruction](https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_Life_Reconstruction.png), Fred Wierum, 2022, original 3500×1690, identifica Sophie. [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) permite adaptação, com atribuição, indicação das alterações e compartilhamento da adaptação sob a mesma licença. A apresentação com composição de fundo mantém CC BY-SA 4.0. Crédito curto junto à figura; fonte, licença, alterações e acesso ao original nos detalhes.

[Stegosaurus stenops mounted skeleton](https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_mounted_skeleton.jpg), Maidment e colaboradores / Natural History Museum, London, NHMUK PV R36730, figura 1A do estudo PLOS. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) permite adaptação com atribuição e identificação das alterações. Alterações na apresentação: espelhamento uniforme e composição de fundo; original integral preservado.

As licenças permitem recorte, mas a permissão não garante a qualidade de uma extração por IA. As duas tentativas permanecem descartadas.

## Fontes científicas

[Maidment, Brassey e Barrett (2015), PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0138352), consultado nesta revisão, identifica Sophie como NHMUK PV R36730, Stegosaurus stenops, Red Canyon Ranch Quarry, perto de Shell, Wyoming, Formação Morrison. A montagem inclui partes completadas. O indivíduo não era plenamente maduro. Sedimentos, moluscos de água doce e articulação sustentam a interpretação de soterramento rápido em água parada; não é observação direta da morte.

≈150 milhões de anos atrás é contexto aproximado do Jurássico Superior, não datação do indivíduo. A correlação estratigráfica no artigo é provável e limitada pela exposição e falhas geológicas.

[Hayashi e colaboradores (2012)](https://doi.org/10.1111/j.1475-4983.2011.01122.x), fonte mantida da revisão anterior, discute vascularização e hipóteses de exibição e termorregulação. A frase “As placas ficaram. Sua função ainda é investigada” evita atribuir função única. Cor, padrão e tecidos moles da reconstrução são propostas do artista.

## Direção de arte

Uma superfície mineral contínua substitui a divisão entre cabeçalho escuro e campo branco. O nome cria a entrada, o contexto fica reunido, e a mensagem ocupa o espaço negativo acima da cauda. O animal passa a dominar a área principal; controles e crédito ficam na base da exposição.

A referência Eoraptor foi renderizada no Edge e inspecionada; captura em `capturas/referencia-eoraptor.png`. Foram retomados contraste, hierarquia de nome e espécime, espaço próprio e texto breve. A forma horizontal de Sophie pede uma superfície ampla. O arco de Eoraptor não foi copiado. O fundo mineral favorece contraste com a pintura escura; multiply é uma concessão de apresentação documentada.

No celular, a ficha é compacta e o animal precede a mensagem; a página permite rolagem. Não se reduziu tudo para caber em 360×740. A silhueta inteira continua limitada pela largura física da tela: a melhoria móvel vem sobretudo da posição precoce, continuidade do fundo e retirada do cabeçalho pesado. Não se promete aumento expressivo em pixels onde a imagem anterior já ocupava a largura.

## Movimento e verificação

Três segundos de esqueleto após decodificar as imagens; linha percorre em 1,8 s. Manual cancela temporizador e persiste na sessão. Movimento reduzido abre em vida, sem animação; permite alternância instantânea. Texto e navegação não se movem na passagem.

Edge/Playwright: 1440×900, 390×844 e 360×740; capturas reais da revisão anterior e desta versão; animação automática, manual, persistência, movimento reduzido e ausência de rolagem horizontal e erros de página. Resultados em `capturas/verificacao.json`. Vídeo WebM real em `capturas/passagem-automatica-e-manual.webm`. A captura de detalhes registra o texto aberto. Não houve teste em aparelho físico.

## Preservação

SHA-256 antes e depois, sem alterações:

- `site/index.html`: `5FDC60EBA986CF52CE0C96DD8714CBB53D69C2477894BD9EEB27902CD9C943F7`
- `maquetes/pranchas-2026-10-12/referencia/MESOZOICO/index.html`: `F6C57FEE2F999C9173FB4E4D032359F782DA06F2F53CADD806E2C173EB094C09`

Os originais das imagens foram copiados, não sobrescritos. A versão `sophie-revisao-2026-10-12` foi apenas lida. As demais cenas não foram alteradas. Servidor temporário 8775 encerrado ao concluir.


## Registro vigente da integração v3

As seções anteriores documentam versões históricas. A correção de composição e posição de 12/10/2026 está na última seção de `decisoes.md`; as evidências atuais estão em `capturas/sophie-ajuste-v3/`. Os dois originais, autoria, licenças e texto científico permanecem inalterados.
