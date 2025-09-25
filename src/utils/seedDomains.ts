import { supabase } from '@/integrations/supabase/client';

export async function seedDomains() {
  try {
    const { data, error } = await supabase.functions.invoke('seed-domains', {
      body: {}
    });

    if (error) {
      console.error('Error calling seed function:', error);
      return { success: false, error: error.message };
    }

    console.log('Seeding result:', data);
    return data;
  } catch (error) {
    console.error('Error seeding domains:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Call the function immediately if this file is imported
seedDomains().then(result => {
  if (result.success) {
    console.log('✅ Successfully seeded domains:', result);
  } else {
    console.error('❌ Failed to seed domains:', result.error);
  }
});