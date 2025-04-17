
import React, { useEffect, useRef, useState } from 'react';
import { Camera, ScanBarcode, ShieldCheck, Loader2, Check, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import jsQR from 'jsqr';

interface QRScannerProps {
  onScan: (productId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let stream: MediaStream | null = null;

    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

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

        // Pass scanned data to parent
        onScan(code.data);

        // Show success toast
        toast.success('QR Code scanned successfully', {
          description: 'Retrieving product details...'
        });

        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        return;
      }

      // Continue scanning
      animationFrame = requestAnimationFrame(scanQRCode);
    };

    const startScanning = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          
          // Start scanning once video is playing
          videoRef.current.onloadedmetadata = () => {
            setScanning(true);
            animationFrame = requestAnimationFrame(scanQRCode);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Camera access denied', {
          description: 'Please allow camera access to scan QR codes'
        });
      }
    };

    if (scanning) {
      startScanning();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning, onScan, readAloud]);

  const toggleReadAloud = () => {
    setReadAloud(!readAloud);
    
    if (!readAloud) {
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
        onClick={() => setScanning(true)} 
        disabled={scanning || scanComplete} 
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
