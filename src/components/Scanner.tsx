
import React from 'react';
import QRScanner from './QRScanner';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({
  onScan
}) => {
  const handleScan = (barcode: string) => {
    // Clean the barcode to ensure it's a valid string
    const cleanBarcode = barcode?.trim();
    console.log("Scanner component received barcode:", cleanBarcode);
    
    if (cleanBarcode) {
      // For the demo image (Juicy Orange), let's add a special case
      if (cleanBarcode.includes("juicy") || cleanBarcode.includes("orange")) {
        onScan("PROD123456"); // Map to an existing product ID in mockData
      } else {
        onScan(cleanBarcode);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <QRScanner onScan={handleScan} />
    </div>
  );
};

export default Scanner;
