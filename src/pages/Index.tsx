import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Search, 
  ShieldCheck, 
  Clock as HistoryIcon, 
  Camera,
  Bookmark,
  Info
} from 'lucide-react';
import Header from '../components/Header';
import Scanner from '../components/Scanner';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (productId: string) => {
    // Navigate to product details page with the scanned product ID
    navigate(`/product/${productId}`);
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
            Authenticate products with a simple scan
          </p>
        </motion.div>
        
        {/* Quick action buttons */}
        <motion.div 
          className="grid grid-cols-4 gap-4 mb-8"
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
              Position QR code within the frame to scan
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
            <h3 className="text-sm font-medium dark:text-light-400 text-dark-400">Recent Activity</h3>
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
                <p className="text-sm font-medium dark:text-light-100 text-dark-300">Product Authentication Guide</p>
                <p className="text-xs dark:text-light-500 text-dark-400">Learn how to spot counterfeits</p>
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
