// Catálogo com os produtos enviados
const products = [
  {
    id: 1,
    name: "Polo Lacoste Letreiro Azul",
    brand: "Lacoste",
    category: "camisetas",
    categoryLabel: "Camisetas / Polos",
    price: 499.99,
    installments: "12x de R$ 51,43",
    sizes: ["PP", "P", "M", "G", "GG"],
    image: "img/polo-lacoste-azul.jpg" // Substitua pelo caminho da sua foto
  },
  {
    id: 2,
    name: "Camiseta Lacoste Djokovic Cinza",
    brand: "Lacoste",
    category: "camisetas",
    categoryLabel: "Camisetas / Polos",
    price: 399.99,
    installments: "12x de R$ 41,15",
    sizes: ["P", "M", "G", "GG"],
    image: "img/camiseta-djokovic.jpg"
  },
  {
    id: 3,
    name: "Camiseta Nike Just Do It Branca",
    brand: "Nike",
    category: "camisetas",
    categoryLabel: "Camisetas / Polos",
    price: 149.99,
    installments: "12x de R$ 15,43",
    sizes: ["P", "M", "G", "GG"],
    image: "img/camiseta-nike-jdi.jpg"
  },
  {
    id: 4,
    name: "Short Nike Club Preto 2026",
    brand: "Nike",
    category: "shorts",
    categoryLabel: "Shorts / Bermudas",
    price: 249.99,
    installments: "12x de R$ 25,72",
    sizes: ["P", "M", "G", "GG"],
    image: "img/short-nike-club.jpg"
  },
  {
    id: 5,
    name: "Short Nike Praia Preto",
    brand: "Nike",
    category: "shorts",
    categoryLabel: "Shorts / Bermudas",
    price: 279.99,
    installments: "12x de R$ 28,80",
    sizes: ["P", "M", "G", "GG"],
    image: "img/short-nike-praia.jpg"
  },
  {
    id: 6,
    name: "Moletom Nike Club Preto",
    brand: "Nike",
    category: "jaquetas",
    categoryLabel: "Jaquetas / Moletons",
    price: 379.99,
    installments: "12x de R$ 39,09",
    sizes: ["P", "M", "G", "GG"],
    image: "img/moletom-nike-club.jpg"
  },
  {
    id: 7,
    name: "Jaqueta Lacoste Monograma Bege",
    brand: "Lacoste",
    category: "jaquetas",
    categoryLabel: "Jaquetas / Moletons",
    price: 999.99,
    installments: "12x de R$ 102,87",
    sizes: ["P", "M", "G", "GG"],
    image: "img/jaqueta-lacoste.jpg"
  },
  {
    id: 8,
    name: "Calça Jeans Brow Destroyed",
    brand: "Brow",
    category: "calcas",
    categoryLabel: "Calças",
    price: 189.46,
    installments: "12x de R$ 19,49",
    sizes: ["38", "40", "42", "44"],
    image: "img/calca-jeans-brow.jpg"
  },
  {
    id: 9,
    name: "Slide Lacoste 2.0 Branca",
    brand: "Lacoste",
    category: "calcados",
    categoryLabel: "Tênis / Slides",
    price: 329.99,
    installments: "12x de R$ 33,94",
    sizes: ["38", "39", "40", "41", "42", "43"],
    image: "img/slide-lacoste.jpg"
  },
  {
    id: 10,
    name: "Tênis Nike Court Vision",
    brand: "Nike",
    category: "calcados",
    categoryLabel: "Tênis / Slides",
    price: 420.00,
    installments: "12x de R$ 43,20",
    sizes: ["38", "39", "40", "41", "42", "43"],
    image: "img/tenis-nike-court.jpg"
  }
];

let cart = [];
let currentCategory = "todos";

// Elementos do DOM
const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const categoryTitle = document.getElementById("category-title");
const searchInput = document.getElementById("search-input");
const navButtons = document.querySelectorAll(".nav-btn");

// Renderizar Produtos
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = products.filter(item => {
    const matchesCategory = currentCategory === "todos" || item.category === currentCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  productCount.textContent = `${filtered.length} produto(s) encontrado(s)`;
  productsGrid.innerHTML = "";

  filtered.forEach(product => {
    const sizeOptions = product.sizes
      .map(size => `<option value="${size}">${size}</option>`)
      .join("");

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-box">
        <span class="brand-tag">${product.brand}</span>
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/300x300?text=${encodeURIComponent(product.name)}'">
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoryLabel}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</div>
        <div class="product-installments">💳 ${product.installments}</div>
        
        <div class="size-selector">
          <label for="size-${product.id}">TAMANHO</label>
          <select id="size-${product.id}">
            ${sizeOptions}
          </select>
        </div>

        <button class="add-btn" onclick="addToCart(${product.id})">Adicionar à Sacola</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Filtro de Categorias
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    categoryTitle.textContent = currentCategory === "todos" ? "Destaques da Loja" : btn.textContent;
    renderProducts();
  });
});

// Busca em tempo real
searchInput.addEventListener("input", renderProducts);

// Funções do Carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const selectedSize = document.getElementById(`size-${productId}`).value;

  cart.push({
    ...product,
    selectedSize,
    cartItemId: Date.now()
  });

  updateCartUI();
  openCart();
}

function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotalPrice = document.getElementById("cart-total-price");

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Sua sacola está vazia.</p>`;
    cartTotalPrice.textContent = "R$ 0,00";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart
    .map(item => {
      total += item.price;
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>Tamanho: <strong>${item.selectedSize}</strong> | R$ ${item.price.toFixed(2).replace(".", ",")}</p>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.cartItemId})">Remover</button>
        </div>
      `;
    })
    .join("");

  cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// Controle do Drawer do Carrinho
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Finalizar no WhatsApp
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Adicione pelo menos um produto na sacola!");
    return;
  }

  let message = "Olá, *Bigodes DF*! Gostaria de fazer o seguinte pedido:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} (Tam: ${item.selectedSize}) - R$ ${item.price.toFixed(2).replace(".", ",")}\n`;
    total += item.price;
  });

  message += `\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;

  const phone = "5561999999999"; // Coloque o número real do WhatsApp da loja aqui
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// Inicializar loja
renderProducts();
