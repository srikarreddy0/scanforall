
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Search, 
  ShieldCheck, 
  Clock as HistoryIcon, 
  Bell,
  Camera,
  Sparkles,
  CreditCard,
  Bookmark
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
    <div className="app-container bg-gradient-to-b from-light-200 to-light-100">
      <Header showHistory={true} />
      
      <motion.div 
        className="p-5 flex flex-col h-[calc(100vh-4rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 text-center" variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
            Verify Product
          </h1>
          <p className="text-secondary font-medium">
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
          <QuickActionButton 
            icon={<Bell size={20} />} 
            label="Alerts" 
            onClick={() => navigate('/notifications')} 
            hasNotification 
          />
        </motion.div>
        
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-3">
              <ShieldCheck size={24} className="text-premium-500" strokeWidth={2.5} />
              <h2 className="text-xl font-display font-semibold text-dark-100">ScanForAll</h2>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
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
            <h3 className="text-sm font-medium text-dark-200">Recent Activity</h3>
            <Button 
              variant="ghost" 
              className="text-xs text-premium-500 p-0 h-auto"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          </div>
          
          <div className="premium-card p-4 mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-premium-100 flex items-center justify-center">
                <Sparkles size={18} className="text-premium-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Product Authentication Guide</p>
                <p className="text-xs text-muted-foreground">Learn how to spot counterfeits</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-premium-500"
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
    <div className="relative w-12 h-12 rounded-full premium-glass flex items-center justify-center group-hover:bg-premium-50 group-hover:shadow-premium-md transition-all duration-200">
      <div className="text-dark-300 group-hover:text-premium-500 transition-colors duration-200">
        {icon}
      </div>
      {hasNotification && (
        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-premium-500 ring-2 ring-light-100"></span>
      )}
    </div>
    <span className="text-xs font-medium text-dark-300">{label}</span>
  </button>
);

export default Index;
