import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Domain data structure from src/data/data.ts
const CATEGORIES = {
  "accounting-and-finance": "Accounting & Finance",
  "analytics-and-ai-data": "Analytics & AI Data", 
  "design-and-branding": "Design & Branding",
  "ecommerce-and-retail": "E-commerce & Retail",
  "government-and-nonprofit": "Government & Nonprofit",
  "hr-and-recruiting": "HR & Recruiting",
  "it-software-tech": "IT & Software/Tech",
  "legal-and-compliance": "Legal & Compliance",
  "marketing-and-advertising": "Marketing & Advertising",
  "professional-services": "Professional Services"
}

const DOMAINS_DATA = {
  "accounting-and-finance": [
    {name: "cpa.gold", status: "available", price: 3087, binPrice: 3087, tags: ["Accounting", "Premium", "Short"], tld: "gold", length: 8, flags: { bin: true, offer: false, rto: false }},
    {name: "accounting.delivery", status: "available", price: 2663, binPrice: 2663, tags: ["Accounting", "Keywords", "Two-Word"], tld: "delivery", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "accounting.supply", status: "available", price: 2663, binPrice: 2663, tags: ["Accounting", "Keywords", "Two-Word"], tld: "supply", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "investors.consulting", status: "available", price: 1538, binPrice: 1538, tags: ["Accounting", "Keywords", "SaaS"], tld: "consulting", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "accountant.services", status: "available", price: 1352, binPrice: 1352, tags: ["Accounting", "Keywords", "Two-Word"], tld: "services", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "actuary.help", status: "available", price: 1062, binPrice: 1062, tags: ["Accounting", "Keywords", "Two-Word"], tld: "help", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "auditor.services", status: "available", price: 872, binPrice: 872, tags: ["Accounting", "Keywords", "Two-Word"], tld: "services", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "auditing.financial", status: "available", price: 399, binPrice: 399, tags: ["Accounting", "Keywords", "Two-Word"], tld: "financial", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "financialadviser.consulting", status: "available", price: 399, binPrice: 399, tags: ["Accounting", "Keywords"], tld: "consulting", length: 28, flags: { bin: true, offer: false, rto: false }}
  ],
  "analytics-and-ai-data": [
    {name: "gain.domains", status: "available", price: 3101, binPrice: 3101, tags: ["Analytics", "Premium", "Short"], tld: "domains", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "analyst.agency", status: "available", price: 2007, binPrice: 2007, tags: ["Analytics", "Keywords", "Agency"], tld: "agency", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "analyst.solutions", status: "available", price: 2007, binPrice: 2007, tags: ["Analytics", "Keywords", "SaaS"], tld: "solutions", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "gainname.com", status: "available", price: 1920, binPrice: 1920, tags: ["Analytics", "Premium", "Short"], tld: "com", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "html.solutions", status: "available", price: 1839, binPrice: 1839, tags: ["IT", "Keywords", "Two-Word"], tld: "solutions", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "gainlogo.com", status: "available", price: 1556, binPrice: 1556, tags: ["Analytics", "Premium", "Short"], tld: "com", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "attain.domains", status: "available", price: 718, binPrice: 718, tags: ["Analytics", "Keywords", "Two-Word"], tld: "domains", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "algorithms.solutions", status: "available", price: 580, binPrice: 580, tags: ["Analytics", "Keywords", "SaaS"], tld: "solutions", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "orientation.training", status: "available", price: 399, binPrice: 399, tags: ["Analytics", "Keywords", "Education"], tld: "training", length: 20, flags: { bin: true, offer: false, rto: false }}
  ],
  "design-and-branding": [
    {name: "design.delivery", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "delivery", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "logo.bingo", status: "available", price: 3203, binPrice: 3203, tags: ["Design", "Premium", "Short"], tld: "bingo", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "design.supply", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "supply", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "logo.supply", status: "available", price: 3203, binPrice: 3203, tags: ["Design", "Premium", "Short"], tld: "supply", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "design.express", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "express", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "designer.services", status: "available", price: 2007, binPrice: 2007, tags: ["Design", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "creativestudio.agency", status: "available", price: 1542, binPrice: 1542, tags: ["Design", "Keywords", "Agency"], tld: "agency", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "graphicdesign.services", status: "available", price: 399, binPrice: 399, tags: ["Design", "Keywords", "Two-Word"], tld: "services", length: 22, flags: { bin: true, offer: false, rto: false }}
  ],
  "ecommerce-and-retail": [
    {name: "retail.express", status: "available", price: 2316, binPrice: 2316, tags: ["E-commerce", "Premium", "Two-Word"], tld: "express", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "ecommerce.delivery", status: "available", price: 1647, binPrice: 1647, tags: ["E-commerce", "Keywords", "Two-Word"], tld: "delivery", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "onlinestore.services", status: "available", price: 399, binPrice: 399, tags: ["E-commerce", "Keywords", "Marketplace"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }}
  ],
  "government-and-nonprofit": [
    {name: "nonprofit.services", status: "available", price: 872, binPrice: 872, tags: ["Nonprofit", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }}
  ],
  "hr-and-recruiting": [
    {name: "hire.associates", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "associates", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.delivery", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "delivery", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.supply", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "supply", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "recruiting.agency", status: "available", price: 2007, binPrice: 2007, tags: ["HR", "Keywords", "Agency"], tld: "agency", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "recruiter.services", status: "available", price: 872, binPrice: 872, tags: ["HR", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "staffing.agency", status: "available", price: 872, binPrice: 872, tags: ["HR", "Keywords", "Agency"], tld: "agency", length: 15, flags: { bin: true, offer: false, rto: false }}
  ],
  "it-software-tech": [
    {name: "software.delivery", status: "available", price: 4217, binPrice: 4217, tags: ["IT", "Premium", "Two-Word"], tld: "delivery", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "software.supply", status: "available", price: 4217, binPrice: 4217, tags: ["IT", "Premium", "Two-Word"], tld: "supply", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "developer.services", status: "available", price: 2663, binPrice: 2663, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "tech.consulting", status: "available", price: 2316, binPrice: 2316, tags: ["IT", "Premium", "Two-Word"], tld: "consulting", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "programming.services", status: "available", price: 1352, binPrice: 1352, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "coding.services", status: "available", price: 1062, binPrice: 1062, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "webdevelopment.services", status: "available", price: 399, binPrice: 399, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 23, flags: { bin: true, offer: false, rto: false }}
  ],
  "legal-and-compliance": [
    {name: "legal.delivery", status: "available", price: 2663, binPrice: 2663, tags: ["Legal", "Premium", "Two-Word"], tld: "delivery", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "lawyer.services", status: "available", price: 2007, binPrice: 2007, tags: ["Legal", "Keywords", "Two-Word"], tld: "services", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "attorney.services", status: "available", price: 1352, binPrice: 1352, tags: ["Legal", "Keywords", "Two-Word"], tld: "services", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "legaladvice.consulting", status: "available", price: 399, binPrice: 399, tags: ["Legal", "Keywords"], tld: "consulting", length: 22, flags: { bin: true, offer: false, rto: false }}
  ],
  "marketing-and-advertising": [
    {name: "marketing.delivery", status: "available", price: 3612, binPrice: 3612, tags: ["Marketing", "Premium", "Two-Word"], tld: "delivery", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "advertising.agency", status: "available", price: 2663, binPrice: 2663, tags: ["Marketing", "Keywords", "Agency"], tld: "agency", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "marketing.agency", status: "available", price: 2316, binPrice: 2316, tags: ["Marketing", "Premium", "Agency"], tld: "agency", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "digitalmarketing.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords"], tld: "services", length: 24, flags: { bin: true, offer: false, rto: false }}
  ],
  "professional-services": [
    {name: "consulting.delivery", status: "available", price: 4217, binPrice: 4217, tags: ["Professional", "Premium", "Two-Word"], tld: "delivery", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "consultant.services", status: "available", price: 2007, binPrice: 2007, tags: ["Professional", "Keywords", "Two-Word"], tld: "services", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "advisory.services", status: "available", price: 1352, binPrice: 1352, tags: ["Professional", "Keywords", "Two-Word"], tld: "services", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "businessconsulting.services", status: "available", price: 399, binPrice: 399, tags: ["Professional", "Keywords"], tld: "services", length: 28, flags: { bin: true, offer: false, rto: false }}
  ]
}

function extractPrimaryKeyword(domainName: string): string {
  return domainName.split('.')[0]
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Starting domain seeding process...')

    // Clear existing domains first
    const { error: deleteError } = await supabaseClient
      .from('domains')
      .delete()
      .gte('id', 0) // Delete all rows

    if (deleteError) {
      console.error('Error clearing domains:', deleteError)
      throw deleteError
    }

    console.log('Cleared existing domains')

    // Prepare all domains for insertion
    const allDomains = []
    let totalCount = 0

    for (const [categorySlug, domains] of Object.entries(DOMAINS_DATA)) {
      const categoryTitle = CATEGORIES[categorySlug as keyof typeof CATEGORIES]
      
      for (const domain of domains) {
        const mappedDomain = {
          domain: domain.name,
          bin_price: domain.binPrice,
          tags: domain.tags,
          availability_bin: domain.flags.bin,
          availability_offer: domain.flags.offer,
          availability_rto: domain.flags.rto,
          length: domain.length,
          tld: domain.tld,
          bundle: categoryTitle,
          primary_keyword: extractPrimaryKeyword(domain.name),
          domain_is_live: domain.status === 'available'
        }
        
        allDomains.push(mappedDomain)
        totalCount++
      }
    }

    console.log(`Prepared ${totalCount} domains for insertion`)

    // Insert all domains in batches of 100
    const batchSize = 100
    let inserted = 0

    for (let i = 0; i < allDomains.length; i += batchSize) {
      const batch = allDomains.slice(i, i + batchSize)
      
      const { data, error } = await supabaseClient
        .from('domains')
        .insert(batch)
        .select('domain')

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error)
        throw error
      }

      inserted += batch.length
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}: ${batch.length} domains (${inserted}/${totalCount} total)`)
    }

    console.log(`Successfully seeded ${inserted} domains into the database`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully seeded ${inserted} domains`,
        totalDomains: inserted,
        categories: Object.keys(CATEGORIES).length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in seed-domains function:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})