
import React, { useState, useEffect, useRef } from 'react';
import { Camera, ScanBarcode } from 'lucide-react';
import { toast } from 'sonner';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  
  // Mock scanner for demo purposes
  // In a real app, this would use a camera API or library for actual QR scanning
  
  const handleScan = () => {
    setScanning(true);
    
    // Show scanning animation for a moment
    setTimeout(() => {
      setScanning(false);
      
      // Simulate successful scan of a random product from our mock database
      const productIds = ['PROD123456', 'PROD654321', 'PROD987654', 'PROD246810'];
      const randomId = productIds[Math.floor(Math.random() * productIds.length)];
      
      // Notify user of successful scan
      toast.success('Product code scanned successfully');
      
      // Pass the scanned ID to parent component
      onScan(randomId);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="scanner-target mb-8">
        {scanning && <div className="scan-pulse"></div>}
        <div className="scanner-corner scanner-corner-tl"></div>
        <div className="scanner-corner scanner-corner-tr"></div>
        <div className="scanner-corner scanner-corner-bl"></div>
        <div className="scanner-corner scanner-corner-br"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanBarcode size={60} className="text-trustBlue opacity-40" />
        </div>
      </div>
      
      <button 
        onClick={handleScan} 
        disabled={scanning}
        className="scan-button"
      >
        <Camera size={28} />
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-500">
        {scanning ? 'Scanning...' : 'Tap to scan product code'}
      </p>
    </div>
  );
};

export default Scanner;
