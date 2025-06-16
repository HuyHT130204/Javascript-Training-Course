import { View } from './View.js';
import Header from './Header.js';

export default class NotFound extends View {
  constructor() {
    super();
  }

  async render() {
    const header = new Header();
    return `
      ${await header.render()}
      <div class="container" style="padding: 64px 0; text-align: center;">
        <h1 style="font-size: 48px; font-weight: 700; color: #dc3545;">404</h1>
        <p style="font-size: 20px; color: #333;">Sorry, the page you are looking for does not exist.</p>
      </div>
    `;
  }
}
