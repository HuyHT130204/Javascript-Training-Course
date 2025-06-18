import View from './View.js';

const arrowSVG = `<svg width="7.78" height="12.73" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;"><path d="M1 1L6.364 6.364L1 11.728" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class HomeHero extends View {
  _parentElement = document.querySelector('.main-content');

  generateMarkup() {
    return `
      <section class="home-hero">
        <aside class="home-hero__sidebar">
          <ul>
            <li>Woman's Fashion <span class="arrow">${arrowSVG}</span></li>
            <li>Men's Fashion <span class="arrow">${arrowSVG}</span></li>
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby's & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
          </ul>
        </aside>
        <div class="home-hero__banner">
          <div class="banner-content">
            <div class="banner-header">
              <img src="src/assets/apple-logo.png" alt="Apple" class="banner-logo" />
              <div class="banner-series">iPhone 14 Series</div>
            </div>
            <div class="banner-title">Up to 10% off Voucher</div>
            <button class="banner-cta"><span class="underline">Shop Now</span> 
              <span class="arrow">
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 8H18M18 8L11 1M18 8L11 15" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
          <div class="banner-image-wrap">
            <img src="src/assets/hero-product.jpg" alt="iPhone 14" class="banner-image" />
          </div>
          <div class="banner-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </section>
    `;
  }
}

export default HomeHero; 
