
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  HistoryIcon, 
  Bookmark,
  Info,
  Volume2,
  AlertOctagon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '../components/Header';
import Scanner from '../components/Scanner';
import { Button } from '@/components/ui/button';
import { getReadAloudPreference } from '../utils/readAloudUtils';

// Extracted QuickActionButton to improve component readability
const QuickActionButton = ({ icon, label, onClick, hasNotification = false }) => (
  <motion.button 
    className="flex flex-col items-center gap-1 group"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative w-12 h-12 rounded-full bg-gradient-premium flex items-center justify-center border border-premium-400/30 shadow-premium-sm group-hover:shadow-glow-premium transition-all duration-200">
      <div className="text-white group-hover:text-light-100 transition-colors duration-200">
        {icon}
      </div>
      {hasNotification && (
        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-accent1-DEFAULT animate-pulse dark:ring-2 dark:ring-dark-200 ring-2 ring-light-300"></span>
      )}
    </div>
    <span className="text-xs font-medium dark:text-light-400 text-dark-400">{label}</span>
  </motion.button>
);

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [readAloud, setReadAloud] = useState(false);

  // Animation variants - memoized to avoid recreating on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);
  
  const itemVariants = useMemo(() => ({
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
  }), []);

  useEffect(() => {
    // Get read aloud preference from localStorage
    const savedReadAloud = getReadAloudPreference();
    setReadAloud(savedReadAloud);
    
    // Welcome message for visually impaired users
    if (savedReadAloud) {
      setTimeout(() => {
        const welcomeMessage = "Welcome to ScanForAll. Position a food product QR code within the frame to scan. Tap the center button to start scanning.";
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        window.speechSynthesis.speak(utterance);
      }, 1000);
    }
  }, []);

  // Optimized scan handler with useCallback
  const handleScan = useCallback((productId: string) => {
    console.log("Scanned product ID:", productId);
    
    // Clean up and encode the product ID for URL safety
    let formattedId = productId.trim();
    
    // Remove HTTP:// or http:// prefix for routing purposes
    if (formattedId.toUpperCase().startsWith('HTTP://')) {
      formattedId = formattedId.substring(7);
    } else if (formattedId.toLowerCase().startsWith('http://')) {
      formattedId = formattedId.substring(7);
    }
    
    // Also handle https:// prefix
    if (formattedId.toUpperCase().startsWith('HTTPS://')) {
      formattedId = formattedId.substring(8);
    } else if (formattedId.toLowerCase().startsWith('https://')) {
      formattedId = formattedId.substring(8);
    }
    
    if (formattedId) {
      // Navigate to product details page with the cleaned product ID
      navigate(`/product/${formattedId}`);
    } else {
      console.error("Invalid product ID scanned:", productId);
    }
  }, [navigate]);

  // Navigation handlers
  const navigateToSearch = useCallback(() => navigate('/search'), [navigate]);
  const navigateToNotifications = useCallback(() => navigate('/notifications'), [navigate]);
  const navigateToHistory = useCallback(() => navigate('/history'), [navigate]);
  const navigateToBookmarks = useCallback(() => navigate('/bookmarks'), [navigate]);

  return (
    <div className="app-container bg-gradient-dark min-h-screen dark:text-light-100 text-dark-300">
      <Header />
      
      <motion.div 
        className="p-5 flex flex-col h-[calc(100vh-4rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 text-center" variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold text-gradient mb-2">
            ScanForAll
          </h1>
          <p className="dark:text-light-500 text-dark-400 font-medium">
            Scan food labels for complete product details
          </p>
        </motion.div>
        
        {/* Quick action buttons - now with 4 buttons in a row */}
        <motion.div 
          className="grid grid-cols-4 gap-3 mb-8"
          variants={itemVariants}
        >
          <QuickActionButton 
            icon={<Search size={20} />} 
            label="Search" 
            onClick={navigateToSearch}
          />
          <QuickActionButton 
            icon={<AlertOctagon size={20} />} 
            label="Alert" 
            onClick={navigateToNotifications}
            hasNotification={true}
          />
          <QuickActionButton 
            icon={<HistoryIcon size={20} />} 
            label="History" 
            onClick={navigateToHistory}
          />
          <QuickActionButton 
            icon={<Bookmark size={20} />} 
            label="Saved" 
            onClick={navigateToBookmarks}
          />
        </motion.div>
        
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <div className="text-center mb-4">
            <p className="dark:text-light-300 text-light-100 text-sm font-medium">
              Position food product QR code within the frame to scan
            </p>
          </div>
          
          <Scanner onScan={handleScan} />
        </motion.div>
        
        {/* Recent scans and quick info */}
        <motion.div 
          className="mt-6"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium dark:text-light-300 text-light-100">Food Information</h3>
            <Button 
              variant="ghost" 
              className="text-xs text-premium-400 p-0 h-auto hover:text-premium-300"
              onClick={navigateToHistory}
            >
              View All
            </Button>
          </div>
          
          <motion.div 
            className="premium-glass p-4 mb-4 border border-premium-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-premium-800 flex items-center justify-center">
                <Info size={18} className="text-premium-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-light-100">Food Allergen Guide</p>
                <p className="text-xs text-light-400">Learn about common food allergens and dietary restrictions</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-premium-400 hover:text-premium-300 dark:hover:bg-dark-100/40 hover:bg-light-400/20"
              >
                View
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="premium-glass p-4 border border-premium-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-premium-800 flex items-center justify-center">
                <Volume2 size={18} className="text-premium-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-light-100">Accessibility Features</p>
                <p className="text-xs text-light-400">Voice guidance available for visually impaired users</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-premium-400 hover:text-premium-300 dark:hover:bg-dark-100/40 hover:bg-light-400/20"
                onClick={() => navigate('/settings')}
              >
                Setup
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
