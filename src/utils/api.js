const BASE_URL = 'https://dummyjson.com/products'

/**
 * Fetches a page of products from the API.
 * @param {number} limit - Number of items per page
 * @param {number} skip - Number of items to skip
 * @returns {Promise<{ products: Array, total: number }>}
 */
export async function fetchProducts(limit = 10, skip = 0) {
  const url = `${BASE_URL}?limit=${limit}&skip=${skip}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return {
    products: data.products ?? [],
    total: data.total ?? 0,
  }
}
