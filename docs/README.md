# Documentação do Projeto: Shineray

Este documento contém a visão geral, estrutura de arquivos e funcionalidades do template Shineray.

---

## 📂 1. Estrutura do Projeto

```text
template.shineray.teste/
├── docs/                   # Documentação do sistema
├── img/                    # Fotos e imagens do projeto (Produtos e Assets)
│   ├── pos-venda.jpeg      # Imagem da seção Pós-Venda
│   ├── finacimento.jpeg    # Imagem da seção Financiamento
│   └── oficina-shineray.jpeg # Imagem da seção Oficina
├── index.html              # Página principal (Home)
├── catalog.html            # Página de listagem de produtos
├── product-detail.html     # Página de detalhes do produto
├── sellers.html            # Página de listagem de vendedores
├── seller-profile.html     # Página de perfil individual do vendedor
├── css/
│   ├── style.css           # Estilos globais, header, footer, home e animações
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
    ├── carousel.js         # Utilitários genéricos de carrossel
    └── scroll-animation.js  # Lógica de animação de subida lenta (Scroll Reveal)
```

### Detalhes dos Arquivos Principais:
*   **`index.html`**: Página de entrada com destaques (Hero Slider), carrossel de produtos e a seção "Por que comprar na Shineray".
*   **`js/scroll-animation.js`**: Controla as animações que ocorrem quando o usuário rola a página.
*   **`js/products-data.js` & `js/sellers-data.js`**: Arquivos centrais de dados para fácil manutenção.

---

## 🚀 2. Funcionalidades Principais

### Animações de Scroll (`scroll-animation.js` & `style.css`)
*   **Subida Ultra Lenta:** Implementada uma animação de 7 segundos para os itens da seção "Por que comprar na Shineray".
*   **Gatilho Inteligente:** A animação de subida de todas as imagens é disparada assim que o título da seção aparece na tela.
*   **Reset Inteligente:** As imagens voltam para a posição inicial (lá embaixo) apenas quando o usuário sobe a página e a seção "Sobre" sai completamente da tela, garantindo que a animação possa ser vista novamente sem bugar durante a leitura.
*   **Performance:** Utiliza `IntersectionObserver` para garantir que o navegador não processe animações fora da área visível.

### Seção "Por que comprar na Shineray"
*   **Identidade Visual:** O título destaca a palavra "Shineray" em vermelho.
*   **Layout Moderno:** Títulos posicionados acima das imagens, com descrições curtas e diretas abaixo.
*   **Imagens Customizadas:** Fotos de Pós-Venda, Financiamento e Oficina com cantos arredondados e proporção natural.

### Home Page Interativa
*   **Hero Slider (`hero-slider.js`):** Banner rotativo principal com transições e destaques visuais.
*   **Carrossel de Produtos (`home-carousel.js`):** Slider horizontal que exibe os produtos em destaque.

### Catálogo e Filtros (`catalog.js`)
*   **Renderização Dinâmica:** Lista os produtos automaticamente a partir do `products-data.js`.
*   **Filtro por Cor:** Permite filtrar a visualização dos produtos sem recarregar a página.

### Detalhes do Produto (`product-detail.js`)
*   **Roteamento via Slug:** Identifica o produto via parâmetro URL `?modelo=slug`.
*   **SEO Dinâmico:** Atualiza o `<title>` e as meta tags para compartilhamento.
*   **Galeria Interativa:** Slider de imagens com miniaturas clicáveis.

---

## 🛠️ 3. Manutenção e Atualização

### Adicionar Novas Fotos de Destaque
As fotos da seção "Sobre" devem ser colocadas na pasta `img/` e as referências atualizadas no `index.html`. O estilo (cantos arredondados) é aplicado automaticamente via classe `.feature img` no `style.css`.

### Ajustar Velocidade da Animação
Para mudar o tempo de subida, altere o valor de `7.0s` na classe `.scroll-hidden.visible` no arquivo `style.css`.

---
*Documentação atualizada em Janeiro de 2026 após implementação do módulo de animações.*
