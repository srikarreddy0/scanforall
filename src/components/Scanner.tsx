
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
      {/* Neumorphic scanner target with glass effect */}
      <div className="scanner-target mb-8 relative w-64 h-64 mx-auto backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
        {scanning && (
          <div className="absolute top-0 left-0 w-full h-full rounded-2xl border-4 border-emerald-500 animate-pulse-ring opacity-70"></div>
        )}
        
        {/* Neumorphic corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-2 border-emerald-500 border-b-0 border-r-0 rounded-tl-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-2 border-emerald-500 border-b-0 border-l-0 rounded-tr-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-emerald-500 border-t-0 border-r-0 rounded-bl-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2)_inset]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-emerald-500 border-t-0 border-l-0 rounded-br-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2)_inset]"></div>
        
        {/* Scan line animation with glassmorphism effect */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent absolute animate-scan-line backdrop-blur-sm"></div>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanBarcode size={60} className="text-white/50" />
        </div>
      </div>
      
      {/* Neumorphic scan button */}
      <button 
        onClick={handleScan} 
        disabled={scanning}
        className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center 
        shadow-[0_10px_15px_-3px_rgba(16,185,129,0.2),0_4px_6px_-4px_rgba(16,185,129,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)] 
        hover:shadow-[0_15px_20px_-5px_rgba(16,185,129,0.3),0_8px_10px_-6px_rgba(16,185,129,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)] 
        transition-all duration-300 active:scale-95 hover:scale-105 active:shadow-[0_5px_10px_-3px_rgba(16,185,129,0.2),0_2px_3px_-2px_rgba(16,185,129,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)]"
      >
        <Camera size={28} className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]" />
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-300 animate-pulse">
        {scanning ? 'Scanning...' : 'Tap to scan product code'}
      </p>
      
      {/* Glassmorphism trust element */}
      <div className="mt-6 flex items-center justify-center px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <ShieldCheck size={16} className="text-emerald-400 mr-2 drop-shadow-[0_1px_2px_rgba(52,211,153,0.5)]" />
        <span className="text-xs text-white font-medium">Secure Verification Technology</span>
      </div>
    </div>
  );
};

export default Scanner;
