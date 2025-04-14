
import React, { useState } from 'react';
import { Camera, ScanBarcode, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  
  // Mock scanner for demo purposes
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
      {/* Scanner target with white/blue neumorphic style */}
      <div className="w-64 h-64 mx-auto rounded-2xl bg-white shadow-neu-flat relative mb-8">
        {scanning && (
          <div className="absolute top-0 left-0 w-full h-full rounded-2xl border-4 border-blue-400 animate-pulse-ring opacity-70"></div>
        )}
        
        {/* Neumorphic corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-2 border-blue-400 border-b-0 border-r-0 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-2 border-blue-400 border-b-0 border-l-0 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-blue-400 border-t-0 border-r-0 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-blue-400 border-t-0 border-l-0 rounded-br-lg"></div>
        
        {/* Scan line animation */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="h-1 w-full bg-blue-400 absolute animate-scan-line opacity-80"></div>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanBarcode size={60} className="text-gray-400" />
        </div>
      </div>
      
      {/* Neumorphic scan button with blue accent */}
      <button 
        onClick={handleScan} 
        disabled={scanning}
        className="h-16 w-16 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed active:shadow-neu-pressed transition-all duration-200 flex items-center justify-center"
      >
        <Camera size={24} className="text-blue-500" />
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        {scanning ? 'Scanning...' : 'Tap to scan product code'}
      </p>
      
      {/* Trust element with blue accent */}
      <div className="mt-6 flex items-center justify-center px-4 py-2 rounded-full bg-white shadow-neu-flat">
        <Shield size={16} className="text-blue-500 mr-2" />
        <span className="text-xs text-gray-600 font-medium">Secure Verification Technology</span>
      </div>
    </div>
  );
};

export default Scanner;
