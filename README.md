# MESOZOICO — abertura e capítulo do Triássico

Reconstrução do código do projeto em HTML, CSS e JavaScript, mantendo o escopo atual na abertura e no Triássico. Jurassic, Cretáceo e encerramento da Era Mesozoica ainda não fazem parte desta versão.

## Como abrir

Abra `index.html` diretamente ou sirva esta pasta com qualquer servidor estático. Os caminhos para estilos, scripts, imagens, vídeo e documento científico são relativos ao arquivo `index.html`.

O GSAP e o ScrollTrigger estão em `js/vendor/`, portanto as transições não dependem de uma instalação ou conexão externa. As fontes web têm alternativas locais; a página continua legível sem internet.

## Organização

- `index.html`: cenas, texto e controles acessíveis.
- `css/site.css`: direção visual, capítulos em tela cheia e adaptação de layout.
- `js/site.js`: abertura de vídeo, navegação, linha do tempo e transições.
- `assets/video/opening.mp4`: vídeo de abertura fornecido pelo usuário.
- `assets/images/`: imagens selecionadas do material já compartilhado.
- `docs/`: base científica e notas de conteúdo.

O trecho do Eoraptor está dividido em três cenas: representação esquelética, reconstrução e comparação de escala com uma figura humana de referência de 1,70 m. A passagem entre os ossos e a reconstrução usa uma varredura alinhada às duas imagens, sem manter cópias das duas poses sobrepostas no mesmo quadro. Na cena de reconstrução, título, espécime, introdução, dados, nota e intervalo entram em etapas; a fotografia de Ischigualasto não se repete, pois já aparece na cena anterior. A reconstrução da cena de escala corresponde aproximadamente a 1,2 m, e a linha horizontal abaixo indica um comprimento estimado entre 1 e 1,3 m. O esqueleto descrito originalmente tinha cerca de 1 m; as proporções da imagem continuam aproximadas.

## Interação

O vídeo começa mudo ao entrar, toca uma vez e fica no último quadro; a rolagem não o pausa, retrocede nem controla. Enquanto ele começa, o texto de abertura surge em etapas: identificação, título, introdução e botão.

Cada passagem entre cenas tem um movimento próprio (cortina ascendente, placa lateral, janela horizontal ou vertical, revelação de baixo para cima, saída lateral ou varredura), todos conduzidos por uma única linha do tempo GSAP ligada ao ScrollTrigger. Os textos chegam em sequência com deslocamento curto e leve: primeiro o identificador da cena, depois o título, a explicação e, por fim, os dados complementares. Na cena do Eoraptor, os fatos entram linha a linha; a passagem do esqueleto para a reconstrução revela apenas a imagem do espécime. Um gesto de rolagem avança ou volta uma cena; setas, PageUp/PageDown, espaço, Home/End, toque e os botões da página também funcionam, e a rolagem assenta sempre em uma cena.

A linha do tempo lateral (rótulo, marcador, faixa e parada ativa) é calculada a partir dos atributos `data-age*` de cada cena em `index.html`. A preferência do sistema por movimento reduzido desativa as transições intensas e preserva a rolagem normal, com entradas discretas por cena; nesse modo o vídeo só inicia pelo botão. Se GSAP não iniciar, a página também mantém uma entrada leve por cena.

## Antes de publicar

Confirme a procedência e as licenças dos assets. A reconstrução paleogeográfica permanece provisória. A representação esquelética do Eoraptor também é provisória, e sua pose difere da reconstrução artística. A revisão mobile completa continua reservada para a etapa final do projeto.
