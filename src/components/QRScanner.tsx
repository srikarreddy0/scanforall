
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, ScanBarcode, ShieldCheck, Loader2, Check, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import jsQR from 'jsqr';
import { fetchProductByBarcode, recordScan } from '../services/productService';

interface QRScannerProps {
  onScan: (productId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    // Check read aloud preference from localStorage
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }
  }, []);

  // Optimized QR scanning function using useCallback
  const scanQRCode = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestRef.current = requestAnimationFrame(scanQRCode);
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for QR processing
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      // QR code detected
      setScanning(false);
      setScanComplete(true);

      // Read aloud if enabled
      if (readAloud) {
        const utterance = new SpeechSynthesisUtterance('QR code detected. Retrieving product details.');
        window.speechSynthesis.speak(utterance);
      }

      console.log("QR code data:", code.data);
      
      // Pass scanned data to parent - ensure it's a clean string
      const barcode = code.data.trim();
      if (barcode) {
        // Record the scan in history
        recordScan(barcode).catch(console.error);
        
        // Show success toast
        toast.success('QR Code scanned successfully', {
          description: 'Retrieving product details...'
        });
        
        // Call the onScan handler with the barcode
        onScan(barcode);
      } else {
        toast.error('Invalid QR code', {
          description: 'The scanned QR code does not contain valid product information.'
        });
      }

      // Stop scanning loop
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    // Continue scanning
    requestRef.current = requestAnimationFrame(scanQRCode);
  }, [onScan, readAloud]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startScanning = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          
          // Start scanning once video is playing
          videoRef.current.onloadedmetadata = () => {
            setScanning(true);
            requestRef.current = requestAnimationFrame(scanQRCode);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Camera access denied', {
          description: 'Please allow camera access to scan QR codes'
        });
        // Simulate scan for demo purposes when camera is not available
        simulateScan();
      }
    };

    // Simulate a QR code scan when camera button is clicked or camera is not available
    const simulateScan = () => {
      setScanning(true);
      // Simulate scanning for 1 second
      setTimeout(() => {
        setScanning(false);
        setScanComplete(true);
        
        if (readAloud) {
          const utterance = new SpeechSynthesisUtterance('QR code detected. Retrieving product details.');
          window.speechSynthesis.speak(utterance);
        }
        
        toast.success('QR Code scanned successfully', {
          description: 'Retrieving product details...'
        });
        
        // For demo purposes, always use the orange juice product when simulating
        onScan("juicy-orange");
      }, 1000);
    };

    if (scanning && !scanComplete) {
      // Try to use real camera first
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        startScanning().catch(error => {
          console.error('Failed to start camera:', error);
          simulateScan();
        });
      } else {
        // Fallback to simulation
        console.log('Media devices not supported, using simulation');
        simulateScan();
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning, scanComplete, onScan, scanQRCode, readAloud]);

  const toggleReadAloud = () => {
    const newValue = !readAloud;
    setReadAloud(newValue);
    localStorage.setItem('readAloud', newValue.toString());
    
    if (newValue) {
      toast.success('Read aloud enabled', {
        description: 'Product information will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
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
      {/* Premium scanner container */}
      <div className="premium-scanner-container bg-gradient-dark mb-8">
        {/* Scanner frame corners */}
        <div className="premium-scanner-corner premium-scanner-corner-tl"></div>
        <div className="premium-scanner-corner premium-scanner-corner-tr"></div>
        <div className="premium-scanner-corner premium-scanner-corner-bl"></div>
        <div className="premium-scanner-corner premium-scanner-corner-br"></div>
        
        {/* Scanner overlay gradient */}
        <div className="premium-scan-overlay"></div>
        
        {/* Camera feed */}
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover rounded-3xl"
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Special feature: Display example product image when no camera */}
        {!scanning && !scanComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img 
              src="/lovable-uploads/e36db5f1-caab-42c7-a29e-86be18609257.png" 
              alt="Scan this product" 
              className="w-3/4 h-auto object-contain"
            />
          </div>
        )}
        
        {/* Scanning states overlay */}
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
                  <ScanBarcode size={32} className="text-white" />
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
      
      {/* Scan button */}
      <button 
        onClick={() => {
          setScanning(true);
          setScanComplete(false);
        }} 
        disabled={scanning} 
        className="premium-scan-button"
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
        {scanning ? 'Scanning...' : scanComplete ? 'Scan successful' : 'Tap to scan food product QR code'}
      </p>
      
      {/* Trust badge */}
      <div className="mt-6 flex items-center justify-center px-4 py-2 rounded-full premium-glass bg-slate-400">
        <ShieldCheck size={16} className="text-premium-500 mr-2" />
        <span className="text-xs font-medium text-[#1f211f]">Food Safety Verified</span>
      </div>
    </div>
  );
};

export default QRScanner;
