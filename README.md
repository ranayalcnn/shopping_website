<div align="center">

# Lunora

### A modern fashion shopping experience

A full-stack e-commerce interface built with React and Express, featuring smooth animations, curated collections, product discovery, favorites, cart management and a multi-step checkout flow.

[Live Demo](https://lunora-snowy.vercel.app) · [View Repository](https://github.com/ranayalcnn/shopping_website)

</div>

![Lunora collection](client/public/images/fall.jpg)

## About the project

Lunora is a responsive fashion shopping website designed around a clean, modern storefront experience. Users can browse women's, men's and streetwear collections, explore product details, save favorites, manage a shopping bag and continue through checkout.

The project is split into a React client and an Express server. Product data is served through a simple REST API, while the interface uses reusable components and animated page transitions.

## Features

- Product browsing by collection and category
- Search, filtering and sorting
- Individual product pages with size and quantity selection
- Favorites and shopping bag management
- Multi-step checkout with address, payment and order review sections
- Login, registration, profile and settings interfaces
- Light and dark themes
- Animated page transitions and interactive UI feedback
- Responsive, reusable component structure
- REST endpoints for product listing and product details

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React, React Router, Tailwind CSS |
| UI & animation | Framer Motion, Lucide React, React Icons, React Hot Toast |
| Data fetching | Axios |
| Backend | Node.js, Express, CORS |
| Deployment | Vercel |

## Project structure

```text
shopping_website/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── pages/
├── server/
│   ├── controllers/
│   ├── routes/
│   └── index.js
└── vercel.json
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/ranayalcnn/shopping_website.git
cd shopping_website
```

### 2. Start the server

```bash
cd server
npm install
npm start
```

The API runs at `http://localhost:5000` by default.

### 3. Start the client

Open a second terminal:

```bash
cd client
npm install
npm start
```

The client opens at `http://localhost:3000`.

## Environment configuration

The client uses `http://localhost:5000/api` as its default API URL. To use another backend, create a `.env` file inside `client/`:

```env
REACT_APP_API_URL=https://your-api-url.com/api
```

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Returns all products |
| GET | `/api/products/:id` | Returns a product by ID |

## Author

Developed by [Rana Yalçın](https://github.com/ranayalcnn).
