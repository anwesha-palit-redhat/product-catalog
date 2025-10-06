// src/components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loadingRef, isLoading }) => {
  if (products.length === 0) {
    return null; // Let App.jsx handle the no results message
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      
      {/* Loading indicator for infinite scroll - only show if there are more products to load */}
      <div 
        ref={loadingRef} 
        className="flex justify-center py-8 min-h-[100px]"
      >
        {isLoading && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
            <p className="text-gray-500 text-sm">Loading more products...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;