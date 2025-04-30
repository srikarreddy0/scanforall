
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanBarcode } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  
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

  const simulateScan = useCallback(() => {
    setIsScanning(true);
    
    // Show scanning toast
    toast.info('Scanning product...', {
      description: 'Position QR code within frame'
    });
    
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      
      // Show success toast
      toast.success('QR Code detected!', {
        description: 'Retrieving product information...'
      });
      
      // Navigate to product details with sample product ID
      setTimeout(() => {
        navigate('/product/PROD123456');
      }, 800);
    }, 1500);
  }, [navigate]);

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
            Connecting restaurants with NGOs to reduce food waste
          </p>
        </motion.div>
        
        {/* Main content area with illustration */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center mb-8"
          variants={itemVariants}
        >
          <div className="w-full max-w-md bg-gray-100 rounded-xl p-4 mb-8">
            <div className="bg-white rounded-lg p-3 flex justify-center items-center">
              <img 
                src="public/lovable-uploads/3c0e643f-ab15-4a92-989b-10dc2c59374d.png"
                alt="Food Donation Illustration" 
                className="w-full max-w-xs"
              />
            </div>
          </div>
          
          {/* Choose your role section */}
          <div className="w-full max-w-md mb-8">
            <h2 className="text-xl font-medium text-center mb-4">Choose your role</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-teal-500 rounded-lg p-4 flex flex-col items-center justify-center text-teal-600">
                <div className="text-3xl mb-2">🍽️</div>
                <h3 className="font-medium mb-1">Restaurant</h3>
                <p className="text-xs text-center">I want to donate food</p>
              </div>
              
              <div className="border border-amber-500 rounded-lg p-4 flex flex-col items-center justify-center text-amber-600">
                <div className="text-3xl mb-2">🥫</div>
                <h3 className="font-medium mb-1">NGO</h3>
                <p className="text-xs text-center">I want to receive food</p>
              </div>
            </div>
          </div>
          
          {/* Our Impact section */}
          <div className="w-full max-w-md mb-8">
            <h2 className="text-xl font-medium text-center mb-4">Our Impact</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xl font-bold text-teal-600">2.5k+</p>
                  <p className="text-xs">Meals Saved</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-600">0+</p>
                  <p className="text-xs">Partners</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-teal-600">3.3t</p>
                  <p className="text-xs">CO₂ Reduced</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Scan Product Button */}
        <motion.div className="w-full" variants={itemVariants}>
          <Button 
            onClick={simulateScan} 
            disabled={isScanning}
            className="w-full py-6 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium text-lg"
          >
            {isScanning ? (
              <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              <ScanBarcode size={24} className="text-white" />
            )}
            Scan Product
          </Button>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Install Khadya App</p>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-teal-600 text-white hover:bg-teal-700 border-none"
            >
              Install
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
