import View from './View.js';
import HomeHero from './HomeHero.js';

class Home extends View {
  async render() {
    // Render Hero section
    const hero = new HomeHero();
    const content = hero.generateMarkup();
    return await this.renderWithHeaderAndFooter(content);
  }
  afterRender() {
    // Thêm logic JS cho Home nếu cần
  }
}

export default Home; 
