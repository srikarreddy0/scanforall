
import React, { useState, useEffect } from 'react';
import { Camera, ScanBarcode, ShieldCheck } from 'lucide-react';
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
      <div className="scanner-target mb-8 relative border-2 rounded-2xl border-white border-opacity-60 w-64 h-64 mx-auto bg-black/20 backdrop-blur-sm">
        {scanning && <div className="absolute top-0 left-0 w-full h-full rounded-2xl border-4 border-emerald-500 animate-pulse-ring opacity-70"></div>}
        <div className="absolute top-0 left-0 w-4 h-4 border-2 border-emerald-500 border-b-0 border-r-0 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-2 border-emerald-500 border-b-0 border-l-0 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-emerald-500 border-t-0 border-r-0 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-emerald-500 border-t-0 border-l-0 rounded-br-lg"></div>
        
        {/* Scan line animation */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent absolute animate-scan-line"></div>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanBarcode size={60} className="text-white opacity-40" />
        </div>
      </div>
      
      <button 
        onClick={handleScan} 
        disabled={scanning}
        className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-opacity-90 transition-all active:scale-95 hover:scale-105"
      >
        <Camera size={28} />
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-300">
        {scanning ? 'Scanning...' : 'Tap to scan product code'}
      </p>
      
      {/* Added trust elements */}
      <div className="mt-6 flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
        <ShieldCheck size={16} className="text-emerald-400 mr-2" />
        <span className="text-xs text-white">Secure Verification Technology</span>
      </div>
    </div>
  );
};

export default Scanner;
