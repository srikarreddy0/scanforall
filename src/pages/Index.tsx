
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, HelpCircle, Sparkles, Bell, Search } from 'lucide-react';
import Header from '../components/Header';
import Scanner from '../components/Scanner';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (productId: string) => {
    // Navigate to product details page with the scanned product ID
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <Header showHistory={true} />
      
      <div className="p-6 flex flex-col h-[calc(100vh-4rem)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Scan for all</h1>
          <p className="text-gray-300">
            Verify authenticity of your products with a simple scan
          </p>
        </div>
        
        {/* Quick access buttons */}
        <div className="flex justify-around mb-8">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center text-white hover:bg-white/10"
            onClick={() => navigate('/profile')}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500 mb-1 flex items-center justify-center">
              <User size={20} />
            </div>
            <span className="text-xs">Profile</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10"
            onClick={() => navigate('/history')}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 mb-1 flex items-center justify-center">
              <Search size={20} />
            </div>
            <span className="text-xs">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10"
            onClick={() => navigate('/notifications')}
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 mb-1 flex items-center justify-center">
              <Bell size={20} />
            </div>
            <span className="text-xs">Alerts</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10"
            onClick={() => navigate('/settings')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 mb-1 flex items-center justify-center">
              <Settings size={20} />
            </div>
            <span className="text-xs">Settings</span>
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="text-amber-400" size={20} />
              <h2 className="text-xl">Scan here</h2>
            </div>
            <p className="text-sm text-gray-400">Position QR code within frame</p>
          </div>
          
          <Scanner onScan={handleScan} />
        </div>
        
        {/* Quick info tabs */}
        <div className="mt-8">
          <div className="grid grid-cols-4 border-b border-gray-600">
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10">DETAILS</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10">MFG - EXP</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10">CONTENTS</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10">USAGE</Button>
          </div>
        </div>
        
        {/* Help button */}
        <div className="fixed bottom-6 right-6">
          <Button 
            className="h-12 w-12 rounded-full bg-trustBlue shadow-lg"
            onClick={() => navigate('/help')}
          >
            <HelpCircle size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
