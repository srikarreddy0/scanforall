
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Header from '../components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Mock search functionality - in a real app, this would call an API
    setTimeout(() => {
      // Simulate search results
      const mockResults = [
        { id: 'product-1', name: 'Organic Almond Milk', brand: 'Nature\'s Best', category: 'Beverages' },
        { id: 'product-2', name: 'Gluten-Free Oat Cereal', brand: 'Healthy Start', category: 'Breakfast' },
        { id: 'product-3', name: 'Vegan Protein Bars', brand: 'FitChoice', category: 'Snacks' }
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  return (
    <div className="app-container dark:bg-dark-300 bg-light-300 dark:text-light-100 text-dark-300 min-h-screen">
      <Header title="Search Products" showBack={true} />
      
      <motion.div 
        className="p-5 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <h1 className="text-2xl font-display font-bold dark:text-light-100 text-dark-300 mb-2">
            Search Products
          </h1>
          <p className="dark:text-light-500 text-dark-400 font-medium">
            Find detailed information about food products
          </p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSearch}
          className="mb-6 flex gap-2"
          variants={itemVariants}
        >
          <Input
            type="search"
            placeholder="Search by product name, brand or category..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="bg-premium-500 hover:bg-premium-600">
            <SearchIcon size={18} />
          </Button>
        </motion.form>
        
        <motion.div variants={itemVariants}>
          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 rounded-full border-t-2 border-premium-500 animate-spin"></div>
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="dark:text-light-400 text-dark-400">No products found matching "{searchQuery}"</p>
              <p className="text-sm dark:text-light-500 text-dark-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <div 
                  key={product.id} 
                  className="premium-card-dark p-4 cursor-pointer hover:border-premium-500 transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium dark:text-light-100 text-dark-300">{product.name}</p>
                      <p className="text-sm dark:text-light-500 text-dark-400">{product.brand}</p>
                    </div>
                    <span className="text-xs bg-premium-100 dark:bg-premium-900 px-2 py-1 rounded-full dark:text-premium-300 text-premium-700">
                      {product.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Search;
