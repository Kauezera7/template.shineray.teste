# Documentação do Projeto: ShineStore

Este documento contém a visão geral, estrutura de arquivos e funcionalidades do template ShineStore.

---

## 📂 1. Estrutura do Projeto

```text
template.shineray.teste/
├── docs/                   # Documentação do sistema
├── img/                    # Fotos e imagens do projeto
├── index.html              # Página principal (Home)
├── catalog.html            # Página de listagem de produtos
├── product-detail.html     # Página de detalhes do produto
├── css/
│   ├── style.css           # Estilos globais, header, footer e home
│   └── catalog.css         # Estilos da grade de produtos e detalhes
└── js/
    ├── products-data.js    # "Banco de dados" (Array de objetos dos produtos)
    ├── nav.js              # Lógica do menu hambúrguer e navegação
    ├── catalog.js          # Lógica de filtros da página de catálogo
    └── product-detail.js   # Script de renderização dinâmica dos detalhes
```

### Detalhes dos Arquivos:
*   **`index.html`**: Página de entrada com destaques e seções informativas.
*   **`catalog.html`**: Página de listagem com suporte a filtros de cor.
*   **`product-detail.html`**: Estrutura base para exibição de detalhes técnicos.
*   **`css/`**: Contém a estilização visual (layout, cores e responsividade).
*   **`js/`**: Contém toda a inteligência do site, desde a navegação até a filtragem e exibição dinâmica de dados.

---

## 🚀 2. Funcionalidades Principais

### Navegação Inteligente (`nav.js`)
*   **Menu Responsivo:** Sistema de menu "hambúrguer" para dispositivos móveis.
*   **Smooth Scroll:** Rolagem suave para seções internas da página inicial.

### Catálogo e Filtros (`catalog.js` & `catalog.html`)
*   **Exibição Dinâmica:** Lista os produtos de forma organizada.
*   **Filtro por Cor:** Permite filtrar produtos instantaneamente sem recarregar a página.

### Página de Detalhes Dinâmica (`product-detail.js`)
*   **Injeção de Dados:** Carrega informações baseadas no ID passado via URL (`?id=1`).
*   **Troca de Imagens:** Galeria interativa onde a imagem principal muda ao clicar nas miniaturas.
*   **Especificações Técnicas:** Gera automaticamente a lista de características do produto.

### Gerenciamento de Dados Centralizado (`products-data.js`)
*   Todos os produtos, preços, imagens e textos técnicos estão centralizados em um único objeto JavaScript, facilitando atualizações rápidas no estoque da loja.

---
*Documentação gerada em Janeiro de 2026.*
