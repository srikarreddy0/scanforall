
import React from 'react';
import QRScanner from './QRScanner';

interface ScannerProps {
  onScan: (productId: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({
  onScan
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <QRScanner onScan={onScan} />
    </div>
  );
};

export default Scanner;
