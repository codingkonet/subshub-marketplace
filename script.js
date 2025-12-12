// Sample products data
const products = [
    {
        id: 1,
        name: 'Netflix Premium',
        category: 'streaming',
        description: '3 mois d'accès Netflix Premium - 4K Ultra HD',
        price: '29.99',
        duration: '3 mois',
        vendor: 'TechHub Store',
        rating: '4.9',
        reviews: 245
    },
    {
        id: 2,
        name: 'Spotify Premium',
        category: 'music',
        description: '6 mois de musique illimitée sans publicité',
        price: '24.99',
        duration: '6 mois',
        vendor: 'Digital Solutions',
        rating: '4.8',
        reviews: 189
    },
    {
        id: 3,
        name: 'Crunchyroll Standard',
        category: 'streaming',
        description: '1 an d'accès à la plus grande plateforme anime',
        price: '49.99',
        duration: '1 an',
        vendor: 'Anime Store',
        rating: '4.7',
        reviews: 312
    },
    {
        id: 4,
        name: 'PlayStation Plus',
        category: 'gaming',
        description: '12 mois d'accès au service de jeux PlayStation',
        price: '59.99',
        duration: '12 mois',
        vendor: 'Gaming Hub',
        rating: '4.6',
        reviews: 428
    },
    {
        id: 5,
        name: 'Xbox Game Pass',
        category: 'gaming',
        description: 'Accès à plus de 100 jeux Xbox pendant 3 mois',
        price: '34.99',
        duration: '3 mois',
        vendor: 'TechHub Store',
        rating: '4.8',
        reviews: 356
    },
    {
        id: 6,
        name: 'Adobe Creative Cloud',
        category: 'other',
        description: 'Suite complète Adobe - 1 mois d'essai gratuit inclus',
        price: '54.99',
        duration: '12 mois',
        vendor: 'Software Deals',
        rating: '4.9',
        reviews: 267
    },
    {
        id: 7,
        name: 'Disney+',
        category: 'streaming',
        description: '6 mois de films et séries Disney, Pixar et Marvel',
        price: '39.99',
        duration: '6 mois',
        vendor: 'Entertainment Plus',
        rating: '4.7',
        reviews: 198
    },
    {
        id: 8,
        name: 'YouTube Premium',
        category: 'streaming',
        description: 'Sans publicités + contenu exclusif pendant 6 mois',
        price: '19.99',
        duration: '6 mois',
        vendor: 'Digital Solutions',
        rating: '4.6',
        reviews: 421
    }
];

let cart = [];
let currentFilter = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilters();
    setupModal();
});

// Render products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-header">${product.name}</div>
            <div class="product-body">
                <span class="product-category">${product.category}</span>
                <p class="product-description">${product.description}</p>
                <div class="product-info">
                    📅 Durée: ${product.duration}<br>
                    👤 Vendeur: ${product.vendor}
                </div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">$${product.price}</div>
                        <div class="product-rating">⭐ ${product.rating} (${product.reviews})</div>
                    </div>
                    <button class="btn-view" onclick="openModal(${product.id})">Voir</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter products
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;

            const filtered = currentFilter === 'all' 
                ? products 
                : products.filter(p => p.category === currentFilter);
            renderProducts(filtered);
        });
    });
}

// Modal functions
function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = `Catégorie: ${product.category}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalDuration').textContent = product.duration;
    document.getElementById('modalVendor').textContent = product.vendor;
    document.getElementById('modalRating').textContent = `${product.rating} ⭐ (${product.reviews} avis)`;
    document.getElementById('modalPrice').textContent = `$${product.price}`;

    const modal = document.getElementById('productModal');
    modal.style.display = 'block';

    document.getElementById('addToCartBtn').onclick = () => {
        addToCart(product);
        modal.style.display = 'none';
    };
}

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    alert(`✅ ${product.name} ajouté au panier!`);
}

function updateCartCount() {
    const cartBtn = document.querySelector('.btn-cart');
    cartBtn.textContent = `🛒 Panier (${cart.length})`;
}

// Search functionality
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});