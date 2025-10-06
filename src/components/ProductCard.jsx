// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
        <img
          src={product.imgUrl}
          alt={product.product_name}
          className="absolute h-full w-full object-cover"
          loading="lazy"
        />
        {!product.isInStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
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
          {product.isInStock ? (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;