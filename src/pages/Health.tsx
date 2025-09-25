import React from 'react';

export default function Health() {
  const healthData = {
    ok: true,
    supabase: import.meta.env.VITE_SUPABASE_URL ? "configured" : "missing",
    functionsBase: import.meta.env.VITE_FUNCTIONS_BASE || "missing",
    env: import.meta.env.MODE || "unknown",
    ts: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Health Check</h1>
        <pre className="bg-muted p-6 rounded-lg font-mono text-sm text-foreground overflow-auto border">
          {JSON.stringify(healthData, null, 2)}
        </pre>
      </div>
    </div>
  );
}