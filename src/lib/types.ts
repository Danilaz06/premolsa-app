export type UserRole = 'admin' | 'client'

export interface Profile {
  id: string
  email: string
  role: UserRole
  full_name: string | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  order: number
}

export interface Product {
  id: string
  category_id: string
  name: string
  slug: string
  description: string | null
  specs: Record<string, string> | null
  pdf_url: string | null
  image_url: string | null
  visible: boolean
  created_at: string
  category?: Category
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
  visible: boolean
}

export interface GalleryItem {
  id: string
  image_url: string
  caption: string | null
  order: number
  created_at: string
}
