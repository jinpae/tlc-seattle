export const newsPaginatedQuery = `{
  "items": *[_type == "news"] | order(date desc) [$from...$to] {
    _id,
    title,
    slug,
    date
  },
  "total": count(*[_type == "news"])
}`

export const newsBySlugQuery = `*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  body
}`

export interface NewsItem {
  _id: string
  title: string
  slug: { current: string }
  date: string
}

export interface NewsDetail extends NewsItem {
  body?: unknown[]
}
