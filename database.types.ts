export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      github_user: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
