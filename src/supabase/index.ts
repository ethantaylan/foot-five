import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const isDev = location.hostname.includes("localhost");

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: isDev ? "public_dev" : "public" },
});
