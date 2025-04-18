import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Volume2, VolumeX, ShieldCheck, ShieldAlert, Flag } from 'lucide-react';
import Header from '../components/Header';
import { Product, verifyProduct, saveToHistory } from '../utils/mockData';
import { Button } from '../components/ui/button';
import ProductHeader from '../components/product/ProductHeader';
import ProductTabs from '../components/product/ProductTabs';
import ProductWarnings from '../components/product/ProductWarnings';

type VerificationStatus = 'authentic' | 'counterfeit' | 'warning' | 'not-found';

const ProductDetails: React.FC = () => {
  const { productId = '', '*': wildcardPath } = useParams<{ productId: string, '*': string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<VerificationStatus>('not-found');
  const [loading, setLoading] = useState(true);
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }

    // Get the complete product ID, including any path segments after it
    let fullProductId = productId;
    
    // If there's additional path information after the productId, include it
    if (wildcardPath) {
      fullProductId = `${productId}/${wildcardPath}`;
    }
    
    // For debugging
    console.log("Product page received ID:", fullProductId);
    console.log("Full location pathname:", location.pathname);
    
    // Try different variations of the product ID to find a match
    const verifyProductWithVariations = (id: string) => {
      // Try with original ID
      let result = verifyProduct(id);
      console.log(`Tried lookup with: "${id}", result:`, result.status);
      
      // If not found, try with http:// prefix
      if (result.status === 'not-found') {
        const withHttpPrefix = `http://${id}`;
        console.log("Trying with HTTP prefix:", withHttpPrefix);
        result = verifyProduct(withHttpPrefix);
      }
      
      // If still not found, try with uppercase version
      if (result.status === 'not-found') {
        const uppercaseId = id.toUpperCase();
        console.log("Trying uppercase version:", uppercaseId);
        result = verifyProduct(uppercaseId);
      }
      
      return result;
    };
    
    setTimeout(() => {
      // Verify the product with its full ID including path segments
      const result = verifyProductWithVariations(fullProductId);
      
      setProduct(result.product);
      setStatus(result.status);
      setLoading(false);
      
      if (result.product) {
        saveToHistory({
          productId: fullProductId,
          productName: result.product.name,
          brand: result.product.brand,
          timestamp: new Date().toISOString(),
          status: result.status
        });
        
        if (readAloud) {
          const productInfo = `Product verified. ${result.product.name} by ${result.product.brand}. Status: ${result.status}`;
          speakText(productInfo);
        }
      }
    }, 1000);
    
  }, [productId, wildcardPath, location.pathname, readAloud]);

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
      window.speechSynthesis.cancel();
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
    <div className="app-container bg-slate-50 dark:bg-dark-300">
      <ProductHeader
        productName={product.name}
        readAloud={readAloud}
        toggleReadAloud={toggleReadAloud}
        onShare={shareProduct}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          <div className="text-left space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{product.brand}</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              {product.description}
            </p>
          </div>

          <ProductTabs product={product} readText={speakText} />
          
          <ProductWarnings
            product={product}
            status={status}
            onReportCounterfeit={handleReportCounterfeit}
            readText={speakText}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
