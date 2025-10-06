

const CategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onCategoryToggle, 
  onClearFilters 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories Section */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 flex-1">{category}</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                {category.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Selected Filters Summary */}
      {selectedCategories.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {category}
                <button
                  onClick={() => onCategoryToggle(category)}
                  className="ml-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* No categories message */}
      {categories.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No categories available</p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;