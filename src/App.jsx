import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';

// Constants
const ITEMS_PER_PAGE = 12;
const LOAD_DELAY = 300;

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Use the intersection observer
  const [loadingRef, isIntersecting] = useIntersectionObserver({
    rootMargin: '80px',
    threshold: 0
  });

  // Fetch products from JSON file
  useEffect(() => {
    /* const fetchProducts = async () => {
      try {
       
      } catch (error) {
        
      } finally {
        
      }
    }; */

    //fetchProducts();
  }, []);

  // Get all unique categories from products
  const categories = [];

  // Filter products based on search term and selected categories
  const filteredProducts = [];

  // Products to display (for pagination/infinite scroll)
  const displayedProducts = [];

  // Load more products function
  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || displayedProducts.length >= filteredProducts.length) return;

    setIsLoadingMore(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, LOAD_DELAY));
    
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    setIsLoadingMore(false);
  }, [isLoadingMore, displayedProducts.length, filteredProducts.length]);

  // Load more when intersection observer triggers
  useEffect(() => {
    if (isIntersecting && !isLoadingMore && displayedProducts.length < filteredProducts.length) {
      loadMoreProducts();
    }
  }, [isIntersecting, isLoadingMore, displayedProducts.length, filteredProducts.length, loadMoreProducts]);

  // Reset visible count when search or filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [debouncedSearchTerm, selectedCategories]);

  // Handle category selection
  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  // Clear all category filters
  const clearCategoryFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  // Show loading state for initial load
  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Product Catalog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive collection of products. Use the search bar and filters to find specific items.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onClearFilters={clearCategoryFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
              <div className="text-gray-600">
                Showing {displayedProducts.length} of {filteredProducts.length} products
                {debouncedSearchTerm && (
                  <span> for "<span className="font-semibold">{debouncedSearchTerm}</span>"</span>
                )}
                {selectedCategories.length > 0 && (
                  <span> in <span className="font-semibold">{selectedCategories.length}</span> categor{selectedCategories.length === 1 ? 'y' : 'ies'}</span>
                )}
              </div>
              
              {/* Active Filters */}
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Active filters:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map(category => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryToggle(category)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ProductGrid 
              products={displayedProducts}
              loadingRef={loadingRef}
              isLoading={isLoadingMore}
            />

            {/* Show message when all products are loaded */}
            {displayedProducts.length >= filteredProducts.length && filteredProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">All products loaded! 🎉</p>
              </div>
            )}

            {/* No results message */}
            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search terms or filters
                </p>
                {(debouncedSearchTerm || selectedCategories.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      clearCategoryFilters();
                    }}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;