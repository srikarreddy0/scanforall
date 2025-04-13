
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Building, MapPin, Phone, Flag
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

  useEffect(() => {
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
    }, 1000);
  }, [productId]);

  const handleReportCounterfeit = () => {
    navigate(`/report/${productId}`);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'authentic':
        return <ShieldCheck size={64} className="text-verifyGreen mb-4" />;
      case 'warning':
        return <ShieldAlert size={64} className="text-cautionAmber mb-4" />;
      case 'counterfeit':
        return <ShieldAlert size={64} className="text-alertRed mb-4" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'authentic':
        return "This product has been verified as authentic";
      case 'warning':
        return "This product has some warning flags";
      case 'counterfeit':
        return "This product may be counterfeit";
      default:
        return "Product not found in our database";
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
      <Header title="Product Verification" showBack={true} showHistory={true} />
      
      <div className="flex-1 overflow-auto pb-6">
        <div className="p-4">
          <ProductCard product={product} status={status} />
          
          <div className="mt-6 bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold text-lg mb-3">Manufacturer Details</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building size={16} className="mr-2" />
                <span>{product.manufacturer.name}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>{product.manufacturer.location}</span>
              </div>
              
              {product.manufacturer.contact && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span>{product.manufacturer.contact}</span>
                </div>
              )}
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
