
import React from 'react';
import { Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface ProductTabsProps {
  product: any;
  readText: (text: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, readText }) => {
  // Format dates for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full grid grid-cols-4 bg-transparent h-auto p-0 border-b border-gray-700">
        <TabsTrigger 
          value="details"
          className="text-gray-400 data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
        >
          Details
        </TabsTrigger>
        <TabsTrigger 
          value="mfg-exp"
          className="text-gray-400 data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
        >
          Mfg - Exp
        </TabsTrigger>
        <TabsTrigger 
          value="contents"
          className="text-gray-400 data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
        >
          Contents
        </TabsTrigger>
        <TabsTrigger 
          value="usage"
          className="text-gray-400 data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
        >
          Usage
        </TabsTrigger>
      </TabsList>

      <div className="mt-4 space-y-4">
        <TabsContent value="details" className="m-0 text-white">
          <div className="space-y-4 bg-white/5 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-blue-300">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Manufacturing Date</span>
                </div>
                <p className="text-sm font-medium text-white pl-6">
                  {formatDate(product.manufacturingDate)}
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-blue-300">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Expiry Date</span>
                </div>
                <p className="text-sm font-medium text-white pl-6">
                  {formatDate(product.expiryDate)}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-300">Batch Number</p>
              <p className="text-sm text-white">{product.batchNumber}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contents" className="m-0">
          <div className="space-y-4">
            {product.contents && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-300">Ingredients</p>
                  <ul className="text-sm list-disc pl-5 text-white">
                    {product.contents.ingredients.map((ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-300">Allergens</p>
                  <ul className="text-sm list-disc pl-5 text-white">
                    {product.contents.allergens.map((allergen: string, index: number) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="m-0">
          <div className="space-y-4">
            {product.usage && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-300">Instructions</p>
                  <ul className="text-sm list-disc pl-5 text-white">
                    {product.usage.instructions.map((instruction: string, index: number) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-300">Storage</p>
                  <ul className="text-sm list-disc pl-5 text-white">
                    {product.usage.storage.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mfg-exp" className="m-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-300">Manufacturing Date</p>
              <p className="text-sm text-white">{formatDate(product.manufacturingDate)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-300">Expiry Date</p>
              <p className="text-sm text-white">{formatDate(product.expiryDate)}</p>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTabs;
