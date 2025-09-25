import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDomains } from '@/utils/seedDomains';

export function SeedDomainsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const seedResult = await seedDomains();
      setResult(seedResult);
      console.log('Seeding completed:', seedResult);
    } catch (error) {
      console.error('Seeding failed:', error);
      setResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-muted/50">
      <h3 className="text-lg font-semibold mb-2">Database Seeding</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click to populate the domains table with sample data.
      </p>
      
      <Button 
        onClick={handleSeed} 
        disabled={isSeeding}
        className="mb-4"
      >
        {isSeeding ? 'Seeding...' : 'Seed Domains'}
      </Button>

      {result && (
        <div className={`p-2 rounded text-sm ${
          result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {result.success 
            ? `✅ Successfully seeded ${result.totalDomains} domains` 
            : `❌ Error: ${result.error}`
          }
        </div>
      )}
    </div>
  );
}