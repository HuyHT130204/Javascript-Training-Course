import View from './View.js';

const placeholderImg = 'https://via.placeholder.com/190x180?text=No+Image';

const products = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: 40,
    image: 'src/assets/gamepad.png',
    rating: 5,
    ratingCount: 88,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    price: 960,
    oldPrice: 1160,
    discount: 35,
    image: 'src/assets/keyboard.png',
    rating: 4,
    ratingCount: 75,
  },
  {
    id: 3,
    name: 'IPS LCD Gaming Monitor',
    price: 370,
    oldPrice: 400,
    discount: 30,
    image: 'src/assets/monitor.png',
    rating: 5,
    ratingCount: 99,
  },
  {
    id: 4,
    name: 'S-Series Comfort Chair',
    price: 375,
    oldPrice: 400,
    discount: 25,
    image: 'src/assets/chair.png',
    rating: 4.5,
    ratingCount: 99,
  },
  {
    id: 5,
    name: 'Another Product',
    price: 199,
    oldPrice: 299,
    discount: 33,
    image: 'src/assets/chair.png',
    rating: 4,
    ratingCount: 12,
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 49,
    oldPrice: 79,
    discount: 38,
    image: '',
    rating: 4.2,
    ratingCount: 45,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89,
    oldPrice: 120,
    discount: 26,
    image: '',
    rating: 4.7,
    ratingCount: 67,
  },
];

const heartIcon = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const eyeIcon = `<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const starIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.273L16.18 19L14.545 12.545L19 8.36499L12.09 7.63699L10 1.81899L7.91 7.63699L1 8.36499L5.455 12.545L3.82 19L10 15.273Z" fill="#FFAD33"/></svg>`;
const starEmptyIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.273L16.18 19L14.545 12.545L19 8.36499L12.09 7.63699L10 1.81899L7.91 7.63699L1 8.36499L5.455 12.545L3.82 19L10 15.273Z" fill="#E0E0E0"/></svg>`;

function renderStars(rating) {
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < fullStars; i++) html += starIcon;
  if (halfStar) html += starIcon;
  for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) html += starEmptyIcon;
  return html;
}

class FlashSales extends View {
  async render() {
    return `
      <section class="flash-sales-section container">
        <div class="flash-sales-today-row">
          <span class="today-bar"></span>
          <span class="today-label">Today's</span>
        </div>
        <div class="flash-sales-header-row">
          <div class="flash-sales-title">Flash Sales</div>
          <div class="flash-sales-countdown">
            <div class="countdown-label-row">
              <span class="countdown-label">Days</span>
              <span class="countdown-label">Hours</span>
              <span class="countdown-label">Minutes</span>
              <span class="countdown-label">Seconds</span>
            </div>
            <div class="countdown-value-row">
              <span class="countdown-value" data-type="days">03</span>
              <span class="countdown-colon">:</span>
              <span class="countdown-value" data-type="hours">23</span>
              <span class="countdown-colon">:</span>
              <span class="countdown-value" data-type="minutes">19</span>
              <span class="countdown-colon">:</span>
              <span class="countdown-value" data-type="seconds">56</span>
            </div>
          </div>
          <div class="flash-sales-arrows">
            <button class="arrow-btn prev" aria-label="Previous">&#8592;</button>
            <button class="arrow-btn next" aria-label="Next">&#8594;</button>
          </div>
        </div>
        <div class="flash-sales-list-wrapper">
          <div class="flash-sales-list">
            ${products.map(product => `
              <div class="flash-sales-card">
                <div class="card-img-wrapper">
                  <span class="discount-badge">-${product.discount}%</span>
                  <div class="img-bg">
                    <img src="${product.image || placeholderImg}" alt="${product.name}" class="product-img" width="190" height="180"/>
                  </div>
                  <div class="card-icons">
                    <span class="icon-heart">${heartIcon}</span>
                    <span class="icon-eye">${eyeIcon}</span>
                  </div>
                  <button class="add-to-cart-btn">Add To Cart</button>
                </div>
                <div class="card-info">
                  <div class="card-name">${product.name}</div>
                  <div class="card-prices">
                    <span class="price-new">$${product.price}</span>
                    <span class="price-old">$${product.oldPrice}</span>
                  </div>
                  <div class="card-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <span class="rating-count">(${product.ratingCount})</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="flash-sales-footer">
          <button class="view-all-btn">View All Products</button>
        </div>
      </section>
    `;
  }

  afterRender() {
    this.initializeScrollFunctionality();
    this.initializeArrowButtons();
    this.initializeCountdown();
  }

  initializeScrollFunctionality() {
    const wrapper = document.querySelector('.flash-sales-list-wrapper');
    if (!wrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      wrapper.classList.add('active');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      e.preventDefault();
      wrapper.style.userSelect = 'none';
    });

    wrapper.addEventListener('mouseleave', () => {
      isDown = false;
      wrapper.classList.remove('active');
      wrapper.style.userSelect = '';
    });

    wrapper.addEventListener('mouseup', () => {
      isDown = false;
      wrapper.classList.remove('active');
      wrapper.style.userSelect = '';
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Increased scroll speed
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    wrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      isDown = false;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2;
      wrapper.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    // Wheel scroll support
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    });
  }

  initializeArrowButtons() {
    const wrapper = document.querySelector('.flash-sales-list-wrapper');
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');

    if (!wrapper || !prevBtn || !nextBtn) return;

    const cardWidth = 270; // width of one card
    const gap = 30; // gap between cards
    const scrollDistance = cardWidth + gap;

    prevBtn.addEventListener('click', () => {
      wrapper.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      wrapper.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
    });

    // Update button states based on scroll position
    const updateButtonStates = () => {
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
      
      prevBtn.disabled = wrapper.scrollLeft <= 0;
      nextBtn.disabled = wrapper.scrollLeft >= maxScroll;
      
      if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.5';
      } else {
        prevBtn.style.opacity = '1';
      }
      
      if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.5';
      } else {
        nextBtn.style.opacity = '1';
      }
    };

    wrapper.addEventListener('scroll', updateButtonStates);
    updateButtonStates(); // Initial state
  }

  initializeCountdown() {
    // Lấy các phần tử số
    const daysEl = document.querySelector('.countdown-value[data-type="days"]');
    const hoursEl = document.querySelector('.countdown-value[data-type="hours"]');
    const minutesEl = document.querySelector('.countdown-value[data-type="minutes"]');
    const secondsEl = document.querySelector('.countdown-value[data-type="seconds"]');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    let days = 3, hours = 23, minutes = 19, seconds = 56;
    function pad(n) { return n.toString().padStart(2, '0'); }
    function render() {
      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }
    render();
    setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes > 0) {
          minutes--; seconds = 59;
        } else if (hours > 0) {
          hours--; minutes = 59; seconds = 59;
        } else if (days > 0) {
          days--; hours = 23; minutes = 59; seconds = 59;
        } else {
          days = hours = minutes = seconds = 0;
        }
      }
      render();
    }, 1000);
  }
}

export default FlashSales;
