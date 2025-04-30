
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ProductHeader from '../components/product/ProductHeader';
import ProductTabs from '../components/product/ProductTabs';
import { verifyProduct } from '../utils/mockData';
import { speakText, cancelSpeech, getReadAloudPreference, setReadAloudPreference } from '../utils/readAloudUtils';

const ProductDetails: React.FC = () => {
  const {
    productId = '',
    '*': wildcardPath
  } = useParams<{
    productId: string;
    '*': string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [readAloud, setReadAloud] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Improved product details loading with verification
  const productData = useMemo(() => {
    // Check if we have a valid product ID
    if (!productId) return null;
    
    // Verify and get product data
    const { product, status } = verifyProduct(productId);
    
    if (product) {
      return {
        name: product.name,
        brand: product.brand,
        description: product.description,
        manufacturingDate: product.manufacturingDate,
        expiryDate: product.expiryDate || 'N/A',
        batchNumber: product.batchNumber,
        category: product.category,
        contents: product.contents || {
          ingredients: ['Information not available'],
          allergens: ['Information not available'],
          nutritionalInfo: {
            calories: 'N/A',
            protein: 'N/A',
            carbs: 'N/A',
            fat: 'N/A'
          }
        },
        usage: product.usage || {
          instructions: ['Information not available'],
          storage: ['Information not available']
        },
        verification: status
      };
    }
    
    // Default product data as fallback
    return {
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
      },
      verification: 'authentic'
    };
  }, [productId]);

  useEffect(() => {
    // Read aloud preference - using the utility function now
    const savedReadAloud = getReadAloudPreference();
    setReadAloud(savedReadAloud);

    // For debugging
    console.log("Full location pathname:", location.pathname);
    console.log("Product ID from params:", productId);
    console.log("Wildcard path:", wildcardPath);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Read product name aloud if readAloud is enabled
      if (savedReadAloud && productData) {
        speakText(`Product: ${productData.name} by ${productData.brand}. ${productData.description}`);
      }
    }, 500); // Faster loading simulation (500ms instead of 1s)
    
    return () => {
      clearTimeout(timer);
      cancelSpeech(); // Ensure speech is canceled when component unmounts
    };
  }, [productId, wildcardPath, location.pathname, productData]);

  const toggleReadAloud = useCallback(() => {
    const newValue = !readAloud;
    setReadAloud(newValue);
    setReadAloudPreference(newValue);
    
    if (newValue) {
      toast.success('Read aloud enabled', {
        description: 'Product information will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
      
      // Read current product information
      if (productData) {
        speakText(`Product: ${productData.name} by ${productData.brand}. ${productData.description}`);
      }
    } else {
      toast.info('Read aloud disabled', {
        icon: <VolumeX className="text-muted-foreground" />
      });
      cancelSpeech();
    }
  }, [readAloud, productData]);

  const handleReadText = useCallback((text: string) => {
    if (readAloud) {
      speakText(text);
    }
  }, [readAloud]);

  const shareProduct = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="app-container bg-gradient-dark flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light-100 animate-pulse">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container bg-gradient-dark min-h-screen">
      <ProductHeader 
        productName={productData.name} 
        readAloud={readAloud} 
        toggleReadAloud={toggleReadAloud} 
        onShare={shareProduct} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          <div 
            className="text-left space-y-2 p-4 rounded-xl bg-gradient-premium shadow-glow-premium transition-all duration-300 hover:shadow-premium-lg"
            onClick={() => handleReadText(`${productData.name} by ${productData.brand}. ${productData.description}`)}
          >
            <h1 className="text-2xl font-bold text-white">
              {productData.name}
            </h1>
            <p className="text-blue-300">{productData.brand}</p>
            <p className="text-sm text-white">
              {productData.description}
            </p>
          </div>

          <ProductTabs product={productData} readText={handleReadText} />
          
          {/* Action buttons */}
          <div className="flex gap-3 mt-6 animate-fade-in">
            <button 
              onClick={() => toast.info('Viewing offline data', { description: 'Product loaded from local database' })}
              className="flex-1 py-3 px-4 bg-gradient-premium text-white rounded-lg font-medium text-sm hover:shadow-premium-lg transition-all duration-300"
            >
              View Offline (From App Database)
            </button>
            
            <button 
              onClick={() => {
                toast.info('Opening web page', { description: `Redirecting to product website` });
                // Simulate website redirect with a toast notification
                setTimeout(() => {
                  toast.success('Web page opened in browser', { 
                    description: `https://productinfo.com/${productId}` 
                  });
                }, 1000);
              }}
              className="flex-1 py-3 px-4 bg-light-300 text-dark-300 rounded-lg font-medium text-sm hover:bg-light-400 hover:shadow-premium-sm transition-all duration-300"
            >
              Open Web Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
