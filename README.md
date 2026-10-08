# MESOZOICO — Triássico e Jurássico

Versão atualizada em 8 de outubro de 2026, a partir do projeto entregue pelo Claude e da revisão dos pares de imagens e comparações de tamanho.

O site percorre 22 cenas, com navegação por rolagem, teclado, botões e linha do tempo. Para abrir localmente, mantenha a estrutura de pastas e abra `index.html`. As fontes web dependem de rede e têm alternativas do sistema.

## O que esta versão inclui

- Sete pares de esqueleto e reconstrução com aparência 3D: Herrerasaurus, Eodromaeus, Panphagia, Allosaurus, Stegosaurus, Brachiosaurus e Diplodocus.
- Comparações desses animais com uma pessoa de 1,70 m, com medidas e ressalvas documentadas.
- Informações científicas revisadas e fontes registradas no projeto.
- Imagens e sequência aprovada do Eoraptor preservadas.

As imagens são reconstruções artísticas em PNG, não modelos 3D editáveis. O alinhamento entre esqueleto e reconstrução é aproximado. A reescrita narrativa inspirada em Ian Malcolm ainda não foi aplicada.

## Verificação e documentação

Execute `node docs/verify-3d-v2.cjs` para verificar os mapeamentos de imagens e a matemática das comparações. Esta revisão passou nas verificações estáticas e de sintaxe; a inspeção visual no navegador e uma nova revisão mobile permanecem pendentes.

Consulte [o relatório da revisão](docs/relatorio-3d-v2.md), [os prompts das imagens](docs/prompts-3d-v2.json) e `CREDITOS-E-PENDENCIAS.txt` para fontes, escolhas e limitações.
