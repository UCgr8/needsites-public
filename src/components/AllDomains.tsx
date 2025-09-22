import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, DollarSign, ExternalLink } from 'lucide-react';
import { CATEGORIES, DOMAINS } from '../data/data';

export default function AllDomains() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price-low', 'price-high'

  // Flatten all domains with category info
  const allDomains = useMemo(() => {
    const domainsWithCategory = [];
    for (const [categorySlug, domains] of Object.entries(DOMAINS)) {
      const category = CATEGORIES.find(cat => cat.slug === categorySlug);
      if (Array.isArray(domains)) {
        for (const domain of domains) {
          domainsWithCategory.push({
            ...domain,
            categorySlug,
            categoryTitle: category?.title || categorySlug
          });
        }
      }
    }
    return domainsWithCategory;
  }, []);

  // Filter and sort domains
  const filteredAndSortedDomains = useMemo(() => {
    let filtered = allDomains;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(domain =>
        domain.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(domain => domain.categorySlug === selectedCategory);
    }

    // Sort domains
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [allDomains, searchTerm, selectedCategory, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            All Domains
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our complete collection of premium domains. Use the filters below to find exactly what you're looking for.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-muted-foreground">
              Showing <strong className="text-foreground">{filteredAndSortedDomains.length}</strong> of{' '}
              <strong className="text-foreground">{allDomains.length}</strong> domains
            </p>
          </div>
        </div>

        {/* Domains Grid */}
        {filteredAndSortedDomains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedDomains.map((domain) => (
              <div
                key={domain.name}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-200 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <Link
                      to={`/category/${domain.categorySlug}`}
                      className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors mb-3"
                    >
                      {domain.categoryTitle}
                    </Link>
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        domain.status === 'available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {domain.status === 'available' ? 'Available' : 'Reserved'}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-needsites-orange" />
                    <span className="text-2xl font-bold text-needsites-orange">
                      {formatPrice(domain.price)}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Link
                    to={`/domain/${domain.name}`}
                    className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No domains found
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-needsites-blue to-needsites-dark-blue rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See What You Need?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We have access to thousands more domains. Contact us for personalized recommendations.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-needsites-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Get Custom Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}