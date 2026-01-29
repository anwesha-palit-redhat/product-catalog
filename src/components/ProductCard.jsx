// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  console.log('Rendering ProductCard for:', product.product_name);
  console.log('This is a waste of time');
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
        <img
          src={product.imgUrl}
          alt={product.product_name}
          className="absolute h-full w-full object-cover"
          loading="lazy"
        />
        {/* Add feat for products not in stock */}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.product_name}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">ID: {product.product_id}</span>
        </div>
        <div className="flex justify-between items-center">
          {/* Add label for products not in stock vs products in stock  */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;