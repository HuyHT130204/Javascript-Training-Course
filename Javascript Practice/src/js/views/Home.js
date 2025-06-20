import View from './View.js';
import HomeHero from './HomeHero.js';
import FlashSales from './FlashSales.js';

class Home extends View {
  async render() {
    // Render Hero section
    const hero = new HomeHero();
    const flashSales = new FlashSales();
    const content = `${hero.generateMarkup()}${await flashSales.render()}`;
    return await this.renderWithHeaderAndFooter(content);
  }
  afterRender() {
    // Thêm logic JS cho Home nếu cần
    const flashSales = new FlashSales();
    flashSales.afterRender();
  }
}

export default Home; 
