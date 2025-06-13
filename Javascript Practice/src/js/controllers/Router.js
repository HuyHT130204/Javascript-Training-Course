export class Router {
    constructor() {
        this.routes = {
            '/': 'Home',
            '/signup': 'SignUp',
            '/login': 'Login',
            '/wishlist': 'Wishlist',
            '/cart': 'Cart',
            '/checkout': 'Checkout',
            '/account': 'Account',
            '/about': 'About',
            '/contact': 'Contact',
            '/product': 'ProductDetail',
            '/404': 'NotFound'
        };
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const page = this.routes[path] || 'NotFound';
        
        try {
            const module = await import(`../views/${page}.js`);
            const view = new module.default();
            document.getElementById('app').innerHTML = await view.render();
            view.afterRender();
        } catch (error) {
            console.error('Error loading page:', error);
            this.navigateTo('/404');
        }
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }
} 
