# 📸 Photo Gallery

A responsive photo gallery built using **React, Vite, and Tailwind CSS**. Browse photos, search by author, and save your favourite photos with persistent storage.

## ✨ Features

- **Photo Fetching:** Fetches 30 photos from the Picsum Photos API.
- **Loading State:** Displays a spinner while photos are loading.
- **Error Handling:** Shows an error message if the API request fails and a fallback message if an image cannot load.
- **Responsive Design:** Displays 4 columns on desktop, 2 on tablets, and 1 on mobile devices.
- **Author Search:** Search photos by author name in real time without making additional API requests.
- **Favourites:** Add or remove photos from your favourites using heart icons.
- **Persistent Storage:** Saves favourite photo IDs in `localStorage`, so they remain saved after refreshing the page.
- **Custom Hooks:** Uses `useFetchPhotos` to fetch data and `useFavorites` to manage favourites.
- **React Hooks:** Uses `useState`, `useEffect`, `useReducer`, `useCallback`, and `useMemo`.

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Picsum Photos API
- Browser `localStorage`

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/Photo-Gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Photo-Gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173/`.

## 📂 Project Structure

```text
src/
├── components/
│   └── PhotoGallery.jsx
├── hooks/
│   ├── useFetchPhotos.js
│   └── useFavorites.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🌐 API

This project uses the [Picsum Photos API](https://picsum.photos/v2/list?limit=30) to retrieve photo information.

## 📌 Future Improvements

- Add a dedicated favourites filter.
- Add pagination or a load-more feature.
- Improve image-loading placeholders and retry handling.
- Deploy the application for public access.

## 📄 License

This project is open source and available for learning and personal use.
