import { createClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          product_id: string;
          author_name: string;
          rating: number;
          body: string;
          created_at: string;
          flagged: boolean;
        };
        Insert: {
          product_id: string;
          author_name: string;
          rating: number;
          body: string;
        };
      };
      coupon_requests: {
        Row: {
          id: string;
          social_handle: string;
          social_platform: string;
          screenshot_url: string;
          wa_number: string;
          code: string;
          status: "issued" | "redeemed";
          created_at: string;
        };
        Insert: {
          social_handle: string;
          social_platform: string;
          screenshot_url: string;
          wa_number: string;
          code: string;
        };
      };
    };
  };
};

// Cliente del browser (usa anon key pública)
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient<Database>(url, key);
}

// Cliente del servidor (usa service role key — solo en API routes)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient(): ReturnType<typeof createClient<any>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role env vars not set");
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
