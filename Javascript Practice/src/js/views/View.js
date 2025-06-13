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
} 
