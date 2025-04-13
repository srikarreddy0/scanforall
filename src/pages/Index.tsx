
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Scanner from '../components/Scanner';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (productId: string) => {
    // Navigate to product details page with the scanned product ID
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container">
      <Header showHistory={true} />
      
      <div className="flex-1 flex flex-col p-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-darkText">Scan Product</h2>
          <p className="text-gray-600 mt-2">
            Scan the QR code on your product to verify its authenticity
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Scanner onScan={handleScan} />
        </div>
      </div>
    </div>
  );
};

export default Index;
