# E-Commerce Website

A complete e-commerce website built with Vanilla JavaScript, following the MVCS pattern.

## Project Structure

```
├── src/
│   ├── js/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── views/
│   │   └── app.js
│   └── scss/
│       ├── components/
│       ├── pages/
│       ├── _variables.scss
│       ├── _mixins.scss
│       ├── _base.scss
│       └── main.scss
├── dist/
│   └── css/
├── index.html
├── db.json
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the json-server (port 3001) and lite-server (port 3000)

## Available Scripts

- `npm start`: Start lite-server
- `npm run server`: Start json-server
- `npm run dev`: Start both servers concurrently
- `npm run sass`: Watch SCSS files for changes

## Features

- Home Page
- Sign Up/Login
- Product Listing
- Product Details
- Shopping Cart
- Wishlist
- Checkout
- User Account
- About & Contact Pages
- 404 Error Page

## Technologies Used

- Vanilla JavaScript
- SCSS
- json-server (for mock API)
- npm
- lite-server (for development) 