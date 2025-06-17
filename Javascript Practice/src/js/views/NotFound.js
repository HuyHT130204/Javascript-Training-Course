import { View } from './View.js';

export default class NotFound extends View {
  async render() {
    const content = `
      <div class="container" style="padding: 64px 0; text-align: center;">
        <h1 style="font-size: 48px; font-weight: 700; color: #dc3545;">404</h1>
        <p style="font-size: 20px; color: #333;">Sorry, the page you are looking for does not exist.</p>
      </div>
    `;
    return await this.renderWithHeaderAndFooter(content);
  }
}
