export type Article = {
  id: string
  title: string
  content: string
  category: string
  slug: string
  icon?: string
  created_at: string
  updated_at: string
}

export type Company = {
  id: string
  name: string
  city: string
  description: string
  services: string[]
  phone: string
  email: string
  website?: string
  verified: boolean
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: Article
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>
      }
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}