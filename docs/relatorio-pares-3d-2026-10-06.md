# Relatório — integração dos pares 3D (2026-10-06)

Base: MESOZOICO-projeto-e-pares-3D-2026-10-06.zip. Avaliação visual em 1440×900 (a mesma resolução usada nas cenas do Eoraptor), no Chrome headless, via Playwright (Python). Não há skill dedicada de tratamento de imagem nem de teste de navegador instalada nesta conta; o tratamento foi feito com Python (PIL, NumPy, SciPy) e o teste com Playwright. A skill `frontend-design` foi aplicada às decisões de composição.

## Como as imagens foram tratadas
1. Cada arquivo de `assets/pose-pairs/` foi dividido em esqueleto (esquerda) e reconstrução (direita) pelo maior vão vazio central e cortado pela caixa visível (alfa > 20).
2. As duas metades já tinham alturas quase iguais (±1–3%), o que sugere normalização pela caixa; isso **não** garante a mesma pose. Por isso a comparação foi feita por silhueta (esqueleto preenchido × reconstrução).
3. Busca do melhor alinhamento **só com escala uniforme e deslocamento** (sem esticar): escala da reconstrução 0,88–1,12 e deslocamento até ±10%.
4. Exportação de três arquivos por animal em `assets/images/3d/`: `-esqueleto.webp` e `-reconstrucao.webp` (mesma tela, alinhados) e `-reconstrucao-ajustada.webp` (recorte justo, usado nas escalas e miniaturas). Geometria medida em `js/pairs-3d.js`.
5. Nenhuma imagem foi substituída por outra pose; os originais continuam em `assets/pose-pairs/`.

## Por dinossauro
| Animal | Imagem usada | Ajuste (reconstrução sobre o esqueleto) | Sobreposição das silhuetas: por caixa → alinhado | Revelação visualmente alinhada? |
|---|---|---|---|---|
| Herrerasaurus | herrerasaurus-3d-pair.png | escala ×0,985, deslocamento +5,0% / +0,3% | 0,53 → 0,63 | **Parcialmente.** O pescoço e a cabeça da reconstrução são mais verticais e grossos; a pata dianteira e a perna traseira divergem. Não corrigível por escala/deslocamento. |
| Eodromaeus | eodromaeus-3d-pair.png | ×0,995, −0,6% / 0,0% | 0,81 → 0,83 | Sim. Cabeça, cauda e pés coincidem. |
| Panphagia | panphagia-3d-pair.png | ×1,000, −2,2% / 0,0% | 0,73 → 0,86 | Sim. O pescoço da reconstrução é mais volumoso. |
| Allosaurus | allosaurus-3d-pair.png | ×0,990, −0,3% / 0,0% | 0,88 → 0,89 | Sim, muito bem. |
| Stegosaurus | stegosaurus-3d-pair.png | ×1,000, −1,1% / −0,4% | 0,81 → 0,87 | Sim. As placas e os pés coincidem. |
| Brachiosaurus | brachiosaurus-3d-pair.png | ×0,990, 0,0% / +0,6% | 0,88 → 0,89 | Sim, muito bem. |
| Diplodocus | diplodocus-3d-pair.png | ×0,965, +2,2% / 0,0% | 0,67 → 0,76 | Em geral sim; pernas e pés da reconstrução ficam deslocados alguns por cento. |

A sobreposição é limitada pela diferença entre um esqueleto "vazado" e um corpo cheio; os valores servem para comparar pares entre si, e o veredito vem da inspeção dos quadros da revelação.

## Integração
- **Seis espécies (explorador):** esqueleto → linha de revelação → reconstrução → informações → comparação de tamanho. O animal tem a mesma caixa e posição do esqueleto às informações (verificado: diferença 0,0 px nas fases 1–3). A linha percorre apenas a extensão visível do animal. Informações em duas colunas ao redor, sem cartões. Na escala, só linha horizontal sob o animal; a pessoa tem rótulo de texto, sem régua vertical.
- **Diplodocus (história principal):** mesmas imagens alinhadas nas cenas de esqueleto, passagem e reconstrução (mesma caixa nas três); a linha percorre só o animal; a transferência para a comparação usa a caixa visível do animal e casa com o recorte justo.
- **Eoraptor:** cenas de esqueleto, passagem e escala pixel-idênticas ao ZIP original (A/B com a mesma navegação). Na reconstrução, só mudaram as três miniaturas de entrada (agora com a arte 3D).

## Limitações e pendências
- **Escala com poses em perspectiva.** A escala usa "largura do desenho = comprimento", como no restante do site. Como as poses são 3/4, a altura aparente fica muito maior que a real: implícita de ≈4,4 m (Herrerasaurus), 0,9 m (Eodromaeus), 1,1 m (Panphagia), 8,2 m (Allosaurus), 6,4 m (Stegosaurus), 21,8 m (Brachiosaurus) e 10,9 m (Diplodocus). Ela não deve ser lida como altura. Recomendado: vistas laterais para a comparação, ou aceitar como ilustrativa.
- Resolução: cada tela tem ≈950–1100 px de largura; em telas de alta densidade pode ficar levemente suave.
- Procedência/licença das imagens 3D a confirmar (ver CREDITOS-E-PENDENCIAS.txt).
- Tablet e celular não foram revisados. Os arquivos `-par.png` e `-cinematic.png` antigos continuam na pasta, mas não são mais referenciados.
