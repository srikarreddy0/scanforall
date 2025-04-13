
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Camera, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

const Report: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Simulate adding an image
  const handleAddImage = () => {
    // In a real app, this would open the camera to take a photo
    // For this demo, we'll just add a placeholder
    setImages([...images, '/placeholder.svg']);
  };
  
  const handleSubmit = () => {
    if (!details.trim()) {
      toast.error('Please provide details about the counterfeit product');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Report submitted successfully');
    }, 1500);
  };
  
  if (submitted) {
    return (
      <div className="app-container">
        <Header title="Report Submitted" showBack={true} />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-verifyGreen bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-verifyGreen" />
          </div>
          
          <h2 className="text-xl font-bold text-darkText mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your report has been submitted successfully. Our team will review it shortly.
          </p>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-trustBlue"
          >
            Return to Scanner
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <Header title="Report Counterfeit" showBack={true} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <div className="bg-alertRed bg-opacity-10 p-4 rounded-lg flex items-start">
            <AlertTriangle className="text-alertRed shrink-0 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-darkText">Report Counterfeit Product</h3>
              <p className="text-sm text-gray-600 mt-1">
                Help us combat counterfeiting by providing details about this suspicious product.
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <div className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-700">
              {productId || 'Unknown Product'}
            </div>
          </div>
          
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Suspicious Details
            </label>
            <Textarea
              id="details"
              placeholder="Describe what made you suspect this product is counterfeit..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Evidence (Optional)
            </label>
            
            <div className="grid grid-cols-3 gap-2 mb-2">
              {images.map((img, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                </div>
              ))}
              
              {images.length < 3 && (
                <button 
                  onClick={handleAddImage}
                  className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <Camera size={24} />
                  <span className="text-xs mt-1">Add Photo</span>
                </button>
              )}
            </div>
            
            <p className="text-xs text-gray-500">
              Add photos that show signs of counterfeiting (up to 3)
            </p>
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-alertRed hover:bg-red-600"
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
