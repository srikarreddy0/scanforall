
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ProductHeader from '../components/product/ProductHeader';
import ProductTabs from '../components/product/ProductTabs';

const ProductDetails: React.FC = () => {
  const {
    productId = '',
    '*': wildcardPath
  } = useParams<{
    productId: string;
    '*': string;
  }>();
  const location = useLocation();
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }

    // For debugging
    console.log("Full location pathname:", location.pathname);
    console.log("Product ID from params:", productId);
    console.log("Wildcard path:", wildcardPath);
  }, [productId, wildcardPath, location.pathname]);

  const toggleReadAloud = () => {
    const newValue = !readAloud;
    setReadAloud(newValue);
    localStorage.setItem('readAloud', newValue.toString());
    if (newValue) {
      toast.success('Read aloud enabled', {
        description: 'Product information will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
    } else {
      toast.info('Read aloud disabled', {
        icon: <VolumeX className="text-muted-foreground" />
      });
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (window.speechSynthesis && readAloud) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  // Default product data for unknown URLs
  const defaultProduct = {
    name: 'Organic Granola',
    brand: "Nature's Best",
    description: 'Delicious and nutritious organic granola made with whole grains and natural ingredients.',
    manufacturingDate: '2023-06-15',
    expiryDate: '2024-06-15',
    batchNumber: 'BN-http://q',
    category: 'Food',
    contents: {
      ingredients: ['Whole grain oats', 'Honey', 'Almonds', 'Raisins', 'Sunflower seeds', 'Coconut oil'],
      allergens: ['Contains tree nuts (almonds)', 'May contain traces of other nuts', 'Produced in a facility that processes wheat'],
      nutritionalInfo: {
        calories: '240 kcal',
        protein: '6g',
        carbs: '32g',
        fat: '12g'
      }
    },
    usage: {
      instructions: ['Pour desired amount into bowl', 'Add milk or yogurt as preferred', 'Can be eaten as a dry snack'],
      storage: ['Store in a cool, dry place', 'Keep sealed after opening', 'Best consumed within 30 days of opening']
    }
  };

  return <div className="app-container bg-darkest dark:bg-dark-300">
      <ProductHeader productName={defaultProduct.name} readAloud={readAloud} toggleReadAloud={toggleReadAloud} onShare={shareProduct} />
      
      <div className="flex-1 overflow-auto bg-zinc-400">
        <div className="p-4 space-y-4">
          <div 
            className="text-left space-y-2 p-4 rounded-xl bg-zinc-500"
            onClick={() => speakText(`${defaultProduct.name} by ${defaultProduct.brand}. ${defaultProduct.description}`)}
          >
            <h1 className="text-2xl font-bold text-white">
              {defaultProduct.name}
            </h1>
            <p className="text-blue-300">{defaultProduct.brand}</p>
            <p className="text-sm text-white">
              {defaultProduct.description}
            </p>
          </div>

          <ProductTabs product={defaultProduct} readText={speakText} />
        </div>
      </div>
    </div>;
};
export default ProductDetails;
