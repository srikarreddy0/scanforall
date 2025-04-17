
import React from 'react';
import { Volume2, VolumeX, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../Header';

interface ProductHeaderProps {
  productName: string;
  readAloud: boolean;
  toggleReadAloud: () => void;
  onShare: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  productName, 
  readAloud, 
  toggleReadAloud, 
  onShare 
}) => {
  return (
    <>
      <Header title={productName} showBack={true} />
      <button
        onClick={toggleReadAloud}
        className="absolute top-20 right-4 premium-icon-button"
        aria-label={readAloud ? "Disable read aloud" : "Enable read aloud"}
      >
        {readAloud ? <Volume2 size={20} className="text-premium-500" /> : <VolumeX size={20} />}
      </button>
    </>
  );
};

export default ProductHeader;
