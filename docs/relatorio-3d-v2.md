# Relatório final — pares 3D e comparação humana

7 de outubro de 2026. Base: projeto entregue pelo Claude, revisado na pasta `claude-integrado-revisao`.

## Imagens

Foram refeitos os sete pares de esqueleto e reconstrução: Herrerasaurus, Eodromaeus, Panphagia, Allosaurus, Stegosaurus, Brachiosaurus e Diplodocus. O Eoraptor foi preservado.

As imagens têm aparência de render 3D, iluminação de estúdio e fundo transparente. São PNGs, não modelos 3D editáveis. Cada arquivo contém esqueleto acima e reconstrução abaixo. O site mostra apenas a região correspondente, mantendo a proporção original dos pixels. Não houve esticamento dos PNGs para preencher a tela.

| Espécie | Pose e leitura visual | Arquivo em assets/images/3d |
|---|---|---|
| Herrerasaurus | Predador em alerta, crânio alongado, braços de preensão | herrerasaurus-3d-v2.png |
| Eodromaeus | Postura de corredor, corpo esguio e cauda longa | eodromaeus-3d-v2.png |
| Panphagia | Postura curiosa, cabeça pequena e corpo alongado | panphagia-3d-v2.png |
| Allosaurus | Predador com boca entreaberta e elevações acima dos olhos | allosaurus-3d-v2.png |
| Stegosaurus | Perfil defensivo com placas altas e espinhos da cauda visíveis | stegosaurus-3d-v2.png |
| Brachiosaurus | Pescoço elevado, ombros altos e quatro membros apoiados | brachiosaurus-3d-v2.png |
| Diplodocus | Caminhada com pescoço e cauda longos ocupando o quadro | diplodocus-3d-v2.png |

Herrerasaurus, Eodromaeus, Panphagia, Allosaurus e Diplodocus: 1536 × 1024 px por par. Brachiosaurus: 1024 × 1536 px. Stegosaurus: 1254 × 1254 px. A resolução original foi mantida, sem ampliação artificial. Prompts e correções estão em `prompts-3d-v2.json`; foi usada a ferramenta de geração de imagens integrada.

## Comparações de tamanho

Todas as novas comparações usam a mesma figura humana, com altura visível de 1,70 m. O ônibus foi retirado da comparação do Brachiosaurus e da cena principal do Diplodocus. A comparação própria do Eoraptor já usa uma pessoa e foi preservada.

| Espécie | Comprimento adotado | Critério |
|---|---:|---|
| Herrerasaurus | ≈ 4,5 m | Referência ilustrativa dentro da faixa de 3–6 m; não equivale automaticamente a um juvenil |
| Eodromaeus | ≈ 1,77 m | Reconstrução esquelética do suplemento original de Martínez et al. (2011) |
| Panphagia | ≈ 1,3 m | Indivíduo imaturo descrito por Martínez e Alcober (2009) |
| Allosaurus | ≈ 8,5 m | Valor apresentado pelo Dinosaur National Monument |
| Stegosaurus | ≈ 5,6 m | Espécime Sophie, ainda não adulto; não é o máximo do gênero |
| Brachiosaurus | ≈ 22 m | Estimativa de referência do Natural History Museum |
| Diplodocus | ≈ 24 m | Arredondamento da referência de 24,3 m do Dinosaur National Monument |

As margens transparentes deixaram de participar do cálculo do tamanho. As janelas de exibição são calculadas a partir dos limites visíveis dos animais e da pessoa, com os pés na mesma linha de chão. A referência humana e o animal usam a mesma unidade de pixels por metro. Para poses com pescoço e cauda inclinados, a projeção horizontal é estimada por uma linha traçada ao longo do corpo na ilustração. Esses pontos são calibração gráfica, não novas medições paleontológicas. Para Sophie foi usada a extensão do espécime montado publicada pelo museu. A comparação continua aproximada por usar reconstruções artísticas e perspectivas ligeiramente oblíquas.

## Informações do Perplexity aplicadas e corrigidas

Foram usados os dados sustentados pelas fontes: nomes científicos, períodos, formações geológicas, locomoção, dietas com o grau de incerteza apropriado, material parcial de Panphagia, diferenças entre Brachiosaurus e Giraffatitan e medidas selecionadas acima. Os cartões de informação receberam idade geológica, locomoção e dieta. Os limites da reconstrução ficam numa nota expansível.

O valor de Eodromaeus foi corrigido de 1,2 m para 1,77 m após leitura do suplemento científico. A versão anterior do relatório permanece apenas como histórico. Não foram copiados como fatos o tamanho adulto hipotético de Panphagia, a associação automática de Herrerasaurus de 4,5 m a um juvenil, a alegação de que Herrerasaurus era o maior carnívoro de Ischigualasto, nem afirmações de comportamento/visão sem suporte identificado. Não foi alterada a cronologia da história principal.

Fontes conferidas:

- [Herrerasaurus: Sereno e Novas (1992)](https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/92-SCI-Herrerasaurus.pdf?mtime=1591821406) e [faixa de tamanho, Western Australian Museum](https://visit.museum.wa.gov.au/boolabardip/herrerasaurus-ischigualastensis).
- [Eodromaeus: suplemento de Martínez et al. (2011), página 3 do PDF](https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/11-SCI-Eodromaeus-SOM.pdf?mtime=1591808107).
- [Panphagia: Martínez e Alcober (2009)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0004397).
- [Allosaurus: Dinosaur National Monument](https://www.nps.gov/dino/learn/nature/allosaurus-fragilis.htm).
- [Stegosaurus Sophie: Natural History Museum](https://www.nhm.ac.uk/press-office/press-releases/world_s-most-complete-stegosaurus-goes-on-show.html).
- [Brachiosaurus: Natural History Museum](https://www.nhm.ac.uk/discover/dino-directory/brachiosaurus.html) e [Taylor (2009), distinção de Giraffatitan](https://www.miketaylor.org.uk/dino/pubs/taylor2009/).
- [Diplodocus: Dinosaur National Monument](https://www.nps.gov/dino/learn/nature/diplodocus-longus.htm).

## Arquivos e verificações

Alterados: `index.html`, `css/specimen-explorer.css`, `js/specimen-explorer.js`, `js/pairs-3d.js` e `js/site.js`. Novo: `js/pairs-renderer.js`. Acrescentados os sete PNGs e a documentação desta revisão.

Foram verificados: sintaxe dos scripts; existência dos sete PNGs; transparência e separação das duas versões; preservação da proporção em 14 exibições de imagem; alinhamento matemático dos pés; 28 combinações de espécie e dimensões de área para a escala; altura humana de 1,70 m; ausência de ônibus no HTML; manutenção da duração de 1,9 s e do bloqueio de cliques durante a revelação. Os cinco assets e as quatro seções próprias do Eoraptor foram comparados com o ZIP original e permanecem iguais.

**Limite da validação:** o navegador da ferramenta recusou a abertura do arquivo local por política de segurança. Não foi realizada a revisão visual das cenas nem das transições em execução, em nenhum sentido. Os testes estáticos não substituem essa conferência. A geração também não garante coincidência anatômica pixel a pixel entre ossos e tecidos externos; são pares artísticos preparados para a revelação, não modelos científicos validados. Não houve publicação nem envio ao GitHub nesta revisão.
