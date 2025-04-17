
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Calendar, Package, Utensils, AlertTriangle, Volume2, VolumeX, Share2, Phone, MapPin, Building, Flag, ShieldCheck, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Product, verifyProduct, saveToHistory } from '../utils/mockData';
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
    <div className="app-container bg-slate-50 dark:bg-slate-900">
      <Header title={product.name} showBack={true} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {/* Product Title Section */}
          <div className="text-left space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {product.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{product.brand}</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              {product.description}
            </p>
          </div>

          {/* Read Aloud Toggle */}
          <button
            onClick={toggleReadAloud}
            className="absolute top-20 right-4 premium-icon-button"
            aria-label={readAloud ? "Disable read aloud" : "Enable read aloud"}
          >
            {readAloud ? <Volume2 size={20} className="text-premium-500" /> : <VolumeX size={20} />}
          </button>

          {/* Tabs Navigation */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="details"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800"
              >
                <FileText className="w-4 h-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="mfg-exp"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Mfg - Exp
              </TabsTrigger>
              <TabsTrigger 
                value="contents"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800"
              >
                <Package className="w-4 h-4 mr-2" />
                Contents
              </TabsTrigger>
              <TabsTrigger 
                value="usage"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800"
              >
                <Utensils className="w-4 h-4 mr-2" />
                Usage
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="mt-4 space-y-4">
              <TabsContent value="details" className="m-0">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Batch Number
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {product.batchNumber}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Serial Number
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {product.serialNumber}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mfg-exp" className="m-0">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Manufacturing Date
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {product.manufacturingDate}
                    </p>
                  </div>
                  {product.expiryDate && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Expiry Date
                      </p>
                      <p className="text-sm text-slate-900 dark:text-slate-100">
                        {product.expiryDate}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="contents" className="m-0">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Ingredients
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      Water, Wheat Flour, Sugar, Vegetable Oil, Salt, Emulsifiers, Natural Flavoring
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Allergens
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      Contains Wheat, May contain traces of Nuts and Soy
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="m-0">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-slate-900 dark:text-slate-100">
                    Store in a cool, dry place. Once opened, consume within 3 days.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Warning Section */}
          {status === 'warning' && product.warningFlags && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Warnings</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {product.warningFlags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

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
