const restaurantsData = [
  {
    id: 1,
    name: 'Макдоналдс — Газетный',
    cuisine: '₽₽ • Бургеры',
    deliveryTime: '25 - 35 мин',
    image: 'assets/img/Stores/1.png',
    rating: 4.2,
    isOpen: true
  },
  {
    id: 2,
    name: 'DimSum & Co — ЦДМ',
    cuisine: '₽ • Японская • Китайская • Азиатская',
    deliveryTime: '40 - 50 мин',
    image: 'assets/img/Stores/2.png',
    rating: 4.5,
    isOpen: true
  },
  {
    id: 3,
    name: 'ДвижОК — Манежная',
    cuisine: '₽ • Американская • Европейская',
    deliveryTime: '35 - 45 мин',
    image: 'assets/img/Stores/3.png',
    rating: 4.1,
    isOpen: true
  },
  {
    id: 4,
    name: 'НЯ — NHA',
    cuisine: '₽₽ • Вьетнамская',
    deliveryTime: '30 - 40 мин',
    image: 'assets/img/Stores/4.png',
    rating: 4.3,
    isOpen: true
  },
  {
    id: 5,
    name: 'Точка Дзы — Цветной',
    cuisine: '₽₽ • Вьетнамская',
    deliveryTime: '40 - 50 мин',
    image: 'assets/img/Stores/5.png',
    rating: 4.4,
    isOpen: true
  },
  {
    id: 6,
    name: 'Cinnabon',
    cuisine: '₽ • Выпечка • Десерты • Капкейки',
    deliveryTime: '25 - 35 мин',
    image: 'assets/img/Stores/6.png',
    rating: 4.0,
    isOpen: true
  },
  {
    id: 7,
    name: 'PIZZELOVE',
    cuisine: '₽₽ • Пицца',
    deliveryTime: '15 - 25 мин',
    image: 'assets/img/Stores/7.png',
    rating: 4.6,
    isOpen: true
  },
  {
    id: 8,
    name: 'Zю кафе — Тверская',
    cuisine: '₽₽ • Японская',
    deliveryTime: '25 - 35 мин',
    image: 'assets/img/Stores/8.png',
    rating: 4.3,
    isOpen: true
  },
  {
    id: 9,
    name: 'Bar BQ Cafe — Манежная',
    cuisine: '₽₽₽ • Европейская',
    deliveryTime: '30 - 40 мин',
    image: 'assets/img/Stores/9.png',
    rating: 4.7,
    isOpen: true
  }
];


function createRestaurantCard(restaurant) {
  const ratingStars = generateRatingStars(restaurant.rating);
  
  return `
    <div class="col-md-4 col-sm-6 mb-4">
      <div class="card restaurant-card" data-restaurant-id="${restaurant.id}">
        <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}" loading="lazy">
        <div class="card-body">
          <h6 class="restaurant-name">${restaurant.name}</h6>
          <p class="restaurant-cuisine">${restaurant.cuisine}</p>
          <p class="restaurant-delivery">${restaurant.deliveryTime}</p>
          <div class="restaurant-rating">
            ${ratingStars}
            <span class="rating-text">${restaurant.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}


function generateRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let starsHTML = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star star-filled">★</span>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<span class="star star-half">★</span>';
  }
  
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star star-empty">☆</span>';
  }
  
  return starsHTML;
}


function displayRestaurants(restaurants = restaurantsData) {
  const gridContainer = document.getElementById('restaurants-grid');
  
  if (!gridContainer) {
    console.error('Restaurants grid container not found');
    return;
  }
  
  if (restaurants.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="no-results">
          <h3>Рестораны не найдены</h3>
          <p>Попробуйте изменить поисковый запрос</p>
        </div>
      </div>
    `;
    return;
  }
  
  const restaurantsHTML = restaurants.map(createRestaurantCard).join('');
  gridContainer.innerHTML = restaurantsHTML;
}


function filterRestaurants(searchTerm) {
  if (!searchTerm.trim()) {
    return restaurantsData;
  }
  
  const term = searchTerm.toLowerCase();
  
  return restaurantsData.filter(restaurant => 
    restaurant.name.toLowerCase().includes(term) ||
    restaurant.cuisine.toLowerCase().includes(term)
  );
}


function handleSearch(event) {
  const searchTerm = event.target.value;
  const filteredRestaurants = filterRestaurants(searchTerm);
  displayRestaurants(filteredRestaurants);
}


function handleRestaurantClick(event) {
  const card = event.target.closest('.restaurant-card');
  if (!card) return;
  
  const restaurantId = card.dataset.restaurantId;
  const restaurant = restaurantsData.find(r => r.id === parseInt(restaurantId));
  
  if (restaurant) {
    console.log('Открыть ресторан:', restaurant.name);
  }
}


function handleCartClick() {
  console.log('Открыть корзину');
}


function handleLanguageChange(event) {
  const lang = event.target.dataset.lang;
  if (lang) {
    console.log('Сменить язык на:', lang);
  }
}


function addEventListeners() {
  const searchInput = document.getElementById('restaurant-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  document.addEventListener('click', handleRestaurantClick);
  
  const cartButton = document.getElementById('cart');
  if (cartButton) {
    cartButton.addEventListener('click', handleCartClick);
  }
  
  const languageItems = document.querySelectorAll('[data-lang]');
  languageItems.forEach(item => {
    item.addEventListener('click', handleLanguageChange);
  });
  
  const loginButton = document.querySelector('.btn-outline-light');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      console.log('Открыть форму входа');
    });
  }
}

function initApp() {
  displayRestaurants();
  
  addEventListeners();
  
  addRatingStyles();
  
  console.log('Uber Eats app initialized');
}

function addRatingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .restaurant-rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 8px;
    }
    
    .star {
      font-size: 14px;
      color: #ccc;
    }
    
    .star-filled {
      color: #ffc107;
    }
    
    .star-half {
      color: #ffc107;
      position: relative;
    }
    
    .star-half::after {
      content: '☆';
      position: absolute;
      left: 0;
      color: #ccc;
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    
    .rating-text {
      font-size: 12px;
      color: #666;
      margin-left: 5px;
    }
    
    .no-results {
      padding: 40px 20px;
      color: #666;
    }
    
    .no-results h3 {
      margin-bottom: 10px;
    }
  `;
  document.head.appendChild(style);
}

const StorageUtils = {
  saveSearchHistory: (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [searchTerm, ...history.filter(term => term !== searchTerm)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  },
  
  getSearchHistory: () => {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  },
  
  clearSearchHistory: () => {
    localStorage.removeItem('searchHistory');
  }
};

const Analytics = {
  trackSearch: (searchTerm) => {
    console.log('Search tracked:', searchTerm);
  },
  
  trackRestaurantClick: (restaurantId, restaurantName) => {
    console.log('Restaurant click tracked:', restaurantId, restaurantName);
  }
};

document.addEventListener('DOMContentLoaded', initApp);

window.UberEatsApp = {
  restaurantsData,
  displayRestaurants,
  filterRestaurants,
  StorageUtils,
  Analytics
};
