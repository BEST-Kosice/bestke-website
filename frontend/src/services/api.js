const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

/**
 * Fetch all published articles from Strapi, sorted by publishDate descending.
 */
export async function fetchArticles() {
  const params = new URLSearchParams({
    "sort[0]": "pinned:desc",
    "sort[1]": "publishDate:desc",
    populate: "*",
    "pagination[pageSize]": "50",
  });

  const res = await fetch(`${STRAPI_URL}/api/articles?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);

  const json = await res.json();
  return json.data;
}

/**
 * Fetch a single article by its slug.
 */
export async function fetchArticleBySlug(slug) {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  const res = await fetch(`${STRAPI_URL}/api/articles?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`);

  const json = await res.json();
  return json.data?.[0] ?? null;
}

/**
 * Get the full URL for a Strapi media asset.
 */
export function getStrapiMediaUrl(media) {
  if (!media) return null;
  const url = media.url;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
