import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

function missingClient(): SupabaseClient {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          "Falta VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. Copiá .env.example a .env.local."
        );
      },
    }
  ) as unknown as SupabaseClient;
}

export const supabase: SupabaseClient =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : missingClient();

export const isSupabaseConfigured = Boolean(url && key);
