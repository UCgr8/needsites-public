// Test utility to verify Supabase connection
import supabase from './supabaseClient';

export async function testSupabaseConnection(): Promise<void> {
  try {
    console.log('Testing Supabase connection...');
    
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection failed:', error);
      throw error;
    }
    
    console.log('Supabase connection successful:', data);
  } catch (err) {
    console.error('Supabase test failed:', err);
    throw err;
  }
}