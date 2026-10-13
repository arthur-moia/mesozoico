# Eoraptor: revisão da representação esquelética e da passagem

13/10/2026. A reconstrução em vida, os textos principais, dados e demais cenas foram preservados.

## Comparação feita antes da implementação

| Recurso | Identificação, autoria e condições | Decisão |
|---|---|---|
| `eoraptor-esqueleto.webp`, anterior | Representação provisória recebida com o projeto; autoria, origem e licença não confirmadas. Não documenta um espécime. | Retirada da cena; mantida no histórico do Git. |
| [Eoraptor skeletal.png](https://commons.wikimedia.org/wiki/File:Eoraptor_skeletal.png) | Maurissauro, 2020, obra própria. [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). O autor marca elementos conhecidos em branco e desconhecidos em cinza. | Anatomia geral e lacunas comparadas à descrição primária. Perfil lateral, focinho à esquerda e cauda reta não se aproximam da perspectiva oblíqua atual. A ficha não especifica os exemplares utilizados; não adotada como inventário do holótipo. |
| [Eoraptor lunensis skeleton.JPG](https://commons.wikimedia.org/wiki/File:Eoraptor_lunensis_skeleton.JPG) | Eduard Solà Vázquez (Esv), foto de 26/07/2009, Royal Belgian Institute of Natural Sciences. [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Versão atual recortada por Conty em 2011. | Fotografia parcial de montagem; cabeça e tronco, sem animal inteiro. A ficha não informa ossos originais, moldes ou complementos. Não adotada. |
| [Eoraptor lunensis DSC 6162.jpg](https://commons.wikimedia.org/wiki/File:Eoraptor_lunensis_DSC_6162.jpg) | Eva Kröcher / Eva K., 05/12/2010. GFDL 1.2 ou Free Art License; alternativa CC BY-NC-ND 3.0. | Licenças alternativas permitem reutilização sob suas condições; não é simplesmente CC BY. Download de alta resolução retornou HTTP 429. Não usada nem apresentada como dupla visual aprovada. |
| Nova ilustração, `eoraptor-esquema-original.png` | Produzida para MESOZOICO com assistência de IA, 13/10/2026; não deriva de recorte ou traçado de uma figura científica. | Escolhida pela orientação à direita, vista oblíqua e cauda elevada. Não representa encaixe anatômico exato nem substitui um desenho científico validado. |

Nenhuma imagem externa candidata foi incorporada ao produto. A primeira tentativa original, de cauda baixa e perspectiva mais lateral, também foi descartada. A segunda foi apresentada na comparação antes da escolha.

## Base científica e limites

Sereno, P. C.; Martínez, R. N.; Alcober, O. A. (2013). *Osteology of Eoraptor lunensis (Dinosauria, Sauropodomorpha)*. Journal of Vertebrate Paleontology 32(sup1):83–179. [DOI 10.1080/02724634.2013.820113](https://doi.org/10.1080/02724634.2013.820113). [PDF disponibilizado no site institucional dos autores](https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/13-JVP-Eoraptor-Osteology.pdf?mtime=1591806720). Consulta à descrição, tabela 1 e discussão da figura 93; figuras protegidas não foram copiadas, recortadas, traçadas ou usadas como imagens do site.

- **Documentado:** PVSJ 512 preserva crânio e grande parte do esqueleto articulado. A descrição registra nove cervicais, quinze dorsais, três sacrais, tíbia um pouco mais longa que o fêmur e características de mãos e pés. As proporções e articulações ilustradas são uma simplificação, não uma mensuração do espécime.
- **Ausente no holótipo:** grande parte do escapulocoracoide esquerdo, grande parte das falanges da mão esquerda e caudais posteriores à 17. A continuação distal da cauda exige reconstrução. Na figura 93 dos autores, sua extensão é estimada com comparação a *Panphagia protos*; isso não significa que a cena misture ossos fotografados dessas espécies.
- **Proposto na imagem:** pose, projeção, articulação, extensão e curva da cauda, completamento das lacunas e acabamento das superfícies. Cinza sinaliza aproximadamente as regiões reconstruídas; não é um mapa validado de preservação, nem garante a identificação de cada osso. A imagem gerada não constitui modelo anatômico para medidas, contagens ou diagnósticos. Cabeça, mãos e relações tridimensionais merecem revisão especializada se o recurso for usado além desta explicação geral.
- **Reconstrução em vida:** arquivo aprovado `eoraptor.webp` permanece intacto. Cor, padrão e pele continuam identificados como suposições. Esta revisão não estabelece nova autoria ou licença para esse arquivo legado; eventuais pendências anteriores não foram apagadas.

## Origem, reutilização e alterações

Ilustração original assistida por IA, produzida no Codex para MESOZOICO a partir de instruções textuais anatômicas, sem imagem científica ou obra de terceiro como referência visual de entrada. PNG RGBA 1448×1086, integral, sem retoque, recorte, espelhamento ou deformação; apenas redimensionamento proporcional no navegador. Crédito visível: “MESOZOICO · assistência de IA”.

Reutilização liberada: os direitos eventualmente existentes sobre esta contribuição são dedicados ao domínio público por [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Isso não atribui autoria humana fictícia nem garante exclusividade autoral de saída gerada por IA. Não abrange o restante do site, as imagens candidatas, a reconstrução em vida ou as figuras da publicação científica.

## Passagem e defeito relatado

Os arquivos antigos são RGBA e não contêm um retângulo branco opaco. Na reprodução inicial em Edge o quadro branco relatado não reapareceu; portanto sua causa específica não foi confirmada. Foram identificadas e corrigidas duas fragilidades: `decode()` era disparado sem espera e os recortes alternavam entre `none` e `inset(...)` diretamente nas imagens raster, criando/desfazendo camadas durante o movimento.

A revisão aguarda a decodificação, mantém o palco com fundo mineral opaco e constante, isola a composição e aplica máscaras complementares a contêineres estáveis, inclusive nas pontas. Cliques rápidos cancelam pedidos anteriores e invertem desde o progresso atual. Nenhuma camada muda posição ou escala durante a passagem; poses diferentes continuam claramente interpretativas. Espera de 3,8 s inclui a entrada do nicho, seguida de 1,5 s de passagem. Controles manuais, memória na sessão, ausência de avanço automático e troca imediata com movimento reduzido preservados.

No celular, a altura mínima do nicho reserva a altura proporcional da figura, 118 px para a área de controles/crédito e 12 px acima. Isso impede que o alto da cabeça e a curva da cauda fiquem sob o título em 360 px, sem encolher o animal. O crédito usa a cor de texto do nicho para manter contraste.

## Conferência

Ferramenta reproduzível: `tools/conferir-eoraptor.cjs`. Capturas e vídeos locais em `auditoria/eoraptor/depois/` (fora do commit). Computador 1440×900, celular 390×844 e 360×740; entrada automática, troca manual repetida, reversão durante a passagem, retorno à cena, toque, fontes e movimento reduzido. Geometria das imagens e fundo registrados por quadro; capturas dos estados e dos quadros intermediários inspecionadas. Não é teste em aparelhos físicos.

As demais cenas e seus recursos permanecem intactos. Comparação de preservação por diff do Git, sem mudança de suas seções ou estilos.
