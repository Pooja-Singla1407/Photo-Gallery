
import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'photo-gallery-favorites'

// Load saved favourites from localStorage
function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY)

    if (!savedFavorites) {
      return []
    }

    const parsedFavorites = JSON.parse(savedFavorites)

    return Array.isArray(parsedFavorites)
      ? parsedFavorites
      : []
  } catch {
    return []
  }
}

// Reducer to add or remove a favourite
function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      if (state.includes(action.id)) {
        // Remove photo from favourites
        return state.filter((id) => id !== action.id)
      }

      // Add photo to favourites
      return [...state, action.id]

    default:
      return state
  }
}

function useFavorites() {
  // Initialize the reducer with saved favourites
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    loadFavorites
  )

  // Save favourites whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      )
    } catch {
      // Storage may be unavailable or full
    }
  }, [favorites])

  // Toggle a photo's favourite status
  function toggleFavorite(id) {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      id,
    })
  }

  return { favorites, toggleFavorite }
}

export default useFavorites
