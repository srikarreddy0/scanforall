
import React from 'react';
import { Calendar, Tag, Hash, AlertTriangle, XCircle, Info, Utensils, ShieldCheck, Leaf } from 'lucide-react';
import { Product } from '../utils/mockData';
import VerificationBadge from './VerificationBadge';

interface ProductCardProps {
  product: Product;
  status: 'authentic' | 'counterfeit' | 'warning' | 'not-found';
  readAloud?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, status, readAloud = false }) => {
  // Function to read content aloud
  const readText = (text: string) => {
    if (readAloud && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Extract nutritional info from product description (would be structured in a real app)
  const hasNutritionalInfo = product.category === "Food" || product.description.includes("calorie");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <VerificationBadge status={status} />
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-darkText">{product.name}</h2>
        <h3 className="text-trustBlue font-medium">{product.brand}</h3>
        
        <div 
          className="mt-2 text-gray-600 text-sm"
          onClick={() => readText(product.description)}
        >
          {product.description}
          {readAloud && <span className="ml-2 text-xs text-premium-500">(Tap to hear)</span>}
        </div>
        
        <div className="mt-4 space-y-3">
          <div 
            className="flex items-center text-sm text-gray-600"
            onClick={() => readText(`Manufactured on: ${product.manufacturingDate}`)}
          >
            <Calendar size={16} className="mr-2 text-premium-500" />
            <span>Manufactured: {product.manufacturingDate}</span>
          </div>
          
          {product.expiryDate && (
            <div 
              className="flex items-center text-sm text-gray-600"
              onClick={() => readText(`Expires on: ${product.expiryDate}`)}
            >
              <Calendar size={16} className="mr-2 text-accent1-DEFAULT" />
              <span>Expires: {product.expiryDate}</span>
            </div>
          )}
          
          <div 
            className="flex items-center text-sm text-gray-600"
            onClick={() => readText(`Product type: ${product.model}`)}
          >
            <Tag size={16} className="mr-2 text-premium-500" />
            <span>Type: {product.model}</span>
          </div>
          
          <div 
            className="flex items-center text-sm text-gray-600"
            onClick={() => readText(`Batch number: ${product.serialNumber}`)}
          >
            <Hash size={16} className="mr-2 text-premium-500" />
            <span>Batch: {product.serialNumber}</span>
          </div>

          {/* Food-specific information */}
          {hasNutritionalInfo && (
            <div className="mt-4 bg-light-300 rounded-lg p-3">
              <h4 className="font-medium text-dark-300 flex items-center mb-2">
                <Info size={16} className="mr-1 text-premium-500" />
                Nutritional Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Calories:</span>
                  <span>240 kcal</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Protein:</span>
                  <span>5g</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Carbs:</span>
                  <span>40g</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Fat:</span>
                  <span>10g</span>
                </div>
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          <div 
            className="mt-2 bg-light-300 rounded-lg p-3"
            onClick={() => readText("Usage Instructions: Store in a cool, dry place. Once opened, consume within 3 days.")}
          >
            <h4 className="font-medium text-dark-300 flex items-center">
              <Utensils size={16} className="mr-1 text-premium-500" />
              Usage
            </h4>
            <p className="text-sm mt-1">Store in a cool, dry place. Once opened, consume within 3 days.</p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="bg-success-50 text-success-DEFAULT text-xs px-2 py-1 rounded-full flex items-center">
              <ShieldCheck size={12} className="mr-1" />
              FDA Approved
            </div>
            <div className="bg-accent2-light text-accent2-dark text-xs px-2 py-1 rounded-full flex items-center">
              <Leaf size={12} className="mr-1" />
              Organic
            </div>
          </div>
        </div>
        
        {status === 'warning' && product.warningFlags && (
          <div 
            className="mt-4 p-3 bg-cautionAmber bg-opacity-10 rounded-lg"
            onClick={() => readText(`Warning: ${product.warningFlags.join('. ')}`)}
          >
            <h4 className="font-medium text-cautionAmber flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              Warning
            </h4>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {product.warningFlags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>
          </div>
        )}
        
        {status === 'counterfeit' && (
          <div 
            className="mt-4 p-3 bg-alertRed bg-opacity-10 rounded-lg"
            onClick={() => readText("Counterfeit Warning: This product has been identified as potentially counterfeit. Please check details carefully.")}
          >
            <h4 className="font-medium text-alertRed flex items-center">
              <XCircle size={16} className="mr-1" />
              Counterfeit Warning
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              This product has been identified as potentially counterfeit. Please check details carefully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
