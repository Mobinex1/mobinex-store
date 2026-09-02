const products = [
  {
    id: 1,
    name: 'AeroShield Case',
    category: 'cases',
    price: 29.99,
    rating: 4.8,
    tag: 'New',
    image:
      'https://images.unsplash.com/photo-1601784551446-20c9e07c5906?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'VoltMax Charger',
    category: 'chargers',
    price: 42.5,
    rating: 4.7,
    tag: 'Top rated',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'AirWave Pro',
    category: 'earbuds',
    price: 89.99,
    rating: 4.9,
    tag: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'PowerLite 10000',
    category: 'powerbanks',
    price: 64.99,
    rating: 4.8,
    tag: 'Popular',
    image:
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'CrystalGuard Glass',
    category: 'screens',
    price: 18.5,
    rating: 4.6,
    tag: 'Deal',
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'FlexDock Hub',
    category: 'accessories',
    price: 54.0,
    rating: 4.7,
    tag: 'Hot',
    image:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'UrbanGrip Stand',
    category: 'accessories',
    price: 32.0,
    rating: 4.5,
    tag: 'New',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'ChargeGo USB-C',
    category: 'chargers',
    price: 27.99,
    rating: 4.7,
    tag: 'Fast charge',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    name: 'NeoSnap Cover',
    category: 'cases',
    price: 36.25,
    rating: 4.8,
    tag: 'Limited',
    image:
      'https://images.unsplash.com/photo-1578319439593-6d9f7ea5d4d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    name: 'PureSound Lite',
    category: 'earbuds',
    price: 74.5,
    rating: 4.6,
    tag: 'Wireless',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    name: 'ShieldX Bundle',
    category: 'screens',
    price: 22.0,
    rating: 4.5,
    tag: 'Bundle',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    name: 'TravelFuel Mini',
    category: 'powerbanks',
    price: 49.99,
    rating: 4.7,
    tag: 'Travel',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const resultsCount = document.getElementById('resultsCount');
const cartButton = document.querySelector('.action-btn.primary');
const categoryButtons = document.querySelectorAll('.chip');
const categoryCards = document.querySelectorAll('.category-card');

let selectedCategory = 'all';
let cartCount = 0;

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const maxPrice = Number(priceRange.value);

  return products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  resultsCount.textContent = `${filteredProducts.length} items`;

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Try a different search or adjust the price filter.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-wrap">
            <span class="badge">${product.tag}</span>
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <div class="product-name-row">
              <h3>${product.name}</h3>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <div class="product-meta">${product.category}</div>
            <div class="product-footer">
              <span class="price">${formatPrice(product.price)}</span>
              <button class="add-cart" type="button">Add to Cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

searchInput.addEventListener('input', renderProducts);
productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-cart');
  if (!addButton) return;

  cartCount += 1;
  cartButton.textContent = `Cart (${cartCount})`;
  addButton.textContent = 'Added';
  addButton.disabled = true;
});

priceRange.addEventListener('input', () => {
  priceValue.textContent = `$${Number(priceRange.value)}`;
  renderProducts();
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    selectedCategory = category;

    categoryButtons.forEach((chip) => chip.classList.toggle('active', chip === button));

    categoryCards.forEach((card) => {
      const active = card.dataset.category === category || category === 'all';
      card.style.outline = active ? '2px solid rgba(50, 92, 255, 0.3)' : 'none';
      card.style.borderColor = active ? 'rgba(50, 92, 255, 0.2)' : '#e7ebf4';
    });

    renderProducts();
  });
});

categoryCards.forEach((card) => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    selectedCategory = category;

    categoryButtons.forEach((chip) =>
      chip.classList.toggle('active', chip.dataset.category === category)
    );

    categoryCards.forEach((item) => {
      const active = item.dataset.category === category;
      item.style.outline = active ? '2px solid rgba(50, 92, 255, 0.3)' : 'none';
      item.style.borderColor = active ? 'rgba(50, 92, 255, 0.2)' : '#e7ebf4';
    });

    renderProducts();
  });
});

priceValue.textContent = `$${priceRange.value}`;
renderProducts();
