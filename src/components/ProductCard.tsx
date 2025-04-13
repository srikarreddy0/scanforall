
import React from 'react';
import { Calendar, Tag, Hash } from 'lucide-react';
import { Product } from '../utils/mockData';
import VerificationBadge from './VerificationBadge';

interface ProductCardProps {
  product: Product;
  status: 'authentic' | 'counterfeit' | 'warning' | 'not-found';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, status }) => {
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
        
        <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>Manufactured: {product.manufacturingDate}</span>
          </div>
          
          {product.expiryDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span>Expires: {product.expiryDate}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <Tag size={16} className="mr-2" />
            <span>Model: {product.model}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Hash size={16} className="mr-2" />
            <span>Serial: {product.serialNumber}</span>
          </div>
        </div>
        
        {status === 'warning' && product.warningFlags && (
          <div className="mt-4 p-3 bg-cautionAmber bg-opacity-10 rounded-lg">
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
          <div className="mt-4 p-3 bg-alertRed bg-opacity-10 rounded-lg">
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
