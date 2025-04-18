
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  HistoryIcon, 
  Bookmark,
  Info,
  Volume2
} from 'lucide-react';
import Header from '../components/Header';
import Scanner from '../components/Scanner';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [readAloud, setReadAloud] = React.useState(false);

  useEffect(() => {
    // Get read aloud preference from localStorage
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }
    
    // Welcome message for visually impaired users
    if (savedReadAloud === 'true') {
      setTimeout(() => {
        const welcomeMessage = "Welcome to ScanForAll. Position a food product QR code within the frame to scan. Tap the center button to start scanning.";
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        window.speechSynthesis.speak(utterance);
      }, 1000);
    }
  }, []);

  const handleScan = (productId: string) => {
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
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
    <div className="app-container dark:bg-dark-300 bg-light-300 dark:text-light-100 text-dark-300">
      <Header />
      
      <motion.div 
        className="p-5 flex flex-col h-[calc(100vh-4rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 text-center" variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold dark:text-light-100 text-dark-300 mb-2">
            ScanForAll
          </h1>
          <p className="dark:text-light-500 text-dark-400 font-medium">
            Scan food labels for complete product details
          </p>
        </motion.div>
        
        {/* Quick action buttons */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-8"
          variants={itemVariants}
        >
          <QuickActionButton 
            icon={<Search size={20} />} 
            label="Search" 
            onClick={() => navigate('/search')} 
          />
          <QuickActionButton 
            icon={<HistoryIcon size={20} />} 
            label="History" 
            onClick={() => navigate('/history')} 
          />
          <QuickActionButton 
            icon={<Bookmark size={20} />} 
            label="Saved" 
            onClick={() => navigate('/saved')} 
          />
        </motion.div>
        
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <div className="text-center mb-4">
            <p className="dark:text-light-500 text-dark-400 text-sm font-medium">
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
            <h3 className="text-sm font-medium dark:text-light-400 text-dark-400">Food Information</h3>
            <Button 
              variant="ghost" 
              className="text-xs text-premium-500 p-0 h-auto"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          </div>
          
          <div className="premium-card-dark p-4 mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full dark:bg-premium-800 bg-premium-100 flex items-center justify-center">
                <Info size={18} className="dark:text-premium-300 text-premium-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-light-100 text-dark-300">Food Allergen Guide</p>
                <p className="text-xs dark:text-light-500 text-dark-400">Learn about common food allergens and dietary restrictions</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-premium-400 hover:text-premium-300 dark:hover:bg-dark-100 hover:bg-light-400"
              >
                View
              </Button>
            </div>
          </div>
          
          <div className="premium-card-dark p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full dark:bg-premium-800 bg-premium-100 flex items-center justify-center">
                <Volume2 size={18} className="dark:text-premium-300 text-premium-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-light-100 text-dark-300">Accessibility Features</p>
                <p className="text-xs dark:text-light-500 text-dark-400">Voice guidance available for visually impaired users</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-premium-400 hover:text-premium-300 dark:hover:bg-dark-100 hover:bg-light-400"
              >
                Setup
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ icon, label, onClick, hasNotification = false }) => (
  <button 
    className="flex flex-col items-center gap-1 group"
    onClick={onClick}
  >
    <div className="relative w-12 h-12 rounded-full dark:bg-dark-200 bg-light-300 flex items-center justify-center dark:border dark:border-dark-100 border border-light-400 group-hover:border-premium-700 dark:group-hover:bg-dark-100 group-hover:bg-light-400 transition-all duration-200">
      <div className="dark:text-light-400 text-dark-400 group-hover:text-premium-400 transition-colors duration-200">
        {icon}
      </div>
      {hasNotification && (
        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-premium-500 dark:ring-2 dark:ring-dark-200 ring-2 ring-light-300"></span>
      )}
    </div>
    <span className="text-xs font-medium dark:text-light-400 text-dark-400">{label}</span>
  </button>
);

export default Index;
