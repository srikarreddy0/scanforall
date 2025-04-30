
import React from 'react';
import { Volume2, VolumeX, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
      <div className="absolute top-20 right-4 flex items-center gap-3">
        <motion.button
          onClick={toggleReadAloud}
          className="premium-icon-button border border-premium-500/30"
          aria-label={readAloud ? "Disable read aloud" : "Enable read aloud"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {readAloud ? 
            <Volume2 size={20} className="text-premium-500" /> : 
            <VolumeX size={20} className="text-light-400" />
          }
        </motion.button>
        <motion.button
          onClick={onShare}
          className="premium-icon-button border border-premium-500/30"
          aria-label="Share product"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 size={20} className="text-light-400 hover:text-premium-500" />
        </motion.button>
      </div>
    </>
  );
};

export default ProductHeader;
