# MESOZOICO

Expedição visual em português. O produto está em `site/index.html`; imagens, fontes e licenças ficam em `site/assets/`. Não há build nem dependência de rede para carregar o conteúdo.

## Prévia local

Na raiz do projeto:

```sh
python tools/preview.py
```

Abra **http://127.0.0.1:8781/**. Para outra porta, use `--port 8782`. Servir `site/` por HTTP reproduz a resolução de URLs da hospedagem e evita restrições do navegador para `file:`. A página e a pasta `assets/` precisam ser publicadas juntas, mantendo nomes e maiúsculas/minúsculas. Todos os caminhos do produto são relativos; ele pode ser servido também em um subdiretório.

## Conferência

O relatório está em [site/REVISAO-2026-10-13.md](site/REVISAO-2026-10-13.md). Os scripts de desenvolvimento requerem Python com Pillow e Node com Playwright; o site não requer essas ferramentas. Com a prévia ativa:

```sh
python tools/inventariar-site.py
node tools/auditar-site.cjs
node tools/conferir-interacoes.cjs
node tools/conferir-yutyrannus.cjs
```

O navegador padrão é Edge no Windows e Chromium nos demais sistemas. `PREVIEW_URL`, `BROWSER_CHANNEL`, `PLAYWRIGHT_MODULE` e `AUDIT_RUN` permitem ajustar o ambiente. Capturas e resultados são gerados em `auditoria/`, ignorada pelo Git. O percurso cobre 1440×900, 390×844 e 360×740, imagens, detalhes, controles e fontes.

## Git e entrega

Execute o Git na raiz do projeto, ou use `git -C <pasta-do-projeto> status`. Executá-lo dentro de `.git` não equivale a trabalhar na árvore do produto. Não apague nem reinicialize `.git` para contornar esse erro.

As próximas entregas são feitas por branch/commit e, quando houver fluxo configurado no remoto, pull request. Não gerar novos ZIPs. O `.gitignore` exclui pacotes antigos, backups, maquetes, pesquisas auxiliares, capturas temporárias e arquivos privados. Nenhum remoto é escolhido automaticamente.

Remoto confirmado: `https://github.com/arthur-moia/mesozoico.git`. GitHub Pages publica a raiz de `codex/mesozoico-checkpoint-2026-10-04`. O `index.html` da raiz encaminha para `site/`, preservando query e hash; `.nojekyll` mantém a entrega estática. O código editável continua em `site/index.html`. Alterações são propostas por pull request contra essa branch de publicação, sem substituir seu histórico.

## Fontes e direitos

Conteúdo científico, distinções de certeza e créditos estão no painel **Fontes e certezas**, nos detalhes de cada cena e em `site/decisoes.md`. As imagens têm licenças próprias; não existe uma licença única que substitua essas condições. DM Sans e Manrope são distribuídas com suas licenças SIL OFL em `site/assets/fonts/`. Pendências de procedência do material antigo continuam declaradas no produto; a revisão técnica não constitui confirmação dessas licenças.
