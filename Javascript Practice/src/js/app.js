// Import controllers
import { Router } from './controllers/Router.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    router.init();
}); 
