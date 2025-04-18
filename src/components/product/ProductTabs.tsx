import React from 'react';
import { FileText, Calendar, Package, Utensils } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Product } from '../../utils/mockData';

interface ProductTabsProps {
  product: Product;
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

  const manufacturingDate = formatDate(product.manufacturingDate);
  const expiryDate = product.expiryDate ? formatDate(product.expiryDate) : null;

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full grid grid-cols-4 gap-4 bg-transparent h-auto p-0 border-b">
        <TabsTrigger 
          value="details"
          className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-sm rounded-none"
        >
          <span className="dark:text-gray-400 data-[state=active]:text-blue-600">Details</span>
        </TabsTrigger>
        <TabsTrigger 
          value="mfg-exp"
          className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-sm rounded-none"
        >
          <span className="dark:text-gray-400">Mfg - Exp</span>
        </TabsTrigger>
        <TabsTrigger 
          value="contents"
          className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-sm rounded-none"
        >
          <span className="dark:text-gray-400">Contents</span>
        </TabsTrigger>
        <TabsTrigger 
          value="usage"
          className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-sm rounded-none"
        >
          <span className="dark:text-gray-400">Usage</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-4 space-y-4">
        <TabsContent value="details" className="m-0">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-cyan-600">
                  <span className="text-cyan-600 mr-2">📅</span>
                  <span className="text-sm">Manufacturing Date</span>
                </div>
                <p className="text-sm font-medium pl-6">{manufacturingDate}</p>
              </div>
              
              {expiryDate && (
                <div className="space-y-1">
                  <div className="flex items-center text-orange-600">
                    <span className="text-orange-600 mr-2">📆</span>
                    <span className="text-sm">Expiry Date</span>
                  </div>
                  <p className="text-sm font-medium pl-6">{expiryDate}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700">Batch Number</p>
              <p className="text-sm text-slate-900">{product.batchNumber}</p>
            </div>
          </div>
          
          {/* Information cards as shown in the second image */}
          <div className="space-y-3 mt-4">
            <InfoCard icon="🔄" label="Verification Status" />
            <InfoCard icon="📦" label="Package Information" />
            <InfoCard icon="🧪" label="Certification Details" />
            <InfoCard icon="⚠️" label="Safety Warnings" />
            <InfoCard icon="🌱" label="Sustainability Info" />
          </div>
        </TabsContent>

        {/* Other tabs content */}
        <TabsContent value="mfg-exp" className="m-0">
          {/* Manufacturing and expiry date information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Manufacturing Date</p>
              <p className="text-sm">{manufacturingDate}</p>
            </div>
            {expiryDate && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Expiry Date</p>
                <p className="text-sm">{expiryDate}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contents" className="m-0">
          {/* Contents information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 space-y-4">
            {product.contents && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Ingredients</p>
                  <ul className="text-sm list-disc pl-5">
                    {product.contents.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Allergens</p>
                  <ul className="text-sm list-disc pl-5">
                    {product.contents.allergens.map((allergen, index) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                </div>
                {product.contents.nutritionalInfo && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Nutritional Information</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>Calories: {product.contents.nutritionalInfo.calories}</p>
                      <p>Protein: {product.contents.nutritionalInfo.protein}</p>
                      <p>Carbs: {product.contents.nutritionalInfo.carbs}</p>
                      <p>Fat: {product.contents.nutritionalInfo.fat}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="m-0">
          {/* Usage information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5">
            {product.usage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Instructions</p>
                  <ul className="text-sm list-disc pl-5">
                    {product.usage.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Storage</p>
                  <ul className="text-sm list-disc pl-5">
                    {product.usage.storage.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

// Helper component for info cards
const InfoCard = ({ icon, label }: { icon: string; label: string }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center shadow-sm">
    <div className="w-8 h-8 rounded-full flex items-center justify-center">
      <span className="text-lg">{icon}</span>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium">{label}</p>
    </div>
  </div>
);

export default ProductTabs;
