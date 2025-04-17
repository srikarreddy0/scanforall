
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
