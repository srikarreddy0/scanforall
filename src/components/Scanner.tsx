
import React from 'react';
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
    <div className="w-full max-w-lg mx-auto">
      <QRScanner onScan={handleScan} />
    </div>
  );
};

export default Scanner;
