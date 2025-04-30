
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const Bookmarks: React.FC = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks from localStorage
  useEffect(() => {
    const loadBookmarks = () => {
      setIsLoading(true);
      try {
        const savedBookmarks = localStorage.getItem('scanforall_bookmarks');
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        } else {
          // Provide some demo bookmarks for first-time users
          const demoBookmarks = [
            { id: 'demo-1', name: 'Organic Almond Milk', brand: 'Nature\'s Best', date: new Date().toISOString() },
            { id: 'demo-2', name: 'Gluten-Free Oat Cereal', brand: 'Healthy Start', date: new Date().toISOString() },
          ];
          localStorage.setItem('scanforall_bookmarks', JSON.stringify(demoBookmarks));
          setBookmarks(demoBookmarks);
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        toast({
          title: "Error loading bookmarks",
          description: "Could not load your saved products",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    };

    loadBookmarks();
  }, []);

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('scanforall_bookmarks', JSON.stringify(updatedBookmarks));
    
    toast({
      title: "Product removed",
      description: "Product removed from saved items",
    });
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.setItem('scanforall_bookmarks', JSON.stringify([]));
    
    toast({
      title: "All products removed",
      description: "All products have been removed from saved items",
    });
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
      <Header title="Saved Products" showBack={true} />
      
      <motion.div 
        className="p-5 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 flex justify-between items-center" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-display font-bold dark:text-light-100 text-dark-300 mb-2">
              Saved Products
            </h1>
            <p className="dark:text-light-500 text-dark-400 font-medium">
              Your bookmarked food products
            </p>
          </div>
          
          {bookmarks.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={clearAllBookmarks}
            >
              Clear All
            </Button>
          )}
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 rounded-full border-t-2 border-premium-500 animate-spin"></div>
          </div>
        ) : bookmarks.length === 0 ? (
          <motion.div 
            className="text-center py-12 flex flex-col items-center gap-4"
            variants={itemVariants}
          >
            <div className="w-16 h-16 rounded-full bg-premium-100 dark:bg-premium-900 flex items-center justify-center">
              <Bookmark size={24} className="text-premium-500" />
            </div>
            <div>
              <p className="dark:text-light-100 text-dark-300 font-medium text-lg">No saved products yet</p>
              <p className="dark:text-light-500 text-dark-400 text-sm mt-1">
                Items you save will appear here
              </p>
            </div>
            <Button 
              className="mt-4 bg-premium-500 hover:bg-premium-600"
              onClick={() => navigate('/')}
            >
              Scan Products
            </Button>
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={containerVariants}>
            {bookmarks.map((bookmark) => (
              <motion.div 
                key={bookmark.id} 
                className="premium-card-dark p-4 flex items-center justify-between"
                variants={itemVariants}
              >
                <div 
                  className="flex-1 cursor-pointer" 
                  onClick={() => navigate(`/product/${bookmark.id}`)}
                >
                  <p className="font-medium dark:text-light-100 text-dark-300">{bookmark.name}</p>
                  <p className="text-sm dark:text-light-500 text-dark-400">{bookmark.brand}</p>
                  <p className="text-xs dark:text-light-600 text-dark-500 mt-1">
                    Saved on {new Date(bookmark.date).toLocaleDateString()}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Bookmarks;
