export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      domains: {
        Row: {
          availability_bin: boolean | null
          availability_offer: boolean | null
          availability_rto: boolean | null
          bin_price: number | null
          bundle: string | null
          domain: string
          domain_is_live: boolean | null
          length: number | null
          primary_keyword: string | null
          tags: string[] | null
          tld: string | null
          updated_at: string | null
        }
        Insert: {
          availability_bin?: boolean | null
          availability_offer?: boolean | null
          availability_rto?: boolean | null
          bin_price?: number | null
          bundle?: string | null
          domain: string
          domain_is_live?: boolean | null
          length?: number | null
          primary_keyword?: string | null
          tags?: string[] | null
          tld?: string | null
          updated_at?: string | null
        }
        Update: {
          availability_bin?: boolean | null
          availability_offer?: boolean | null
          availability_rto?: boolean | null
          bin_price?: number | null
          bundle?: string | null
          domain?: string
          domain_is_live?: boolean | null
          length?: number | null
          primary_keyword?: string | null
          tags?: string[] | null
          tld?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      intents: {
        Row: {
          company: string | null
          created_at: string | null
          domain: string | null
          email: string
          host: string | null
          id: string
          kind: string
          name: string
          price: number | null
          rto_downpayment: number | null
          rto_months: number | null
          src: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          domain?: string | null
          email: string
          host?: string | null
          id?: string
          kind: string
          name: string
          price?: number | null
          rto_downpayment?: number | null
          rto_months?: number | null
          src?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          domain?: string | null
          email?: string
          host?: string | null
          id?: string
          kind?: string
          name?: string
          price?: number | null
          rto_downpayment?: number | null
          rto_months?: number | null
          src?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intents_domain_fkey"
            columns: ["domain"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["domain"]
          },
        ]
      }
      offers: {
        Row: {
          company: string | null
          created_at: string | null
          domain: string | null
          email: string
          host: string | null
          id: string
          name: string
          notes: string | null
          offer_amount: number | null
          rto_downpayment: number | null
          rto_months: number | null
          src: string | null
          want_rto: boolean | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          domain?: string | null
          email: string
          host?: string | null
          id?: string
          name: string
          notes?: string | null
          offer_amount?: number | null
          rto_downpayment?: number | null
          rto_months?: number | null
          src?: string | null
          want_rto?: boolean | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          domain?: string | null
          email?: string
          host?: string | null
          id?: string
          name?: string
          notes?: string | null
          offer_amount?: number | null
          rto_downpayment?: number | null
          rto_months?: number | null
          src?: string | null
          want_rto?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_domain_fkey"
            columns: ["domain"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["domain"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
