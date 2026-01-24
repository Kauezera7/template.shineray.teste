# Documentação do Projeto: ShineStore

Este documento contém a visão geral, estrutura de arquivos e funcionalidades do template ShineStore.

---

## 📂 1. Estrutura do Projeto

```text
template.shineray.teste/
├── docs/                   # Documentação do sistema
├── img/                    # Fotos e imagens do projeto (Produtos e Assets)
├── index.html              # Página principal (Home)
├── catalog.html            # Página de listagem de produtos
├── product-detail.html     # Página de detalhes do produto
├── sellers.html            # Página de listagem de vendedores
├── seller-profile.html     # Página de perfil individual do vendedor
├── css/
│   ├── style.css           # Estilos globais, header, footer e home
│   ├── catalog.css         # Estilos da grade de produtos e detalhes
│   └── hero-slider.css     # Estilos específicos do slider principal da Home
└── js/
    ├── products-data.js    # "Banco de dados" de produtos (Array de objetos)
    ├── sellers-data.js     # "Banco de dados" de vendedores (Array de objetos)
    ├── menu.js             # Lógica do menu hambúrguer responsivo
    ├── catalog.js          # Renderização e filtros da página de catálogo
    ├── product-detail.js   # Renderização dinâmica dos detalhes do produto
    ├── seller-profile.js   # Renderização dinâmica do perfil do vendedor
    ├── home-carousel.js    # Lógica do carrossel de produtos na Home
    ├── hero-slider.js      # Lógica do banner rotativo principal
    └── carousel.js         # Utilitários genéricos de carrossel
```

### Detalhes dos Arquivos Principais:
*   **`index.html`**: Página de entrada com destaques (Hero Slider), carrossel de produtos e seções informativas.
*   **`catalog.html`**: Página de listagem completa com suporte a filtros de cor. Renderizada via JS.
*   **`product-detail.html`**: Página de modelo para exibição dinâmica dos detalhes técnicos da moto.
*   **`sellers.html`**: Página de contato com a lista de consultores disponíveis.
*   **`seller-profile.html`**: Página estilo "Linktree" com os contatos específicos de um vendedor.
*   **`js/products-data.js` & `js/sellers-data.js`**: Arquivos centrais de dados. Adicione ou edite produtos e vendedores aqui.

---

## 🚀 2. Funcionalidades Principais

### Navegação e Layout (`menu.js` & `style.css`)
*   **Menu Responsivo:** Menu "hambúrguer" adaptável para dispositivos móveis.
*   **Smooth Scroll:** Rolagem suave ao navegar pelos links da página.

### Home Page Interativa
*   **Hero Slider (`hero-slider.js`):** Banner rotativo principal com transições e destaques visuais.
*   **Carrossel de Produtos (`home-carousel.js`):** Slider horizontal que exibe os produtos em destaque.

### Catálogo e Filtros (`catalog.js`)
*   **Renderização Dinâmica:** Lista os produtos automaticamente a partir do `products-data.js`.
*   **Filtro por Cor:** Permite filtrar a visualização dos produtos (Preto, Vermelho, Azul, Cinza) sem recarregar a página.

### Detalhes do Produto (`product-detail.js`)
*   **Roteamento via Slug:** Identifica o produto via parâmetro URL `?modelo=slug` (ex: `product-detail.html?modelo=urban-150-efi`).
*   **URL Amigável:** O script converte automaticamente o parâmetro para um hash amigável (`#/inicio/catalogo/nome-do-produto`).
*   **SEO Dinâmico:** Atualiza o `<title>` e as meta tags (Open Graph) para compartilhamento correto em redes sociais.
*   **Galeria Interativa:** Slider de imagens com miniaturas clicáveis.
*   **Ficha Técnica:** Acordeão expansível com as especificações técnicas (Cilindrada, Potência, etc.).
*   **Produtos Relacionados:** Sugere aleatoriamente 3 outros modelos ao final da página.

### Módulo de Vendedores (`sellers.html` & `seller-profile.js`)
*   **Listagem de Consultores:** Exibe a equipe de vendas disponível.
*   **Perfil Dinâmico:** Página individual carregada via ID (`?id=nome-vendedor`).
*   **Links de Contato:** Botões de ação rápida para WhatsApp, Instagram e Mapa de Localização.

### Gerenciamento de Dados
*   **Centralizado:** Toda a informação (preços, specs, fotos, contatos) fica nos arquivos `*-data.js`.
*   **Manutenção:** Para adicionar um novo produto ou vendedor, basta incluir um novo objeto no array correspondente, sem necessidade de editar múltiplos arquivos HTML (com exceção da lista estática em `sellers.html`).

---
*Documentação atualizada em Janeiro de 2026.*