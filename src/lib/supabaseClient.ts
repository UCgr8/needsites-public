import { createClient } from '@supabase/supabase-js';

// In Lovable with Supabase integration, these are typically handled automatically
// For now using your specific URLs - you may not need manual env vars in Lovable
const supabaseUrl = 'https://ifxetmmcscffwlijpdfs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;