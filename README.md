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

## Interação

O vídeo começa mudo ao entrar, toca uma vez e fica no último quadro; a rolagem não o pausa, retrocede nem controla. Se o navegador bloquear o início automático, aparece um botão para reproduzi-lo.

Cada passagem entre cenas tem um movimento próprio (cortina ascendente, placa lateral, janela horizontal ou vertical, revelação de baixo para cima, saída lateral, varredura da esquerda para a direita), todos conduzidos por uma única linha do tempo GSAP ligada ao ScrollTrigger. Um gesto de rolagem avança ou volta uma cena; setas, PageUp/PageDown, espaço, Home/End, toque e os botões da página também funcionam, e a rolagem assenta sempre em uma cena.

A linha do tempo lateral (rótulo, marcador, faixa e parada ativa) é calculada a partir dos atributos `data-age*` de cada cena em `index.html`. A preferência do sistema por movimento reduzido desativa as transições intensas e preserva a rolagem normal, com entradas discretas por cena; nesse modo o vídeo só inicia pelo botão. Se GSAP não iniciar, a página também mantém uma entrada leve por cena.

## Antes de publicar

Confirme a procedência e as licenças dos assets. A reconstrução paleogeográfica permanece provisória. O esqueleto do Eoraptor está marcado como provisório porque sua pose difere da reconstrução. A revisão mobile completa continua reservada para a etapa final do projeto.
