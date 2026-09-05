import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = void 0;
const supabaseAnonKey = void 0;
const isCloudConfigured = Boolean(
  supabaseUrl
);
const supabase = isCloudConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
export {
  isCloudConfigured as i,
  supabase as s
};
