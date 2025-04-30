
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProductData {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  description: string;
  manufacturing_date: string | null;
  expiry_date: string | null;
  batch_number: string | null;
  category: string | null;
  ingredients: string[];
  allergens: string[];
  nutritional_info: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    [key: string]: string | undefined;
  };
  usage_instructions: string[];
  storage_instructions: string[];
  verification_status: 'authentic' | 'counterfeit' | 'warning' | 'unverified';
}

/**
 * Fetch product data by barcode from Supabase
 */
export async function fetchProductByBarcode(barcode: string): Promise<ProductData | null> {
  try {
    console.log("Fetching product with barcode:", barcode);
    
    // Type casting to workaround TypeScript checking until types are generated
    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('barcode', barcode)
      .single();
    
    if (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product data", {
        description: error.message
      });
      return null;
    }
    
    if (!data) {
      console.log("No product found with barcode:", barcode);
      return null;
    }
    
    console.log("Product data retrieved:", data);
    return data as ProductData;
  } catch (error) {
    console.error("Exception fetching product:", error);
    toast.error("An unexpected error occurred");
    return null;
  }
}

/**
 * Record a scan in the scan history
 */
export async function recordScan(barcode: string): Promise<void> {
  try {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform
    };
    
    // Type casting to workaround TypeScript checking until types are generated
    const { error } = await (supabase as any)
      .from('scan_history')
      .insert({
        product_barcode: barcode,
        device_info: deviceInfo
      });
    
    if (error) {
      console.error("Error recording scan:", error);
    }
  } catch (error) {
    console.error("Exception recording scan:", error);
  }
}

/**
 * Map product data to the format expected by components
 */
export function mapProductDataToComponentFormat(product: ProductData) {
  return {
    name: product.name,
    brand: product.brand,
    description: product.description,
    manufacturingDate: product.manufacturing_date || 'N/A',
    expiryDate: product.expiry_date || 'N/A',
    batchNumber: product.batch_number || 'N/A',
    category: product.category || 'Food',
    contents: {
      ingredients: product.ingredients?.length ? product.ingredients : ['Information not available'],
      allergens: product.allergens?.length ? product.allergens : ['Information not available'],
      nutritionalInfo: {
        calories: product.nutritional_info?.calories || 'N/A',
        protein: product.nutritional_info?.protein || 'N/A',
        carbs: product.nutritional_info?.carbs || 'N/A',
        fat: product.nutritional_info?.fat || 'N/A'
      }
    },
    usage: {
      instructions: product.usage_instructions?.length ? product.usage_instructions : ['Information not available'],
      storage: product.storage_instructions?.length ? product.storage_instructions : ['Information not available']
    },
    verification: product.verification_status
  };
}
