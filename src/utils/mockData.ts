export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  description: string;
  manufacturingDate: string;
  expiryDate?: string;
  batchNumber: string;
  serialNumber: string;
  isAuthentic: boolean;
  warningFlags?: string[];
  imageUrl: string;
  retailPrice?: string;
  manufacturer: {
    name: string;
    location: string;
    contact?: string;
  };
  contents?: {
    ingredients: string[];
    allergens: string[];
    nutritionalInfo?: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
    };
  };
  usage?: {
    instructions: string[];
    storage: string[];
    warnings?: string[];
  };
}

// Mock product database
export const productDatabase: Record<string, Product> = {
  "PROD123456": {
    id: "PROD123456",
    name: "Ultra Premium Headphones",
    brand: "SoundMaster",
    model: "HD-9000",
    category: "Electronics",
    description: "Premium noise-cancelling headphones with studio-quality sound. Features Bluetooth 5.2 connectivity and 40 hours of battery life.",
    manufacturingDate: "2023-09-15",
    batchNumber: "SM-93427",
    serialNumber: "SN-02348756",
    isAuthentic: true,
    imageUrl: "/placeholder.svg",
    retailPrice: "$349.99",
    manufacturer: {
      name: "SoundMaster Audio Inc.",
      location: "Tokyo, Japan",
      contact: "support@soundmaster.com"
    }
  },
  "PROD654321": {
    id: "PROD654321",
    name: "Designer Handbag",
    brand: "Eleganza",
    model: "Chic Collection",
    category: "Fashion",
    description: "Handcrafted leather handbag with signature gold-plated hardware and premium Italian leather.",
    manufacturingDate: "2023-10-20",
    batchNumber: "ELG-23874",
    serialNumber: "SN-87654321",
    isAuthentic: false,
    warningFlags: ["Inconsistent stitching pattern", "Non-authentic hardware"],
    imageUrl: "/placeholder.svg",
    retailPrice: "$1,250.00",
    manufacturer: {
      name: "Eleganza Fashion House",
      location: "Milan, Italy",
      contact: "care@eleganza.com"
    }
  },
  "PROD987654": {
    id: "PROD987654",
    name: "Advanced Skincare Serum",
    brand: "DermaPerfect",
    model: "Hydra+ Formula",
    category: "Beauty",
    description: "Advanced hydrating serum with hyaluronic acid and vitamin complex for radiant skin.",
    manufacturingDate: "2023-11-05",
    expiryDate: "2025-11-05",
    batchNumber: "DP-45982",
    serialNumber: "SN-34587216",
    isAuthentic: true,
    warningFlags: ["Approaching expiry date"],
    imageUrl: "/placeholder.svg",
    retailPrice: "$89.99",
    manufacturer: {
      name: "DermaPerfect Laboratories",
      location: "Paris, France",
      contact: "info@dermaperfect.com"
    }
  },
  "PROD246810": {
    id: "PROD246810",
    name: "Premium Smartwatch",
    brand: "TechWear",
    model: "Pulse Pro",
    category: "Electronics",
    description: "Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and a 7-day battery life.",
    manufacturingDate: "2023-08-10",
    batchNumber: "TW-78321",
    serialNumber: "SN-12983745",
    isAuthentic: true,
    imageUrl: "/placeholder.svg",
    retailPrice: "$299.99",
    manufacturer: {
      name: "TechWear Innovations",
      location: "San Francisco, USA",
      contact: "help@techwear.com"
    }
  },
  "http://q-r.to/pdfpromo": {
    id: "http://q-r.to/pdfpromo",
    name: "Organic Granola",
    brand: "Nature's Best",
    model: "Classic Recipe",
    category: "Food",
    description: "Delicious and nutritious organic granola made with whole grains and natural ingredients.",
    manufacturingDate: "2023-06-15",
    expiryDate: "2024-06-15",
    batchNumber: "BN-http://q",
    serialNumber: "SN-GRANOLA-001",
    isAuthentic: true,
    imageUrl: "/placeholder.svg",
    manufacturer: {
      name: "Nature's Best Foods Inc.",
      location: "California, USA",
      contact: "support@naturesbest.com"
    },
    contents: {
      ingredients: [
        "Whole grain oats",
        "Honey",
        "Almonds",
        "Raisins",
        "Sunflower seeds",
        "Coconut oil"
      ],
      allergens: [
        "Contains tree nuts (almonds)",
        "May contain traces of other nuts",
        "Produced in a facility that processes wheat"
      ],
      nutritionalInfo: {
        calories: "240 kcal",
        protein: "6g",
        carbs: "32g",
        fat: "12g"
      }
    },
    usage: {
      instructions: [
        "Pour desired amount into bowl",
        "Add milk or yogurt as preferred",
        "Can be eaten as a dry snack"
      ],
      storage: [
        "Store in a cool, dry place",
        "Keep sealed after opening",
        "Best consumed within 30 days of opening"
      ],
      warnings: [
        "Check for freshness before consuming",
        "Not suitable for nut allergy sufferers"
      ]
    }
  },
  
  // Add duplicated entries for URLs without http:// prefix
  "q-r.to/pdfpromo": {
    id: "q-r.to/pdfpromo",
    name: "Organic Granola",
    brand: "Nature's Best",
    model: "Classic Recipe",
    category: "Food",
    description: "Delicious and nutritious organic granola made with whole grains and natural ingredients.",
    manufacturingDate: "2023-06-15",
    expiryDate: "2024-06-15",
    batchNumber: "BN-http://q",
    serialNumber: "SN-GRANOLA-001",
    isAuthentic: true,
    imageUrl: "/placeholder.svg",
    manufacturer: {
      name: "Nature's Best Foods Inc.",
      location: "California, USA",
      contact: "support@naturesbest.com"
    },
    contents: {
      ingredients: [
        "Whole grain oats",
        "Honey",
        "Almonds",
        "Raisins",
        "Sunflower seeds",
        "Coconut oil"
      ],
      allergens: [
        "Contains tree nuts (almonds)",
        "May contain traces of other nuts",
        "Produced in a facility that processes wheat"
      ],
      nutritionalInfo: {
        calories: "240 kcal",
        protein: "6g",
        carbs: "32g",
        fat: "12g"
      }
    },
    usage: {
      instructions: [
        "Pour desired amount into bowl",
        "Add milk or yogurt as preferred",
        "Can be eaten as a dry snack"
      ],
      storage: [
        "Store in a cool, dry place",
        "Keep sealed after opening",
        "Best consumed within 30 days of opening"
      ],
      warnings: [
        "Check for freshness before consuming",
        "Not suitable for nut allergy sufferers"
      ]
    }
  },
  
  // Add entries for the other known problematic URLs
  "MOBIBRIX.COM/V0JDN9": {
    id: "MOBIBRIX.COM/V0JDN9",
    name: "Organic Granola",
    brand: "Nature's Best",
    model: "Classic Recipe",
    category: "Food",
    description: "Delicious and nutritious organic granola made with whole grains and natural ingredients.",
    manufacturingDate: "2023-06-15",
    expiryDate: "2024-06-15",
    batchNumber: "BN-MOBIBRIX",
    serialNumber: "SN-GRANOLA-002",
    isAuthentic: true,
    imageUrl: "/placeholder.svg",
    manufacturer: {
      name: "Nature's Best Foods Inc.",
      location: "California, USA",
      contact: "support@naturesbest.com"
    },
    contents: {
      ingredients: [
        "Whole grain oats",
        "Honey",
        "Almonds",
        "Raisins",
        "Sunflower seeds",
        "Coconut oil"
      ],
      allergens: [
        "Contains tree nuts (almonds)",
        "May contain traces of other nuts",
        "Produced in a facility that processes wheat"
      ],
      nutritionalInfo: {
        calories: "240 kcal",
        protein: "6g",
        carbs: "32g",
        fat: "12g"
      }
    },
    usage: {
      instructions: [
        "Pour desired amount into bowl",
        "Add milk or yogurt as preferred",
        "Can be eaten as a dry snack"
      ],
      storage: [
        "Store in a cool, dry place",
        "Keep sealed after opening",
        "Best consumed within 30 days of opening"
      ],
      warnings: [
        "Check for freshness before consuming",
        "Not suitable for nut allergy sufferers"
      ]
    }
  }
};

