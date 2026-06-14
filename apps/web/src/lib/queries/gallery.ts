export const albumsPaginatedQuery = `{
  "items": *[_type == "album"] | order(date desc) [$from...$to] {
    _id,
    title,
    slug,
    date,
    description,
    "photoCount": count(photos),
    "coverImage": coverImage.asset->{ url, metadata { dimensions } }
  },
  "total": count(*[_type == "album"])
}`

export const albumBySlugQuery = `*[_type == "album" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  description,
  "photos": photos[].asset->{ _id, url, metadata { dimensions } }
}`

export interface AlbumSummary {
  _id: string
  title: string
  slug: { current: string }
  date: string
  description?: string
  photoCount: number
  coverImage?: {
    url: string
    metadata: { dimensions: { width: number; height: number; aspectRatio: number } }
  }
}

export interface AlbumDetail {
  _id: string
  title: string
  slug: { current: string }
  date: string
  description?: string
  photos: Array<{
    _id: string
    url: string
    metadata: { dimensions: { width: number; height: number } }
  }>
}
