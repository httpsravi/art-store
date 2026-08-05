import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if cloud configuration variables are present and not empty placeholders
export const isCloudConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "PLACEHOLDER" &&
  supabaseAnonKey !== "PLACEHOLDER",
);

export const supabase = isCloudConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
