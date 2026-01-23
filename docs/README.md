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
│   ├── catalog.css         # Estilos da grade de produtos e detalhes
│   └── hero-slider.css     # Estilos específicos do slider principal da Home
└── js/
    ├── products-data.js    # "Banco de dados" (Array de objetos dos produtos)
    ├── nav.js              # Lógica do menu hambúrguer e navegação
    ├── catalog.js          # Lógica de filtros da página de catálogo
    ├── product-detail.js   # Script de renderização dinâmica dos detalhes
    └── home-carousel.js    # Lógica do carrossel de produtos na Home
```

### Detalhes dos Arquivos:
*   **`index.html`**: Página de entrada com destaques (Hero Slider), carrossel de produtos e seções informativas.
*   **`catalog.html`**: Página de listagem completa com suporte a filtros de cor.
*   **`product-detail.html`**: Página de modelo para exibição dinâmica dos detalhes técnicos de cada moto.
*   **`css/`**: Contém a estilização visual (layout, cores, tipografia e responsividade).
*   **`js/`**: Contém a lógica do site: navegação, manipulação do DOM, filtragem e exibição de dados.

---

## 🚀 2. Funcionalidades Principais

### Navegação e Layout (`nav.js` & `style.css`)
*   **Menu Responsivo:** Menu "hambúrguer" adaptável para dispositivos móveis.
*   **Smooth Scroll:** Rolagem suave ao navegar pelos links da página inicial (Início, Sobre, Contato).

### Home Page Interativa
*   **Hero Slider (`hero-slider.css`):** Banner rotativo principal com destaques visuais e gradientes.
*   **Carrossel de Produtos (`home-carousel.js`):** Slider horizontal que exibe os produtos em destaque, permitindo navegação fluida entre os itens.

### Catálogo e Filtros (`catalog.js` & `catalog.html`)
*   **Renderização Dinâmica:** Lista os produtos automaticamente a partir do `products-data.js`.
*   **Filtro por Cor:** Permite filtrar a visualização dos produtos (Preto, Vermelho, Azul, Cinza) sem recarregar a página.

### Detalhes do Produto (`product-detail.js`)
*   **Roteamento via URL:** Identifica qual produto exibir através do parâmetro `id` na URL (ex: `product-detail.html?id=1`).
*   **Galeria Interativa:** Permite visualizar a imagem principal e alternar entre miniaturas.
*   **Especificações Técnicas:** Gera uma lista detalhada (Cilindrada, Potência, Câmbio, etc.) baseada nos dados do produto.
*   **Produtos Relacionados:** Sugere outros modelos ao final da página para manter o usuário engajado.

### Gerenciamento de Dados Centralizado (`products-data.js`)
*   Simula um banco de dados, centralizando informações como ID, nome, preço, imagens e especificações técnicas. Isso facilita a manutenção e garante consistência dos dados em todo o site.

---
*Documentação atualizada em Janeiro de 2026.*