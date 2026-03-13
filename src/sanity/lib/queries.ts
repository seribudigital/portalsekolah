import { groq } from 'next-sanity'

// Fetch all posts targeting the main PORTAL
export const portalQuery = groq`
  *[_type == "post" && "PORTAL" in categories[]->value] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "categories": categories[]->value,
    body
  }
`

// Fetch all posts targeting a specific unit
export const unitQuery = groq`
  *[_type == "post" && $unit in categories[]->value] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "categories": categories[]->value,
    body
  }
`

// PAGE CONTENT QUERY (Misal profil, kurikulum)
export const pageContentQuery = groq`*[_type == "pageContent" && slug.current == $slug && unit == $unit][0] {
  _id,
  title,
  content,
  unit,
  faqs,
  aiSummary
}`;

// GURU QUERY
export const guruQuery = groq`*[_type == "guru" && unit == $unit] | order(order asc) {
  _id,
  name,
  mapel,
  image
}`;

// GALLERY QUERY
export const galleryQuery = groq`*[_type == "gallery" && unit == $unit] | order(date desc) {
  _id,
  title,
  image,
  date
}`;
