
import React from 'react';
import { motion } from 'framer-motion';
import QRScanner from './QRScanner';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({
  onScan
}) => {
  const handleScan = (productId: string) => {
    // Clean the product ID to ensure it's a valid string
    const cleanId = productId.trim();
    console.log("Scanner component received product ID:", cleanId);
    
    if (cleanId) {
      onScan(cleanId);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <QRScanner onScan={handleScan} />
    </motion.div>
  );
};

export default Scanner;
