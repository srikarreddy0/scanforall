
import React, { useState, useEffect } from 'react';
import { Camera, ScanBarcode, ShieldCheck, Loader2, Check, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({
  onScan
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [readAloud, setReadAloud] = useState(false);

  // Reset the scanner after completion
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (scanComplete) {
      timeout = setTimeout(() => {
        setScanComplete(false);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [scanComplete]);

  // Mock scanner for demo purposes
  const handleScan = () => {
    if (scanning || scanComplete) return;
    setScanning(true);

    // Show scanning animation for a moment
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);

      // Simulate successful scan of a random product from our mock database
      const productIds = ['PROD123456', 'PROD654321', 'PROD987654', 'PROD246810'];
      const randomId = productIds[Math.floor(Math.random() * productIds.length)];

      // Notify user of successful scan
      toast.success('Product code scanned successfully', {
        description: 'Redirecting to details page...',
        icon: <Check className="text-success-DEFAULT" />
      });

      // Read aloud if enabled
      if (readAloud) {
        const utterance = new SpeechSynthesisUtterance('Product scanned successfully. Retrieving product details.');
        window.speechSynthesis.speak(utterance);
      }

      // Wait a brief moment before navigating
      setTimeout(() => {
        // Pass the scanned ID to parent component
        onScan(randomId);
      }, 800);
    }, 1500);
  };

  const toggleReadAloud = () => {
    setReadAloud(!readAloud);
    
    if (!readAloud) {
      toast.success('Read aloud enabled', {
        description: 'Product information will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
      // Announce that read-aloud is enabled
      const utterance = new SpeechSynthesisUtterance('Read aloud enabled. Product information will be read aloud after scanning.');
      window.speechSynthesis.speak(utterance);
    } else {
      toast.info('Read aloud disabled', {
        icon: <VolumeX className="text-muted-foreground" />
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scanner target with premium glass effect */}
      <div className="premium-scanner-container bg-gradient-dark mb-8">
        {/* Scanner frame corners */}
        <div className="premium-scanner-corner premium-scanner-corner-tl"></div>
        <div className="premium-scanner-corner premium-scanner-corner-tr"></div>
        <div className="premium-scanner-corner premium-scanner-corner-bl"></div>
        <div className="premium-scanner-corner premium-scanner-corner-br"></div>
        
        {/* Scanner overlay gradient */}
        <div className="premium-scan-overlay"></div>
        
        {/* Dynamic scan states */}
        <AnimatePresence mode="wait">
          {scanning && (
            <>
              {/* Scan line animation */}
              <div className="premium-scan-line"></div>
              
              {/* Scanning grid overlay */}
              <div className="absolute inset-0 z-10 bg-grid-pattern opacity-30"></div>
              
              {/* Focused scan area */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <div className="w-56 h-56 border-2 border-premium-400/80 rounded-lg flex items-center justify-center">
                  <Loader2 size={32} className="text-white animate-spin" />
                </div>
              </motion.div>
            </>
          )}
          
          {scanComplete && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 bg-success-50 backdrop-blur-sm" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.1 }} 
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-20 h-20 rounded-full bg-success-DEFAULT flex items-center justify-center shadow-glow-success">
                  <Check size={36} className="text-white" strokeWidth={3} />
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {!scanning && !scanComplete && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.3 }}
            >
              <ScanBarcode size={80} className="text-white/30" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Accessibility button for read-aloud feature */}
      <button 
        onClick={toggleReadAloud} 
        className="absolute top-4 right-4 premium-icon-button"
        aria-label={readAloud ? "Disable read aloud" : "Enable read aloud"}
      >
        {readAloud ? <Volume2 size={20} className="text-premium-500" /> : <VolumeX size={20} />}
      </button>
      
      {/* Premium scan button with ripple effect */}
      <button 
        onClick={handleScan} 
        disabled={scanning || scanComplete} 
        className="ripple-container premium-scan-button"
        aria-label="Scan product"
      >
        {scanning ? (
          <Loader2 size={28} className="animate-spin" />
        ) : scanComplete ? (
          <Check size={28} strokeWidth={3} />
        ) : (
          <Camera size={28} />
        )}
      </button>
      
      <p className="mt-4 text-center text-sm font-medium text-gray-950">
        {scanning ? 'Scanning...' : scanComplete ? 'Scan successful' : 'Tap to scan food product code'}
      </p>
      
      {/* Trust badge with premium accent */}
      <div className="mt-6 flex items-center justify-center px-4 py-2 rounded-full premium-glass bg-slate-400">
        <ShieldCheck size={16} className="text-premium-500 mr-2" />
        <span className="text-xs font-medium text-[#1f211f]">Food Safety Verified</span>
      </div>
    </div>
  );
};

export default Scanner;
