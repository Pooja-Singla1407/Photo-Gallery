import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import useFavorites from '../hooks/useFavorites'

// Component to handle individual photo loading and errors
function PhotoImage({ photo }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex h-56 w-full items-center justify-center overflow-hidden bg-gray-100">
      {imageError ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-gray-500"
          role="status"
        >
          <span className="text-3xl" aria-hidden="true">🖼️</span>
          <p className="text-sm font-medium">
            Image could not be loaded
          </p>
          <button
            type="button"
            onClick={() => setImageError(false)}
            className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
          >
            Try again
          </button>
        </div>
      ) : (
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

function PhotoGallery() {
  // Fetch photos
  const { photos, loading, error } = useFetchPhotos()

  // Manage favourites
  const { favorites, toggleFavorite } = useFavorites()

  // Search input state
  const [search, setSearch] = useState('')

  // Handle search changes
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  // Filter photos by author
  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    )
  }, [photos, search])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
          role="status"
          aria-label="Loading photos"
        />
        <p className="text-gray-600">Loading photos...</p>
      </div>
    )
  }

  // API error state
  if (error) {
    return (
      <div
        className="flex min-h-screen items-center justify-center p-6 text-center text-red-600"
        role="alert"
      >
        {error}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Photo Gallery
        </h1>

        <p className="mb-6 text-gray-600">
          Explore photos and save your favourites.
        </p>

        {/* Search by author */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by author name..."
          aria-label="Search photos by author"
          className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Photo grid */}
        {filteredPhotos.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No photos found. Try another author name.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => {
              const isFavorite = favorites.includes(photo.id)

              return (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Photo and fallback message */}
                  <PhotoImage
                    key={photo.id}
                    photo={photo}
                  />

                  {/* Author and favourite button */}
                  <div className="flex items-center justify-between gap-3 p-4">
                    <p className="truncate font-medium text-gray-800">
                      {photo.author}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(photo.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${photo.author} from favourites`
                          : `Add ${photo.author} to favourites`
                      }
                      aria-pressed={isFavorite}
                      className={`shrink-0 rounded-full p-2 text-2xl transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isFavorite
                          ? 'text-red-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {isFavorite ? '♥' : '♡'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default PhotoGallery