// Function to simulate verification
export const verifyProduct = (productId: string): { 
  product: Product | null, 
  status: 'authentic' | 'counterfeit' | 'warning' | 'not-found' 
} => {
  console.log("Verifying product with ID:", productId);
  
  // Directly look up the product in the database
  const product = productDatabase[productId];
  
  if (!product) {
    console.log("Product not found:", productId);
    return { product: null, status: 'not-found' };
  }
  
  console.log("Product found:", product.name);
  
  if (!product.isAuthentic) {
    return { product, status: 'counterfeit' };
  }
  
  if (product.warningFlags && product.warningFlags.length > 0) {
    return { product, status: 'warning' };
  }
  
  return { product, status: 'authentic' };
};

// Store for scan history
export interface ScanRecord {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  timestamp: string;
  status: 'authentic' | 'counterfeit' | 'warning' | 'not-found';
}

// Function to save scan to history (localStorage)
export const saveToHistory = (scan: Omit<ScanRecord, 'id'>): void => {
  const history = getHistory();
  const newScan: ScanRecord = {
    ...scan,
    id: `scan-${Date.now()}`
  };
  
  history.unshift(newScan);
  
  // Keep only last 50 scans
  const trimmedHistory = history.slice(0, 50);
  localStorage.setItem('scanHistory', JSON.stringify(trimmedHistory));
};

// Function to get scan history
export const getHistory = (): ScanRecord[] => {
  const historyString = localStorage.getItem('scanHistory');
  return historyString ? JSON.parse(historyString) : [];
};

// Function to clear scan history
export const clearHistory = (): void => {
  localStorage.removeItem('scanHistory');
};
