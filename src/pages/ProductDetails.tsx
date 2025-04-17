
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Building, MapPin, Phone, Flag, Volume2, VolumeX, Share2
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { 
  verifyProduct, 
  Product, 
  saveToHistory 
} from '../utils/mockData';
import { Button } from '../components/ui/button';

type VerificationStatus = 'authentic' | 'counterfeit' | 'warning' | 'not-found';

const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<VerificationStatus>('not-found');
  const [loading, setLoading] = useState(true);
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    // Get read aloud preference from localStorage
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }

    // Simulate API verification request
    setTimeout(() => {
      const result = verifyProduct(productId);
      setProduct(result.product);
      setStatus(result.status);
      setLoading(false);
      
      // Save to scan history
      if (result.product) {
        saveToHistory({
          productId,
          productName: result.product.name,
          brand: result.product.brand,
          timestamp: new Date().toISOString(),
          status: result.status
        });
      }

      // Read product information aloud if enabled
      if (readAloud && result.product) {
        const productInfo = `Product verified. ${result.product.name} by ${result.product.brand}. Status: ${result.status}`;
        speakText(productInfo);
      }
    }, 1000);
  }, [productId]);

  const handleReportCounterfeit = () => {
    navigate(`/report/${productId}`);
  };

  const toggleReadAloud = () => {
    const newValue = !readAloud;
    setReadAloud(newValue);
    localStorage.setItem('readAloud', newValue.toString());
    
    if (newValue) {
      toast.success('Read aloud enabled', {
        description: 'Product information will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
      
      if (product) {
        const productInfo = `${product.name} by ${product.brand}. ${product.description}`;
        speakText(productInfo);
      }
    } else {
      toast.info('Read aloud disabled', {
        icon: <VolumeX className="text-muted-foreground" />
      });
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const shareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: `${product.name} by ${product.brand}`,
        text: `Check out this product: ${product.name} by ${product.brand}`,
        url: window.location.href
      })
      .then(() => toast.success('Shared successfully'))
      .catch(() => toast.error('Sharing failed'));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Header title="Verifying Product" showBack={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-trustBlue bg-opacity-20 h-16 w-16 flex items-center justify-center mb-4">
              <ShieldCheck className="text-trustBlue opacity-50" size={32} />
            </div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="app-container">
        <Header title="Product Not Found" showBack={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <ShieldAlert size={64} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-darkText mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find this product in our database. It may be counterfeit or not registered.
          </p>
          <Button 
            variant="destructive" 
            onClick={handleReportCounterfeit}
            className="bg-alertRed hover:bg-red-600"
          >
            <Flag className="mr-2 h-4 w-4" /> Report Suspicious Product
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header title="Product Verification" showBack={true} />
      
      <div className="flex-1 overflow-auto pb-6">
        <div className="p-4">
          {/* Action buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={toggleReadAloud}
              className="premium-icon-button"
              aria-label={readAloud ? "Disable read aloud" : "Enable read aloud"}
            >
              {readAloud ? <Volume2 size={20} className="text-premium-500" /> : <VolumeX size={20} />}
            </button>
            
            <button
              onClick={shareProduct}
              className="premium-icon-button"
              aria-label="Share product"
            >
              <Share2 size={20} />
            </button>
          </div>
          
          <ProductCard product={product} status={status} readAloud={readAloud} />
          
          <div className="mt-6 bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold text-lg mb-3">Manufacturer Details</h3>
            <div className="space-y-2">
              <div 
                className="flex items-center text-sm text-gray-600"
                onClick={() => readAloud && speakText(`Manufacturer: ${product.manufacturer.name}`)}
              >
                <Building size={16} className="mr-2" />
                <span>{product.manufacturer.name}</span>
              </div>
              
              <div 
                className="flex items-center text-sm text-gray-600"
                onClick={() => readAloud && speakText(`Location: ${product.manufacturer.location}`)}
              >
                <MapPin size={16} className="mr-2" />
                <span>{product.manufacturer.location}</span>
              </div>
              
              {product.manufacturer.contact && (
                <div 
                  className="flex items-center text-sm text-gray-600"
                  onClick={() => readAloud && speakText(`Contact: ${product.manufacturer.contact}`)}
                >
                  <Phone size={16} className="mr-2" />
                  <span>{product.manufacturer.contact}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Food-specific additional information */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold text-lg mb-3">Ingredients & Allergens</h3>
            <div 
              className="text-sm text-gray-600 mb-4"
              onClick={() => readAloud && speakText("Ingredients: Water, Wheat Flour, Sugar, Vegetable Oil, Salt, Emulsifiers, Natural Flavoring.")}
            >
              <p className="font-medium mb-1">Ingredients:</p>
              <p>Water, Wheat Flour, Sugar, Vegetable Oil, Salt, Emulsifiers, Natural Flavoring.</p>
            </div>
            
            <div 
              className="text-sm text-gray-600"
              onClick={() => readAloud && speakText("Allergens: Contains Wheat, May contain traces of Nuts and Soy.")}
            >
              <p className="font-medium mb-1">Allergens:</p>
              <p>Contains Wheat, May contain traces of Nuts and Soy.</p>
            </div>
          </div>
          
          {(status === 'counterfeit' || status === 'warning') && (
            <div className="mt-6">
              <Button 
                variant="destructive" 
                onClick={handleReportCounterfeit}
                className="bg-alertRed hover:bg-red-600 w-full"
              >
                <Flag className="mr-2 h-4 w-4" /> Report Counterfeit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
