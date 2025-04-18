import React from 'react';
import { FileText, Calendar, Package, Utensils } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Product } from '../../utils/mockData';

interface ProductTabsProps {
  product: Product;
  readText: (text: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, readText }) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
        <TabsTrigger 
          value="details"
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-indigo-500 dark:data-[state=active]:bg-transparent"
        >
          <span className="text-indigo-600 dark:text-indigo-400 data-[state=active]:text-white">Details</span>
        </TabsTrigger>
        <TabsTrigger 
          value="mfg-exp"
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-indigo-500 dark:data-[state=active]:bg-transparent"
        >
          <span className="dark:text-gray-400">Mfg - Exp</span>
        </TabsTrigger>
        <TabsTrigger 
          value="contents"
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-indigo-500 dark:data-[state=active]:bg-transparent"
        >
          <span className="dark:text-gray-400">Contents</span>
        </TabsTrigger>
        <TabsTrigger 
          value="usage"
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-indigo-500 dark:data-[state=active]:bg-transparent"
        >
          <span className="dark:text-gray-400">Usage</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-4 space-y-4">
        <TabsContent value="details" className="m-0">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm">
                  <span className="text-cyan-600 inline-block mr-2">📅</span>
                  <span className="text-cyan-600">Manufacturing Date</span>
                </div>
                <div className="text-sm font-medium">
                  {new Date(product.manufacturingDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              {product.expiryDate && (
                <div className="flex justify-between">
                  <div className="text-sm">
                    <span className="text-orange-600 inline-block mr-2">📆</span>
                    <span className="text-orange-600">Expiry Date</span>
                  </div>
                  <div className="text-sm font-medium">
                    {new Date(product.expiryDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Batch Number
              </p>
              <p className="text-sm text-slate-900 dark:text-slate-100">
                {product.batchNumber}
              </p>
            </div>
          </div>
          
          {/* Additional info cards as shown in your image */}
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-teal-500">
              <span className="text-xl">🔄</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Verification Status</p>
            </div>
          </div>
          
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-orange-500">
              <span className="text-xl">📦</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Package Information</p>
            </div>
          </div>
          
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-cyan-500">
              <span className="text-xl">🧪</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Certification Details</p>
            </div>
          </div>
          
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-amber-500">
              <span className="text-xl">⚠️</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Safety Warnings</p>
            </div>
          </div>
          
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-green-500">
              <span className="text-xl">🌱</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Sustainability Info</p>
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
            {product.contents && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Ingredients
                  </p>
                  <ul className="text-sm text-slate-900 dark:text-slate-100 list-disc pl-5">
                    {product.contents.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Allergens
                  </p>
                  <ul className="text-sm text-slate-900 dark:text-slate-100 list-disc pl-5">
                    {product.contents.allergens.map((allergen, index) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                </div>
                {product.contents.nutritionalInfo && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Nutritional Information
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-slate-900 dark:text-slate-100">
                        Calories: {product.contents.nutritionalInfo.calories}
                      </p>
                      <p className="text-sm text-slate-900 dark:text-slate-100">
                        Protein: {product.contents.nutritionalInfo.protein}
                      </p>
                      <p className="text-sm text-slate-900 dark:text-slate-100">
                        Carbs: {product.contents.nutritionalInfo.carbs}
                      </p>
                      <p className="text-sm text-slate-900 dark:text-slate-100">
                        Fat: {product.contents.nutritionalInfo.fat}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="m-0">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            {product.usage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Instructions
                  </p>
                  <ul className="text-sm text-slate-900 dark:text-slate-100 list-disc pl-5">
                    {product.usage.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Storage
                  </p>
                  <ul className="text-sm text-slate-900 dark:text-slate-100 list-disc pl-5">
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

export default ProductTabs;
