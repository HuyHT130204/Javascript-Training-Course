export class View {
    constructor() {
        this.app = document.getElementById('app');
    }

    async render() {
        return `
            <div class="container">
                <h1>Page Template</h1>
                <p>This is a base template. Override the render method in child classes.</p>
            </div>
        `;
    }

    afterRender() {
        // Hook for any post-render operations
    }

    setTitle(title) {
        document.title = `${title} | Exclusive`;
    }

    async renderWithHeader(contentHtml) {
        const Header = (await import('./Header.js')).default;
        const header = new Header();
        return `${await header.render()}${contentHtml}`;
    }

    async renderWithHeaderAndFooter(contentHtml) {
        const Header = (await import('./Header.js')).default;
        const Footer = (await import('./Footer.js')).default;
        const header = new Header();
        const footer = new Footer();
        return `${await header.render()}${contentHtml}${await footer.render()}`;
    }
}

export default View; 
