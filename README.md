# Automações com Power Automate

Portfólio de automações que construí com **Power Automate** e o ecossistema Microsoft 365 para reduzir retrabalho e dar visibilidade à gestão. Cada projeto tem uma pasta própria com a documentação completa: necessidade, solução e resultado.

## Projetos

| Projeto | Resumo | Status |
|---|---|---|
| [Governança de Capacity e Visibilidade de Foco](governanca-capacity-foco/README.md) | Transforma a agenda do Outlook/Teams em uma lista do To Do compartilhada com a gestão, com tarefas por categoria, duração e atualização automática. | Em uso |
| [Governança ISO e Régua de Comunicação por Lote](governanca-iso-regua-comunicacao/README.md) | Valida periodicamente os documentos da Lista Mestra com os gestores de cada área, por cards interativos no Teams, e atualiza automaticamente a Lista Mestra, os arquivos e o Planner. | Em construção |

<!-- Modelo para novos projetos (copie a linha abaixo na tabela):
| [Nome do projeto](pasta-do-projeto/README.md) | Resumo em uma frase. | Em uso / Em construção |
-->

## Ferramentas

Power Automate, Outlook/Teams, Microsoft To Do, SharePoint Lists, Microsoft Planner, Excel Online e Office Scripts, Adaptive Cards.

## Estrutura do repositório

```
automacoes-power-automate/
├── README.md                              ← esta página
├── governanca-capacity-foco/
│   └── README.md                          ← documentação do projeto
└── governanca-iso-regua-comunicacao/
    ├── README.md                          ← documentação do projeto
    └── scripts/
        └── GOV_AtualizaListaMestra.ts     ← Office Script usado pelo fluxo
```