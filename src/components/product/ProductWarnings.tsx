
import React from 'react';
import { AlertTriangle, XCircle, Flag } from 'lucide-react';
import { Button } from '../ui/button';
import { Product } from '../../utils/mockData';

interface ProductWarningsProps {
  product: Product;
  status: 'authentic' | 'counterfeit' | 'warning' | 'not-found';
  onReportCounterfeit: () => void;
  readText: (text: string) => void;
}

const ProductWarnings: React.FC<ProductWarningsProps> = ({
  product,
  status,
  onReportCounterfeit,
  readText
}) => {
  if (status !== 'warning' && status !== 'counterfeit') return null;

  return (
    <>
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

      <div className="mt-6">
        <Button 
          variant="destructive" 
          onClick={onReportCounterfeit}
          className="bg-alertRed hover:bg-red-600 w-full"
        >
          <Flag className="mr-2 h-4 w-4" /> Report Counterfeit
        </Button>
      </div>
    </>
  );
};

export default ProductWarnings;
